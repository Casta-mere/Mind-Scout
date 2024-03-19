import { GetStartOfThiSMonth, HttpCode } from "@/app/components";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/AuthOptions";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: HttpCode.UNAUTHORIZED });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: { CommitCount: true },
  });

  const lastDate =
    user?.CommitCount && user?.CommitCount[user.CommitCount.length - 1];

  const startOfThisMonth = GetStartOfThiSMonth();

  if (
    !lastDate ||
    lastDate.monthStartDate.getTime() !== startOfThisMonth.getTime()
  ) {
    await prisma.commitCount.create({
      data: {
        userId: user?.id!,
        monthStartDate: startOfThisMonth,
        commitCount: 1,
      },
    });
    return NextResponse.json({}, { status: HttpCode.CREATED });
  } else {
    await prisma.commitCount.update({
      where: {
        id: lastDate.id,
      },
      data: {
        commitCount: { increment: 1 },
      },
    });
    return NextResponse.json({}, { status: HttpCode.OK });
  }
}
