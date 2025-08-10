import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import ContentHub from "./pages/ContentHub";
import Clients from "./pages/Clients";
import CalendarPage from "./pages/Calendar";
import More from "./pages/More";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Index />
                </AppLayout>
              }
            />
            <Route
              path="/tasks"
              element={
                <AppLayout>
                  <Tasks />
                </AppLayout>
              }
            />
            <Route
              path="/content"
              element={
                <AppLayout>
                  <ContentHub />
                </AppLayout>
              }
            />
            <Route
              path="/clients"
              element={
                <AppLayout>
                  <Clients />
                </AppLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <AppLayout>
                  <CalendarPage />
                </AppLayout>
              }
            />
            <Route
              path="/more"
              element={
                <AppLayout>
                  <More />
                </AppLayout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
