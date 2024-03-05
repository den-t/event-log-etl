import request from 'supertest';
import app from './app';

describe('GET /events/log', () => {
  it('should filter and sort log entries', async () => {
    const response = await request(app).get('/events/log?eventType=click_button');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Checking filtering
    expect(response.body).toHaveLength(29);

    // Checking sorting
    const firstTimestamp = new Date(response.body[0].timestamp).getTime()
    const lastTimestamp = new Date(response.body[response.body.length - 1].timestamp).getTime()
    expect(lastTimestamp).toBeLessThan(firstTimestamp);
  });

  it('should validate input parameters', async () => {
    const response = await request(app).get('/events/log?fromDate=not_a_date');
    expect(response.statusCode).toBe(400);
  });
});
