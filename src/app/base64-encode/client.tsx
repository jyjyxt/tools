"use client";

import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'
import { base64, base64nopad, base64url, base64urlnopad } from '@scure/base';

const Page = ({title} : {title: string | undefined}) => {
  const [original, setOriginal] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [, copy] = useCopyToClipboard()
  const [urlSafe, setUrlSafe] = useState(false);
  const [noPadding, setNoPadding] = useState(false);

  const handleOriginalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOriginal (value);
  };

  const handleClearClick = () => {
    setOriginal ('');
    setBase ('')
  };

  useEffect(() => {
    if (original.length === 0) {
      return
    }
    const d = new TextEncoder().encode(original);

    if (!urlSafe && !noPadding) {
      setBase(base64.encode(d))
    } else if (urlSafe && noPadding) {
      setBase(base64urlnopad.encode(d))
    } else if (urlSafe) {
      setBase(base64url.encode(d))
    } else {
      setBase(base64nopad.encode(d))
    }
  }, [original, urlSafe, noPadding]) 

  const notify = (str: string) => toast(`Copied ${str}!`);

  const handleCopy = (str: string) => {
    copy(str)
      .then(() => {
        notify(str);
      })
  }

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h1 className="font-medium text-black dark:text-white">
            {title}
          </h1>
        </div>
        <div className="p-6.5">
          <div className="mb-4">
            <textarea
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={original}
              placeholder="Enter your Base64 encode text here."
              rows={6}
              onChange={handleOriginalChange}
            ></textarea>
          </div>

          <div className="mb-4 flex item-center">
            <div className="flex flex-grow item-center">
              <div className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  id='url-safe'
                  className="h-4 w-4 border-gray-300 rounded mr-1"
                  checked={urlSafe}
                  onChange={() => setUrlSafe(!urlSafe)}
                />
                <label htmlFor='url-safe' className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">URL Safe</label>
              </div>
              <div className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  id='no-padding'
                  className="h-4 w-4 border-gray-300 rounded mr-1"
                  checked={noPadding}
                  onChange={() => setNoPadding(!noPadding)}
                />
                <label htmlFor='no-padding' className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Padding</label>
              </div>
              <button
                className="rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
                onClick={() => {handleCopy(base)}}
              >
                Copy
              </button>
            </div>
            <button
              className="rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
              onClick={handleClearClick}
            >
              Clear 
            </button>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Encoded text will appear here."
              value={base}
              rows={6}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6.5">
          <About />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
