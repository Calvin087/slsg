import { useState } from "react";
import type { Grant } from "../../../types/grants";

type EditMode = "create" | "edit";

export const useEditingGrant = () => {
  const [grant, setGrant] = useState<Grant | null>(null);
  const [mode, setMode] = useState<EditMode>("create");

  const open = (grantToEdit?: Grant) => {
    if (grantToEdit) {
      setGrant(grantToEdit);
      setMode("edit");
    } else {
      setGrant({
        title: "",
        sourceUrl: "",
        category: "",
        expirationDate: new Date().toISOString(),
        status: "Pending",
        notes: "",
      });
      setMode("create");
    }
  };

  const close = () => {
    setGrant(null);
    setMode("create");
  };

  return {
    grant,
    mode,
    open,
    close,
    setGrant,
  };
};
