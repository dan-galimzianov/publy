'use client'

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/shared/ui/header"
import { PageLoader } from "@/shared/ui/page-loader"
import { usePostQuery } from "@/repository/queries"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Button } from "@/shared/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDeletePostMutation, useUpdatePostMutation } from "@/repository/mutations"
import { Post } from "@/types/post"
import { Textarea } from "@/shared/ui/textarea"
import { useEffect, useId } from "react"
import { toast } from "sonner"

const formSchema = z.object({
    content: z.string().min(1, {message: "Текст поста не может быть пустым"}).max(10000, {message: "Текст поста не может быть больше 10000 символов"}),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const),
})

type EditPostFormProps = {
    post: Post
}

export const EditPostForm = ({post}: EditPostFormProps) => {
    const id = useId()  
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {content: post.content, status: post.status}
    })

    const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation()

    const { mutate: updatePost, isPending } = useUpdatePostMutation({
        onSuccess: () => {
            toast.success("Пост успешно обновлен", {
                position: "top-right",
                duration: 1000,
            })
        },
        onError: () => {
            toast.error("Ошибка при обновлении поста", {
                position: "top-right",
                duration: 1000,
            })
        }
    })

    const buttonsDisabled = isPending || isDeleting

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        updatePost({id: post.id, data})
    }

    const onDelete = () => {
        if (window.history.length > 1) router.back();
        else router.replace("/posts");
        deletePost(post.id)
    }

    useEffect(() => () => form.reset(), [])

    useEffect(() => {
        form.reset({content: post.content, status: post.status})
    }, [post])

    return (
        <div className="flex flex-col flex-1">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1 flex flex-col mb-2" id={id}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                        <FormLabel>Текст поста</FormLabel>
                        <FormControl>
                            <Textarea rows={10} className="flex-1" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            </Form>
            <div className="flex justify-between gap-2 mt-auto mb-2">
                <Button type="button" variant="destructive" size="sm" form={id} onClick={onDelete} disabled={buttonsDisabled}>Удалить</Button>
                <Button type="submit" disabled={buttonsDisabled} size="sm" className="flex-1" form={id}>Сохранить</Button>
            </div>
    </div>
        
    )
}

export default function EditPostPage() {
    const { postId } = useParams<{ postId: string }>()
    const { data: post, isLoading } = usePostQuery(postId as string)

    return (
        <>
            <Header title="Редактирование поста" showBackButton />
            <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
                {isLoading ? <PageLoader /> : (
                    <div className="flex flex-col flex-1">
                        <EditPostForm post={post!} />
                    </div>
                )}
            </div>
        </>
    )
}
