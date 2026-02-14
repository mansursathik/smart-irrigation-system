import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { generateSensorReadings } from "@/lib/mock-data";
import type { SensorReading } from "@/lib/types";

const SensorData = () => {
  const [sensors, setSensors] = useState<SensorReading[]>(generateSensorReadings());
  const [filter, setFilter] = useState("");

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setSensors(generateSensorReadings()), 10000);
    return () => clearInterval(interval);
  }, []);

  const filtered = sensors.filter(
    (s) => s.sensorId.toLowerCase().includes(filter.toLowerCase()) || s.fieldId.toLowerCase().includes(filter.toLowerCase())
  );

  const getMoistureStatus = (val: number) => {
    if (val < 35) return <Badge variant="destructive">Low</Badge>;
    if (val > 55) return <Badge className="bg-success text-success-foreground">High</Badge>;
    return <Badge variant="secondary">Normal</Badge>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Sensor Data</h1>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-base">All Sensor Readings</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter by Sensor or Field ID..." value={filter} onChange={(e) => setFilter(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Field ID</TableHead>
                <TableHead>Moisture (%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Temp (°C)</TableHead>
                <TableHead>Humidity (%)</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.sensorId}>
                  <TableCell className="font-mono text-sm">{s.sensorId}</TableCell>
                  <TableCell>{s.fieldId}</TableCell>
                  <TableCell>{s.moisture.toFixed(1)}</TableCell>
                  <TableCell>{getMoistureStatus(s.moisture)}</TableCell>
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

export default SensorData;
