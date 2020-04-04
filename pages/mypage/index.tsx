import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import withAuth from "../../src/helper/withAuth";
import { auth, db } from "../../src/firebase";
import { Header, Container, Button } from "semantic-ui-react";
import CardGroup from "../../components/CardGroup";
import FileUpload from "../../components/FileUpload";

const Mypage = () => {
  const [emojis, setEmojis]: any = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async authUser => {
      const datas = await db
        .collection("emojis")
        .where("user.displayName", "==", authUser?.displayName)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
      setEmojis(
        datas.docs.map((doc: any) => {
          const data = doc.data();
          Object.assign(data, { id: doc.id });
          return data;
        })
      );
    });
  }, []);

  return (
    <Layout>
      <Header as="h1" textAlign="center" style={{ fontSize: "60px" }}>
        Sharemoji
      </Header>
      <Container textAlign="center">
        <Button onClick={() => auth.signOut()}>ログアウト</Button>
        <FileUpload />
      </Container>
      <Container textAlign="center">
        <CardGroup emojiList={emojis} />
      </Container>
    </Layout>
  );
};

Mypage.getInitialProps = () => {
  return {};
};

export default withAuth(Mypage);
