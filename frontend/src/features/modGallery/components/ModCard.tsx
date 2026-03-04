import React from 'react';
import { User, Tag, Calendar, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PublicModData } from '@/backend';
import { formatModDate } from '../utils/dateFormatting';

interface ModCardProps {
  mod: PublicModData;
}

export function ModCard({ mod }: ModCardProps) {
  return (
    <Card className="bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-glow animate-fade-in flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display text-xl font-bold text-foreground leading-tight">
            {mod.name}
          </CardTitle>
          {mod.category && (
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-primary/15 text-primary border border-primary/30">
              {mod.category}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        {mod.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {mod.description}
          </p>
        )}

        {mod.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mod.features.map((feature, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs bg-accent/20 text-accent-foreground border border-accent/30 hover:bg-accent/30 transition-colors"
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {mod.authorName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatModDate(mod.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
