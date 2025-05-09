import { create } from 'zustand';

interface TuningStore {
  receiverUserId: number | null;
  setReceiverUserId: (id: number) => void;
}

export const useTuningStore = create<TuningStore>((set) => ({
  receiverUserId: null,
  setReceiverUserId: (id) => set({ receiverUserId: id }),
}));
