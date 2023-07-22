import { useAtomValue } from "jotai";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { displayedDate } from "@/helpers/date";
import { useMemo } from "react";
import { Task, TaskStatus } from "@/atoms/Task/types";
import { taskAtom } from "@/atoms/Task";

interface DataType extends Task {
  key: string;
}

const TagStatus: { [x in TaskStatus]: string } = {
  [TaskStatus.DueSoon]: "yellow",
  [TaskStatus.Overdue]: "red",
  [TaskStatus.NotUrgent]: "blue",
};

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Created At",
    dataIndex: "createAt",
    key: "createAt",
    render: (date) => {
      return displayedDate(date);
    },
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (date) => {
      return displayedDate(date);
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return <Tag color={TagStatus[status as TaskStatus]}>{status}</Tag>;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return (
        <Space>
          <Button type="primary">Edit</Button>
          <Button danger ghost>
            Delete
          </Button>
        </Space>
      );
    },
  },
];

const TaskList = () => {
  const tasks = useAtomValue(taskAtom);

  const taskToTableData = useMemo(() => {
    return tasks.map((task) => {
      return {
        ...task,
        key: task.name.toLocaleLowerCase(),
      };
    });
  }, [tasks]);

  return (
    <>
      <Table dataSource={taskToTableData} columns={columns} />
    </>
  );
};

export default TaskList;
