// "use client";
//
// import React from "react";
//
// import useCartStore from "../../app/store/cart";
//
// const CartDrawer = () => {
//   const { cart, toggleDrawer } = useCartStore();
//
//   return (
//     <div>
//       <div className="relative">
//         <button className="relative text-gray-700" onClick={toggleDrawer}>
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={1.5}
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           {cart.length > 0 && (
//             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
//               {cart.length}
//             </span>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default React.memo(CartDrawer);
