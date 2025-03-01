import { FaRegTrashAlt } from "react-icons/fa";
import { ImageData } from "@/app/types/image";
type ImageCardProps = {
  item: ImageData;
  onImageClick: (item: ImageData) => void;
  onTrashClick: (id: number) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ item, onImageClick, onTrashClick }) => {
  return (
    <div
      key={item.id}
      onClick={() => onImageClick(item)}
      className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
    >
      <button
        className="absolute top-1 right-1 text-gray-200 hover:text-white p-1 flex items-center justify-center hover:font-bold z-10 pointer-events-auto"
        aria-label="Cancel upload"
        onClick={(e) => {
          e.stopPropagation();
          onTrashClick(item.id);
        }}
      >
        <FaRegTrashAlt strokeWidth={2} size={20} />
      </button>
      <img src={item.url} alt={item.name} className="w-full h-48 object-cover" />
      <p className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-md text-center text-white font-medium transition hover:bg-opacity-60">
        {item.name}
      </p>
    </div>
  );
};

export default ImageCard;
