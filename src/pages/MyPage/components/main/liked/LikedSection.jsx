import { useEffect, useState } from 'react';
import { getUserLikedArticlesApi } from '../../../../../apis/supabaseApi';
import LikedPost from './LikedPost';
import { useSelector } from 'react-redux';

const LikedSection = () => {
  const [likedPostsData, setLikePostsData] = useState([]);

  const { userId } = useSelector(state => state.user);

  async function getData(userId) {
    const data = await getUserLikedArticlesApi(userId);
    setLikePostsData(data);
    console.log(data);
  }
  useEffect(() => {
    getData(userId);
  }, [userId]);

  return (
    <>
      <div>
        <h2 className="text-24 text-gray-13 font-semibold">
          <strong className="text-primary-0">username</strong> 님이 좋아하는 게시글
        </h2>
      </div>

      <div className="mt-24">
        {likedPostsData.length === 0 && (
          <div className="flex justify-center items-center w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
            <p className="text-gray-7">아직 좋아요를 누른 게시글이 없습니다!</p>
          </div>
        )}
        {likedPostsData.length > 0 &&
          likedPostsData.map(post => <LikedPost key={post.article_id} postData={post}></LikedPost>)}
      </div>
    </>
  );
};

export default LikedSection;
