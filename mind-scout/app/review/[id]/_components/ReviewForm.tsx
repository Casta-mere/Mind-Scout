"use client";
import { Page } from "@prisma/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  ScrollArea,
  Strong,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaRegTrashCan } from "react-icons/fa6";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

const ReviewForm = ({ note, avataUrl }: { note: Page; avataUrl: string }) => {
  const router = useRouter();
  type ReviewType = [string, [string, number]];

  const [reviews, setReviews] = useState<ReviewType[]>([["", ["", 0]]]);

  useEffect(() => {
    if (note && note.reviews) {
      setReviews(Object.entries(note.reviews));
    }
  }, [note]);

  const handelDeleteReview = (indexToRemove: number) => {
    setReviews((review) => {
      return review.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleReviewChange = (
    index: number,
    value: string,
    isTextField: boolean
  ) => {
    setReviews((prevReviews) =>
      prevReviews.map((review, i) => {
        if (i === index) {
          return isTextField
            ? [value, review[1]]
            : [review[0], [value, review[1][1]]];
        }
        return review;
      })
    );
  };

  const onSubmit = async () => {
    try {
      const transformedReviews: { [key: string]: [string, number] } = {};
      reviews.forEach(([key, value]) => {
        transformedReviews[key] = value;
      });
      console.log(transformedReviews);
      await axios.patch("/api/note/" + note.id, {
        reviews: transformedReviews,
      });
      router.push("/review/" + note.id);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex direction="row" justify="start" gap="4" align="center">
        <Heading as="h1">{note.title}</Heading>
        <Avatar src={avataUrl} fallback={"?"} radius="full" size="3" />
      </Flex>
      <Grid columns="2" mt="5" gap="2">
        <Flex className="col-span-1">
          <ScrollArea
            type="scroll"
            scrollbars="vertical"
            style={{ height: 700 }}
          >
            <Box pr="6" className="prose">
              <Card className="prose ">
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </Card>
            </Box>
          </ScrollArea>
        </Flex>
        <Flex className="w-full col-span-1" direction="column" gap="3">
          <Strong>
            <Text size="5">共有{reviews.length}张卡片</Text>
          </Strong>
          <ScrollArea
            type="scroll"
            scrollbars="vertical"
            style={{ height: 650 }}
          >
            <Flex className="w-full" direction="column" gap="3" pr="4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <Flex align="center" justify="between">
                    <Strong>
                      <Text color="gray" size="5">
                        {index + 1}
                      </Text>
                    </Strong>
                    <Button
                      color="gray"
                      variant="surface"
                      radius="full"
                      size="2"
                      onClick={() => handelDeleteReview(index)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </Flex>
                  <Grid columns="7" align="center" gap="3" mt="2">
                    <TextField.Root
                      value={review[0]}
                      className="col-span-2"
                      variant="surface"
                      size="3"
                      onChange={(event) =>
                        handleReviewChange(index, event.target.value, true)
                      }
                      placeholder="卡片"
                    />
                    <TextArea
                      value={review[1][0]}
                      className="col-span-5"
                      variant="surface"
                      color="gray"
                      size="3"
                      resize="vertical"
                      onChange={(event) =>
                        handleReviewChange(index, event.target.value, false)
                      }
                      placeholder="内容"
                    />
                  </Grid>
                </Card>
              ))}
            </Flex>
            <Flex mt="3" justify="center" gap="3">
              <Tooltip content="添加">
                <Button
                  color="gray"
                  variant="soft"
                  radius="full"
                  size="3"
                  onClick={() => setReviews([...reviews, ["", ["", 0]]])}
                >
                  <HiOutlinePlusCircle color="red" />
                </Button>
              </Tooltip>
              <Tooltip content="确认">
                <Button
                  color="gray"
                  variant="soft"
                  radius="full"
                  size="3"
                  onClick={onSubmit}
                >
                  <FaCheck color="green" />
                </Button>
              </Tooltip>
            </Flex>
          </ScrollArea>
        </Flex>
      </Grid>
    </>
  );
};
export default ReviewForm;
