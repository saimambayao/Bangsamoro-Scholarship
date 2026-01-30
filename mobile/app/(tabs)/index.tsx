import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, GraduationCap, Users, Clock, Award, Bell, FileText, MessageSquare } from 'lucide-react-native';
import { ScholarshipCard } from '../../components/shared/ScholarshipCard';
import '../../global.css';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header / Hero Section */}
                <View className="px-6 pt-2 pb-6 bg-primary rounded-br-[40px] shadow-lg mb-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-white/80 text-sm font-medium">Welcome back,</Text>
                            <Text className="text-white font-bold text-2xl">Juan Dela Cruz</Text>
                        </View>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-primary-foreground/10 items-center justify-center border border-primary-foreground/20">
                            <Bell size={20} color="#fff" />
                            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-primary" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View className="bg-white/10 border border-white/20 rounded-2xl flex-row items-center px-4 h-12 mb-6">
                        <Search size={20} color="rgba(255,255,255,0.6)" />
                        <TextInput
                            placeholder="Search scholarships..."
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            className="flex-1 ml-3 text-white font-medium"
                        />
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row justify-between mb-2">
                        <StatCard label="Active" value="3" icon={ClipboardListIcon} />
                        <StatCard label="Pending" value="1" icon={Clock} />
                        <StatCard label="Saved" value="2" icon={Award} />
                    </View>
                </View>

                {/* Quick Services */}
                <View className="px-6 mb-8">
                    <Text className="text-foreground font-bold text-lg mb-4">Quick Services</Text>
                    <View className="flex-row flex-wrap justify-between">
                        <ServiceIcon icon={FileText} label="Docs" onPress={() => router.push('/dashboard/documents')} />
                        <ServiceIcon icon={MessageSquare} label="Support" onPress={() => router.push('/dashboard/messages')} />
                        <ServiceIcon icon={GraduationCap} label="Learning" onPress={() => router.push('/dashboard/learning')} />
                        <ServiceIcon icon={Users} label="Community" onPress={() => router.push('/(tabs)/community')} />
                    </View>
                </View>

                {/* Categories / Quick Actions */}
                <View className="px-6 mb-8">
                    <Text className="text-foreground font-bold text-lg mb-4">Explore Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-6 px-6">
                        <CategoryPill label="All" active />
                        <CategoryPill label="Undergraduate" />
                        <CategoryPill label="Master's" />
                        <CategoryPill label="Doctorate" />
                        <CategoryPill label="TVET" />
                    </ScrollView>
                </View>

                {/* Featured Scholarships */}
                <View className="px-6 mb-6">
                    <SectionHeader title="Recommended For You" onPress={() => { }} />

                    <ScholarshipCard
                        id="1"
                        title="Bangsamoro Assistance for Science Education (BASE)"
                        provider="MOST"
                        deadline="Oct 15, 2024"
                        tags={['Undergrad', 'Science', 'Stipend']}
                        amount="₱8,000 / month"
                        featured
                    />

                    <ScholarshipCard
                        id="2"
                        title="CMO Scholarship Program"
                        provider="Chief Minister's Office"
                        deadline="Nov 01, 2024"
                        tags={['Merit', 'All Courses']}
                        amount="Full Tuition"
                    />

                    <ScholarshipCard
                        id="3"
                        title="Access to Higher Education (AHME)"
                        provider="MBHTE"
                        deadline="Sep 30, 2024"
                        tags={['Tertiary', 'Financial Aid']}
                        amount="₱60,000 / year"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Sub-components
function StatCard({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <View className="items-center bg-white/10 rounded-xl p-3 flex-1 mx-1 border border-white/10">
            <View className="mb-1">
                <Icon size={18} color="#D4A017" />
            </View>
            <Text className="text-white font-bold text-lg">{value}</Text>
            <Text className="text-primary-foreground/70 text-[10px] uppercase font-medium">{label}</Text>
        </View>
    );
}

function CategoryPill({ label, active }: { label: string, active?: boolean }) {
    return (
        <TouchableOpacity className={`mr-3 px-5 py-2.5 rounded-full border ${active ? 'bg-primary border-primary' : 'bg-transparent border-gray-200'}`}>
            <Text className={`font-medium ${active ? 'text-white' : 'text-gray-500'}`}>{label}</Text>
        </TouchableOpacity>
    );
}

function SectionHeader({ title, onPress }: { title: string, onPress: () => void }) {
    return (
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-foreground font-bold text-lg">{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text className="text-primary font-medium text-sm">See All</Text>
            </TouchableOpacity>
        </View>
    );
}

function ServiceIcon({ icon: Icon, label, onPress }: { icon: any, label: string, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} className="items-center w-[22%] mb-4">
            <View className="w-12 h-12 bg-primary/5 rounded-2xl items-center justify-center mb-2 border border-primary/10">
                <Icon size={24} color="#004d40" />
            </View>
            <Text className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{label}</Text>
        </TouchableOpacity>
    );
}

// Fix icon import mapping
const ClipboardListIcon = ({ size, color }: { size: number, color: string }) => (
    <View style={{ width: size, height: size, borderColor: color, borderWidth: 2, borderRadius: 4 }} />
    // Placeholder since we can't import ClipboardList twice easily in one file without alias
); 
