import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";

type PictureProps = { image: string };

export const Picture: React.FC<PictureProps> = ({ image }) => {
  const [backendError, setBackendError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(image);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await fetch("/api/artist/editPhoto", {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();

      if (result.url) {
        setImageUrl(result.url);
      }
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message);
      } else {
        setBackendError("An unknown error occurred");
      }
    }
  };
  console.log(backendError);

  return (
    <div className="flex justify-between">
      <div className="relative h-32 w-32">
        <img
          className="rounded-full border-4 border-white object-cover h-full w-full"
          src={imageUrl}
          alt="User avatar"
        />
        <button
          onClick={handleEditClick}
          type="button"
          className="absolute bottom-1 right-1 p-1 cursor-pointer"
          aria-label="Edit profile photo"
        >
          <FaPen className="w-4 h-4 text-mypink-400" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
