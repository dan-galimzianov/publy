'use client';

import { useEffect, useId } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useAiGenerationStore } from '@/shared/stores';
import { useCreatePostMutation } from '@/repository/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';
import { withAiStep, type AiStepComponentProps } from '../withAiStep';

const formSchema = z.object({
  content: z.string().min(1, { message: "Текст поста не может быть пустым" }).max(10000, { message: "Текст поста не может быть больше 10000 символов" }),
});

function AiPreviewPage({ }: AiStepComponentProps) {
  const id = useId();
  const router = useRouter();
  const { editablePost, setEditablePost, reset, getPreviousStep, setCurrentStep } = useAiGenerationStore();
  const { mutate: createPost, isPending: isSaving } = useCreatePostMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: editablePost?.content || '',
    }
  });

  useEffect(() => {
    if (editablePost?.content) {
      form.reset({ content: editablePost.content });
    }
  }, [editablePost?.content, form]);

  const handleRegeneratePost = () => {
    const prevStep = getPreviousStep('preview');
    if (prevStep) {
      setCurrentStep(prevStep);
      router.push(`/create/ai/${prevStep}`);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createPost({
      content: data.content.trim(),
    }, {
      onSuccess: () => {
        toast.success('Пост сохранен! Ваш пост успешно создан');
        reset(); // Сбрасываем состояние
        router.push('/posts');
      },
      onError: (error) => {
        console.error('Ошибка сохранения поста:', error);
        toast.error('Не удалось сохранить пост. Попробуйте еще раз.');
      }
    });
  };

  // Обновляем editablePost при изменении формы
  const handleContentChange = (value: string) => {
    if (editablePost) {
      setEditablePost({
        ...editablePost,
        content: value
      });
    }
  };

  if (!editablePost) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Пост не найден</p>
        <Button onClick={() => router.push('/create/ai/topic')} className="mt-4">
          Начать заново
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
      <div className="mb-6 flex flex-col flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col" id={id}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Текст поста</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleContentChange(e.target.value);
                      }}
                      className="flex-1 min-h-[300px] resize-none leading-relaxed"
                      placeholder="Содержание поста..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleRegeneratePost}
          variant="outline"
          className="flex-1"
          size="sm"
          disabled={isSaving}
        >
          <RefreshCw size={16} className="mr-2" />
          Пересоздать
        </Button>
        <Button
          type="submit"
          form={id}
          disabled={isSaving}
          className="flex-1"
          size="sm"
        >
          <Save size={16} className="mr-2" />
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </div>
  );
}

export default withAiStep(AiPreviewPage, {
  step: 'preview',
  title: 'Предварительный просмотр'
});