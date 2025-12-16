"use client";

// import { useEffect, useState } from "react";



export default function HomeDoctor() {

  



  return (
    <div className="p-6 h-screen flex justify-center items-center flex-col ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Bienvenido Dr. 
        </h1>
        <p className="text-gray-600"></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="col-span-2 p-4 border rounded-xl bg-white shadow">
          <h2 className="text-xl font-semibold mb-3">Calendario</h2>

          <div className="grid grid-cols-7 gap-2 text-center">
            
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white shadow">
          <h2 className="text-xl font-semibold mb-3">Turnos del día</h2>

          
        </div>
      </div>
    </div>
  );
}
