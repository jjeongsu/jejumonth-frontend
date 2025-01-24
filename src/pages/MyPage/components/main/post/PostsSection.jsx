// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from './Post';
import { getUserPost } from '../../../../../apis/getUserPost';

const PostsSection = () => {
  const userId = '67908daee8a1e4349ed76ec2'; // 더미 데이터

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [userId],
    queryFn: async ({ queryKey }) => {
      const [userId] = queryKey;
      const response = await getUserPost(userId);
      return response;
    },
  });

  if (isLoading) {
    console.log('로딩상태');
  }
  if (data) {
    console.log(data);
  }

  if (isError) {
    console.error('오류가 발생했습니다.', error);
  }

  return (
    <article className="w-full">
      <div>
        <h2 className="text-24 text-gray-13 font-semibold">
          <strong className="text-primary-0">username</strong> 님이 작성한 게시글
        </h2>
      </div>

      <div className="mt-24">
        {data?.map(post => (
          <Post key={post._id} postData={post}></Post>
        ))}
      </div>
    </article>
  );
};

export default PostsSection;
