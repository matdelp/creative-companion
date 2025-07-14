import React from "react";

export const ArtworkCard = () => {
  return <div>ArtworkCard</div>;
};

// import type { Artwork, ArtworkUpdate } from "@creative-companion/common";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { MdDelete, MdModeEdit } from "react-icons/md";
// import z from "zod";
// import { updateArtwork } from "../../hooks/useModifyArtwork";

// type ArtworkCardProps = {
//   artworks: Artwork[];
// };

// const formSchema = z.object({
//   title: z.string().optional(),
//   description: z.string().optional(),
// });
// type FormData = z.infer<typeof formSchema>;

// export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworks }) => {
//   const [backendError, setBackendError] = useState<string | null>(null);
//   const [artworksState, setArtworksState] = useState<Artwork[]>(artworks);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = form;

//   const handleEditClick = (artwork: {
//     id: number;
//     title?: string;
//     description?: string;
//   }) => {
//     reset({
//       title: artwork.title || "",
//       description: artwork.description || "",
//     });
//     setEditingId(artwork.id);
//   };

//   const onSubmit = async (data: FormData) => {
//     if (editingId === null) return;
//     try {
//       await updateArtwork({ id: editingId, data });
//       setEditingId(null);
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//     setArtworksState((prev) =>
//       prev.map((art) => (art.id === id ? { ...art, ...data } : art))
//     );
//   };

//   const formatDate = (date: Date) => {
//     return date.toString().split("T")[0];
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this art?")) {
//       try {
//         const response = await fetch(`/api/artwork/delete/${id}`, {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         });
//         const result = await response.json();
//         if (!response.ok) {
//           throw new Error(result.message || "Deletion failed");
//         }
//         window.location.reload();
//       } catch (error) {
//         if (error instanceof Error) console.error(error.message);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-1">
//       {artworksState.map(({ content, title, created_at, description, id }) => (
//         <div
//           key={id}
//           className="w-[32%] sm:w-[24%] md:w-[19%] aspect-square relative group overflow-hidden"
//         >
//           <img
//             src={content}
//             alt={`Artwork ${id}`}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-2 flex flex-col justify-center items-center gap-2 text-center">
//             {editingId === id ? (
//               <FormProvider {...form}>
//                 <form
//                   className="flex flex-col items-center w-full justify-center gap-3"
//                   onSubmit={handleSubmit(onSubmit)} noValidate>
//                   noValidate
//                 >
//                   <input
//                     className=" text-whiteText-accent border border-mypink-400 rounded-xl text-center w-auto px-2"
//                     placeholder="Title"
//                     {...register("title")}
//                   />
//                   {errors.title && (
//                     <p className="text-red-500 text-sm font-semibold">
//                       {errors.title.message}
//                     </p>
//                   )}
//                   <input
//                     className="text-whiteText-accent border border-mypink-400 rounded-xl text-center w-auto px-2"
//                     placeholder="Description"
//                     {...register("description")}
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-sm font-semibold">
//                       {errors.description.message}
//                     </p>
//                   )}
//                   {backendError && (
//                     <p className="text-red-600 font-semibold">{backendError}</p>
//                   )}
//                   <button
//                     className="bg-mypink-400 p-2 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60 mt-4"
//                     type="submit"
//                   >
//                     Save
//                   </button>{" "}
//                   <button
//                     type="button"
//                     onClick={() => setEditingId(null)}
//                     className="mt-1 text-sm underline"
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </FormProvider>
//             ) : (
//               <>
//                 <h3 className="font-bold">{title}</h3>
//                 <p className="text-xs">{formatDate(created_at)}</p>
//                 <p className="mt-1">{description}</p>
//               </>
//             )}
//             <div className="flex gap-2 absolute bottom-1 right-1">
//               <MdDelete
//                 className="cursor-pointer"
//                 onClick={() => handleDelete(id)}
//               />
//               <MdModeEdit
//                 className="cursor-pointer"
//                 onClick={() => handleToggle({ title, description })}
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
