import { Skeleton } from '@/components/ui/skeleton';

interface GalleryImageSkeletonProps {
  count?: number;
}

export const GalleryImageSkeleton = ({ count = 12 }: GalleryImageSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden">
          <Skeleton className="w-full aspect-square" />
        </div>
      ))}
    </>
  );
};

export default GalleryImageSkeleton;
