

# Smart Irrigation System Dashboard

A professional, agriculture-themed dashboard for precision farming — designed for college project presentation quality.

## Design Theme
- **Color palette**: Greens (fields, growth) and blues (water, sky) with soft whites
- **Style**: Modern card-based layout with soft shadows, rounded corners, smooth hover animations
- **Typography**: Clean and professional with Lucide icons throughout
- **Responsive**: Fully functional on both desktop and mobile

## Pages & Features

### 1. Login Page
- Clean farmer login form with username & password fields
- Agriculture-themed background with gradient overlay
- Project title and branding

### 2. Main Dashboard
- **Sidebar Navigation**: Dashboard, Sensor Data, Irrigation Logs, Alerts, Reports, Farmer Profile, and Logout
- **Top Summary Cards**: Soil Moisture %, Temperature °C, Humidity %, Pump Status (ON/OFF) — with colored icons and animated values
- **Live Sensor Data Table**: Sensor ID, Field ID, Moisture, Temperature, Humidity, Timestamp — with auto-refresh every 10 seconds and a real-time indicator badge
- **Irrigation Control Panel**: Manual Pump ON/OFF toggle button with green/red status indicator
- **Alerts Section**: Active alerts (e.g., "Low Soil Moisture", "High Temperature Warning") plus alert history list
- **Data Visualization**: Line chart for soil moisture over time, bar chart for daily water usage (using Recharts)

### 3. Sensor Data Page
- Full table view of all sensor readings with filtering options

### 4. Irrigation Logs Page
- History of pump activations with timestamps and duration

### 5. Alerts Page
- Full alert history with severity levels and timestamps

### 6. Reports Page
- Summary statistics and charts for field performance overview

### 7. Farmer Profile Page
- Farmer Name, Field Location, Crop Type, Contact Info — editable card layout

## Backend-Ready Architecture
- All data fetched via placeholder API endpoints (`/api/sensor-data`, `/api/irrigation-log`, `/api/alerts`)
- Mock data used for presentation, easily swappable with real Python + MySQL backend
- Modular code with proper comments throughout

## Footer
- Project name "Smart Irrigation System for Precision Farming" and team details

