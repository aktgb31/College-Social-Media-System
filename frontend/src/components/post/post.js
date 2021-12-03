import * as React from "react";
import "./post.css";
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
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

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

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [report, setReport] = React.useState(false);
  const [comment, setComment] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [commentCount, setCommentCount] = React.useState(0);
  const [creator , setCreator] = React.useState();
  const [date, setDate] = React.useState();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("postId");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [post, setPost] = useState({});
  const [username,setName] = useState(null);
  useEffect(async () => {
    const res= await fetch("/api/user/profile/me");
    const datap= await res.json();
    try {
       const tr=datap.data.student.firstName;
       setName(tr);
    }
  catch(err) {
    const tr=datap.data.club.name;
    setName(tr);
  }
    const response = await fetch(`/api/post/?postId=${name}`);
    const data = await response.json();
    
    setPost(data.data[0]);
    const dates=new Date(data.data[0].createdAt);
    const dates1=dates.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
    setDate(dates1);

    const qwert=data.data[0].creatorId;
    const resp= await fetch(`/api/user/profile/?userId=${qwert}`);
    const dat = await resp.json();
      //console.log(dat.data.student.firstName);
      try{
        setCreator(dat.data.student.firstName);
      }
      catch(err){
        setCreator(dat.data.club.name);
      }
    setLikes(data.data[0].Upvotes.length);
    
    let qw=data.data[0].Comments;
    await Promise.all(qw.map(async (item) => {
      const resp = await fetch(`/api/user/profile/?userId=${item.creatorId}`);
      const dat = await resp.json();
      if (dat.data.userType == "STUDENT")
        item.creatorId = dat.data.student.firstName + " " + dat.data.student.lastName;
      else
        item.creatorId = dat.data.club.name;
        return item;
    }
    )).then(qw => {
      console.log(qw)
      setComments(qw);
    });
    
  }, [commentCount]);

  return (
    <>
      {/* {console.log(post.postId)} */}
      <NavbarComponent name={username}/>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <center>
        <Card sx={{ maxWidth: 600 }} id="post-file">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                N
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
            title={creator}
             subheader={date}
          />
          <CardMedia
            component="img"
            height="auto"
            image={post.relatedImage}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                if (liked) {
                  alert("already liked");
                } else {
                  fetch("/api/post/reaction", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      reactionType: "upvote",
                      postId: post.postId,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Success:", data);
                      alert("liked");
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      alert("Error in Liking");
                    });
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
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                    // console.log(comment)
                  }}
                  label="Comment"
                />
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    fetch("/api/post/comment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        content: comment,
                        postId: post.postId,
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("Success:", data);
                        setComment("");
                        alert("Comment added");
                        setCommentCount(commentCount + 1);
                        
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        alert("Error in Commenting");
                      });
                  }}
                >
                  Add Comment
                </Button>
              </FormControl>
              {console.log(comments)}
              {comments.map((commentDetails) => {
                return (<CommentCompent author={commentDetails.creatorId} comment={commentDetails.content}></CommentCompent>)
              })}
            </CardContent>
          </Collapse>
        </Card>
      </center>
    </>
  );
}
