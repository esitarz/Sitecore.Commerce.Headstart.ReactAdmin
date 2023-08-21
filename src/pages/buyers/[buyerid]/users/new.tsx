import {UserForm} from "../../../../components/users"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

const ProtectedNewBuyerUserPage = () => {
  return (
    <ProtectedContent hasAccess={appPermissions.BuyerUserManager}>
      <UserForm userType="buyer" />
    </ProtectedContent>
  )
}

export default ProtectedNewBuyerUserPage
