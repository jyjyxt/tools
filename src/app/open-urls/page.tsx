"use client";

import { useState } from 'react';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = () => {
  const [urls, setUrls] = useState('');

  const handleClick = () => {
    const us = urls.split('\n')
    for (let i = 0; i < us.length; i++) {
      console.log(us[i])
      console.log("====", i)
      window.open(us[i], "_wnd" + i); // use a different name for each window
    }
  }

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h1 className="font-medium text-black dark:text-white">
            Open Multiple URLs at Once
          </h1>
        </div>
        <div className="p-6.5">
          <div className="mb-6">
            <textarea
              rows={6}
              placeholder="Type your message"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={urls}
              onChange={e => setUrls(e.target.value)}
            />
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleClick}>
            Open URLs
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
