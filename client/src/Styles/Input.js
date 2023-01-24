import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);
const custom = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "blackAlpha.900",
    bgColor: "whiteAlpha.900",
    _focus: { borderColor: "blue.200" },
    _invalid: { borderColor: "red.300" },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { custom },
});
