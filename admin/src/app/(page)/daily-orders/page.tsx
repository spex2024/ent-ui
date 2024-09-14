'use client'

import React, { useEffect } from 'react';
import useAgencyStore from "@/store/agency";
import { AccordionCard } from "@/components/page-ui/accordion";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";
import {DailyAccordionCard} from "@/components/page-ui/daily-list";

const DailyOrders = () => {
    const { agencies, fetchAgencies } = useAgencyStore();

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);




    return (
        <div className="w-[80%] px-5 mx-auto">
            {agencies.length > 0 ? (
                agencies.map((agency: { company: string; branch: string; users: []; imageUrl: string; }) => {
                    const { company, branch, users, imageUrl } = agency;
                    return (
                        <DailyAccordionCard
                            key={company} // Ensure this is unique or use a more appropriate unique identifier
                            enterprise={company}
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

export default DailyOrders;
