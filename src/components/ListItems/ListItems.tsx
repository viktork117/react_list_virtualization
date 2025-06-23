import {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  type FC
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Item } from "../ui";

import { useUserStore } from "@/store/userStore";

import {
  ITEM_HEIGHT,
  VISIBLE_ITEMS,
  SCROLL_DEBOUNCE
} from "@/constants";

import type { Languages } from "@/types/languages";

import styles from "./ListItems.module.css";

const Empty: FC<{ lang: Languages }> = ({ lang }) => (
  <div className={styles.empty} role="status" aria-live="polite">
    {lang === "en" ? "No items found" : "Ничего не найдено"}
  </div>
);

const ListItems: FC = () => {
  const { lang, users, fetchUsers, isLoading } = useUserStore();
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const wheelingRef = useRef(false);

  useEffect(() => {
    if (!users.length) fetchUsers();
  }, [fetchUsers, users.length]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelingRef.current) return;
      const dir = e.deltaY > 0 ? "down" : "up";
      wheelingRef.current = true;

      setStartIndex((prev) =>
        dir === "down"
          ? Math.min(prev + 1, users.length - VISIBLE_ITEMS)
          : Math.max(prev - 1, 0)
      );
      setDirection(dir);

      setTimeout(() => {
        wheelingRef.current = false;
        setDirection(null);
      }, SCROLL_DEBOUNCE);
    },
    [users.length]
  );

  if (!isLoading && !users.length) return <Empty lang={lang} />;

  const itemsToRender = users.slice(startIndex, startIndex + VISIBLE_ITEMS);

  return (
    <div
      className={styles.list}
      style={{
        position: "relative",
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        overflow: "hidden",
      }}
      onWheel={handleWheel}
      role="list"
      aria-label="User list"
    >
      <AnimatePresence initial={false}>
        {itemsToRender.map(({ name, surname, id }, index) => (
          <motion.div
            key={id}
            layout
            initial={{
              opacity: 0,
              y: direction === "down" ? 40 : -40,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: direction === "down" ? -40 : 40,
              transition: { duration: 0.22 },
            }}
            transition={{
              duration: 0.33,
              ease: [0.48, 1.04, 0.43, 0.97],
              delay: index * 0.03,
            }}
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              top: index * ITEM_HEIGHT,
            }}
          >
            <Item name={name} surname={surname} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default memo(ListItems);
