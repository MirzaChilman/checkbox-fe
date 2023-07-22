import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { FormTask } from "@/atoms/Task/types";
import useNotification from "@/hooks/useSearchUser/useNotification";
import useTaskCreateMutation from "@/hooks/useTask/mutation/useTaskCreateMutation";

const Forms = () => {
  const { contextHolder, successNotification, errorNotification } =
    useNotification();
  const { mutate } = useTaskCreateMutation();

  const [form] = Form.useForm();

  const onFinish = (values: FormTask) => {
    successNotification({
      message: "Success create task",
      description: `Task Name: ${values.name}`,
    });
    form.resetFields();
    mutate(values);
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
