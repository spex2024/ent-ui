'use client'

import React, { useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import useSelectedMealStore from "@/app/store/selection"
import useCartStore from "@/app/store/cart"
import toast from "react-hot-toast";

export default function MealModal() {
  const { selectedMeal, closeModal, handleOptionChange, selectedOptions } = useSelectedMealStore()
  const { submitOrder, success, error } = useCartStore()

  useEffect(() => {
    if (success) {
      toast.success(success)
      setTimeout(() => {
        // window.location.reload()
      }, 3000)
    } else if (error) {
      toast.error(error)
      setTimeout(() => {
        // window.location.reload()
      }, 3000)
    }
  }, [success, error])

  const placeOrder = (selectedMeal, selectedOptions) => {
    submitOrder(selectedMeal, selectedOptions)
  }

  if (!selectedMeal) return null

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        >
          <div
              className="h-48 rounded-t-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedMeal?.imageUrl})` }}
          />
          <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">{selectedMeal.main.name}</h2>
            <OptionSection
                title="Protein"
                options={selectedMeal.protein}
                selectedOption={selectedOptions["protein"]}
                onOptionChange={(value) => handleOptionChange("protein", value)}
            />
            <OptionSection
                title="Sauce"
                options={selectedMeal.sauce}
                selectedOption={selectedOptions["sauce"]}
                onOptionChange={(value) => handleOptionChange("sauce", value)}
            />
            <OptionSection
                title="Extras"
                options={selectedMeal.extras}
                selectedOption={selectedOptions["extras"]}
                onOptionChange={(value) => handleOptionChange("extras", value)}
            />
            <div className="flex justify-center pt-4">
              <button
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors"
                  onClick={() => {
                    placeOrder(selectedMeal, selectedOptions)
                    closeModal()
                  }}
              >
                Place Order
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
  )
}

function OptionSection({ title, options, selectedOption, onOptionChange }) {
  return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <RadioGroup value={selectedOption || ""} onValueChange={onOptionChange}>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                  <RadioGroupItem id={`${title}-${index}`} value={option.name} className="text-green-500" />
                  <label htmlFor={`${title}-${index}`} className="text-sm text-gray-700 cursor-pointer">
                    {option.name}
                  </label>
                </div>
            ))}
          </div>
        </RadioGroup>
      </div>
  )
}