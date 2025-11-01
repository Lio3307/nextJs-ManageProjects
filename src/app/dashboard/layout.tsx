import { AppSidebar } from "@/components/dashboard-components/dashboard-sidebar";
import { ThemeProvider } from "@/components/dashboard-components/theme/theme-provider";
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
            <div className="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b md:hidden">
              <div className="flex items-center justify-between p-2">
                <SidebarTrigger
                  className="rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 bg-neutral-100 dark:bg-neutral-800"
                  aria-label="Toggle navigation menu"
                  title="Toggle navigation menu"
                />
              </div>
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
