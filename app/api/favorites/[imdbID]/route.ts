/* eslint-disable */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ imdbID: string }> }
) {
  const { imdbID } = await params; 
  const body = await request.json();

  const { title, year, poster, imdbRating } = body;

  const userId = 1;

  try {
    const existing = await prisma.favorite.findFirst({
      where: { imdbID, userId },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already a favorite" },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        imdbID,
        imdbRating,
        title,
        year,
        poster,
        userId,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Could not add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ imdbID: string }> }
) {
  const { imdbID } = await params; 
  const userId = 1;

  try {
    const deleted = await prisma.favorite.deleteMany({
      where: { imdbID, userId },
    });

    return NextResponse.json({ deleted });
  } catch (error) {
    return NextResponse.json(
      { message: "Couldn't remove favorite" },
      { status: 500 }
    );
  }
}
