import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse("Collection is deleted", { status: 200 });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
  } catch (err) {
    console.log("[CollectionId_DELETE] Error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
