import {UserGroupFormForm} from "../../../../components/usergroups"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedSupplierUserGroupPage = () => {
  return (
    <ProtectedContent hasAccess={[appPermissions.SupplierUserGroupViewer, appPermissions.SupplierUserGroupManager]}>
      <UserGroupFormForm userGroupType="supplier" />
    </ProtectedContent>
  )
}

export default ProtectedSupplierUserGroupPage
