import { useState } from "react";
import type { Grant } from "../../../types/grants";

export const useGrantForm = (
  initialGrant: Grant,
  onSave: (grant: Grant) => void,
) => {
  const [form, setForm] = useState(initialGrant);

  const updateField = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return { form, updateField, handleSubmit, setForm };
};
