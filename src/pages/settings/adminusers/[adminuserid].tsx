import {useCallback, useEffect, useState} from "react"
import {AdminUserForm} from "components/adminusers"
import {Container, Skeleton} from "@chakra-ui/react"
import {
  AdminUserGroups,
  AdminUsers,
  SecurityProfile,
  SecurityProfileAssignment,
  SecurityProfiles,
  User
} from "ordercloud-javascript-sdk"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"
import {useRouter} from "hooks/useRouter"
import {IAdminUser} from "types/ordercloud/IAdminUser"
import {uniq} from "lodash"

const AdminUserListItem = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [adminUser, setAdminUser] = useState({} as User)
  const [securityProfiles, setSecurityProfiles] = useState([] as SecurityProfile[])
  const [securityProfileAssignments, setSecurityProfileAssignments] = useState([] as SecurityProfileAssignment[])

  const getSecurityProfileAssignments = useCallback(async (adminUserId: string) => {
    const [userAssignmentList, groupAssignmentList, companyAssignmentList] = await Promise.all([
      await SecurityProfiles.ListAssignments({userID: adminUserId}),
      await SecurityProfiles.ListAssignments({level: "Group", commerceRole: "Seller"}).then(async (response) => {
        const allSecurityProfileGroupAssignments = response.Items
        const assignedGroups = await AdminUserGroups.ListUserAssignments({userID: adminUserId, pageSize: 100})
        return allSecurityProfileGroupAssignments.filter((securityProfileAssignment) => {
          return assignedGroups.Items.some(
            (assignedGroup) => assignedGroup.UserGroupID === securityProfileAssignment.UserGroupID
          )
        })
      }),
      await SecurityProfiles.ListAssignments({level: "Company", commerceRole: "Seller"})
    ])
    const assignments = [...userAssignmentList.Items, ...groupAssignmentList, ...companyAssignmentList.Items]
    setSecurityProfileAssignments(assignments)
    return assignments
  }, [])

  const getSecurityProfiles = useCallback(async (securityProfileAssignments: SecurityProfileAssignment[]) => {
    const securityProfileIds = uniq(securityProfileAssignments.map((assignment) => assignment.SecurityProfileID))
    const response = await SecurityProfiles.List({filters: {ID: securityProfileIds.join("|")}, pageSize: 100})
    const profiles = response.Items
    setSecurityProfiles(profiles)
    return profiles
  }, [])

  const initialize = useCallback(
    async function (adminUserId: string) {
      const getAdminUser = async (adminUserId: string) => {
        const user = await AdminUsers.Get<IAdminUser>(adminUserId)
        setAdminUser(user)
        return user
      }

      await Promise.all([
        getAdminUser(adminUserId),
        getSecurityProfileAssignments(adminUserId).then((assignments) => getSecurityProfiles(assignments))
      ])
      setLoading(false)
    },
    [getSecurityProfileAssignments, getSecurityProfiles]
  )

  useEffect(() => {
    if (router.query.adminuserid) {
      initialize(router.query.adminuserid as string)
    }
  }, [router.query.adminuserid, initialize])

  if (loading) {
    return (
      <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
        <Skeleton w="100%" h="544px" borderRadius="md" />
      </Container>
    )
  }
  return (
    <AdminUserForm
      user={adminUser}
      securityProfiles={securityProfiles}
      securityProfileAssignments={securityProfileAssignments}
      refresh={() => initialize(adminUser.ID)}
    />
  )
}

const ProtectedAdminUserListItem = () => {
  return (
    <ProtectedContent hasAccess={[appPermissions.AdminUserViewer, appPermissions.AdminUserManager]}>
      <AdminUserListItem />
    </ProtectedContent>
  )
}

export default ProtectedAdminUserListItem
