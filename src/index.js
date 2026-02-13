import express from "express";
import { matchesRouter } from "./routes/matches.js";
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root GET route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Use the matches router
app.use("/matches", matchesRouter);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
