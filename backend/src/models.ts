export type Event = {
  timestamp: Date;
  userId: number;
  eventType: string;
  originalLine: string;
};

export type EventFilters = {
  fromDate?: string;
  toDate?: string;
  userId?: string;
  eventType?: string;
};

export const parseEvents = (input: string): Array<Event> => {
  // Line example
  // 2024-03-01T07:48:16 - User 101 Event: submit_form
  const regexp = /(.+) - User (\d+) Event: (\w+)/g;

  const lines = input.trim().split('\n');

  return lines.map(line => {
    const matches = [...line.matchAll(regexp)];
    const event: Event = {
      // This conversion assumes that log events are in the UTC timezone
      timestamp: new Date(matches[0][1]),
      userId: +matches[0][2],
      eventType: matches[0][3],
      originalLine: matches[0][0],
    };
    return event;
  })
}

export const filterEvents = (events: Array<Event>, filters: EventFilters): Array<Event> => {
  let fromDate: Date | undefined;
  let toDate: Date | undefined;
  let userId: number | undefined;
  let eventType: string | undefined;

  if (filters.fromDate) {
    fromDate = new Date(filters.fromDate);
  }
  if (filters.toDate) {
    toDate = new Date(filters.toDate);
    // Filter will show everything up to the midnight on the given date
    toDate.setDate(toDate.getDate() + 1);
  }
  if (filters.userId) {
    userId = +filters.userId;
  }
  eventType = filters.eventType;

  // Could use a more idiomatic approach like filterFunctions.push(fromDatePredicate).
  // Just simpler to do with primitives here. And will be more performant on large datasets compared to function calls.
  return events.filter(event => {
    if (fromDate && event.timestamp < fromDate) {
      return false;
    }
    if (toDate && event.timestamp >= toDate) {
      return false;
    }
    if (userId && event.userId !== userId) {
      return false;
    }
    // Allowing to search for 'view' and get 'view_page'
    if (eventType && !event.eventType.includes(eventType)) {
      return false;
    }
    return true;
  })
}
