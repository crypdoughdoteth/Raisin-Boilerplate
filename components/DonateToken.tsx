import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import contractData from "../contracts/contractConfig.json";

type FormValues = {
  amount: number;
  tokenAddress: string;
  recipientAddress: string;
};

export default function DonateToken() {
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
   console.log(data)
  };
  //below statement helps us not use the usestate hooks
  const donationInputs = getValues()
 
  

    const config : any  = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "initFund",
    args: [donationInputs.amount, donationInputs.tokenAddress, donationInputs.recipientAddress],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  return (
   <div className="flex justify-center align-center">
    <div className="w-full max-w-xs">
    <form className ="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >Amount :</label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Amount"
        type="number"
        {...register("amount", {
          required: true,
          valueAsNumber: true,
        })}
      />
      {errors.amount && (
        <div className="flex justify-left align-center">          
            <CiWarning color="red" size={35} />               
            <p> Amount is Required </p>  
        </div>
      )}
      </div>

      <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Token Address :</label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="tokenAddress"
        {...register("tokenAddress", {
          required: true,
          minLength : 30
        })}
      />
      {errors.tokenAddress && (
        <div className="flex justify-left align-center"> 
          <CiWarning color="red" size={35} />
          <p>Token Address is Required </p>
          </div>
        
        
      )}
      </div>

      <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Recipient Address :</label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="recipientAddress"
        {...register("recipientAddress", {
          required: true,
          minLength : 30
        })}
      />
      {errors.recipientAddress && (
        <div className="flex justify-left align-center">    
            <CiWarning color="red" size={35} />      
            <p>Token Recipient is Required  </p>
        </div>
      )}
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit details
      </button>
    </form>
    
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!write} onClick={() => write?.()}>
        Initiate Fundraise
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction Done</div>}
     </div>
    </div>

    </div>
  );
}
