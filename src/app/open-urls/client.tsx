"use client";

import React, { useMemo, useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = () => {
  const re = useMemo(() => /[\n,，]/, [])

  const [urls, setUrls] = useState('');
  const [list, setList] = useState<React.ReactNode[]>([]);

  const handleClick = () => {
    const us = urls.split(re)
    for (let i = 0; i < us.length; i++) {
      window.open(us[i], "_wnd" + i); // use a different name for each window
    }
  }

  const isValidUrl = (l: string) => {
    try {
      new URL(l);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    const l = urls.split(re).filter((i) => {
      return i.trim() !== ''
    }).map((i, j) => {
      i = i.trim()
      if (isValidUrl(i)) {
        return (
          <div key={j} className="mb-2">
            <a href={i} target="_blank">{i}</a>
          </div>
        )
      }
      return (
        <div key={j}> Invalid URL: {i} </div>
      )
    })
    setList(l);
  }, [urls, re])

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h1 className="font-medium text-black dark:text-white">
            Open Multiple URLs at Once
          </h1>
        </div>
        <div className="p-6.5">
          <div className="mb-6">
            <textarea
              rows={6}
              placeholder="Paste/Enter urls separated by commas, new line or space."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={urls}
              onChange={e => setUrls(e.target.value)}
            />
          </div>
          <div className="flex">
            <button className="flex-1 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleClick}>
              Open URLs
            </button>
            <button className="ml-8 flex-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={() => { setUrls('') }}>
              Clear TextArea
            </button>
          </div>
        </div>
      </div>

      {
        list.length > 0 &&
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
            <div className="p-6.5">
              {list}
            </div>
          </div>
      }
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6.5">
          <About />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
