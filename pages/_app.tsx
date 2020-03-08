import React from 'react';
import 'semantic-ui-css/semantic.min.css'

interface IProps {
  Component: React.FC;
  pageProps: any;
}

const App = ({ Component, pageProps }: IProps) => {
  return <Component {...pageProps} />
}

export default App;
