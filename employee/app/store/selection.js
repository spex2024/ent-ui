// stores/selectedMealStore.js
import { create } from "zustand";

const useSelectedMealStore = create((set) => ({
  selectedMeal: null,
  selectedOptions: {},
  openModal: (meal) => set({ selectedMeal: meal, selectedOptions: {} }),
  closeModal: () => set({ selectedMeal: null }),
  handleOptionChange: (category, optionName) =>
    set((state) => ({
      selectedOptions: { ...state.selectedOptions, [category]: optionName },
    })),
}));

export default useSelectedMealStore;
