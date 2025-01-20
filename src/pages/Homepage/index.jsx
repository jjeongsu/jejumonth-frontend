import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector(state => state.user);
  console.log('user-redux', user);
  return (
    <div>
      HomePage
      <p>user가 있습니까? {user.userEmail !== '' ? 'yes' : 'no'}</p>
    </div>
  );
};

export default HomePage;
