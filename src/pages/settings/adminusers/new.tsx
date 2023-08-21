import {AdminUserForm} from "@/components/adminusers/AdminUserForm"
import ProtectedContent from "components/auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"

function ProtectedNewAdminUserPage() {
  return (
    <ProtectedContent hasAccess={appPermissions.AdminUserManager}>
      <AdminUserForm />
    </ProtectedContent>
  )
}

export default ProtectedNewAdminUserPage
