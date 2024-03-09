import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import site from "@/data/siteMetadata"
import tools from "@/data/tools"

export const metadata: Metadata = {
  title: `${site.title} | ${site.name}`,
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  const list = tools.map((t) => {
    return (
      <a href={t.link} key={t.short} className="rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark w-80">
        <h2 className="text-lg mb-2 line-clamp-1">
          {t.short}
        </h2>
        <div className="line-clamp-2">
          {t.desc}
        </div>
      </a>
    )
  })

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-wrap">
          {list}
        </div>
      </DefaultLayout>
    </>
  );
}
