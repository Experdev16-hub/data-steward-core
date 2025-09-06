import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { RefreshCw, Bell, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFirebaseSync } from "@/hooks/useFirebaseSync";

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { syncing, syncAllDevices } = useFirebaseSync();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-gradient-primary text-white border-0 hover:opacity-90"
          onClick={syncAllDevices}
          disabled={syncing}
        >
          {syncing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {syncing ? 'Syncing...' : 'Request Device Data Sync'}
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </div>
      </div>
    </header>
  );
}