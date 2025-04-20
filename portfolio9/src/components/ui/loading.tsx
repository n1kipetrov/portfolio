"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-gray-900 animate-spin"></div>
      </div>
    </div>
  );
} 