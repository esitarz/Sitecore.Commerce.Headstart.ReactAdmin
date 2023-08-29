import {Button, ButtonGroup, Card, CardBody, CardHeader, Container, SimpleGrid, VStack} from "@chakra-ui/react"
import {InputControl, SwitchControl} from "components/react-hook-form"
import {AdminUsers, SecurityProfile, SecurityProfileAssignment, User} from "ordercloud-javascript-sdk"
import {useRouter} from "hooks/useRouter"
import {useEffect, useState} from "react"
import {IAdminUser} from "types/ordercloud/IAdminUser"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SubmitButton from "../react-hook-form/submit-button"
import ResetButton from "../react-hook-form/reset-button"
import {TbChevronLeft} from "react-icons/tb"
import {string, boolean, object} from "yup"
import {getObjectDiff} from "utils"
import {useSuccessToast} from "hooks/useToast"
import useHasAccess from "hooks/useHasAccess"
import {appPermissions} from "config/app-permissions.config"
import ProtectedContent from "../auth/ProtectedContent"
import {SecurityProfileAssignmentTabs} from "../security-profiles/assignments/SecurityProfileAssignmentTabs"

interface AdminUserFormProps {
  user?: User
  securityProfiles?: SecurityProfile[]
  securityProfileAssignments?: SecurityProfileAssignment[]
  refresh?: () => void
}
export function AdminUserForm({user, securityProfiles, securityProfileAssignments, refresh}: AdminUserFormProps) {
  const isAdminUserManager = useHasAccess(appPermissions.AdminUserManager)
  const [currentUser, setCurrentUser] = useState(user)
  const [isCreating, setIsCreating] = useState(!user?.ID)

  const router = useRouter()
  const successToast = useSuccessToast()

  useEffect(() => {
    setIsCreating(!currentUser?.ID)
  }, [currentUser?.ID])

  const defaultValues = {
    Active: true
  }

  const validationSchema = object().shape({
    Username: string().max(100).required("Username is required"),
    FirstName: string().required("First Name is required"),
    LastName: string().required("Last Name is required"),
    Email: string().email("Email is invalid").required("Email is required"),
    Phone: string().nullable(),
    Active: boolean()
  })

  const {handleSubmit, control, reset} = useForm<IAdminUser>({
    resolver: yupResolver(validationSchema),
    defaultValues: user || defaultValues,
    mode: "onBlur"
  })

  async function createUser(fields: IAdminUser) {
    const createdUser = await AdminUsers.Create<IAdminUser>(fields)
    setCurrentUser(createdUser)
    successToast({
      description: "User created successfully."
    })
    router.push(`/settings/adminusers/${createdUser.ID}`)
  }

  async function updateUser(fields: IAdminUser) {
    const diff = getObjectDiff(currentUser, fields)
    const updatedUser = await AdminUsers.Patch<IAdminUser>(fields.ID, diff)
    setCurrentUser(updatedUser)

    let successMessage = "User updated successfully."

    successToast({
      description: successMessage
    })

    setCurrentUser(updatedUser)
    reset(updatedUser)
  }

  async function onSubmit(fields: IAdminUser) {
    if (isCreating) {
      await createUser(fields)
    } else {
      await updateUser(fields)
    }
  }

  return (
    <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
      <Card as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <ProtectedContent hasAccess={appPermissions.AdminUserManager}>
          <CardHeader display="flex" flexWrap="wrap" justifyContent="space-between">
            <Button onClick={() => router.back()} variant="outline" leftIcon={<TbChevronLeft />}>
              Back
            </Button>
            <ButtonGroup>
              <ResetButton control={control} reset={reset} variant="outline">
                Discard Changes
              </ResetButton>
              <SubmitButton control={control} variant="solid" colorScheme="primary">
                Save
              </SubmitButton>
            </ButtonGroup>
          </CardHeader>
        </ProtectedContent>
        <CardBody
          display="flex"
          flexWrap={{base: "wrap", lg: "nowrap"}}
          alignItems={"flex-start"}
          justifyContent="space-between"
          gap={6}
        >
          <VStack flexBasis={"container.lg"} gap={4} maxW={{xl: "container.md"}}>
            <SwitchControl
              name="Active"
              label="Active"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isAdminUserManager}
            />
            <InputControl
              name="Username"
              label="Username"
              control={control}
              validationSchema={validationSchema}
              isDisabled={!isAdminUserManager}
            />
            <SimpleGrid gap={4} w="100%" gridTemplateColumns={{lg: "1fr 1fr"}}>
              <InputControl
                name="FirstName"
                label="First name"
                control={control}
                validationSchema={validationSchema}
                isDisabled={!isAdminUserManager}
              />
              <InputControl
                name="LastName"
                label="Last name"
                control={control}
                validationSchema={validationSchema}
                isDisabled={!isAdminUserManager}
              />
              <InputControl
                name="Email"
                label="Email"
                control={control}
                validationSchema={validationSchema}
                isDisabled={!isAdminUserManager}
              />
              <InputControl
                name="Phone"
                label="Phone"
                control={control}
                validationSchema={validationSchema}
                isDisabled={!isAdminUserManager}
              />
            </SimpleGrid>
            {!isCreating && (
              <SecurityProfileAssignmentTabs
                assignedRoles={user.AvailableRoles}
                securityProfiles={securityProfiles}
                assignments={securityProfileAssignments}
                commerceRole="admin"
                assignmentLevel="user"
                assignmentLevelId={user.ID}
                onUpdateAssignments={refresh}
              />
            )}
          </VStack>
        </CardBody>
      </Card>
    </Container>
  )
}
