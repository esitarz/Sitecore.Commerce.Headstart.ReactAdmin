import {ApiRole} from "ordercloud-javascript-sdk"

export type AppPermission =
  | "SuperAdmin"
  | "ProfileManager"
  | "DashboardViewer"
  | "ProductViewer"
  | "ProductManager"
  | "PromotionViewer"
  | "PromotionManager"
  | "OrderViewer"
  | "OrderManager"
  | "BuyerViewer"
  | "BuyerManager"
  | "BuyerUserViewer"
  | "BuyerUserManager"
  | "BuyerUserGroupViewer"
  | "BuyerUserGroupManager"
  | "BuyerCatalogViewer"
  | "BuyerCatalogManager"
  | "SupplierPermissionViewer"
  | "SupplierPermissionManager"
  | "SupplierViewer"
  | "SupplierManager"
  | "SupplierUserViewer"
  | "SupplierUserManager"
  | "SupplierUserGroupViewer"
  | "SupplierUserGroupManager"
  | "SupplierAddressViewer"
  | "SupplierAddressManager"
  | "AdminPermissionViewer"
  | "AdminPermissionManager"
  | "AdminUserViewer"
  | "AdminUserManager"
  | "AdminAddressViewer"
  | "AdminAddressManager"
  | "ProductFacetViewer"
  | "ProductFacetManager"

export interface PermissionConfig {
  /**
   * The name of the permission, displayed in the UI for admins
   */
  Name: string

  /**
   * A short description of the permission, displayed in the UI for admins
   */
  Description: string

  /**
   * A list of API roles that are needed for this permission
   */
  Roles: ApiRole[]

  /**
   * A list of custom roles that are needed for this permission
   */
  CustomRoles: string[]

  AllowedUserType: ("Supplier" | "Admin")[]
}

export const appPermissions: Record<AppPermission, PermissionConfig> = {
  SuperAdmin: {
    Name: "Super Admin",
    Description: "Can perform any action, use wisely",
    Roles: ["FullAccess"],
    CustomRoles: ["SuperAdmin"],
    AllowedUserType: ["Admin"]
  },
  ProfileManager: {
    Name: "Profile Manager",
    Description: "View, and manage my profile, notifications, and theme",
    Roles: ["MeAdmin"],
    CustomRoles: ["ProfileManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  DashboardViewer: {
    Name: "Dashboard Viewer",
    Description: "View dashboard",
    Roles: ["ProductReader", "OrderReader", "PromotionReader", "BuyerUserReader"],
    CustomRoles: ["DashboardViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  ProductViewer: {
    Name: "Product Viewer",
    Description: "View products",
    Roles: [
      "ProductReader",
      "PriceScheduleReader",
      "CatalogReader",
      "CategoryReader",
      "BuyerReader",
      "UserGroupReader",
      "AdminAddressReader",
      "SupplierAddressReader",
      "ProductFacetReader",
      "SupplierReader"
    ],
    CustomRoles: ["ProductViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  ProductManager: {
    Name: "Product Manager",
    Description: "View, and manage products",
    Roles: [
      "ProductAdmin",
      "PriceScheduleAdmin",
      "CatalogAdmin",
      "CategoryAdmin",
      "BuyerReader",
      "UserGroupReader",
      "AdminAddressReader",
      "SupplierAddressReader",
      "ProductFacetReader",
      "SupplierReader"
    ],
    CustomRoles: ["ProductManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  PromotionViewer: {
    Name: "Promotion Viewer",
    Description: "View promotions",
    Roles: ["PromotionReader"],
    CustomRoles: ["PromotionViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  PromotionManager: {
    Name: "Promotion Manager",
    Description: "View, and manage promotions",
    Roles: ["PromotionAdmin"],
    CustomRoles: ["PromotionManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  OrderViewer: {
    Name: "Order Viewer",
    Description: "View orders, shipments, and order returns",
    Roles: ["OrderReader", "ShipmentReader", "SupplierReader", "SupplierAddressReader"],
    CustomRoles: ["OrderViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  OrderManager: {
    Name: "Order Manager",
    Description: "View and manage orders, shipments, and order returns",
    Roles: ["OrderAdmin", "ShipmentAdmin", "SupplierReader", "SupplierAddressReader"],
    CustomRoles: ["OrderManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  BuyerViewer: {
    Name: "Buyer Viewer",
    Description: "View buyers",
    Roles: ["BuyerReader", "CatalogReader"],
    CustomRoles: ["BuyerViewer"],
    AllowedUserType: ["Admin"]
  },
  BuyerManager: {
    Name: "Buyer Manager",
    Description: "View, and manage buyers",
    Roles: ["BuyerAdmin", "CatalogReader"],
    CustomRoles: ["BuyerManager"],
    AllowedUserType: ["Admin"]
  },
  BuyerUserViewer: {
    Name: "Buyer User Viewer",
    Description: "View buyer users. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["BuyerUserReader"],
    CustomRoles: ["BuyerUserViewer"],
    AllowedUserType: ["Admin"]
  },
  BuyerUserManager: {
    Name: "Buyer User Manager",
    Description:
      "View, and manage buyer users. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["BuyerUserAdmin"],
    CustomRoles: ["BuyerUserManager"],
    AllowedUserType: ["Admin"]
  },
  BuyerUserGroupViewer: {
    Name: "Buyer User Group Viewer",
    Description: "View buyer user groups. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["UserGroupReader"],
    CustomRoles: ["BuyerUserGroupViewer"],
    AllowedUserType: ["Admin"]
  },
  BuyerUserGroupManager: {
    Name: "Buyer User Group Manager",
    Description:
      "View, and manage buyer user groups. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["UserGroupAdmin"],
    CustomRoles: ["BuyerUserGroupManager"],
    AllowedUserType: ["Admin"]
  },
  BuyerCatalogViewer: {
    Name: "Catalog Viewer",
    Description: "View catalogs. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["CatalogReader", "CategoryReader"],
    CustomRoles: ["BuyerCatalogViewer"],
    AllowedUserType: ["Admin"]
  },
  BuyerCatalogManager: {
    Name: "Catalog Manager",
    Description: "View, and manage catalogs. This permission should be paired with either BuyerViewer or BuyerManager",
    Roles: ["CatalogAdmin", "CategoryAdmin"],
    CustomRoles: ["BuyerCatalogManager"],
    AllowedUserType: ["Admin"]
  },
  SupplierViewer: {
    Name: "Supplier Viewer",
    Description: "View suppliers",
    Roles: ["SupplierReader"],
    CustomRoles: ["SupplierViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierManager: {
    Name: "Supplier Manager",
    Description: "View, and manage suppliers",
    Roles: ["SupplierAdmin"],
    CustomRoles: ["SupplierManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierPermissionViewer: {
    Name: "Supplier Permission Viewer",
    Description: "View supplier permissions",
    Roles: ["SecurityProfileReader"],
    CustomRoles: ["SupplierPermissionViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierPermissionManager: {
    Name: "Supplier Permission Manager",
    Description: "View, and manage supplier permissions",
    Roles: ["SecurityProfileAdmin"],
    CustomRoles: ["SupplierPermissionManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierUserViewer: {
    Name: "Supplier User Viewer",
    Description: "View supplier users. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierUserReader"],
    CustomRoles: ["SupplierUserViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierUserManager: {
    Name: "Supplier User Manager",
    Description:
      "View, and manage supplier users. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierUserAdmin"],
    CustomRoles: ["SupplierUserManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierUserGroupViewer: {
    Name: "Supplier User Group Viewer",
    Description:
      "View supplier user groups. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierUserGroupReader"],
    CustomRoles: ["SupplierUserGroupViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierUserGroupManager: {
    Name: "Supplier User Group Manager",
    Description:
      "View, and manage supplier user groups. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierUserGroupAdmin"],
    CustomRoles: ["SupplierUserGroupManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierAddressViewer: {
    Name: "Supplier Address Viewer",
    Description:
      "View supplier addresses. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierAddressReader"],
    CustomRoles: ["SupplierAddressViewer"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  SupplierAddressManager: {
    Name: "Supplier Address Manager",
    Description:
      "View, and manage supplier addresses. This permission should be paired with either SupplierViewer or SupplierManager",
    Roles: ["SupplierAddressAdmin"],
    CustomRoles: ["SupplierAddressManager"],
    AllowedUserType: ["Supplier", "Admin"]
  },
  AdminPermissionViewer: {
    Name: "Admin Permission Viewer",
    Description: "View admin permissions",
    Roles: ["SecurityProfileReader"],
    CustomRoles: ["AdminPermissionViewer"],
    AllowedUserType: ["Admin"]
  },
  AdminPermissionManager: {
    Name: "Admin Permission Manager",
    Description: "View, and manage admin permissions",
    Roles: ["SecurityProfileAdmin"],
    CustomRoles: ["AdminPermissionManager"],
    AllowedUserType: ["Admin"]
  },
  AdminUserViewer: {
    Name: "Admin User Viewer",
    Description: "View admin users",
    Roles: ["AdminUserReader", "AdminUserGroupReader"],
    CustomRoles: ["AdminUserViewer"],
    AllowedUserType: ["Admin"]
  },
  AdminUserManager: {
    Name: "Admin User Manager",
    Description: "View, and manage admin users",
    Roles: ["AdminUserAdmin", "AdminUserGroupReader"],
    CustomRoles: ["AdminUserManager"],
    AllowedUserType: ["Admin"]
  },
  AdminAddressViewer: {
    Name: "Admin Address Viewer",
    Description: "View admin addresses",
    Roles: ["AdminAddressReader"],
    CustomRoles: ["AdminAddressViewer"],
    AllowedUserType: ["Admin"]
  },
  AdminAddressManager: {
    Name: "Admin Address Manager",
    Description: "View, and manage admin addresses",
    Roles: ["AdminAddressAdmin"],
    CustomRoles: ["AdminAddressManager"],
    AllowedUserType: ["Admin"]
  },
  ProductFacetViewer: {
    Name: "Product Facet Viewer",
    Description: "View product facets",
    Roles: ["ProductFacetReader"],
    CustomRoles: ["ProductFacetViewer"],
    AllowedUserType: ["Admin"]
  },
  ProductFacetManager: {
    Name: "Product Facet Manager",
    Description: "View, and manage product facets",
    Roles: ["ProductFacetAdmin"],
    CustomRoles: ["ProductFacetManager"],
    AllowedUserType: ["Admin"]
  }
}
