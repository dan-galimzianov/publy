import { Label } from "@/shared/ui/label"
import { Checkbox } from "@/shared/ui/checkbox"
import { Prompt } from "@/types/prompt"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { ChevronDown, ChevronUp, Edit3 } from "lucide-react"
import Link from "next/link"

interface PromptListItemProps {
    prompt: Prompt
    selectedPromptIds?: string[]
    onPromptToggle?: (promptId: string) => void
}

export const PromptListItem = ({ prompt, selectedPromptIds, onPromptToggle }: PromptListItemProps) => {
    const [isPromptShown, setIsPromptShown] = useState(false)
    const isShownMoreButtonVisible = prompt.text.length > 100

    return (
        <Label key={prompt.id} className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            {onPromptToggle && (
                        <Checkbox
                            id={prompt.id}
                            checked={selectedPromptIds?.includes(prompt.id)}
                            onCheckedChange={() => onPromptToggle(prompt.id)}
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
            )}
                            <div className="grid gap-1.5 font-normal w-full">
                                <div className="flex items-center justify-between">
                                <p className="text-sm leading-none font-medium">
                                    {prompt.name}
                                </p>
                                <Link href={`/prompts/edit/${prompt.id}`}>
                                    <Edit3 size={14} />
                                </Link>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {isShownMoreButtonVisible ? (isPromptShown ? prompt.text : `${prompt.text.slice(0, 100)}...`) : prompt.text}
                            </p>
                            {isShownMoreButtonVisible && (
                                <Button variant="ghost" onClick={() => setIsPromptShown(!isPromptShown)} className="w-full">
                                    <span className="text-xs">{isPromptShown ? 'Скрыть' : 'Показать'}</span>
                                    {isPromptShown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </Button>
                            )}
                            </div>
                        </Label>    
    )
}