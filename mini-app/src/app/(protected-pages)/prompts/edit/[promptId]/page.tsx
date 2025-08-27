'use client'

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/shared/ui/header"
import { PageLoader } from "@/shared/ui/page-loader"
import { usePromptQuery } from "@/repository/queries"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDeletePromptMutation, useUpdatePromptMutation } from "@/repository/mutations"
import { Prompt } from "@/types/prompt"
import { Textarea } from "@/shared/ui/textarea"
import { useEffect, useId } from "react"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(1, {message: "Название промпта не может быть пустым"}).max(255, {message: "Название промпта не может быть больше 255 символов"}),
    text: z.string().min(1, {message: "Текст промпта не может быть пустым"}).max(10000, {message: "Текст промпта не может быть больше 10000 символов"}),
})

type EditPromptFormProps = {
    prompt: Prompt
}

export const EditPromptForm = ({prompt}: EditPromptFormProps) => {
    const id = useId()  
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {text: prompt.text, name: prompt.name}
    })

    const { mutate: deletePrompt, isPending: isDeleting } = useDeletePromptMutation()

    const { mutate: updatePrompt, isPending } = useUpdatePromptMutation({
        onSuccess: () => {
            toast.success("Промпт успешно обновлен", {
                position: "top-right",
                duration: 1000,
            })
        },
        onError: () => {
            toast.error("Ошибка при обновлении промпта", {
                position: "top-right",
                duration: 1000,
            })
        }
    })

    const buttonsDisabled = isPending || isDeleting

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        updatePrompt({id: prompt.id, data})
    }

    const onDelete = () => {
        if (window.history.length > 1) router.back();
        else router.replace("/prompts");
        deletePrompt(prompt.id)
    }

    useEffect(() => {
        form.reset({text: prompt.text, name: prompt.name})
        return () => form.reset()
    }, [prompt])

    return (
        <div className="flex flex-col flex-1">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1 flex flex-col mb-2" id={id}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Название промпта</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                        <FormLabel>Текст промпта</FormLabel>
                        <FormControl>
                            <Textarea rows={10} className="flex-1" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            </Form>
            <div className="flex justify-between gap-2 mt-4 mb-2">
                <Button type="button" variant="destructive" size="sm" form={id} onClick={onDelete} disabled={buttonsDisabled}>Удалить</Button>
                <Button type="submit" disabled={buttonsDisabled} size="sm" className="flex-1" form={id}>Сохранить</Button>
            </div>
    </div>
        
    )

}

export default function EditPromptPage() {
    const { promptId } = useParams<{ promptId: string }>()
    const { data: prompt, isLoading } = usePromptQuery(promptId as string)


    return (
        <>
            <Header title="Редактирование промпта" showBackButton />
            <div className="p-6 pb-0.5 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
                {isLoading ? <PageLoader /> : (
                    <div className="flex flex-col flex-1">
                        <EditPromptForm prompt={prompt!} />
                    </div>
                )}
            </div>
        </>
    )
}