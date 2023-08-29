import {FormControl, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react"
import {ApiRole, SecurityProfile, SecurityProfileAssignment} from "ordercloud-javascript-sdk"
import {SecurityProfileSummary} from "./SecurityProfileSummary"
import {orderCloudRoles} from "constants/ordercloud-roles"
import {SecurityProfileAssignmentsTabPanel} from "./SecurityProfileAssignmentsTabPanel"
import {SecurityProfileAssignmentLevel} from "types/ordercloud/SecurityProfileAssignmentLevel"

type TabPanelData = {
  securityProfiles: SecurityProfile[]
  assignments: SecurityProfileAssignment[]
  assignmentLevel: SecurityProfileAssignmentLevel
}

interface SecurityProfileAssignmentsProps {
  assignedRoles: string[] // assigned roles including both api roles and custom roles
  securityProfiles: SecurityProfile[]
  assignments: SecurityProfileAssignment[]
  assignmentLevel: SecurityProfileAssignmentLevel
  assignmentLevelId: string
  commerceRole: "buyer" | "supplier" | "admin"
  parentId?: string
  onUpdateAssignments: () => void
}
export function SecurityProfileAssignmentTabs({
  assignedRoles,
  securityProfiles = [],
  assignments = [],
  assignmentLevel,
  commerceRole,
  assignmentLevelId,
  parentId,
  onUpdateAssignments
}: SecurityProfileAssignmentsProps) {
  const apiRoles = assignedRoles.filter((role: ApiRole) => orderCloudRoles.includes(role)) as ApiRole[]
  const customRoles = assignedRoles.filter((role: ApiRole) => !orderCloudRoles.includes(role))
  const userAssignedProfiles = assignments
    .filter((assignment) => assignment.UserID)
    .map((assignment) => {
      const securityProfile = securityProfiles.find((profile) => profile.ID === assignment.SecurityProfileID)
      return {assignment, securityProfile}
    })

  const groupAssignedProfiles = assignments
    .filter((assignment) => assignment.UserGroupID)
    .map((assignment) => {
      const securityProfile = securityProfiles.find((profile) => profile.ID === assignment.SecurityProfileID)
      return {assignment, securityProfile}
    })
  const companyAssignedProfiles = assignments
    .filter((assignment) => !assignment.UserID && !assignment.UserGroupID)
    .map((assignment) => {
      const securityProfile = securityProfiles.find((profile) => profile.ID === assignment.SecurityProfileID)
      return {assignment, securityProfile}
    })

  const userPanelData: TabPanelData = {
    assignmentLevel: "user",
    securityProfiles: userAssignedProfiles.map((data) => data.securityProfile),
    assignments: userAssignedProfiles.map((data) => data.assignment)
  }

  const groupPanelData: TabPanelData = {
    assignmentLevel: "group",
    securityProfiles: groupAssignedProfiles.map((data) => data.securityProfile),
    assignments: groupAssignedProfiles.map((data) => data.assignment)
  }

  const companyPanelData: TabPanelData = {
    assignmentLevel: "company",
    securityProfiles: companyAssignedProfiles.map((data) => data.securityProfile),
    assignments: companyAssignedProfiles.map((data) => data.assignment)
  }

  const tabData: string[] = []
  if (assignmentLevel === "user") {
    tabData.push(`User (${userAssignedProfiles.length})`)
    tabData.push(`Group (${groupAssignedProfiles.length})`)
    tabData.push(`Company (${companyAssignedProfiles.length})`)
  } else if (assignmentLevel === "group") {
    tabData.push(`Group (${groupAssignedProfiles.length})`)
    tabData.push(`Company (${companyAssignedProfiles.length})`)
  } else {
    tabData.push(`Company (${companyAssignedProfiles.length})`)
  }

  const tabPanelsData: TabPanelData[] = []
  if (assignmentLevel === "user") {
    tabPanelsData.push(userPanelData)
    tabPanelsData.push(groupPanelData)
    tabPanelsData.push(companyPanelData)
  } else if (assignmentLevel === "group") {
    tabPanelsData.push(groupPanelData)
    tabPanelsData.push(companyPanelData)
  } else {
    tabPanelsData.push(companyPanelData)
  }

  return (
    <>
      <FormControl>
        <FormLabel>Security Profile Roles</FormLabel>
      </FormControl>
      <Tabs width="full" isLazy={true}>
        <TabList>
          <Tab>Assigned</Tab>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <SecurityProfileSummary roles={apiRoles} customRoles={customRoles} />
          </TabPanel>
          {tabPanelsData.map((tabData, index) => (
            <SecurityProfileAssignmentsTabPanel
              key={index}
              canUpdate={assignmentLevel === tabData.assignmentLevel}
              assignmentLevel={tabData.assignmentLevel}
              assignments={tabData.assignments}
              securityProfiles={tabData.securityProfiles}
              commerceRole={commerceRole}
              assignmentLevelId={assignmentLevelId}
              parentId={parentId}
              onUpdateAssignments={onUpdateAssignments}
            />
          ))}
        </TabPanels>
      </Tabs>
    </>
  )
}
