"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import * as uuid from 'uuid';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = ({title} : {title: string | undefined}) => {
  const [nl, setNL] = useState(false);
  const [v1, setV1] = useState(false);
  const [v3, setV3] = useState(false);
  const [v4, setV4] = useState(true);
  const [v5, setV5] = useState(false);

  const [sl, setSL] = useState(1);
  const [result, setResult] = useState('');

  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    const array = [];
    for (let i=0;i<sl;i++) {
      let a = uuid.v4();
      if (nl) {
        a = uuid.NIL
      }
      if (v1) {
        a = uuid.v1()
      }
      if (v3) {
        let ns = uuid.v4();
        a = uuid.v3('tools.gmgn.top', ns)
      }
      if (v5) {
        let ns = uuid.v4();
        a = uuid.v5('tools.gmgn.top', ns)
      }
      array.push(a)
    }
    setResult(array.join('\n'));
  }, [nl, v1, v3, v4, v5, sl])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    setNL(false)
    setV1(false)
    setV3(false)
    setV4(false)
    setV5(false)
    switch(event.target.id) {
      case 'inline-nil-radio':
        setNL(true);
        break;
      case 'inline-1-radio':
        setV1(true);
        break;
      case 'inline-3-radio':
        setV3(true);
        break;
      case 'inline-4-radio':
        setV4(true);
        break;
      case 'inline-5-radio':
        setV5(true);
        break;
    }
  };

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
          <div className="mb-6">
            <div className="flex mb-5">
              <div className="flex items-center me-4">
                <input checked={nl} id="inline-nil-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                <label htmlFor="inline-nil-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">UUID NIL</label>
              </div>
              <div className="flex items-center me-4">
                <input checked={v1} id="inline-1-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                <label htmlFor="inline-1-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">UUID V1</label>
              </div>
              <div className="flex items-center me-4">
                <input checked={v3} id="inline-3-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                <label htmlFor="inline-3-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">UUID V3</label>
              </div>
              <div className="flex items-center me-4">
                <input checked={v4} id="inline-4-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                <label htmlFor="inline-4-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">UUID V4</label>
              </div>
              <div className="flex items-center me-4">
                <input checked={v5} id="inline-5-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                <label htmlFor="inline-5-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">UUID V5</label>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">UUID size</label>
              <input placeholder="String Length" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="numer" value={sl} onChange={(e) => setSL(Number(e.target.value))} />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Random String Generator Result</label>
            <div className="relative">
            <textarea
              rows={8}
              placeholder="Random String Generator Result."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={result}
              disabled readOnly
            />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-8 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => {handleCopy(result)}}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
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
