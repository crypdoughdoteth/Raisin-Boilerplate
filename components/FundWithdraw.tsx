import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import contractData from "../contracts/contractConfig.json";

type FormValues = {
  tokenAddress: string;
  index: number;
};

export default function FundWithdraw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  //below statement helps us not use the usestate hooks
  const donationInputs = getValues();

  // here 0 is the input of donateToken which is default value when you make the function payable
  const config: any = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "fundWithdraw",
    args: [donationInputs.tokenAddress, donationInputs.index],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  return (
    <div className="flex justify-center align-center">
      <p>Fund Withdraw</p>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              TokenAddress :
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Token Address"
              {...register("tokenAddress", {
                required: true,
                minLength: 30,
              })}
            />
            {errors.tokenAddress && (
              <div className="flex justify-left align-center">
                <CiWarning color="red" size={35} />
                <p> TokenAddress is Required </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Index :
            </label>
            <input
              type="number"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="index"
              {...register("index", {
                required: true,
                valueAsNumber: true,
              })}
            />
            {errors.index && (
              <div className="flex justify-left align-center">
                <CiWarning color="red" size={35} />
                <p>Index is Required </p>
              </div>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit details
          </button>
        </form>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!write}
            onClick={() => write?.()}
          >
            FundWithdraw
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction Done</div>}
        </div>
      </div>
    </div>
  );
}
