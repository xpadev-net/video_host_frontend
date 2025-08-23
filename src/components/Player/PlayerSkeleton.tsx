import { Skeleton } from "@radix-ui/themes";

const PlayerSkeleton = () => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <Skeleton className="w-full !h-full block" />
    </div>
  );
};

export { PlayerSkeleton };
