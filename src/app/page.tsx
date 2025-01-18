"use client";
import { DashboardPage } from "@/components/DashboardPage";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginForm />;
}
