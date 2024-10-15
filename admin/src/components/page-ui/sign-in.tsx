'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuth from "@/hook/auth"
import { useEffect } from "react"
import toast from 'react-hot-toast'
import { motion } from "framer-motion"

// Define the schema using Zod
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const { login, success, error } = useAuth()
    useEffect(() => {
        if (success) {
            toast.success(success)
        } else if (error) {
            toast.error(error)
        }
    }, [success, error])

    const onSubmit = async (data: LoginFormValues) => {
        await login(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541196/spex_jrkich.jpg')"
        }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-0 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-white">Admin Login</CardTitle>
                        <CardDescription className="text-zinc-200">
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-zinc-200">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin"
                                {...register("username")}
                                className="bg-white bg-opacity-20 border-0 placeholder-zinc-400 text-white"
                                aria-invalid={errors.username ? "true" : "false"}
                            />
                            {errors.username && (
                                <p className="text-red-300 text-sm">{errors.username.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-200">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="bg-white bg-opacity-20 border-0 placeholder-zinc-400 text-white"
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && (
                                <p className="text-red-300 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-[#71bc44] hover:bg-[#5fa439] text-white"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Sign in
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}