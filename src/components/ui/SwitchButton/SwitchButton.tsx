import {
  memo,
  useCallback,
  useEffect,
  useState,
  type FC
} from "react";

import { useUserStore } from "@/store/userStore";

import type { Languages } from "@/types/languages";

import styles from "./SwitchButton.module.css";

const SwitchButton: FC = () => {
  const [ lang, setLanguages ] = useState<Languages>("ru");
  const { setLang } = useUserStore();

  const onChange = useCallback(() => {
    setLanguages((lang) => lang === "en" ? "ru" : "en");
  }, []);
  
  const setLangCallback = useCallback((arg1: Languages) => setLang(arg1), [setLang])

  useEffect(() => {
    setLangCallback(lang);
  }, [lang, setLangCallback])

  return (
    <div className={styles["switch-button"]}>
      <div
        className={
          `${styles["switch-button__bg"]} ` +
          (lang === "ru"
            ? styles["switch-button__bg--right"]
            : styles["switch-button__bg--left"])
        }
      />
      <button
        className={
          `${styles["switch-button__btn"]} ` +
          (lang === "en" ? styles["switch-button__btn--active"] : "")
        }
        onClick={onChange}
        type="button">
        en
      </button>
      <button
        className={
          `${styles["switch-button__btn"]} ` +
          (lang === "ru" ? styles["switch-button__btn--active"] : "")
        }
        onClick={onChange}
        type="button">
        ru
      </button>
    </div>
  );
};

export default memo(SwitchButton);
