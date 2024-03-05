import { FormEvent } from "react"
import { z } from 'zod'

const schema = z.object({
  // Input values are strings, coercing to required types
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  userId: z.coerce.number().optional(),
  eventType: z.string().optional(),
})

export default function Filters({ onChange }) {
  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // This will have all inputs as a POJO. If nothing is entered properties will be empty strings ('')
    // e.g. {fromDate: '', toDate: '2024-03-07', userId: '', eventType: ''}
    const filters = Object.fromEntries(new FormData(e.currentTarget))

    // Clearing falsy keys. So only meaningful properties are left.
    // e.g. {toDate: '2024-03-07'}
    Object.keys(filters).map(key => !filters[key] && delete filters[key])

    // This will raise an error if validation fails.
    // Not handling with a nice UI, just using NextJS inbuilt error reporting.
    schema.parse(filters)

    onChange(filters)
  }

  return (
    <form className="flex space-x-4 mb-8"
          onSubmit={handleSubmit}>
      <label htmlFor="fromDate">From:</label>
      <input type="date" name="fromDate" id="fromDate" className="text-black"/>

      <label htmlFor="toDate">To:</label>
      <input type="date" name="toDate" id="toDate" className="text-black"/>

      <label htmlFor="userId">User:</label>
      <input type="text" name="userId" id="userId" className="text-black"/>

      <label htmlFor="eventType">Type:</label>
      <input type="text" name="eventType" id="eventType" className="text-black"/>

      <button type="submit">Get Events</button>
    </form>
  )
}
