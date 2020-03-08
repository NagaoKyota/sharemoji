import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../../components/Layout'
import withAuth from "../../src/helper/withAuth";

const Mypage: NextPage = () => {
  return (
    <Layout title="マイページ">
      <h1>ここはマイページです。</h1>
    </Layout>
  )
}

export default withAuth(Mypage);
