import { Link, useLocation } from "wouter";
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  Briefcase,
  MessageSquare,
  Target,
  UserCircle,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Counselors", url: "/counselors", icon: Users },
  { title: "Sessions", url: "/sessions", icon: Calendar },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Job Board", url: "/jobs", icon: Briefcase },
  { title: "Community Forum", url: "/forum", icon: MessageSquare },
  { title: "My Goals", url: "/goals", icon: Target },
  { title: "Profile", url: "/profile", icon: UserCircle },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-border/50 bg-sidebar/50 backdrop-blur-md"
    >
      <SidebarContent>
        <SidebarGroup>
          {/* Logo */}
          <div className="px-4 py-6">
            <h2 className="text-xl font-display font-bold text-primary flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <span>PathFinder</span>
            </h2>
          </div>

          <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mt-4">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  location === item.url ||
                  (item.url !== "/" && location.startsWith(item.url));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`transition-all duration-200 rounded-xl ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "hover:bg-primary/5 hover:text-foreground text-muted-foreground"
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-xl"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}