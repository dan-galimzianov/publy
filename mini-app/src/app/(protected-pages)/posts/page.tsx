'use client';

import { Header, ErrorState, EmptyState, PageLoader } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePostsQuery } from '@/repository/queries';
import { PostListItem } from '@/components/PostListItem';

export default function PostsPage() {
  const router = useRouter();
  const { data: posts = [], error, isLoading } = usePostsQuery();

  if (isLoading) {
    return (
      <>
        <Header title="Посты" />
        <PageLoader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Посты" />
        <ErrorState
          title="Ошибка загрузки"
          description="Не удалось загрузить посты. Проверьте подключение к интернету."
          className="min-h-[60vh]"
        />
      </>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <>
        <Header title="Посты" />
        <EmptyState
          icon={Plus}
          title="Создайте свой первый пост"
          description="Используйте голосовое сообщение или введите текст вручную"
          actionLabel="Начать"
          onAction={() => router.push('/')}
          className="min-h-[60vh]"
        />
      </>
    );
  }

  return (
    <>
      <Header title="Посты"/>
      <div className="px-6 py-4 pb-20">
        <div className="flex flex-col gap-2 h-px flex-1">
          {isLoading ? <PageLoader /> : (
            posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
