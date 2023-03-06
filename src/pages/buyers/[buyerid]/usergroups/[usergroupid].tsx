import {useEffect, useState} from "react"
import {CreateUpdateForm} from "../../../../components/usergroups/CreateUpdateForm"
import {Box} from "@chakra-ui/react"
import ProtectedContent from "components/auth/ProtectedContent"
import {UserGroup} from "ordercloud-javascript-sdk"
import {appPermissions} from "constants/app-permissions.config"
import {useRouter} from "next/router"
import {userGroupsService} from "../../../../api"

/* This declare the page title and enable the breadcrumbs in the content header section. */
export async function getServerSideProps() {
  return {
    props: {
      header: {
        title: "Edit user group",
        metas: {
          hasBreadcrumbs: true,
          hasBuyerContextSwitch: false
        }
      },
      revalidate: 5 * 60
    }
  }
}

const UserGroupListItem = () => {
  const router = useRouter()
  const [userGroup, setuserGroup] = useState({} as UserGroup)
  useEffect(() => {
    if (router.query.buyerid && router.query.usergroupid) {
      userGroupsService
        .getById(router.query.buyerid, router.query.usergroupid)
        .then((userGroup) => setuserGroup(userGroup))
    }
  }, [router.query.buyerid, router.query.usergroupid])
  return (
    <>
      {userGroup?.ID ? <CreateUpdateForm userGroup={userGroup} ocService={userGroupsService} /> : <div> Loading</div>}
    </>
  )
}
const ProtectedUserGroupListItem = () => {
  return (
    <ProtectedContent hasAccess={appPermissions.BuyerManager}>
      <Box padding="GlobalPadding">
        <UserGroupListItem />
      </Box>
    </ProtectedContent>
  )
}

export default ProtectedUserGroupListItem
