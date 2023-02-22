import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractData from "../contracts/contractConfig.json";

type FormValues = {
  amount: number;
  tokenAddress: string;
  recipientAddress: string;
};

export default function StartFund() {
  // const [startInputs, setInputs] = useState<FormValues>()
  // console.log(startInputs)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  //below statementhelps us not use the usestate hooks
  const startInputs = getValues();

  const config1: any = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "initFund", // start fund
    args: [
      startInputs.amount,
      startInputs.tokenAddress,
      startInputs.recipientAddress,
    ],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { write, isLoading, isSuccess } = useContractWrite(config1);

  return (
    <div className="flex justify-center align-center">
      <p>start fund or init function</p>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount :
            </label>
            <input
              className="w-full border-gray-400 p-2 rounded-lg"
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Token Address :
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-lg"
              placeholder="tokenAddress"
              {...register("tokenAddress", {
                required: true,
                minLength: 30,
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipient Address :
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-lg"
              placeholder="recipientAddress"
              {...register("recipientAddress", {
                required: true,
                minLength: 30,
              })}
            />
            {errors.recipientAddress && (
              <div className="flex justify-left align-center">
                <CiWarning color="red" size={35} />
                <p>Token Recipient is Required </p>
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
            Initiate Fundraise
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction Done</div>}
        </div>
      </div>
    </div>
  );
}

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { useState } from "react";

// interface FormData  {
//   firstName: string;
//   lastName: string;
// };

// export default function StartFund() {
// const [amount, setamount] = useState<number>(0)

//   const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
//   const onSubmit = handleSubmit(data => console.log(data));
//   // firstName and lastName will have correct type

//   return (
//     <form onSubmit={onSubmit}>
//       <label>First Name</label>
//       <input {...register("firstName")} />
//       <label>Last Name</label>
//       <input {...register("lastName")} />
//       <button type="button"
//         onClick={() => {setValue("lastName", "name") }}
//       >
//         SetValue
//       </button>
//     </form>
//   );
// }

// // other code

// import { useForm, SubmitHandler } from "react-hook-form";

// interface IFormInputs {
//   firstName: string
//   lastName: string
// }

// const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

//  function App() {
//   const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName", { required: true })} />
//       {errors.firstName && "First name is required"}
//       <input {...register("lastName", { required: true })} />
//       {errors.lastName && "Last name is required"}
//       <input type="submit" />
//     </form>
//   );
// }

// // more code

// import { useForm } from 'react-hook-form'
// import "./App.css";

// type Profile = {
//   firstName: string
//   lastName: string
//   age: number
// }

// function App() {
//   const {register, handleSubmit, errors} = useForm<Profile>()

//   const onSubmit = handleSubmit((data) => {
//     alert(JSON.stringify(data))
//   })

//   return (
//     <main>
//     <form onSubmit={onSubmit}>
//       <div>
//         <label htmlFor="firstname">First Name</label>
//         <input {...register("firstName", { required: true })} id="firstname" name="firstname" type="text"/>
//         {
//           errors.firstname && <div className="error">Enter your name</div>
//         }
//       </div>
//       <div>
//         <label htmlFor="lastname">Last Name</label>
//         <input {...register("lastName", { required: true })} id="lastname" name="lastname" type="text"/>
//         {
//           errors.lastname && <div className="error">Enter your last name</div>
//         }
//       </div>
//       <div>
//         <label htmlFor="age">Age</label>
//         <input {...register("age", { required: true })} id="age" name="age" type="number"/>
//         {
//           errors.age && <div className="error">Enter your age</div>
//         }
//       </div>
//       <button type="submit">Save</button>
//     </form>
//     </main>
//   );
// }
