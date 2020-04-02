import React from "react";
import { Card } from "semantic-ui-react";
import EmojiArea from "./EmojiArea";

interface CardEmojiProps {
  image?: string;
  name?: string;
}

const CardEmoji = ({ image, name = "none" }: CardEmojiProps) => {
  return (
    <Card id={name} style={{ margin: "20px" }}>
      <EmojiArea emoji={image} name={name} />
      <Card.Content>
        <Card.Header>{`:${name}:`}</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default CardEmoji;
