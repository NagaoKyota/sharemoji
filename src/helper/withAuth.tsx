import React from "react";
import router from "next/router";
import { auth } from "../firebase";

interface IState {
  status: string;
};

const withAuth = (Component: React.FC) => {
  return class extends React.Component<{}, IState> {
    constructor(props: Readonly<{}>) {
      super(props);
      this.state = {
        status: "LOADING"
      };
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
      if (status == "LOADING") {
        return <h1>Loading ......</h1>;
      } else if (status == "SIGNED_IN") {
        return <Component {...this.props} />;
      }
    }

    render() {
      return <>{this.renderContent()}</>;
    }
  };
};

export default withAuth;
