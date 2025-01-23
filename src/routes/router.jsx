import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import {
  HomePage,
  SigninPage,
  SignupPage,
  MyTripPage,
  AddTripPage,
  AddPlanPage,
  CommunityPage,
} from '../pages';
import AuthLayout from '../layouts/AuthLayout';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';

// TODO  Error element 추가하기
// TODO Path 상수처리하기
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <SigninPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
  {
    path: '/trip',
    element: <TripLayout />,
    children: [
      {
        path: 'add-trip',
        element: <AddTripPage />,
      },
      {
        path: 'my',
        element: <MyTripPage />,
      },
    ],
  },
  {
    path: '/plan',
    element: <PlanLayout />,
    children: [
      {
        path: '',
        element: <AddPlanPage />,
      },
    ],
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
    children: [
      {
        path: 'scrapsection',
        element: <ScrapSection />,
      },
      {
        path: 'postssection',
        element: <PostsSection />,
      },
      {
        path: 'commentsection',
        element: <CommentSection />,
      },
      {
        path: 'likedSection',
        element: <LikedSection />,
      },
      {
        path: 'scheduleSection',
        element: <ScheduleSection />,
      },
      {
        path: '',
        element: <Navigate to="scrapsection" replace />,
      },
    ],
  },
]);

export default router;
