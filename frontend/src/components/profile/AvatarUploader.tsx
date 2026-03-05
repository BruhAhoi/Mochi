import React, { useRef } from 'react'
import { useUserStore } from '../../stores/useUserStore';
import { Button } from '../ui/button';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

const AvatarUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { updateAvatarUrl } = useUserStore();

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Validate size (1MB)
        if (file.size > 1024 * 1024) {
            toast.error("File must be smaller than 1 MB");
            e.target.value = ""; // reset input
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            await updateAvatarUrl(formData);

            toast.success("Avatar updated successfully");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload avatar");
        } finally {
            e.target.value = ""; // reset để có thể chọn lại cùng file
        }
    };

    return (
        <>
            <Button
                size="icon"
                variant="secondary" onClick={handleClick}
                className='absolute -bottom-2 -right-2 size-9 rounded-full shadow-md hover:scale-115 transition duration-300 hover:bg-background'
            >

                <Camera className='size-4' />
            </Button>
            <input
                type='file'
                hidden
                ref={fileInputRef}
                onChange={handleUpload}
            />
        </>
    )
}

export default AvatarUploader
