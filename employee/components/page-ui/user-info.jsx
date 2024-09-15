"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Minus } from "lucide-react";

import useAuth from "../../app/hook/auth";
import useUserStore from "../../app/store/profile";

const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  profilePhoto: z
    .any()
    .refine((file) => !file || (file && file.length > 0), "Profile photo is optional"),
});

const UpdateProfile = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { updateProfile, success, error } = useAuth();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        profilePhoto: null, // No default profile photo; handle this differently if needed
      });
    }
  }, [user, reset]);

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

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (data.profilePhoto && data.profilePhoto[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    const userId = user._id

    try {
      console.log("Submitting form data:", formData, userId);
      await updateProfile(userId,formData);
      reset();
    } catch (error) {
      console.error("There was an error updating the profile:", error);
    }
  };

  const profilePhoto = watch("profilePhoto");

  const inputClass =
    "w-full flex-1 appearance-none border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 text-sm focus:outline-none dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-400";
  const errorClass = "text-red-500";

  return (
    <div className="w-[60%] flex flex-col flex-wrap dark:text-neutral-300">
      <div className="flex w-full min-h-screen flex-col md:w-1/3">
        <div className="mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-4 md:pt-0 mt-20 lg:w-[30rem]">
          <form
            className="flex flex-col gap-2 pt-3 md:pt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex items-center justify-center text-lg capitalize">
              <Minus size={28} strokeWidth={0.75} />
              <p>Update Profile</p>
              <Minus size={28} strokeWidth={0.75} />
            </div>
            <div className="w-full flex flex-col pt-4">
              <input
                type="text"
                {...register("firstName")}
                className={inputClass}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col pt-4">
              <input
                type="text"
                {...register("lastName")}
                className={inputClass}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName.message}</p>
              )}
            </div>
            <div className="flex flex-col pt-4">
              <input
                type="email"
                {...register("email")}
                className={inputClass}
                placeholder="Email"
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col pt-4">
              <input
                type="tel"
                {...register("phone")}
                className={inputClass}
                placeholder="Phone"
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover rounded-full border-2 border-black"
                  id="preview_img"
                  src={
                    profilePhoto?.length
                      ? URL.createObjectURL(profilePhoto[0])
                      : user?.profilePhoto ||
                      "https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
                  }
                 alt={'profile'}/>
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  {...register("profilePhoto")}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </label>
            </div>
            <button
              className="mt-8 w-[50%] bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition dark:bg-neutral-900 dark:border-neutral-400 dark:text-neutral-300"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
