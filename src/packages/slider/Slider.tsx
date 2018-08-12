import * as React from "react";
import carouselStyle from "./styles";
import injectSheet from "react-jss";
import TransitioningComponent from "./TransitioningComponent";
import { ISliderChildStyles, ISliderDirection } from "./types";

interface ICarouselProps {
  watchProp: any;
  childProps: any;
  direction: ISliderDirection;
  classes: any;
  children: JSX.Element;
  childStyles: ISliderChildStyles;
  slideOnAppear?: boolean;
  fadeOnSlide?: boolean;
  sizePercentageDuringSLide?: number;
}

interface ICarouselState {
  prevWatchProp: any;
  prevChildProps: any;
  nextWatchProp: any;
  nextChildProps: any;
}

class Carousel extends React.Component<ICarouselProps, ICarouselState> {
  constructor(props: ICarouselProps) {
    super(props);
    this.state = {
      prevWatchProp: null,
      prevChildProps: null,
      nextWatchProp: null,
      nextChildProps: null
    };
  }

  private selfRef: HTMLDivElement | null;

  static getDerivedStateFromProps(
    nextProps: ICarouselProps,
    prevState: ICarouselState
  ) {
    return {
      prevWatchProp: prevState.nextWatchProp,
      prevChildProps: prevState.nextChildProps,
      nextWatchProp: nextProps.watchProp,
      nextChildProps: nextProps.childProps
    };
  }

  getCLonedElems = () => {
    const {
      prevWatchProp,
      prevChildProps,
      nextWatchProp,
      nextChildProps
    } = this.state;
    const {
      direction,
      classes,
      childStyles,
      slideOnAppear,
      fadeOnSlide,
      sizePercentageDuringSLide
    } = this.props;
    let clonedElems = [];
    nextWatchProp &&
      nextChildProps &&
      clonedElems.push(
        <TransitioningComponent
          enter={true}
          classes={classes}
          direction={direction}
          key={nextWatchProp}
          appear={slideOnAppear || !!prevWatchProp}
          parentRef={this.selfRef}
          childStyles={childStyles}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSLide={sizePercentageDuringSLide}
          timeout={1}
        >
          {React.cloneElement(this.props.children, nextChildProps)}
        </TransitioningComponent>
      );
    prevWatchProp &&
      prevWatchProp !== nextWatchProp &&
      prevChildProps &&
      clonedElems.push(
        <TransitioningComponent
          enter={false}
          classes={classes}
          direction={direction}
          key={prevWatchProp}
          appear={true}
          parentRef={this.selfRef}
          childStyles={childStyles}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSLide={sizePercentageDuringSLide}
          timeout={1}
        >
          {React.cloneElement(this.props.children, prevChildProps)}
        </TransitioningComponent>
      );
    return clonedElems;
  };

  render() {
    const { width, height } = this.props.childStyles;
    return (
      <div
        ref={elem => (this.selfRef = elem)}
        className={this.props.classes.rtgList}
        style={{
          width,
          height
        }}
      >
        {this.getCLonedElems()}
      </div>
    );
  }
}

export default injectSheet(carouselStyle)(Carousel);
