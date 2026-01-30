import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Award, CheckCircle2, Info, ChevronRight } from 'lucide-react-native';
import { SCHOLARSHIPS } from '../../constants/mock-data';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import '../../global.css';

export default function ScholarshipDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const scholarship = SCHOLARSHIPS.find(s => s.id === id);

    if (!scholarship) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-500">Scholarship not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4">
                    <Text className="text-primary font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Custom Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 flex-1" numberOfLines={1}>
                    {scholarship.title}
                </Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="p-6 bg-primary/5">
                    <Badge className="bg-primary/10 text-primary mb-3 self-start">
                        {scholarship.provider}
                    </Badge>
                    <Text className="text-2xl font-bold text-gray-900 mb-4">
                        {scholarship.title}
                    </Text>

                    <View className="flex-row items-center mb-6">
                        <View className="flex-row items-center mr-6">
                            <Calendar size={18} color="#6b7280" className="mr-2" />
                            <Text className="text-gray-600 text-sm font-medium">Due {scholarship.deadline}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Award size={18} color="#C5A020" className="mr-2" />
                            <Text className="text-secondary font-bold text-sm">{scholarship.amount}</Text>
                        </View>
                    </View>

                    <View className="flex-row flex-wrap">
                        {scholarship.tags?.map((tag, i) => (
                            <View key={i} className="bg-white px-3 py-1 rounded-lg border border-gray-100 mr-2 mb-2">
                                <Text className="text-xs text-gray-600 font-medium">{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Content */}
                <View className="p-6">
                    {/* Description */}
                    <View className="mb-8">
                        <View className="flex-row items-center mb-3">
                            <Info size={20} color="#004d40" className="mr-2" />
                            <Text className="text-lg font-bold text-gray-900">About the Program</Text>
                        </View>
                        <Text className="text-gray-600 leading-6 text-base">
                            {scholarship.description}
                        </Text>
                    </View>

                    {/* Eligibility */}
                    <View className="mb-8">
                        <View className="flex-row items-center mb-4">
                            <Award size={20} color="#004d40" className="mr-2" />
                            <Text className="text-lg font-bold text-gray-900">Eligibility Criteria</Text>
                        </View>
                        {scholarship.eligibility?.map((item, i) => (
                            <View key={i} className="flex-row items-start mb-3">
                                <CheckCircle2 size={18} color="#059669" className="mt-0.5 mr-3" />
                                <Text className="text-gray-600 flex-1 text-base">{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Requirements */}
                    <View className="mb-8">
                        <View className="flex-row items-center mb-4">
                            <CheckCircle2 size={20} color="#004d40" className="mr-2" />
                            <Text className="text-lg font-bold text-gray-900">Documentary Requirements</Text>
                        </View>
                        {scholarship.requirements?.map((item, i) => (
                            <View key={i} className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3 border border-gray-100">
                                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
                                    <Text className="text-primary font-bold text-xs">{i + 1}</Text>
                                </View>
                                <Text className="text-gray-700 font-medium flex-1">{item}</Text>
                                <ChevronRight size={16} color="#9ca3af" />
                            </View>
                        ))}
                    </View>
                </View>

                <View className="h-24" />
            </ScrollView>

            {/* Bottom CTA */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 shadow-lg">
                <Button
                    onPress={() => router.push({ pathname: '/scholarship/apply', params: { id: scholarship.id } })}
                    className="h-14 rounded-2xl"
                >
                    <Text className="text-white font-bold text-lg">Apply for this Scholarship</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
