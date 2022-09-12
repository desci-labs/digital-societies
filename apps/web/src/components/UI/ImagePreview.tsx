import { FileObject } from "components/FileDropzone/types";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useEffect } from "react";

export default function ImagePreview({ image }: { image: FileObject }) {
  const url = image.ipfsHash ? resolveIpfsURL(image.ipfsHash) : image.file ? window.URL.createObjectURL(image.file) : "";
  
  useEffect(() => {
    return () => {
      if (url.includes(window.location.origin)) {
        window.URL.revokeObjectURL(url)
      }
    }
  }, [url]);
  
  if (!url) return null;
  
  return (
    <div className="w-full h-32 relative rounded-lg">
      <Image
        alt="preview"
        src={url}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="rounded-xl"
      />
    </div>
  );
}