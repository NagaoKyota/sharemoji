import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../../components/Layout'
import withAuth from "../../src/helper/withAuth";
import { auth } from "../../src/firebase";
import { Header, Container, Button } from 'semantic-ui-react';

const handleSignout = () => {
  auth
    .signOut()
    .then(() => {
      alert("Logout successful");
    })
    .catch(() => {
      alert("OOps something went wrong check your console");
    });
};

const Mypage: NextPage = () => {
  return (
    <Layout>
      <Header as='h1' textAlign='center' style={{ fontSize: '60px' }}>
        Sharemoji
      </Header>
      <Container textAlign='center'>
        <Button onClick={handleSignout}>ログアウト</Button>
      </Container>
    </Layout>
  )
}

export default withAuth(Mypage);
