import "@/styles/globals.css";
import useFirebase from "@/useFirebase";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { onMessageReceive, fcmToken } = useFirebase();
  useEffect(() => {
    onMessageReceive((message) => {
      console.log(">>>>>>>>>>>>>>", { message });
    });
  }, [onMessageReceive]);
  return (
    <>
      {fcmToken}
      <Component {...pageProps} />
    </>
  );
}
