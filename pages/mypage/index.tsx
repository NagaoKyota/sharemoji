import React from "react";
import Layout from "../../components/Layout";
import withAuth from "../../src/helper/withAuth";
import { auth } from "../../src/firebase";
import { Header, Container, Button } from "semantic-ui-react";
import FileUpload from "../../components/FileUpload";

const Mypage = () => {
  return (
    <Layout>
      <Header as="h1" textAlign="center" style={{ fontSize: "60px" }}>
        Sharemoji
      </Header>
      <Container textAlign="center">
        <FileUpload />
        <Button onClick={() => auth.signOut()}>ログアウト</Button>
      </Container>
    </Layout>
  );
};

Mypage.getInitialProps = () => {
  return {};
};

export default withAuth(Mypage);
