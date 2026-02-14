import {
  LayoutDashboard,
  Activity,
  Droplets,
  AlertTriangle,
  FileBarChart,
  UserCircle,
  LogOut,
  Sprout,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Sensor Data", url: "/sensors", icon: Activity },
  { title: "Irrigation Logs", url: "/irrigation", icon: Droplets },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Reports", url: "/reports", icon: FileBarChart },
  { title: "Farmer Profile", url: "/profile", icon: UserCircle },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      {/* Sidebar Header with branding */}
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary/20">
            <Sprout className="h-6 w-6 text-sidebar-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-sidebar-foreground">Smart Irrigation</h2>
            <p className="text-xs text-sidebar-foreground/60">Precision Farming</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Logout */}
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-colors"
                activeClassName=""
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
