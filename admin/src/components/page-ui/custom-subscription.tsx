'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Trash2, Plus, Loader2, Users, CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import {toast} from "react-hot-toast"

const CediIcon = () => (
    <span className="text-gray-500 font-semibold text-lg">₵</span>
)

const subscriptionSchema = z.object({
    plan: z.string().min(1, 'Plan name is required'),
    price: z.number().positive('Price must be a positive number'),
    staff: z.number().min(1, 'At least 1 staff is required'),
    features: z.array(z.string().min(1, 'Feature is required')).min(1, 'At least one feature is required'),
    installmentDuration: z.number().min(1, 'Installment duration is required'),
})

type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>

export default function Component() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formProgress, setFormProgress] = useState(0)
    const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<SubscriptionFormInputs>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            plan: '',
            price: undefined,
            staff: undefined,
            features: [''],
            installmentDuration: 3,
        },
    })

    const price = watch('price')
    const installmentDuration = watch('installmentDuration')

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                const progress = Object.values(value).filter(Boolean).length / Object.keys(value).length * 100
                setFormProgress(Math.round(progress))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const baseurl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://api.spexafrica.app';

    const calculateMonthlyPayment = (totalPrice: number, duration: number) => {
        return (totalPrice / duration).toFixed(2)
    }

    const onSubmit = async (data: SubscriptionFormInputs) => {
        setIsSubmitting(true)
        try {
            const url = `${baseurl}/api/subscriptions/add/installment`

            const monthlyPayment = calculateMonthlyPayment(data.price, data.installmentDuration)

            const dataToSend = {
                ...data,
                monthlyPayment: monthlyPayment
            }

            const response = await axios.post(url, dataToSend)
            console.log(response.data)
            toast.success('Subscription plan created successfully!')
            reset()
        } catch (error) {
            console.error('Failed to add subscription:', error)
            toast.error('Failed to create subscription plan. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardHeader className="space-y-1 bg-[#71bc44] text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Create Installment Subscription Plan</CardTitle>
                <CardDescription className="text-white/80">Design a new installment-based subscription plan for your service</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                        <Progress value={formProgress} className="w-full" />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="plan">Plan Name</Label>
                                <Input
                                    id="plan"
                                    placeholder="Enter plan name"
                                    {...register('plan')}
                                    className="border-[#71bc44] focus:ring-[#71bc44]"
                                />
                                {errors.plan && <p className="text-sm text-red-500">{errors.plan.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Total Price (₵)</Label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <CediIcon />
                                    </div>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...register('price', { valueAsNumber: true })}
                                        className="pl-8 border-[#71bc44] focus:ring-[#71bc44]"
                                    />
                                </div>
                                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="installmentDuration">Installment Duration (Months): {installmentDuration}</Label>
                                <Controller
                                    name="installmentDuration"
                                    control={control}
                                    render={({ field }) => (
                                        <Slider
                                            min={1}
                                            max={12}
                                            step={1}
                                            value={[field.value || 0]}
                                            onValueChange={(value) => field.onChange(value[0])}
                                        />
                                    )}
                                />
                            </div>
                            <div className="p-6 bg-gradient-to-r from-[#71bc44] to-[#5a9d35] rounded-md text-white">
                                <p className="text-lg font-medium">Monthly Payment:</p>
                                <p className="text-4xl font-bold">₵ {calculateMonthlyPayment(price || 0, installmentDuration || 1)}</p>
                                <p className="text-sm mt-2">For {installmentDuration} month{installmentDuration > 1 ? 's' : ''}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="staff">Number of Staff</Label>
                            <div className="relative flex items-center">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="staff"
                                    type="number"
                                    placeholder="1"
                                    {...register('staff', { valueAsNumber: true })}
                                    className="pl-10 border-[#71bc44] focus:ring-[#71bc44]"
                                />
                            </div>
                            {errors.staff && <p className="text-sm text-red-500">{errors.staff.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Features</Label>
                            <Controller
                                name="features"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        {field.value.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Enter a feature"
                                                    value={feature}
                                                    onChange={(e) => {
                                                        const newFeatures = [...field.value]
                                                        newFeatures[index] = e.target.value
                                                        field.onChange(newFeatures)
                                                    }}
                                                    className="flex-grow border-[#71bc44] focus:ring-[#71bc44]"
                                                />
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => {
                                                                    const newFeatures = field.value.filter((_, i) => i !== index)
                                                                    field.onChange(newFeatures)
                                                                }}
                                                                aria-label="Remove feature"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Remove feature</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => field.onChange([...field.value, ''])}
                                            className="mt-2 border-[#71bc44] text-[#71bc44] hover:bg-[#71bc44] hover:text-white"
                                        >
                                            <Plus className="h-4 w-4 mr-2" /> Add Feature
                                        </Button>
                                    </div>
                                )}
                            />
                            {errors.features && <p className="text-sm text-red-500">{errors.features.message}</p>}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full bg-[#71bc44] hover:bg-[#5a9d35] text-white"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Plan...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Create Subscription Plan
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}