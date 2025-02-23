// src/app/dashboard/layout.tsx
import { BottomNav } from "../components/bottom-nav";
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        {children}
        {/* Bottom Navigation */}
        <BottomNav /> 
      </div>
    );
  }