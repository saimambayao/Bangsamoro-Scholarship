import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Badge } from '../ui/Badge';

interface ScholarshipCardProps {
    id: string;
    title: string;
    provider: string;
    deadline?: string;
    tags?: string[];
    amount?: string;
    featured?: boolean;
}

export function ScholarshipCard({
    id,
    title,
    provider,
    deadline,
    tags,
    amount,
    featured
}: ScholarshipCardProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/scholarship/${id}`)}
            className={`mb-4 p-5 rounded-3xl border shadow-sm ${featured ? 'bg-primary border-primary' : 'bg-card border-border'}`}
        >
            <View className="flex-row justify-between items-start mb-3">
                <View className={`px-3 py-1 rounded-full ${featured ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Text className={`text-xs font-bold ${featured ? 'text-white' : 'text-primary'}`}>
                        {provider}
                    </Text>
                </View>
                {deadline && (
                    <Text className={`text-xs ${featured ? 'text-white/80' : 'text-muted-foreground'}`}>
                        Due {deadline}
                    </Text>
                )}
            </View>

            <Text className={`text-xl font-bold mb-2 leading-tight ${featured ? 'text-white' : 'text-foreground'}`}>
                {title}
            </Text>

            {amount && (
                <Text className={`mb-3 font-semibold ${featured ? 'text-secondary' : 'text-emerald-700'}`}>
                    {amount}
                </Text>
            )}

            <View className="flex-row flex-wrap mt-1">
                {tags?.map((tag, i) => (
                    <View key={i} className={`mr-2 mt-2 px-3 py-1 rounded-lg ${featured ? 'bg-black/20' : 'bg-muted'}`}>
                        <Text className={`text-xs font-medium ${featured ? 'text-white/90' : 'text-secondary-foreground'}`}>
                            {tag}
                        </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
}
