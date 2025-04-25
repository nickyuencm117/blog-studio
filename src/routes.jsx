import RootLayout from './layout/RootLayout.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import PostPage from './pages/PostPage/PostPage.jsx';
import EditPage from './pages/EditPage/EditPage.jsx';
import CommentPage from './pages/CommentPage/CommentPage.jsx';

const routes = [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'posts', element: <PostPage /> },
        { path: 'posts/:postId', element: <EditPage /> },
        { path: 'comments', element: <CommentPage /> }
      ]
    }
  ];

export default routes;