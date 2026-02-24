import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI environment variable is not set");
  process.exit(1);
}

function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = 4;
  const segmentLength = 5;
  
  const keySegments: string[] = [];
  for (let i = 0; i < segments; i++) {
    let segment = "";
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    keySegments.push(segment);
  }
  
  return keySegments.join("-");
}

async function seedLicenseKeys(count: number = 10) {
  console.log(`Connecting to MongoDB...`);
  
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  
  const db = client.db();
  const collection = db.collection("license_keys");
  
  console.log(`Generating ${count} license keys...`);
  
  const keys = [];
  for (let i = 0; i < count; i++) {
    keys.push({
      key: generateLicenseKey(),
      status: "unused",
      createdAt: new Date(),
    });
  }
  
  const result = await collection.insertMany(keys);
  
  console.log(`✓ Inserted ${result.insertedCount} license keys`);
  console.log("\nSample keys:");
  keys.slice(0, 3).forEach((k, i) => {
    console.log(`  ${i + 1}. ${k.key}`);
  });
  
  await client.close();
  console.log("\nDone!");
}

seedLicenseKeys(10).catch(console.error);
