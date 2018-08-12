import * as React from "react";
import { Transition } from "react-transition-group";
import { ISliderChildStyles, ISliderDirection } from "./types";

interface ITransitioningComponentProps {
  enter: any;
  classes: any;
  direction: ISliderDirection;
  appear: any;
  children: any;
  parentRef: HTMLDivElement | null;
  childStyles: ISliderChildStyles;
  hideOnLeave?: boolean;
  initialShowWidthPercentage?: number;
}

const TransitioningComponent = ({
  enter,
  classes,
  direction,
  appear,
  children,
  parentRef,
  childStyles,
  hideOnLeave,
  initialShowWidthPercentage
}: ITransitioningComponentProps) => {
  let carouselElemMargin = 0;
  if (parentRef && parentRef.parentElement) {
    carouselElemMargin =
      parentRef.parentElement.offsetWidth - childStyles.width;
  }
  let farDistance = childStyles.width + carouselElemMargin;
  if (hideOnLeave && initialShowWidthPercentage) {
    farDistance = childStyles.width * (1 - initialShowWidthPercentage / 100);
  }
  const wrapperStyleFarRight = `translate3d(${farDistance}px, 0, 0)`;
  const wrapperStyleFarLeft = `translate3d(-${farDistance}px, 0, 0)`;
  const wrapperStyleFCenter = "translate3d(0, 0, 0)";
  const carouselTransitionTime = childStyles.transition + "s";
  return (
    <Transition in={enter} timeout={1} appear={appear}>
      {state => {
        let wrapperStyles = {
          transform: wrapperStyleFarRight,
          transition: "0",
          opacity: 1
        };
        switch (state) {
          case "entering":
            wrapperStyles.transform =
              direction == ISliderDirection.MoveRight
                ? wrapperStyleFarLeft
                : wrapperStyleFarRight;
            wrapperStyles.transition = "0";
            wrapperStyles.opacity = hideOnLeave ? 0 : 1;
            break;
          case "entered":
            wrapperStyles.transform = wrapperStyleFCenter;
            wrapperStyles.transition = carouselTransitionTime;
            wrapperStyles.opacity = 1;
            break;
          case "exiting":
            wrapperStyles.transform = wrapperStyleFCenter;
            wrapperStyles.transition = "0";
            wrapperStyles.opacity = 1;
            break;
          case "exited":
            wrapperStyles.transform =
              direction == ISliderDirection.MoveRight
                ? wrapperStyleFarRight
                : wrapperStyleFarLeft;
            wrapperStyles.transition = carouselTransitionTime;
            wrapperStyles.opacity = hideOnLeave ? 0 : 1;
            break;
          default:
            throw new Error("Transition has no state");
        }
        return (
          <div
            className={classes.rtgWrapper}
            style={{ ...wrapperStyles, width: childStyles.width }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default TransitioningComponent;
