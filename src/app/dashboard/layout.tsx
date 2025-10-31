import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "sonner";



export default function DashboardRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="sticky top-0 z-50 bg-white  border-b lg:hidden">
              <SidebarTrigger />
            </div>
            {children}
          </main>
          <div id="portals"></div>
          <div id="loading-submit"></div>
        </SidebarProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
