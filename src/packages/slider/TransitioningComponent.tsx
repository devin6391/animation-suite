import * as React from "react";
import { Transition } from "react-transition-group";
import {
  ISliderChildStyles,
  ISliderDirection,
  TransitionStateTypes,
  IWrapperStyles
} from "./types";

interface ITransitioningComponentProps {
  enter: any;
  classes: any;
  direction: ISliderDirection;
  appear: any;
  children: any;
  parentRef: HTMLDivElement | null;
  childStyles: ISliderChildStyles;
  fadeOnSlide?: boolean;
  sizePercentageDuringSLide?: number;
  timeout: number;
}

export default class TransitioningComponent extends React.Component<
  ITransitioningComponentProps
> {
  private get sliderHorizontalMargin(): number {
    let { parentRef, childStyles } = this.props;
    let carouselElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      carouselElemMargin =
        parentRef.parentElement.offsetWidth - childStyles.width;
    }
    return carouselElemMargin;
  }

  private get sliderVerticalMargin(): number {
    let { parentRef, childStyles } = this.props;
    let carouselElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      carouselElemMargin =
        parentRef.parentElement.offsetHeight - childStyles.height;
    }
    return carouselElemMargin;
  }

  private get horizontalFarDistance(): number {
    let { sizePercentageDuringSLide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.width + this.sliderHorizontalMargin;
    if (fadeOnSlide && sizePercentageDuringSLide) {
      farDistance = childStyles.width * (1 - sizePercentageDuringSLide / 100);
    }
    return farDistance;
  }

  private get verticalFarDistance(): number {
    let { sizePercentageDuringSLide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.height + this.sliderVerticalMargin;
    if (fadeOnSlide && sizePercentageDuringSLide) {
      farDistance = childStyles.height * (1 - sizePercentageDuringSLide / 100);
    }
    return farDistance;
  }

  private get wrapperStyleFarRight(): string {
    return `translate3d(${this.horizontalFarDistance}px, 0, 0)`;
  }
  private get wrapperStyleFarLeft(): string {
    return `translate3d(-${this.horizontalFarDistance}px, 0, 0)`;
  }
  private get wrapperStyleFarUp(): string {
    return `translate3d(0, -${this.verticalFarDistance}px, 0)`;
  }
  private get wrapperStyleFarDown(): string {
    return `translate3d(0, ${this.verticalFarDistance}px, 0)`;
  }
  private get wrapperTransformCenter(): string {
    return "translate3d(0, 0, 0)";
  }
  private get carouselTransitionExitTime(): string {
    let { transitionTime, exitTransitionTime } = this.props.childStyles;
    const time = exitTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either exitTransitionTime or transitionTime should be present as props"
      );
    }
    return time + "s";
  }
  private get carouselTransitionEnterTime(): string {
    let { transitionTime, enterTransitionTime } = this.props.childStyles;
    const time = enterTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either enterTransitionTime or transitionTime should be present as props"
      );
    }
    return time + "s";
  }

  private get carouselEnterTimingFunction(): string {
    let { timingFunction, enterTimingFunction } = this.props.childStyles;
    return enterTimingFunction || timingFunction || "linear";
  }

  private get carouselExitTimingFunction(): string {
    let { timingFunction, exitTimingFunction } = this.props.childStyles;
    return exitTimingFunction || timingFunction || "linear";
  }

  private get enteringTransform(): string {
    let { direction } = this.props;
    switch (direction) {
      case ISliderDirection.MoveRight:
        return this.wrapperStyleFarLeft;
      case ISliderDirection.MoveLeft:
        return this.wrapperStyleFarRight;
      case ISliderDirection.MoveUp:
        return this.wrapperStyleFarDown;
      case ISliderDirection.MoveDown:
        return this.wrapperStyleFarUp;
      default:
        throw new Error("No direction present");
    }
  }

  private get exitingTransform(): string {
    let { direction } = this.props;
    switch (direction) {
      case ISliderDirection.MoveRight:
        return this.wrapperStyleFarRight;
      case ISliderDirection.MoveLeft:
        return this.wrapperStyleFarLeft;
      case ISliderDirection.MoveUp:
        return this.wrapperStyleFarUp;
      case ISliderDirection.MoveDown:
        return this.wrapperStyleFarDown;
      default:
        throw new Error("No direction present");
    }
  }

  private getWrapperStyles(
    transform: string,
    transition: string,
    opacity: number,
    transitionTimingFunction?: string
  ): IWrapperStyles {
    return { transform, transition, opacity, transitionTimingFunction };
  }

  render() {
    let {
      enter,
      classes,
      appear,
      children,
      childStyles,
      fadeOnSlide,
      timeout
    } = this.props;

    const wrapperTransformCenter = this.wrapperTransformCenter;
    const carouselTransitionExitTime = this.carouselTransitionExitTime;
    const carouselTransitionEnterTime = this.carouselTransitionEnterTime;
    const enteringTransform = this.enteringTransform;
    const exitingTransform = this.exitingTransform;
    const carouselEnterTimingFunction = this.carouselEnterTimingFunction;
    const carouselExitTimingFunction = this.carouselExitTimingFunction;

    return (
      <Transition in={enter} timeout={timeout} appear={appear}>
        {(state: TransitionStateTypes) => {
          let wrapperStyles: IWrapperStyles;
          switch (state) {
            case "entering":
              wrapperStyles = this.getWrapperStyles(
                enteringTransform,
                "0",
                fadeOnSlide ? 0 : 1
              );
              break;
            case "entered":
              wrapperStyles = this.getWrapperStyles(
                wrapperTransformCenter,
                carouselTransitionEnterTime,
                1,
                carouselEnterTimingFunction
              );
              break;
            case "exiting":
              wrapperStyles = this.getWrapperStyles(
                wrapperTransformCenter,
                "0",
                1
              );
              break;
            case "exited":
              wrapperStyles = this.getWrapperStyles(
                exitingTransform,
                carouselTransitionExitTime,
                fadeOnSlide ? 0 : 1,
                carouselExitTimingFunction
              );
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
  }
}
