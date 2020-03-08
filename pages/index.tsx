import * as React from 'react'
import Layout from '../components/Layout'
import { auth, firebase } from "../src/firebase";
import { Header, Container, Button, Icon } from 'semantic-ui-react';

const handleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth
    .signInWithPopup(provider)
    .then(() => {
      alert("You are signed In");
    })
    .catch(() => {
      alert("OOps something went wrong check your console");
    });
};

const IndexPage = (): JSX.Element => (
  <Layout>
    <Header as='h1' textAlign='center' style={{ fontSize: '60px' }}>
      Sharemoji
    </Header>
    <Container textAlign='center'>
      <Button className="google plus" onClick={handleSignIn}>
        <Icon name='google' />
        Google
      </Button>
    </Container>
  </Layout>
);

export default IndexPage
