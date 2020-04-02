import React from "react";
import { NextPage } from "next";
import { Header, Container, Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import CardGroup from "../components/CardGroup";
import { auth, db, firebase } from "../src/firebase";

interface Emoji {
  name: string;
  image: string;
}

interface Props {
  emojiList: Emoji[];
}

const handleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth.signInWithPopup(provider).catch(() => {
    alert("OOps something went wrong check your console");
  });
};

const IndexPage: NextPage<Props> = ({ emojiList }) => (
  <Layout>
    <Header as="h1" textAlign="center" style={{ fontSize: "60px" }}>
      Sharemoji
    </Header>
    <Container textAlign="center">
      <Button className="google plus" onClick={handleSignIn}>
        <Icon name="google" />
        Google
      </Button>
    </Container>
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
