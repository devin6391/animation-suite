import * as React from "react";
import carouselStyle from "./styles";
import injectSheet from "react-jss";
import TransitioningComponent from "./TransitioningComponent";

interface ICarouselProps {
  watchProp: any;
  childProps: any;
  direction: any;
  classes: any;
  children: JSX.Element;
  carouselElemWidth: number;
  carouselElemHeight: number;
  transitionTime: number;
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
      carouselElemWidth,
      transitionTime
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
          appear={!!prevWatchProp}
          carouselElemWidth={carouselElemWidth}
          parentRef={this.selfRef}
          transitionTime={transitionTime}
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
          carouselElemWidth={carouselElemWidth}
          parentRef={this.selfRef}
          transitionTime={transitionTime}
        >
          {React.cloneElement(this.props.children, prevChildProps)}
        </TransitioningComponent>
      );
    return clonedElems;
  };

  render() {
    const { carouselElemWidth, carouselElemHeight } = this.props;
    return (
      <div
        ref={elem => (this.selfRef = elem)}
        className={this.props.classes.rtgList}
        style={{
          width: carouselElemWidth,
          height: carouselElemHeight
        }}
      >
        {this.getCLonedElems()}
      </div>
    );
  }
}

export default injectSheet(carouselStyle)(Carousel);
