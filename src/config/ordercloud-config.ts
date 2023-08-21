import {flatten, uniq} from "lodash"
import {ApiRole, CookieOptions} from "ordercloud-javascript-sdk"
import {AppPermission, appPermissions} from "./app-permissions.config"
import {appSettings} from "./app-settings"

// TODO: once javascript sdk is updated we can remove this and will get all assigned roles
const appRoles = uniq(
  Object.keys(appPermissions)
    .map((permissionName: AppPermission) => {
      const permission = appPermissions[permissionName]
      return [...permission.Roles, ...permission.CustomRoles]
    })
    .flat()
)

function testRoles() {
  const permissions = [
    appPermissions.BuyerViewer,
    appPermissions.BuyerUserViewer,
    appPermissions.BuyerCatalogManager,
    appPermissions.SupplierViewer,
    appPermissions.SupplierUserViewer,
    appPermissions.SupplierAddressViewer,
    appPermissions.SupplierUserGroupViewer
  ]
  return flatten(permissions.map((permission) => [...permission.Roles, ...permission.CustomRoles])) as ApiRole[]
}

export interface OcConfig {
  clientId: string
  marketplaceId: string
  scope: ApiRole[]
  baseApiUrl?: string
  allowAnonymous?: boolean
  cookieOptions?: CookieOptions
}

const ocConfig: OcConfig = {
  clientId: appSettings.clientId,
  marketplaceId: appSettings.marketplaceId,
  baseApiUrl: appSettings.orderCloudApiUrl,
  scope: testRoles(),
  allowAnonymous: false,
  cookieOptions: null
}

export default ocConfig
