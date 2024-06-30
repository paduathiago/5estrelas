import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Stars from '../stars/Stars'
import { Review } from '@/backTypes'
import { answerReview, updateFeedback } from '@/api'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'
import DialogCloseButton from '../dialog-answer/DialogAnswer'

function formatDateToString(date: Date) {
    if (!(date instanceof Date)) {
        throw new Error("O argumento deve ser um objeto Date.");
    }

    const formattedDate = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    });
    const formattedTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return `${formattedDate} - ${formattedTime}h`;
}




function UserReview({ ...props }: Review) {
    const [feedback, setFeedback] = useState(props.currentUserFeedback);

    const [openComment, setOpenComment] = useState(false);

    const [feedbackNumber, setFeedbackNumber] = useState({ 'LIKE': props.likes, 'DISLIKE': props.dislikes });

    const [commentDraft, setCommentDraft] = useState<string>(props.establishmentComment || "");

    const [comment, setComment] = useState(props.establishmentComment);

    function updateUserFeedback(newFeedback?: 'LIKE' | 'DISLIKE') {
        if (newFeedback === feedback && newFeedback !== undefined) {
            feedbackNumber[newFeedback] = feedbackNumber[newFeedback] - 1;
            setFeedbackNumber({ ...feedbackNumber });
            newFeedback = undefined
        }

        if (newFeedback) {
            if(newFeedback === 'LIKE' && feedback === 'DISLIKE') {
                feedbackNumber['DISLIKE'] = feedbackNumber['DISLIKE'] - 1;
            }
            if(newFeedback === 'DISLIKE' && feedback === 'LIKE') {
                feedbackNumber['LIKE'] = feedbackNumber['LIKE'] - 1;
            }
            feedbackNumber[newFeedback] = feedbackNumber[newFeedback] + 1;
            setFeedbackNumber({ ...feedbackNumber });
        }
        setFeedback(newFeedback);
        updateFeedback("userid", props.id, newFeedback);
    }

    function updateEstablishmentCommentDraft(ev: ChangeEvent<HTMLTextAreaElement>) {
        console.log(ev.target.value)
        setCommentDraft(ev.target.value);
    }

    function handlePopOver(e: boolean) {
        setOpenComment(e);

        if (!e) {
            setComment(commentDraft);
            answerReview(props.id, commentDraft);
        }
    }

    return (
        <Card>
            <CardHeader className='flex flex-row items-center gap-4'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* TODO: trocar userid aqui */}
                <CardTitle className='text-3xl'>{props.userId}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{props.comment}</p>
            </CardContent>
            <CardFooter className='flex flex-col gap-4 items-start'>
                <div className='flex justify-between gap-2 w-full'>
                    <div className='flex gap-2 items-center'>
                        <Stars score={props.rating}></Stars>
                        <p className='text-sm'>{formatDateToString(props.timestamp)}</p></div>
                    <div className='flex gap-2'>
                        {/* <Popover onOpenChange={handlePopOver}>
                            <PopoverTrigger asChild>
                                <Button variant={openComment ? "default" : "outline"} className='gap-1'>
                                    <MessageCircle />
                                    Responder
                                </Button></PopoverTrigger>
                            <PopoverContent className='w-96 h-44'>
                                <Textarea value={commentDraft} className='w-full h-full' onChange={updateEstablishmentCommentDraft}></Textarea>
                            </PopoverContent>
                        </Popover> */}
                        <DialogCloseButton></DialogCloseButton>
                        <Button variant={feedback === 'LIKE' ? "default" : "outline"} className='gap-1' onClick={() => updateUserFeedback('LIKE')}>
                            <ThumbsUp />
                            {feedbackNumber['LIKE']}
                        </Button>

                        <Button variant={feedback === 'DISLIKE' ? "default" : "outline"} className='gap-1' onClick={() => updateUserFeedback('DISLIKE')}>
                            <ThumbsDown />
                            {feedbackNumber['DISLIKE']}
                        </Button>
                    </div></div>

                {comment && <>

                    <Separator></Separator>

                    <h1 className='text-xl'>Resposta do estabelecimento:</h1>
                    <p>{comment}</p>
                </>}



            </CardFooter>
        </Card>
    )
}

export default UserReview;
