import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

interface SingleElementProps {
  classes: any;
  imageUrl: string;
  title: string;
  text: string;
}

export default ({ classes, imageUrl, title, text }: SingleElementProps) => (
  <div>
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{text}</Typography>
      </CardContent>
    </Card>
  </div>
);
