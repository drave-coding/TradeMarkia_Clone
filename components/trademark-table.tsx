"use client"
import classIcon from "@/assets/class.png"
import renewal from "@/assets/ren.png"
import Image from "next/image"
import { Calendar, Hash } from "lucide-react"

export function TrademarkTable({ trademarks }: { trademarks: any[] }) {
  return (
    <div className="space-y-4">
      {trademarks.length > 0 ? (
        trademarks.map((trademark) => (
          <div key={trademark.id} className="flex border border-gray-200 rounded-md overflow-hidden">
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center border-r border-gray-200 relative">
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                <span className="text-gray-400 text-2xl"></span>
              </div>
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 border border-gray-200">
                <span className="text-gray-400 text-xs">⊗</span>
              </div>
            </div>

            <div className="flex-1 p-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Mark Section */}
                <div>
                  <h3 className="font-medium">{trademark.name}</h3>
                  <p className="text-sm text-gray-600">{trademark.company}</p>

                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      <span>{trademark.filingNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{trademark.filingDate}</span>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        trademark.status === "registered" || trademark.status === "pending"
                          ? "bg-[#52b649]"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-sm">
                      <span className="text-[#52b649]">
                        {trademark.status === "registered" && "Live/Registered"}
                        {trademark.status === "pending" && "Live/Pending"}
                        {trademark.status === "abandoned" && "Dead/Abandoned"}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-black mt-1">
                    
                    <span>on <b>{trademark.regDate}</b></span>
                  </div>
                  <div className="mt-7 text-xs text-black  flex items-center gap-1">
                  <Image src={renewal} alt="Class Logo" className="h-3 w-3" />
    <span>
      <b>{trademark.renewalDate}</b>
    </span>
  </div>
                </div>

                {/* Class Description Section */}
                <div>
                  <p
                    className="text-sm truncate max-w-[250px]"
                    title={trademark.description}
                  >
                    {trademark.description}
                  </p>

                  <div className="flex gap-2 mt-2">
                    {trademark.classes.map((cls: string, index: number) => (
                      <div key={index} className="flex items-center bg-gray-50 rounded-md p-1">
                        <Image src={classIcon} alt="Class Logo" className="h-4 w-4" />
                        <div className="text-xs px-2 py-0.5 ">
                          Class {cls}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">If Searched No Data to Show</p>
      )}
    </div>
  )
}