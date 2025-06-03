import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IuserStore {
  userDatas: IUserData;
  setUserDatas: (userDatas: IUserData) => void;
}

interface IUserData {
  nom: string;
  prenom: string;
  username: string;
  role: string;
  agence: string;
  agenceLibelle: string;
}

export const UserStore = create<IuserStore>()(
  persist(
    (set) => ({
      userDatas: {
        nom: "",
        prenom: "",
        username: "",
        role: "",
        agence: "",
        agenceLibelle: "",
      },
      setUserDatas: (userData: IUserData) =>
        set(() => ({ userDatas: userData })),
    }),
    { name: "userStore" },
  ),
);
