import { Provider } from "react-redux";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import store from "@/store/store";
import NextNProgress from "nextjs-progressbar";
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
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
