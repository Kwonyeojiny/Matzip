import { useEffect, useState } from "react";
import type { MatZip } from "../types/MatZip";
import { deleteMatZipPickPlace, getMatZipPickPlace } from "../api/MatZipAPI";
import MatZipCard from "./MatZipCard";
import { sortPlacesByDistance } from "../utils/loc";
import Modal from "./common/Modal";

interface MatZipPickListProps {
  refreshTrigger?: boolean;
}

const MatZipPickList = ({ refreshTrigger }: MatZipPickListProps) => {
  const [lists, setLists] = useState<MatZip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteMatZipPickPlace(selectedId);
      setLists((prev) => prev.filter((place) => place.id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error("찜한 맛집 삭제에 실패했습니다: ", err);
      setError("찜한 맛집 삭제 중 문제가 발생했습니다.");
    }
  };

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
    <>
      <section className="w-full p-8 bg-gray-100">
        <h2 className="pb-8 text-center">찜한 맛집</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {lists.map((list) =>
            list && list.id && list.image ? (
              <MatZipCard
                key={list.id}
                place={list}
                onClick={() => {
                  setSelectedId(list.id);
                  setShowModal(true);
                }}
              />
            ) : null
          )}
        </div>
      </section>
      {showModal && selectedId && (
        <Modal
          message="찜한 맛집을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MatZipPickList;
