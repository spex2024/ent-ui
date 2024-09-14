'use client'

import React, { useEffect } from 'react';
import useVendorStore from "@/store/vendors";
import VendorTable from "@/components/page-ui/vendor-table";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";

const Vendors = () => {
    const { vendors, fetchVendors } = useVendorStore();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [isAuthenticated, router]);
    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);
    // Optionally, you can return a loading indicator while checking authentication
    if (!isAuthenticated) {
        return null
    }

    console.log(vendors)



    return (
        <div className="w-[90%] px-5 mx-auto">
            {vendors.length > 0 ? (
                <VendorTable vendors={vendors} />
            ) : (
                <p>No vendors found.</p>
            )}
        </div>
    );
};

export default Vendors;
