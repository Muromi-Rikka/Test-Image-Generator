import type { DriveStep } from "driver.js";
import { driver } from "driver.js";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "driver.js/dist/driver.css";

interface DriverGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

export function DriverGuide({ isVisible, onClose }: DriverGuideProps) {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isVisible) {
      // 定义引导步骤
      const steps: DriveStep[] = [
        {
          element: ".driver-guide-title",
          popover: {
            title: t("driver.welcome.title"),
            description: t("driver.welcome.description"),
            side: "bottom",
          },
        },
        {
          element: ".driver-guide-size",
          popover: {
            title: t("driver.size.title"),
            description: t("driver.size.description"),
            side: "right",
          },
        },
        {
          element: ".driver-guide-text",
          popover: {
            title: t("driver.text.title"),
            description: t("driver.text.description"),
            side: "right",
          },
        },
        {
          element: ".driver-guide-color",
          popover: {
            title: t("driver.color.title"),
            description: t("driver.color.description"),
            side: "right",
          },
        },
        {
          element: ".driver-guide-preset",
          popover: {
            title: t("driver.preset.title"),
            description: t("driver.preset.description"),
            side: "right",
          },
        },
        {
          element: ".driver-guide-save",
          popover: {
            title: t("driver.save.title"),
            description: t("driver.save.description"),
            side: "top",
          },
        },
      ];

      // 初始化DriverJS
      const driverObj = driver({
        showProgress: true,
        nextBtnText: t("driver.next"),
        prevBtnText: t("driver.prev"),
        doneBtnText: t("driver.done"),
        onDestroyed: onClose,
        steps,
      });

      driverRef.current = driverObj;

      // 开始引导
      driverObj.drive();
    }

    return () => {
      // 清理
      if (driverRef.current) {
        try {
          driverRef.current.destroy();
        }
        catch {
          // 忽略清理错误
        }
      }
    };
  }, [isVisible, onClose, t]);

  return null;
}
