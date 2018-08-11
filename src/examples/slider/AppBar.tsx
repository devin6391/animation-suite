import * as React from "react";
import injectSheet from "react-jss";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SliderWithoutAnimation from "./SliderWithoutAnimation";
import SliderWithAnimation from "./SliderWithAnimation";
import { appBarStyles } from "./styles";
import TabContainer from "../common/TabContainer";

interface CarouselData {
  id: number;
  imageUrl: string;
  title: string;
  text: string;
}

const carouselDataArr: CarouselData[] = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "The Seat",
    text: "Relax in the beauty"
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "The Farm",
    text: "Feel the freedom"
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    title: "The Track",
    text: "Railway track through peaceful trees"
  }
];

type TabValuesType = "withAnimation" | "withoutAnimation";

interface CarouselTabsProps {
  classes: any;
}

interface CarouselTabsStates {
  value: TabValuesType;
}

class CarouselTabs extends React.Component<
  CarouselTabsProps,
  CarouselTabsStates
> {
  constructor(props: CarouselTabsProps) {
    super(props);
    this.state = {
      value: "withoutAnimation"
    };
  }

  handleChange = (event: React.KeyboardEvent, value: TabValuesType) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Carousel Without animation" value="withoutAnimation" />
            <Tab label="Carousel With Animation" value="withAnimation" />
          </Tabs>
        </AppBar>
        {value === "withoutAnimation" && (
          <TabContainer>
            <SliderWithoutAnimation dataArr={carouselDataArr} classes={null} />
          </TabContainer>
        )}
        {value === "withAnimation" && (
          <TabContainer>
            <SliderWithAnimation dataArr={carouselDataArr} classes={null} />
          </TabContainer>
        )}
      </div>
    );
  }
}

export default injectSheet(appBarStyles)(CarouselTabs);
