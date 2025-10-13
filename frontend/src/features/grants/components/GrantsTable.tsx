import { MdOutlineCreate, MdOutlineDelete } from "react-icons/md";
import { useGrantTable } from "../hooks/useGrantsTable";
import type { Grant } from "../../../types/grants";

type Props = {
  allGrants: Grant[];
  onEditGrant: (grant: Grant) => void;
  onDeleteGrant: (grantId: string) => void;
  onCreateGrant: () => void;
};

const GrantsTable = ({
  allGrants,
  onCreateGrant,
  onEditGrant,
  onDeleteGrant,
}: Props) => {
  const { getDaysLeft } = useGrantTable();

  return (
    <div className="overflow-x-auto rounded-t-sm">
      <button
        onClick={onCreateGrant}
        className="bg-indigo-900/50 mb-6 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-indigo-700"
      >
        + New Grant
      </button>{" "}
      <table className="w-full border-collapse text-sm">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr className="border-b-[0.25px] border-indigo-900/80 text-xs">
            {[
              "Title",
              "Category",
              "Deadline",
              "Days Left",
              "Status",
              "Notes",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="text-left font-normal p-2 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allGrants.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 p-6 italic">
                No opportunities found.
              </td>
            </tr>
          ) : (
            allGrants.map((grant: Grant) => {
              const daysLeft = getDaysLeft(grant.expirationDate);
              return (
                <tr
                  key={grant.grantId}
                  className="border-b-[0.25px] border-indigo-900/80 hover:bg-indigo-800/10"
                >
                  <td className="p-2">{grant.title}</td>
                  <td className="p-2">{grant.category}</td>
                  <td className="p-2">
                    {new Date(grant.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {daysLeft <= 0 ? "Expired" : `${daysLeft}`}
                  </td>
                  <td className="p-2">{grant.status ?? "-"}</td>
                  <td className="p-2">{grant.notes ?? ""}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="text-indigo-700/60 hover:text-indigo-900"
                      onClick={() => onEditGrant(grant)}
                    >
                      <MdOutlineCreate size={18} />
                    </button>
                    <button
                      className="text-red-600/60 hover:text-red-500"
                      onClick={() => onDeleteGrant(grant.grantId!)}
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
    </div>
  );
};

export default GrantsTable;
