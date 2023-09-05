import {FormControl, FormLabel, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react"
import {ApiRole} from "ordercloud-javascript-sdk"
import {SecurityProfileSummary} from "./SecurityProfileSummary"
import {orderCloudRoles} from "constants/ordercloud-roles"
import {SecurityProfileAssignmentLevel} from "types/ordercloud/SecurityProfileAssignmentLevel"
import {SecurityProfileAssignmentList} from "./SecurityProfileAssignmentList"
import {OverlayScrollbars} from "overlayscrollbars"
import {OverlayScrollbarsComponent} from "overlayscrollbars-react"

interface SecurityProfileAssignmentsProps {
  assignedRoles: string[] // assigned roles including both api roles and custom roles
  assignmentLevel: SecurityProfileAssignmentLevel
  assignmentLevelId: string
  commerceRole: "buyer" | "supplier" | "admin"
  parentId?: string
  control: any
  showAssignedTab: boolean
}
export function SecurityProfileAssignmentTabs({
  assignedRoles = [],
  assignmentLevel,
  commerceRole,
  assignmentLevelId,
  parentId,
  control,
  showAssignedTab
}: SecurityProfileAssignmentsProps) {
  const apiRoles = assignedRoles.filter((role: ApiRole) => orderCloudRoles.includes(role)) as ApiRole[]
  const customRoles = assignedRoles.filter((role: ApiRole) => !orderCloudRoles.includes(role))

  return (
    <>
      <Tabs variant="enclosed" width="full">
        <TabList>
          {showAssignedTab && <Tab>Assigned</Tab>}
          <Tab>Assignments</Tab>
        </TabList>
        <TabPanels>
          {showAssignedTab && (
            <TabPanel>
              <SecurityProfileSummary roles={apiRoles} customRoles={customRoles} />
            </TabPanel>
          )}
          <TabPanel
            as={OverlayScrollbarsComponent}
            defer
            options={{
              overflow: {
                x: "hidden",
                y: "scroll"
              },
              scrollbars: {autoHide: "scroll"}
            }}
            h={"50vh"}
          >
            <SecurityProfileAssignmentList
              assignmentLevel={assignmentLevel}
              commerceRole={commerceRole}
              parentId={parentId}
              assignmentLevelId={assignmentLevelId}
              control={control}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
