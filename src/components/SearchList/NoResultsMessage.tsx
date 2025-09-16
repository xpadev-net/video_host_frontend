import type { FC } from "react";

export const NoResultsMessage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2>検索結果がありません</h2>
    </div>
  );
};
