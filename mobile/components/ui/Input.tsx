import { View, TextInput, Text, TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    containerClassName,
    className,
    ...props
}: InputProps) {
    return (
        <View className={twMerge("mb-4", containerClassName)}>
            {label && (
                <Text className="mb-2 text-sm font-medium text-foreground">
                    {label}
                </Text>
            )}
            <TextInput
                className={twMerge(
                    "px-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground font-medium",
                    "focus:border-primary focus:border-2",
                    error && "border-red-500",
                    className
                )}
                placeholderTextColor="#9ca3af"
                {...props}
            />
            {error && (
                <Text className="mt-1 text-xs text-red-500 font-medium">
                    {error}
                </Text>
            )}
        </View>
    );
}
