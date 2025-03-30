"use client"

import { useState } from "react"

export function StatusFilter({
  trademarks,
  onFilterChange,
}: {
  trademarks: any[]
  onFilterChange: (filtered: any[]) => void
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status)

    if (status === "all") {
      onFilterChange(trademarks) 
    } else if (status === "other") {
      onFilterChange(
        trademarks.filter(
          (trademark) =>
            trademark.status !== "registered" &&
            trademark.status !== "abandoned" &&
            trademark.status !== "pending"
        )
      )
    } else {
      onFilterChange(
        trademarks.filter((trademark) => trademark.status === status)
      )
    }
  }

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Status</h3>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "All", value: "all", color: "text-blue-500", icon: "🔵" },
          { label: "Registered", value: "registered", color: "text-green-500", icon: "🟢" },
          { label: "Pending", value: "pending", color: "text-yellow-500", icon: "🟡" },
          { label: "Abandoned", value: "abandoned", color: "text-red-500", icon: "🔴" },
          { label: "Others", value: "other", color: "text-blue-500", icon: "🔵" },
        ].map((status) => (
          <button
            key={status.value}
            onClick={() => handleFilterChange(status.value)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium ${
              selectedStatus === status.value
                ? "bg-gray-200 border-gray-400"
                : "bg-white border-gray-300"
            } hover:bg-gray-100 transition`}
          >
            <span className={status.color}>{status.icon}</span>
            <span className="text-black">{status.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}