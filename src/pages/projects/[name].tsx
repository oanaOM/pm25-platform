import Head from "next/head";
import { ErrorAPI, Project } from "@/utils/types";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Spinner,
  Box,
  Link,
  Text,
  Stack,
} from "@chakra-ui/react";
import Header from "@/components/Layout/Header";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";

// TODO: handle error case
export default function ProjectPage({
  data,
  projectName = "",
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [project, setProject] = useState<Project>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setProject(data);
      setIsLoading(false);
    }
  }, [data]);

  const displayName =
    projectName.charAt(0).toUpperCase() + projectName.slice(1);

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
          <Box pl={14} pr={14}>
            <Stack spacing="18px">
              <Heading as="h2" pt={6} pb={6}>
                {displayName && `Project ${displayName}`}
              </Heading>
              <Text>Source: {project?.source}</Text>
              <Text>Version: {project?.version}</Text>
              <Text>23 feeds </Text>
              {isLoading ? (
                <Box>
                  <Spinner />
                  Loading...
                </Box>
              ) : project?.feeds.length === 0 ? (
                <div>No feeds found</div>
              ) : (
                <TableContainer>
                  <Table
                    variant="striped"
                    colorScheme="gray"
                    data-testid="feeds"
                  >
                    <TableCaption>PM25 Open Data</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Device ID</Th>
                        <Th>Time</Th>
                        <Th isNumeric>GPS Latitude</Th>
                        <Th isNumeric>GPS Longitude</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {project?.feeds &&
                        project?.feeds.slice(0, 10).map((feed, index) => (
                          <Tr key={index}>
                            <Td>{feed.device_id || "-"}</Td>
                            <Td>{feed.time || "-"}</Td>
                            <Td textAlign="right">{feed.gps_lat || "-"}</Td>
                            <Td textAlign="right">{feed.gps_lon || "-"}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
              <Box mb={10}>
                <Link as={NextLink} size="md" width="300px" href="/projects">
                  <ArrowBackIcon boxSize={4} /> Go back to the list of projects
                </Link>
              </Box>
            </Stack>
          </Box>
        </section>
      </main>
    </>
  );
}
export const getServerSideProps = (async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const name = context.query.name as string;

  const res = await fetch(
    `https://pm25.lass-net.org/API-1.0.0/project/${name}/latest/`
  );
  const status = await res.status;

  if (status === 200) {
    const data = await res.json();
    return { props: { data, projectName: name } };
  } else {
    return { props: { error: { code: status } } };
  }
}) satisfies GetServerSideProps<
  | {
      data?: Project;
      projectName?: string;
    }
  | ErrorAPI
>;
