"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Phone,
  Hash,
  Upload,
  X,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import useAuth from "../../app/hook/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Confirm Password is required"),
    code: z.string().nonempty("Code is required"),
    phone: z.string().nonempty("Phone number is required"),
    profilePhoto: z
      .any()
      .refine((file) => file && file.length > 0, "Profile photo is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { addUser, success, error } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("code", data.code);
    formData.append("phone", data.phone);
    formData.append("profilePhoto", data.profilePhoto[0]);

    try {
      await addUser(formData);
      reset();
      setPreviewUrl(null);
    } catch (error) {
      console.error("There was an error uploading the image:", error);
    }
  };

  const profilePhoto = watch("profilePhoto");

  useEffect(() => {
    if (profilePhoto && profilePhoto.length > 0) {
      const file = profilePhoto[0];

      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [profilePhoto]);

  const removePhoto = () => {
    setValue("profilePhoto", null);
    setPreviewUrl(null);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-4"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541196/spex_jrkich.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center mb-6">
              <img
                alt="spex-africa"
                className="w-24 mb-4 hover:scale-105 transition-transform duration-300"
                src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
              />
              <h2 className="text-2xl font-bold text-white text-center">
                Join SPEX
              </h2>
              <p className="text-white text-center mt-2">
                Revolutionize sustainable food packaging
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "firstName",
                    label: "First Name",
                    placeholder: "John",
                    icon: User,
                  },
                  {
                    name: "lastName",
                    label: "Last Name",
                    placeholder: "Doe",
                    icon: User,
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <Label className="sr-only" htmlFor={field.name}>
                      {field.label}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        {...register(field.name)}
                        className={`pl-10 bg-white/20 border-white/30 text-white placeholder-white/50 ${
                          errors[field.name] ? "border-red-500" : ""
                        } placeholder:text-gray-100`}
                        placeholder={field.placeholder}
                      />
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    </div>
                    {errors[field.name] && (
                      <p className="text-red-300 text-xs mt-1">
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {[
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "john@example.com",
                  icon: Mail,
                },
                {
                  name: "password",
                  label: "Password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  icon: Lock,
                },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: showConfirmPassword ? "text" : "password",
                  placeholder: "••••••••",
                  icon: Lock,
                },
                {
                  name: "code",
                  label: "Code",
                  placeholder: "GCBHS484",
                  icon: Hash,
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "tel",
                  placeholder: "+233 000 000 000",
                  icon: Phone,
                },
              ].map((field) => (
                <div key={field.name}>
                  <Label className="sr-only" htmlFor={field.name}>
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field.name}
                      type={field.type}
                      {...register(field.name)}
                      className={`pl-10 pr-10 bg-white/20 border-white/30 text-white  ${
                        errors[field.name] ? "border-red-500" : ""
                      } placeholder:text-gray-100`}
                      placeholder={field.placeholder}
                    />
                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    {(field.name === "password" ||
                      field.name === "confirmPassword") && (
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50"
                        type="button"
                        onClick={() =>
                          field.name === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {(field.name === "password" && showPassword) ||
                        (field.name === "confirmPassword" &&
                          showConfirmPassword) ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-300 text-xs mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <Label className="sr-only" htmlFor="profilePhoto">
                  Profile Photo
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      alt="Profile preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                      src={
                        previewUrl ||
                        "https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
                      }
                    />
                    {previewUrl && (
                      <button
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        type="button"
                        onClick={removePhoto}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="w-[40%] flex items-center justify-center px-4 py-2 border border-white/30 rounded-md shadow-sm text-sm font-medium text-white bg-white/20 hover:bg-white/30 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#71bc44] cursor-pointer transition-colors duration-200">
                    <label className="flex">
                      <Upload className="w-5 h-5 mr-2 text-white" />
                      <span>{previewUrl ? "Change" : "Upload"}</span>
                      <Input
                        id="profilePhoto"
                        type="file"
                        {...register("profilePhoto")}
                        className="sr-only"
                        onChange={(e) => {
                          register("profilePhoto").onChange(e);
                          if (e.target.files && e.target.files[0]) {
                            setPreviewUrl(
                              URL.createObjectURL(e.target.files[0]),
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                {errors.profilePhoto && (
                  <p className="text-red-300 text-xs mt-1">
                    {errors.profilePhoto.message}
                  </p>
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSubmitting ? "submitting" : "idle"}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    className="w-full bg-[#71bc44] text-white hover:bg-[#5a9636] transition-colors duration-200 relative overflow-hidden"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <motion.div
                      animate={isSubmitting ? { x: "100%" } : { x: 0 }}
                      className="absolute inset-0 bg-[#5a9636]"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    />
                    <motion.span
                      animate={{ opacity: isSubmitting ? 0 : 1 }}
                      className="relative z-10"
                      transition={{ duration: 0.2 }}
                    >
                      Sign Up
                    </motion.span>
                    <motion.div
                      animate={{ opacity: isSubmitting ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                      transition={{ duration: 0.2 }}
                    >
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </motion.div>
                  </Button>
                </motion.div>
              </AnimatePresence>
            </form>
            <p className="mt-6 text-center text-sm text-white">
              Already have an account?{" "}
              <Link
                className="text-[#71bc44] hover:text-[#5a9636] font-medium transition-colors duration-200"
                href="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
