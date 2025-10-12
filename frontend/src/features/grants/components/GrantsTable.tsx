import { useState } from "react";
import { MdOutlineCreate, MdOutlineDelete } from "react-icons/md";

const GrantsTable = ({ allGrants }: { allGrants: any[] }) => {
  const [editingGrant, setEditingGrant] = useState<any | null>();

  const getDaysLeft = (deadline: string) => {
    const diff =
      (new Date(deadline).getTime() - new Date().setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  return (
    <div className="overflow-x-auto rounded-t-sm">
      <table className="w-full border-collapse text-sm">
        {/* ... same headers ... */}
        <tbody>
          {allGrants.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 p-6 italic">
                No opportunities found.
              </td>
            </tr>
          ) : (
            allGrants.map((g: any) => {
              const daysLeft = getDaysLeft(g.expirationDate);
              return (
                <tr
                  key={g.grantId}
                  className="border-b-[0.25px] border-indigo-900/80 hover:bg-indigo-800/10"
                >
                  <td className="p-2">{g.title}</td>
                  <td className="p-2">{g.category}</td>
                  <td className="p-2">
                    {new Date(g.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {daysLeft < 0 ? "Expired" : `${daysLeft} days`}
                  </td>
                  <td className="p-2">{g.status ?? "-"}</td>
                  <td className="p-2">{g.notes ?? ""}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="p-1 text-indigo-700/60 hover:text-indigo-900"
                      onClick={() => setEditingGrant(g)}
                      title="Edit"
                    >
                      <MdOutlineCreate size={18} />
                    </button>
                    <button
                      className="p-1 text-red-600/60 hover:text-red-500"
                      onClick={() => console.log("Delete", g.grantId)}
                      title="Delete"
                    >
                      <MdOutlineDelete size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {editingGrant && (
        <div
          className="backdrop-blur-sm fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setEditingGrant(null)}
        >
          <div
            className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="mb-4 border-b-[0.25px] text-2xl text-indigo-900/80 text-balance">
              Edit Grant{" "}
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Saving", editingGrant);
                setEditingGrant(null);
              }}
              className="flex flex-col gap-3 text-sm"
            >
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.title}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, title: e.target.value })
                }
              />

              <label htmlFor="sourceUrl" className="mt-2">
                Source URL
              </label>
              <input
                id="sourceUrl"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.title}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, title: e.target.value })
                }
              />

              <label htmlFor="category" className="mt-2">
                Category
              </label>
              <input
                id="category"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.title}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, title: e.target.value })
                }
              />

              <label htmlFor="deadline" className="mt-2">
                Deadline{" "}
              </label>
              <input
                id="deadline"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.title}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, title: e.target.value })
                }
              />

              <label htmlFor="status" className="mt-2">
                Status{" "}
              </label>
              <input
                id="status"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.title}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, title: e.target.value })
                }
              />
              <label htmlFor="notes" className="mt-2">
                Notes{" "}
              </label>
              <textarea
                rows={6}
                id="notes"
                className="border border-gray-300 p-2 rounded bg-gray-100/50 text-gray-500"
                value={editingGrant.notes}
                onChange={(e) =>
                  setEditingGrant({ ...editingGrant, notes: e.target.value })
                }
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  className="px-3 py-1 text-sm"
                  onClick={() => setEditingGrant(null)}
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
      )}
    </div>
  );
};
export default GrantsTable;
