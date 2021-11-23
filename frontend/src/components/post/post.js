import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@material-ui/core/Button";
import ReportIcon from "@mui/icons-material/Report";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import NavbarComponent from "../navbar/navbar";
import CommentCompent from "../comment/comment";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post() {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [report, setReport] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <NavbarComponent/>
    <center>
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                if (report) {
                  alert("Post is already reported by you");
                } else {
                  alert("Post Reported");
                  setReport(true);
                }
              }}
            >
              {report ? (
                <ReportIcon style={{ color: "red" }} />
              ) : (
                <ReportIcon style={{ color: "grey" }} />
              )}
            </IconButton>
          }
          title="post title"
          subheader="post creator name"
        />
        <CardMedia
          component="img"
          height="auto"
          image="https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067__340.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            content text
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (liked) {
                alert("already liked");
              } else {
                alert("liked");
                setLikes(likes + 1);
                setLiked(!liked);
              }
              //alert("clicked");
            }}
          >
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteIcon style={{ color: "grey" }} />
            )}
            <p>{likes}&emsp;</p>
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={() => {
              const el = document.createElement("input");
              el.value = window.location.href;
              document.body.appendChild(el);
              el.select();
              document.execCommand("copy");
              document.body.removeChild(el);
              alert("post link copied ");
            }}
          >
            <ShareIcon />
            <p>&emsp;</p>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <p> &emsp;</p>
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto">
          <CardContent>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Comment
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                // value={values.amount}
                onChange={() => {
                  //console.log("changed");
                }}
                label="Comment"
              />
              <Button variant="contained" endIcon={<SendIcon />}>
                Add Comment
              </Button>
            </FormControl>
                <CommentCompent author="Navnit" comment="sample comment"/>
          </CardContent>
        </Collapse>
      </Card>
    </center>
    </>
  );
}
