import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PixelEvent from "./pages/PixelEvent";
import { HelmetProvider } from "react-helmet-async";

import WhatsAppFloating from "./components/WhatsAppFloating";
import PixelFooter from "./PixelFooter";
import ScrollToTop from "./utlis/scroll-to-top";
import Packages from "./pages/Packages";
const queryClient = new QueryClient();

import { VideoProvider } from "./context/VideoContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <VideoProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/launch" element={<PixelEvent />} />
              <Route path="/packages" element={<Packages />} />
              {/* <Route path="/demo" element={<Launch />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppFloating />
            <PixelFooter />
          </BrowserRouter>
        </VideoProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
