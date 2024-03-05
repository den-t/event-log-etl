import { Event, filterEvents } from "./models";

const mockEvents: Array<Event> = [
  {
    timestamp: new Date("2024-03-01T06:38:28.000Z"),
    userId: 102,
    eventType: "view_page",
    originalLine: "2024-03-01T19:38:28 - User 102 Event: view_page"
  },
  {
    timestamp: new Date("2024-03-01T06:36:16.000Z"),
    userId: 103,
    eventType: "view_page",
    originalLine: "2024-03-01T19:36:16 - User 103 Event: view_page"
  },
  {
    timestamp: new Date("2024-03-01T05:08:52.000Z"),
    userId: 101,
    eventType: "click_button",
    originalLine: "2024-03-01T18:08:52 - User 101 Event: click_button"
  },
  {
    timestamp: new Date("2024-03-01T03:01:18.000Z"),
    userId: 103,
    eventType: "view_page",
    originalLine: "2024-03-01T16:01:18 - User 103 Event: view_page"
  },
  {
    timestamp: new Date("2024-03-01T02:42:57.000Z"),
    userId: 100,
    eventType: "submit_form",
    originalLine: "2024-03-01T15:42:57 - User 100 Event: submit_form"
  }
]

describe('models', () => {
  it('should filter log entries by user id', async () => {
    const result = filterEvents(mockEvents, {
      userId: "103",
    });
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });

  it('should filter log entries by partial event type name', async () => {
    const result = filterEvents(mockEvents, {
      eventType: "view",
    });
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
  });
});
