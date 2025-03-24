"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trash2, Plus, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

const subscriptionSchema = z.object({
    plan: z.enum(["Gold", "Silver", "Bronze",'Demo'], { required_error: "Plan is required" }),
    pricePerHead: z.number().min(0, "Price per head must be a positive number"),
    features: z.array(z.string().min(1, "Feature is required")).min(1, "At least one feature is required"),
})

type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>

export default function SubscriptionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SubscriptionFormInputs>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            plan: "Bronze",
            pricePerHead: 0,
            features: [""],
        },
    })

    const baseurl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8080"
            : typeof window !== "undefined" && window.location.hostname.endsWith(".site")
                ? "https://api.spexafrica.site"
                : "https://api.spexafrica.app"

    const onSubmit = async (data: SubscriptionFormInputs) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post(`${baseurl}/api/subscriptions/add`, data)
            console.log(response.data)
            reset()
        } catch (error) {
            console.error("Failed to add subscription:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-none" style={{ backgroundColor: "#71bc44" }}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">Add Subscription Plan</CardTitle>
                <CardDescription className="text-white opacity-80">
                    Create a new subscription plan for your service.
                </CardDescription>
            </CardHeader>
            <CardContent className="bg-white rounded-b-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="plan">Plan</Label>
                            <Controller
                                name="plan"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="plan">
                                            <SelectValue placeholder="Select a plan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Gold">Gold</SelectItem>
                                            <SelectItem value="Silver">Silver</SelectItem>
                                            <SelectItem value="Bronze">Bronze</SelectItem>
                                            <SelectItem value="Demo">Demo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.plan && <p className="text-sm text-red-500">{errors.plan.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pricePerHead">Price Per Head (GHS)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">GHS</span>
                                    <Input
                                        id="pricePerHead"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...register("pricePerHead", { valueAsNumber: true })}
                                        className="pl-12"
                                    />
                                </div>
                                {errors.pricePerHead && <p className="text-sm text-red-500">{errors.pricePerHead.message}</p>}
                            </div>
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
                                                    className="flex-grow"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (field.value.length > 1) {
                                                            const newFeatures = field.value.filter((_, i) => i !== index)
                                                            field.onChange(newFeatures)
                                                        }
                                                    }}
                                                    disabled={field.value.length <= 1}
                                                    aria-label="Remove feature"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => field.onChange([...field.value, ""])}
                                            className="mt-2"
                                        >
                                            <Plus className="h-4 w-4 mr-2" /> Add Feature
                                        </Button>
                                    </div>
                                )}
                            />
                            {errors.features && <p className="text-sm text-red-500">{errors.features.message}</p>}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#71bc44] hover:bg-[#5a9d35]" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Subscription"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

