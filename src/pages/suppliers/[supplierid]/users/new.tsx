import {UserForm} from "../../../../components/users"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedNewSupplierUser = () => {
  return (
    <ProtectedContent hasAccess={appPermissions.SupplierUserManager}>
      <UserForm userType="supplier" />
    </ProtectedContent>
  )
}

export default ProtectedNewSupplierUser
