import dayjs from "dayjs";

export const displayedDate = (date: Date = new Date()) => {
  return dayjs(new Date(date)).format("YYYY, MMMM DD");
};
