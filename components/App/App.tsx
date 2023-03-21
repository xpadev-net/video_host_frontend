import Styles from "./App.module.scss";
import {ReactElement} from "react";

type props = {
  children: ReactElement;
}

const App = ({children}:props) => {
  return <>
    <div className={Styles.header}>header</div>
    <div className={Styles.main}>
      <div className={Styles.sidebar}>sidebar</div>
      <div className={Styles.container}>
        {children}
      </div>
    </div>
  </>
}

export {App};