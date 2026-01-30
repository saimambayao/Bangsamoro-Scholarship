import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
import { ApplicationCard } from '../../components/shared/ApplicationCard';
import '../../global.css';

export default function ApplicationsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <View className="px-6 py-4 bg-white border-b border-gray-100">
                <Text className="text-2xl font-bold text-foreground mb-4">My Applications</Text>

                {/* Search & Filter */}
                <View className="flex-row gap-3 mb-2">
                    <View className="flex-1 bg-gray-100 rounded-xl flex-row items-center px-4 h-12">
                        <Search size={20} color="#9ca3af" />
                        <TextInput
                            placeholder="Search applications..."
                            placeholderTextColor="#9ca3af"
                            className="flex-1 ml-3 text-foreground font-medium"
                        />
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center border border-gray-200">
                        <Filter size={20} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
                    <TabButton label="All" count={5} active />
                    <TabButton label="Active" count={3} />
                    <TabButton label="Approved" count={1} />
                    <TabButton label="Rejected" count={1} />
                </ScrollView>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Active Applications</Text>

                <ApplicationCard
                    id="1"
                    title="Access to Higher Education (AHME)"
                    provider="MBHTE"
                    status="Under Review"
                    progress={55}
                    dateLabel="Submitted"
                    dateValue="Jan 15, 2026"
                />

                <ApplicationCard
                    id="2"
                    title="BASE-Merit Scholarship"
                    provider="MOST"
                    status="Approved"
                    progress={100}
                    dateLabel="Approved"
                    dateValue="Jan 10, 2026"
                />

                <View className="h-6" />
                <Text className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Past Applications</Text>

                <ApplicationCard
                    id="3"
                    title="CHED TES Grant"
                    provider="CHED"
                    status="Rejected"
                    dateLabel="Applied"
                    dateValue="Dec 20, 2025"
                />
            </ScrollView>
        </SafeAreaView>
    );
}

function TabButton({ label, count, active }: { label: string, count: number, active?: boolean }) {
    return (
        <TouchableOpacity className={`mr-2 px-4 py-2 rounded-full border flex-row items-center ${active ? 'bg-primary border-primary' : 'bg-transparent border-gray-200'}`}>
            <Text className={`font-medium mr-2 ${active ? 'text-white' : 'text-gray-600'}`}>{label}</Text>
            <View className={`px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                <Text className={`text-[10px] font-bold ${active ? 'text-white' : 'text-gray-600'}`}>{count}</Text>
            </View>
        </TouchableOpacity>
    );
}
