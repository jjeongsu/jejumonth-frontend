import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div>
      기본 레이아웃 입니다.
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
