function UserAvatar({ user, size = 'md' }) {
  // Get first letter of username or name
  const initial = user?.username?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || '?';
  
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
    xl: 'w-16 h-16 text-2xl'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-purple-600 
        rounded-full 
        flex items-center justify-center 
        text-white 
        font-semibold 
        cursor-pointer
        hover:bg-purple-700 
        transition-colors
        shadow-md
      `}
    >
      {initial}
    </div>
  );
}

export default UserAvatar;