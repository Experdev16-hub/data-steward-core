import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Image, Shield, AlertCircle } from "lucide-react";
import { useDeviceStats } from "@/hooks/useDevices";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCards() {
  const stats = useDeviceStats();

  const statsCards = [
    {
      title: "Total Active Devices",
      value: stats.totalActiveDevices,
      icon: Smartphone,
      description: "+12% from last month",
      color: "text-primary",
    },
    {
      title: "Total Media Assets",
      value: stats.totalMediaAssets.toLocaleString(),
      icon: Image,
      description: "+573 new uploads this week",
      color: "text-success",
    },
    {
      title: "Policy Compliance",
      value: `${stats.complianceStatus}%`,
      icon: Shield,
      description: "Above target threshold",
      color: "text-success",
    },
    {
      title: "Offline Devices",
      value: stats.offlineDevices,
      icon: AlertCircle,
      description: "Requires attention",
      color: "text-warning",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => (
        <Card key={index} className="bg-card border-border hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}