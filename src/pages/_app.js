import { ChakraProvider } from "@chakra-ui/react";
import { SET_IS_SERVER } from "app/reducer";
import { wrapper } from "app/store";
import App from "next/app";
import NextNProgress from "nextjs-progressbar";
import { END } from "redux-saga";
import Layout from "../layouts/Layout";

import "../scripts/wdyr";

class WrappedApp extends App {
  static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        // 1. Wait for all page actions to dispatch
        const pageProps = {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({
                ...ctx,
                store,
              })
            : {}),
        };

        // 2.1 Stop the saga if on server
        if (
          (ctx.req || pageProps.navigateAfterSaga) &&
          Component.getInitialProps
        ) {
          store.dispatch(END);
          await store?.sagaTask.toPromise();

          // use in hydrate reducer
          store.dispatch({ type: SET_IS_SERVER });
        }
        // 2.1 Stop the sage if on server and getServerSideProps is used
        const isServer = !ctx?.req?.url?.startsWith("/_next");
        if (isServer && !Component.getInitialProps) {
          // used in hydrate reducer
          store.dispatch({ type: SET_IS_SERVER });
        }
        // 3. Return props
        return {
          pageProps,
        };
      }
  );

  render() {
    const { Component, pageProps } = this.props;
    const { title } = pageProps;
    return (
      <>
        <NextNProgress />
        <ChakraProvider>
          <Layout title={title}>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
