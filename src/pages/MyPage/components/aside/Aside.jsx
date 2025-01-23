import ScrapIcon from '../icon/ScrapIcon';
import PostsIcon from '../icon/PostsIcon ';
import MessageIcon from '../icon/MessageIcon';
import LikesIcon from '../icon/LikesIcon';

import dummyImg from '../dummy-img.png';
import { NavLink } from 'react-router';

const Aside = () => {
  const navData = [
    { icon: ScrapIcon, title: '내 스크랩', link: '/mypage/scrapsection' },
    { icon: PostsIcon, title: '작성한 게시글', link: '/mypage/postssection' },
    { icon: MessageIcon, title: '작성한 댓글', link: '/mypage/commentsection' },
    { icon: LikesIcon, title: '좋아요 누른 게시판', link: '/mypage/likedSection' },
    { icon: LikesIcon, title: '내 여행 일정', link: '/mypage/scheduleSection' },
  ];

  return (
    <aside className="w-234 h-auto">
      <div className="w-234 border border-[#F0F0F0] rounded-21 shadow-[0px_0px_9px_0px_#dbdbdb] h-240">
        <div className="pt-20 w-full h-full rounded-96 flex flex-col items-center">
          <div
            className="w-96 h-96 bg-cover bg-center rounded-[50%]"
            style={{ backgroundImage: `url(${dummyImg})` }}
            alt="테스트 이미지"
          ></div>
          <p className="text-16 mt-8 font-semibold text-center">UseName</p>
          <div className="flex justify-around w-[55%] mt-8 ">
            <div>
              <p className="text-gray-6 text-10">
                팔로잉 <span className="text-sub-accent-2 text-10">3</span>
              </p>
            </div>
            <div>
              <p className="text-gray-6 text-10">
                팔로우 <span className="text-sub-accent-2 text-10">2</span>
              </p>
            </div>
          </div>
          <button className="mt-10 p-[14px_40px] border border-[gray-5] rounded-15 text-12">
            프로필 수정
          </button>
        </div>
      </div>

      <nav className="w-full pt-20">
        <ul className="w-full flex flex-col items-center border-b border-solid border-b-gray-5 gap-14">
          {navData.map((item, index) => (
            <li
              key={item.title}
              className={`${index === 0 ? 'first:border-b border-solid border-b-gray-5' : ''}  w-full py-10`}
            >
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `text-center flex justify-center items-center gap-16 py-8 ${isActive ? 'font-bold text-sub-accent-1' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon active={isActive} />
                    <p className={`text-14 ${isActive ? 'text-sub-accent-1' : 'text-gray-10'}`}>
                      {item.title}
                    </p>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 items-center justify-center mt-14">
          <div className="py-12 px-30 border border-solid border-gray-5 rounded-12">
            <span className="text-[#FF5959] text-14 font-semi">로그아웃</span>
          </div>
          <div className="py-12 px-30 border border-solid border-gray-5 rounded-12">
            <span className="text-gray-5 text-14 font-semi">회원 탈퇴</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Aside;
