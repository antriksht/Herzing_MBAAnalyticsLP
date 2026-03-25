import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IndexPage from "@/pages/index-page";
import V1Traditional from "@/pages/v1-traditional";
import V2Chatbot from "@/pages/v2-chatbot";
import V3AILanding from "@/pages/v3-ai-landing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={IndexPage} />
      <Route path="/v1-traditional" component={V1Traditional} />
      <Route path="/v2-chatbot" component={V2Chatbot} />
      <Route path="/v3-ai-landing" component={V3AILanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
