import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { displayedDate } from "@/helpers/date";
import { useMemo, useState } from "react";
import { Task, TaskStatus } from "@/atoms/Task/types";
import useTaskQuery from "@/hooks/useTask/query";
import EditModal from "./EditModal";

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

const TaskList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data } = useTaskQuery();

  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
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
        render: (_, records) => {
          return (
            <Space>
              <Button type="primary" onClick={() => setSelectedTask(records)}>
                Edit
              </Button>
              <Button danger ghost>
                Delete
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);

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
      {JSON.stringify(selectedTask)}
      <Table dataSource={taskToTableData} columns={columns} />
      <EditModal
        open={Boolean(selectedTask)}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </>
  );
};

export default TaskList;
