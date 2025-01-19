import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

function App() {
  console.log('hello world');
  return <RouterProvider router={router} />;
}

export default App;
