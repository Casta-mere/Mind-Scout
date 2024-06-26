import {
  GetCommitCount,
  GetUser,
  LatestNote,
  NoteChart,
  NotePieChart,
  NoteSummary,
  SocilaUpdates,
  WorkHistory,
} from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const user = await GetUser();
  if (!user) return <></>;

  const inProgress = await prisma.page.count({
    where: {
      authorId: user.id,
      status: "IN_PROGRESS",
    },
  });
  const archieved = await prisma.page.count({
    where: {
      authorId: user.id,
      status: "ARCHIEVED",
    },
  });
  const latestNote = await prisma.page.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 1,
  });

  const data = await GetCommitCount(user.id);

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Flex direction="column" gap="5" className="w-full">
        <NoteSummary inProgress={inProgress} archieved={archieved} />
        <SocilaUpdates />
      </Flex>
      <Flex direction="column" className="col-span-3">
        <Flex direction="column" gap="5">
          <NoteChart inProgress={inProgress} archieved={archieved} />
          <WorkHistory data={data} />
        </Flex>
      </Flex>
      <Flex direction="column" align="start">
        <NotePieChart inProgress={inProgress} archieved={archieved} />
        {latestNote.map((note) => (
          <LatestNote note={note} key={note.id} />
        ))}
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Mind-Scout DashBoard",
  description: "View Dashboard of Your Notes!",
};
