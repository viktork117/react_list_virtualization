import {
  memo,
  type FC,
} from "react";

import { SwitchButton } from "@/components/ui";

import styles from "./Header.module.css";

const Header: FC = () => (
  <div className={styles.header}>
    <SwitchButton />
  </div>
);

export default memo(Header)
