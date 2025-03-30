"use client"

import { Filter, Share, SortAsc } from "lucide-react"
import { StatusFilter } from "./status-filter"
import { OtherFilter } from "./Otherfilters"
import { DisplayOptions } from "./display-options"
import { TrademarkTable } from "./trademark-table"
import { useEffect, useState } from "react"

export function TrademarkResults({
  trademarks,
  status,
  searchTerm,
}: {
  trademarks: any[]
  status: string
  searchTerm: string
}) {
  const suggestions = [
    `${searchTerm}`,
    `*${searchTerm.slice(1)}`,
  ] 
  const [filteredTrademarks, setFilteredTrademarks] = useState(trademarks)
  
   useEffect(() => {
    setFilteredTrademarks(trademarks)
  }, [trademarks])
  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      {status && <p className="text-center text-gray-500 mb-4">{status}</p>}

      {!status && trademarks.length > 0 && (
        <>
          <h1 className="text-sm text-gray-700 mb-4">
            About {filteredTrademarks.length} Trademarks found for "{searchTerm}"
          </h1>
          
          <hr className="w-full"/>

          <div className=" mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Also try searching for</span>
              <div className="flex gap-2">
                {suggestions.map((suggestion, index) => (
                  <span
                  key={index}
                  className="px-3 py-2 bg-orange-100 text-orange-600 border border-orange-500 rounded-[12px] text-sm"
                >
                    {suggestion}
                  </span>
                ))}
                
              </div>
              
            </div>
            <div className="flex justify-end mb-2 gap-6 ">
            <button className="flex items-center gap-1 px-4 py-3 border border-gray-300 rounded-md text-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
        <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-600">
          <Share className="w-5 h-5" />
        </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-600">
          <SortAsc className="w-5 h-5" />
        </button>
          </div>
          </div>
        </>
      )}
      

      

      <div className="flex gap-6 ">
        <div className="flex-1">
          <div className="border-b border-gray-200 mb-4 ">
            <div className="flex  ">
              <button className="px-6 py-2 text-sm font-medium text-gray-700 pr-[30px] ">
                Mark
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-700 pr-[210px]">
                Details
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-700 pr-[220px]">
                Status
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-700">
                Class/Description
              </button>
            </div>
          </div>

          

<TrademarkTable trademarks={filteredTrademarks} />

          
        </div>

        <div className="w-64">
          {/* Status Filter Box */}
    <div className="bg-white shadow-md rounded-md p-4 mb-2 w-[300px]">
      <StatusFilter
        trademarks={trademarks}
        onFilterChange={setFilteredTrademarks}
      />
    </div>

    {/* Other Filters Box */}
    <div className="bg-white shadow-md rounded-md p-4 mb-2 w-[300px] ">
      <OtherFilter
        trademarks={trademarks}
        onFilterChange={setFilteredTrademarks}
      />
    </div>

    {/* Display Options Box */}
    <div className="bg-white shadow-md rounded-md p-4 w-[300px]">
      <DisplayOptions />
    </div>
        </div>


      </div>
    </div>
  )
}