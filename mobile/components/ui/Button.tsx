import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    onPress?: () => void;
    title: string;
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    onPress,
    title,
    variant = 'default',
    size = 'default',
    className,
    loading,
    disabled,
    icon
}: ButtonProps) {

    const baseStyles = "flex-row items-center justify-center rounded-xl";

    const variants = {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "bg-transparent border border-gray-300",
        ghost: "bg-transparent",
        link: "bg-transparent"
    };

    const textStyles = {
        default: "text-white font-bold",
        secondary: "text-white font-bold",
        outline: "text-foreground font-medium",
        ghost: "text-primary font-medium",
        link: "text-emerald-600 font-medium underline"
    };

    const sizes = {
        default: "px-5 py-3.5",
        sm: "px-3 py-2",
        lg: "px-8 py-4"
    };

    const textSizes = {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg"
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                disabled && "opacity-50",
                className
            )}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#1B5E20' : '#fff'} />
            ) : (
                <>
                    {icon && <Text className="mr-2">{icon}</Text>}
                    <Text className={twMerge(textStyles[variant], textSizes[size])}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
