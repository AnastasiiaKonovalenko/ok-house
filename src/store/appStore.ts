import { StoreSlice } from "./index";

type State = {
  lang: string;
};

type Actions = {
  setLanguage: (lang: string) => void;
};

export type AppStore = State & Actions;

const useStore: StoreSlice<AppStore> = (set) => ({
  initDataRaw: "",
  lang: "en",
  isDonateModalOpen: false,
  setLanguage(lang) {
    set(s => {
      s.appStore.lang = lang;
      return s;
    });
  },
});

export default useStore;
