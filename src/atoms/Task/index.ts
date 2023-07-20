import { atom } from "jotai";
import { Task } from "./types";

export const taskAtom = atom<Task[]>([]);
