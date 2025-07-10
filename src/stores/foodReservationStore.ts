import { create } from 'zustand';

interface FoodReservation {
  foodItemValue: string;
  month: string;
  panelId: string;
  questionName: string; // 'food_plan_low_risk' or 'food_plan_high_risk'
}

interface FoodReservationStore {
  reservations: FoodReservation[];
  addReservation: (reservation: FoodReservation) => void;
  removeReservation: (foodItemValue: string, panelId: string, questionName: string) => void;
  updateReservations: (panelId: string, questionName: string, foodItems: string[], month: string) => void;
  getReservedFoods: (questionName: string, excludePanelId?: string) => Map<string, string>;
  clearReservations: (questionName: string) => void;
  clearAllReservations: () => void;
}

export const useFoodReservationStore = create<FoodReservationStore>((set, get) => ({
  reservations: [],
  
  addReservation: (reservation) => {
    set((state) => ({
      reservations: [...state.reservations, reservation]
    }));
  },
  
  removeReservation: (foodItemValue, panelId, questionName) => {
    set((state) => ({
      reservations: state.reservations.filter(
        r => !(r.foodItemValue === foodItemValue && r.panelId === panelId && r.questionName === questionName)
      )
    }));
  },
  
  updateReservations: (panelId, questionName, foodItems, month) => {
    set((state) => {
      // Remove all existing reservations for this panel
      const filteredReservations = state.reservations.filter(
        r => !(r.panelId === panelId && r.questionName === questionName)
      );
      
      // Add new reservations for selected food items
      const newReservations = foodItems.map(foodItemValue => ({
        foodItemValue,
        month,
        panelId,
        questionName
      }));
      
      return {
        reservations: [...filteredReservations, ...newReservations]
      };
    });
  },
  
  getReservedFoods: (questionName, excludePanelId) => {
    const state = get();
    const reservedMap = new Map<string, string>();
    
    state.reservations
      .filter(r => r.questionName === questionName && r.panelId !== excludePanelId)
      .forEach(r => {
        reservedMap.set(r.foodItemValue, r.month);
      });
    
    return reservedMap;
  },
  
  clearReservations: (questionName) => {
    set((state) => ({
      reservations: state.reservations.filter(r => r.questionName !== questionName)
    }));
  },
  
  clearAllReservations: () => {
    set({ reservations: [] });
  }
}));