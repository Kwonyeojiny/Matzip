interface MatZipCardImageProps {
  image: {
    src: string;
    alt: string;
  };
}

const MatZipCard = ({ image }: MatZipCardImageProps) => {
  return (
    <div>
      <img
        src={`http://localhost:3000/` + image.src}
        alt={image.alt}
        className="w-80 aspect-[5/3] rounded-lg"
      />
    </div>
  );
};

export default MatZipCard;
