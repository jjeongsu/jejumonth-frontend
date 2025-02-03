// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from './Post';
import { getUserPost } from '../../../../../apis/getUserData';
import { useSelector } from 'react-redux';
import MyPageHeader from '../common/myPageHeader';
import NoContent from '../common/NoContent';

const PostsSection = () => {
  const { userId } = useSelector(state => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [userId],
    queryFn: async ({ queryKey }) => {
      const [userId] = queryKey;
      const response = await getUserPost(userId);
      return response;
    },
  });

  if (isError) {
    console.error('post 데이터를 받아오는 데 실패했습니다. 잠시 후 다시 시도해주세요', error);
    throw new Error('post 데이터를 받아오는 데 실패했습니다. 잠시 후 다시 시도해주세요', error);
  }

  return (
    <>
      <MyPageHeader title={'작성한 게시글'}></MyPageHeader>

      <div className="mt-24">
        {isError && (
          <p className="py-32 text-red-500">
            오류가 발생했습니다. 잠시 후 다시 시도해주세요. {error}
          </p>
        )}
        {isLoading && <p className="py-32">로딩 중 ...</p>}
        {data.length > 0 ? (
          data && data.map(post => <Post key={post._id} postData={post}></Post>)
        ) : (
          <NoContent>아직 작성한 게시글이 없습니다!</NoContent>
        )}
      </div>
    </>
  );
};

export default PostsSection;
