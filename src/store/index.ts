import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import appStore, { AppStore } from "./appStore";
export type StoreState = {
  appStore: AppStore;
};

type WithImmer = [["zustand/immer", never]];
type StoreCreator<T> = StateCreator<StoreState, WithImmer, [], T>;

const rootCreator: StoreCreator<StoreState> = (set, get) => ({
  appStore: appStore(set, get),
});

export const useStore = create<StoreState>()(immer(rootCreator));


export default useStore;
