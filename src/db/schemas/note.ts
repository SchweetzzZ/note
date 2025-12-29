import {pgTable, uuid,text,timestamp, boolean} from "drizzle-orm/pg-core";

export const note = pgTable("tablenote",{
    id: text("text").primaryKey(),
    userId: uuid("uuid").notNull(),
    tittle:text("text").notNull(),
    content:text("text").notNull(),
    tags:text("text").notNull(),
    isArchived:text("text").notNull(),
    reminder:text("text").notNull(),
    isDeleted:boolean("isDeleted").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    createdAt:timestamp("createdAt").defaultNow(),
})