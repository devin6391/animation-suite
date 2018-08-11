import * as React from "react";
import injectSheet from "react-jss";
import KeyboardLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SingleElement from "./SingleElement";
import { carouselComponentStyles } from "./styles";
import { CarouselData } from "./AppBar";

interface SliderWithoutAnimationProps {
  dataArr: CarouselData[];
  classes: any;
}

interface SliderWithoutAnimationStates {
  currIndex: number;
}

class SliderWithoutAnimation extends React.Component<
  SliderWithoutAnimationProps,
  SliderWithoutAnimationStates
> {
  state = {
    currIndex: 0
  };

  slideLeftClick = () => {
    let { currIndex } = this.state;
    let maxIndex = this.props.dataArr.length - 1;
    if (currIndex > 0) {
      currIndex--;
    } else if (currIndex === 0) {
      currIndex = maxIndex;
    } else {
      throw Error(`Current Index of element can't go below 0`);
    }
    this.setState({ currIndex });
  };

  slideRightClick = () => {
    let { currIndex } = this.state;
    let maxIndex = this.props.dataArr.length - 1;
    if (currIndex < maxIndex) {
      currIndex++;
    } else if (currIndex === maxIndex) {
      currIndex = 0;
    } else {
      throw Error(`Current Index of element can't go beyond ${maxIndex}`);
    }
    this.setState({ currIndex });
  };

  render() {
    const { classes, dataArr } = this.props;
    const data = dataArr[this.state.currIndex];
    return (
      <div className={classes.root}>
        <div className={classes.leftMove} onClick={this.slideLeftClick}>
          <KeyboardLeftIcon />
        </div>
        <div className={classes.carouselContainer}>
          <SingleElement
            imageUrl={data.imageUrl}
            title={data.title}
            text={data.text}
            classes={null}
          />
        </div>
        <div className={classes.rightMove} onClick={this.slideRightClick}>
          <KeyboardRightIcon />
        </div>
      </div>
    );
  }
}

export default injectSheet(carouselComponentStyles)(SliderWithoutAnimation);
