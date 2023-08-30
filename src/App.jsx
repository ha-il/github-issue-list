import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import IssueDetailPage from './pages/IssueDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: ':issueNumber', element: <IssueDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
