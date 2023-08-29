import {
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  Heading,
  Badge,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  HStack
} from "@chakra-ui/react"
import {SecurityProfile, SecurityProfileAssignment} from "ordercloud-javascript-sdk"
import {SecurityProfileSummary} from "./SecurityProfileSummary"
import {isAllowedAccess} from "hooks/useHasAccess"
import {appPermissions} from "config/app-permissions.config"
import {AddSecurityProfileAssignmentButton} from "./AddSecurityProfileAssignmentButton"

interface SecurityProfileAssignmentsTabPanelProps {
  securityProfiles: SecurityProfile[]
  assignments: SecurityProfileAssignment[]
  assignmentLevel: "user" | "group" | "company"
  assignmentLevelId?: string
  commerceRole: "buyer" | "supplier" | "admin"
  parentId?: string
  canUpdate?: boolean
  onUpdateAssignments: () => void
}

export function SecurityProfileAssignmentsTabPanel({
  securityProfiles,
  assignments,
  assignmentLevel,
  assignmentLevelId,
  commerceRole,
  parentId,
  canUpdate,
  onUpdateAssignments
}: SecurityProfileAssignmentsTabPanelProps) {
  const features = Object.values(appPermissions)
  return (
    <TabPanel>
      {securityProfiles.length ? (
        <>
          <HStack justifyContent="flex-end" marginBottom={5}>
            <AddSecurityProfileAssignmentButton
              variant="solid"
              colorScheme="primary"
              size="sm"
              assignmentLevel={assignmentLevel}
              assignmentLevelId={assignmentLevelId}
              commerceRole={commerceRole}
              assignments={assignments}
              onAssignmentAdded={onUpdateAssignments}
              parentId={parentId}
            >
              Assign security profile
            </AddSecurityProfileAssignmentButton>
          </HStack>
          <Accordion allowToggle={true}>
            {securityProfiles.map((profile) => {
              const roles = [...profile.Roles, ...profile.CustomRoles]
              const enabledFeaturesCount = features.filter((f) => isAllowedAccess(roles, f)).length

              const summary: string[] = []
              if (enabledFeaturesCount) {
                summary.push(`${enabledFeaturesCount} features`)
              }
              if (profile.Roles.length) {
                summary.push(`${profile.Roles.length} roles`)
              }
              if (profile.CustomRoles.length) {
                summary.push(`${profile.CustomRoles.length} custom roles`)
              }
              return (
                <AccordionItem key={profile.ID}>
                  <AccordionButton>
                    <Heading as="h3" size="sm" fontWeight="medium" flex="1" textAlign="left">
                      {profile.Name}
                    </Heading>
                    <Box>
                      <Badge fontWeight="semibold">{summary.join(", ")}</Badge>
                      <AccordionIcon marginLeft={3} />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    <SecurityProfileSummary roles={profile.Roles} customRoles={profile.CustomRoles} />
                  </AccordionPanel>
                </AccordionItem>
              )
            })}
          </Accordion>
        </>
      ) : (
        <HStack alignItems="flex-start" gap={0}>
          <Text>No assignments</Text>
          {canUpdate && (
            <AddSecurityProfileAssignmentButton
              variant="link"
              assignmentLevel={assignmentLevel}
              assignmentLevelId={assignmentLevelId}
              commerceRole={commerceRole}
              assignments={assignments}
              onAssignmentAdded={onUpdateAssignments}
              parentId={parentId}
            >
              , click here to assign one
            </AddSecurityProfileAssignmentButton>
          )}
        </HStack>
      )}
    </TabPanel>
  )
}
