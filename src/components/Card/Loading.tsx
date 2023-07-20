import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div
      data-testid="loading-container"
      className="flex flex-col border rounded-lg bg-atask gap-4 p-4"
    >
      {[1, 2, 3, 4, 5].map((idx) => {
        return (
          <Skeleton.Input
            key={idx}
            className="border-b mb-2"
            size="small"
            active
          />
        );
      })}
    </div>
  );
};

export default Loading;
