import * as React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function App() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Last Name</label>
      <input {...register("lastName")} />
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo"); // ✅
          setValue("firstName", true); // ❌: true is not string
         
        }}
      >
        SetValue
      </button>
    </form>
  );
}

// other code 

import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  firstName: string
  lastName: string
}

const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

export default function App() {
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && "First name is required"}
      <input {...register("lastName", { required: true })} />
      {errors.lastName && "Last name is required"}
      <input type="submit" />
    </form>
  );
}

// more code 


import { useForm } from 'react-hook-form'
import "./App.css";

type Profile = {
  firstname: string
  lastname: string
  age: number
}

function App() {
  const {register, handleSubmit, errors} = useForm<Profile>()

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
  })

  return (
    <main>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstname">First Name</label>
        <input ref={register({ required: true })} id="firstname" name="firstname" type="text"/>
        {
          errors.firstname && <div className="error">Enter your name</div>
        }
      </div>
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input ref={register({ required: true })} id="lastname" name="lastname" type="text"/>
        {
          errors.lastname && <div className="error">Enter your last name</div>
        }
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input ref={register({ required: true })} id="age" name="age" type="text"/>
        {
          errors.age && <div className="error">Enter your age</div>
        }
      </div>
      <button type="submit">Save</button>
    </form>
    </main>
  );
}



// import React from "react";
// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// type FormValues = {
//   amount: number;
//   tokenAddress: string;
//   recipientAddress: string;
// };

// export default function InitForm() {
//   const [amount, setAmount] = useState<number>(0);
//   const [tokenAddress, setTokenAddress] = useState<string>("");
//   const [recipientAddress, setRecipientAddress] = useState<string>("");

//   const { register, handleSubmit, setValue } = useForm<FormValues>();
//   const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="number" {...register("amount", { required: "amount is required", valueAsNumber: true })} placeholder="amount"/>
//       <input {...register("tokenAddress", { required: "tokenAddress is required" })} placeholder="tokenAddress"/>
//       <input {...register("recipientAddress", { required: "recipientAddress is required" })} placeholder="recipientAddress"/>
//       <input className ="bg-green-400 rounded" onClick={() => {
//         setValue("amount",0)
//         setValue("tokenAddress", "token")
//         setValue("recipientAddress", "beneficiary")
//         }} type="submit" />
//     </form>
//   );
// }
