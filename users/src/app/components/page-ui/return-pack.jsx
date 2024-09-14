'use client'

import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '@nextui-org/react';
import useAuth from "@/app/hook/auth";
import toast from "react-hot-toast"; // Use only the components you need

// Define the Zod schema for validation
const returnPackSchema = z.object({
    code: z.string().min(1, "Code is required").max(100, "Code must be less than 100 characters"),
});

export default function ReturnPackForm() {
    // Initialize the form with React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(returnPackSchema),
    });
    const { returnPack,success ,error } = useAuth();
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
            await returnPack(data)

        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-4">
                <Input
                    {...register('code')}
                    label="Pack Code"
                    placeholder="Enter the pack code"
                    isRequired
                    aria-invalid={errors.code ? "true" : "false"}
                />
                {errors.code && <span className="text-red-500">{errors.code.message}</span>}
            </div>
            <Button type="submit" color="primary" className="w-[70%] rounded-none bg-black mt-2">
                Submit Pack Request
            </Button>
        </form>
    );
}
