// Role and Permission definitions for SQLite (no native enums support)

export type UserRole = 'PRESIDENT' | 'SECRETARY' | 'TREASURER' | 'MEMBER' | 'AUDITOR'

export type Permission = 
  | 'CREATE_USER' | 'READ_USER' | 'UPDATE_USER' | 'DELETE_USER'
  | 'CREATE_COMMITTEE' | 'READ_COMMITTEE' | 'UPDATE_COMMITTEE' | 'DELETE_COMMITTEE'
  | 'CREATE_ACCOUNT' | 'READ_ACCOUNT' | 'UPDATE_ACCOUNT' | 'DELETE_ACCOUNT'
  | 'VIEW_REPORTS' | 'EXPORT_REPORTS' | 'CREATE_REPORTS'
  | 'ENTER_DATA' | 'EDIT_DATA' | 'DELETE_DATA'

export const rolePermissions: Record<UserRole, Permission[]> = {
  PRESIDENT: [
    'CREATE_USER', 'READ_USER', 'UPDATE_USER', 'DELETE_USER',
    'CREATE_COMMITTEE', 'READ_COMMITTEE', 'UPDATE_COMMITTEE', 'DELETE_COMMITTEE',
    'CREATE_ACCOUNT', 'READ_ACCOUNT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT',
    'VIEW_REPORTS', 'EXPORT_REPORTS', 'CREATE_REPORTS',
    'ENTER_DATA', 'EDIT_DATA', 'DELETE_DATA',
  ],
  SECRETARY: [
    'READ_USER',
    'CREATE_COMMITTEE', 'READ_COMMITTEE', 'UPDATE_COMMITTEE',
    'READ_ACCOUNT',
    'CREATE_REPORTS', 'VIEW_REPORTS',
    'ENTER_DATA', 'EDIT_DATA',
  ],
  TREASURER: [
    'READ_USER',
    'READ_COMMITTEE',
    'CREATE_ACCOUNT', 'READ_ACCOUNT', 'UPDATE_ACCOUNT',
    'VIEW_REPORTS', 'EXPORT_REPORTS', 'CREATE_REPORTS',
    'ENTER_DATA', 'EDIT_DATA',
  ],
  MEMBER: [
    'READ_USER',
    'READ_COMMITTEE',
    'READ_ACCOUNT',
    'VIEW_REPORTS',
  ],
  AUDITOR: [
    'READ_USER',
    'READ_COMMITTEE',
    'READ_ACCOUNT',
    'VIEW_REPORTS', 'EXPORT_REPORTS',
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}
