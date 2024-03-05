import express from 'express';
import * as fs from "fs";
import * as path from 'path';
import { validateRequestQuery } from "zod-express-middleware";
import { filterEvents, parseEvents } from "./models";
import { z } from 'zod';

const router = express.Router();

router.get(
  '/log',
  validateRequestQuery(
    // TODO: schema could be shared between frontend and backend
    z.object({
      fromDate: z.coerce.date().optional(),
      toDate: z.coerce.date().optional(),
      userId: z.coerce.number().optional(),
      eventType: z.string().optional(),
    }),
  ),
  async (req, res) => {
    // TODO: Ideally would stream and filter logs on the fly instead of loading them all to memory
    const logFilePath = path.join(__dirname, '../data/events.log');
    const fileContents = fs.readFileSync(logFilePath,{encoding: 'utf-8'});
    const allEvents = parseEvents(fileContents);

    const filters = req.query;
    //@ts-expect-error TypeScript is eagerly converting req.query to zod schema types. Don't know enough about zod to address properly
    const filteredEvents = filterEvents(allEvents, filters);

    // Sorting by timestamp descending
    res.json(filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }
);

export default router;
