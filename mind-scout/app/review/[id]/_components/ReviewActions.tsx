"use client";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaExternalLinkAlt, FaLightbulb, FaPencilAlt } from "react-icons/fa";

const ReviewActions = ({ noteId }: { noteId: string }) => {
  const router = useRouter();
  const actions: {
    name: string;
    icon: any;
    href: string;
    action?: any;
  }[] = [
    {
      name: "学习",
      icon: <FaLightbulb />,
      href: "/review/" + noteId,
      action: () => window.location.reload(),
    },
    {
      name: "修改卡片",
      icon: <FaPencilAlt />,
      href: "/review/" + noteId + "/edit",
      action: () => {
        router.push("/review/" + noteId + "/edit");
        router.refresh();
      },
    },
    { name: "查看原文", icon: <FaExternalLinkAlt />, href: "/note/" + noteId },
  ];

  return (
    <Grid columns="4" gap="5">
      {actions.map((action) => {
        return (
          <Button
            size="4"
            variant="surface"
            key={action.name}
            onClick={action.action}
          >
            <Link href={action.href}>
              <Flex justify="start" className="w-full items-center" gap="5">
                {action.icon}
                <Text size="5">{action.name}</Text>
              </Flex>
            </Link>
          </Button>
        );
      })}
    </Grid>
  );
};

export default ReviewActions;
