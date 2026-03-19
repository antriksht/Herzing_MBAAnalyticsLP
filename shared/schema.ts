import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  campus: text("campus").notNull(),
  programArea: text("program_area").notNull(),
  programOfInterest: text("program_of_interest").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  zipCode: text("zip_code").notNull(),
  currentUniversity: text("current_university").notNull(),
  currentProgram: text("current_program").notNull(),
  creditsEarned: integer("credits_earned").notNull(),
  visaStatus: text("visa_status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  campus: true,
  programArea: true,
  programOfInterest: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  zipCode: true,
  currentUniversity: true,
  currentProgram: true,
  creditsEarned: true,
  visaStatus: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits"),
  campus: z.string().min(1, "Please select a campus"),
  programArea: z.string().min(1, "Please select a program area"),
  programOfInterest: z.string().min(1, "Please select a program of interest"),
  currentUniversity: z.string().min(1, "Please enter your current university"),
  currentProgram: z.string().min(1, "Please enter your current program"),
  creditsEarned: z.coerce.number().min(0, "Credits earned must be at least 0"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
