import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import TeacherDashboard from "@/pages/TeacherDashboard";
import LiveHeatmap from "@/pages/LiveHeatmap";
import DeviceHub from "@/pages/DeviceHub";
import StudentDashboard from "@/pages/StudentDashboard";
import Assessments from "@/pages/Assessments";
import Students from "@/pages/Students";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/teacher" component={TeacherDashboard} />
      <Route path="/classroom/:id" component={LiveHeatmap} />
      <Route path="/heatmap" component={LiveHeatmap} />
      <Route path="/devices" component={DeviceHub} />
      <Route path="/student" component={StudentDashboard} />
      <Route path="/students" component={Students} />
      <Route path="/assessments" component={Assessments} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Router />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
