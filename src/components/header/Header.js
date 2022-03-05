import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { LangSwitch, NavMenu } from "../menu";

function Header(props) {
  const { t, lang } = useTranslation("common");
  const [display, setDisplay] = useState("none");
  const router = useRouter();

  // hiding the menu after navigation
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setDisplay("none");
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setDisplay("none");
      });
    };
  }, []);

  const toggleMenu = () => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };

  return (
    <>
      <Flex
        shrink={0}
        bg="green.50"
        h={12}
        align="center"
        display={{ base: "none", md: "flex", lg: "flex" }}
      >
        <Container maxW="container.xl">
          <Flex align="center">
            <Box mr="auto">
              <NavMenu t={t} />
            </Box>
            <Link
              isExternal
              mr={6}
              href="https://github.com/hnquyen/next-redux-wrapper"
            >
              <FaGithub size={22} color="#4A5568" />
            </Link>
            <Box mr={4}>
              <LangSwitch lang={lang} />
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Flex
        shrink={0}
        bg="green.50"
        h={12}
        align="center"
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          colorScheme="green"
          size="sm"
          ml={2}
          aria-label="Open Menu"
          icon={display === "none" ? <HamburgerIcon /> : <CloseIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={toggleMenu}
        />
      </Flex>
      <Flex
        shrink={0}
        position="absolute"
        w={250}
        h="100vh"
        bg="green.50"
        direction="column"
        display={{ base: display, md: "none" }}
        zIndex={20}
      >
        <NavMenu t={t} />
      </Flex>
    </>
  );
}

export default Header;
