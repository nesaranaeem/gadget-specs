import { Provider } from "react-redux";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import store from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
