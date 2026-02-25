import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background/50 overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex h-16 items-center gap-4 border-b border-border/50 px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors rounded-lg" />
            <div className="ml-auto flex items-center space-x-4">
              {/* Additional header items could go here */}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8 custom-scrollbar">
            <div className="mx-auto max-w-7xl animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
