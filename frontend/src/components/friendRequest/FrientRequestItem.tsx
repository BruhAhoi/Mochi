import React, { type ReactNode } from 'react'
import type { FriendRequest } from '../../types/user'
import UserAvatar from '../chat/UserAvatar';

interface RequestItemProps {
    requestInfo: FriendRequest;
    action: ReactNode;
    type: "received" | "sent";
}
const FrientRequestItem = ({ requestInfo, action, type }: RequestItemProps) => {
    if (!requestInfo) {
        return null;
    }
    const info = type === "sent" ? requestInfo.to : requestInfo.from;
    if (!info) {
        return null;
    }
    return (
        <div className='flex items-center justify-between rounded-lg shadow-md border border-primary-foreground p-3'>
            <div className='flex items-center gap-3'>
                <UserAvatar
                    type="sidebar"
                    name={info.displayName}
                />
                <div>
                    <p className='font-medium'>
                        {info.displayName}
                    </p>
                    <p className='text-sm text-muted-foreground'>@{info.username}</p>
                </div>
            </div>
            {action}
        </div>
    )
}

export default FrientRequestItem
