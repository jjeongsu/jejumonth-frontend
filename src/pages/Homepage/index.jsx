import useMySelector from '@/hooks/useMySelector';
import { useSelector, shallowEqual } from 'react-redux';

const HomePage = () => {
  const [userId, userFullName] = useMySelector(state => [
    state.user.userId,
    state.user.userFullName,
  ]);
  console.log(userId, userFullName);
  return (
    <div>
      HomePage
      <p>{userId && '유저 있어여 '}</p>
    </div>
  );
};

export default HomePage;
