import { atom } from "jotai";

interface IUser {
  username: string;
  email: string;
  password: string;
}

export const $user = atom<Partial<IUser> | null>(null);
