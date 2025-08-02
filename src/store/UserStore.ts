import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IuserStore {
  userDatas: IUserData;
  setUserDatas: (userDatas: IUserData) => void;
}

interface IUserData {
  email: string;
  username: string;
}

export const UserStore = create<IuserStore>()(
  persist(
    (set) => ({
      userDatas: {
        email: "",
        username: "",
      },
      setUserDatas: (userData: IUserData) =>
        set(() => ({ userDatas: userData })),
    }),
    { name: "userStore" },
  ),
);
