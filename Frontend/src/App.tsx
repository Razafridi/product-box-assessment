import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import CustomerViewPage from './pages/CustomerViewPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CustomerPage />,
    },
    {
      path: '/view-customer',
      element: <CustomerViewPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
