import dummyImg from '../dummy-img.png';

const LikedSection = () => {
  return (
    <>
      <article className="w-full">
        <div>
          <h2 className="text-24 text-gray-13 font-semibold">
            <strong className="text-primary-0">username</strong> 님이 좋아하는 게시글
          </h2>
        </div>

        <div className="mt-24">
          <div className="w-full pt-40 px-20 pb-50 border-y border-y-gray-5 border-solid relative">
            <div className="">
              <div className="flex justify-between">
                <div
                  className="w-50 h-50 bg-cover bg-center rounded-[50%]"
                  style={{ backgroundImage: `url(${dummyImg})` }} // 게시글 작성자의 img
                  alt="테스트 이미지"
                ></div>

                <div className="flex flex-col w-[90%] justify-between">
                  <p className="text-16 text-gray-7">전체 · 1시간 전</p>
                  <p className="line-clamp-2 text-14 text-gray-8">
                    제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...1제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠
                    매년...2제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...3제주도야 뭐 ㅠㅠ 항상 좋은
                    여행지죠 매년...4제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...5제주도야 뭐 ㅠㅠ
                    항상 좋은 여행지죠 매년...6
                  </p>
                </div>
              </div>
            </div>
            {/* right conetnt */}
            <div className="icon-box absolute right-[3%] flex gap-20 mt-15">
              <div>
                <span>3</span>
              </div>
              <div>
                <span>3</span>
              </div>
              <div>
                <span>3</span>
              </div>
            </div>
            {/* right conetnt */}
          </div>
        </div>
      </article>
    </>
  );
};

export default LikedSection;
