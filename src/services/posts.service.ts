import type { ICreatePostDTO, IPost, IUpdatePostDTO } from "@/dtos";
import { getFirebaseStorage, getFirestoreDb } from "@/services/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
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

export const POST_SITE_ID = "pls-site-id";

type PostDocument = Omit<IPost, "id">;
type CreatePostInput = Omit<ICreatePostDTO, "backgroundUrl" | "siteId"> & {
  backgroundFile?: File | null;
};
type UpdatePostInput = Omit<IUpdatePostDTO, "backgroundUrl" | "siteId"> & {
  backgroundFile?: File | null;
};

const POSTS_COLLECTION = "posts";

const getPostsCollection = () => collection(getFirestoreDb(), POSTS_COLLECTION);

const getPostDoc = (postId: string) => doc(getFirestoreDb(), POSTS_COLLECTION, postId);

const toISOString = () => new Date().toISOString();
const sanitizeFileName = (fileName: string) =>
  fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

const uploadPostBackground = async (postId: string, file: File) => {
  const storageRef = ref(
    getFirebaseStorage(),
    `posts/${POST_SITE_ID}/${postId}/${Date.now()}-${sanitizeFileName(file.name)}`,
  );

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  return getDownloadURL(storageRef);
};

const deletePostBackgroundByUrl = async (backgroundUrl: string) => {
  if (!backgroundUrl) {
    return;
  }

  try {
    await deleteObject(ref(getFirebaseStorage(), backgroundUrl));
  } catch {
    // Ignore cleanup failures to avoid blocking the main post operation.
  }
};

const mapPostSnapshot = (
  snapshot:
    | DocumentSnapshot<DocumentData>
    | QueryDocumentSnapshot<DocumentData>,
): IPost | null => {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() as PostDocument;

  return {
    id: snapshot.id,
    siteId: data.siteId,
    title: data.title,
    htmlContent: data.htmlContent,
    backgroundUrl: data.backgroundUrl,
    authorId: data.authorId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};

const sortPostsByCreatedAtDesc = (posts: IPost[]) =>
  [...posts].sort((leftPost, rightPost) =>
    rightPost.createdAt.localeCompare(leftPost.createdAt),
  );

const assertPostId = (postId: string) => {
  if (!postId.trim()) {
    throw new Error("A valid post id is required.");
  }
};

const requirePost = async (postId: string): Promise<IPost> => {
  assertPostId(postId);

  const snapshot = await getDoc(getPostDoc(postId));
  const post = mapPostSnapshot(snapshot);

  if (!post) {
    throw new Error(`Post ${postId} was not found.`);
  }

  return post;
};

export const postsService = {
  async create(data: CreatePostInput): Promise<IPost> {
    const postRef = doc(getPostsCollection());
    const timestamp = toISOString();
    let backgroundUrl = "";

    if (data.backgroundFile) {
      backgroundUrl = await uploadPostBackground(postRef.id, data.backgroundFile);
    }

    const post: PostDocument = {
      siteId: POST_SITE_ID,
      title: data.title,
      htmlContent: data.htmlContent,
      backgroundUrl,
      authorId: data.authorId,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    };

    try {
      await setDoc(postRef, post);
    } catch (error) {
      await deletePostBackgroundByUrl(backgroundUrl);
      throw error;
    }

    return {
      id: postRef.id,
      ...post,
    };
  },

  async list(): Promise<IPost[]> {
    const snapshot = await getDocs(getPostsCollection());
    const posts = snapshot.docs
      .map((postSnapshot) => mapPostSnapshot(postSnapshot))
      .filter((post): post is IPost => post !== null)
      .filter(
        (post) => post.siteId === POST_SITE_ID && post.deletedAt === null,
      );

    return sortPostsByCreatedAtDesc(posts);
  },

  async update(data: UpdatePostInput): Promise<IPost> {
    const existingPost = await requirePost(data.id);

    if (existingPost.deletedAt !== null) {
      throw new Error(`Post ${data.id} has been deleted and cannot be updated.`);
    }

    const nextBackgroundUrl = data.backgroundFile
      ? await uploadPostBackground(data.id, data.backgroundFile)
      : existingPost.backgroundUrl;

    const updates: Partial<PostDocument> = {
      siteId: POST_SITE_ID,
      updatedAt: toISOString(),
      backgroundUrl: nextBackgroundUrl,
    };

    if (data.title !== undefined) {
      updates.title = data.title;
    }

    if (data.htmlContent !== undefined) {
      updates.htmlContent = data.htmlContent;
    }

    if (data.authorId !== undefined) {
      updates.authorId = data.authorId;
    }

    try {
      await updateDoc(getPostDoc(data.id), updates);
    } catch (error) {
      if (data.backgroundFile) {
        await deletePostBackgroundByUrl(nextBackgroundUrl);
      }
      throw error;
    }

    if (data.backgroundFile && existingPost.backgroundUrl) {
      await deletePostBackgroundByUrl(existingPost.backgroundUrl);
    }

    return {
      ...existingPost,
      ...updates,
      id: data.id,
    };
  },

  async delete(postId: string): Promise<IPost> {
    const existingPost = await requirePost(postId);

    if (existingPost.deletedAt !== null) {
      return existingPost;
    }

    const timestamp = toISOString();

    await updateDoc(getPostDoc(postId), {
      deletedAt: timestamp,
      updatedAt: timestamp,
    });

    return {
      ...existingPost,
      deletedAt: timestamp,
      updatedAt: timestamp,
    };
  },
};
