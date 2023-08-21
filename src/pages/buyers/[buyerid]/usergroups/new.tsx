import {UserGroupFormForm} from "../../../../components/usergroups"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedNewUserGroupPage = () => {
  return (
    <ProtectedContent hasAccess={appPermissions.BuyerUserGroupManager}>
      <UserGroupFormForm userGroupType="buyer" />
    </ProtectedContent>
  )
}

export default ProtectedNewUserGroupPage
