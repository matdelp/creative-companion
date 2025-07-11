import type { Artwork } from "@creative-companion/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdModeEdit } from "react-icons/md";
import z from "zod";

type ArtworkCardProps = {
  artworks: Artwork[];
};

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworks }) => {
  const [isEditing, setIsEditting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/artist/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Edit failed");
      }
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) setBackendError(error.message);
      else setBackendError("An unknown error occurred");
    }
  };

  const formatDate = (date: Date) => {
    return date.toString().split("T")[0];
  };
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this art?")) {
      try {
        const response = await fetch(`/api/artwork/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Deletion failed");
        }
        window.location.reload();
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {artworks.map(({ content, title, created_at, description, id }) => (
        <div
          key={id}
          className="w-[32%] sm:w-[24%] md:w-[19%] aspect-square relative group overflow-hidden"
        >
          <img
            src={content}
            alt={`Artwork ${id}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-2 flex flex-col justify-center items-center gap-2 text-center">
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs">{formatDate(created_at)}</p>
            <p className="mt-1">{description}</p>
            <div className="flex gap-2 absolute bottom-1 right-1">
              <MdDelete
                className="cursor-pointer"
                onClick={() => handleDelete(id)}
              />
              <MdModeEdit className="cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
