// Types for the Smart Irrigation System

export interface SensorReading {
  sensorId: string;
  fieldId: string;
  moisture: number;
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface IrrigationLog {
  id: string;
  fieldId: string;
  pumpId: string;
  action: "ON" | "OFF";
  triggeredBy: "Manual" | "Auto";
  timestamp: string;
  duration?: string;
}

export interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  fieldId: string;
  timestamp: string;
  resolved: boolean;
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  location: string;
  cropType: string;
  fieldArea: string;
  contact: string;
  email: string;
}

export interface DashboardSummary {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  pumpStatus: boolean;
}
