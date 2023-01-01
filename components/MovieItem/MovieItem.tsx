import styled from "styled-components";
import Styles from "./MovieItem.module.scss";
import Image from "next/image";

type MovieItemProps = {
  src: string;
  alt?: string;
  watched?: number;
};

type WatchedProps = {
  itemwidth: number;
};

const WatchedProgress = styled.div<WatchedProps>`
  width: ${(p) => p.itemwidth}%;
`;

const MovieItem = (props: MovieItemProps) => {
  return (
    <div className={Styles.wrapper}>
      <Image src={props.src} alt={props.alt || ""} fill={true} />
      <WatchedProgress
        itemwidth={props.watched || 0}
        className={Styles.watched}
      />
    </div>
  );
};
export { MovieItem };
