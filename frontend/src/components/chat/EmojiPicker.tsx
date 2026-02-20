import React from 'react'
import { useThemeStore } from '../../stores/useThemeStore'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Smile } from 'lucide-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerProps {
    onChange: (value: string) => void
}

const EmojiPickerComponent = ({ onChange }: EmojiPickerProps) => {
    const { isDark } = useThemeStore();

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onChange(emojiData.emoji);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button 
                    type="button"
                    className='hover:opacity-70 transition-opacity'
                >
                    <Smile className='size-4' />
                </button>
            </PopoverTrigger>

            <PopoverContent 
                side="top" 
                align="end"
                className='w-auto p-0 border-none shadow-lg'
            >
                <EmojiPicker
                    theme={isDark ? Theme.DARK : Theme.LIGHT}
                    onEmojiClick={handleEmojiClick}
                    width={320}
                    height={400}
                    searchPlaceHolder="Tìm emoji..."
                    previewConfig={{
                        showPreview: false
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPickerComponent