/**
 * Authentication and authorization utilities
 */

export type UserRole = 'branch-manager' | 'data-team' | 'procurement';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('authenticated') === 'true';
};

/**
 * Get current user role
 */
export const getUserRole = (): UserRole | null => {
  if (typeof window === 'undefined') return null;
  const role = localStorage.getItem('procurement_role');
  if (role === 'branch-manager' || role === 'data-team' || role === 'procurement') {
    return role as UserRole;
  }
  return null;
};

/**
 * Get current user's branch (for Branch Manager)
 */
export const getUserBranch = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('branch_name');
};

/**
 * Check if user has edit permissions
 * Only Data Team can edit
 */
export const canEdit = (): boolean => {
  return getUserRole() === 'data-team';
};

/**
 * Check if user can view
 * All authenticated users can view
 */
export const canView = (): boolean => {
  return isAuthenticated();
};

/**
 * Logout user
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('procurement_role');
    localStorage.removeItem('branch_name');
  }
};

/**
 * Login user with role and optional branch
 */
export const login = (role: UserRole, branch?: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('procurement_role', role);
    if (branch) {
      localStorage.setItem('branch_name', branch);
    }
  }
};
