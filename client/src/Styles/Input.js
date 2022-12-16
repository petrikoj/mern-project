import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);
const custom = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "blackAlpha.900",
    bgColor: "whiteAlpha.900",
    focusBorderColor: "red",
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { custom },
});
