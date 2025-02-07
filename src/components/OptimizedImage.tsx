import Image, { ImageProps } from "next/image";

interface OptimizedImageProps
  extends Omit<ImageProps, "loader" | "blurDataURL"> {
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = "Optimized Image",
  priority = false,
  placeholder = "empty",
  quality = 80,
  className = "",
  sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  blurDataURL,
  fill = false, 
  width = fill ? undefined : 300, 
  height = fill ? undefined : 300, 
  ...props
}) => {
  const shouldUseBlur = placeholder === "blur" && blurDataURL;

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        placeholder={shouldUseBlur ? "blur" : "empty"}
        blurDataURL={shouldUseBlur ? blurDataURL : undefined}
        sizes={sizes}
        fill={fill}
        width={fill ? undefined : width} 
        height={fill ? undefined : height} 
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
