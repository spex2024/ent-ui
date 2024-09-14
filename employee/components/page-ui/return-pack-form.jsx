"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@nextui-org/react";
import toast from "react-hot-toast";

import useAuth from "../../app/hook/auth";
import useUserStore from "../../app/store/profile"; // Use only the components you need

// Define the Zod schema for validation
const returnPackSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(100, "Code must be less than 100 characters"),
});

export default function ReturnPackForm() {
  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(returnPackSchema),
  });
  const { returnPack, success, error } = useAuth();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Replace with your API call
      await returnPack(data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Check if the pack status is pending or the success state is true
  const isButtonDisabled = user?.pack?.status === "pending" || success;

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          {...register("code")}
          isRequired
          aria-invalid={errors.code ? "true" : "false"}
          label="Pack Code"
          placeholder="Enter the pack code"
        />
        {errors.code && (
          <span className="text-red-500">{errors.code.message}</span>
        )}
      </div>
      <Button
        className="w-[70%] rounded-none bg-black mt-2"
        color="primary"
        isDisabled={isButtonDisabled} // Disable the button conditionally
        type="submit"
      >
        Return Pack Request
      </Button>
    </form>
  );
}
