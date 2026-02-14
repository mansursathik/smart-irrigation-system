import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Droplets, Thermometer, Wind, Power, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import {
  generateDashboardSummary,
  generateSensorReadings,
  generateMoistureChartData,
  generateWaterUsageData,
  generateAlerts,
} from "@/lib/mock-data";
import type { SensorReading, Alert as AlertType, DashboardSummary } from "@/lib/types";

const Dashboard = () => {
  const [pumpOn, setPumpOn] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary>(generateDashboardSummary(false));
  const [sensors, setSensors] = useState<SensorReading[]>(generateSensorReadings());
  const [alerts, setAlerts] = useState<AlertType[]>(generateAlerts());
  const [moistureData] = useState(generateMoistureChartData());
  const [waterData] = useState(generateWaterUsageData());

  // Auto-refresh every 10 seconds
  const refresh = useCallback(() => {
    setSummary(generateDashboardSummary(pumpOn));
    setSensors(generateSensorReadings());
  }, [pumpOn]);

  useEffect(() => {
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  const togglePump = () => {
    setPumpOn((prev) => !prev);
    setSummary((s) => ({ ...s, pumpStatus: !pumpOn }));
  };

  const alertIcon = (type: string) => {
    if (type === "critical") return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (type === "warning") return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <Info className="h-4 w-4 text-secondary" />;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
              <Droplets className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Soil Moisture</p>
              <p className="text-2xl font-bold text-foreground">{summary.soilMoisture}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
              <Thermometer className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-2xl font-bold text-foreground">{summary.temperature}°C</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Wind className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-2xl font-bold text-foreground">{summary.humidity}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${pumpOn ? "bg-success/10" : "bg-muted"}`}>
              <Power className={`h-6 w-6 ${pumpOn ? "text-success" : "text-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pump Status</p>
              <Badge variant={pumpOn ? "default" : "secondary"} className={pumpOn ? "bg-success text-success-foreground" : ""}>
                {pumpOn ? "ON" : "OFF"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Moisture Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Soil Moisture Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <ReferenceLine y={50} stroke="hsl(var(--warning))" strokeDasharray="5 5" label={{ value: "Optimal", fill: "hsl(var(--warning))", fontSize: 11 }} />
                <Line type="monotone" dataKey="moisture" stroke="hsl(152, 55%, 33%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Water Usage Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daily Water Usage (Liters)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="usage" fill="hsl(205, 65%, 48%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Irrigation Control & Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Irrigation Control */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Irrigation Control</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 py-6">
            <div className={`h-20 w-20 rounded-full flex items-center justify-center transition-colors ${pumpOn ? "bg-success/20 ring-4 ring-success/30" : "bg-muted ring-4 ring-muted"}`}>
              <Power className={`h-10 w-10 ${pumpOn ? "text-success" : "text-muted-foreground"}`} />
            </div>
            <p className="text-sm text-muted-foreground">
              Pump is currently <strong className={pumpOn ? "text-success" : "text-destructive"}>{pumpOn ? "Running" : "Stopped"}</strong>
            </p>
            <Button onClick={togglePump} variant={pumpOn ? "destructive" : "default"} className="w-full max-w-[200px]">
              Turn Pump {pumpOn ? "OFF" : "ON"}
            </Button>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${alert.resolved ? "bg-muted/50 border-border" : "bg-card border-border"}`}>
                {alertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    Field: {alert.fieldId} · {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {alert.resolved && <CheckCircle className="h-4 w-4 text-success shrink-0" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Live Sensor Data Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Live Sensor Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Field ID</TableHead>
                <TableHead>Moisture (%)</TableHead>
                <TableHead>Temp (°C)</TableHead>
                <TableHead>Humidity (%)</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensors.map((s) => (
                <TableRow key={s.sensorId}>
                  <TableCell className="font-mono text-sm">{s.sensorId}</TableCell>
                  <TableCell>{s.fieldId}</TableCell>
                  <TableCell>{s.moisture.toFixed(1)}</TableCell>
                  <TableCell>{s.temperature.toFixed(1)}</TableCell>
                  <TableCell>{s.humidity.toFixed(1)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(s.timestamp).toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
