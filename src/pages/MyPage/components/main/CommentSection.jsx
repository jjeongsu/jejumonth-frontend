const CommentSection = () => {
  return (
    <>
      <article className="w-full">
        <div>
          <h2 className="text-24 text-gray-13 font-semibold">
            <strong className="text-primary-0">username</strong> 님이 작성한 댓글
          </h2>
        </div>

        <div className="mt-24">
          <div className="w-full py-30 px-20 border-y border-y-gray-5 border-solid relative">
            <p className="text-16 text-gray-7 mb-16">전체 · 1시간 전</p>
            <p className="line-clamp-2 text-14 text-gray-8 leading-16">
              제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...1제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠
              매년...2제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...3제주도야 뭐 ㅠㅠ 항상 좋은
              여행지죠 매년...4제주도야 뭐 ㅠㅠ 항상 좋은 여행지죠 매년...5제주도야 뭐 ㅠㅠ 항상
              좋은 여행지죠 매년...6
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default CommentSection;
