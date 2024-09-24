import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ExercisesProvider } from './contexts/ExercisesContext';
import { UserProvider } from './contexts/UserContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const MainApp = lazy(() => import('./pages/MainApp'));
const SavedExercises = lazy(() => import('./pages/SavedExercises'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Creator = lazy(() => import('./pages/Creator'));
const ExerciseDetails = lazy(() => import('./pages/ExerciseDetails'));

import CategoryExercises from './components/CategoryExercises';
import HomeLayout from './components/HomeLayout';
import InitExercises from './components/InitExercises';
import Loader from './components/Loader';
import PlanDay from './components/PlanDay';
import SearchedExercises from './components/SearchedExercises';
import { PlanProvider } from './contexts/PlanContext';
import Plan from './pages/Plan';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 100000 * 60,
    },
  },
});

const toastOptions = {
  success: {
    duration: 2000,
  },
  error: {
    duration: 2000,
  },
  style: {
    fontSize: '16px',
    maxWidth: '500px',
    padding: '16px 24px',
    backgroundColor: '#eeeeee',
    color: '#222831',
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={toastOptions}
      />
      <ExercisesProvider>
        <UserProvider>
          <PlanProvider>
            <BrowserRouter>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route element={<HomeLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="about" element={<About />} />
                    <Route path="creator" element={<Creator />} />
                  </Route>

                  <Route path="app" element={<MainApp />}>
                    <Route index element={<Navigate replace to="init" />} />
                    <Route path="init" element={<InitExercises />} />
                    <Route path="category" element={<CategoryExercises />} />
                    <Route path="search" element={<SearchedExercises />} />
                  </Route>
                  <Route path="app/:exerciseId" element={<ExerciseDetails />} />
                  <Route path="saved-exercises" element={<SavedExercises />} />
                  <Route path="plan" element={<Plan />}>
                    <Route path=":planId" element={<PlanDay />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </PlanProvider>
        </UserProvider>
      </ExercisesProvider>
    </QueryClientProvider>
  );
}

export default App;
