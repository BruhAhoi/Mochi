import React from 'react'
import { useFriendStore } from '../../stores/useFriendStore'
import FrientRequestItem from './FrientRequestItem';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ReceivedRequest = () => {
    const { acceptRequest, declineRequest, loading, receivedList } = useFriendStore();

    if (!receivedList || receivedList.length === 0) {
        return (
            <p className='text-sm text-muted-foreground'>
                No received friend requests.
            </p>
        )
    }

    const handleAccept = async (requestId: string) => {
        try {
            await acceptRequest(requestId);
            toast.success("Friend request accepted");
        } catch (error) {
            console.error("Accept request error", error);
        }
    }

    const handleDecline = async (requestId: string) => {
        try {
            await declineRequest(requestId);
            toast.success("Friend request declined");
        } catch (error) {
            console.error("Decline request error", error);
        }
    }
    return (
        <div className='space-y-3 mt-4 '>
            {
                receivedList.map(request => (
                    <FrientRequestItem
                        key={request._id}
                        requestInfo={request}
                        type="received"
                        action={
                            <div className='flex-gap-2'>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleAccept(request._id)}
                                    disabled={loading}>
                                    Accept
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructiveOutline"
                                    onClick={() => handleDecline(request._id)}
                                    disabled={loading}>
                                    Decline
                                </Button>
                            </div>
                        }
                    />

                ))}
        </div>
    )
}

export default ReceivedRequest
