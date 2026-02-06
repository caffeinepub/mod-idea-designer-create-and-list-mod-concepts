import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ModIdeaFiltersProps {
  gameFilter: string;
  tagFilter: string;
  onGameFilterChange: (value: string) => void;
  onTagFilterChange: (value: string) => void;
}

export function ModIdeaFilters({
  gameFilter,
  tagFilter,
  onGameFilterChange,
  onTagFilterChange,
}: ModIdeaFiltersProps) {
  const hasActiveFilters = gameFilter || tagFilter;

  const clearFilters = () => {
    onGameFilterChange('');
    onTagFilterChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filter Ideas</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gameFilter" className="text-xs font-medium">
            Game / Platform
          </Label>
          <Input
            id="gameFilter"
            value={gameFilter}
            onChange={(e) => onGameFilterChange(e.target.value)}
            placeholder="Filter by game..."
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagFilter" className="text-xs font-medium">
            Tag
          </Label>
          <Input
            id="tagFilter"
            value={tagFilter}
            onChange={(e) => onTagFilterChange(e.target.value)}
            placeholder="Filter by tag..."
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
}
