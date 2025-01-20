import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { HomePage } from '../pages';
import AuthLayout from '../layouts/AuthLayout';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
<<<<<<< HEAD
import DetailPage from '../pages/DetailPage';
=======
import TripLayout from '../layouts/TripLayout.jsx';
import PlanLayout from '../layouts/PlanLayout.jsx';
import MyTripPage from '../pages/MyTripPage/index.jsx';
import AddTripPage from '../pages/AddTripPage/index.jsx';
import AddPlanPage from '../pages/AddPlanPage/index.jsx';
import CommunityPage from '../pages/CommunityPage';
>>>>>>> 7a373843490cae2d8a4864b90ca0e0c24244d1df

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/detail',
        element: <DetailPage/>
      }
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
        path: 'add-plan',
        element: <AddPlanPage />,
      },
    ],
  },
  {
    path: '/community',
    element: <CommunityPage />,
  }
]);

export default router;
