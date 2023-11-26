import Head from "next/head";
import { useRouter } from "next/router";
import { Project } from "@/utils/types";
import useSWR, { Fetcher } from "swr";
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
  Select,
  HStack,
} from "@chakra-ui/react";
import Header from "@/components/Layout/Header";
import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";

const fetcher: Fetcher<Project, string> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function ProjectPage() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [feedsPerPage, setFeedsPerPage] = useState<number>(10);
  const router = useRouter();
  const projectName = (router.query.name as string) || "";

  // TODO: implement the logic to return 404 if the user tries to navigate to a project that is not part of the project lists

  const { data: project, isLoading } = useSWR<Project>(
    `/api/projects/${projectName}`,
    fetcher
  );

  const displayName =
    projectName.charAt(0).toUpperCase() + projectName.slice(1);

  const feeds = project?.feeds
    ? project?.feeds.slice(startIndex, startIndex + feedsPerPage)
    : [];
  console.log("--- feeds array: ", feeds);

  useEffect(() => {}, [feedsPerPage]);

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
              <Text>Total feeds: {project?.feeds.length}</Text>
              <HStack width={400}>
                <Text>Feeds per page </Text>
                <Select
                  placeholder="Feeds per page"
                  id="itemsPerPage"
                  defaultValue={10}
                  width={70}
                  onChange={(e) => {
                    setFeedsPerPage(Number(e.target.value));
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </Select>
              </HStack>
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
                        <Th>No.</Th>
                        <Th>Device ID</Th>
                        <Th>Time</Th>
                        <Th isNumeric>GPS Latitude</Th>
                        <Th isNumeric>GPS Longitude</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {feeds.map((feed, index) => (
                        <Tr key={index}>
                          <Td>
                            {project?.feeds.findIndex(
                              (f) => f.device_id === feed.device_id
                            )}
                          </Td>
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
              {project?.feeds.length && (
                <Pagination
                  totalItems={project?.feeds.length}
                  itemsPerPage={feedsPerPage}
                  handleNavigationForward={() =>
                    setStartIndex((index) => index - feedsPerPage)
                  }
                  handleNavigationBackward={() =>
                    setStartIndex((index) => index + feedsPerPage)
                  }
                  currentIndex={startIndex}
                />
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
