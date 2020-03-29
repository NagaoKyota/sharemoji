import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import CardGroup from "../../components/CardGroup";
import withAuth from "../../src/helper/withAuth";
import { auth, db } from "../../src/firebase";
import { Header, Container, Button } from "semantic-ui-react";

interface IEmoji {
  name: string;
  image: string;
}

interface IProps {
  emojiList: IEmoji[];
}

const Mypage: NextPage<IProps> = ({ emojiList }) => {
  return (
    <Layout>
      <Header as="h1" textAlign="center" style={{ fontSize: "60px" }}>
        Sharemoji
      </Header>
      <Container textAlign="center">
        <Button onClick={() => auth.signOut()}>ログアウト</Button>
      </Container>
      <Container textAlign="center">
        <CardGroup emojiList={emojiList} />
      </Container>
    </Layout>
  );
};

Mypage.getInitialProps = async () => {
  const datas = await db
    .collection("emojis")
    .limit(10)
    .get();
  const emojiList: IEmoji[] = datas.docs.map((doc: any) => doc.data());

  return { emojiList: emojiList };
};

export default withAuth(Mypage as NextPage);
