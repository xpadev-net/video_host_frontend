import { CircleQuestionMark } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  showErrorIcon?: boolean;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  showErrorIcon = true,
  alt,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else if (showErrorIcon) {
      setHasError(true);
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className="bg-skeleton w-full h-full flex items-center justify-center">
        <CircleQuestionMark />
      </div>
    );
  }

  return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />;
};

export { ImageWithFallback };
