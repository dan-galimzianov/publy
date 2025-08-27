import { usePromptsQuery } from "@/repository/queries"
import { PageLoader } from "@/shared/ui"
import { PromptCreateDrawer } from "../PromptCreateDrawer"
import { PromptListItem } from "../PromptListItem"

interface PromptSelectListProps {
    selectedPromptIds: string[]
    onPromptSelect: (promptId: string) => void
    onPromptToggle: (promptId: string) => void
}

export const PromptSelectList = ({ selectedPromptIds, onPromptSelect, onPromptToggle }: PromptSelectListProps) => {
    const { data: prompts, isLoading } = usePromptsQuery()


    return (

            <div className="flex flex-col gap-2 overflow-auto">
                <PromptCreateDrawer onCreation={(data) => onPromptSelect(data.id)} />
                {isLoading ? <PageLoader /> : (
                    prompts?.map((prompt) => (
                        <PromptListItem key={prompt.id} prompt={prompt} selectedPromptIds={selectedPromptIds} onPromptToggle={onPromptToggle} />
                    ))
                )}
            </div>
    )
}