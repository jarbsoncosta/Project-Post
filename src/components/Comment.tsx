import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps{
    content:string;
    onDeleteComment:(content:string) => void
}

export function Comment({ content, onDeleteComment }:CommentProps) {
    const [likeCount, setLikeCount] = useState(0)
    function handleLikeComment() {
        setLikeCount((state)=>{
            return state + 1
        })
    }

    //Contador de likes
    function handleDeleteComment() {
        onDeleteComment(content)
    }
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/80639874?v=4" alt="" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Jarbson Costa</strong>
                            <time title="18 de agosto de 2022" dateTime='2022-08-18 00:13:30'>Cerca de 1h atrás</time>

                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content} </p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>
    )
}