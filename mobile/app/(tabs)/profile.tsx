import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Edit2, MapPin, Mail, Phone, GraduationCap } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import '../../global.css';

export default function ProfileScreen() {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 flex-row justify-between items-center">
                    <Text className="text-xl font-bold">My Profile</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/settings')}>
                        <Settings size={24} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <View className="px-6 mb-6">
                    <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 items-center">
                        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
                            <Text className="text-3xl font-bold text-primary">JD</Text>
                        </View>
                        <Text className="text-2xl font-bold text-foreground mb-1">Juan Dela Cruz</Text>
                        <Text className="text-gray-500 font-medium mb-4">Scholar • Applicant</Text>

                        <View className="w-full flex-row gap-3">
                            <Button title="Edit Profile" variant="outline" className="flex-1" size="sm" icon={<Edit2 size={16} color="#374151" />} />
                            <Button title="Share" variant="ghost" className="flex-1 bg-gray-50" size="sm" />
                        </View>
                    </View>
                </View>

                {/* Info Sections */}
                <View className="px-6 space-y-4 mb-8">
                    <InfoCard title="Personal Information">
                        <InfoRow icon={Mail} value="juan.delacruz@email.com" />
                        <InfoRow icon={Phone} value="+63 912 345 6789" />
                        <InfoRow icon={MapPin} value="Cotabato City, Maguindanao" />
                    </InfoCard>

                    <InfoCard title="Academic Information">
                        <InfoRow icon={GraduationCap} value="BS Computer Science" label="Course" />
                        <InfoRow icon={GraduationCap} value="MSU - Iligan Institute of Tech" label="School" />
                        <InfoRow icon={GraduationCap} value="3rd Year • GWA: 1.45" label="Year & Standing" />
                    </InfoCard>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function InfoCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">{title}</Text>
            <View className="gap-4">
                {children}
            </View>
        </View>
    );
}

function InfoRow({ icon: Icon, value, label }: { icon: any, value: string, label?: string }) {
    return (
        <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center mr-3">
                <Icon size={16} color="#6b7280" />
            </View>
            <View>
                {label && <Text className="text-xs text-gray-400 mb-0.5">{label}</Text>}
                <Text className="text-gray-700 font-medium">{value}</Text>
            </View>
        </View>
    );
}
