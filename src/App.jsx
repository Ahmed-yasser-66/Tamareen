import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ExercisesProvider } from './contexts/ExercisesContext';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader';
import { UserProvider } from './contexts/UserContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/app',
    element: (
      <ExercisesProvider>
        <UserProvider>
          <AppLayout />
        </UserProvider>
      </ExercisesProvider>
    ),
  },
  {
    path: 'app/:exercisesId',
    element: <About />,
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
