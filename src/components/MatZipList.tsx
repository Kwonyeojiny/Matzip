import { useEffect, useState } from "react";
import MatZipCard from "./MatZipCard";
import { getMatZipPlace } from "../api/MatZipAPI";
import type { MatZip } from "../types/MatZip";

const MatZipList = () => {
  const [lists, setLists] = useState<MatZip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMapZipList = async () => {
      try {
        const data = await getMatZipPlace();
        setLists(data);
      } catch (error) {
        console.error("맛집 목록을 가져오는 데 실패했습니다: ", error);
      } finally {
        setLoading(false);
      }
    };
    getMapZipList();
  }, []);

  if (loading) {
    return (
      <section className="w-full p-8 bg-gray-100 text-center">
        <h2 className="pb-8">맛집 목록</h2>
        <div>데이터를 불러오는 중입니다...</div>
      </section>
    );
  }

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
