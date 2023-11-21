import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <header>
      {/* TODO: depending on the purpose of this image, we might want to consider changing this to be a <Image/> accessible  */}
      <Box
        backgroundImage="url('../Banner-test.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        minHeight={300}
      >
        <Heading as="h1">Welcome to PM25 projects</Heading>
      </Box>
    </header>
  );
}
