"use client"

import { useState } from "react"

export function OtherFilter({
  trademarks,
  onFilterChange,
}: {
  trademarks: any[]
  onFilterChange: (filtered: any[]) => void
}) {
  const [activeTab, setActiveTab] = useState<"lawFirms" | "attorneys" | "owners">("lawFirms")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

 
  const lawFirms = Array.from(new Set(trademarks.map((t) => t.lawFirm).filter(Boolean)))
  const attorneys = Array.from(new Set(trademarks.map((t) => t.attorneyName).filter(Boolean)))
  const owners = Array.from(new Set(trademarks.map((t) => t.currentOwner).filter(Boolean)))

 
  const handleCheckboxChange = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value) 
      : [...selectedFilters, value]

    setSelectedFilters(updatedFilters)

    if (updatedFilters.length === 0) {
      onFilterChange(trademarks)
      return
    }

   
    const filteredTrademarks = trademarks.filter((t) => {
      if (activeTab === "lawFirms") return updatedFilters.includes(t.lawFirm)
      if (activeTab === "attorneys") return updatedFilters.includes(t.attorneyName)
      if (activeTab === "owners") return updatedFilters.includes(t.currentOwner)
      return true
    })

    onFilterChange(filteredTrademarks)
  }

  const currentOptions =
    activeTab === "lawFirms" ? lawFirms : activeTab === "attorneys" ? attorneys : owners

  return (
    <div className="mb-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("lawFirms")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "lawFirms" ? "border-b-2 border-black text-black" : "text-gray-600"
          }`}
        >
          Law Firms
        </button>
        <button
          onClick={() => setActiveTab("attorneys")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "attorneys" ? "border-b-2  border-black text-black" : "text-gray-600"
          }`}
        >
          Attorneys
        </button>
        <button
          onClick={() => setActiveTab("owners")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "owners" ? "border-b-2  border-black text-black" : "text-gray-600"
          }`}
        >
          Owners
        </button>
      </div>

      {/* Filter Options */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {currentOptions.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#4380ec] rounded"
              checked={selectedFilters.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}