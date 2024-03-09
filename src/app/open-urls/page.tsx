import { Metadata } from "next";
import Client from "./client"

export const metadata: Metadata = {
  title: "Open URLs for Multiple Links or Websites | Tools",
  description:
  "The Open URLs is a free and open source online tool that allows you to open multiple URLs simultaneously. You can either manually input the URLs or copy and paste them into the text box and with one click of the mouse all the URL’s will open in separate tabs. If you use Google Chrome you will have to go into the settings and allow for popups from [website].",
};

const Page = () => {
  return (
    <Client />
  );
};

export default Page;
