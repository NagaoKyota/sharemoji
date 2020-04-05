import React from "react";
import { Card, Button } from "semantic-ui-react";
import { auth, db, storage } from "../src/firebase";
import EmojiArea from "./EmojiArea";

interface CardEmojiProps {
  image: string;
  name: string;
  fileName: string;
  user: {
    displayName: string;
    photoURL: string;
  };
  id: string;
}

const CardEmoji = ({ image, name, fileName, user, id }: CardEmojiProps) => {
  const deleteIcon = async () => {
    const storageRef = storage.ref();
    const ref = storageRef.child(fileName);
    ref
      .delete()
      .catch(() => {
        alert("削除できませんでした");
      })
      .then(() => {
        db.collection("emojis")
          .doc(id)
          .delete()
          .then(() => {
            location.reload();
          })
          .catch(() => {
            alert("削除できませんでした");
          });
      });
  };

  return (
    <Card id={name} style={{ margin: "20px" }}>
      <EmojiArea emoji={image} name={name} />
      <Card.Content>
        <Card.Header>{`:${name}:`}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <p>
          <img src={user.photoURL} style={{ marginRight: "8px" }} width="30" />
          {`@${user.displayName}`}
          {auth.currentUser?.displayName === user.displayName ? (
            <Button
              style={{ marginLeft: "8px" }}
              circular
              icon="remove"
              onClick={deleteIcon}
            />
          ) : null}
        </p>
      </Card.Content>
    </Card>
  );
};

export default CardEmoji;
