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
  CommunityDetailPage,
  MyPage,
  DetailPage,
  SearchPage,
} from '../pages';
import AuthLayout from '../layouts/AuthLayout';
import TripLayout from '../layouts/TripLayout.jsx';
import PlanLayout from '../layouts/PlanLayout.jsx';
import ScrapSection from '../pages/MyPage/components/main/scrap/ScrapSection.jsx';
import PostsSection from '../pages/MyPage/components/main/post/PostsSection.jsx';
import CommentSection from '../pages/MyPage/components/main/comment/CommentSection.jsx';
import LikedSection from '../pages/MyPage/components/main/liked/LikedSection.jsx';
import ScheduleSection from '../pages/MyPage/components/main/ScheduleSection.jsx';
import UpdateUserSection from '../pages/MyPage/components/main/updateUserProfile/UpdateUserSection.jsx';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

// TODO  Error element 추가하기
// TODO Path 상수처리하기

const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      { path: '/search', element: <SearchPage /> },
      {
        path: '/community',
        element: <CommunityPage />,
      },
      {
        path: '/community/post/:postId',
        element: <CommunityDetailPage />,
      },
      {
        path: '/detail/:contentsid',
        element: <DetailPage />,
      },
    ],
  },
  {
    path: '',
    element: <PublicRoute />,
    children: [
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: '/auth',
            element: <SigninPage />,
          },
          {
            path: '/auth/signup',
            element: <SignupPage />,
          },
          {
            path: '/auth/*',
            element: <Navigate to="/auth" replace />,
          },
        ],
      },
    ],
  },
  {
    path: '',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <TripLayout />,
        children: [
          {
            path: '/trip/add-trip',
            element: <AddTripPage />,
          },
          {
            path: '/trip/my',
            element: <MyTripPage />,
          },
        ],
      },
      {
        path: '',
        element: <PlanLayout />,
        children: [
          {
            path: '/plan',
            element: <AddPlanPage />,
          },
        ],
      },
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <MyPage />,
            children: [
              {
                path: '/mypage/scrapsection',
                element: <ScrapSection />,
              },
              {
                path: '/mypage/postssection',
                element: <PostsSection />,
              },
              {
                path: '/mypage/commentsection',
                element: <CommentSection />,
              },
              {
                path: '/mypage/likedSection',
                element: <LikedSection />,
              },
              {
                path: '/mypage/scheduleSection',
                element: <ScheduleSection />,
              },
              {
                path: '/mypage/update',
                element: <UpdateUserSection />,
              },
              {
                path: '/mypage/*',
                element: <Navigate to="/mypage/scrapsection" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
