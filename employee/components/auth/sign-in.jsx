"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Loader2 } from "lucide-react";

import useAuth from "../../app/hook/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .nonempty("Password is required"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { login, success, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(success);
      setIsSubmitting(false);
    } else if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [success, error]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await login(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541343/hero-1_raxkds.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className=" p-8 rounded-lg shadow-none z-10 max-w-4xl w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-8 border-r border-gray-300 hidden sm:block">
          <img
            alt="spex-africa"
            className="w-40 mb-8"
            src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
          />
          <h2 className="text-4xl font-bold mb-4 text-gray-200">
            SPEX Marketplace
          </h2>
          <p className="text-lg leading-relaxed text-gray-200 mb-6">
            Join our innovative platform connecting food vendors with
            enterprises seeking sustainable packaging solutions. Together, we
            are revolutionizing the world of eco-friendly dining.
          </p>
          <p className="text-[#71bc44] font-semibold">
            Sustainable. Innovative. Connected.
          </p>
        </div>
        <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <h3 className="text-2xl font-bold mb-6 text-gray-200">Sign In</h3>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-gray-200"
                htmlFor="email"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  {...register("email")}
                  className={`pl-10 ${errors.email ? "border-red-500" : "border-gray-200"} focus:border-[#71bc44] focus:ring focus:ring-[#71bc44] focus:ring-opacity-50 placeholder:text-gray-300 text-white`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-gray-200"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : "border-gray-200"} text-white focus:border-[#71bc44] focus:ring focus:ring-[#71bc44] focus:ring-opacity-50 placeholder:text-300`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-600"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-[#71bc44] hover:underline"
                href="/password/request"
              >
                Forgot password?
              </Link>
              <Button
                className="bg-[#71bc44] text-white hover:bg-[#5a9636] transition-colors duration-300"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-300">
            Don not have an account?{" "}
            <Link
              className="text-[#71bc44] hover:underline font-medium"
              href="/register"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
