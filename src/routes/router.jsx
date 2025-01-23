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
  MyPage,
  DetailPage,
  SearchPage,
} from '../pages';
import AuthLayout from '../layouts/AuthLayout';
import TripLayout from '../layouts/TripLayout.jsx';
import PlanLayout from '../layouts/PlanLayout.jsx';
import ScrapSection from '../pages/MyPage/components/main/ScrapSection.jsx';
import PostsSection from '../pages/MyPage/components/main/PostsSection.jsx';
import CommentSection from '../pages/MyPage/components/main/CommentSection.jsx';
import LikedSection from '../pages/MyPage/components/main/LikedSection.jsx';
import ScheduleSection from '../pages/MyPage/components/main/ScheduleSection.jsx';

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
      { path: '/search', element: <SearchPage /> },
      {
        path: 'user',
        element: <MyPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: '/detail/:contentsid', // 도메인/detail/3
        element: <DetailPage />,
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
  // {
  //   path: '/mypage',
  //   element: <MyPage />,
  //   children: [
  //     {
  //       path: 'scrapsection',
  //       element: <ScrapSection />,
  //     },
  //     {
  //       path: 'postssection',
  //       element: <PostsSection />,
  //     },
  //     {
  //       path: 'commentsection',
  //       element: <CommentSection />,
  //     },
  //     {
  //       path: 'likedSection',
  //       element: <LikedSection />,
  //     },
  //     {
  //       path: 'scheduleSection',
  //       element: <ScheduleSection />,
  //     },
  //     {
  //       path: '',
  //       element: <Navigate to="scrapsection" replace />,
  //     },
  //   ],
  // },
]);

export default router;