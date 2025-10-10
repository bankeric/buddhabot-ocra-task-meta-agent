


from data_classes.common_classes import UserRole


def check_user_permissions_by_update_role(user_role: str, target_role: UserRole) -> bool:
    """Check if user role has permissions for the action"""
    try:
        # Owner can do everything
        if user_role == UserRole.OWNER.value:
            return True

        # Admin can update roles except Owner and Other Admins
        if user_role == UserRole.ADMIN.value:
            if target_role in [UserRole.OWNER, UserRole.ADMIN]:
                return False
            return True
        
        # Other roles cannot update roles
        return False
    except Exception as e:
        print(f"Error checking user permissions by role: {str(e)}")
        return False

def check_permissions_to_delete_user(current_user_role: str, target_user_role: str, is_self_deletion: bool) -> bool:
    """Check if current user has permissions to delete the target user"""
    try:
        # Prevent self-deletion
        if is_self_deletion:
            return False

        # Owner can delete anyone except themselves (handled above)
        if current_user_role == UserRole.OWNER.value:
            return True

        # Admin can delete viewers and contributors, but not other admins or owners
        if current_user_role == UserRole.ADMIN.value:
            if target_user_role in [UserRole.VIEWER.value, UserRole.CONTRIBUTOR.value]:
                return True
            return False
        
        # Other roles cannot delete users
        return False
    except Exception as e:
        print(f"Error checking permissions to delete user: {str(e)}")
        return False