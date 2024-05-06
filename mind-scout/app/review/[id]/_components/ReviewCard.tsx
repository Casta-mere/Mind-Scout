"use client";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Progress,
  Strong,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaChevronRight, FaLightbulb } from "react-icons/fa";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { RiCloseLine } from "react-icons/ri";
import NotePieChart from "./ReviewPieChart";
const ReviewCard = ({
  reviewArray,
  reviews,
  noteId,
}: {
  reviewArray: [string, [string, number]][];
  reviews: { string: [string, number] };
  noteId: string;
}) => {
  const reviewsCount = reviewArray.length;
  const [id, setId] = useState(0);

  const Submit = async (data: any) => {
    try {
      const convertedData = data.reduce(
        (obj: { [x: string]: any[] }, [key, [value, _]]: any) => {
          obj[key] = [value, _];
          return obj;
        },
        {}
      );
      await axios.patch("/api/note/" + noteId, {
        reviews: { ...reviews, ...convertedData },
        reviewedAt: new Date().toISOString(),
      });
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const remainReviews = () => {
    const count = reviewArray.filter((item) => item[1][1] === 0).length;
    return count;
  };

  if (id === reviewsCount) {
    return (
      <>
        <Flex direction="column" gap="3" className="items-start h-96">
          <Strong>
            <Text size="7">恭喜您！复习完成!</Text>
          </Strong>
          <Grid columns="4" className="w-full">
            <Flex direction="column" gap="3" className="items-start col-span-1">
              <Strong>
                <Text size="5" color="gray">
                  您的进展
                </Text>
              </Strong>
              <NotePieChart
                inProgress={remainReviews()}
                finished={Object.keys(reviews).length - remainReviews()}
              />

              <Tooltip content="上一条">
                <Button
                  color="gray"
                  variant="soft"
                  radius="full"
                  disabled={id === 0}
                  onClick={() => setId(id - 1)}
                >
                  <HiArrowUturnLeft />
                  返回上一条
                </Button>
              </Tooltip>
            </Flex>

            <Flex
              className="col-span-1"
              direction="column"
              gap="3"
              justify="center"
            >
              <Badge size="3" radius="full" mx="4" color="green">
                <Text size="4">已完成：</Text>
                <Text className="ml-auto">
                  {Object.keys(reviews).length - remainReviews()}
                </Text>
              </Badge>
              <Badge size="3" radius="full" mx="4" color="blue">
                <Text size="4">剩余：</Text>
                <Text className="ml-auto">{remainReviews()}</Text>
              </Badge>
            </Flex>
            <Flex
              direction="column"
              gap="3"
              justify="start"
              className="col-span-2"
            >
              <Strong>
                <Text size="5" color="gray">
                  后续步骤
                </Text>
              </Strong>
              {remainReviews() !== 0 && (
                <Card
                  variant="surface"
                  size="4"
                  asChild
                  onClick={() => {
                    // const newReviews = Object.fromEntries(
                    //   Object.entries(reviews).map(([key, [value, _]]) => [
                    //     key,
                    //     [value, 0],
                    //   ])
                    // );
                    // await axios.patch("/api/note/" + noteId, {
                    //   reviews: newReviews,
                    // });
                    window.location.reload();
                  }}
                >
                  <Link href={"/review/" + noteId}>
                    <Flex className="items-center" gap="5">
                      <FaLightbulb color="indigo" size="25" />
                      <Flex direction="column" className="items-start">
                        <Strong>
                          <Text size="5" color="indigo">
                            复习剩余卡片
                          </Text>
                        </Strong>
                        <Text size="3" color="gray">
                          复习剩余的{remainReviews()}个卡片
                        </Text>
                      </Flex>
                      <FaChevronRight className="ml-auto" />
                    </Flex>
                  </Link>
                </Card>
              )}
              <Card
                variant="surface"
                size="4"
                asChild
                onClick={async () => {
                  const newReviews = Object.fromEntries(
                    Object.entries(reviews).map(([key, [value, _]]) => [
                      key,
                      [value, 0],
                    ])
                  );
                  await axios.patch("/api/note/" + noteId, {
                    reviews: newReviews,
                  });
                  window.location.reload();
                }}
              >
                <Link href={"/review/" + noteId}>
                  <Flex className="items-center" gap="5">
                    <FaLightbulb color="indigo" size="25" />
                    <Flex direction="column" className="items-start">
                      <Strong>
                        <Text size="5" color="indigo">
                          重新开始卡片模式
                        </Text>
                      </Strong>
                      <Text size="3" color="gray">
                        重新开始再次学习全部{Object.keys(reviews).length}个卡片
                      </Text>
                    </Flex>
                    <FaChevronRight className="ml-auto" />
                  </Flex>
                </Link>
              </Card>
            </Flex>
          </Grid>
        </Flex>
        <Flex className="items-center col-span-1 h-11"></Flex>
      </>
    );
  }

  return (
    <Flex direction="column" gap="3">
      <Card size="5" className="col-span-3 h-96">
        {id !== reviewsCount && reviewsCount !== 0 && (
          <Flex direction="column" gap="5">
            <Heading as="h1" align="center">
              <Strong>{reviewArray[id][0]}</Strong>
            </Heading>
            <Text size="6">{reviewArray[id][1][0]}</Text>
          </Flex>
        )}
      </Card>
      <Grid columns="3">
        <Flex className="items-center col-span-1">
          <Tooltip content="上一条">
            <Button
              color="gray"
              variant="soft"
              radius="full"
              disabled={id === 0}
              onClick={() => setId(id - 1)}
            >
              <HiArrowUturnLeft />
            </Button>
          </Tooltip>
        </Flex>
        <Flex justify="center" className="items-center col-span-1" gap="5">
          <Tooltip content="仍在学">
            <Button
              color="gray"
              variant="soft"
              radius="full"
              size="3"
              disabled={id === reviewsCount!}
              onClick={async () => {
                reviewArray[id][1][1] = 0;
                setId(id + 1);
                if (id === reviewsCount - 1) {
                  await Submit(reviewArray);
                }
              }}
            >
              <RiCloseLine color="red" />
            </Button>
          </Tooltip>
          {id + 1} / {reviewsCount}
          <Tooltip content="已了解">
            <Button
              color="gray"
              variant="soft"
              radius="full"
              size="3"
              disabled={id === reviewsCount!}
              onClick={async () => {
                reviewArray[id][1][1] = 1;
                setId(id + 1);
                if (id === reviewsCount - 1) {
                  await Submit(reviewArray);
                }
              }}
            >
              <FaCheck color="green" />
            </Button>
          </Tooltip>
        </Flex>
      </Grid>

      <Progress value={(100 * id) / reviewsCount!} color="violet" />
    </Flex>
  );
};
export default ReviewCard;
export const dynamic = "force-dynamic";
