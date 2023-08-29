import {
  Button,
  ButtonProps,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react"
import {AsyncSelect} from "chakra-react-select"
import {useSuccessToast} from "hooks/useToast"
import {SecurityProfile, SecurityProfileAssignment, SecurityProfiles} from "ordercloud-javascript-sdk"
import {useState} from "react"
import {SecurityProfileSummary} from "./SecurityProfileSummary"

interface AddSecurityProfileAssignmentButtonProps extends ButtonProps {
  assignments: SecurityProfileAssignment[]
  parentId?: string
  commerceRole: "buyer" | "supplier" | "admin"
  assignmentLevel: "user" | "group" | "company"
  assignmentLevelId?: string
  onAssignmentAdded: () => void
}

export function AddSecurityProfileAssignmentButton({
  assignments = [],
  parentId,
  assignmentLevel,
  commerceRole,
  assignmentLevelId,
  onAssignmentAdded,
  ...buttonProps
}: AddSecurityProfileAssignmentButtonProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const existingAssignmentIDs = assignments.map((a) => a.SecurityProfileID)
  const [securityProfiles, setSecurityProfiles] = useState([] as SecurityProfile[])
  const [loading, setLoading] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<SecurityProfile | null>(null)
  const successToast = useSuccessToast()

  const loadSecurityProfiles = async (search: string) => {
    const listOptions = {search} as any
    if (existingAssignmentIDs.length) {
      listOptions.filters = {ID: existingAssignmentIDs.map((id) => `!${id}`)}
    }
    const response = await SecurityProfiles.List(listOptions)
    setSecurityProfiles(response.Items)
    return response.Items.map((p) => ({label: p.Name, value: p.ID}))
  }
  const selectSecurityProfile = (securityProfileID: string) => {
    const securityProfile = securityProfiles.find((p) => p.ID === securityProfileID)
    setSelectedProfile(securityProfile)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const assignmentBody: SecurityProfileAssignment = {
        SecurityProfileID: selectedProfile?.ID
      }

      if (assignmentLevel === "company" || parentId) {
        if (commerceRole === "buyer") {
          assignmentBody.BuyerID = parentId || assignmentLevelId
        } else if (commerceRole === "supplier") {
          assignmentBody.SupplierID = parentId || assignmentLevelId
        }
      }

      if (assignmentLevel === "user") {
        assignmentBody.UserID = assignmentLevelId
      } else if (assignmentLevel === "group") {
        assignmentBody.UserGroupID = assignmentLevelId
      }

      await SecurityProfiles.SaveAssignment(assignmentBody)

      onAssignmentAdded()
      successToast({description: "Security profile assigned successfully."})
      setSelectedProfile(null)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedProfile(null)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} {...buttonProps} />
      <Modal size="3xl" isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Security Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AsyncSelect
              placeholder="Select security profile"
              defaultOptions
              isMulti={false}
              colorScheme="accent"
              loadOptions={loadSecurityProfiles}
              onChange={(option) => selectSecurityProfile(option?.value)}
              chakraStyles={{
                container: (baseStyles) => ({...baseStyles, marginBottom: selectedProfile ? 4 : "500px"})
              }}
            />
            {selectedProfile && (
              <SecurityProfileSummary roles={selectedProfile.Roles} customRoles={selectedProfile.CustomRoles} />
            )}
          </ModalBody>
          <ModalFooter>
            <HStack width="full" justifyContent="space-between">
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                isDisabled={!selectedProfile?.ID}
                isLoading={loading}
                onClick={handleSubmit}
              >
                Assign security profile
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
