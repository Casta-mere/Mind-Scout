import { Card, Flex, Grid, Strong, Text } from "@radix-ui/themes";

const ReviewCards = ({
  reviewArray,
}: {
  reviewArray: [string, [string, number]][];
}) => {
  if (reviewArray.length === 0) return;
  const text: ["tomato" | "cyan", string, string] =
    reviewArray[0][1][1] === 0
      ? ["tomato", "正在复习", "这些是你正在复习的内容。继续保持！"]
      : ["cyan", "已掌握", "这些是你已掌握的内容！"];
  return (
    <Flex direction="column">
      <Strong>
        <Text size="6" color={text[0]}>
          {text[1]}({reviewArray.length})
        </Text>
      </Strong>
      <Text>{text[2]}</Text>
      <ul>
        {reviewArray.map((review) => {
          return (
            <Card mt="3" size="2" key={review[0]}>
              <Grid columns="5" className="h-24">
                <Flex className="col-span-1 items-center" justify="center">
                  <Strong>
                    <Text size="5">{review[0]}</Text>
                  </Strong>
                </Flex>
                <Flex className="col-span-4 items-center">{review[1][0]}</Flex>
              </Grid>
            </Card>
          );
        })}
      </ul>
    </Flex>
  );
};
export default ReviewCards;
