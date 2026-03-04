import React, { useState } from 'react';
import { PlusCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSaveMod } from '../queries';

interface FormState {
  name: string;
  description: string;
  features: string;
  authorName: string;
  category: string;
}

interface FormErrors {
  name?: string;
  authorName?: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  description: '',
  features: '',
  authorName: '',
  category: '',
};

export function ModSubmissionForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const saveModMutation = useSaveMod();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Mod adı zorunludur.';
    }
    if (!form.authorName.trim()) {
      newErrors.authorName = 'Yazar adı zorunludur.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const featuresArray = form.features
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    await saveModMutation.mutateAsync({
      name: form.name.trim(),
      description: form.description.trim(),
      features: featuresArray,
      authorName: form.authorName.trim(),
      category: form.category.trim(),
    });

    setForm(INITIAL_FORM);
    setErrors({});
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-2xl font-bold flex items-center gap-2">
          <PlusCircle className="h-6 w-6 text-primary" />
          Yeni Mod Ekle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Mod Name */}
            <div className="space-y-1.5">
              <Label htmlFor="mod-name" className="text-sm font-medium">
                Mod Adı <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mod-name"
                placeholder="Örn: Better Graphics Overhaul"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={saveModMutation.isPending}
                className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Author Name */}
            <div className="space-y-1.5">
              <Label htmlFor="author-name" className="text-sm font-medium">
                Yazar Adı <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author-name"
                placeholder="Örn: ModMaster42"
                value={form.authorName}
                onChange={(e) => handleChange('authorName', e.target.value)}
                disabled={saveModMutation.isPending}
                className={errors.authorName ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.authorName && (
                <p className="text-xs text-destructive">{errors.authorName}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-sm font-medium">
              Kategori
            </Label>
            <Input
              id="category"
              placeholder="Örn: Grafik, Oynanış, Silah, Karakter..."
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={saveModMutation.isPending}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-medium">
              Açıklama
            </Label>
            <Textarea
              id="description"
              placeholder="Modun ne yaptığını kısaca açıkla..."
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={saveModMutation.isPending}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Features */}
          <div className="space-y-1.5">
            <Label htmlFor="features" className="text-sm font-medium">
              Özellikler
            </Label>
            <Textarea
              id="features"
              placeholder="Virgülle ayırarak yaz: 4K Tekstürler, HDR Desteği, Yeni Silahlar"
              value={form.features}
              onChange={(e) => handleChange('features', e.target.value)}
              disabled={saveModMutation.isPending}
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Özellikleri virgülle ayırarak girin. Her özellik ayrı bir etiket olarak görünecek.
            </p>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-1">
            <Button
              type="submit"
              disabled={saveModMutation.isPending}
              className="font-semibold px-8"
            >
              {saveModMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                'Modu Paylaş'
              )}
            </Button>

            {showSuccess && (
              <span className="flex items-center gap-1.5 text-sm text-primary font-medium animate-fade-in">
                <CheckCircle2 className="h-4 w-4" />
                Mod başarıyla eklendi!
              </span>
            )}

            {saveModMutation.isError && (
              <span className="text-sm text-destructive">
                Bir hata oluştu. Lütfen tekrar deneyin.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
