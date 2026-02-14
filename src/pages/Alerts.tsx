import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { generateAlerts } from "@/lib/mock-data";

const Alerts = () => {
  const alerts = generateAlerts();
  const active = alerts.filter((a) => !a.resolved);
  const resolved = alerts.filter((a) => a.resolved);

  const icon = (type: string) => {
    if (type === "critical") return <AlertTriangle className="h-5 w-5 text-destructive" />;
    if (type === "warning") return <AlertTriangle className="h-5 w-5 text-warning" />;
    return <Info className="h-5 w-5 text-secondary" />;
  };

  const badge = (type: string) => {
    if (type === "critical") return <Badge variant="destructive">Critical</Badge>;
    if (type === "warning") return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
    return <Badge variant="secondary">Info</Badge>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Alerts</h1>

      {/* Active Alerts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> Active Alerts ({active.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {active.map((a) => (
            <div key={a.id} className="flex items-start gap-3 p-4 rounded-lg border bg-destructive/5 border-destructive/20">
              {icon(a.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">Field: {a.fieldId} · {new Date(a.timestamp).toLocaleString()}</p>
              </div>
              {badge(a.type)}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resolved */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Alert History ({resolved.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {resolved.map((a) => (
            <div key={a.id} className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
              {icon(a.type)}
              <div className="flex-1">
                <p className="text-sm text-foreground">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">Field: {a.fieldId} · {new Date(a.timestamp).toLocaleString()}</p>
              </div>
              <CheckCircle className="h-4 w-4 text-success shrink-0" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
