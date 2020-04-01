import React from "react";
import "semantic-ui-css/semantic.min.css";
import "cropperjs/dist/cropper.css";

interface Props {
  Component: React.FC;
  pageProps: any;
}

const App = ({ Component, pageProps }: Props) => {
  return <Component {...pageProps} />;
};

export default App;
