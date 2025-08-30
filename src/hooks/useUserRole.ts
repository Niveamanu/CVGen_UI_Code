import { useState, useEffect, useMemo, useCallback } from 'react'
import { useMsal } from '@azure/msal-react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
 
export interface UserRoles {
  isRegulatoryUser: boolean
  isBusinessUser: boolean
  groups: string[]
  loading: boolean
}
 
export const useUserRoles = (): UserRoles => {
  const { instance, accounts } = useMsal()
  const [roles, setRoles] = useState<UserRoles>({
    isRegulatoryUser: false,
    isBusinessUser: false,
    groups: [],
    loading: true
  })
  
  // Memoize the accounts array to prevent unnecessary re-renders
  const accountsMemo = useMemo(() => accounts, [accounts.length])
  
  // Memoize the getUserRoles function to prevent recreation on every render
  const getUserRoles = useCallback(async () => {
    if (accountsMemo.length === 0) {
      setRoles(prev => ({ ...prev, loading: false }))
      return
    }

    try {
      const account = accountsMemo[0]
     
      // Request to get user's groups
      const request = {
        scopes: ['GroupMember.Read.All'],
        account: account,
      }

      const response = await instance.acquireTokenSilent(request)
     
      // Make a call to Microsoft Graph to get user's groups
      const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me/memberOf', {
        headers: {
          'Authorization': `Bearer ${response.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (graphResponse.ok) {
        const groupsData = await graphResponse.json()
        const userGroups = groupsData.value.map((group: any) => group.displayName)
       
        const isRegulatoryUser = userGroups.includes('CVGen_Dev_RegulatoryUsers') || userGroups.includes('Flourish_Admin_Group')
        const isBusinessUser = userGroups.includes('CVGen_Dev_BusinessUsers') || userGroups.includes('Flourish_User_Group')
       
        setRoles({
          isRegulatoryUser,
          isBusinessUser,
          groups: userGroups,
          loading: false
        })
      } else {
        setRoles(prev => ({ ...prev, loading: false }))
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await instance.acquireTokenPopup({
            scopes: ['GroupMember.Read.All']
          })
         
          const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me/memberOf', {
            headers: {
              'Authorization': `Bearer ${response.accessToken}`,
              'Content-Type': 'application/json'
            }
          })

          if (graphResponse.ok) {
            const groupsData = await graphResponse.json()
            const userGroups = groupsData.value.map((group: any) => group.displayName)
           
            const isRegulatoryUser = userGroups.includes('CVGen_Dev_RegulatoryUsers') || userGroups.includes('Flourish_Admin_Group')
            const isBusinessUser = userGroups.includes('CVGen_Dev_BusinessUsers') || userGroups.includes('Flourish_User_Group')
           
            setRoles({
              isRegulatoryUser,
              isBusinessUser,
              groups: userGroups,
              loading: false
            })
          }
        } catch (popupError) {
          setRoles(prev => ({ ...prev, loading: false }))
        }
      } else {
        setRoles(prev => ({ ...prev, loading: false }))
      }
    }
  }, [instance, accountsMemo])

  useEffect(() => {
    getUserRoles()
  }, [getUserRoles])
 
  return roles
}