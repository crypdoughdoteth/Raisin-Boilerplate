import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  amount: number;
  tokenAddress: string;
  recipientAddress: string;
};

export default function InitForm() {
  const [amount, setAmount] = useState<number>(0);
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...register("amount", { required: "amount is required", valueAsNumber: true })} placeholder="amount"/>
      <input {...register("tokenAddress", { required: "tokenAddress is required" })} placeholder="tokenAddress"/>
      <input {...register("recipientAddress", { required: "recipientAddress is required" })} placeholder="recipientAddress"/>
      <input className ="bg-green-400 rounded" onClick={() => {
        setValue("amount",0)
        setValue("tokenAddress", "token")
        setValue("recipientAddress", "beneficiary")
        }} type="submit" />
    </form>
  );
}
