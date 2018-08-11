import * as React from "react";
import injectSheet from "react-jss";
import KeyboardLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SingleElement from "./SingleElement";
import Slider from "../../packages/slider";
import { carouselComponentStyles } from "./styles";
import { CarouselData } from "./AppBar";

interface SliderWithAnimationProps {
  dataArr: CarouselData[];
  classes: any;
}

interface SliderWithAnimationStates {
  currIndex: number;
  prevIndex: number;
  appearDirty: boolean;
  direction: number;
}

class SliderWithAnimation extends React.Component<
  SliderWithAnimationProps,
  SliderWithAnimationStates
> {
  state = {
    currIndex: 0,
    prevIndex: 0,
    appearDirty: false,
    direction: 0 // 0 for left and 1 for right
  };

  componentDidMount() {
    this.setState({ prevIndex: this.props.dataArr.length - 1 });
  }

  slideLeftClick = () => {
    let { currIndex } = this.state;
    let prevIndex = currIndex;
    if (currIndex > 0) {
      currIndex--;
    } else if (currIndex === 0) {
      currIndex = this.props.dataArr.length - 1;
    } else {
      throw Error(`Current Index of element can't go below 0`);
    }
    this.setState({ currIndex, prevIndex, direction: 1, appearDirty: true });
  };

  slideRightClick = () => {
    let { currIndex } = this.state;
    let prevIndex = currIndex;
    let maxIndex = this.props.dataArr.length - 1;
    if (currIndex < maxIndex) {
      currIndex++;
    } else if (currIndex === maxIndex) {
      currIndex = 0;
    } else {
      throw Error(`Current Index of element can't go beyond ${maxIndex}`);
    }
    this.setState({ currIndex, prevIndex, direction: 0, appearDirty: true });
  };

  render() {
    const { classes, dataArr } = this.props;
    const { direction, currIndex } = this.state;
    const currData = dataArr[currIndex];
    const carouselCompProps = {
      imageUrl: currData.imageUrl,
      title: currData.title,
      text: currData.text,
      classes: classes
    };
    return (
      <div className={classes.root}>
        <div className={classes.leftMove} onClick={this.slideLeftClick}>
          <KeyboardLeftIcon />
        </div>
        <div className={classes.carouselContainer}>
          <Slider
            watchProp={currData.id}
            direction={direction}
            childProps={carouselCompProps}
            classes={null}
          >
            <SingleElement {...carouselCompProps} />
          </Slider>
        </div>
        <div className={classes.rightMove} onClick={this.slideRightClick}>
          <KeyboardRightIcon />
        </div>
      </div>
    );
  }
}

export default injectSheet(carouselComponentStyles)(SliderWithAnimation);
