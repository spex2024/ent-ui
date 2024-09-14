'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { toast } from "react-hot-toast";
import useAuth from "@/hook/auth";

// Zod schema with optional email
const schema = z.object({
    company: z.string().nonempty('Company name is required'),
    location: z.string().nonempty('Location is required'),
    email: z.string().optional(),  // Marked as optional
    phone: z.string().nonempty('Phone number is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Password is required'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Confirm Password is required'),
    owner: z.string().nonempty('Owner name is required'),
    profilePhoto: z.any().refine((file) => file && file.length > 0, 'Profile photo is required'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type SignUpFormInputs = z.infer<typeof schema>;

const VendorForm: React.FC = () => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<SignUpFormInputs>({
        resolver: zodResolver(schema),
    });

    const { addVendor, success, error } = useAuth();

    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        const formData = new FormData();
        formData.append('company', data.company);
        formData.append('location', data.location);
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        formData.append('owner', data.owner);

        // Only append email if it's provided
        if (data.email) {
            formData.append('email', data.email);
        }

        if (data.profilePhoto && data.profilePhoto[0]) {
            formData.append('profilePhoto', data.profilePhoto[0]);
        } else {
            console.error('No file selected or file length is zero');
        }

        try {
            await addVendor(formData);
            reset();
        } catch (error) {
            console.error('There was an error uploading the image:', error);
        }
    };

    const profilePhoto = watch('profilePhoto');

    const inputClass = 'w-full flex-1 appearance-none border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 text-sm focus:outline-none';
    const errorClass = 'text-red-500';

    return (
        <div className="w-full flex flex-wrap">
            <div className="flex w-full min-h-screen flex-col">
                <div className="mx-auto my-auto flex flex-col justify-center pt-5 md:justify-start md:px-4 md:pt-0 mt-5 lg:w-[30rem]">
                    <h2 className="font-bold text-xl">Add Vendor</h2>
                    <form className="flex flex-col gap-2 pt-3 md:pt-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col pt-4">
                            <input type="text" {...register('company')} className={inputClass} placeholder="Vendor / Restaurant" />
                            {errors.company && <p className={errorClass}>{errors.company.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="text" {...register('location')} className={inputClass} placeholder="Location" />
                            {errors.location && <p className={errorClass}>{errors.location.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="email" {...register('email')} className={inputClass} placeholder="john@gcb.org" />
                        </div>
                        <div className="flex flex-col pt-4">
                            <input type="tel" {...register('phone')} className={inputClass} placeholder="Phone" />
                            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
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
                            <input type="text" {...register('owner')} className={inputClass} placeholder="Owner" />
                            {errors.owner && <p className={errorClass}>{errors.owner.message}</p>}
                        </div>
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="shrink-0">
                                <img
                                    id='preview_img'
                                    className="h-10 w-10 object-cover rounded-full border-2 border-black"
                                    src={profilePhoto?.length ? URL.createObjectURL(profilePhoto[0]) : 'https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png'}
                                    alt="Current profile photo"
                                />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setValue('profilePhoto', e.target.files);
                                        }
                                    }}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                />
                            </label>
                        </div>
                        <button type="submit" className="mt-10 w-[30%] bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition">
                            Add Vendor
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VendorForm;
