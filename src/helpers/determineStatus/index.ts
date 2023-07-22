import { TaskStatus } from "@/atoms/Task/types";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  currentDate: Dayjs;
  dueDate: Dayjs;
}

export const determineStatus = ({
  currentDate,
  dueDate,
}: Props): TaskStatus => {
  const differenceDay = dayjs(dueDate).diff(dayjs(currentDate));

  let status;

  if (differenceDay < 0) {
    status = TaskStatus.Overdue;
  } else if (differenceDay < 7) {
    status = TaskStatus.DueSoon;
  } else {
    status = TaskStatus.NotUrgent;
  }

  return status;
};
