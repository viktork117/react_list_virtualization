import type { ReactNode } from "react";

import styles from "./Wrapper.module.css";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);

export default Wrapper;
