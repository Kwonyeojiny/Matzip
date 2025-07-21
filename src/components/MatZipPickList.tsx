import { useEffect, useState } from "react";
import type { MatZip } from "../types/MatZip";
import { getMatZipPickPlace } from "../api/MatZipAPI";
import MatZipCard from "./MatZipCard";
import { sortPlacesByDistance } from "../utils/loc";

interface MatZipPickListProps {
  refreshTrigger?: boolean;
}

const MatZipPickList = ({ refreshTrigger }: MatZipPickListProps) => {
  const [lists, setLists] = useState<MatZip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("사용자의 위치를 가져오는 데 실패했습니다: ", err);
          setUserLocation(null);
        }
      );
    }
  }, []);

  useEffect(() => {
    const getMapZipList = async () => {
      try {
        const data = await getMatZipPickPlace();

        if (userLocation) {
          const sorted = sortPlacesByDistance(
            data,
            userLocation.lat,
            userLocation.lon
          );
          setLists(sorted);
        } else {
          setLists(data);
        }
      } catch (err) {
        console.error("찜한 맛집 정보를 가져오는 데 실패했습니다: ", err);
        setError("찜한 맛집 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getMapZipList();
  }, [userLocation, refreshTrigger]);

  if (loading) {
    return (
      <section className="w-full p-8 bg-gray-100 text-center">
        <h2 className="pb-8">맛집 목록</h2>
        <div>데이터를 불러오는 중입니다...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full p-8 bg-gray-100 text-center">
        <h2 className="pb-8">맛집 목록</h2>
        <div>{error}</div>
      </section>
    );
  }

  return (
    <section className="w-full p-8 bg-gray-100">
      <h2 className="pb-8 text-center">찜한 맛집</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lists.map((list) =>
          list && list.id && list.image ? (
            <MatZipCard key={list.id} place={list} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default MatZipPickList;
