import React from 'react';
import Layout from '../components/layout/Layout';

// Use the getLayout pattern: pages can export a `getLayout` function to wrap their content
// Example in a page: Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}
