import {Button, ButtonGroup, Card, CardBody, CardHeader, Container} from "@chakra-ui/react"
import {InputControl, TextareaControl} from "components/react-hook-form"
import {AdminUserGroups, SupplierUserGroups, UserGroup, UserGroups} from "ordercloud-javascript-sdk"
import {useRouter} from "hooks/useRouter"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import ResetButton from "../react-hook-form/reset-button"
import SubmitButton from "../react-hook-form/submit-button"
import {TbChevronLeft} from "react-icons/tb"
import {object, string} from "yup"
import {useEffect, useState} from "react"
import {useSuccessToast} from "hooks/useToast"
import {getObjectDiff} from "utils"
import ProtectedContent from "../auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"
import useHasAccess from "hooks/useHasAccess"

interface UserGroupFormFormProps {
  userGroup?: UserGroup
  userGroupType: "buyer" | "supplier" | "admin"
}
export function UserGroupFormForm({userGroup, userGroupType}: UserGroupFormFormProps) {
  const [currentUserGroup, setCurrentUserGroup] = useState(userGroup)
  const [isCreating, setIsCreating] = useState(!userGroup?.ID)
  const router = useRouter()
  const successToast = useSuccessToast()
  const isUserGroupManager = useHasAccess(
    userGroupType === "buyer"
      ? appPermissions.BuyerUserGroupManager
      : userGroupType === "supplier"
      ? appPermissions.SupplierUserGroupManager
      : false // currently we don't have an admin usergroup manager role, so default to disallow access
  )

  useEffect(() => {
    setIsCreating(!currentUserGroup?.ID)
  }, [currentUserGroup?.ID])

  const defaultValues: Partial<UserGroup> = {}

  const validationSchema = object().shape({
    Name: string().max(100).required("Name is required"),
    Description: string().nullable().max(100)
  })

  const {handleSubmit, control, reset} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: userGroup || defaultValues,
    mode: "onBlur"
  })

  let parentId: any
  if (router.query.buyerid !== undefined) parentId = router.query.buyerid.toString()
  if (router.query.supplierid !== undefined) parentId = router.query.supplierid.toString()
  const userGroupId = router.query.usergroupid.toString() as any

  const createOrderCloudUserGroup = async (userGroup: UserGroup) => {
    if (userGroupType === "buyer") {
      return await UserGroups.Create(parentId, userGroup)
    } else if (userGroupType === "supplier") {
      return await SupplierUserGroups.Create(parentId, userGroup)
    } else {
      return await AdminUserGroups.Create(userGroup)
    }
  }

  const updateOrderCloudUserGroup = async (userGroup: Partial<UserGroup>) => {
    if (userGroupType === "buyer") {
      return await UserGroups.Patch(parentId, userGroupId, userGroup)
    } else if (userGroupType === "supplier") {
      return await SupplierUserGroups.Patch(parentId, userGroupId, userGroup)
    } else {
      return await AdminUserGroups.Patch(userGroupId, userGroup)
    }
  }

  async function createUserGroup(fields: UserGroup) {
    const createdUserGroup = await createOrderCloudUserGroup(fields)
    successToast({
      description: "User Group created successfully."
    })
    setCurrentUserGroup(createdUserGroup)
    reset(createdUserGroup)
  }

  async function updateUserGroup(fields: UserGroup) {
    const diff = getObjectDiff(currentUserGroup, fields)
    const updatedUserGroup = await updateOrderCloudUserGroup(diff)
    successToast({
      description: "User Group updated successfully."
    })
    setCurrentUserGroup(updatedUserGroup)
    reset(updatedUserGroup)
  }

  async function onSubmit(fields: UserGroup) {
    if (isCreating) {
      await createUserGroup(fields)
    } else {
      await updateUserGroup(fields)
    }
  }

  return (
    <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
      <Card as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <CardHeader display="flex" flexWrap="wrap" justifyContent="space-between">
          <Button onClick={() => router.back()} variant="outline" leftIcon={<TbChevronLeft />}>
            Back
          </Button>
          <ProtectedContent hasAccess={isUserGroupManager}>
            <ButtonGroup>
              <ResetButton control={control} reset={reset} variant="outline">
                Discard Changes
              </ResetButton>
              <SubmitButton control={control} variant="solid" colorScheme="primary">
                Save
              </SubmitButton>
            </ButtonGroup>
          </ProtectedContent>
        </CardHeader>
        <CardBody display="flex" flexDirection={"column"} gap={4} maxW={{xl: "container.md"}}>
          <InputControl
            name="Name"
            label="User Group Name"
            control={control}
            validationSchema={validationSchema}
            isDisabled={!isUserGroupManager}
          />
          <TextareaControl
            name="Description"
            label="Description"
            control={control}
            validationSchema={validationSchema}
            isDisabled={!isUserGroupManager}
          />
        </CardBody>
      </Card>
    </Container>
  )
}
