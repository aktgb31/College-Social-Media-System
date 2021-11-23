import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
function CommentCompent(props) {
    return (
        <div>
             <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {props.author}
                </Typography>
                <Typography variant="h6" component="div">
                 {props.comment}
                </Typography>
              </CardContent>
            </Card>
        </div>
    )
}

export default CommentCompent
