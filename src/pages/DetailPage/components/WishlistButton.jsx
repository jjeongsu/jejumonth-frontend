import React, { useState } from "react";
import EmptyHeart from "/icons/emptyHeart.svg"

const WishlistButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
          <button
          className="w-[110px] h-[45px] rounded-[25px] bg-neutral-100 flex items-center justify-center gap-2 shadow-md"
          style={{
            boxShadow:
              "0px 35px 10px 0 rgba(97,97,97,0), 0px 22px 9px 0 rgba(97,97,97,0.01), 0px 13px 8px 0 rgba(97,97,97,0.05), 0px 6px 6px 0 rgba(97,97,97,0.09), 0px 1px 3px 0 rgba(97,97,97,0.1)",
          }}
        >
          <img src={EmptyHeart} alt="EmptyHeart" className="w-20 h-20" />
          <p className="text-sm text-[#595959]">  찜하기</p>
        </button>
      ) : (
        <div className="w-[110px] h-[45px] rounded-[25px] bg-neutral-100 flex items-center justify-center gap-2"></div>
      )}
    </div>
  );
};

export default WishlistButton;