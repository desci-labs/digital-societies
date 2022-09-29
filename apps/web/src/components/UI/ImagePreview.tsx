import { FileObject } from "components/FileDropzone/types";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useEffect } from "react";

export default function ImagePreview({ image, className, wrapperClassName }: { image: FileObject, className?: string, wrapperClassName?: string }) {
  const url = image.ipfsHash ? resolveIpfsURL(image.ipfsHash) : (image.file && image.file?.size > 0) ? window.URL.createObjectURL(image.file) : "";

  useEffect(() => {
    return () => {
      if (url.includes(window.location.origin)) {
        window.URL.revokeObjectURL(url)
      }
    }
  }, [url]);

  if (!url) return null;

  return (
    <div className={`w-full relative ${wrapperClassName}`}>
      <Image
        alt="preview"
        src={url}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className={className}
      />
    </div>
  );
}