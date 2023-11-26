import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  handleNavigationForward: () => void;
  handleNavigationBackward: () => void;
  // must be multiple of itemsPerPage
  currentIndex: number;
}

function Pagination({
  totalItems,
  itemsPerPage,
  handleNavigationForward,
  handleNavigationBackward,
  currentIndex,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.ceil(currentIndex / itemsPerPage) + 1;

  return (
    <>
      <HStack justifyContent="center">
        <Button
          role="button"
          data-testid="btn-left-nav"
          colorScheme="teal"
          variant="solid"
          onClick={handleNavigationForward}
          isDisabled={currentPage === 1}
        >
          <ArrowLeftIcon />
        </Button>

        <Box>
          Page {currentPage} out of {totalPages}
        </Box>

        <Button
          role="button"
          data-testid="btn-right-nav"
          colorScheme="teal"
          variant="solid"
          onClick={handleNavigationBackward}
          isDisabled={currentPage === totalPages}
        >
          <ArrowRightIcon />
        </Button>
      </HStack>
    </>
  );
}

export default Pagination;
