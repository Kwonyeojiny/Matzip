import { useEffect, useState } from "react";
import MatZipCard from "./MatZipCard";
import { getMatZipPlace } from "../api/MatZipAPI";
import type { MatZip } from "../types/MatZip";

const MatZipList = () => {
  const [lists, setLists] = useState<MatZip[]>([]);

  useEffect(() => {
    const getMapZipList = async () => {
      const data = await getMatZipPlace();
      setLists(data);
    };

    getMapZipList();
  }, []);

  return (
    <section className="w-full p-8 bg-gray-100">
      <h2 className="pb-8 text-center">맛집 목록</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lists.map((list) => (
          <MatZipCard key={list.id} image={list.image} />
        ))}
      </div>
    </section>
  );
};

export default MatZipList;
