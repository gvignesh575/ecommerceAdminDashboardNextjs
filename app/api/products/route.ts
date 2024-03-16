import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (err) {
    console.log("[Collections_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
