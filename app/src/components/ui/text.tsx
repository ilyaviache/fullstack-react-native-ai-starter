import React from 'react';
import { Text as RNText } from 'react-native';
import type { TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'large' | 'small' | 'muted';
  children: React.ReactNode;
}

const variantStyles = {
  h1: 'text-4xl font-extrabold tracking-tight text-foreground',
  h2: 'text-3xl font-semibold tracking-tight text-foreground',
  h3: 'text-2xl font-semibold tracking-tight text-foreground',
  h4: 'text-xl font-semibold tracking-tight text-foreground',
  p: 'text-base leading-7 text-foreground',
  large: 'text-lg font-semibold text-foreground',
  small: 'text-sm font-medium leading-none text-foreground',
  muted: 'text-sm text-muted-foreground',
};

export function Text({ variant = 'p', className, children, ...props }: TextProps) {
  return (
    <RNText
      className={`${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
