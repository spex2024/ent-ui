"use client";
import React, { useEffect } from "react";
import { Star } from "lucide-react";

import useVendorStore from "../../app/store/vendor";

const VendorCard = ({ imageUrl, name, location }) => {
  return (
    <article className="w-[70%] rounded-xl bg-slate-200 px-2 py-2 shadow-lg hover:shadow-xl">
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <img alt={name} className="w-full h-48 object-cover" src={imageUrl} />
        <div className="absolute bottom-3 left-3 flex items-center gap-1 justify-center rounded-lg bg-white p-1 shadow-md">
          <Star size={14} strokeWidth={1} />
          <span className="text-slate-400  text-xs">4.5</span>
        </div>
      </div>

      <div className="mt-1 p-2">
        <h2 className="text-slate-700 text-xs font-bold">{name}</h2>
        <p className="text-slate-500 mt-1 text-xs">{location}</p>
      </div>
    </article>
  );
};

const VendorList = () => {
  const { vendors, fetchVendors } = useVendorStore();

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);


  return (
    <div className="w-full h-auto py-10  px-10 grid lg:grid-cols-4 gap-3 place-items-center">
      {vendors?.map((vendor) => (
        <VendorCard
          key={vendor?._id}
          imageUrl={vendor?.imageUrl}
          location={vendor?.location}
          name={vendor?.name}
        />
      ))}
    </div>
  );
};

export default VendorList;
