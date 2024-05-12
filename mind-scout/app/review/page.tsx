import { EbbinghausCurveChart } from "@/app/components";
import { Metadata } from "next";
import prisma from "@/prisma/client";
import ReviewTable from "./_components/ReviewTable";
import { ReviewRecommend } from "./[id]/_components";

const page = async () => {
  () => window.location.reload();

  const where = { reviews: { not: true } };
  const notes = await prisma?.page.findMany({
    where,
    orderBy: {
      reviewsCount: "asc",
    },
    skip: 1,
  });
  const note = await prisma?.page.findFirst({
    where,
    orderBy: {
      reviewsCount: "asc",
    },
    skip: 0,
  });
  return (
    <>
      {/* <EbbinghausCurveChart /> */}
      <ReviewRecommend note={note!} />
      <ReviewTable notes={notes} />
    </>
  );
};

export default page;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mind-Scout - Review",
  description: "Start Review!",
};
