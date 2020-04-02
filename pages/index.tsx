import React from "react";
import { NextPage } from "next";
import { Header, Container, Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import CardGroup from "../components/CardGroup";
import { auth, db, firebase } from "../src/firebase";
import { signedIn } from "../src/helper/signedIn";

interface Emoji {
  name: string;
  image: string;
}

interface Props {
  emojiList: Emoji[];
}

const handleSignIn = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  auth.signInWithPopup(provider).catch(() => {
    alert("OOps something went wrong check your console");
  });
};

const IndexPage: NextPage<Props> = ({ emojiList }) => (
  <Layout>
    <Header as="h1" textAlign="center" style={{ fontSize: "60px" }}>
      Sharemoji
    </Header>
    {!signedIn ? (
      <Container textAlign="center">
        <Button className="twitter" onClick={handleSignIn}>
          <Icon name="twitter" />
          Twitter
        </Button>
      </Container>
    ) : null}
    <Container textAlign="center">
      <CardGroup emojiList={emojiList} />
    </Container>
  </Layout>
);

IndexPage.getInitialProps = async () => {
  const datas = await db
    .collection("emojis")
    .limit(10)
    .get();
  const emojiList: Emoji[] = datas.docs.map((doc: any) => doc.data());

  return { emojiList: emojiList };
};

export default IndexPage;
