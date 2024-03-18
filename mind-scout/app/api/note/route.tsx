import authOptions from "@/app/api/auth/AuthOptions";
import { GetUser, HttpCode } from "@/app/components";
import { NoteSchema } from "@/app/components/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const body = await request.json();
  const validation = NoteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: HttpCode.BAD_REQUEST,
    });

  const user = await GetUser();
  const authorId = user!.id;

  const { title, content, description } = body;
  const newPage = await prisma.page.create({
    data: {
      authorId,
      title: title || "New Page",
      content,
      description,
    },
  });

  return NextResponse.json(newPage, { status: HttpCode.CREATED });
}
