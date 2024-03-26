"use client";

import React, { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import About from './about.mdx'
import { base32 } from '@scure/base';
import { Web3 } from 'web3';

const Page = ({title} : {title: string | undefined}) => {
  const [rpc, setRPC] = useState<string>('https://rpc.ankr.com/eth');
  const [erc, setERC] = useState<string>('');
  const [original, setOriginal] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [, copy] = useCopyToClipboard()

  const handleOriginalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOriginal (value);
  };

  const handleClearClick = () => {
    setOriginal ('');
  };

  const abi = [
    {"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},
    {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
  ]

  const handleBulkQuery = async () => {
    const web3 = new Web3(rpc);

    let array: string[] = [];
    let data = original.split('\n')

    if (web3.utils.isAddress(erc)) {
      const contract = new web3.eth.Contract(abi, erc);
      const sym = await contract.methods.symbol().call();
      const dec = await contract.methods.decimals().call();

      for (let i = 0; i < data.length; i++) {
        const o = data[i]
        console.log("xxx", web3.utils.isAddress(o))
        if (web3.utils.isAddress(o)) {
          const bo = await contract.methods.balanceOf(o).call();
          let bn = Number(bo)
          let bb = '0'
          if (bn > 0) {
            const ve = bn / 10 ** Number(dec)
            bb = Number(ve).toFixed(3);
          }
          array.push(o + ', ' + bb + sym)

          setResult(array.join('\n'))
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const o = data[i]
        if (web3.utils.isAddress(o)) {
          const b = await web3.eth.getBalance(o)
          let bb = '0'
          if (b > 0) {
            const ve = web3.utils.fromWei(b, 'ether')
            bb = Number(ve).toFixed(3);
          }
          array.push(o + ', ' + bb + 'ETH')

          setResult(array.join('\n'))
        }
      }
    }
  }

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
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">RPC Node</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={rpc} placeholder="Enter the eth rpc node"
                onChange={(e) => setRPC(e.target.value)}
              />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(rpc)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Token Contract Address</label>
            <div className="relative">
              <input id="npm-install-copy-text" type="text" className="col-span-6 bg-gray-50 border-[1.5px] border-stroke text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-form-input dark:border-form-strokedark dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={erc} placeholder="For eth leave blank or other token contract address"
                onChange={(e) => setERC(e.target.value)}
              />
              <button data-copy-to-clipboard-target="npm-install-copy-text" className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/30 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-primary border" onClick={() => handleCopy(erc)}>
                <span id="default-message" className="inline-flex items-center">
                  <span className="text-xs font-semibold">Copy</span>
                </span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Address List</label>
            <textarea
              className="font-mono w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={original}
              placeholder="Enter your eth addresses."
              rows={6}
              onChange={handleOriginalChange}
            ></textarea>
          </div>

          <div className="mb-4 flex item-center">
            <div className="flex flex-grow item-center">
              <button
                className="rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90 mr-6"
                onClick={handleBulkQuery}
              >
                Bulk Query
              </button>
              <button
                className="rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
                onClick={() => {handleCopy(result)}}
              >
                Copy
              </button>
            </div>
            <button
              className="rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
              onClick={() => setOriginal('')}
            >
              Clear 
            </button>
          </div>

          <div className="mb-4">
            <textarea
              className="font-mono w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="result will appear here."
              value={result}
              rows={6}
              disabled
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
