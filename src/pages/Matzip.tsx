import MatZipList from "../components/MatZipList";
import MatZipPickList from "../components/MatZipPickList";

const Matzip = () => {
  return (
    <div className="flex flex-col gap-8">
      <MatZipPickList />
      <MatZipList />
    </div>
  );
};

export default Matzip;
