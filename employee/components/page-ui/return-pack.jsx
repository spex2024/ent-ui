'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, ChevronLeft, ChevronRight } from "lucide-react"
import useUserStore from "@/app/store/profile"
import useReturnedPacksStore from "@/app/store/return-pack"
import ReturnPackForm from "./return-pack-form"

export default function ReturnPack() {
  const { user, fetchUser } = useUserStore()
  const { returnedPacks, fetchReturnedPacks } = useReturnedPacksStore()

  const [currentPage, setCurrentPage] = useState(1)
  const packsPerPage = 10

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchReturnedPacks()
  }, [fetchReturnedPacks])

  const pack = user?.pack
  const sortedPacks = returnedPacks?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const indexOfLastPack = currentPage * packsPerPage
  const indexOfFirstPack = indexOfLastPack - packsPerPage
  const currentPacks = sortedPacks?.slice(indexOfFirstPack, indexOfLastPack)

  const totalPages = Math.ceil(sortedPacks?.length / packsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Return Pack</CardTitle>
            </CardHeader>
            <CardContent>
              {pack?.status === "active" ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="font-medium">{pack.status}</span>
                      <span>{pack.userCode}</span>
                      <span>{pack.agency}</span>
                    </div>
                    <Separator />
                    <ReturnPackForm />
                  </div>
              ) : (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No active packs</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new pack.</p>
                  </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Returned Pack History</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4">
                {currentPacks?.slice(0, 10).map((item) => (
                    <div key={item?._id} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{item?.code}</span>
                      <div className="text-right">
                        <p className="text-gray-500">{item?.name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="flex justify-between items-center w-full">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Prev
                </Button>
                <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}