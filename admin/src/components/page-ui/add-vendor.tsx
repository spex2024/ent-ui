"use client"

import { Eye, EyeOff } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import useAuth from "@/hook/auth"

// Zod schema with optional email and without code
const schema = z
    .object({
        name: z.string().nonempty("Vendor name is required"),
        location: z.string().nonempty("Location is required"),
        email: z.string().optional(), // Optional email field
        phone: z.string().nonempty("Phone number is required"),
        password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .nonempty("Confirm Password is required"),
        owner: z.string().nonempty("Owner name is required"),
        categories: z.array(z.string()).nonempty("At least one category is required"),
        // We'll handle file validation separately
        profilePhoto: z.any(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type SignUpFormInputs = z.infer<typeof schema>

export function AddVendor() {
    const [open, setOpen] = useState(false) // Dialog open/close state
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null)
    const [profilePhotoError, setProfilePhotoError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Use the auth hook to handle backend submission
    const { addVendor, success, error } = useAuth()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            categories: ["Demo"],
        },
    })

    useEffect(() => {
        if (success) {
            toast.success(success)
            setOpen(false) // Close dialog on success
            reset() // Reset form
            setProfilePhotoFile(null)
            setShowPassword(false)
            setShowConfirmPassword(false)
        } else if (error) {
            toast.error(error)
        }
    }, [success, error, reset])

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        // Validate profile photo
        if (!profilePhotoFile) {
            setProfilePhotoError("Profile photo is required")
            return
        } else {
            setProfilePhotoError(null)
        }

        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("location", data.location)
        formData.append("phone", data.phone)
        formData.append("password", data.password)
        formData.append("confirmPassword", data.confirmPassword)
        formData.append("owner", data.owner)

        // Append each category
        data.categories.forEach((category) => {
            formData.append("categories[]", category)
        })

        if (data.email) {
            formData.append("email", data.email)
        }

        if (profilePhotoFile) {
            formData.append("profilePhoto", profilePhotoFile)
        }

        try {
            // Use the addVendor function from useAuth to submit to the backend
            await addVendor(formData)
        } catch (error) {
            console.error("Error uploading the image:", error)
        }
    }

    const selectedCategories = watch("categories") || []

    const handleCategoryChange = (value: string) => {
        const currentCategories = watch("categories") || [];

        if (currentCategories.includes(value)) {
            const filteredCategories = currentCategories.filter((cat) => cat !== value);

            // Ensure at least one category remains
            if (filteredCategories.length > 0) {
                setValue("categories", filteredCategories as [string, ...string[]]);
            }
        } else {
            setValue("categories", [value, ...currentCategories] as [string, ...string[]]);
        }
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setProfilePhotoFile(files[0])
            setProfilePhotoError(null)
        } else {
            setProfilePhotoFile(null)
            setProfilePhotoError("Profile photo is required")
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const inputClass =
        "w-full flex-1 appearance-none border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
    const errorClass = "text-red-500 text-xs mt-1"

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-10 gap-1 bg-black text-white">
                    <PlusCircledIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Vendor</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Vendor</DialogTitle>
                    <DialogDescription>Please fill out the form to add a new vendor.</DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col pt-4">
                        <input type="text" {...register("name")} className={inputClass} placeholder="Vendor / Restaurant Name" />
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col pt-4">
                        <input type="text" {...register("location")} className={inputClass} placeholder="Location" />
                        {errors.location && <p className={errorClass}>{errors.location.message}</p>}
                    </div>
                    <div className="flex flex-col pt-4">
                        <input type="email" {...register("email")} className={inputClass} placeholder="Email (optional)" />
                    </div>
                    <div className="flex flex-col pt-4">
                        <input type="tel" {...register("phone")} className={inputClass} placeholder="Phone" />
                        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                    </div>

                    {/* Password field with toggle */}
                    <div className="flex flex-col pt-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className={inputClass}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password field with toggle */}
                    <div className="flex flex-col pt-4">
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={inputClass}
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex flex-col pt-4">
                        <input type="text" {...register("owner")} className={inputClass} placeholder="Owner" />
                        {errors.owner && <p className={errorClass}>{errors.owner.message}</p>}
                    </div>

                    <div className="flex flex-col pt-4">
                        <label className="mb-2 text-sm font-medium">Subscription Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {["Gold", "Silver", "Bronze", "Demo"].map((category) => (
                                <div key={category} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category}`}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`category-${category}`} className="text-sm">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.categories && <p className={errorClass}>{errors.categories.message}</p>}
                    </div>

                    <div className="flex items-center space-x-6 pt-4">
                        <div className="shrink-0">
                            <img
                                className="h-10 w-10 object-cover rounded-full border-2 border-black"
                                src={
                                    profilePhotoFile
                                        ? URL.createObjectURL(profilePhotoFile)
                                        : "https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
                                }
                                alt="Profile"
                            />
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                            {profilePhotoError && <p className={errorClass}>{profilePhotoError}</p>}
                        </label>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary" type="button">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="outline" className="bg-black text-white">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

