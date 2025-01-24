// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from './Post';
import { getUserPost } from '../../../../../apis/getUserPost';

const PostsSection = () => {
  const userId = '67908daee8a1e4349ed76ec2'; // 더미 데이터
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTA4ZGFlZThhMWU0MzQ5ZWQ3NmVjMiIsImVtYWlsIjoidGVzdCJ9LCJpYXQiOjE3Mzc2OTk2ODF9.RCuyIwJ-9wIuR_gYYQc4gaLwjsmletQQMiWqKL9h5ug

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
    <article className="w-full">
      <div>
        <h2 className="text-24 text-gray-13 font-semibold">
          <strong className="text-primary-0">username</strong> 님이 작성한 게시글
        </h2>
      </div>

      <div className="mt-24">
        {isError && (
          <p className="py-32 text-red-500">
            오류가 발생했습니다. 잠시 후 다시 시도해주세요. {error}
          </p>
        )}
        {isLoading && <p className="py-32">로딩 중 ...</p>}
        {!data && <p className="py-32">아직 작성한 게시글이 없습니다!</p>}
        {data?.map(post => (
          <Post key={post._id} postData={post}></Post>
        ))}
      </div>
    </article>
  );
};

export default PostsSection;
