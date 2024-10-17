"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSelectedMealStore from "@/app/store/selection";
import useCartStore from "@/app/store/cart";

export default function MealModal() {
  const { selectedMeal, closeModal, handleOptionChange, selectedOptions } =
    useSelectedMealStore();
  const { submitOrder, success, error } = useCartStore();

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        // window.location.reload()
      }, 3000);
    } else if (error) {
      toast.error(error);
      setTimeout(() => {
        // window.location.reload()
      }, 3000);
    }
  }, [success, error]);

  const placeOrder = (selectedMeal, selectedOptions) => {
    submitOrder(selectedMeal, selectedOptions);
  };

  if (!selectedMeal) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <motion.div
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        exit={{ scale: 0.9, y: 50 }}
        initial={{ scale: 0.9, y: 50 }}
      >
        <div
          className="h-48 rounded-t-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedMeal?.imageUrl})` }}
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          onClick={closeModal}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {selectedMeal.main.name}
          </h2>
          <p className="text-sm text-gray-800 text-center">
            {selectedMeal.main.description}
          </p>
          <OptionSection
            options={selectedMeal.protein}
            selectedOption={selectedOptions["protein"]}
            title="Option-1"
            onOptionChange={(value) => handleOptionChange("protein", value)}
          />
          <OptionSection
            options={selectedMeal.sauce}
            selectedOption={selectedOptions["sauce"]}
            title="Option-2"
            onOptionChange={(value) => handleOptionChange("sauce", value)}
          />
          <OptionSection
            options={selectedMeal.extras}
            selectedOption={selectedOptions["extras"]}
            title="Option-3"
            onOptionChange={(value) => handleOptionChange("extras", value)}
          />
          <div className="flex justify-center pt-4">
            <button
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors"
              onClick={() => {
                placeOrder(selectedMeal, selectedOptions);
                closeModal();
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OptionSection({ title, options, selectedOption, onOptionChange }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <RadioGroup value={selectedOption || ""} onValueChange={onOptionChange}>
        <div className="grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2"
            >
              <RadioGroupItem
                className="text-green-500"
                id={`${title}-${index}`}
                value={option.name}
              />
              <label
                className="text-sm text-gray-700 cursor-pointer"
                htmlFor={`${title}-${index}`}
              >
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
