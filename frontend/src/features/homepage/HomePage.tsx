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

  return "MAIN PAGE";
};

export default HomePage;
