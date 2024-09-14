'use client'

import React, { useEffect } from 'react';

import {UserAccordion} from "@/components/page-ui/user-accordion";
import useAgencyStore from "@/store/agency";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";

const Page = () => {
    const { agencies, fetchAgencies } = useAgencyStore();
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
        fetchAgencies();
    }, [fetchAgencies]);
    // Optionally, you can return a loading indicator while checking authentication
    if (!isAuthenticated) {
        return null
    }



    return (
        <div className="w-[80%] px-5 mx-auto">
            {agencies.length > 0 ? (
                agencies.map((agency: { company: string; branch: string; users: []; imageUrl: string; }) => {
                    const { company, branch, users, imageUrl } = agency;

                    return (
                        <UserAccordion
                            key={company} // Ensure this is unique or use a more appropriate unique identifier
                            name={company}
                            location={branch}
                            users={users}
                            image={imageUrl}
                        />
                    );
                })
            ) : (
                <p>No agencies found.</p>
            )}
        </div>
    );
};

export default Page;
