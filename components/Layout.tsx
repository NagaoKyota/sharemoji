import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Segment } from "semantic-ui-react";
import { auth } from "../src/firebase";
import ogp from "../src/image/sharemoji.png";

type Props = {
  title?: string;
  description?: string;
  url?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Sharemoji | Easy to share Slack custom Emoji",
  description = "Slackのカスタム絵文字やアイコンを簡単に投稿・コピーできるサイトです。",
  url = "https://share-moji.now.sh"
}) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setSignedIn(authUser !== null);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogp} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kyoncy_site" />
        <meta name="twitter:url" content={"https://twitter.com/kyoncy_site"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogp} />
      </Head>
      <header>
        <Segment clearing>
          <Link href="/">
            <Button circular icon="home" style={{ float: "left" }} />
          </Link>
          {signedIn ? (
            <Link href="/mypage">
              <Button circular icon="user" style={{ float: "right" }} />
            </Link>
          ) : null}
        </Segment>
      </header>
      {children}
    </div>
  );
};

export default Layout;
