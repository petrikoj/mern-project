import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <IconButton
      icon={<ChevronUpIcon />}
      onClick={scrollToTop}
      display={visible ? "inline" : "none"}
      position="fixed"
      width="14"
      ml="1"
      variant="solid"
      shadow="base"
      bottom="20"
      fontSize="3xl"
      zIndex="1"
      cursor="pointer"
      color="blackAlpha.900"
      bgColor="red.200"
      opacity="0.65"
    />
  );
};

export { ScrollToTopButton };
