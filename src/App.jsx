import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
