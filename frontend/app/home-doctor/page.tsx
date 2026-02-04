import HomeDoctor from "@/components/HomeDoctor";
import React from "react";
import { MedicoGuard } from "@/middleware/MedicoGuard";

export default function HomeDoctorPage() {
  return (
    <>
      <MedicoGuard>
        <HomeDoctor />
      </MedicoGuard>
    </>
  );
}
