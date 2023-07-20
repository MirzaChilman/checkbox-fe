import { TaskStatus } from "@/atoms/Task/types";
import { differenceInDays } from "date-fns";

interface Props {
  currentDate: Date;
  dueDate: Date;
}

export const determineStatus = ({
  currentDate,
  dueDate,
}: Props): TaskStatus => {
  const differenceDay = differenceInDays(dueDate, currentDate);

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
