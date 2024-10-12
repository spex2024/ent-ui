// import React, { useEffect, useState } from "react";
//
// import useVendorStore from "../../app/store/vendor";
//
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
//
// const VendorList = () => {
//   const { vendors, fetchVendors } = useVendorStore();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         await fetchVendors();
//       } catch (err) {
//         setError("Failed to load vendors");
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchData();
//   }, [fetchVendors]);
//
//   if (loading) {
//     return <div>Loading vendors...</div>; // You can replace this with a proper loading spinner if you like
//   }
//
//   if (error) {
//     return <div>{error}</div>; // You can customize error handling as per your preference
//   }
//
//   return (
//     <div className={`container max px-4 py-8`}>
//       <h2 className="text-2xl font-bold mb-6">Featured Vendors</h2>
//       <div className="relative">
//         <Carousel className="w-full">
//           <CarouselContent className="-ml-2 md:-ml-4">
//             {vendors.map((vendor, index) => (
//               <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/4">
//                 <div className="p-1">
//                   <Card className="overflow-hidden">
//                     <CardContent className="p-0 relative">
//                       <img
//                         alt={vendor.name}
//                         className="w-full h-32 object-cover"
//                         src={vendor.imageUrl}
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//                       <div className="absolute bottom-0 left-0 right-0 p-2">
//                         <h3 className="text-sm font-bold text-white truncate">
//                           {vendor.name}
//                         </h3>
//                         <div className="flex items-center justify-between text-xs text-white/80">
//                           <span>{vendor.location}</span>
//                           <div className="flex items-center">
//                             <span className="text-yellow-400 mr-1">★</span>
//                             <span>{vendor.rating || "N/A"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//         <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
//       </div>
//     </div>
//   );
// };
//
// export default VendorList;
