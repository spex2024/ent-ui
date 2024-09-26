'use client'

import React, { useEffect } from 'react';
import useAgencyStore from "@/store/agency";
import { AccordionCard } from "@/components/page-ui/accordion";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";

const Page = () => {
    const { agencies, fetchAgencies } = useAgencyStore();

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

   console.log(agencies);

    return (
        <div className="w-[80%] px-5 mx-auto">
            {agencies.length > 0 ? (
                agencies.map((agency: { company: string; branch: string; users: []; imageUrl: string; }) => {
                    const { company, branch, users, imageUrl } = agency;
                      console.log("agency", agency);
                    return (
                        <AccordionCard
                            key={company} // Ensure this is unique or use a more appropriate unique identifier
                            name={company}
                            location={branch}
                            user={users}
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
