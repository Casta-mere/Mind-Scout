import { NoteScopeBadge } from "@/app/components";
import { Page } from "@prisma/client";
import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  note: Page;
}

const ReviewCard = ({ note }: Props) => {
  const reviews = note!.reviews! as {
    string: [string, number];
  };
  const reviewArray: [string, [string, number]][] = Object.entries(reviews);
  return (
    <Link href={`/review/${note.id}`}>
      <Card className="h-36 bg-blue-200 shadow-md hover:shadow-2xl transition-all">
        <Flex
          direction="column"
          className="items-start h-full"
          gap="4"
          justify="between"
          p="2"
        >
          <Flex gap="3" justify="between" className="w-full">
            <Text size="6" weight="bold">
              {note.title}
            </Text>

            <Text
              size="6"
              weight="bold"
              color={note.reviewsCount! < 60 ? "red" : "green"}
            >
              {note.reviewsCount}
            </Text>
          </Flex>
          <Flex gap="3" className="w-full items-center">
            <Badge color="gray">{reviewArray.length}个复习卡片</Badge>
            <NoteScopeBadge scope={note.scope} />
            <Text ml="auto" size="4" weight="bold">
              {new Date().getTime() - note.createdAt.getTime() <
              1000 * 60 * 60 * 24
                ? "今天复习过"
                : new Date().getTime() - note.createdAt.getTime() <
                  1000 * 60 * 60 * 24 * 3
                ? "三天内复习过"
                : new Date().getTime() - note.createdAt.getTime() <
                  1000 * 60 * 60 * 24 * 7
                ? "一周内复习过"
                : "最后复习于" +
                  note.createdAt.getMonth() +
                  "月" +
                  note.createdAt.getDate() +
                  "日"}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
export default ReviewCard;
