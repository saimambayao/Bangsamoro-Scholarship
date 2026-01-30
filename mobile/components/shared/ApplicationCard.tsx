import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react-native';

interface ApplicationCardProps {
    id: string;
    title: string;
    provider: string;
    status: 'Draft' | 'Submitted' | 'Screening' | 'Evaluation' | 'Approved' | 'Rejected' | 'Under Review';
    progress?: number;
    dateLabel: string;
    dateValue: string;
}

export function ApplicationCard({
    id,
    title,
    provider,
    status,
    progress,
    dateLabel,
    dateValue
}: ApplicationCardProps) {
    const router = useRouter();

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'destructive';
            case 'Draft': return 'outline';
            case 'Under Review': return 'warning';
            case 'Screening': return 'info';
            case 'Evaluation': return 'info';
            default: return 'default';
        }
    };

    return (
        <TouchableOpacity
            onPress={() => router.push(`/application/${id}`)}
            className="bg-card p-4 rounded-2xl border border-gray-100 mb-4 shadow-sm"
        >
            <View className="flex-row justify-between items-start mb-2">
                <View>
                    <Text className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{provider}</Text>
                    <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
                </View>
                <Badge label={status} variant={getStatusVariant(status)} />
            </View>

            {progress !== undefined && (
                <View className="mb-3">
                    <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </View>
                    <Text className="text-xs text-gray-500 mt-1 text-right">{progress}% Complete</Text>
                </View>
            )}

            <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
                <Text className="text-xs text-gray-500">
                    {dateLabel}: <Text className="font-medium text-gray-700">{dateValue}</Text>
                </Text>
                <View className="flex-row items-center">
                    <Text className="text-xs font-bold text-primary mr-1">View Details</Text>
                    <ArrowRight size={12} color="#004d40" />
                </View>
            </View>
        </TouchableOpacity>
    );
}
