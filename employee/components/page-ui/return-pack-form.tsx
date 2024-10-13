"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Package, ArrowRight, Loader2, BarcodeIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/app/hook/auth";
import useUserStore from "@/app/store/profile";

const returnPackSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(100, "Code must be less than 100 characters"),
});

type FormValues = z.infer<typeof returnPackSchema>;

export default function ReturnPackForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(returnPackSchema),
    defaultValues: {
      code: "",
    },
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

  const onSubmit = async (data: FormValues) => {
    try {
      await returnPack(data);
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const isButtonDisabled = !!(user?.pack?.status === "pending" || success);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-[#71bc44]">
          Return Pack
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter the pack code to initiate the return process.
        </p>
      </div>
      <Separator className="bg-[#71bc44]/20" />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#71bc44]">Pack Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BarcodeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#71bc44]" />
                    <Input
                      className="pl-10 border-[#71bc44] focus:ring-[#71bc44] focus:border-[#71bc44]"
                      placeholder="Enter the pack code"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-[#71bc44] hover:bg-[#5da438] text-white"
            disabled={isButtonDisabled}
            type="submit"
          >
            {isButtonDisabled ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Package className="mr-2 h-4 w-4" />
            )}
            Return Pack Request
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
      {user?.pack?.status === "pending" && (
        <div className="p-3 bg-[#71bc44]/10 border border-[#71bc44]/20 rounded-md">
          <p className="text-sm text-[#71bc44] flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Your pack return request is pending. Please wait for confirmation.
          </p>
        </div>
      )}
      {success && (
        <div className="p-3 bg-[#71bc44]/10 border border-[#71bc44]/20 rounded-md">
          <p className="text-sm text-[#71bc44] flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Pack return request submitted successfully.
          </p>
        </div>
      )}
    </div>
  );
}
