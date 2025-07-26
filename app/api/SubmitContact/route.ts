import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db(); // use default DB or specify like db('your-db-name')
   console.log({db})
    const collection = db.collection("contacts");

    const result = await collection.insertOne(data);

    return NextResponse.json({ success: true, message: "Data saved", id: result.insertedId });
  } catch (error: any) {
    console.error("Error saving contact form data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
