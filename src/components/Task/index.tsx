import { useAtomValue } from "jotai";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { displayedDate } from "@/helpers/date";
import { useMemo } from "react";
import { Task, TaskStatus } from "@/atoms/Task/types";
import { taskAtom } from "@/atoms/Task";
import useTaskQuery from "@/hooks/useTask/query";

interface DataType extends Task {
  key: string;
}

const getStatusColor = (status: TaskStatus) => {
  const current = TaskStatus[status as keyof typeof TaskStatus];
  switch (current) {
    case TaskStatus.DueSoon:
      return "yellow";
    case TaskStatus.Overdue:
      return "red";
    case TaskStatus.NotUrgent:
      return "blue";
    default:
      return "light";
  }
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
    dataIndex: "createDate",
    key: "createDate",
    render: (date) => {
      return date ? displayedDate(date) : "";
    },
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (date) => {
      return date ? displayedDate(date) : "";
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      return (
        <Tag color={getStatusColor(status)}>
          {TaskStatus[status as keyof typeof TaskStatus]}
        </Tag>
      );
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
  const { data } = useTaskQuery();

  console.log({ data });

  const taskToTableData = useMemo(() => {
    return (data || [])?.map((task) => {
      return {
        ...task,
        key: task.name.toLocaleLowerCase(),
      };
    });
  }, [data]);

  return (
    <>
      <Table dataSource={taskToTableData} columns={columns} />
    </>
  );
};

export default TaskList;
