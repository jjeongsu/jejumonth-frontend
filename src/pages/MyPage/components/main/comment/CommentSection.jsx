import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../../../../apis/getUserPost';
import Comment from './Comment';

const CommentSection = () => {
  const userId = '67908daee8a1e4349ed76ec2'; // 더미 데이터

  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await getUserData(userId);

      return response;
    },
  });

  return (
    <>
      <article className="w-full">
        <div>
          <h2 className="text-24 text-gray-13 font-semibold">
            <strong className="text-primary-0">username</strong> 님이 작성한 댓글
          </h2>
        </div>

        {!data && <p>데이터가 없습니다.</p>}

        <div className="mt-24">
          {data &&
            data.comments.map((comment, index) => (
              <Comment key={index} commentData={comment}></Comment>
            ))}
        </div>
      </article>
    </>
  );
};

export default CommentSection;
