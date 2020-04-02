import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Header, Segment, Icon } from "semantic-ui-react";
import { auth } from "../src/firebase";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Sharemoji | Easily share Slack custom Emoji"
}) => {
  const [signedIn, setSignedIn]: any = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setSignedIn(authUser);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Segment clearing>
          <Header as="h2" floated="left">
            <Link href="/">
              <a>
                <Icon name="home" />
              </a>
            </Link>
          </Header>
          {signedIn ? (
            <Header as="h2" floated="right">
              <Link href="/mypage">
                <a>
                  <Icon name="user" />
                </a>
              </Link>
            </Header>
          ) : null}
        </Segment>
      </header>
      {children}
    </div>
  );
};

export default Layout;
