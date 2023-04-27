import { Provider } from "react-redux";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import store from "@/store/store";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
