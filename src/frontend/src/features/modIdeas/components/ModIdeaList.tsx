import { useState } from 'react';
import type { ModIdea } from '../../../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Calendar, Gamepad2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ModIdeaListProps {
  ideas: ModIdea[];
}

export function ModIdeaList({ ideas }: ModIdeaListProps) {
  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Gamepad2 className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-lg font-semibold">No mod ideas yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Be the first to share your creative vision!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <ModIdeaCard key={idea.id.toString()} idea={idea} />
      ))}
    </div>
  );
}

function ModIdeaCard({ idea }: { idea: ModIdea }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const shouldTruncate = idea.description.length > 150;

  return (
    <Card className="transition-shadow hover:shadow-md animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-display text-lg leading-tight">
            {idea.title}
          </CardTitle>
        </div>
        
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>{idea.gamePlatform}</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(idea.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="text-sm leading-relaxed text-foreground/90">
            {shouldTruncate && !isOpen ? (
              <p>{truncateText(idea.description, 150)}</p>
            ) : (
              <p>{idea.description}</p>
            )}
          </div>
          
          {shouldTruncate && (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
              >
                {isOpen ? (
                  <>
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
        
        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {idea.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
