"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import { generateMnemonic, mnemonicToSeedSync } from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { HDKey } from "ethereum-cryptography/hdkey.js";
import { Web3 } from 'web3';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'

const Page = ({title} : {title: string | undefined}) => {
  const [words, setWords] = useState(24);
  const [sl, setSL] = useState(1);
  const [result, setResult] = useState('');

  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    const rs = [];
    for (let i=0;i<sl;i++) {
      const mnemonic = generateMnemonic(wordlist, 256 * words / 24);
      const seed = mnemonicToSeedSync(mnemonic);
      const hdkey = HDKey.fromMasterSeed(seed);
      const priv = toHex(hdkey.privateKey as Uint8Array);
      const p2 = secp256k1.getPublicKey(priv, false);
      const hash = keccak256(p2.slice(1));
      const address = `${toHex(hash.slice(-20))}`;
      rs.push(`0x${address},${priv},${mnemonic}`)
    }
    setResult(rs.join('\n'));
  }, [words, sl]) 

  const handleChange = (j: number) => {
    setWords(j)
  }

  const notify = (str: string) => toast(`Copied ${str}!`);

  const handleCopy = (str: string) => {
    copy(str)
      .then(() => {
        notify(str);
      })
  }

  const radios = [12, 15, 18, 21, 24].map((j) => {
    return (
      <div className="flex items-center me-4" key={j}>
        <input checked={words===j} id={`inline-nil-radio-${j}`} type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => handleChange(j)} />
        <label htmlFor={`inline-nil-radio-${j}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{j} Words</label>
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
            <div className="flex flex-wrap mb-5">
              {radios}
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">ETH Address Size</label>
              <input placeholder="String Length" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="numer" value={sl} onChange={(e) => setSL(Number(e.target.value))} />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Bulk Ethereum Address Generator Result</label>
            <div className="relative">
            <textarea
              rows={16}
              placeholder="Bulk Ethereum Address Generator Result"
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
