import { AuthorCheck, HttpCode } from "@/app/components";
import { PatchNoteSchema } from "@/app/components/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/AuthOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const body = await request.json();
  const validation = PatchNoteSchema.safeParse(body);

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

  const authorCheck = await AuthorCheck(note);
  if (!authorCheck)
    return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const {
    title,
    content,
    description,
    status,
    scope,
    reviews,
    reviewedAt,
    reviewsCount,
  } = body;

  const updatedNote = await prisma.page.update({
    where: { id },
    data: {
      title,
      description,
      content,
      status,
      scope,
      reviews,
      reviewedAt,
      reviewsCount,
    },
  });

  return NextResponse.json(updatedNote, { status: HttpCode.OK });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

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

  const authorCheck = await AuthorCheck(note);
  if (!authorCheck)
    return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  await prisma.page.delete({
    where: { id },
  });

  return NextResponse.json({}, { status: HttpCode.OK });
}
