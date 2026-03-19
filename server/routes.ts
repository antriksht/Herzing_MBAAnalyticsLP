import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";

let genAI: GoogleGenerativeAI;
let model: any;
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Gemini 3.1 Flash-Lite
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
  model = genAI.getGenerativeModel({ 
    model: "gemini-3.1-flash-lite-preview",
    systemInstruction: "You are a specialized Herzing University F-1 Transfer Expert. Your goal is to help international students understand the transfer process, required documents, credit transfers, and program details. Use the provided context to answer accurately. Be supportive, professional, and highlight the 'Move Up to Herzing' branding. Emphasize the $5,000 scholarship and 16-month MBA timeline when relevant. If you don't know an answer, refer the student to admissions@herzing.edu."
  });
  // Read context for AI
  const searchPaths = [
    path.resolve(process.cwd(), "herzing_transfer_page_content.txt"),
    path.resolve(__dirname, "herzing_transfer_page_content.txt"),
    path.resolve(__dirname, "..", "herzing_transfer_page_content.txt")
  ];
  
  let herzingContext = "";
  for (const contentPath of searchPaths) {
    try {
      herzingContext = await fs.readFile(contentPath, "utf-8");
      console.log(`Successfully loaded context from: ${contentPath}`);
      break; 
    } catch (err) {
      // Continue to next path
    }
  }
  
  if (!herzingContext) {
    console.error("Context file not found in any of the expected locations:", searchPaths);
  }

  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      console.log("Incoming lead body:", JSON.stringify(req.body, null, 2));
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.json(lead);
    } catch (error: any) {
      if (error?.errors) {
        console.error("Zod field errors:", JSON.stringify(error.errors, null, 2));
      } else {
        console.error("Lead validation error:", error.message);
      }
      res.status(400).json({ message: error.message });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, currentHistory } = req.body;

      if (!process.env.GOOGLE_GEMINI_API_KEY) {
        return res.status(500).json({ message: "Gemini API key is not configured" });
      }

      // Enforcement of the 10-question limit (client also handles this)
      const userMessages = currentHistory.filter((m: any) => m.role === "user");
      if (userMessages.length >= 10) {
        return res.status(403).json({ 
          reply: "You have reached the limit of 10 questions for this session. Please contact our admissions team at admissions@herzing.edu or call 1-800-596-0724 for further assistance." 
        });
      }

      // Gemini history must start with a 'user' message and alternate roles.
      console.log("Original history length:", currentHistory.length);
      
      let geminiHistory = currentHistory.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      // 1. Remove initial model messages
      while (geminiHistory.length > 0 && geminiHistory[0].role === "model") {
        geminiHistory.shift();
      }

      // 2. Ensure alternation and remove duplicates if any
      let cleanedHistory = [];
      for (const msg of geminiHistory) {
        if (cleanedHistory.length > 0 && cleanedHistory[cleanedHistory.length - 1].role === msg.role) {
          // Skip if duplicate role (Gemini requires alternation)
          continue;
        }
        cleanedHistory.push(msg);
      }

      // 3. Ensure history ends with a model message if possible, 
      // or at least ensure we don't have two users in a row when we sendMessage
      if (cleanedHistory.length > 0 && cleanedHistory[cleanedHistory.length - 1].role === "user") {
        // Since sendMessage will add another user message, we must end history with a model or pop the last user
        cleanedHistory.pop();
      }

      console.log("Processed history length:", cleanedHistory.length);
      if (cleanedHistory.length > 0) {
        console.log("First msg role:", cleanedHistory[0].role);
        console.log("Last msg role:", cleanedHistory[cleanedHistory.length - 1].role);
      }

      const chatSession = model.startChat({
        history: cleanedHistory,
      });

      const prompt = `Context Information:\n${herzingContext}\n\nUser Question: ${message}`;
      const result = await chatSession.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ reply: text });
    } catch (error: any) {
      console.error("Chat Error:", error);
      res.status(500).json({ message: "Failed to get response from AI Assistant" });
    }
  });

  // Get all leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json({ success: true, leads });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
