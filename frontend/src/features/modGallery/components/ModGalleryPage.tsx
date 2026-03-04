import React, { useState, useMemo } from 'react';
import { Gamepad2, Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllMods } from '../queries';
import { ModSearchBar } from './ModSearchBar';
import { ModSubmissionForm } from './ModSubmissionForm';
import { ModList } from './ModList';

export function ModGalleryPage() {
  const [search, setSearch] = useState('');
  const { data: mods = [], isLoading } = useGetAllMods();

  const filteredMods = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mods;
    return mods.filter((mod) => {
      const nameMatch = mod.name.toLowerCase().includes(q);
      const featureMatch = mod.features.some((f) => f.toLowerCase().includes(q));
      const categoryMatch = mod.category.toLowerCase().includes(q);
      const authorMatch = mod.authorName.toLowerCase().includes(q);
      return nameMatch || featureMatch || categoryMatch || authorMatch;
    });
  }, [mods, search]);

  const isFiltered = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/15 border border-primary/30">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground tracking-wide">
                MOD GALERİSİ
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Tüm modları keşfet, paylaş ve ara
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {isLoading ? '...' : `${mods.length} mod`}
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full overflow-hidden max-h-48 sm:max-h-64">
        <img
          src="/assets/generated/gallery-banner.dim_1200x300.png"
          alt="Mod Galerisi Banner"
          className="w-full object-cover object-center"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Search */}
        <section>
          <ModSearchBar value={search} onChange={setSearch} />
        </section>

        {/* Submission Form */}
        <section>
          <ModSubmissionForm />
        </section>

        {/* Gallery */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-foreground tracking-wide">
              {isFiltered ? `Arama Sonuçları` : 'Tüm Modlar'}
            </h2>
            {isFiltered && (
              <span className="text-sm text-muted-foreground">
                {filteredMods.length} sonuç bulundu
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ModList mods={filteredMods} isFiltered={isFiltered} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/60 mt-auto">
        <div className="container max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Mod Galerisi. Tüm hakları saklıdır.</span>
          <span className="flex items-center gap-1.5">
            Built with{' '}
            <Heart className="h-4 w-4 text-primary fill-primary" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'mod-gallery')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
