import { useState } from "react";
import MatZipList from "../components/MatZipList";
import MatZipPickList from "../components/MatZipPickList";

const Matzip = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-8">
      <MatZipPickList refreshTrigger={refreshTrigger} />
      <MatZipList onPickUpdate={handleRefresh} />
    </div>
  );
};

export default Matzip;
