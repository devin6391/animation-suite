import { StyleSheet } from "react-jss";

export const appBarStyles: StyleSheet<any> = {
  root: {
    backgroundColor: "#bebebe",
    width: "100vw"
  }
};

export const carouselElemWidth = 345;
export const carouselElemMargin = 33;
const carouselPadding = 10;
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
    width: carouselElemWidth,
    overflowX: "hidden"
  },
  rightMove: {
    ...carouselArrowStyle
  },
  card: {
    maxWidth: carouselElemWidth,
    marginLeft: carouselElemMargin,
    marginRight: carouselElemMargin
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  itemList: {
    width: "auto",
    display: "flex",
    // transition: carouselTransitionTime,
    "& > div": {
      width: carouselElemWidth,
      paddingTop: carouselPadding,
      paddingBottom: carouselPadding
    }
  }
};
