import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaintenancePage from "@/components/MaintenancePage";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Fleet from "@/pages/Fleet";
import Careers from "@/pages/Careers";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import OwnerControl from "@/pages/OwnerControl";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function useSiteStatus() {
  const [paused, setPaused] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/owner-control/public-status")
      .then(r => r.json())
      .then((data: { paused?: boolean }) => setPaused(data.paused ?? false))
      .catch(() => setPaused(false)); // On error, assume active
  }, []);

  return paused;
}

function Router() {
  const paused = useSiteStatus();

  // Always render /owner-control regardless of pause state
  // and before the status check resolves (null = loading)
  return (
    <Switch>
      <Route path="/owner-control" component={OwnerControl} />
      <Route>
        {/* While checking status, render a dark loading screen to avoid flash */}
        {paused === null ? (
          <div className="min-h-screen bg-[hsl(210,20%,6%)]" />
        ) : paused ? (
          <MaintenancePage />
        ) : (
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route>
              <div className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <main className="flex-1">
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/services" component={Services} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/fleet" component={Fleet} />
                    <Route path="/careers" component={Careers} />
                    <Route path="/news" component={News} />
                    <Route path="/contact" component={Contact} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
                <Footer />
              </div>
            </Route>
          </Switch>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
