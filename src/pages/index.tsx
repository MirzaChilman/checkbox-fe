import Form from "@/components/Form";
import Task from "@/components/Task";
import useTaskQuery from "@/hooks/useTask/query";

export default function Home() {
  const { data } = useTaskQuery();
  console.log({ data });

  return (
    <main className="container mx-auto px-4 mb-8">
      <Form />
      <Task />
    </main>
  );
}
