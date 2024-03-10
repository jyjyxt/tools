"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = ({title} : {title: string | undefined}) => {
  const [al, setAL] = useState(true);
  const [ap, setAP] = useState(true);
  const [n, setN] = useState(true);
  const [us, setUS] = useState(false);
  const [aii, setAII] = useState(false);

  const [sl, setSL] = useState(36);
  const [result, setResult] = useState('');

  const [, copy] = useCopyToClipboard()

  const alphaLowcase = 'abcdefghijklmnopqrstuvwxyz'
  const alphaUpcase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numeric = '0123456789'
  const urlSafe = '-._~'
  const ascii = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

  const makeid = (characters: string, length: number) => {
    if (length <= 0 || characters === '') {
      return ''
    }
    let result = '';
    const charactersLength = characters.length;
    let counter: number = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  useEffect(() => {
    let c: string = '';
    if (us) {
      c = alphaLowcase + alphaUpcase + numeric + urlSafe;
    } else if (aii) {
      c = alphaLowcase + alphaUpcase + numeric + ascii;
    } else {
      if (al) {
        c = c + alphaLowcase;
      }
      if (ap) {
        c = c + alphaUpcase;
      }
      if (n) {
        c = c + numeric;
      }
    }
    setResult(makeid(c, sl))
  }, [al, ap, n, us, aii, sl])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'al':
        if (al) {
          setUS(false);
          setAII(false);
        }
        setAL(!al);
        break;
      case 'ap':
        if (ap) {
          setUS(false);
          setAII(false);
        }
        setAP(!ap);
        break;
      case 'n':
        if (n) {
          setUS(false);
          setAII(false);
        }
        setN(!n);
        break;
      case 'us':
        setAL(true);
        setAP(true);
        setN(true);
        setUS(!us);
        setAII(false);
        break;
      case 'aii':
        setAL(true);
        setAP(true);
        setN(true);
        setUS(false);
        setAII(!aii);
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
            <div className="flex items-center">
              <input id="checkbox-al" type="checkbox" value="" name="al" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={al} onChange={handleChange} />
              <label htmlFor="checkbox-al" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alpha Lowcase ({alphaLowcase})</label>
            </div>
            <div className="flex items-center">
              <input id="checkbox-au" type="checkbox" value="" name="ap" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={ap} onChange={handleChange} />
              <label htmlFor="checkbox-au" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alpha Upcase ({alphaUpcase})</label>
            </div>
            <div className="flex items-center">
              <input id="checkbox-n" type="checkbox" value="" name="n" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={n} onChange={handleChange} />
              <label htmlFor="checkbox-n" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numeric ({numeric})</label>
            </div>
            <div className="flex items-center">
              <input id="checkbox-us" type="checkbox" value="" name="us" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={us} onChange={handleChange} />
              <label htmlFor="checkbox-us" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">URL Safe ({alphaLowcase}{alphaUpcase}{numeric}{urlSafe})</label>
            </div>
            <div className="flex items-center">
              <input id="checkbox-aii" type="checkbox" value="" name="aii" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={aii} onChange={handleChange} />
              <label htmlFor="checkbox-aii" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ASCII ({alphaLowcase}{alphaUpcase}{numeric}{ascii})</label>
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">String Length</label>
              <input placeholder="String Length" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="numer" value={sl} onChange={(e) => setSL(Number(e.target.value))} />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Random String Generator Result</label>
            <div className="relative">
            <textarea
              rows={3}
              placeholder="Random String Generator Result."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={result}
              disabled readOnly
            />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/4 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => {handleCopy(result)}}>
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
