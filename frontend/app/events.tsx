import React from "react"

export type EventLog = {
  timestamp: string
  userId: number
  eventType: string
  originalLine: string
};

interface eventsProps {
  events: Array<EventLog>
}

// TODO: presentation can be adjusted as needed later
const formatTimestamp = (timestamp: string) => (new Date(timestamp)).toString()

export default function Events({ events }: eventsProps) {
  const renderEvent = (event: EventLog, index: number) => {
    return (
      // Using map's index as key here.
      // Another option for the key could be timestamps, but they could potentially clash.
      <tr key={index}>
        <td>{formatTimestamp(event.timestamp)}</td>
        <td>{event.userId}</td>
        <td>{event.eventType}</td>
      </tr>
    )
  }

  return (
    <table>
      <thead>
        <tr><th>Timestamp</th><th>User ID</th><th>Event Type</th></tr>
      </thead>
      <tbody>
        {
          events.length
            ? events.map((event, index) => renderEvent(event, index))
            : <tr><td colSpan={3}>No entries to show. Please adjust filters and click Get Events.</td></tr>
        }
      </tbody>
    </table>
  );
}
