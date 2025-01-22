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
  DetailPage,
} from '../pages';
import AuthLayout from '../layouts/AuthLayout';
import TripLayout from '../layouts/TripLayout.jsx';
import PlanLayout from '../layouts/PlanLayout.jsx';

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
    
    path: '/detail/:contentsid',
    element: <DetailPage/>
    
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
]);

export default router;
