import * as React from "react";
import Typography from "@material-ui/core/Typography";

interface AppBarTabContainerProps {
  children: JSX.Element;
}

function TabContainer(props: AppBarTabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default TabContainer;
