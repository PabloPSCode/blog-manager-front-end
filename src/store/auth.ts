import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isAuthenticated: boolean;
};

type Actions = {
  signIn: () => void;
  signOut: () => void;
};

export const useAuthenticationStore = create(
  persist<State & Actions>(
    (set) => ({
      isAuthenticated: false,
      signIn: () => {
        set({ isAuthenticated: true });
      },
      signOut: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
