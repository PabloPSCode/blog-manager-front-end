import type { ISite } from "@/dtos";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const AUTH_STORAGE_NAME = "auth-storage";

type State = {
  isAuthenticated: boolean;
  jwt: string | null;
  site: ISite | null;
  hasHydrated: boolean;
  isLoadingSession: boolean;
};

type Actions = {
  signIn: (payload: { jwt: string; site: ISite }) => void;
  signOut: () => void;
  setSite: (site: ISite) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setSessionLoading: (isLoadingSession: boolean) => void;
};

const sanitizeSite = (site: ISite): ISite => ({
  ...site,
  password: "",
});

export const useAuthenticationStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      jwt: null,
      site: null,
      hasHydrated: false,
      isLoadingSession: true,
      signIn: ({ jwt, site }) => {
        set({
          isAuthenticated: true,
          jwt,
          site: sanitizeSite(site),
          isLoadingSession: true,
        });
      },
      signOut: () => {
        set((state) => ({
          isAuthenticated: false,
          jwt: null,
          site: null,
          hasHydrated: state.hasHydrated,
          isLoadingSession: false,
        }));
      },
      setSite: (site) => {
        set((state) => ({
          site: sanitizeSite(site),
          isAuthenticated: Boolean(state.jwt),
        }));
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
      setSessionLoading: (isLoadingSession) => {
        set({ isLoadingSession });
      },
    }),
    {
      name: AUTH_STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        jwt: state.jwt,
        site: state.site,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const getAuthenticatedSiteId = () => {
  const siteId = useAuthenticationStore.getState().site?.id?.trim();

  if (!siteId) {
    throw new Error("Authenticated site id is required.");
  }

  return siteId;
};
