import { Label } from "@/shared/ui/label"
import { Post } from "@/types/post"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { ChevronDown, ChevronUp, Copy, Edit3 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface PostListItemProps {
    post: Post
}

export const PostListItem = ({ post }: PostListItemProps) => {
    const [isContentShown, setIsContentShown] = useState(false)
    const isShownMoreButtonVisible = post.content.length > 100

    const copyToClipboard = () => {
        navigator.clipboard.writeText(post.content)
        toast.success('Скопировано в буфер обмена', {
            duration: 1000,
            position: 'top-right',
        })
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED':
                return 'bg-green-500';
            case 'DRAFT':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">
            <div className="grid gap-2.5 font-normal w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(post.status)}`} />
                        <p className="text-sm leading-none font-medium text-gray-500">
                            {formatDate(post.createdAt)}
                        </p>
                    </div>
                <div className="flex items-center gap-2 ml-auto">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/posts/edit/${post.id}`}>
                            <Edit3 size={14} />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                        <Copy size={14} />
                    </Button>
                </div>

                </div>
                <p className="text-muted-foreground text-sm">
                    {isShownMoreButtonVisible ? (isContentShown ? post.content : `${post.content.slice(0, 100)}...`) : post.content}
                </p>
                {isShownMoreButtonVisible && (
                    <Button variant="ghost" className="flex-1" onClick={() => setIsContentShown(!isContentShown)}>
                        <span className="text-xs">{isContentShown ? 'Скрыть' : 'Показать'}</span>
                        {isContentShown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                )}

            </div>
        </Label>    
    )
}
