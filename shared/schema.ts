import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("patient"), // patient, clinic, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clinics = pgTable("clinics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  specialty: text("specialty").notNull(),
  description: text("description"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isOpen: boolean("is_open").default(true),
  waitTime: integer("wait_time").default(0), // in minutes
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  authorName: text("author_name").notNull(),
  authorTitle: text("author_title").notNull(),
  authorImage: text("author_image"),
  featuredImage: text("featured_image"),
  readTime: integer("read_time").notNull(), // in minutes
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Patient, Doctor, etc.
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const healthInquiries = pgTable("health_inquiries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  symptoms: text("symptoms").notNull(),
  additionalInfo: text("additional_info"),
  aiRecommendation: text("ai_recommendation"),
  mealRecommendations: jsonb("meal_recommendations"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clinicReviews = pgTable("clinic_reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  clinicId: integer("clinic_id").references(() => clinics.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clinics: many(clinics),
  healthInquiries: many(healthInquiries),
  clinicReviews: many(clinicReviews),
}));

export const clinicsRelations = relations(clinics, ({ one, many }) => ({
  user: one(users, {
    fields: [clinics.userId],
    references: [users.id],
  }),
  reviews: many(clinicReviews),
}));

export const healthInquiriesRelations = relations(healthInquiries, ({ one }) => ({
  user: one(users, {
    fields: [healthInquiries.userId],
    references: [users.id],
  }),
}));

export const clinicReviewsRelations = relations(clinicReviews, ({ one }) => ({
  user: one(users, {
    fields: [clinicReviews.userId],
    references: [users.id],
  }),
  clinic: one(clinics, {
    fields: [clinicReviews.clinicId],
    references: [clinics.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
});

export const insertClinicSchema = createInsertSchema(clinics).omit({
  id: true,
  userId: true,
  rating: true,
  reviewCount: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertHealthInquirySchema = createInsertSchema(healthInquiries).omit({
  id: true,
  userId: true,
  aiRecommendation: true,
  mealRecommendations: true,
  createdAt: true,
});

export const insertClinicReviewSchema = createInsertSchema(clinicReviews).omit({
  id: true,
  userId: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Clinic = typeof clinics.$inferSelect;
export type InsertClinic = z.infer<typeof insertClinicSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type HealthInquiry = typeof healthInquiries.$inferSelect;
export type InsertHealthInquiry = z.infer<typeof insertHealthInquirySchema>;
export type ClinicReview = typeof clinicReviews.$inferSelect;
export type InsertClinicReview = z.infer<typeof insertClinicReviewSchema>;
