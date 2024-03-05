// Not using server-side rendering for this assignment.
// Assuming a network boundary and a separate API service.
// https://nextjs.org/docs/app/building-your-application/rendering#network-boundary
'use client'

import Events from "@/app/events"
import Filters from "@/app/filters"
import React, { useState } from "react"


export default function Home() {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getEvents = async (filters: Record<string, string>) => {
    setLoading(true)

    const queryParams = new URLSearchParams(filters).toString()
    // TODO: host should be configurable per environment
    const response = await fetch(`http://localhost:3030/events/log?${queryParams}`)
    // TODO: error handling with nicer UI
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Filters onChange={getEvents}/>
      {isLoading ? <p>Loading...</p> : <Events events={data}/>}
    </main>
  );
}
