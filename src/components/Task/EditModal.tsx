import { Task } from "@/atoms/Task/types";
import { Modal, Form, Input, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
interface Props {
  open: boolean;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

const EditModal = ({ open, selectedTask, setSelectedTask }: Props) => {
  const [form] = Form.useForm<Pick<Task, "name" | "description" | "dueDate">>();

  useEffect(() => {
    if (selectedTask) {
      console.log({ selectedTask });

      form.setFieldsValue({
        name: selectedTask.name,
        description: selectedTask.description,
        dueDate: dayjs(selectedTask.dueDate),
      });
    }
  }, [form, selectedTask]);

  const handleSubmit = () => {};
  const handleClose = () => {
    setSelectedTask(null);
  };

  return (
    <Modal open={open} onCancel={handleClose}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          name: selectedTask?.name,
          description: selectedTask?.description,
        }}
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
      </Form>
    </Modal>
  );
};

export default EditModal;
