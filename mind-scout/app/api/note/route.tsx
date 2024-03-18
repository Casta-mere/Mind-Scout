import { NextRequest, NextResponse } from "next/server";
import { createNoteSchema } from "@/app/components/ValidationSchema";
import { GetUser, HttpCode } from "@/app/components";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/AuthOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const body = await request.json();
  const validation = createNoteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: HttpCode.BAD_REQUEST,
    });

  const user = await GetUser(session.user?.email!);
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

  console.log(newPage);

  return NextResponse.json(newPage, { status: HttpCode.CREATED });
}
