import { useEffect, useState } from 'react';
import { getAllUserLikedArticlesApi } from '../../../../../apis/supabaseApi';
import LikedPost from './LikedPost';
import { useSelector } from 'react-redux';
import MyPageHeader from '../common/myPageHeader';
import NoContent from '../common/NoContent';

const LikedSection = () => {
  const [likedPostsData, setLikePostsData] = useState([]);

  const userId = useSelector(state => state.user.userId);

  async function getData(userId) {
    const data = await getAllUserLikedArticlesApi(userId);
    setLikePostsData(data);
    console.log(data);
  }
  useEffect(() => {
    getData(userId);
  }, [userId]);

  return (
    <>
      <MyPageHeader title={'좋아하는 게시글'}></MyPageHeader>

      <div className="mt-24">
        {likedPostsData.length > 0 ? (
          likedPostsData.map(post => <LikedPost key={post.article_id} postData={post}></LikedPost>)
        ) : (
          <NoContent>아직 좋아요를 누른 게시글이 없습니다!</NoContent>
        )}
      </div>
    </>
  );
};

export default LikedSection;
