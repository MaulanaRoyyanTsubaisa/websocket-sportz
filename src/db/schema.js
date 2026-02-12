import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enum for match status (DB enum name: match_status)
export const matchStatus = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

// Matches table
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  sport: text("sport").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  status: matchStatus("status").notNull().default("scheduled"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Commentary table
export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .references(() => matches.id)
    .notNull(),
  minute: integer("minute"),
  sequence: integer("sequence"),
  period: varchar("period", { length: 32 }),
  eventType: varchar("event_type", { length: 64 }),
  actor: text("actor"),
  team: varchar("team", { length: 32 }),
  message: text("message").notNull(),
  metadata: jsonb("metadata"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Exports grouped for convenience
export const dbSchema = {
  matchStatus,
  matches,
  commentary,
};
