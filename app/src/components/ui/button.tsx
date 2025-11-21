import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-primary',
  destructive: 'bg-destructive',
  outline: 'border border-input bg-background',
  secondary: 'bg-secondary',
  ghost: 'bg-transparent',
  link: 'bg-transparent underline-offset-4',
};

const variantTextStyles = {
  default: 'text-primary-foreground font-semibold',
  destructive: 'text-destructive-foreground font-semibold',
  outline: 'text-foreground',
  secondary: 'text-secondary-foreground font-semibold',
  ghost: 'text-foreground',
  link: 'text-primary underline',
};

const sizeStyles = {
  default: 'h-12 px-6 py-3',
  sm: 'h-10 px-4 py-2',
  lg: 'h-14 px-8 py-4',
  icon: 'h-12 w-12',
};

const sizeTextStyles = {
  default: 'text-base',
  sm: 'text-sm',
  lg: 'text-lg',
  icon: 'text-base',
};

export function Button({
  variant = 'default',
  size = 'default',
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg
        flex items-center justify-center
        ${isDisabled ? 'opacity-50' : 'active:opacity-80'}
        ${className || ''}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'default' || variant === 'destructive' ? 'white' : 'black'} />
      ) : typeof children === 'string' ? (
        <Text
          className={`
            ${variantTextStyles[variant]}
            ${sizeTextStyles[size]}
          `}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
