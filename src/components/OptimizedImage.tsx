import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "loader" | "blurDataURL" | "width" | "height"> {
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
  ...props
}) => {
  const shouldUseBlur = placeholder === "blur" && blurDataURL;

  return (
    <div className={`relative w-full h-full ${fill ? "absolute" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        placeholder={shouldUseBlur ? "blur" : "empty"}
        blurDataURL={shouldUseBlur ? blurDataURL : undefined}
        sizes={sizes}
        fill={fill} 
        className="rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-90 object-contain"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
