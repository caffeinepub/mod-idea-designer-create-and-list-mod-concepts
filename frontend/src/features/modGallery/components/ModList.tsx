import React from 'react';
import { Layers } from 'lucide-react';
import type { PublicModData } from '@/backend';
import { ModCard } from './ModCard';

interface ModListProps {
  mods: PublicModData[];
  isFiltered?: boolean;
}

export function ModList({ mods, isFiltered = false }: ModListProps) {
  if (mods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Layers className="h-14 w-14 text-muted-foreground/40 mb-4" />
        {isFiltered ? (
          <>
            <p className="text-lg font-semibold text-foreground">Sonuç bulunamadı</p>
            <p className="text-sm text-muted-foreground mt-1">
              Arama kriterlerinize uygun mod bulunamadı. Farklı bir arama deneyin.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-foreground">Henüz mod yok</p>
            <p className="text-sm text-muted-foreground mt-1">
              İlk modu ekleyen sen ol! Aşağıdaki formu kullanarak modunu paylaş.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {mods.map((mod, idx) => (
        <ModCard key={`${mod.name}-${idx}`} mod={mod} />
      ))}
    </div>
  );
}
