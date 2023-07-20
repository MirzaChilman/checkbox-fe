import { Repository } from "@/hooks/useRepos/types";
import { atom } from "jotai";

/**
 * @desc for identifier of which repo is being opened
 */
export const repoKeywordAtom = atom("");

/**
 * @desc for storing the fetched user repo, using map so the look up
 * is O(1)
 */
export const repoUserAtom = atom(new Map<string, Repository[]>());
