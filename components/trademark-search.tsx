"use client"

import { useState } from "react"
import { fetchTrademarks } from "@/lib/api"
import Image from "next/image"
import logo from "@/assets/logo.png"
export function TrademarkSearch({
  onSearchResults,
  onStatusChange,
  onSearchTermChange,
}: {
  onSearchResults: (results: any[]) => void
  onStatusChange: (status: string) => void
  onSearchTermChange: (term: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.warn("Search query is empty")
      onStatusChange("Please enter a search query.")
      return
    }

    onStatusChange("Searching...")
    onSearchTermChange(searchQuery) 

    try {
      const data = await fetchTrademarks(searchQuery)
      if (data === null) {
        onStatusChange("No Results Found.")
        return
      }
      const hits = data.body.hits?.hits || []
     
      const formattedResults = hits.map((hit: any) => {
        const source = hit._source
        return {
          id: hit._id,
          name: source.mark_identification,
          company: source.current_owner,
          status: source.status_type,
          regDate: new Date(source.registration_date * 1000).toLocaleDateString(),
          filingNumber: source.registration_number,
          filingDate: new Date(source.filing_date * 1000).toLocaleDateString(),
          description: source.mark_description_description?.[0] || "No description available",
          classes: source.class_codes || [],
          lawFirm: source.law_firm || "N/A", 
        attorneyName: source.attorney_name || "N/A", 
        currentOwner: source.current_owner || "N/A",
        renewalDate: new Date(source.renewal_date * 1000).toLocaleDateString(),
        
        
        }
      })

      if (formattedResults.length === 0) {
        onStatusChange("No Results Found.")
      } else {
        onStatusChange("")
      }

      onSearchResults(formattedResults)
    } catch (error) {
      console.error("Failed to fetch trademarks:", error)
      onStatusChange("Error Occurred.")
    }
  }

  return (
    <div className="w-full bg-white py-4 px-6 border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="font-bold text-2xl">
          
            <Image src={logo} alt="Trademarkia Logo" className="h-7 w-auto" />

          </div>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-xl mx-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Trademark Here eg. Mickey Mouse"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4380ec]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#4380ec] text-white px-6 py-2 rounded-md hover:bg-[#4380ec]/90 transition-colors"
          >
            Search
          </button>
        </div>
        <div className="w-32"></div>
      </div>
    </div>
  )
}