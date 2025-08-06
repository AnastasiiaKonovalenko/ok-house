import { create, GetState, SetState } from "zustand";
import { immer } from "zustand/middleware/immer";

import appStore, { AppStore } from "./appStore";

export type StoreState = {
  appStore: AppStore;
};

export type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T;

const useStore = create(
  immer<StoreState>((set, get) => ({
    appStore: appStore(set, get),
  }))
);

export default useStore;
