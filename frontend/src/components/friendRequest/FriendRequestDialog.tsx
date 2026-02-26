import React from 'react'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '../ui/tabs'
import { useFriendStore } from '../../stores/useFriendStore'
import SentRequest from './SentRequest'
import ReceivedRequest from './ReceivedRequest'

interface FriendRequestDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const FriendRequestDialog = ({ open, setOpen }: FriendRequestDialogProps) => {
    const [tab, setTab] = useState("received");
    const { getAllFriendRequest } = useFriendStore();

    useEffect(() => {
        const loadRequest = async () => {
            try {
                await getAllFriendRequest();
            } catch (error) {
                console.error("Failed to load friend requests", error);
            }
        }
        loadRequest();
    }, [])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Friend requests</DialogTitle>
                </DialogHeader>
                <Tabs
                    value={tab}
                    onValueChange={setTab}
                    className='w-full'
                >
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='received'>Received</TabsTrigger>
                        <TabsTrigger value='sent'>Sent</TabsTrigger>
                    </TabsList>

                    <TabsContent value='received'>
                        <ReceivedRequest/>
                    </TabsContent>
                    <TabsContent value='sent'>
                        <SentRequest />
                    </TabsContent>
                </Tabs>
            </DialogContent>

        </Dialog>
    )
}

export default FriendRequestDialog
