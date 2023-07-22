export enum TaskStatus {
  NotUrgent = "Not Urgent",
  DueSoon = "Due Soon",
  Overdue = "Overdue",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  createAt: string;
  status: TaskStatus;
}
