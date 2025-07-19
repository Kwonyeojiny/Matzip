import MatZipCard from "./MatZipCard";

const MatZipList = () => {
  return (
    <section className="w-full p-8 bg-gray-100">
      <h2 className="pb-8 text-center">맛집 목록</h2>
      <div className="flex flex-col gap-8">
        <div className="flex justify-around">
          <MatZipCard />
          <MatZipCard />
          <MatZipCard />
          <MatZipCard />
        </div>
        <div className="flex justify-around">
          <MatZipCard />
          <MatZipCard />
          <MatZipCard />
          <MatZipCard />
        </div>
      </div>
    </section>
  );
};

export default MatZipList;
