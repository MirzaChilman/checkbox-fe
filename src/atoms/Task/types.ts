export enum TaskStatus {
  NotUrgent = "Not Urgent",
  DueSoon = "Due Soon",
  Overdue = "Overdue",
}

export interface Task {
  name: string;
  description: string;
  dueDate: string;
  createAt: string;
  status: TaskStatus;
}
