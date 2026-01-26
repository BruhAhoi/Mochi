import React from 'react'
import type { Conversation } from '../../types/chat'
import ChatCard from './ChatCard'
import { useAuthStore } from '../../stores/useAuthStore'
import { useChatStore } from '../../stores/useChatStore'
import UserAvatar from './UserAvatar'
import StatusBagde from './StatusBadge'
import UnreadCountBadge from './UnreadCountBadge'
import { cn } from '../../lib/utils'

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore();

  if (!user) return null

  const otherUser = convo.participants.find((p) => p._id !== user._id);
  if (!otherUser) return null

  const unreadCount = convo.unreadCounts[user._id];
  const lastMessage = convo.lastMessage?.content ?? "";

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      await fetchMessages();
    }
  }
  return (
    <>
      return 
      <ChatCard
      convoId={convo._id}
      name={otherUser.displayName ?? ""}
      timeStamp={
        convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
      }
      isActive={activeConversationId === convo._id}
      leftSection={
        <>
          <UserAvatar type='sidebar' name={otherUser.displayName ?? ""}
          avatarUrl={otherUser.avatarUrl ?? undefined}
          />
          <StatusBagde status='offline'/>
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount}/>}
        </>
      }
      subtitle={
        <p className={cn("text-sm truncate", unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
          {lastMessage}
        </p>
      } />
    </>

  )
}

export default DirectMessageCard
