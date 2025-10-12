import type { Grant } from "../../../types/grants";
import { useGrantForm } from "../hooks/useGrantForm";

type Props = {
  grant: Grant;
  onClose: () => void;
  onSave: (grant: Grant) => void;
};

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
        <h2 className="text-2xl mb-4 text-indigo-900/60 text-balance border-b border-gray-400/30">
          Edit Grant{" "}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <label htmlFor="title" className="mt-2">
            Title
          </label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
          />
          <label htmlFor="sourceUrl" className="mt-2">
            Source URL
          </label>
          <input
            id="sourceUrl"
            value={form.sourceUrl}
            onChange={(e) => updateField("sourceUrl", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
          />
          <label htmlFor="category" className="mt-2">
            Category
          </label>
          <input
            id="category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
          />
          <label htmlFor="deadline" className="mt-2">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={form.expirationDate ? form.expirationDate.split("T")[0] : ""}
            onChange={(e) => updateField("expirationDate", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
          />
          <label htmlFor="status" className="mt-2">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
          >
            {["Pending", "Applied", "Approved", "Rejected", "Reasearching"].map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ),
            )}
          </select>{" "}
          <label htmlFor="notes" className="mt-2">
            Notes
          </label>
          <textarea
            id="notes"
            rows={6}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="border border-gray-400/40 p-2 rounded bg-gray-400/10 text-black/80"
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
