import { atom } from "jotai";

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export const $user = atom<Partial<IUser> | null>(null);
export const $userLoader = atom<Boolean>(true);
