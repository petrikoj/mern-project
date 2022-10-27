import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        bg: "yellow.100",
        color: "blackAlpha.900",
        letterSpacing: "wide",
      },
      fonts: {
        heading: `"Vollkorn", serif`,
        body: `"Montserrat", sans-serif`,
      },
    },
    components: {
      Button: {
        baseStyle: { bg: "red.100", fontWeight: "bold", color: "red" },
      },
    },
  },
});

export default theme;
