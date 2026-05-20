# Next-Generation Control Interface (HMI) Prototype

This document outlines the architecture for a modern, intelligent Control System Interface (HMI) that addresses the shortcomings of traditional HMIs, specifically focusing on alert fatigue, lack of personalization, and outdated interaction patterns.

## Goal Description

Build a high-fidelity, interactive web-based prototype demonstrating the "Next-Generation Control Interface". The prototype features a premium, dynamic UI using modern design principles (Glassmorphism, dark mode, smooth animations) and demonstrates intelligent alarm management, role-based views, and a modular widget configuration feel.

## Technology Stack

> [!IMPORTANT]
> **Technology Stack**: To ensure the most fluid, user-friendly, and best UI interaction experience possible, the application has been built using:
> - **Next.js (React)**: For robust component-based architecture and state management.
> - **Tailwind CSS (v4)**: For a highly customized, premium dark-mode design system with glassmorphism.
> - **Framer Motion**: For smooth, cinematic micro-animations and transitions.
> - **Recharts**: For real-time telemetry data visualization.
> - **Lucide React**: For crisp, modern iconography.

## Architecture

The project is structured as a Next.js App Router application:

### Core Application (`src/app/`)
- `layout.tsx`: The main shell containing the Sidebar and Header.
- `page.tsx`: The main entry point rendering the Dashboard component.
- `globals.css`: Contains the premium design system variables and custom scrollbar styles.

### Components (`src/components/`)
- **`Sidebar.tsx`**: Expandable navigation menu with animated alerts.
- **`Header.tsx`**: Context-aware top bar featuring simulated role switching (Lead Operator, Maintenance, Plant Manager) and search.
- **`Dashboard.tsx`**: The main view orchestrating the layout of all widgets.
- **`AlarmList.tsx`**: A simulated intelligent alarm feed that prioritizes critical alerts and displays AI diagnostic insights.
- **`TelemetryWidget.tsx`**: An interactive area chart demonstrating live equipment data (e.g., vibration analysis) with critical spike highlights.
- **`PredictiveMaintenanceWidget.tsx`**: Visualizes machine health and AI-calculated time-to-failure metrics.

## Verification & Testing
- The application is currently running at `http://localhost:3000`.
- **Role Switching**: Clicking different roles in the header updates the user context.
- **Visuals**: The UI features glowing accents, glass panels, and smooth hover states.
- **Responsiveness**: The dashboard adjusts seamlessly to different screen sizes.
