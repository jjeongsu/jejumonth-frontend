import { useEffect, useState } from 'react';
import { getUserLikedArticlesApi } from '../../../../../apis/supabaseApi';
import LikedPost from './LikedPost';

const LikedSection = () => {
  const [likedPostsData, setLikePostsData] = useState([]);

  async function getData(userId) {
    const data = await getUserLikedArticlesApi(userId);
    setLikePostsData(data);
    console.log(data);
  }
  useEffect(() => {
    getData('test');
  }, []);

  return (
    <>
      <div>
        <h2 className="text-24 text-gray-13 font-semibold">
          <strong className="text-primary-0">username</strong> 님이 좋아하는 게시글
        </h2>
      </div>

      <div className="mt-24">
        {!likedPostsData && <p className="py-32">아직 작성한 게시글이 없습니다!</p>}
        {likedPostsData &&
          likedPostsData.map(post => <LikedPost key={post.article_id} postData={post}></LikedPost>)}
      </div>
    </>
  );
};

export default LikedSection;
