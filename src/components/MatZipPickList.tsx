import { useEffect, useState } from "react";
import type { MatZip } from "../types/MatZip";
import { getMatZipPickPlace } from "../api/MatZipAPI";
import MatZipCard from "./MatZipCard";

const MatZipPickList = () => {
  const [lists, setLists] = useState<MatZip[]>([]);

  useEffect(() => {
    const getMapZipList = async () => {
      const data = await getMatZipPickPlace();
      setLists(data);
    };

    getMapZipList();
  }, []);

  return (
    <section className="w-full p-8 bg-gray-100">
      <h2 className="pb-8 text-center">찜한 맛집</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lists.map((list) => (
          <MatZipCard key={list.id} image={list.image} />
        ))}
      </div>
    </section>
  );
};

export default MatZipPickList;
