import React, { useRef } from "react";
import { FaPen } from "react-icons/fa";
import { useModifyProfilePicture } from "../../hooks/useModifyProfilePicture";

type PictureProps = { image: string; isEditing: boolean };

export const Picture: React.FC<PictureProps> = ({ image, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending, error: mutationError } = useModifyProfilePicture();

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("picture", file);
    mutate(formData);
  };

  return (
    <div className="flex justify-between">
      <div className="relative xl:h-44 xl:w-44 w-32 h-32">
        <img
          className="rounded-full border-4 border-white object-cover h-full w-full"
          src={image}
          alt="User avatar"
        />
        {isEditing && (
          <button
            onClick={handleEditClick}
            type="button"
            className="absolute bottom-1 right-1 p-1 cursor-pointer"
            aria-label="Edit profile photo"
          >
            <FaPen className="w-6 h-6 text-mypink-400" />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      {isPending && <div>Update pending...</div>}
      {mutationError && <div className="text-red-600">Update failed</div>}
    </div>
  );
};
