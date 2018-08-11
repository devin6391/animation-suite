import * as React from "react";
import { Transition } from "react-transition-group";

interface ITransitioningComponentProps {
  enter: any;
  classes: any;
  direction: any;
  appear: any;
  children: any;
  carouselElemWidth: number;
  parentRef: HTMLDivElement | null;
  transitionTime: number;
}

const TransitioningComponent = ({
  enter,
  classes,
  direction,
  appear,
  children,
  carouselElemWidth,
  parentRef,
  transitionTime
}: ITransitioningComponentProps) => {
  let carouselElemMargin = 0;
  if (parentRef && parentRef.parentElement) {
    carouselElemMargin =
      parentRef.parentElement.offsetWidth - carouselElemWidth;
  }
  return (
    <Transition in={enter} timeout={1} appear={appear}>
      {state => {
        const wrapperStyleFarRight = `translate3d(${carouselElemWidth +
          carouselElemMargin}px, 0, 0)`;
        const wrapperStyleFarLeft = `translate3d(-${carouselElemWidth +
          carouselElemMargin}px, 0, 0)`;
        const wrapperStyleFCenter = "translate3d(0, 0, 0)";
        const carouselTransitionTime = transitionTime + "s";

        let wrapperStyles = {
          transform: wrapperStyleFarRight,
          transition: "0"
        };
        switch (state) {
          case "entering":
            wrapperStyles.transform = !!direction
              ? wrapperStyleFarLeft
              : wrapperStyleFarRight;
            wrapperStyles.transition = "0";
            break;
          case "entered":
            wrapperStyles.transform = wrapperStyleFCenter;
            wrapperStyles.transition = carouselTransitionTime;
            break;
          case "exiting":
            wrapperStyles.transform = wrapperStyleFCenter;
            wrapperStyles.transition = "0";
            break;
          case "exited":
            wrapperStyles.transform = !!direction
              ? wrapperStyleFarRight
              : wrapperStyleFarLeft;
            wrapperStyles.transition = carouselTransitionTime;
            break;
          default:
            throw new Error("Transition has no state");
        }
        return (
          <div
            className={classes.rtgWrapper}
            style={{ ...wrapperStyles, width: carouselElemWidth }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default TransitioningComponent;
