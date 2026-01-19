import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '../../stores/useAuthStore'
import { toast } from 'sonner';
function ButtonTest() {
    const {test} = useAuthStore();
    const handleClick = async () => {
        await test();
        toast.success("Test executed successfully!");
    }
  return (
    <Button onClick={handleClick}>Test Fetch Me</Button>
  )
}

export default ButtonTest