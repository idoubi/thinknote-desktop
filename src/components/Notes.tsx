import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const user = {
  id: 1,
  nickname: "艾逗笔",
  avatar_url: "",
};

let notes = [
  {
    id: 1,
    ctime: {
      timestamp: 1658471332,
      text: "2022-07-22 14:28:52",
    },
    text: {
      content: "你突然对我说，七里香的名字很美。",
    },
    emoji: {
      text: "😞",
    },
  },
  {
    id: 2,
    ctime: {
      timestamp: 1658471332,
      text: "2022-05-22 14:28:52",
    },
    text: {
      content: "我还在漂泊，你是错过的烟火。",
    },
    emoji: {
      text: "😙",
    },
  },
  {
    id: 3,
    ctime: {
      timestamp: 1658471332,
      text: "2022-01-22 14:28:52",
    },
    text: {
      content:
        "还记得你说家是唯一的城堡，睡着稻香和我继续去奔跑，微微笑，小时候的梦我知道。",
    },
    emoji: {
      text: "😄",
    },
  },
];

export default function RecipeReviewCard() {
  return (
    <>
      {notes.map(({ id, ctime, text, emoji }) => (
        <Card style={{ marginBottom: "1em" }} key={id}>
          <CardHeader
            avatar={<Avatar aria-label="recipe">{emoji.text}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            subheader={ctime.text}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {text.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
