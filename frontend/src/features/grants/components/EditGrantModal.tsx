import type { Grant } from "../../../types/grants";
import { useGrantForm } from "../hooks/useGrantForm";

interface Props {
  grant: Grant;
  onClose: () => void;
  onSave: (grant: Grant) => void;
}

const EditGrantModal = ({ grant, onClose, onSave }: Props) => {
  const { form, updateField, handleSubmit } = useGrantForm(grant, onSave);

  return (
    <div
      className="backdrop-blur-sm fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Source URL</label>
          <input
            value={form.sourceUrl}
            onChange={(e) => updateField("sourceUrl", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Category</label>
          <input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Deadline</label>
          <input
            value={form.expirationDate}
            onChange={(e) => updateField("expirationDate", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Status</label>
          <input
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="border p-2 rounded"
          />

          <label>Notes</label>
          <textarea
            rows={6}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-1 text-sm rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGrantModal;
