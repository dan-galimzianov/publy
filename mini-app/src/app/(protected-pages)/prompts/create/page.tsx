'use client';

import { useCreatePromptMutation } from "@/repository/mutations/useCreatePromptMutation";
import { Button, Header, Input } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";

const formSchema = z.object({
    name: z.string().min(1),
    text: z.string().min(1),
})

export default function CreatePromptPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {text: "", name: ""}
    })

    const { mutate: createPrompt, isPending } = useCreatePromptMutation()

    const onSubmit = ({text, name}: z.infer<typeof formSchema>) => createPrompt({text, name})

    const handleBack = () => router.back();

    return (
        <div>
            <Header title="Создание промпта" showBackButton onBackClick={handleBack} />
            <div className="py-6 pb-0.5 px-6 max-w-4xl mx-auto">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <FormItem>
                        <FormLabel>Текст промпта</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} size="sm" className="w-full">Создать</Button>
            </form>
            </Form>
            </div>
        </div>
    )
}