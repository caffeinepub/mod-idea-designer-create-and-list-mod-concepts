import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import type { ModIdea } from '../../backend';

const MOD_IDEAS_QUERY_KEY = ['modIdeas'];

export function useModIdeas() {
  const { actor, isFetching } = useActor();

  return useQuery<ModIdea[]>({
    queryKey: MOD_IDEAS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const ideas = await actor.getAllModIdeas();
      // Sort by createdAt descending (newest first)
      return ideas.sort((a, b) => Number(b.createdAt - a.createdAt));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateModIdea() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      gamePlatform: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.createModIdea(
        data.title,
        data.description,
        data.gamePlatform,
        data.tags
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MOD_IDEAS_QUERY_KEY });
    },
  });
}
