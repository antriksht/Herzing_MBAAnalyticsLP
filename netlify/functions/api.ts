import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize the API routes (ignoring the returned http server in serverless mode)
// Note: We use the existing registerRoutes but don't call server.listen()
registerRoutes(app);

export const handler = serverless(app);
