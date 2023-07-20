import Form from "@/components/Form";
import useSearchUser from "@/hooks/useSearchUser";
import Repos from "@/components/Repos";
import Guard from "@/components/pages/Home/Guard";
import Task from "@/components/Task";

export default function Home() {
  const { data } = useSearchUser();

  return (
    <main className="container mx-auto px-4 mb-8">
      <Form />
      <Task />
      <Guard>
        <Repos items={data?.items || []} />
      </Guard>
    </main>
  );
}
