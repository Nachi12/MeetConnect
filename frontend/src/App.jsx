import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store/store";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyInterviews from "./pages/MyInterviews";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InterviewRoom from "./pages/InterviewRoom";

const queryClient = new QueryClient();

// Protected route wrapper to restrict access for unauthenticated users
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect if not authenticated
  }

  return children; // Render protected page if authenticated
};

// Custom hook to keep backend server active
const useWarmupBackend = () => {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        // Ping backend to keep server active
        await fetch("https://meetconnect-1.onrender.com");
        // await fetch("http://localhost:5001"); // For Offline Backend ping wakeup
        console.log("Backend warmed up");
      } catch (error) {
        console.log("Failed to ping backend:", error.message);
      }
    };

    pingBackend(); // Ping once on app mount

    // Ping every 10 minutes to prevent server sleep
    const interval = setInterval(pingBackend, 10 * 60 * 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
};

const App = () => {
  // Auto warmup backend when app starts
  useWarmupBackend();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/interview-room/:interviewId" element={<InterviewRoom />} />

              {/* Protected Routes (requires authentication) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews"
                element={
                  <ProtectedRoute>
                    <MyInterviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* 404 - Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
