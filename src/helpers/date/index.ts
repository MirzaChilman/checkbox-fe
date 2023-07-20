import { format } from "date-fns";

export const displayedDate = (date: Date = new Date()) => {
  return format(new Date(date), "yyyy-mm-dd");
};
