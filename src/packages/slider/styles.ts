import { StyleSheet } from "react-jss";

export const carouselElemWidth = 345;
export const carouselElemMargin = 33;
const carouselTransitionTime = "0.3s";
const carouselPadding = 10;

const carouselStyle: StyleSheet<any> = {
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

export default carouselStyle;
