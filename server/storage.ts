import { 
  users, 
  clinics, 
  blogPosts, 
  testimonials, 
  healthInquiries, 
  clinicReviews,
  type User, 
  type InsertUser,
  type Clinic,
  type InsertClinic,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type HealthInquiry,
  type InsertHealthInquiry,
  type ClinicReview,
  type InsertClinicReview
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, desc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Clinic methods
  getClinics(filters?: {
    city?: string;
    specialty?: string;
    isOpen?: boolean;
  }): Promise<Clinic[]>;
  getClinic(id: number): Promise<Clinic | undefined>;
  createClinic(clinic: InsertClinic & { userId: number }): Promise<Clinic>;
  updateClinicAvailability(id: number, isOpen: boolean, waitTime?: number): Promise<void>;
  
  // Blog methods
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Testimonial methods
  getTestimonials(featured?: boolean): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Health inquiry methods
  createHealthInquiry(inquiry: InsertHealthInquiry & { userId: number }): Promise<HealthInquiry>;
  getUserHealthInquiries(userId: number): Promise<HealthInquiry[]>;
  updateHealthInquiryRecommendations(
    id: number, 
    aiRecommendation: string, 
    mealRecommendations: any
  ): Promise<void>;
  
  // Review methods
  getClinicReviews(clinicId: number): Promise<(ClinicReview & { user: Pick<User, 'username'> })[]>;
  createClinicReview(review: InsertClinicReview & { userId: number }): Promise<ClinicReview>;
  
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Clinic methods
  async getClinics(filters?: {
    city?: string;
    specialty?: string;
    isOpen?: boolean;
  }): Promise<Clinic[]> {
    let query = db.select().from(clinics);
    
    if (filters) {
      const conditions = [];
      if (filters.city) {
        conditions.push(like(clinics.city, `%${filters.city}%`));
      }
      if (filters.specialty) {
        conditions.push(eq(clinics.specialty, filters.specialty));
      }
      if (filters.isOpen !== undefined) {
        conditions.push(eq(clinics.isOpen, filters.isOpen));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(clinics.rating));
  }

  async getClinic(id: number): Promise<Clinic | undefined> {
    const [clinic] = await db.select().from(clinics).where(eq(clinics.id, id));
    return clinic || undefined;
  }

  async createClinic(clinic: InsertClinic & { userId: number }): Promise<Clinic> {
    const [newClinic] = await db
      .insert(clinics)
      .values(clinic)
      .returning();
    return newClinic;
  }

  async updateClinicAvailability(id: number, isOpen: boolean, waitTime?: number): Promise<void> {
    const updateData: any = { isOpen };
    if (waitTime !== undefined) {
      updateData.waitTime = waitTime;
    }
    
    await db
      .update(clinics)
      .set(updateData)
      .where(eq(clinics.id, id));
  }

  // Blog methods
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);
    
    if (published !== undefined) {
      query = query.where(eq(blogPosts.published, published));
    }
    
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    // Generate slug from title
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
    
    const [newPost] = await db
      .insert(blogPosts)
      .values({ ...post, slug })
      .returning();
    return newPost;
  }

  // Testimonial methods
  async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
    let query = db.select().from(testimonials);
    
    if (featured !== undefined) {
      query = query.where(eq(testimonials.featured, featured));
    }
    
    return await query.orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  // Health inquiry methods
  async createHealthInquiry(inquiry: InsertHealthInquiry & { userId: number }): Promise<HealthInquiry> {
    const [newInquiry] = await db
      .insert(healthInquiries)
      .values(inquiry)
      .returning();
    return newInquiry;
  }

  async getUserHealthInquiries(userId: number): Promise<HealthInquiry[]> {
    return await db
      .select()
      .from(healthInquiries)
      .where(eq(healthInquiries.userId, userId))
      .orderBy(desc(healthInquiries.createdAt));
  }

  async updateHealthInquiryRecommendations(
    id: number, 
    aiRecommendation: string, 
    mealRecommendations: any
  ): Promise<void> {
    await db
      .update(healthInquiries)
      .set({ aiRecommendation, mealRecommendations })
      .where(eq(healthInquiries.id, id));
  }

  // Review methods
  async getClinicReviews(clinicId: number): Promise<(ClinicReview & { user: Pick<User, 'username'> })[]> {
    return await db
      .select({
        id: clinicReviews.id,
        userId: clinicReviews.userId,
        clinicId: clinicReviews.clinicId,
        rating: clinicReviews.rating,
        comment: clinicReviews.comment,
        createdAt: clinicReviews.createdAt,
        user: {
          username: users.username,
        },
      })
      .from(clinicReviews)
      .innerJoin(users, eq(clinicReviews.userId, users.id))
      .where(eq(clinicReviews.clinicId, clinicId))
      .orderBy(desc(clinicReviews.createdAt));
  }

  async createClinicReview(review: InsertClinicReview & { userId: number }): Promise<ClinicReview> {
    const [newReview] = await db
      .insert(clinicReviews)
      .values(review)
      .returning();

    // Update clinic rating and review count
    const [{ avgRating, count }] = await db
      .select({
        avgRating: sql<number>`avg(${clinicReviews.rating})`,
        count: sql<number>`count(*)`,
      })
      .from(clinicReviews)
      .where(eq(clinicReviews.clinicId, review.clinicId));

    await db
      .update(clinics)
      .set({
        rating: avgRating.toFixed(2),
        reviewCount: count,
      })
      .where(eq(clinics.id, review.clinicId));

    return newReview;
  }
}

export const storage = new DatabaseStorage();
