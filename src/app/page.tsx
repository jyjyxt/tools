import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import site from "@/data/siteMetadata"

export const metadata: Metadata = {
  title: `${site.title} | ${site.name}`,
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div>Tools</div>
      </DefaultLayout>
    </>
  );
}
