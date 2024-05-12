"use client";
import { Page } from "@prisma/client";
import { Card, Flex, Grid, Text, Button, Badge } from "@radix-ui/themes";
import Link from "next/link";
import ReviewActions from "./ReviewActions";
import { FaExternalLinkAlt, FaLightbulb, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Number of cards visible at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000, // Adjust speed here
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ReviewRecommend = ({ note }: { note: Page }) => {
  const router = useRouter();
  const actions: {
    name: string;
    icon: any;
    href: string;
    action?: any;
  }[] = [
    {
      name: "进入学习",
      icon: <FaLightbulb />,
      href: "/review/" + note.id,
    },
    {
      name: "修改卡片",
      icon: <FaPencilAlt />,
      href: "/review/" + note.id + "/edit",
      action: () => {
        router.push("/review/" + note.id + "/edit");
        router.refresh();
      },
    },
    { name: "查看原文", icon: <FaExternalLinkAlt />, href: "/note/" + note.id },
  ];

  const reviews = note!.reviews! as {
    string: [string, number];
  };

  const reviewArray: [string, [string, number]][] = Object.entries(reviews);

  return (
    <>
      <Text size="6" weight="bold">
        开始复习吧！
      </Text>
      <Card size="5" className="h-96" mt="5">
        <Flex gap="5" className="items-center">
          <Text size="8" weight="bold">
            {note.title}
          </Text>
          <Badge color="indigo" size="3">
            {reviewArray.length}个复习卡片
          </Badge>
        </Flex>

        <Grid columns="5" gap="4" mt="5">
          <div className="col-span-4 h-full">
            <Card size="5" className="h-64 shadow-blue-200 shadow-md">
              <Slider {...settings}>
                {reviewArray.map((review, index) => (
                  <div key={index} className="mb-14">
                    <Flex direction="column" gap="4">
                      <Text size="5" weight="bold">
                        {review[0]}
                      </Text>
                      <Text size="5">{review[1][0]}</Text>
                    </Flex>
                  </div>
                ))}
              </Slider>
            </Card>
          </div>
          <Flex className="col-span-1" direction="column" gap="4">
            <Flex>
              <Text
                size="6"
                weight="bold"
                color={note.reviewsCount! < 60 ? "red" : "green"}
              >
                {note.reviewsCount}
              </Text>
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
            {actions.map((action) => {
              return (
                <Button
                  size="4"
                  variant="surface"
                  key={action.name}
                  onClick={action.action}
                  color="indigo"
                >
                  <Link href={action.href}>
                    <Flex
                      justify="start"
                      className="w-full items-center"
                      gap="5"
                    >
                      {action.icon}
                      <Text size="5">{action.name}</Text>
                    </Flex>
                  </Link>
                </Button>
              );
            })}
          </Flex>
        </Grid>
      </Card>
    </>
  );
};
export default ReviewRecommend;
