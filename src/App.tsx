import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';
import Login from './pages/Login';
import FacialRecognition from './pages/FacialRecognition';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScheduleSimulator from './pages/ScheduleSimulator';
import LastLesson from './pages/LastLesson';
import TheoreticalLessons from './pages/TheoreticalLessons';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/facial-recognition" element={<FacialRecognition />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-simulator"
            element={
              <PrivateRoute>
                <ScheduleSimulator />
              </PrivateRoute>
            }
          />
          <Route
            path="/theoretical-lessons"
            element={
              <PrivateRoute>
                <TheoreticalLessons />
              </PrivateRoute>
            }
          />
          <Route
            path="/last-lesson"
            element={
              <PrivateRoute>
                <LastLesson />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
