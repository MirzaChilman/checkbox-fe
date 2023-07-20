import { atom } from "jotai";

/**
 * @desc for keeping the onChange input value that can be used
 * in many hooks that require the form value
 */
export const inputKeywordsAtom = atom("");

/**
 * @desc for keeping the searched value when the button is clicked
 * this atom will be used as cache key in search repo based on username
 */
export const searchedKeywordsAtom = atom("");
