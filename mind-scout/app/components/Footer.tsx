import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FiFacebook, FiGithub, FiGlobe } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="border-t p-4 bg-base-200 mt-auto">
        <Flex align="center" justify="center" direction="column" gap="3">
          <NavIconsComponent />
          <p className="text-base text-gray-400 dark:text-gray-500">
            Copyright © {new Date().getFullYear()} Castamere
          </p>
        </Flex>
      </footer>
    </>
  );
};

const NavIcons = [
  { label: <FiGithub />, href: "https://github.com/Casta-mere/Mind-Scout" },
  {
    label: <FiFacebook />,
    href: "https://www.facebook.com/profile.php?id=100064520177692",
  },
  { label: <FiGlobe />, href: "http://dino.castamerego.com/" },
];

const NavIconsComponent = () => {
  return (
    <ul className="flex gap-6 items-center">
      {NavIcons.map((Icon) => (
        <li key={Icon.href}>
          <Link
            className="text-2xl text-zinc-500 hover:text-zinc-800 transaition-colors"
            href={Icon.href}
          >
            {Icon.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
