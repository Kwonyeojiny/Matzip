import { useEffect, useState } from "react";
import MatZipCard from "./MatZipCard";
import { getMatZipPlace } from "../api/MatZipAPI";
import type { MatZip } from "../types/MatZip";
import { sortPlacesByDistance } from "../utils/loc";

const MatZipList = () => {
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
        const data = await getMatZipPlace();

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
        console.error("맛집 목록을 가져오는 데 실패했습니다: ", err);
        setError("맛집 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getMapZipList();
  }, [userLocation]);

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
