import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--space",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${space.className}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
