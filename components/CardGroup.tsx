import React from "react";
import { Card } from "semantic-ui-react";
import CardEmoji from "./CardEmoji";

interface Props {
  emojiList: {
    name: string;
    image: string;
    user: {
      displayName: string;
      photoURL: string;
    };
  }[];
}

const CardGroup: React.FC<Props> = ({ emojiList }) => (
  <Card.Group centered style={{ paddingTop: "10px" }}>
    {emojiList
      ? emojiList.map((data, index) => <CardEmoji key={index} {...data} />)
      : null}
  </Card.Group>
);

export default CardGroup;
