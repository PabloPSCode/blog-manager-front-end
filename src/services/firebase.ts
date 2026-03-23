import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

type FirebaseConfig = {
  apiKey: string;
  authDomain?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;

const readEnvValue = (viteKey: keyof ImportMetaEnv) =>
  import.meta.env[viteKey] || undefined;

const readFirebaseConfig = (): FirebaseConfig => {
  const apiKey = readEnvValue("VITE_FIREBASE_API_KEY");
  const authDomain = readEnvValue("VITE_FIREBASE_AUTH_DOMAIN");
  const storageBucket = readEnvValue("VITE_FIREBASE_STORAGE_BUCKET");
  const projectId =
    readEnvValue("VITE_FIREBASE_PROJECT_ID") ??
    authDomain?.replace(".firebaseapp.com", "") ??
    storageBucket?.replace(".appspot.com", "").replace(".firebasestorage.app", "");

  const config = {
    apiKey,
    authDomain: authDomain ?? (projectId ? `${projectId}.firebaseapp.com` : undefined),
    projectId,
    storageBucket:
      storageBucket ?? (projectId ? `${projectId}.firebasestorage.app` : undefined),
    messagingSenderId: readEnvValue("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readEnvValue("VITE_FIREBASE_APP_ID"),
  };

  const missingConfig = Object.entries(config)
    .filter(([key, value]) =>
      ["apiKey", "projectId"].includes(key) ? !value : false,
    )
    .map(([key]) => key);

  if (missingConfig.length > 0) {
    throw new Error(
      `Missing Firebase config: ${missingConfig.join(
        ", ",
      )}. Fill the value in .env and restart the Vite server.`,
    );
  }

  return config as FirebaseConfig;
};

export const getFirebaseApp = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const config = readFirebaseConfig();

  firebaseApp =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey: config.apiKey,
          authDomain: config.authDomain,
          projectId: config.projectId,
          storageBucket: config.storageBucket,
          messagingSenderId: config.messagingSenderId,
          appId: config.appId,
        });

  return firebaseApp;
};

export const getFirestoreDb = (): Firestore => {
  if (firestoreDb) {
    return firestoreDb;
  }

  firestoreDb = getFirestore(getFirebaseApp());

  return firestoreDb;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (firebaseStorage) {
    return firebaseStorage;
  }

  firebaseStorage = getStorage(getFirebaseApp());

  return firebaseStorage;
};
