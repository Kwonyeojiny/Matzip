import MatZipCard from "./MatZipCard";

const MatZipPickList = () => {
  return (
    <section className="w-full p-8 bg-gray-100">
      <h2 className="pb-8 text-center">찜한 맛집</h2>
      <div className="flex justify-around">
        <MatZipCard />
        <MatZipCard />
        <MatZipCard />
        <MatZipCard />
      </div>
    </section>
  );
};

export default MatZipPickList;
