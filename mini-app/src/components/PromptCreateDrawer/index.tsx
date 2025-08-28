import { Button, Drawer, DrawerContent, DrawerTrigger, Input } from "@/shared/ui"
import { DrawerFooter } from "@/shared/ui/drawer"
import { Loader2, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useCreatePromptMutation } from "@/repository/mutations"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useId, useState } from "react";
import { Textarea } from "@/shared/ui/textarea"
import { Prompt } from "@/types"

type PromptCreateDrawerProps = {
    onCreation?: (data: Prompt) => void
}

const schema = z.object({
    name: z.string().min(1, "Название промпта не может быть пустым"),
    text: z.string().min(1, "Текст промпта не может быть пустым"),
})

export const PromptCreateDrawer = ({onCreation}: PromptCreateDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const formId = useId()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {name: "", text: ""},
    })

    const { mutate: createPrompt, isPending } = useCreatePromptMutation({
        onSuccess: (data) => {
            onCreation?.(data)
            setIsOpen(false)
            form.reset()
        },
    })

    const onSubmit = (data: z.infer<typeof schema>) => {
        createPrompt(data)
    }

    const onOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange} repositionInputs={false} >
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start p-5">
                    <PlusIcon className="w-4 h-4" />
                    Создать новый промпт
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <Form {...form}>
                <div className="p-5 overflow-auto">
                    <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            <Textarea rows={10}  {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
                </div>

                <DrawerFooter>
                    <Button type="submit" form={formId} disabled={isPending}>Создать {isPending && <Loader2 className="w-4 h-4 animate-spin" />}</Button>
                </DrawerFooter>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}