import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

interface Author {
    name: string;
    role: string;
    avatarUrl: string
}
interface Content{
    type: "paragraph" | "link",
    content:string
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content []
}


export function Post({ author, publishedAt, content }: PostProps) {
    //data da publicação
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    })
    //data da publicação relativa a data atual
    const publishDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true
    })

    const [comments, setComments] = useState([
        "Muito bom Devon, parabéns!! 👏👏"
    ])
console.log(comments)
    const [newCommentFormat, setNewCommentFormat] = useState("")

    //Criar comentário
    const handleCreateNewPost = (event: FormEvent) => {
        event.preventDefault()
        setComments([...comments, newCommentFormat])
        setNewCommentFormat("")
    }

    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")
        setNewCommentFormat(event?.target.value)
    }
    function commentsWithoutDeleteOne(event:InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório")
    }

    //Deletar comentário
    function deleteComment(commentToDelete:string) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeleteOne)
    }

    const isNewCommentEmpty = newCommentFormat.length === 0
    return (

        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name} </strong>
                        <span>{author.role}</span>

                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishDateRelativeToNow} </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if (line.type === "paragraph") {
                        return (
                            <p key={line.content}>{line.content}</p>
                        )
                    } else if (line.type === "link") {
                        return (
                            <p key={line.content}><a href="#">{line.content} </a> </p>
                        )
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewPost} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    value={newCommentFormat}
                    onInvalid={commentsWithoutDeleteOne}
                    required
                    onChange={handleNewCommentChange}
                    placeholder='Deixe seu comentário'
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>
    )
}