import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Image, Shield, AlertCircle } from "lucide-react";
import { mockStats } from "@/data/mockData";

export function StatsCards() {
  const stats = [
    {
      title: "Total Active Devices",
      value: mockStats.totalActiveDevices,
      icon: Smartphone,
      description: "+12% from last month",
      color: "text-primary",
    },
    {
      title: "Total Media Assets",
      value: mockStats.totalMediaAssets.toLocaleString(),
      icon: Image,
      description: "+573 new uploads this week",
      color: "text-success",
    },
    {
      title: "Policy Compliance",
      value: `${mockStats.complianceStatus}%`,
      icon: Shield,
      description: "Above target threshold",
      color: "text-success",
    },
    {
      title: "Offline Devices",
      value: mockStats.offlineDevices,
      icon: AlertCircle,
      description: "Requires attention",
      color: "text-warning",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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