// // src/components/GridOverlay.jsx
// function GridLayout() {
//   // We don't need real content, just columns
//   const cols = Array.from({ length: 12 }, (_, i) => i); // max (desktop) count

//   return (
//     <div className="fixed inset-0 z-100 pointer-events-none">
//       {/* page width container */}
//       <div className="w-full h-full flex justify-center">
//         <div className="w-full h-full max-w-7xl px-4">
//           <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-12 h-full gap-x-2 lg:gap-x-8">
//             {cols.map((i) => (
//               <div
//                 key={i}
//                 className="bg-pink-200/30"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GridLayout;


// src/components/GridOverlay.jsx
function GridLayout() {
  const cols = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none flex justify-center" style={{ zIndex: 9999 }}>
      {/* Container */}
      <div className="w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-full gap-x-4 md:gap-x-6 lg:gap-x-8">
          {cols.map((i) => (
            <div
              key={i}
              className="bg-pink-200/30 border-x border-pink-300/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GridLayout;