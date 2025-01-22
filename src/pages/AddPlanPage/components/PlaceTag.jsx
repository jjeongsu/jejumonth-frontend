import { useNavigate } from 'react-router-dom';

const PlaceTagButton = ({ title, contentId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detailpage?content_id=${contentId}`);
  };

  return (
    <button
      className="w-auto h-39 bg-gray-4 rounded-20 flex justify-center items-center"
      onClick={handleClick}
    >
      <div className="left-12 top-8 text-center mx-20 text-black text-15 font-semibold">
        {title}
      </div>
    </button>
  );
};

export default PlaceTagButton;
