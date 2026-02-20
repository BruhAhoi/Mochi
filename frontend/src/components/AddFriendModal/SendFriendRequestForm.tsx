import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import type { IFormValues } from '../chat/AddFriendModal'
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';

interface SendRequestProps {
    register: UseFormRegister<IFormValues>;
    loading: boolean;
    searchUsername: string;
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    onBack: () => void;
}
const SendFriendRequestForm = ({ register, loading, searchUsername, onSubmit, onBack }: SendRequestProps) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <span className='success-message'>
                    Found <span className='font-semibold'>@{searchUsername}</span>
                </span>
                <div className='space-y-4 mb-4'>
                    <Label htmlFor='message' className='text-sm font-semibold'>
                        Message
                    </Label>
                    <Textarea
                        id='message'
                        rows={3}
                        placeholder='Hi! Can we be friends ?'
                        className='glass border-border/50 focus:border-primary/50 transition-smooth resize-none '
                        {...register("message")}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type='button'
                        variant='outline'
                        className='flex-1 glass hover:text-destructive'
                        onClick={onBack}
                    >
                        Back
                    </Button>
                    <Button
                        type='submit'
                        disabled={loading}
                        className='flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth'
                    >
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <UserPlus className='size-4 mr-2' /> Add friend
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </div>
        </form>
    )
}

export default SendFriendRequestForm
