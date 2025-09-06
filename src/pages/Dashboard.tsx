import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DeviceMap } from "@/components/dashboard/DeviceMap";
import { ActivityLog } from "@/components/dashboard/ActivityLog";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DeviceMap />
        </div>
        <div>
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;