import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGrant,
  deleteGrant,
  getGrantsByUserId,
  updateGrant,
} from "../api/grantsApi";
import type { Grant } from "../../../types/grants";

const useGrants = () => {
  const queryClient = useQueryClient();

  const grantsByUserIdQuery = useQuery({
    queryKey: ["grants"],
    queryFn: getGrantsByUserId,
  });

  const createGrantMutation = useMutation({
    mutationFn: (grant: Grant) => createGrant(grant),
    onMutate: () => queryClient.invalidateQueries({ queryKey: ["grants"] }),
  });

  const updateGrantMutation = useMutation({
    mutationFn: (grantUpdate: Grant) => updateGrant(grantUpdate),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["grants"] });
    },
  });

  const deleteGrantMutation = useMutation({
    mutationFn: (grantId: string) => deleteGrant(grantId),
    onMutate: () => queryClient.invalidateQueries({ queryKey: ["grants"] }),
  });

  return {
    grantsByUserIdQuery,
    createGrantMutation,
    updateGrantMutation,
    deleteGrantMutation,
  };
};

export default useGrants;
