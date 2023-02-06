import styled from "styled-components";
import Styles from "./MovieItem.module.scss";
import Image from "next/image";
import { MovieItemProps, WatchedProps } from "@/@types/MovieItem";

const WatchedProgress = styled.div<WatchedProps>`
  width: ${(p) => p.itemWidth}%;
`;

const MovieItem = (props: MovieItemProps) => {
  return (
    <div className={Styles.wrapper}>
      <Image src={props.src} alt={props.alt || ""} fill={true} />
      <WatchedProgress
        itemWidth={props.watched || 0}
        className={Styles.watched}
      />
    </div>
  );
};
export { MovieItem };
