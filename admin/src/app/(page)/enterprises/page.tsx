'use client';
import React, { useEffect, useState } from 'react';
import useAgencyStore from "@/store/agency";
import AgencyTable from "@/components/page-ui/agencies-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming you're using Tabs from some UI library

const Enterprise = () => {
    const { agencies, fetchAgencies } = useAgencyStore();
    const [filteredAgencies, setFilteredAgencies] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    useEffect(() => {
        // Filter agencies based on the selected tab (status)
        if (statusFilter === "all") {
            setFilteredAgencies(agencies);
        } else if (statusFilter === "active") {
            setFilteredAgencies(agencies.filter((agency: { isVerified: boolean; }) => agency.isVerified === true));
        } else if (statusFilter === "inactive") {
            setFilteredAgencies(agencies.filter((agency: { isVerified: boolean; }) => agency.isVerified === false));
        }
    }, [statusFilter, agencies]);

    return (
        <div className="w-[90%] px-5 mx-auto">
            <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all">
                    {filteredAgencies.length > 0 ? (
                        <AgencyTable agencies={filteredAgencies} />
                    ) : (
                        <p>No agencies found.</p>
                    )}
                </TabsContent>

                <TabsContent value="active">
                    {filteredAgencies.length > 0 ? (
                        <AgencyTable agencies={filteredAgencies} />
                    ) : (
                        <p>No active agencies found.</p>
                    )}
                </TabsContent>

                <TabsContent value="inactive">
                    {filteredAgencies.length > 0 ? (
                        <AgencyTable agencies={filteredAgencies} />
                    ) : (
                        <p>No inactive agencies found.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Enterprise;
