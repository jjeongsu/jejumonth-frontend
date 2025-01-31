import React from "react";
import Logo from "@public/icons/jejumonth-logo"

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-10">
      <div className="container mx-auto flex flex-wrap justify-between px-6">
        <div className="w-full md:w-1/4 flex flex-col items-start justify-center">
          <Logo />
          <p className="text-gray-600 mt-2 text-sm">
            Book your trip in minutes, get full control for much longer.
          </p>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">회사소개</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-orange-500">About</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Careers</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Mobile</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">이용약관</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Help / FAQ</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Press</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Affiliates</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">고객센터</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Airline fees</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Airline</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500">Low fare tips</a></li>
          </ul>
        </div>
      </div>


      <div className="border-t border-gray-300 mt-6 pt-4 text-center">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} JEJUMONTH. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
