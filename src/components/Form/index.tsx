import { Button, Form, Input, DatePicker } from "antd";
import { useSetAtom } from "jotai";
import { differenceInDays } from "date-fns";

import React from "react";
import { taskAtom } from "@/atoms/Task";
import { Task, TaskStatus } from "@/atoms/Task/types";

const Forms = () => {
  const [form] = Form.useForm();
  const setTask = useSetAtom(taskAtom);

  const onFinish = (values: Omit<Task, "createAt" | "status">) => {
    const dueDate = new Date(values.dueDate);
    const currentDate = new Date();

    const differenceDay = differenceInDays(dueDate, currentDate);

    let status;

    if (differenceDay < 0) {
      status = TaskStatus.Overdue;
    } else if (differenceDay < 7) {
      status = TaskStatus.DueSoon;
    } else {
      status = TaskStatus.NotUrgent;
    }
    const newTask: Task = {
      ...values,
      createAt: new Date().toISOString(),
      status: status,
    };

    setTask((prev) => [...prev, newTask]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-10">
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
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Forms;
