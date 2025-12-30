import {pgTable, uuid,text,timestamp, boolean} from "drizzle-orm/pg-core";
import {user} from "./auth-schema";

export const note = pgTable("tablenote",{
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull().references(() => user.id),
    tittle:text("tittle").notNull(),
    content:text("content").notNull(),
    tags:text("tags").notNull(),
    isArchived:boolean("isArchived").notNull().default(false),
    reminder:text("reminder").notNull(),
    isDeleted:boolean("isDeleted").notNull().default(false),
    updatedAt: timestamp("updatedAt").defaultNow(),
    createdAt:timestamp("createdAt").defaultNow(),
})