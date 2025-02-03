import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../../../../apis/getUserData';
import Comment from './Comment';
import { useSelector } from 'react-redux';

const CommentSection = () => {
  const { userId } = useSelector(state => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => await getUserData(userId),
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <>
      <article className="w-full">
        <div>
          <h2 className="text-24 text-gray-13 font-semibold">
            <strong className="text-primary-0">username</strong> 님이 작성한 댓글
          </h2>
        </div>

        <div className="mt-24">
          {data?.comments?.length === 0 && (
            <div className="flex justify-center items-center w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
              <p className="text-gray-7">아직 작성한 댓글이 없습니다!</p>
            </div>
          )}
          {data?.comments &&
            data.comments.map((comment, index) => (
              <Comment key={index} commentData={comment}></Comment>
            ))}
        </div>
      </article>
    </>
  );
};

export default CommentSection;
