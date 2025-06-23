import { memo, type FC } from "react";

import styles from "./Item.module.css"

type ItemProps = {
  name: string;
  surname: string;
}; 

const Item: FC<ItemProps> = ({ name, surname }) => {
  return (
    <div
      className={styles.item}
      role="listitem"
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.surname}>{surname}</div>
    </div>
  );
};

export default memo(Item);
