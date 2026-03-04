import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ModSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ModSearchBar({ value, onChange }: ModSearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Mod adı veya özelliğine göre ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 text-base bg-card border-border focus:ring-2 focus:ring-primary/50 rounded-lg"
      />
    </div>
  );
}
