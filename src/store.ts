import { create } from "zustand";

type State = {
  message: string;
};

interface PropsAction {
  updateMessage: (message: State["message"]) => void;
}

export const useSendMessage = create<PropsAction & State>()((set) => ({
  message: "",
  updateMessage: (message: string) => set(() => ({ message: message })),
}));
