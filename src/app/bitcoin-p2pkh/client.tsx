"use client";

import React, { useState, useEffect } from 'react';
import * as btc from '@scure/btc-signer';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = ({title} : {title: string | undefined}) => {
  const [address, setAddress] = useState('');
  const [p2sh, setP2SH] = useState ('');
  const [p2wsh, setP2WSH] = useState ('');
  const [p2shp2wsh, setP2SHP2WSH] = useState ('');
  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    try {
      const d = btc.Address().decode(address);
      const dd: btc.P2Ret = {
        type: d.type,
        script: btc.OutScript.encode(d),
      }

      setP2SH(btc.p2sh(dd).address || '')
      setP2WSH(btc.p2wsh(dd).address || '')
      setP2SHP2WSH(btc.p2sh(btc.p2wsh(dd)).address || '')
    } catch {}
  }, [address]) 

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
            <textarea
              rows={3}
              placeholder="Paste/Enter Bitcoin P2PKH here."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Bitcoin P2SH, or Pay to Script Hash Address</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={p2sh} placeholder="Bitcoin P2SH Address" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(p2sh)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Bitcoin P2WSH, or Pay to Witness Script Hash Address</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={p2wsh} placeholder="Bitcoin P2WSH Address" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(p2wsh)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Bitcoin P2SH-P2WSH, combines the features of both P2SH (Pay to Script Hash) and P2WSH (Pay to Witness Script Hash) addresses</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={p2shp2wsh} placeholder="Bitcoin P2SH-P2WSH Address" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(p2shp2wsh)}>
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
