import { Skeleton } from '@/components/ui/skeleton';

interface TestimonialSkeletonProps {
  count?: number;
}

export const TestimonialSkeleton = ({ count = 1 }: TestimonialSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
          {/* Stars skeleton */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
          </div>
          
          {/* Review text skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          
          {/* Author info skeleton */}
          <div className="flex items-center gap-3 pt-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TestimonialSkeleton;
