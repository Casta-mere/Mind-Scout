import { Page } from "@prisma/client";
import { Badge, Flex, Strong, Text } from "@radix-ui/themes";
const ReviewScore = ({ note }: { note: Page }) => {
  const lastTime = note.reviewedAt;

  const interval =
    (new Date().getTime() - lastTime!.getTime()) / (24 * 60 * 60 * 1000);

  // interval < 1 一日
  // interval < 7 一周
  // interval < 30 一月

  const i =
    interval < 1 ? "一日" : interval < 7 ? "一周" : interval < 30 ? "月" : "年";

  console.log(interval);

  return (
    <>
      <Flex direction="column" gap="4">
        <Strong>
          <Text size="6">您的记忆力分数</Text>
        </Strong>
        <Flex className="bg-blue-100 rounded-md">
          <Flex m="4" justify="between" className="items-center w-full">
            <Text size="6" weight="bold" color="blue">
              {i}记忆
            </Text>
            <Flex className="items-center" gap="4">
              <Badge color="green" variant="solid" radius="full">
                +2
              </Badge>
              <Text size="6" weight="bold">
                98%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default ReviewScore;
