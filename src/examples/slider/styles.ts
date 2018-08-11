import { StyleSheet } from 'react-jss';

export const appBarStyles: StyleSheet<any> = {
    root: {
      backgroundColor: '#bebebe',
      width: "100vw"
    }
  };
  
  export const carouselElemWidth = 345;
  export const carouselElemMargin = 33;
  const carouselTransitionTime = "0.3s";
  const carouselPadding = 10;
  const carouselArrowStyle = {
    flex: 1,
    display: "flex",
    backgroundColor: '#949494',
    cursor: "pointer",
    "& > svg": {
      margin: "auto"
    },
    "&:hover": {
      backgroundColor: '#7d7d7d'
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
    },
    rtgList: {
      width: carouselElemWidth,
      display: "flex",
      position: "relative",
      height: carouselElemWidth - 65
    },
    rtgWrapper: {
      position: "absolute",
      top: carouselPadding,
      bottom: carouselPadding,
      left: 0,
      right: 0,
      width: carouselElemWidth
    },
    rtgFarRight: {
      transform: `translate3d(${carouselElemWidth + carouselElemMargin}px, 0, 0)`
    },
    rtgFarLeft: {
      transform: `translate3d(-${carouselElemWidth + carouselElemMargin}px, 0, 0)`
    },
    rtgCenter: {
      transform: `translate3d(${carouselElemMargin}px, 0, 0)`
    },
    rtgWithTransition: {
      transition: carouselTransitionTime
    }
  };
  