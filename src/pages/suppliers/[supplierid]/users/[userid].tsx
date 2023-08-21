import {useEffect, useState} from "react"
import {UserForm} from "../../../../components/users/UserForm"
import {Container, Skeleton} from "@chakra-ui/react"
import ProtectedContent from "components/auth/ProtectedContent"
import {SupplierUsers, User} from "ordercloud-javascript-sdk"
import {appPermissions} from "config/app-permissions.config"
import {useRouter} from "hooks/useRouter"
import {ISupplierUser} from "types/ordercloud/ISupplierUser"

const UserListItem = () => {
  const router = useRouter()
  const [user, setUser] = useState({} as User)
  useEffect(() => {
    const getUser = async () => {
      const data = await SupplierUsers.Get<ISupplierUser>(
        router.query.supplierid as string,
        router.query.userid as string
      )
      setUser(data)
    }
    if (router.query.supplierid) {
      getUser()
    }
  }, [router.query.supplierid, router.query.userid])
  return (
    <>
      {user?.ID ? (
        <UserForm user={user} userType="supplier" />
      ) : (
        <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
          <Skeleton w="100%" h="544px" borderRadius="md" />
        </Container>
      )}
    </>
  )
}

const ProtectedSupplierListItem = () => {
  return (
    <ProtectedContent hasAccess={[appPermissions.SupplierUserViewer, appPermissions.SupplierUserManager]}>
      <UserListItem />
    </ProtectedContent>
  )
}

export default ProtectedSupplierListItem
