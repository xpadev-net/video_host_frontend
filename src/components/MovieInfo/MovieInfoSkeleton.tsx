import { Skeleton } from "@radix-ui/themes";
import { UserSkeleton } from "@/components/User/UserSkeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const MovieInfoSkeleton = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <div className="border-b border-[var(--color-quaternary-background)] mb-2.5">
        <Skeleton height="32px" width="300px" />
        <Skeleton
          height="20px"
          width="100px"
          className="text-[14px] text-[var(--color-sub-text)] mb-2.5"
        />
      </div>
      <div className="pb-2.5 border-b border-[var(--color-quaternary-background)] mb-2.5 flex flex-row gap-2 items-center">
        <UserSkeleton />
      </div>
      <div className="text-[14px] pb-2.5 leading-5">
        <Skeleton height="16px" width="200px" />
        <Skeleton height="24px" width="250px" />
      </div>
    </div>
  );
};

export { MovieInfoSkeleton };
