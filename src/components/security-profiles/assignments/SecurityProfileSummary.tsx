import {FormControl, FormLabel, VStack} from "@chakra-ui/react"
import {Select} from "chakra-react-select"
import {ApiRole} from "ordercloud-javascript-sdk"
import {FeatureList} from "../detail/FeatureList"

interface SecurityProfileSummaryProps {
  roles: ApiRole[]
  customRoles: string[]
}

export function SecurityProfileSummary({roles, customRoles}: SecurityProfileSummaryProps) {
  return (
    <VStack gap={4}>
      <FeatureList isDisabled={true} roles={roles} customRoles={customRoles} />
      <FormControl>
        <FormLabel>Roles</FormLabel>
        <Select
          isDisabled={true}
          isMulti={true}
          placeholder="No roles assigned"
          value={roles.map((role) => ({label: role, value: role}))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Custom Roles</FormLabel>
        <Select
          isDisabled={true}
          isMulti={true}
          placeholder="No custom roles assigned"
          value={customRoles.map((role) => ({label: role, value: role}))}
        />
      </FormControl>
    </VStack>
  )
}
