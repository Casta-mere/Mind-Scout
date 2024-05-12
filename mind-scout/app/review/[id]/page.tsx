import { AuthorCheck, GetUser } from "@/app/components";
import prisma from "@/prisma/client";
import {
  Callout,
  Flex,
  Grid,
  Heading,
  Link,
  Strong,
  Text,
} from "@radix-ui/themes";
import { cache } from "react";
import { ReviewActions, ReviewCard, ReviewCards } from "./_components";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ReviewScore from "./_components/ReviewScore";
import { useRouter } from "next/navigation";
import ReviewForm from "./_components/ReviewForm";

const fetchNote = cache((noteid: string) =>
  prisma.page.findUnique({
    where: {
      id: noteid,
    },
    include: {
      author: true,
    },
  })
);

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const note = await fetchNote(params.id);

  const authorCheck = await AuthorCheck(note!);
  const loginCheck = await GetUser();

  const reviews = note!.reviews! as {
    string: [string, number];
  };

  if (!reviews) {
    return <ReviewForm note={note!} avataUrl={note!.author.image!} />;
  }

  const reviewArray: [string, [string, number]][] = Object.entries(reviews);

  const filteredReviewArray = reviewArray.reduce(
    (acc, curr) => {
      const index = curr[1][1]; // 获取最内层数组的第二个数据
      if (index === 0) {
        acc[0].push(curr);
      } else if (index === 1) {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []] as [string, [string, number]][][]
  );

  const ReviewInfo = () => {
    return (
      <>
        <Heading as="h1" className="col-span-3">
          <Text size="8">{note!.title}</Text>
        </Heading>
        <Heading as="h2" className="col-span-3">
          {note!.reviewedAt ? (
            <Text size="4" color="gray">
              Last Reviewed At {note!.updatedAt.toLocaleString()}
            </Text>
          ) : (
            <Text size="4" color="gray">
              Havn&apos;t Reviewed Yet
            </Text>
          )}
        </Heading>
      </>
    );
  };

  return (
    <>
      <Grid columns="4">
        <Flex className="col-span-3" direction="column" gap="7">
          <ReviewInfo />
          <ReviewActions noteId={note?.id!} />
          <ReviewCard
            reviewArray={filteredReviewArray[0]}
            reviews={reviews}
            noteId={note?.id!}
            note={note!}
          />
          <Strong>
            <Text size="6">此学习集的卡片({reviewArray.length})</Text>
          </Strong>
          <ReviewCards reviewArray={filteredReviewArray[0]} />
          <ReviewCards reviewArray={filteredReviewArray[1]} />
        </Flex>
      </Grid>
    </>
  );
};

export default page;

export async function generateMetadata({ params }: Props) {
  const note = await fetchNote(params.id);
  return {
    title: note?.title || "Note " + note?.id,
    description: "Review Note " + note?.id,
  };
}
