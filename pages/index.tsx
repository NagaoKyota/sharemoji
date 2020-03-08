import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { auth, firebase } from "../src/firebase";


class IndexPage extends React.Component {
  handleSignIn = () => {
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

  handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        alert("Logout successful");
      })
      .catch(() => {
        alert("OOps something went wrong check your console");
      });
  };

  render() {
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
          <button onClick={this.handleSignIn}>Sign In using google</button> 
          <button onClick={this.handleSignout}>Signout</button>
          <Link href="/mypage">
            <a>OAuth</a>
          </Link>
        </p>
      </Layout>
    )
  }
}

export default IndexPage
