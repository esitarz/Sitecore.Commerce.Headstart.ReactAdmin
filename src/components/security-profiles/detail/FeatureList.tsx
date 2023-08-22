import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Checkbox,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  FormLabel
} from "@chakra-ui/react"
import {PermissionConfig, appPermissions} from "config/app-permissions.config"
import useHasAccess, {isAllowedAccess} from "hooks/useHasAccess"
import {groupBy, uniq} from "lodash"
import {Control, useController} from "react-hook-form"
import {SecurityProfileForm} from "./SecurityProfileDetail"

interface FeatureListProps {
  control: Control<SecurityProfileForm>
}

export function FeatureList({control}: FeatureListProps) {
  const isSecurityProfileManager = useHasAccess(appPermissions.SecurityProfileManager)
  const roles = useController({name: "SecurityProfile.Roles", control})
  const customRoles = useController({name: "SecurityProfile.CustomRoles", control})
  const allRoles = [...(roles.field.value || []), ...(customRoles.field.value || [])]
  const features = Object.values(appPermissions)
  const groupedFeatures = groupBy(features, (f) => f.Group)

  const handleChange = (featureName: string) => {
    const feature = features.find((f) => f.Name === featureName)
    if (!feature) return

    // determine which features are currently enabled
    const enabledFeatures = features.filter((f) => isFeatureEnabled(f))

    const hasAccessCurrently = isAllowedAccess(allRoles, feature)
    if (hasAccessCurrently) {
      // intent is to remove feature, so remove feature from enabledFeatures
      enabledFeatures.splice(enabledFeatures.indexOf(feature), 1)
    } else {
      // intent is to add feature, so add feature to enabledFeatures
      enabledFeatures.push(feature)
    }

    // determine new roles given the set of enabled features
    const newRoles = uniq(enabledFeatures.map((f) => f.Roles).flat())
    const newCustomRoles = uniq(enabledFeatures.map((f) => f.CustomRoles).flat())

    // propogate role changes to form
    roles.field.onChange(newRoles)
    customRoles.field.onChange(newCustomRoles)
  }

  const isFeatureEnabled = (feature: PermissionConfig) => {
    return isAllowedAccess(allRoles, feature)
  }

  const getFeaturesEnabledCount = (features: PermissionConfig[]) => {
    return features.filter((f) => isFeatureEnabled(f)).length
  }

  return (
    <VStack alignItems="flex-start" width="full">
      <FormLabel>Admin App Features</FormLabel>
      <Accordion width="full" allowToggle={true}>
        {Object.entries(groupedFeatures).map(([groupName, features]) => {
          const featuresEnabledCount = getFeaturesEnabledCount(features)
          return (
            <AccordionItem key={groupName}>
              <AccordionButton>
                <Heading as="h3" size="sm" fontWeight="medium" flex="1" textAlign="left">
                  {groupName}
                </Heading>
                <Box>
                  <Badge fontWeight="semibold">
                    {featuresEnabledCount} / {features.length} enabled
                  </Badge>
                  <AccordionIcon marginLeft={3} />
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <VStack alignItems="flex-start">
                  {features.map((feature) => (
                    <HStack key={feature.Name} justifyContent="space-between">
                      <Checkbox
                        isChecked={isFeatureEnabled(feature)}
                        onChange={() => handleChange(feature.Name)}
                        isDisabled={!isSecurityProfileManager}
                      />
                      <Text>{feature.Name}</Text>
                    </HStack>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}
