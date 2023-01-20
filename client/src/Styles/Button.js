import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base",
    boxShadow: "2px 2px",
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
      bg: "blue.200",
      color: "blackAlpha.900",
      border: "2px solid",
      borderColor: "blackAlpha.900",
      letterSpacing: "wide",
      _hover: {
        bg: "cyan.200",
        //PRIDE FLAG GRADIENT
        /*  bgGradient:
          "linear(to-b, red.400, orange.300, yellow.200, green.500, blue.500, purple.600)", */
      },
    },
  },
  // Default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

export default Button;
