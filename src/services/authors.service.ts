import type { IAuthor, ICreateAuthorDTO, IUpdateAuthorDTO } from "@/dtos";
import { api } from "@/services/api";
import { getFirebaseStorage, getFirestoreDb } from "@/services/firebase";
import { getAuthenticatedJwt, getAuthenticatedSiteId } from "@/store/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentData,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type AuthorDocument = Omit<IAuthor, "id">;
type CreateAuthorInput = Omit<ICreateAuthorDTO, "avatarUrl" | "siteId"> & {
  avatarFile?: File | null;
};
type UpdateAuthorInput = Omit<IUpdateAuthorDTO, "avatarUrl" | "siteId"> & {
  avatarFile?: File | null;
};

const AUTHORS_COLLECTION = "authors";

const getAuthorsCollection = () => collection(getFirestoreDb(), AUTHORS_COLLECTION);

const getAuthorDoc = (authorId: string) =>
  doc(getFirestoreDb(), AUTHORS_COLLECTION, authorId);

const toISOString = () => new Date().toISOString();
const sanitizeFileName = (fileName: string) =>
  fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

const uploadAuthorAvatar = async (
  siteId: string,
  authorId: string,
  file: File,
) => {
  const storageRef = ref(
    getFirebaseStorage(),
    `authors/${siteId}/${authorId}/${Date.now()}-${sanitizeFileName(file.name)}`,
  );

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  return getDownloadURL(storageRef);
};

const deleteAuthorAvatarByUrl = async (avatarUrl: string) => {
  if (!avatarUrl) {
    return;
  }

  try {
    await deleteObject(ref(getFirebaseStorage(), avatarUrl));
  } catch {
    // Ignore cleanup failures to avoid blocking the main author operation.
  }
};

const mapAuthorSnapshot = (
  snapshot:
    | DocumentSnapshot<DocumentData>
    | QueryDocumentSnapshot<DocumentData>,
): IAuthor | null => {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() as AuthorDocument;

  return {
    id: snapshot.id,
    name: data.name,
    bio: data.bio,
    siteId: data.siteId,
    avatarUrl: data.avatarUrl,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};

const assertAuthorId = (authorId: string) => {
  if (!authorId.trim()) {
    throw new Error("A valid author id is required.");
  }
};

const requireAuthor = async (
  authorId: string,
  siteId: string,
): Promise<IAuthor> => {
  assertAuthorId(authorId);

  const snapshot = await getDoc(getAuthorDoc(authorId));
  const author = mapAuthorSnapshot(snapshot);

  if (!author) {
    throw new Error(`Author ${authorId} was not found.`);
  }

  if (author.siteId !== siteId) {
    throw new Error(`Author ${authorId} was not found for the authenticated site.`);
  }

  return author;
};

export const authorsService = {
  async create(data: CreateAuthorInput): Promise<IAuthor> {
    const siteId = getAuthenticatedSiteId();
    const authorRef = doc(getAuthorsCollection());
    const timestamp = toISOString();
    let avatarUrl = "";

    if (data.avatarFile) {
      avatarUrl = await uploadAuthorAvatar(siteId, authorRef.id, data.avatarFile);
    }

    const author: AuthorDocument = {
      name: data.name,
      bio: data.bio,
      siteId,
      avatarUrl,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    };

    try {
      await setDoc(authorRef, author);
    } catch (error) {
      await deleteAuthorAvatarByUrl(avatarUrl);
      throw error;
    }

    return {
      id: authorRef.id,
      ...author,
    };
  },

  async list(): Promise<IAuthor[]> {
    const response = await api.get<IAuthor[]>("/authors", {
      headers: {
        Authorization: `Bearer ${getAuthenticatedJwt()}`,
      },
    });

    return response.data;
  },

  async update(data: UpdateAuthorInput): Promise<IAuthor> {
    const siteId = getAuthenticatedSiteId();
    const existingAuthor = await requireAuthor(data.id, siteId);

    if (existingAuthor.deletedAt !== null) {
      throw new Error(`Author ${data.id} has been deleted and cannot be updated.`);
    }

    const nextAvatarUrl = data.avatarFile
      ? await uploadAuthorAvatar(siteId, data.id, data.avatarFile)
      : existingAuthor.avatarUrl;

    const updates: Partial<AuthorDocument> = {
      siteId,
      updatedAt: toISOString(),
      avatarUrl: nextAvatarUrl,
    };

    if (data.name !== undefined) {
      updates.name = data.name;
    }

    if (data.bio !== undefined) {
      updates.bio = data.bio;
    }

    try {
      await updateDoc(getAuthorDoc(data.id), updates);
    } catch (error) {
      if (data.avatarFile) {
        await deleteAuthorAvatarByUrl(nextAvatarUrl);
      }
      throw error;
    }

    if (data.avatarFile && existingAuthor.avatarUrl) {
      await deleteAuthorAvatarByUrl(existingAuthor.avatarUrl);
    }

    return {
      ...existingAuthor,
      ...updates,
      id: data.id,
    };
  },

  async delete(authorId: string): Promise<IAuthor> {
    const siteId = getAuthenticatedSiteId();
    const existingAuthor = await requireAuthor(authorId, siteId);

    if (existingAuthor.deletedAt !== null) {
      return existingAuthor;
    }

    const timestamp = toISOString();

    await updateDoc(getAuthorDoc(authorId), {
      deletedAt: timestamp,
      updatedAt: timestamp,
    });

    return {
      ...existingAuthor,
      deletedAt: timestamp,
      updatedAt: timestamp,
    };
  },
};
