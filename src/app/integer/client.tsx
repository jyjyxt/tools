"use client";

import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

function convert(baseStr: string, baseFrom: number, baseTo: number) {
  if (baseFrom < 2) {
    baseFrom = 2
  } else if (baseFrom > 64) {
    baseFrom = 64
  }
  if (baseTo < 2) {
    baseTo = 2
  } else if (baseTo > 64) {
    baseTo = 64
  }
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
  const charsFrom = chars.slice(0, baseFrom);
  const charsTo = chars.slice(0, baseTo);

  // Convert base from string to decimal
  let decimal = 0;
  for (let i = 0; i < baseStr.length; i++) {
    decimal *= baseFrom;
    const j = charsFrom.indexOf(baseStr[i])
    if (j < 0) {
      break
    }
    decimal += j;
  }

  // Convert decimal to base to
  let result = '';
  while (decimal > 0) {
    result = charsTo[decimal % baseTo] + result;
    decimal = Math.floor(decimal / baseTo);
  }

  return result || '0';
}

interface Fmt {
  label: string;
  value: string | boolean;
}

const fmt = (da: string, base: number) => {
  return [
    {
      label: "Binary",
      value: convert(da, base, 2),
    },
    {
      label: "Octal",
      value: convert(da, base, 8),
    },
    {
      label: "Decimal",
      value: convert(da, base, 10),
    },
    {
      label: "Hexadecimal",
      value: convert(da, base, 16),
    },
    {
      label: "Base 32",
      value: convert(da, base, 32),
    },
    {
      label: "Base 64",
      value: convert(da, base, 64),
    },
  ]
}

const Page = ({title} : {title: string | undefined}) => {
  const [base, setBase] = useState<number>(10); 
  const [dd, setDD] = useState<string>(''); 
  const [fmts, setFMTs] = useState<Fmt[]>(fmt(dd, base));
  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    setFMTs(fmt(dd, base))
  }, [dd, base]) 

  const notify = (str: string) => toast(`Copied ${str}!`);

  const handleCopy = (str: string) => {
    copy(str)
      .then(() => {
        notify(str);
      })
  }

  const handleChange = (j: number) => {
    setBase(j)
  }

  const list = fmts.map((fmt: Fmt) => {
    return (
      <div className="mb-6" key={fmt.label}>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">{fmt.label}</label>
        <div className="relative">
          <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={fmt.value as string} placeholder="Bitcoin P2SH Address" disabled readOnly />
          <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(fmt.value as string)}>
            <span id="default-message" className="inline-flex items-center">
              <span className="text-xs font-semibold">Copy</span>
            </span>
          </button>
        </div>
      </div>
    )
  })

  const bases = [2, 8, 10, 16, 64].map((j) => {
    return (
      <div className="flex items-center me-4" key={j}>
        <input checked={base===j} id={`inline-nil-radio-${j}`} type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => handleChange(j)} />
        <label htmlFor={`inline-nil-radio-${j}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{j} Base</label>
      </div>
    )
  })

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h1 className="font-medium text-black dark:text-white">
            {title}
          </h1>
        </div>
        <div className="p-6.5">
          <div className="flex flex-wrap mb-5">
            {bases}
          </div>
          <div className="mb-6">
            <textarea
              rows={2}
              placeholder="Paste/Enter Number here."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={dd}
              onChange={e => setDD(e.target.value)}
            />
          </div>
          {list}
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
