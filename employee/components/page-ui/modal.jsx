'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, Calendar } from "lucide-react";
import toast from "react-hot-toast";

import useSelectedMealStore from "@/app/store/selection";
import useCartStore from "@/app/store/cart";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MealModal() {
  const { selectedMeal, closeModal } = useSelectedMealStore();
  const { submitOrder, success, error } = useCartStore();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    protein: "",
    sauce: "",
    extras: []
  });

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

  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleOptionChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: category === 'extras'
          ? prev.extras.includes(value)
              ? prev.extras.filter(item => item !== value)
              : [...prev.extras, value]
          : value
    }));
  };

  const placeOrder = () => {
    submitOrder(
      selectedMeal,
      selectedDays,
        selectedOptions,
    );

    console.log(selectedOptions,selectedDays);

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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            exit={{ scale: 0.9, y: 50 }}
            initial={{ scale: 0.9, y: 50 }}
        >
          <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedMeal?.imageUrl})` }}
          />
          <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={closeModal}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedMeal.mealName}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedMeal.description}
            </p>
            <Tabs defaultValue="options" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="options">Options</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="options" className="space-y-4 mt-4">
                <OptionSection
                    options={selectedMeal.protein}
                    selectedOption={selectedOptions.protein}
                    title="Protein"
                    onOptionChange={(value) => handleOptionChange("protein", value)}
                />
                <OptionSection
                    options={selectedMeal.sauce}
                    selectedOption={selectedOptions.sauce}
                    title="Sauce"
                    onOptionChange={(value) => handleOptionChange("sauce", value)}
                />
                <ExtrasSection
                    options={selectedMeal.extra}
                    selectedOptions={selectedOptions.extras}
                    title="Extras"
                    onOptionChange={(value) => handleOptionChange("extras", value)}
                />
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Plan Your Week</h3>
                  <Calendar className="w-5 h-5 text-[#71bc44]" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {selectedMeal.daysAvailable.map((day, index) => (
                      <button
                          key={index}
                          onClick={() => handleDayChange(day)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                              selectedDays.includes(day)
                                  ? 'bg-[#71bc44] text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {day}
                      </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
                className="w-full px-4 py-2 bg-[#71bc44] text-white font-semibold rounded-full shadow-md hover:bg-[#5fa338] transition-colors text-sm flex items-center justify-center space-x-2"
                onClick={() => {
                  placeOrder();
                  closeModal();
                }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Place Order</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
  );
}

function OptionSection({ options, selectedOption, title, onOptionChange }) {
  return (
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <RadioGroup value={selectedOption || ""} onValueChange={onOptionChange}>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition-colors"
                >
                  <RadioGroupItem
                      className="text-[#71bc44]"
                      id={`${title}-${index}`}
                      value={option}
                  />
                  <label
                      className="text-sm text-gray-700 cursor-pointer"
                      htmlFor={`${title}-${index}`}
                  >
                    {option}
                  </label>
                </div>
            ))}
          </div>
        </RadioGroup>
      </div>
  );
}

function ExtrasSection({ options, selectedOptions, title, onOptionChange }) {
  return (
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
          {options?.map((option, index) => (
              <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition-colors"
              >
                <Checkbox
                    id={`${title}-${option}`}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={() => onOptionChange(option)}
                    className="text-[#71bc44]"
                />
                <Label
                    htmlFor={`${title}-${option}`}
                    className="text-sm text-gray-700 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
          ))}
        </div>
      </div>
  );
}