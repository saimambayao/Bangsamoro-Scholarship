import { View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
    label: string;
    variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
    className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: "bg-primary/10",
        secondary: "bg-secondary/10",
        outline: "bg-transparent border border-gray-200",
        destructive: "bg-red-100",
        success: "bg-green-100",
        warning: "bg-amber-100",
        info: "bg-blue-100"
    };

    const textStyles = {
        default: "text-primary",
        secondary: "text-secondary",
        outline: "text-foreground",
        destructive: "text-red-700",
        success: "text-green-700",
        warning: "text-amber-700",
        info: "text-blue-700"
    };

    return (
        <View className={twMerge("px-2.5 py-0.5 rounded-full self-start", variants[variant], className)}>
            <Text className={twMerge("text-xs font-bold", textStyles[variant])}>
                {label}
            </Text>
        </View>
    );
}
