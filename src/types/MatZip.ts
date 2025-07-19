export interface MatZip {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
  description: string;
}

export interface MatZipListProps {
  title: string;
}
