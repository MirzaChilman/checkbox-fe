import { notification } from "antd";

interface NotificationArgs {
  message: string;
  description: string;
}

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const successNotification = (args: NotificationArgs) => {
    api.info({
      message: args.message,
      description: args.description,
    });
  };

  const errorNotification = (args: NotificationArgs) => {
    api.error({
      message: args.message,
      description: args.description,
    });
  };

  return {
    contextHolder,
    successNotification,
    errorNotification,
  };
};

export default useNotification;
