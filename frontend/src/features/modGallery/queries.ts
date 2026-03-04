import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { PublicModData } from '@/backend';

export function useGetAllMods() {
  const { actor, isFetching } = useActor();

  return useQuery<PublicModData[]>({
    queryKey: ['allMods'],
    queryFn: async () => {
      if (!actor) return [];
      const mods = await actor.getAllMods();
      // Sort newest-first
      return [...mods].sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SaveModInput {
  name: string;
  description: string;
  features: string[];
  authorName: string;
  category: string;
}

export function useSaveMod() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SaveModInput) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveMod(
        input.name,
        input.description,
        input.features,
        input.authorName,
        input.category
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allMods'] });
    },
  });
}
