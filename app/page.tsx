"use client"

import { useState } from "react"
import { TrademarkSearch } from "@/components/trademark-search"
import { TrademarkResults } from "@/components/trademark-results"

export default function Home() {
  const [trademarks, setTrademarks] = useState<any[]>([])
  const [status, setStatus] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <main className="  bg-[#fefefe] px-6 sm:px-12 lg:px-24">
      <TrademarkSearch
        onSearchResults={setTrademarks}
        onStatusChange={setStatus}
        onSearchTermChange={setSearchTerm}
      />
      <TrademarkResults trademarks={trademarks} status={status} searchTerm={searchTerm} />
    </main>
  )
}