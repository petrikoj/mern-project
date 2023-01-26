import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Heading from "./Heading";
import { inputTheme } from "./Input";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        bg: "yellow.50",
        color: "blackAlpha.900",
        letterSpacing: "wide",
        wordSpacing: "0.15rem",
      },
      fonts: {
        heading: `"Vollkorn", serif`,
        body: `"Montserrat", sans-serif`,
      },
    },
  },
  components: {
    Button,
    Input: inputTheme,
    Heading,
  },
});

export default theme;
