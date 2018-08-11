import { StyleSheet } from "react-jss";

export const appBarStyles: StyleSheet<any> = {
  root: {
    backgroundColor: "#bebebe",
    width: "100vw"
  }
};

const carouselArrowStyle = {
  flex: 1,
  display: "flex",
  backgroundColor: "#949494",
  cursor: "pointer",
  "& > svg": {
    margin: "auto"
  },
  "&:hover": {
    backgroundColor: "#7d7d7d"
  }
};

export const carouselComponentStyles: StyleSheet<any> = {
  root: {
    width: 500,
    display: "flex"
  },
  leftMove: {
    ...carouselArrowStyle
  },
  carouselContainer: {
    flex: 6,
    display: "flex",
    overflowX: "hidden"
  },
  rightMove: {
    ...carouselArrowStyle
  }
};
