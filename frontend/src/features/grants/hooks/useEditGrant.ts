import { useState } from "react";
import type { Grant } from "../../../types/grants";

export const useEditingGrant = () => {
  const [editingGrant, setEditingGrant] = useState<any | null>(null);

  const open = (grant: Grant) => setEditingGrant(grant);
  const close = () => setEditingGrant(null);

  return {
    editingGrant,
    open,
    close,
    setEditingGrant,
  };
};
