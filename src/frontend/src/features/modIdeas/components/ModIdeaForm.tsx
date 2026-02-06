import { useState } from 'react';
import { useCreateModIdea } from '../queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function ModIdeaForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gamePlatform, setGamePlatform] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const createMutation = useCreateModIdea();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      errors.description = 'Description is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    try {
      await createMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        gamePlatform: gamePlatform.trim() || 'General',
        tags,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setGamePlatform('');
      setTagsInput('');
      setValidationErrors({});
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to create mod idea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {showSuccess && (
        <Alert className="border-primary bg-primary/10 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            Mod idea created successfully!
          </AlertDescription>
        </Alert>
      )}

      {createMutation.isError && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to create mod idea. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your mod idea title"
          className={validationErrors.title ? 'border-destructive' : ''}
        />
        {validationErrors.title && (
          <p className="text-sm text-destructive">{validationErrors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your mod idea in detail..."
          rows={5}
          className={validationErrors.description ? 'border-destructive' : ''}
        />
        {validationErrors.description && (
          <p className="text-sm text-destructive">{validationErrors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gamePlatform" className="text-sm font-medium">
          Game / Platform
        </Label>
        <Input
          id="gamePlatform"
          value={gamePlatform}
          onChange={(e) => setGamePlatform(e.target.value)}
          placeholder="e.g., Minecraft, Skyrim, Unity"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">
          Tags
        </Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="gameplay, graphics, multiplayer (comma-separated)"
        />
        <p className="text-xs text-muted-foreground">
          Separate tags with commas
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          'Create Mod Idea'
        )}
      </Button>
    </form>
  );
}
