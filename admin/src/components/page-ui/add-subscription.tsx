'use client'

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import axios from "axios"

const subscriptionSchema = z.object({
    plan: z.string().optional(),
    price: z
        .number()
        .min(0, 'Price must be a positive number')
        .optional(), // Ensure price is a number
    paymentType: z.string().optional(),
    staff: z
        .number()
        .min(1, 'At least 1 staff is required')
        .optional(), // Ensure staff is a number, not a string
    features: z.array(z.string().min(1, 'Feature is required')).min(1, 'At least one feature is required'),
})

type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>

export default function SubscriptionForm() {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<SubscriptionFormInputs>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            features: [''], // Start with an empty string for the first feature
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    })
    const baseurl = 'https://api.spexafrica.site';
// const baseurl = "http://localhost:8080";
    const onSubmit = async (data: SubscriptionFormInputs) => {
        console.log(data)
        try {
            const response = await axios.post(`${baseurl}/api/subscriptions/add`, data)
            console.log(response.data)
            reset() // Reset the form
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error('Failed to add subscription:', error)
            // Handle error (e.g., show an error message)
        }
    }

    return (
        <Card className="w-full max-w-xl mx-auto shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                   <h2> Add Subscription Plan</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="plan">Plan Name</Label>
                        <Input
                            id="plan"
                            type="text"
                            placeholder="e.g., Basic, Pro, Enterprise"
                            {...register('plan')}
                        />
                        {errors.plan && <p className="text-sm text-red-500">{errors.plan.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 9.99"
                                {...register('price', { valueAsNumber: true })} // Ensure input value is parsed as a number
                            />
                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="paymentType">Payment Type</Label>
                            <Input
                                id="paymentType"
                                type="text"
                                placeholder="e.g., Monthly, Yearly"
                                {...register('paymentType')}
                            />
                            {errors.paymentType && <p className="text-sm text-red-500">{errors.paymentType.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="staff">Number of Staff</Label>
                        <Input
                            id="staff"
                            type="number"
                            placeholder="no. of staff"
                            {...register('staff', { valueAsNumber: true })} // Ensure input value is parsed as a number
                        />
                        {errors.staff && <p className="text-sm text-red-500">{errors.staff.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Features</Label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Enter a feature"
                                    {...register(`features.${index}`)} // Use the index directly since features are strings
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}
                        {errors.features && <p className="text-sm text-red-500">{errors.features.message}</p>}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append('')} // Append an empty string
                    >
                        <Plus className="h-4 w-4 mr-2"/> Add Feature
                    </Button>

                    <Button type="submit" className="w-full">
                        Submit Subscription
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
