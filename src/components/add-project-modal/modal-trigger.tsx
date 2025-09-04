"use client";

import {  useState, cloneElement, isValidElement, ReactElement } from "react";
import { Button } from "../ui/button";

type WithOnClose = { onClose?: () => void };

export default function ModalTrigger({
  compo,
  buttonName,
}: {
  compo: ReactElement<WithOnClose>;
  buttonName: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
      className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        {buttonName}
      </Button>

      {showModal && isValidElement(compo)
        ? cloneElement(compo, { onClose: () => setShowModal(false) })
        : null}
    </>
  );
}
