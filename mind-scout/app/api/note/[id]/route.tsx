import prisma from "@/prisma/client";
import authOptions from "../../auth/AuthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NoteSchema } from "@/app/components/ValidationSchema";
import { GetUser, HttpCode } from "@/app/components";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const body = await request.json();
  const validation = NoteSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: HttpCode.BAD_REQUEST,
    });

  const id = params.id;

  const note = await prisma.page.findUnique({
    where: {
      id,
    },
  });

  if (!note)
    return NextResponse.json(
      { error: "Invalid Note" },
      { status: HttpCode.NOTFOUND }
    );

  const user = await GetUser();
  if (user?.id !== note.authorId)
    return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const { title, content, description } = body;

  const updatedNote = await prisma.page.update({
    where: { id },
    data: {
      title,
      description,
      content,
    },
  });

  return NextResponse.json(updatedNote, { status: HttpCode.OK });
}
