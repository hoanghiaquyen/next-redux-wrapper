import { Container, Flex } from "@chakra-ui/react";
import Header from "../components/header/Header";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Footer from "../components/footer/Footer";

function Layout(props) {
  const { t } = useTranslation("common");
  const { children, title } = props;
  return (
    <>
      <Head>
        <title>{t(title)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Flex direction="column" h="100vh">
        <Header />
        <Container maxW="container.xl" mb="auto">
          <main>{children}</main>
        </Container>
        <Footer />
      </Flex>
    </>
  );
}

export default Layout;
