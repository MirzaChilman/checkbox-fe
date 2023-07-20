import Form from "@/components/Form";
import useSearchUser from "@/hooks/useSearchUser";
import Guard from "@/components/pages/Home/Guard";
import Task from "@/components/Task";

export default function Home() {
  const { data } = useSearchUser();

  return (
    <main className="container mx-auto px-4 mb-8">
      <Form />
      <Task />
      <Guard>test</Guard>
    </main>
  );
}
