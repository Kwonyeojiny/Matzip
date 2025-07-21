import type { MatZip } from "../types/MatZip";

interface MatZipCardProps {
  place: MatZip;
  onClick?: (place: MatZip) => void;
}

const MatZipCard = ({ place, onClick }: MatZipCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(place);
    }
  };

  return (
    <div onClick={handleClick}>
      <img
        src={`http://localhost:3000/` + place.image.src}
        alt={place.image.alt}
        className="w-80 aspect-[5/3] rounded-lg"
      />
    </div>
  );
};

export default MatZipCard;
