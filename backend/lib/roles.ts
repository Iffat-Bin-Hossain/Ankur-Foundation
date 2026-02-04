// Role and Permission Management
import { UserRole, Permission } from '@prisma/client'

// Define role-permission mappings
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.PRESIDENT]: [
    // Full Control
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.CREATE_COMMITTEE,
    Permission.READ_COMMITTEE,
    Permission.UPDATE_COMMITTEE,
    Permission.DELETE_COMMITTEE,
    Permission.CREATE_ACCOUNT,
    Permission.READ_ACCOUNT,
    Permission.UPDATE_ACCOUNT,
    Permission.DELETE_ACCOUNT,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.CREATE_REPORTS,
    Permission.ENTER_DATA,
    Permission.EDIT_DATA,
    Permission.DELETE_DATA,
  ],
  
  [UserRole.SECRETARY]: [
    // Data Entry + View
    Permission.READ_USER,
    Permission.READ_COMMITTEE,
    Permission.READ_ACCOUNT,
    Permission.ENTER_DATA,
    Permission.EDIT_DATA,
    Permission.VIEW_REPORTS,
  ],
  
  [UserRole.TREASURER]: [
    // Accounts Only
    Permission.READ_ACCOUNT,
    Permission.CREATE_ACCOUNT,
    Permission.UPDATE_ACCOUNT,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.ENTER_DATA,
  ],
  
  [UserRole.MEMBER]: [
    // View Only
    Permission.READ_USER,
    Permission.READ_COMMITTEE,
    Permission.VIEW_REPORTS,
  ],
  
  [UserRole.AUDITOR]: [
    // View + Export
    Permission.READ_USER,
    Permission.READ_COMMITTEE,
    Permission.READ_ACCOUNT,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
  ],
}

// Helper function to check if role has permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] ?? []
}

// Role descriptions
export const roleDescriptions: Record<UserRole, string> = {
  [UserRole.PRESIDENT]: 'Full Control - Manage all aspects of the organization',
  [UserRole.SECRETARY]: 'Data Entry & View - Enter and view organizational data',
  [UserRole.TREASURER]: 'Accounts Only - Manage financial accounts and transactions',
  [UserRole.MEMBER]: 'View Only - View organizational information',
  [UserRole.AUDITOR]: 'View & Export - View and export reports and data',
}

// Role color indicators
export const roleColors: Record<UserRole, string> = {
  [UserRole.PRESIDENT]: 'bg-red-500',
  [UserRole.SECRETARY]: 'bg-blue-500',
  [UserRole.TREASURER]: 'bg-green-500',
  [UserRole.MEMBER]: 'bg-gray-500',
  [UserRole.AUDITOR]: 'bg-purple-500',
}
