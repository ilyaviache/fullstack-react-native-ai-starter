import React from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <TextInput
      className={`
        flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3
        text-base text-foreground
        placeholder:text-muted-foreground
        focus:border-ring focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? 'border-destructive' : ''}
        ${className || ''}
      `}
      placeholderTextColor="hsl(215.4 16.3% 46.9%)"
      {...props}
    />
  );
}
