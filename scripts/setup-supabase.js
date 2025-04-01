#!/usr/bin/env node

/**
 * This script helps set up the Supabase environment for the School Photo Sales System.
 * It creates the necessary tables, storage buckets, and policies.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Check if .env file exists
const envPath = path.join(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error(
    "Error: .env file not found. Please create one with your Supabase credentials.",
  );
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, "utf8");
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in your .env file.",
  );
  process.exit(1);
}

console.log("\n🔧 School Photo Sales System - Supabase Setup\n");
console.log(
  "This script will set up your Supabase project with the necessary tables and storage buckets.",
);
console.log(
  "Make sure you have created a Supabase project and added your credentials to the .env file.",
);

rl.question("\nDo you want to continue? (y/n) ", (answer) => {
  if (answer.toLowerCase() !== "y") {
    console.log("Setup cancelled.");
    rl.close();
    return;
  }

  console.log("\n📦 Setting up Supabase...");

  try {
    // Install Supabase CLI if not already installed
    console.log("\n🔍 Checking for Supabase CLI...");
    try {
      execSync("supabase --version", { stdio: "ignore" });
      console.log("✅ Supabase CLI is already installed.");
    } catch (error) {
      console.log("⚠️ Supabase CLI not found. Installing...");
      execSync("npm install -g supabase", { stdio: "inherit" });
      console.log("✅ Supabase CLI installed successfully.");
    }

    // Initialize Supabase project
    console.log("\n🚀 Initializing Supabase project...");
    try {
      execSync("supabase init", { stdio: "inherit" });
      console.log("✅ Supabase project initialized.");
    } catch (error) {
      console.log(
        "⚠️ Supabase project may already be initialized. Continuing...",
      );
    }

    // Link to existing Supabase project
    console.log("\n🔗 Linking to your Supabase project...");
    rl.question("Enter your Supabase project ID: ", (projectId) => {
      try {
        execSync(`supabase link --project-ref ${projectId}`, {
          stdio: "inherit",
        });
        console.log("✅ Linked to Supabase project successfully.");

        // Apply migrations
        console.log("\n📊 Applying database migrations...");
        execSync("supabase db push", { stdio: "inherit" });
        console.log("✅ Database migrations applied successfully.");

        // Seed the database
        console.log("\n🌱 Seeding the database...");
        const seedPath = path.join(process.cwd(), "supabase/seed.sql");
        execSync(`supabase db execute --file ${seedPath}`, {
          stdio: "inherit",
        });
        console.log("✅ Database seeded successfully.");

        console.log(
          "\n🎉 Setup complete! Your Supabase project is now ready to use with the School Photo Sales System.",
        );
        console.log("\nNext steps:");
        console.log("1. Run `npm run dev` to start the development server");
        console.log("2. Open your browser to the local development URL");
        console.log(
          '3. Use one of the QR codes from the seed data to log in (e.g., "qr-123456")',
        );

        rl.close();
      } catch (error) {
        console.error("Error linking to Supabase project:", error.message);
        rl.close();
      }
    });
  } catch (error) {
    console.error("Error during setup:", error.message);
    rl.close();
  }
});
