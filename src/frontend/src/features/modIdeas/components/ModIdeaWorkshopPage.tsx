import { Wrench, Sparkles } from 'lucide-react';
import { ModIdeaForm } from './ModIdeaForm';
import { ModIdeaList } from './ModIdeaList';
import { ModIdeaFilters } from './ModIdeaFilters';
import { useModIdeas } from '../queries';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function ModIdeaWorkshopPage() {
  const { data: modIdeas, isLoading, error } = useModIdeas();
  const [gameFilter, setGameFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  // Client-side filtering
  const filteredIdeas = modIdeas?.filter((idea) => {
    const matchesGame = !gameFilter || 
      idea.gamePlatform.toLowerCase().includes(gameFilter.toLowerCase());
    const matchesTag = !tagFilter || 
      idea.tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()));
    return matchesGame && matchesTag;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-workshop">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Mod Workshop
              </h1>
              <p className="text-sm text-muted-foreground">
                Design and share your creative mod ideas
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="border-2 shadow-workshop">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold">
                    Create New Mod Idea
                  </h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share your creative vision with the community
                </p>
              </div>
              <div className="p-6">
                <ModIdeaForm />
              </div>
            </Card>
          </div>

          {/* Right Column - List */}
          <div className="space-y-6">
            <Card className="border-2 shadow-workshop">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h2 className="font-display text-xl font-semibold">
                  Community Ideas
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse and explore mod concepts from creators
                </p>
              </div>
              
              <div className="p-6">
                <ModIdeaFilters
                  gameFilter={gameFilter}
                  tagFilter={tagFilter}
                  onGameFilterChange={setGameFilter}
                  onTagFilterChange={setTagFilter}
                />
                
                <Separator className="my-6" />
                
                {isLoading && (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </Card>
                    ))}
                  </div>
                )}
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to load mod ideas. Please try again later.
                    </AlertDescription>
                  </Alert>
                )}
                
                {!isLoading && !error && (
                  <ModIdeaList ideas={filteredIdeas} />
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
