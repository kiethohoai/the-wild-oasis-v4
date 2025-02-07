import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from './pages';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Styles */}
      <GlobalStyles />

      {/* App */}
      <BrowserRouter>
        <Routes>
          {/* App Layout */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Others */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
