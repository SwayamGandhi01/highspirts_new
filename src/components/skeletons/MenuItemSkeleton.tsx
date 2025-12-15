import { Skeleton } from '@/components/ui/skeleton';

interface MenuItemSkeletonProps {
  count?: number;
}

export const MenuItemSkeleton = ({ count = 6 }: MenuItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden bg-card border border-border p-4 space-y-4">
          {/* Image skeleton */}
          <Skeleton className="w-full h-48 rounded-lg" />
          
          {/* Title skeleton */}
          <Skeleton className="h-5 w-3/4" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
          
          {/* Price skeleton */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuItemSkeleton;
