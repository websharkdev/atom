"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../modals/SettingsModal";

type Props = {};

export const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
    </>
  );
};
