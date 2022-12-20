import { FileObject } from "components/FileDropzone/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImagePreview({
  image,
  className,
  wrapperClassName,
}: {
  image: FileObject;
  className?: string;
  wrapperClassName?: string;
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const url = image.ipfsURL
      ? image.ipfsURL
      : image.file && image.file?.size > 0
      ? window.URL.createObjectURL(image.file)
      : "";
    setImageUrl(url);
    return () => {
      if (url.includes(window.location.origin)) {
        window.URL.revokeObjectURL(url);
      }
    };
  }, [image]);

  if (!imageUrl) return null;
  return (
    <div className={`w-full relative ${wrapperClassName}`}>
      <Image
        alt="preview"
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className={className}
      />
    </div>
  );
}
