import { Metadata } from "next";
import site from "@/data/siteMetadata"
import tools from "@/data/tools"
import Client from "./client"

const tool = tools.find((t) => {
  return t.link === '/uuid'
})

export const metadata: Metadata = {
  title: `${tool?.title} | ${site.name}`,
  description: tool?.desc
};

const Page = () => {
  return (
    <Client title={tool?.title} />
  );
};

export default Page;
