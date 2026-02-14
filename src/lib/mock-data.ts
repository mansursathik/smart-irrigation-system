// Mock data for the Smart Irrigation System dashboard
import type { SensorReading, IrrigationLog, Alert, FarmerProfile, DashboardSummary } from "./types";

// Generate random sensor readings with slight variation
export function generateSensorReadings(): SensorReading[] {
  const now = new Date();
  return [
    { sensorId: "SNR-001", fieldId: "F-01", moisture: 42 + Math.random() * 5, temperature: 28 + Math.random() * 3, humidity: 65 + Math.random() * 5, timestamp: new Date(now.getTime() - 0).toISOString() },
    { sensorId: "SNR-002", fieldId: "F-01", moisture: 38 + Math.random() * 5, temperature: 29 + Math.random() * 3, humidity: 62 + Math.random() * 5, timestamp: new Date(now.getTime() - 10000).toISOString() },
    { sensorId: "SNR-003", fieldId: "F-02", moisture: 55 + Math.random() * 5, temperature: 27 + Math.random() * 3, humidity: 70 + Math.random() * 5, timestamp: new Date(now.getTime() - 20000).toISOString() },
    { sensorId: "SNR-004", fieldId: "F-02", moisture: 30 + Math.random() * 5, temperature: 31 + Math.random() * 3, humidity: 58 + Math.random() * 5, timestamp: new Date(now.getTime() - 30000).toISOString() },
    { sensorId: "SNR-005", fieldId: "F-03", moisture: 48 + Math.random() * 5, temperature: 26 + Math.random() * 3, humidity: 72 + Math.random() * 5, timestamp: new Date(now.getTime() - 40000).toISOString() },
    { sensorId: "SNR-006", fieldId: "F-03", moisture: 35 + Math.random() * 5, temperature: 30 + Math.random() * 3, humidity: 60 + Math.random() * 5, timestamp: new Date(now.getTime() - 50000).toISOString() },
  ];
}

// Dashboard summary derived from latest sensor readings
export function generateDashboardSummary(pumpStatus: boolean): DashboardSummary {
  return {
    soilMoisture: Math.round(42 + Math.random() * 8),
    temperature: Math.round((28 + Math.random() * 4) * 10) / 10,
    humidity: Math.round(65 + Math.random() * 8),
    pumpStatus,
  };
}

// Moisture data for line chart (last 24 hours)
export function generateMoistureChartData() {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i);
    data.push({
      time: `${hour.getHours().toString().padStart(2, "0")}:00`,
      moisture: Math.round(35 + Math.random() * 25),
      optimal: 50,
    });
  }
  return data;
}

// Water usage data for bar chart (last 7 days)
export function generateWaterUsageData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    day,
    usage: Math.round(200 + Math.random() * 300),
  }));
}

// Irrigation logs
export function generateIrrigationLogs(): IrrigationLog[] {
  const now = new Date();
  return [
    { id: "IL-001", fieldId: "F-01", pumpId: "P-01", action: "ON", triggeredBy: "Auto", timestamp: new Date(now.getTime() - 3600000).toISOString(), duration: "15 min" },
    { id: "IL-002", fieldId: "F-01", pumpId: "P-01", action: "OFF", triggeredBy: "Auto", timestamp: new Date(now.getTime() - 2700000).toISOString() },
    { id: "IL-003", fieldId: "F-02", pumpId: "P-02", action: "ON", triggeredBy: "Manual", timestamp: new Date(now.getTime() - 7200000).toISOString(), duration: "20 min" },
    { id: "IL-004", fieldId: "F-02", pumpId: "P-02", action: "OFF", triggeredBy: "Manual", timestamp: new Date(now.getTime() - 6000000).toISOString() },
    { id: "IL-005", fieldId: "F-03", pumpId: "P-03", action: "ON", triggeredBy: "Auto", timestamp: new Date(now.getTime() - 14400000).toISOString(), duration: "10 min" },
    { id: "IL-006", fieldId: "F-03", pumpId: "P-03", action: "OFF", triggeredBy: "Auto", timestamp: new Date(now.getTime() - 13800000).toISOString() },
  ];
}

// Alerts
export function generateAlerts(): Alert[] {
  const now = new Date();
  return [
    { id: "ALT-001", type: "critical", message: "Low Soil Moisture — Irrigation Required", fieldId: "F-01", timestamp: new Date(now.getTime() - 300000).toISOString(), resolved: false },
    { id: "ALT-002", type: "warning", message: "High Temperature Warning (32°C)", fieldId: "F-02", timestamp: new Date(now.getTime() - 600000).toISOString(), resolved: false },
    { id: "ALT-003", type: "info", message: "Scheduled irrigation completed successfully", fieldId: "F-03", timestamp: new Date(now.getTime() - 3600000).toISOString(), resolved: true },
    { id: "ALT-004", type: "warning", message: "Humidity dropping below optimal range", fieldId: "F-01", timestamp: new Date(now.getTime() - 7200000).toISOString(), resolved: true },
    { id: "ALT-005", type: "critical", message: "Pump P-02 malfunction detected", fieldId: "F-02", timestamp: new Date(now.getTime() - 10800000).toISOString(), resolved: true },
  ];
}

// Farmer profile
export const farmerProfile: FarmerProfile = {
  name: "Rajesh Kumar",
  farmName: "Green Valley Farm",
  location: "Pune, Maharashtra, India",
  cropType: "Rice, Wheat, Sugarcane",
  fieldArea: "25 Acres (3 Fields)",
  contact: "+91 98765 43210",
  email: "rajesh.kumar@greenvalley.farm",
};
