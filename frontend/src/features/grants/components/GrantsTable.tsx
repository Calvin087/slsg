import { MdOutlineCreate, MdOutlineDelete } from "react-icons/md";
import { useGrantTable } from "../hooks/useGrantsTable";
import type { Grant } from "../../../types/grants";

interface Props {
  allGrants: Grant[];
  onEditGrant: (grant: Grant) => void;
  onDeleteGrant: (grantId: string) => void;
}

const GrantsTable = ({ allGrants, onEditGrant, onDeleteGrant }: Props) => {
  const { getDaysLeft } = useGrantTable();

  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {allGrants.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center text-gray-500 p-6 italic">
              No opportunities found.
            </td>
          </tr>
        ) : (
          allGrants.map((grant: Grant) => (
            <tr
              key={grant.grantId}
              className="border-b-[0.25px] border-indigo-900/80 hover:bg-indigo-800/10"
            >
              <td>{grant.title}</td>
              <td>{grant.category}</td>
              <td>{new Date(grant.expirationDate).toLocaleDateString()}</td>
              <td>{getDaysLeft(grant.expirationDate)} days</td>
              <td>{grant.status ?? "-"}</td>
              <td>{grant.notes ?? ""}</td>
              <td className="flex gap-2">
                <button onClick={() => onEditGrant(grant)}>
                  <MdOutlineCreate size={18} />
                </button>
                <button onClick={() => onDeleteGrant(grant.grantId)}>
                  <MdOutlineDelete size={18} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default GrantsTable;
