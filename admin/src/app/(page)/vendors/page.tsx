'use client'

import React, { useEffect } from 'react';
import useVendorStore from "@/store/vendors";
import VendorTable from "@/components/page-ui/vendor-table";
const Vendors = () => {
    const { vendors, fetchVendors } = useVendorStore();
    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);


    return (
        <div className="w-[90%] px-5 mx-auto">
            {vendors && (
                <VendorTable vendors={vendors} />
            ) }
        </div>
    );
};

export default Vendors;
