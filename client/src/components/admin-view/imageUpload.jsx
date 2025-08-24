import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-select";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ImageUpload({
  file,
  setCreateNewProductData,
  setImageFiles,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [uploadImageUrl, setUploadImageUrl] = useState("");

  useEffect(() => {
    setImageFile(file);
  }, [file]);

  useEffect(() => {
    const uploadImageToCloudinary = async () => {
      try {
        setLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);

        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          data
        );

        if (response?.data?.success) {
          setUploadImageUrl(response.data.result.url);
        } else {
          console.error("Upload failed: ", response?.data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoadingState(false);
      }
    };

    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  useEffect(() => {
    if (uploadImageUrl) {
      setCreateNewProductData((prev) => {
        const alreadyExists = prev?.image?.includes(uploadImageUrl);
        if (alreadyExists) return prev;

        return {
          ...prev,
          image: [...(prev?.image || []), uploadImageUrl],
        };
      });
    }
  }, [uploadImageUrl, setCreateNewProductData]);

  function handleRemoveImage() {
    setCreateNewProductData((prev) => {
      return {
        ...prev,
        image: prev.image.filter((item) => item !== uploadImageUrl),
      };
    });
    setImageFile(null);
  }

  return (
    <div className="my-3">
      {loadingState ? (
        <Skeleton className="h-10 bg-gray-500" />
      ) : imageFile ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <FileIcon className="w-7 h-7 text-primary mr-2" />
          </div>
          <p className="text-sm font-semibold">{file.name}</p>
          <Button
            varient="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground ml-2"
            onClick={handleRemoveImage}
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove File</span>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
