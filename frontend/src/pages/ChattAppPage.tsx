import React from 'react'
import Logout from '../components/auth/logout'
import { useAuthStore } from '../stores/useAuthStore'
import ButtonTest from '../components/auth/ButtonTest'

const ChattAppPage = () => {
  const user = useAuthStore(state => state.user)
  return (
    <div>
      {user?.username}
      <Logout/>
      <ButtonTest/>
    </div>
  )
}

export default ChattAppPage
