import PNG_IMAGES from '@public/images/image';

const CommunityPreviewCard = ({ post }) => {
  return (
    <div className="w-475 h-139 flex gap-17 justify-center items-center border border-solid border-gray-5 bg-gray-2 rounded-17">
      <div>
        <img
          src={post.image ? `${post.image}` : `${PNG_IMAGES.defaultCard}`}
          className="w-97 h-97 rounded-9"
        />
      </div>
      <div className="flex flex-col gap-10 w-325">
        <div className="font-semibold text-18 text-gray-8">{post?.author?.fullName}</div>
        <div className="font-regular text-15 text-gray-7">{post.title.slice(0, 80)}</div>
      </div>
    </div>
  );
};
export default CommunityPreviewCard;
