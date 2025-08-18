import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-select";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useRef } from "react";

export default function ImageUpload({
  file,
  setFile,
  uploadImageUrl,
  setUploadImageUrl,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }

  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2  border-dashed rounded-lg p-4"
      >
        <input
          ref={inputRef}
          onChange={handleImageFileChange}
          type="file"
          className="hidden"
          id="image-upload"
        />
        {!file ? (
          <label
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
            htmlFor="image-upload"
          >
            <UploadCloudIcon className="w-10 h-10" /> <span>Upload Image</span>
          </label>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <FileIcon className="w-7 h-7 text-primary mr-2" />
            </div>
            <p className="text-sm font-semibold">{file.name}</p>
            <Button
              varient="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
