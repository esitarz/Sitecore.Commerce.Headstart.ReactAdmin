import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem
} from "@chakra-ui/react"
import {MdCheckCircle} from "react-icons/md"
import {AdminUsers, SupplierUsers, User, Users} from "ordercloud-javascript-sdk"
import {useRouter} from "hooks/useRouter"
import {useEffect, useState} from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import {InputControl, SwitchControl} from "../react-hook-form"
import {TbChevronLeft} from "react-icons/tb"
import ResetButton from "../react-hook-form/reset-button"
import SubmitButton from "../react-hook-form/submit-button"
import {useSuccessToast} from "hooks/useToast"
import {boolean, object, string} from "yup"
import {getObjectDiff} from "utils"
import ProtectedContent from "../auth/ProtectedContent"
import {appPermissions} from "config/app-permissions.config"
import useHasAccess from "hooks/useHasAccess"

interface UserFormProps {
  user?: User
  userType: "buyer" | "supplier" | "admin"
}
export function UserForm({user, userType}: UserFormProps) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isCreating, setIsCreating] = useState(!user?.ID)
  const router = useRouter()
  const successToast = useSuccessToast()
  const isUserManager = useHasAccess(
    userType === "admin"
      ? appPermissions.AdminUserManager
      : userType === "supplier"
      ? appPermissions.SupplierUserManager
      : appPermissions.BuyerUserManager
  )

  useEffect(() => {
    setIsCreating(!currentUser?.ID)
  }, [currentUser?.ID])

  const defaultValues: Partial<User> = {
    Active: true
  }

  const validationSchema = object().shape({
    Active: boolean(),
    Username: string().max(100).required("Name is required"),
    FirstName: string().required("First Name is required"),
    LastName: string().required("Last Name is required"),
    Email: string().email("Email is invalid").required("Email is required")
  })

  const {handleSubmit, control, reset} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: user || defaultValues,
    mode: "onBlur"
  })

  let parentId
  if (router.query.buyerid !== undefined) parentId = router.query.buyerid
  if (router.query.supplierid !== undefined) parentId = router.query.supplierid

  const createOrderCloudUser = async (fields: User) => {
    if (userType === "buyer") {
      return await AdminUsers.Create(fields)
    } else if (userType === "supplier") {
      return await SupplierUsers.Create(parentId, fields)
    } else {
      return await Users.Create(parentId, fields)
    }
  }

  const updateOrderCloudUser = async (fields: Partial<User>) => {
    if (userType === "buyer") {
      return await AdminUsers.Patch(currentUser.ID, fields)
    } else if (userType === "supplier") {
      return await SupplierUsers.Patch(parentId, currentUser.ID, fields)
    } else {
      return await Users.Patch(parentId, currentUser.ID, fields)
    }
  }

  async function createUser(fields: User) {
    const createdUser = await createOrderCloudUser(fields)
    successToast({
      description: "User created successfully."
    })
    if (router.query.buyerid) {
      router.push(`/buyers/${parentId}/users/${createdUser.ID}`)
    } else if (router.query.supplierid) {
      router.push(`/suppliers/${parentId}/users/${createdUser.ID}`)
    } else {
      router.push(`/settings/adminusers/${createdUser.ID}`)
    }
  }

  async function updateUser(fields: User) {
    const diff = getObjectDiff(currentUser, fields)
    const updatedUser = await updateOrderCloudUser(diff)
    successToast({
      description: "User updated successfully."
    })
    setCurrentUser(updatedUser)
    reset(updatedUser)
  }

  async function onSubmit(fields: User) {
    if (isCreating) {
      await createUser(fields)
    } else {
      await updateUser(fields)
    }
  }

  return (
    <>
      <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
        <Card as="form" noValidate onSubmit={handleSubmit(onSubmit)} marginBottom={3}>
          <CardHeader display="flex" flexWrap="wrap" justifyContent="space-between">
            <Button onClick={() => router.back()} variant="outline" leftIcon={<TbChevronLeft />}>
              Back
            </Button>
            <ProtectedContent hasAccess={isUserManager}>
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
            <SwitchControl
              name="Active"
              label="Active"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
            <InputControl
              name="Username"
              label="Username"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
            <InputControl
              name="FirstName"
              label="First name"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
            <InputControl
              name="LastName"
              label="Last name"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
            <InputControl
              name="Email"
              label="Email"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
            <InputControl
              name="Phone"
              label="Phone"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isUserManager}
            />
          </CardBody>
        </Card>
        {!isCreating && user?.AvailableRoles && (
          <Card>
            <CardHeader>
              <Heading as="h5" size="md">
                Available Roles
              </Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3}>
                {user.AvailableRoles.length ? (
                  user.AvailableRoles.map((role) => (
                    <ListItem key={role}>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {role}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>No assigned roles</ListItem>
                )}
              </List>
            </CardBody>
          </Card>
        )}
      </Container>
    </>
  )
}
