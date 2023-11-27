import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import {
  Container,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
  Box,
} from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ErrorAPI } from "@/utils/types";

// TODO: handle error case
export default function ProjectsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [projects, setProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setProjects(data.split("\n").filter((p) => p != ""));
      setIsLoading(false);
    }
  }, [data]);

  if (error) {
    return <div>Oops, something went wrong when fetching the projects </div>;
  }

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
          <Container>
            <Heading as="h2" pt={6} pb={6}>
              Projects list
            </Heading>

            {isLoading ? (
              <Box>
                <Spinner />
                Loading...
              </Box>
            ) : (
              <UnorderedList>
                {projects &&
                  projects.map((project, index) => (
                    <ListItem key={index}>
                      <Link
                        data-testid={project}
                        href={{
                          pathname: "/projects/[name]",
                          query: { name: project },
                        }}
                      >
                        {project
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (firstLetter: string) =>
                            firstLetter.toUpperCase()
                          )}
                      </Link>
                    </ListItem>
                  ))}
              </UnorderedList>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}

// https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist#caching
export const getServerSideProps = (async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const res = await fetch("https://pm25.lass-net.org/API-1.0.0/project/all/");
  const status = await res.status;

  if (status === 200) {
    const data = await res.text();
    return { props: { data } };
  } else {
    return { props: { error: { code: status } } };
  }
}) satisfies GetServerSideProps<
  | {
      data?: string | undefined;
    }
  | ErrorAPI
>;
