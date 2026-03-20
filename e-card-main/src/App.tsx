import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import Grocery from "./pages/Grocery";
import Business from "./pages/Business";
import Health from "./pages/Health";
import Electronics from "./pages/Electronics";
import Agriculture from "./pages/Agriculture";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Employment from "./pages/Employment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/education" element={<Education />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/business" element={<Business />} />
            <Route path="/health" element={<Health />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<Training />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
