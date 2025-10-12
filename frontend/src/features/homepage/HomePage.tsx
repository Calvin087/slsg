import GrantsTable from "../grants/components/GrantsTable";
import useGrants from "../grants/hooks/useGrants";

const HomePage = () => {
  const {
    grantsByUserIdQuery: {
      data: allGrants,
      error: allGrantsError,
      isLoading: allGrantsLoading,
    },
  } = useGrants();

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
        <>
          <GrantsTable allGrants={allGrants} />
        </>
      </div>
    </div>
  );
};

export default HomePage;
