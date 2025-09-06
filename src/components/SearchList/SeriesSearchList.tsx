import type { FC } from "react";
import { NoResultsMessage } from "@/components/SearchList/NoResultsMessage";
import { SearchListWrapper } from "@/components/SearchList/SearchListWrapper";
import { SeriesCard, SeriesCardSkeleton } from "@/components/SeriesCard";
import { useSeriesListInfinite } from "@/hooks/useSeriesListInfinite";

type Props = {
  query?: string;
  author?: string;
};

export const SeriesSearchList: FC<Props> = ({ query, author }) => {
  const { series, setSize, hasNext, isValidating } = useSeriesListInfinite({
    query,
    author,
  });

  if (!isValidating && (!series || series.length === 0)) {
    return <NoResultsMessage />;
  }

  return (
    <SearchListWrapper
      hasNext={hasNext}
      isValidating={isValidating}
      setSize={setSize}
      loadingSkeleton={<SeriesCardSkeleton />}
    >
      {series.map((seriesItem) => (
        <SeriesCard series={seriesItem} key={seriesItem.id} />
      ))}
    </SearchListWrapper>
  );
};
