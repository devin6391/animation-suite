import * as React from "react";
import carouselStyle from "./styles";
import TransitioningComponent from './TransitioningComponent';
import injectSheet from 'react-jss';

interface ICarouselProps {
    watchProp: any;
    childProps: any;
    direction: any;
    classes: any;
    children: React.ReactElement<any>;
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

  static getDerivedStateFromProps(nextProps: ICarouselProps, prevState: ICarouselState) {
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
    const { direction, classes } = this.props;
    let clonedElems = [];
    nextWatchProp &&
      nextChildProps &&
      clonedElems.push(
        <TransitioningComponent
          enter={true}
          classes={classes}
          direction={direction}
          key={nextWatchProp}
          appear={true}
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
        >
          {React.cloneElement(this.props.children, prevChildProps)}
        </TransitioningComponent>
      );
    return clonedElems;
  };

  render() {
    return (
      <div className={this.props.classes.rtgList}>{this.getCLonedElems()}</div>
    );
  }
}

export default injectSheet(carouselStyle)(
  Carousel
);
