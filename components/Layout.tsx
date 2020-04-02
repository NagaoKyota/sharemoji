import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { Header, Segment, Icon } from "semantic-ui-react";
import { signedIn } from "../src/helper/signedIn";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Sharemoji | Easily share Slack custom Emoji"
}) => (
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

export default Layout;
