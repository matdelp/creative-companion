import type { Artwork, ArtworkModification } from "@creative-companion/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import z from "zod";
import { useModifyArtwork } from "../../hooks/useModifyArtwork";
import { useDeleteArtwork } from "../../hooks/useDeleteArtwork";
import { X } from "lucide-react";

type ArtworkCardProps = {
  artworks: Artwork[];
  background: string;
  isDashboard: boolean;
};

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artworks,
  background,
  isDashboard,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { mutate, isPending, error: mutationError } = useModifyArtwork();
  const {
    mutate: todelete,
    isPending: isDeleting,
    error: deletingError,
  } = useDeleteArtwork();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const handleToggle = (artwork: ArtworkModification) => {
    setEditingId(artwork.id);
    reset({
      title: artwork.title ?? "",
      description: artwork.description ?? "",
    });
  };

  const onSubmit = (formData: FormData) => {
    if (editingId === null) return;
    const updatePayload: ArtworkModification = {
      id: editingId,
      ...formData,
    };
    mutate(updatePayload, {
      onSuccess: () => {
        setEditingId(null);
      },
    });
  };

  const formatDate = (created_at: Date) => {
    const date = new Date(created_at);
    return date.toISOString().split("T")[0];
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      todelete({ id });
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <>
      {isPending && <div>Update pending...</div>}
      {isDeleting && <div>Deleting pending...</div>}
      {mutationError && <div className="text-red-600">Update failed</div>}
      {deletingError && <div className="text-red-600">Delete failed</div>}
      <div
        className={`flex flex-wrap gap-2 bg-mybackground-light-400 ${background}`}
      >
        {artworks.map(({ content, title, created_at, description, id }) => (
          <div
            key={id}
            className="xl:w-[calc(20%-0.4rem)] w-[calc(50%-0.4rem)] h-full aspect-square relative group overflow-hidden cursor-pointer"
            onClick={(e) => {
              if (isDashboard) return;
              if (editingId === id) return;
              e.stopPropagation();
              handleToggle({
                id,
                title,
                description,
              });
            }}
          >
            <img
              src={content}
              alt={`Artwork ${id}`}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-black/60 text-white p-2 flex flex-col justify-center items-center gap-2 text-center transition-opacity duration-300 z-10
    ${
      editingId === id
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 group-hover:opacity-100 pointer-events-none"
    }
  `}
              onClick={(e) => e.stopPropagation()}
            >
              {editingId === id ? (
                <FormProvider {...form}>
                  <form
                    className="flex flex-col items-center w-full justify-center xl:gap-3 gap-1"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <input
                      className="text-mytext-light border border-mypink-400 dark:border-mypurple-400 rounded-xl text-center w-auto xl:px-2 px-0.5 xl:text-xl text-xs"
                      placeholder="Title"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm font-semibold">
                        {errors.title.message}
                      </p>
                    )}
                    <input
                      className="text-mytext-light border border-mypink-400 dark:border-mypurple-400 rounded-xl text-center w-auto xl:px-2 px-0.5 xl:text-xl text-xs"
                      placeholder="Description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm font-semibold">
                        {errors.description.message}
                      </p>
                    )}
                    <button
                      className="bg-mypink-400 dark:bg-mypurple-700 py-1 xl:px-8 px-6 text-shadow-mytext-light font-bold xl:text-lg text-xs rounded-2xl cursor-pointer"
                      type="submit"
                      disabled={isPending}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="xl:mt-1 xl:text-sm text-xs underline cursor-pointer"
                      disabled={isPending}
                    >
                      Cancel
                    </button>
                  </form>
                </FormProvider>
              ) : (
                <>
                  <h3 className="font-bold">{title || "test"}</h3>
                  <p className="text-xs">{formatDate(created_at)}</p>
                  <p className="mt-1">{description}</p>
                </>
              )}
            </div>

            {/* Icons container separated with own visibility logic */}
            <div
              className={`flex xl:gap-2 gap-1 absolute bottom-1 right-1 items-center transition-opacity duration-300 z-20
                ${
                  editingId === id
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 group-hover:opacity-100 pointer-events-none"
                }
                `}
            >
              {editingId !== id ? (
                <></>
              ) : (
                <>
                  <MdDelete
                    className="cursor-pointer w-3 h-3 xl:w-8 xl:h-8 dark:text-mypurple-700 text-myblue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                    title="Delete artwork"
                  />
                  <X
                    className="cursor-pointer w-3 h-3 xl:w-8 xl:h-8 dark:text-mypurple-700 text-myblue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(null);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
