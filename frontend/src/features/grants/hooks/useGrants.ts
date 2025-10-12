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
    staleTime: 1000 * 60 * 5,
  });

  const createGrantMutation = useMutation({
    mutationFn: (grant: Grant) => createGrant(grant),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grants"] }),
  });

  const updateGrantMutation = useMutation({
    mutationFn: (grantUpdate: Grant) => updateGrant(grantUpdate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grants"] }),
  });

  const deleteGrantMutation = useMutation({
    mutationFn: (grantId: string) => deleteGrant(grantId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["grants"] }),
  });

  return {
    grantsByUserIdQuery,
    createGrantMutation,
    updateGrantMutation,
    deleteGrantMutation,
  };
};

export default useGrants;
