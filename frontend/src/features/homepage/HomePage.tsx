import EditGrantModal from "../grants/components/EditGrantModal";
import GrantsTable from "../grants/components/GrantsTable";
import { useEditingGrant } from "../grants/hooks/useEditGrant";
import useGrants from "../grants/hooks/useGrants";

const HomePage = () => {
  const { grantsByUserIdQuery, updateGrantMutation, deleteGrantMutation } =
    useGrants();

  const { data: allGrants, isLoading: allGrantsLoading } = grantsByUserIdQuery;

  const { editingGrant, open, close } = useEditingGrant();

  if (allGrantsLoading) return "Loading";

  return (
    <div className="text-black/60 bg-[#f8f6f1] min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
      <div className="sm:px-6 lg:px-8 mx-auto">
        <h1 className="text-4xl text-indigo-900/80 text-balance">
          Grant & Opportunity Watchlist{" "}
        </h1>
        <h2 className="text-2xl mb-10 text-indigo-900/60 text-balance">
          Track and manage public funding opportunities
        </h2>
        <GrantsTable
          allGrants={allGrants}
          onEditGrant={open}
          onDeleteGrant={deleteGrantMutation.mutate}
        />
        {editingGrant && (
          <EditGrantModal
            grant={editingGrant}
            onClose={close}
            onSave={updateGrantMutation.mutate}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
