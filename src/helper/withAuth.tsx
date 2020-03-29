import React from "react";
import { NextPage } from "next";
import router from "next/router";
import { auth } from "../firebase";

interface State {
  status: string;
}

const withAuth = (Component: NextPage) => {
  return class C extends React.Component<{}, State> {
    constructor(props: Readonly<{}>) {
      super(props);
      this.state = {
        status: "LOADING"
      };
    }

    static async getInitialProps(ctx: any) {
      return (
        Component.getInitialProps && (await Component.getInitialProps(ctx))
      );
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({
            status: "SIGNED_IN"
          });
        } else {
          router.push("/");
        }
      });
    }

    renderContent() {
      const { status } = this.state;
      if (status == "SIGNED_IN") {
        return <Component {...this.props} />;
      }
    }

    render() {
      return <>{this.renderContent()}</>;
    }
  };
};

export default withAuth;
