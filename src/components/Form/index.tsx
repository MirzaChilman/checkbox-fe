import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { useSetAtom } from "jotai";
import { taskAtom } from "@/atoms/Task";
import { Task } from "@/atoms/Task/types";
import { determineStatus } from "@/helpers/determineStatus";
import useNotification from "@/hooks/useSearchUser/useNotification";
import useTaskMutation from "@/hooks/useTask/mutation";
import dayjs from "dayjs";

const Forms = () => {
  const { contextHolder, successNotification, errorNotification } =
    useNotification();
  const { mutate } = useTaskMutation();

  const [form] = Form.useForm();
  const setTask = useSetAtom(taskAtom);

  const onFinish = (values: Omit<Task, "createAt" | "status">) => {
    const dueDate = dayjs(values.dueDate);
    const currentDate = dayjs();

    const newTask: Task = {
      ...values,
      createAt: new Date().toISOString(),
      status: determineStatus({ dueDate, currentDate }),
    };
    successNotification({
      message: "Success create task",
      description: `Task Name: ${values.name}`,
    });
    setTask((prev) => [...prev, newTask]);
    mutate();
  };

  const onFinishFailed = (errorInfo: any) => {
    errorNotification(errorInfo);
  };

  return (
    <div className="mt-10">
      {contextHolder}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="rounded-md" placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input className="rounded-md" placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please input your due date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Forms;
