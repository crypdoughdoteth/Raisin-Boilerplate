import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// import Iframe from 'react-iframe'
import contractData from "../contracts/contractConfig.json";
import config2 from "../contracts/contractConfig2.json";
import { useEffect, useState } from "react";
import InitForm from "./startfund";

// const ethers = require('ethers');
// const Web3 = require('web3');

// import { getProvider, fetchSigner } from '@wagmi/core'

// const RaisinCore ={
//     address: config.address,
//     abi: config.abi
//   }

// const TestToken={
//       address: config2.address,
//       abi: config2.abi
//   }

export default function NextPage() {
    const [index, setIndex] = useState<number>(0);
    const [totalfund, totalFundsetIndex] = useState<number>(0);

  // const web3 = new Web3("https://goerli.infura.io/v3/c95a5dc971344128912ea7a153df503b");

  // let contract = new web3.eth.Contract(RaisinCore.abi, RaisinCore.address);
  // const amount_big = contract.methods.getFundBal(0).call();
  // console.log(amount_big);
  // useEffect( () => {
  //    setBal(amount_big);
  // }, []);
  interface Response {
    data: any;
    isSuccess: boolean;
  }

  const response: Response = useContractRead({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "getFundBal",
    args: [0],
    onError(error) {
      console.log("Error", error);
    },
  });
  

    const config1 : any  = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "endFund",
    args: [totalfund],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { data: useContractWriteData, write } = useContractWrite(config1);

//   const { data: useWaitForTransactionData, isSuccess } = useWaitForTransaction({
//     hash: useContractWriteData?.hash,
//   });

  useEffect(() => {
    console.log("__________________________");
    console.log("response.data", parseInt(response.data._hex));
    console.log("useContractWriteData", useContractWriteData);
    console.log("__________________________");
  }, [response.data,useContractWriteData]);

  return (
    <div className="flex flex-col bg-gray-800">
      {/* <div className="navbar bg-base-100">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Raisin
        </Link>
        <div className="absolute right-0 px-10 py-10">
        <ConnectButton />
        </div>
      </div> */}

      <div>
        <div className="flex justify-center shadow-xl">
          <div className="carousel h-1/2 w-1/2 m-5">
            <div id="item1" className="carousel-item w-full">
              <img
                src="https://cc0.photo/wp-content/uploads/2022/03/River-flowing-over-stone-stairs-in-sun-980x735.jpg"
                className="w-full"
              />
            </div>
            <div id="item2" className="carousel-item w-full">
              <img
                src="https://cc0.photo/wp-content/uploads/2022/02/New-York-skyline-in-October-2017-980x656.jpg"
                className="w-full"
              />
            </div>
            <div id="item3" className="carousel-item w-full">
              <img
                src="https://cc0.photo/wp-content/uploads/2017/03/Guy-painting-on-John-Lennon-wall-980x656.jpg"
                className="w-full"
              />
            </div>
            <div id="item4" className="carousel-item w-full">
              <img
                src="https://cc0.photo/wp-content/uploads/2015/11/Abstract-traffic-lights-980x651.jpg"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </div>
      <div>      {/*  endFund function  */}
                
                <p>Enter the index to end fund </p>
                <input
                  onChange={(e: any) => setIndex(e.target.value)}
                  type="number"
                />
                <button
                  disabled={!write}
                  onClick={() => {
                    write?.();
                  }}
                >
                  End Fund
                </button></div>
                 {/*  endFund function  */}
      <div className="flex shadow-xl self-center mt-20 h-2/4 w-2/4">
        <iframe
          width="1440"
          height="620"
          src="https://www.youtube.com/embed/chMuhzkyfgQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <p>init function with three inputs amount , tokenaddress and recipient address</p>
        
        {/* <InitForm    totalfund= {totalfund}
                     tokenAddress="number"
                     recipientAddress="number" 
        /> */}
       
        </div>

      <div className="flex flex-row justify-center md:space-x-10 mt-10">
        <div className="card w-1/2 bg-base-100 shadow-xl justify-start">
          
          <div className="card-body">
            <h2 className="card-title">Welcome to Our Cause!</h2>
            <p className="text-xl">
              « Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
              eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              Quis aute iure reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. »
            </p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl text-center max-w-sm max-h-sm">
          <div className="card-body m-5">
            <div className="flex flex-col">
              <div className="flex flex-col card-actions m-5">
                <div className="stat">
                 
                  <div className="stat-title">Fundraising Goal</div>
                  <div className="stat-value">$89,400</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Current Balance</div>
                  {response.isSuccess && (<div>{parseInt(response.data._hex)}</div>)}
            
          
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Donate USDC"
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                  <button className="btn btn-primary mt-5">Donate</button>
                  <div className="flex flex-row justify-center mt-5 space-x-5">
                    <button className="btn btn-sm">Approve</button>
                    <button className="btn btn-sm">Refund</button>
                    <button className="btn btn-sm">End Fund</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-40">
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p className="text-xl">Thank You So Much For Visiting! 💕</p>
        </div>
      </footer>
    </div>
    </div>
  );
}
