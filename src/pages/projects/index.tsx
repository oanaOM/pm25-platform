import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
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

const fetcher: Fetcher<string, string> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function ProjectsPage() {
  const [projects, setProjects] = useState<string[]>([]);
  const { data, error, isLoading } = useSWR<string>("/api/projects", fetcher);

  useEffect(() => {
    if (data) {
      setProjects(data.split("\n").filter((p) => p != ""));
    }
  }, [data]);

  const router = useRouter();

  // TODO: handle errors in a better way
  if (error) {
    router.push("/error");
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
                        {/* TODO: extract this to a separate function to make it more readable and reusable */}
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
