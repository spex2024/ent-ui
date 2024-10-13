"use client";

import React, { useEffect } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import toast from "react-hot-toast";

import useSelectedMealStore from "@/app/store/selection";
import useCartStore from "@/app/store/cart";

const MealModal = () => {
  const { selectedMeal, closeModal, handleOptionChange, selectedOptions } =
    useSelectedMealStore();
  const { submitOrder, success, error } = useCartStore();

  // Handle success and error notifications after submission
  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3 seconds delay
    } else if (error) {
      toast.error(error);
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3 seconds delay
    }
  }, [success, error]);


  const placeOrder = (selectedMeal, selectedOptions) => {
    submitOrder(selectedMeal, selectedOptions);
  };

  if (!selectedMeal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative p-4 lg:w-[50%] w-full">
        <div className="relative bg-white rounded-lg shadow">
          <div
            className="flex items-center justify-between p-10 border-b rounded-t h-[250px]"
            style={{
              backgroundImage: `url(${selectedMeal?.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div
            className={`flex flex-col lg:flex-row items-start justify-between mx-auto p-5`}
          >
            <div className="p-4 space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Main Dish</h3>
              <div className="flex items-center space-x-2 font-bold">
                <span>{selectedMeal.main.name}</span>
              </div>
            </div>
            {/* Protein Option */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase">
                Option-1
              </h3>
              <RadioGroup
                value={selectedOptions["protein"] || ""}
                onValueChange={(value) => handleOptionChange("protein", value)}
              >
                {selectedMeal.protein.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Radio
                      id={`protein-${index}`}
                      size={"sm"}
                      value={option.name}
                    />
                    <h2 className={`text-sm`}>{option.name}</h2>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {/* Sauce Option */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase">
                Option-2
              </h3>
              <RadioGroup
                value={selectedOptions["sauce"] || ""}
                onValueChange={(value) => handleOptionChange("sauce", value)}
              >
                {selectedMeal.sauce.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Radio
                      id={`sauce-${index}`}
                      size={"sm"}
                      value={option.name}
                    />
                    <h2 className={`text-sm`}>{option.name}</h2>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {/* Extras Option */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase">
                Option-3
              </h3>
              <RadioGroup
                value={selectedOptions["extras"] || ""}
                onValueChange={(value) => handleOptionChange("extras", value)}
              >
                {selectedMeal.extras.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Radio
                      id={`extras-${index}`}
                      size="sm"
                      value={option.name}
                    />
                    <h2 className={`text-sm`}>{option.name}</h2>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 border-t">
            <button
              className="text-white bg-black font-medium px-5 py-2"
              onClick={() => {
                placeOrder(selectedMeal, selectedOptions);
                closeModal();
              }}
            >
              Submit Order
            </button>
            <button
              className="text-sm font-medium text-gray-900 ml-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none px-5 py-2.5"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MealModal);
