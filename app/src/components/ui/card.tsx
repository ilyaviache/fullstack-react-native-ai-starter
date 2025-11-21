import React from 'react';
import { View, Text } from 'react-native';
import type { ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={`bg-card rounded-lg border border-border shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <Text className={`text-2xl font-semibold leading-none tracking-tight text-card-foreground ${className || ''}`}>
      {children}
    </Text>
  );
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <Text className={`text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </Text>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={`p-6 pt-0 ${className || ''}`} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <View className={`flex flex-row items-center p-6 pt-0 ${className || ''}`} {...props}>
      {children}
    </View>
  );
}
