import * as React from "react";
import { Transition } from "react-transition-group";

interface ITransitioningComponentProps {
  enter: any;
  classes: any;
  direction: any;
  appear: any;
  children: any;
}

const TransitioningComponent = ({
  enter,
  classes,
  direction,
  appear,
  children
}: ITransitioningComponentProps) => (
  <Transition in={enter} timeout={1} appear={appear}>
    {state => {
      let wrapperClass = classes.rtgFarRight;
      console.log(state);
      switch (state) {
        case "entering":
          wrapperClass = !!direction ? classes.rtgFarLeft : classes.rtgFarRight;
          break;
        case "entered":
          wrapperClass = classes.rtgCenter + " " + classes.rtgWithTransition;
          break;
        case "exiting":
          wrapperClass = classes.rtgCenter;
          break;
        case "exited":
          wrapperClass =
            (!!direction ? classes.rtgFarRight : classes.rtgFarLeft) +
            " " +
            classes.rtgWithTransition;
          break;
        default:
          throw new Error("Transition has no state");
      }
      return (
        <div className={`${wrapperClass} ${classes.rtgWrapper}`}>
          {children}
        </div>
      );
    }}
  </Transition>
);

export default TransitioningComponent;
