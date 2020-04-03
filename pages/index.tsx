import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Header, Container, Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import CardGroup from "../components/CardGroup";
import { auth, db, firebase } from "../src/firebase";
import { ServerResponse } from "http";

interface Emoji {
  name: string;
  image: string;
  user: {
    displayName: string;
    photoURL: string;
  };
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

const IndexPage: NextPage<Props> = ({ emojiList }) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setSignedIn(authUser !== null);
    });
  }, []);

  return (
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
};

const USER_PASS = "c2hhcmU6bW9qaQ==";

const sendUnauthorized = (res: ServerResponse) => {
  res.writeHead(401, { "www-authenticate": "Basic realm=secret string" });
  res.end();
};

IndexPage.getInitialProps = async ({ req, res }: NextPageContext) => {
  if (!process.browser && req && res) {
    const authorization = req.headers["authorization"] || "";

    const matches = authorization.match(/[^\s]+$/);
    if (matches === null) {
      sendUnauthorized(res);
    } else {
      const userPass = matches[0];

      if (userPass !== USER_PASS) {
        sendUnauthorized(res);
      }
    }
  }

  const datas = await db
    .collection("emojis")
    .limit(10)
    .get();
  const emojiList: Emoji[] = datas.docs.map((doc: any) => doc.data());

  return { emojiList: emojiList };
};

export default IndexPage;
