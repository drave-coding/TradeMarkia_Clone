"use client"

import { LayoutGrid, List } from "lucide-react"

export function DisplayOptions() {
  return (
    <div>
      <h3 className="font-medium mb-3">Display</h3>
      <div className="flex gap-2">
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium">
          <LayoutGrid className="w-4 h-4" />
          <span>Grid View</span>
        </button>

        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm">
          <List className="w-4 h-4" />
          <span>List View</span>
        </button>
      </div>
    </div>
  )
}

