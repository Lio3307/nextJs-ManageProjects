"use client";

import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

export default function ModalTrigger({
  compo,
  buttonName,
}: {
  compo: ReactNode;
  buttonName: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal((prev) => !prev);
        }}
      >
        {buttonName}
      </Button>

      {showModal ? compo : null}
    </>
  );
}
