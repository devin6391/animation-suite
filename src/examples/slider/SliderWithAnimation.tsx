import * as React from "react";
import injectSheet from "react-jss";
import KeyboardLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SingleElement from "./SingleElement";
import Slider, {
  ISliderChildStyles,
  ISliderDirection
} from "../../packages/slider";
import { carouselComponentStyles } from "./styles";
import { CarouselData } from "./AppBar";
import { carouselElemWidth, carouselElemHeight } from "./singleElemStyles";

interface SliderWithAnimationProps {
  dataArr: CarouselData[];
  classes: any;
}

interface SliderWithAnimationStates {
  selectedIndex: number;
  direction: ISliderDirection;
}

class SliderWithAnimation extends React.Component<
  SliderWithAnimationProps,
  SliderWithAnimationStates
> {
  state = {
    selectedIndex: 0,
    direction: ISliderDirection.MoveLeft
  };

  private slideLeftClick = () => {
    let { selectedIndex } = this.state;
    if (selectedIndex > 0) {
      selectedIndex--;
    } else if (selectedIndex === 0) {
      selectedIndex = this.props.dataArr.length - 1;
    } else {
      throw Error(`Current Index of element can't go below 0`);
    }
    this.setState({
      selectedIndex,
      direction: ISliderDirection.MoveRight
    });
  };

  private slideRightClick = () => {
    let { selectedIndex } = this.state;
    let maxIndex = this.props.dataArr.length - 1;
    if (selectedIndex < maxIndex) {
      selectedIndex++;
    } else if (selectedIndex === maxIndex) {
      selectedIndex = 0;
    } else {
      throw Error(`Current Index of element can't go beyond ${maxIndex}`);
    }
    this.setState({
      selectedIndex,
      direction: ISliderDirection.MoveLeft
    });
  };

  render() {
    const { classes, dataArr } = this.props;
    const { direction, selectedIndex } = this.state;
    const currData = dataArr[selectedIndex];
    const carouselCompProps = {
      imageUrl: currData.imageUrl,
      title: currData.title,
      text: currData.text,
      classes: null
    };
    const childStyles: ISliderChildStyles = {
      width: carouselElemWidth,
      height: carouselElemHeight,
      transition: 0.3
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
            childStyles={childStyles}
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
