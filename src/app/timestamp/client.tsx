"use client";

import React, { useState, useEffect } from 'react';
import { isValid, fromUnixTime, getUnixTime, formatISO, formatISO9075, formatRFC3339, formatRFC7231, isToday } from "date-fns";
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

interface Fmt {
  label: string;
  value: string | boolean;
}

const Page = ({title} : {title: string | undefined}) => {
  const [dd, setDD] = useState<string | number>(getUnixTime(new Date()));
  const [fmts, setFMTs] = useState<Fmt[]>([]);
  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    if (isValid(+dd)) {
      const da = fromUnixTime(+dd);
      setFMTs([
        {
          label: "ISO 8601",
          value: formatISO(da),
        },
        {
          label: "ISO 9075",
          value: formatISO9075(da),
        },
        {
          label: "RFC 3339",
          value: formatRFC3339(da),
        },
        {
          label: "RFC 7231",
          value: formatRFC7231(da),
        },
        {
          label: "UTC Time",
          value: da.toUTCString(),
        },
        {
          label: "is Today",
          value: isToday(da),
        },
      ])
    }
  }, [dd]) 

  const notify = (str: string) => toast(`Copied ${str}!`);

  const handleCopy = (str: string) => {
    copy(str)
      .then(() => {
        notify(str);
      })
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
            <textarea
              rows={3}
              placeholder="Paste/Enter Bitcoin P2PKH here."
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
