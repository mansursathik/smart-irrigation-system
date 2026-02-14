import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { generateIrrigationLogs } from "@/lib/mock-data";

const IrrigationLogs = () => {
  const logs = generateIrrigationLogs();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Irrigation Logs</h1>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pump Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Pump</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Triggered By</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.id}</TableCell>
                  <TableCell>{log.fieldId}</TableCell>
                  <TableCell>{log.pumpId}</TableCell>
                  <TableCell>
                    <Badge className={log.action === "ON" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.triggeredBy}</TableCell>
                  <TableCell>{log.duration || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IrrigationLogs;
