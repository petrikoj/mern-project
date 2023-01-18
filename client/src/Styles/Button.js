import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base",
    boxShadow: "2px 2px black",
  },
  sizes: {
    md: {
      fontSize: "sm",
      px: 4,
      py: 2,
    },
    lg: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    solid: {
      bg: "pink.200",
      color: "blackAlpha.900",
      border: "2px solid",
      borderColor: "black",
      letterSpacing: "wide",
    },
  },
  // Default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

export default Button;
