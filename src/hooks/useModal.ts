import { useCallback, useState } from "react";

export const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onConfirm = useCallback(() => setIsOpen(false), []);

  return { isOpen, onOpen, onClose, onToggle, onConfirm };
};
