import { Skeleton } from '@/components/ui/skeleton';

export const BannerSkeleton = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  );
};

export default BannerSkeleton;
