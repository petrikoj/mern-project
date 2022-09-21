import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "yellow.100",
      },
      fonts: {
        heading: `"Vollkorn", serif`,
        body: `"Montserrat", sans-serif`,
      },
    },
  },
});

export default theme;
