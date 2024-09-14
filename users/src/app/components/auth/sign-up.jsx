'use client'
import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import useAuth from "@/app/hook/auth";
import toast from "react-hot-toast";

const schema = z.object({
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().nonempty('Last name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Password is required'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Confirm Password is required'),
    code: z.string().nonempty('Code is required'),
    phone: z.string().nonempty('Phone number is required'),
    profilePhoto: z.any().refine((file) => file && file.length > 0, 'Profile photo is required')
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

const SignUp = () => {
    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

       const {addUser, success ,error}=useAuth()
    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        formData.append('code', data.code);
        formData.append('phone', data.phone);
        formData.append('profilePhoto', data.profilePhoto[0]);
        console.log(data.profilePhoto[0]);

        try {
            await addUser(formData)
            reset()
        } catch (error) {
            console.error('There was an error uploading the image:', error);
        }
    };

    const profilePhoto = watch('profilePhoto');

    const inputClass = 'w-full flex-1 appearance-none border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 text-sm focus:outline-none';
    const errorClass = 'text-red-500';

    return (
        <div className="flex flex-wrap">
            <div className="flex w-full min-h-screen flex-col md:w-1/3">
                <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
                    <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">SPEX.</a>
                </div>
                <div className="mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-4 md:pt-0 mt-20 lg:w-[30rem]">
                    <form className="flex flex-col gap-2 pt-3 md:pt-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col lg:flex-row gap-3">
                            <div className="flex flex-col pt-4">
                                <input type="text" {...register('firstName')} className={inputClass} placeholder="First Name" />
                                {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                            </div>
                            <div className="flex flex-col pt-4">
                                <input type="text" {...register('lastName')} className={inputClass} placeholder="Last Name" />
                                {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="email" {...register('email')} className={inputClass} placeholder="Email" />
                            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="password" {...register('password')} className={inputClass} placeholder="Password" />
                            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="password" {...register('confirmPassword')} className={inputClass} placeholder="Confirm Password" />
                            {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="text" {...register('code')} className={inputClass} placeholder="GCBHS484" />
                            {errors.code && <p className={errorClass}>{errors.code.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="tel" {...register('phone')} className={inputClass} placeholder="Phone" />
                            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                        </div>
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="shrink-0">
                                <img id='preview_img' className="h-16 w-16 object-cover rounded-full border-2 border-black" src={profilePhoto?.length ? URL.createObjectURL(profilePhoto[0]) : 'https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png'} alt="Current profile photo" />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" {...register('profilePhoto')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                            </label>
                        </div>
                        <button type="submit" className="mt-8 w-[50%]  bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ">Sign Up</button>
                    </form>
                    <div className="mt-6 w-full flex items-start  justify-start">
                        <p className="whitespace-nowrap text-gray-600 flex gap-4 w-full items-center ">
                            Already have an account?
                            <Link href={'/login'} className="underline-offset-4 font-semibold text-gray-900 underline">Sign in.</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-2/3">
                <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                    <p className="mb-8 text-3xl font-semibold leading-10">SPEX is a meal marketplace that leverages a web platform/app to connect food vendors with enterprises and users seeking sustainable food packaging.</p>

                </div>
                <img className="absolute top-0 h-full w-full object-cover opacity-40 -z-1" src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541196/spex_jrkich.jpg" alt="Background" />
            </div>
        </div>
    );
};

export default SignUp;
