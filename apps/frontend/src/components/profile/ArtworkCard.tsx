import type { Artwork, ArtworkModification } from "@creative-companion/common";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdDelete, MdModeEdit } from "react-icons/md";
import z from "zod";
import { useModifyArtwork } from "../../hooks/useModifyArtwork";
import { useDeleteArtwork } from "../../hooks/useDeleteArtwork";

type ArtworkCardProps = {
  artworks: Artwork[];
};

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworks }) => {
  const [artworksState, setArtworksState] = useState<Artwork[]>(artworks);
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
        setArtworksState((prev) =>
          prev.map((art) =>
            art.id === editingId ? { ...art, ...formData } : art
          )
        );
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
      setArtworksState((prev) => prev.filter((art) => art.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <>
      {isPending && <div>Update pending...</div>}
      {isDeleting && <div>Deleting pending...</div>}
      {mutationError && <div className="text-red-600">Update failed</div>}
      {deletingError && <div className="text-red-600">Delete failed</div>}
      <div className="flex flex-wrap gap-1 bg-mybackground-light-400 dark:bg-mybackground-dark-400 min-h-screen">
        {artworksState.map(
          ({ content, title, created_at, description, id }) => (
            <div
              key={id}
              className="w-[32%] sm:w-[24%] md:w-[19%] h-full aspect-square relative group overflow-hidden"
            >
              <img
                src={content}
                alt={`Artwork ${id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-2 flex flex-col justify-center items-center gap-2 text-center">
                {editingId === id ? (
                  <FormProvider {...form}>
                    <form
                      className="flex flex-col items-center w-full justify-center gap-3"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
                      <input
                        className="text-whiteText-accent border border-mypink-400 rounded-xl text-center w-auto px-2"
                        placeholder="Title"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm font-semibold">
                          {errors.title.message}
                        </p>
                      )}
                      <input
                        className="text-whiteText-accent border border-mypink-400 rounded-xl text-center w-auto px-2"
                        placeholder="Description"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm font-semibold">
                          {errors.description.message}
                        </p>
                      )}
                      <button
                        className="bg-mypink-400 p-2 text-whiteText-primary font-bold text-lg rounded-2xl cursor-pointer w-full max-w-60 mt-4"
                        type="submit"
                        disabled={isPending}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="mt-1 text-sm underline"
                        disabled={isPending}
                      >
                        Cancel
                      </button>
                    </form>
                  </FormProvider>
                ) : (
                  <>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-xs">{formatDate(created_at)}</p>
                    <p className="mt-1">{description}</p>
                  </>
                )}
                <div className="flex gap-2 absolute bottom-1 right-1">
                  <MdDelete
                    className="cursor-pointer"
                    onClick={() => handleDelete(id)}
                    title="Delete artwork"
                  />
                  <MdModeEdit
                    className="cursor-pointer"
                    onClick={() =>
                      handleToggle({
                        id,
                        title,
                        description,
                      })
                    }
                    title="Edit artwork"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
