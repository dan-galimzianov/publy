'use client';

import { Header, ErrorState, EmptyState, PageLoader } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePromptsQuery } from '@/repository/queries';
import { PromptCreateDrawer } from '@/components/PromptCreateDrawer';
import { PromptListItem } from '@/components/PromptListItem';

export default function PromptsPage() {
  const router = useRouter();
  const { data: prompts = [], error, isLoading } = usePromptsQuery();

  if (error) {
    return (
      <>
        <Header title="Промпты" />
        <ErrorState
          title="Ошибка загрузки"
          description="Не удалось загрузить промпты. Проверьте подключение к интернету."
          className="min-h-[60vh]"
        />
      </>
    );
  }

  if (!isLoading && prompts.length === 0) {
    return (
      <>
        <Header title="Промпты" />
        <EmptyState
          icon={Plus}
          title="Создайте свой первый промпт"
          description="Создавайте шаблоны для быстрого создания контента"
          actionLabel="Создать промпт"
          onAction={() => router.push('/prompts/create')}
          className="min-h-[60vh]"
        />
      </>
    );
  }

  return (
    <>
      <Header title="Промпты"/>
      <div className="px-6 py-4 pb-20">
        <div className="flex flex-col gap-2 h-px flex-1">
                <PromptCreateDrawer />
                {isLoading ? <PageLoader /> : (
                    prompts?.map((prompt) => (
                        <PromptListItem key={prompt.id} prompt={prompt} />
                    ))
                )}
            </div>
      </div>
    </>
  );
}
