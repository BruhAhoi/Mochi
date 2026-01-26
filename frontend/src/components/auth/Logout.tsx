import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';

function Logout() {
    const {signOut} = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/signin');
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }
    return (
        <Button variant="completeGhost" onClick={handleLogout}>
            <LogOut className='text-destructive'/>
            Log out
        </Button>
    )
}

export default Logout
