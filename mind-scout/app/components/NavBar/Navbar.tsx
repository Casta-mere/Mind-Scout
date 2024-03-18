"use client";
import { Skeleton } from "@/app/components";
import { Avatar, Badge, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Flex align="center" justify="between">
        <NavLinksComponent />
        <LoginComponent />
      </Flex>
    </nav>
  );
};

export default NavBar;

const navLinks = [
  { label: <RiDashboardFill />, href: "/" },
  { label: "Work Space", href: "/note" },
  { label: "Community", href: "/community" },
];

const NavLinksComponent = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-6 items-center">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              " font-bold hover:text-zinc-800 transaition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const loginDropdownLinks: { label: string; href: string; badge?: string }[] = [
  { label: "Profile", href: "/profile", badge: "beta" },
  { label: "Settings", href: "/settings" },
  { label: "Sign Out", href: "/api/auth/signout" },
];

const LoginComponent = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" height="1.75rem" />;
  if (status === "unauthenticated")
    return (
      <Link
        className="text-zinc-500 hover:text-zinc-800 transaition-colors"
        href="/api/auth/signin"
      >
        Sign In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>

          {loginDropdownLinks.map((link) => (
            <DropdownMenu.Item key={link.label}>
              <Link href={link.href}>{link.label}</Link>
              {link.badge && <Badge color="gray">{link.badge}</Badge>}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
