import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeChoice = "light" | "dark";
type SavedItem = { id: string; title: string; kind: "place" | "route"; localOnly: true };
type ReportStatus = "idle" | "submitted-locally";

type AppState = {
  theme: ThemeChoice;
  onboardingComplete: boolean;
  selectedContext: string | null;
  travelerCount: number;
  selectedModes: string[];
  savedItems: SavedItem[];
  reportStatus: ReportStatus;
  setTheme: (theme: ThemeChoice) => void;
  completeOnboarding: () => void;
  setContext: (context: string) => void;
  setTravelerCount: (count: number) => void;
  toggleMode: (mode: string) => void;
  saveItem: (item: SavedItem) => void;
  submitLocalReport: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      onboardingComplete: false,
      selectedContext: null,
      travelerCount: 1,
      selectedModes: [],
      savedItems: [],
      reportStatus: "idle",
      setTheme: (theme) => set({ theme }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      setContext: (selectedContext) => set({ selectedContext }),
      setTravelerCount: (travelerCount) => set({ travelerCount }),
      toggleMode: (mode) =>
        set((state) => ({
          selectedModes: state.selectedModes.includes(mode)
            ? state.selectedModes.filter((item) => item !== mode)
            : [...state.selectedModes, mode],
        })),
      saveItem: (item) =>
        set((state) => ({
          savedItems: state.savedItems.some((saved) => saved.id === item.id)
            ? state.savedItems
            : [...state.savedItems, item],
        })),
      submitLocalReport: () => set({ reportStatus: "submitted-locally" }),
    }),
    {
      name: "contextroute-local-state",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
        onboardingComplete: state.onboardingComplete,
        selectedContext: state.selectedContext,
        travelerCount: state.travelerCount,
        selectedModes: state.selectedModes,
        savedItems: state.savedItems,
        reportStatus: state.reportStatus,
      }),
    },
  ),
);
