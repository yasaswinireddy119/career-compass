import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import { Shell } from "@/components/layout/shell";

// Pages
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import Counselors from "@/pages/counselors";
import Sessions from "@/pages/sessions";
import Resources from "@/pages/resources";
import Jobs from "@/pages/jobs";
import Forum from "@/pages/forum";
import ForumPost from "@/pages/forum-post";
import Goals from "@/pages/goals";
import LandingPage from "@/pages/landing";
import Login from "@/pages/login";

/* ---------------------------------- */
/* Protected Route Wrapper (LOCAL AUTH) */
/* ---------------------------------- */
function ProtectedRoute({ component: Component }: any) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Shell>
      <Component />
    </Shell>
  );
}

/* ---------------------------------- */
/* Public Route (Prevent login again) */
/* ---------------------------------- */
function PublicRoute({ component: Component }: any) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return <Component />;
}

/* ---------------------------------- */
/* App Routes                         */
/* ---------------------------------- */
function AppRoutes() {
  return (
    <Switch>
      {/* PUBLIC ROUTES */}
      <Route path="/" component={LandingPage} />
      <Route path="/login">
        <PublicRoute component={Login} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>

      <Route path="/profile">
        <ProtectedRoute component={Profile} />
      </Route>

      <Route path="/counselors">
        <ProtectedRoute component={Counselors} />
      </Route>

      <Route path="/sessions">
        <ProtectedRoute component={Sessions} />
      </Route>

      <Route path="/resources">
        <ProtectedRoute component={Resources} />
      </Route>

      <Route path="/jobs">
        <ProtectedRoute component={Jobs} />
      </Route>

      <Route path="/forum">
        <ProtectedRoute component={Forum} />
      </Route>

      <Route path="/forum/:id">
        <ProtectedRoute component={ForumPost} />
      </Route>

      <Route path="/goals">
        <ProtectedRoute component={Goals} />
      </Route>

      {/* NOT FOUND */}
      <Route component={NotFound} />
    </Switch>
  );
}

/* ---------------------------------- */
/* App Root                           */
/* ---------------------------------- */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;