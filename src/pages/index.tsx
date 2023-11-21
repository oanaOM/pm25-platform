import Head from "next/head";
import Header from "@/components/Layout/Header";
import { Container, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>PM25 Projects</title>
        <meta name="description" content="PM25 Projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />

        <section>
          <Container mt="20px" textAlign="center">
            <Link
              as={NextLink}
              size="md"
              width="300px"
              href="/projects"
              fontSize="1rem"
            >
              See projects <ArrowForwardIcon boxSize={4} />
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
