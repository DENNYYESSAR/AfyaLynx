import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertClinicSchema, insertHealthInquirySchema, insertClinicReviewSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Setup authentication routes
  setupAuth(app);

  // Clinic routes
  app.get("/api/clinics", async (req, res) => {
    try {
      const { city, specialty, isOpen } = req.query;
      const filters: any = {};
      
      if (city) filters.city = city as string;
      if (specialty) filters.specialty = specialty as string;
      if (isOpen !== undefined) filters.isOpen = isOpen === 'true';
      
      const clinics = await storage.getClinics(filters);
      res.json(clinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      res.status(500).json({ error: "Failed to fetch clinics" });
    }
  });

  app.get("/api/clinics/:id", async (req, res) => {
    try {
      const clinic = await storage.getClinic(parseInt(req.params.id));
      if (!clinic) {
        return res.status(404).json({ error: "Clinic not found" });
      }
      res.json(clinic);
    } catch (error) {
      console.error("Error fetching clinic:", error);
      res.status(500).json({ error: "Failed to fetch clinic" });
    }
  });

  app.post("/api/clinics", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const result = insertClinicSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid clinic data", details: result.error.errors });
      }

      const clinic = await storage.createClinic({
        ...result.data,
        userId: req.user!.id,
      });
      res.status(201).json(clinic);
    } catch (error) {
      console.error("Error creating clinic:", error);
      res.status(500).json({ error: "Failed to create clinic" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const { published } = req.query;
      const posts = await storage.getBlogPosts(published === 'true');
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Testimonials route
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { featured } = req.query;
      const testimonials = await storage.getTestimonials(featured === 'true');
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Health inquiry routes
  app.post("/api/health-inquiry", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const result = insertHealthInquirySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid inquiry data", details: result.error.errors });
      }

      const inquiry = await storage.createHealthInquiry({
        ...result.data,
        userId: req.user!.id,
      });

      res.status(201).json(inquiry);
    } catch (error) {
      console.error("Error creating health inquiry:", error);
      res.status(500).json({ error: "Failed to create health inquiry" });
    }
  });

  app.get("/api/health-inquiries", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const inquiries = await storage.getUserHealthInquiries(req.user!.id);
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching health inquiries:", error);
      res.status(500).json({ error: "Failed to fetch health inquiries" });
    }
  });

  // AI Prediction endpoint for meal recommendations
  app.post("/api/predict", async (req, res) => {
    try {
      const { symptoms, additionalInfo, inquiryId } = req.body;

      if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required" });
      }

      // Rule-based AI engine for meal recommendations
      const mealRecommendations = generateMealRecommendations(symptoms.toLowerCase());
      const treatmentSuggestion = generateTreatmentSuggestion(symptoms.toLowerCase());

      // Update the health inquiry if inquiryId is provided
      if (inquiryId) {
        await storage.updateHealthInquiryRecommendations(
          inquiryId,
          treatmentSuggestion,
          mealRecommendations
        );
      }

      res.json({
        treatment: treatmentSuggestion,
        meals: mealRecommendations,
      });
    } catch (error) {
      console.error("Error generating predictions:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Clinic reviews
  app.get("/api/clinics/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getClinicReviews(parseInt(req.params.id));
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching clinic reviews:", error);
      res.status(500).json({ error: "Failed to fetch clinic reviews" });
    }
  });

  app.post("/api/clinics/:id/reviews", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const result = insertClinicReviewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid review data", details: result.error.errors });
      }

      const review = await storage.createClinicReview({
        ...result.data,
        userId: req.user!.id,
        clinicId: parseInt(req.params.id),
      });

      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating clinic review:", error);
      res.status(500).json({ error: "Failed to create clinic review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Rule-based AI engine for meal recommendations
function generateMealRecommendations(symptoms: string) {
  const recommendations = [];

  if (symptoms.includes('fever') || symptoms.includes('cold') || symptoms.includes('flu')) {
    recommendations.push({
      meal: "Chicken Soup with Ginger",
      reason: "High in protein and contains anti-inflammatory properties",
      ingredients: ["chicken breast", "ginger", "garlic", "vegetables", "bone broth"],
      nutrition: { calories: 250, protein: "25g", vitamin_c: "high" }
    });
    recommendations.push({
      meal: "Citrus Fruits and Green Tea",
      reason: "Rich in vitamin C to boost immune system",
      ingredients: ["oranges", "lemons", "green tea", "honey"],
      nutrition: { vitamin_c: "very high", antioxidants: "high" }
    });
  }

  if (symptoms.includes('stomach') || symptoms.includes('nausea') || symptoms.includes('digestive')) {
    recommendations.push({
      meal: "BRAT Diet (Banana, Rice, Applesauce, Toast)",
      reason: "Easy to digest and helps settle stomach",
      ingredients: ["bananas", "white rice", "applesauce", "plain toast"],
      nutrition: { fiber: "low", easy_digest: true }
    });
    recommendations.push({
      meal: "Ginger Tea with Crackers",
      reason: "Ginger helps reduce nausea and aids digestion",
      ingredients: ["fresh ginger", "plain crackers", "herbal tea"],
      nutrition: { anti_nausea: "high", gentle: true }
    });
  }

  if (symptoms.includes('headache') || symptoms.includes('migraine')) {
    recommendations.push({
      meal: "Magnesium-Rich Smoothie",
      reason: "Magnesium can help reduce headache frequency",
      ingredients: ["spinach", "banana", "almonds", "dark chocolate", "almond milk"],
      nutrition: { magnesium: "high", potassium: "high" }
    });
  }

  if (symptoms.includes('fatigue') || symptoms.includes('tired') || symptoms.includes('energy')) {
    recommendations.push({
      meal: "Iron-Rich Salad with Quinoa",
      reason: "Iron and complex carbs for sustained energy",
      ingredients: ["quinoa", "spinach", "lean beef", "pumpkin seeds", "lemon"],
      nutrition: { iron: "high", complex_carbs: "high", protein: "20g" }
    });
  }

  // Default healthy meal if no specific symptoms match
  if (recommendations.length === 0) {
    recommendations.push({
      meal: "Balanced Mediterranean Bowl",
      reason: "Well-rounded nutrition for general health",
      ingredients: ["quinoa", "grilled chicken", "vegetables", "olive oil", "herbs"],
      nutrition: { calories: 400, protein: "30g", fiber: "high", healthy_fats: "high" }
    });
  }

  return recommendations;
}

function generateTreatmentSuggestion(symptoms: string): string {
  if (symptoms.includes('fever') || symptoms.includes('cold')) {
    return "Rest, stay hydrated, and consider over-the-counter fever reducers. Consult a doctor if fever persists above 101°F for more than 3 days.";
  }
  
  if (symptoms.includes('headache') || symptoms.includes('migraine')) {
    return "Try rest in a dark, quiet room. Stay hydrated and consider over-the-counter pain relievers. If headaches are severe or frequent, consult a healthcare provider.";
  }
  
  if (symptoms.includes('stomach') || symptoms.includes('nausea')) {
    return "Eat bland foods, stay hydrated with small sips of water. Avoid dairy and fatty foods. Seek medical attention if symptoms persist for more than 48 hours.";
  }
  
  if (symptoms.includes('cough')) {
    return "Stay hydrated, use a humidifier, and consider honey for throat soothing. See a doctor if cough persists for more than 2 weeks or is accompanied by blood.";
  }
  
  return "Monitor your symptoms and maintain good nutrition and hydration. Consult with a healthcare professional for proper diagnosis and treatment if symptoms persist or worsen.";
}