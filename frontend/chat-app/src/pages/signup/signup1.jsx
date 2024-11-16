import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <FormControl>
      <Box pos="relative" w="full">
        <Input className="peer" placeholder="Enter your email" />
        <FormLabel css={floatingStyles}>Email</FormLabel>
      </Box>
    </FormControl>
  );
};

const floatingStyles = {
  position: "absolute",
  background: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
};


export default SignUp