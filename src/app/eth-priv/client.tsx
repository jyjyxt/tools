"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { Web3 } from 'web3';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = ({title} : {title: string | undefined}) => {
  const [priv, setPriv] = useState('');
  const [un, setUn] = useState('');
  const [com, setCom] = useState('');
  const [addr, setAddr] = useState('');

  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    try {
      const p1 = secp256k1.getPublicKey(priv.trim());
      setCom(toHex(p1))
      const p2 = secp256k1.getPublicKey(priv.trim(), false);
      setUn(toHex(p2.slice(1)))
      const hash = keccak256(p2.slice(1));
      const address = `${toHex(hash.slice(-20))}`;
      setAddr(Web3.utils.toChecksumAddress(address))
    } catch (err) {
      console.log(err)
    }
  }, [priv])

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
              placeholder="Paste/Enter Ethereum Private Key here."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={priv}
              onChange={e => setPriv(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Ethereum Uncompressed Public Key</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={un} placeholder="Result of Ethereum Uncompressed Public Key" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(un)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Ethereum Compressed Public Key</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={com} placeholder="Result of Ethereum Compressed Public Key" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(com)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Ethereum Public Address</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={addr} placeholder="Result of Ethereum Address" disabled readOnly />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(addr)}>
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
