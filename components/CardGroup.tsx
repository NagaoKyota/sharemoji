import React from "react";
import { Card } from "semantic-ui-react";
import CardEmoji from "./CardEmoji";

interface IProps {
  emojiList: {
    name: string;
    image: string;
  }[];
}

const CardGroup: React.FC<IProps> = ({ emojiList }) => (
  <Card.Group centered style={{ paddingTop: "10px" }}>
    {emojiList
      ? emojiList.map((data, index) => <CardEmoji key={index} {...data} />)
      : null}
  </Card.Group>
);

export default CardGroup;
