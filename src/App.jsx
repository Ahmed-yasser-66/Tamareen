import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ExercisesProvider } from './contexts/ExercisesContext';
import { UserProvider } from './contexts/UserContext';
import Loader from './components/Loader';
import { loader as exerciseLoader } from './pages/ExerciseDetails';
import ErrorPage from './pages/ErrorPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const ExerciseDetails = lazy(() => import('./pages/ExerciseDetails'));

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
    errorElement: <ErrorPage />,
  },
  {
    path: 'app/:Id',
    element: <ExerciseDetails />,
    loader: exerciseLoader,
    errorElement: <ErrorPage />,
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
