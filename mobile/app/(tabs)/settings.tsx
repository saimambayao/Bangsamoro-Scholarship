import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Shield, CircleHelp, LogOut, ChevronRight, ArrowLeft } from 'lucide-react-native';
import '../../global.css';

export default function SettingsScreen() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => router.replace('/(auth)/login') }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#313131" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-900">Settings</Text>
            </View>

            <ScrollView className="flex-1 p-6">
                <SettingItem icon={Bell} label="Notifications" />
                <SettingItem icon={Shield} label="Privacy & Security" />
                <SettingItem icon={CircleHelp} label="Help & Support" />

                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center p-4 bg-red-50 rounded-2xl mt-8 border border-red-100"
                >
                    <LogOut size={22} color="#dc2626" className="mr-3" />
                    <Text className="text-red-600 font-bold text-base">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

function SettingItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
            <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
                <Icon size={20} color="#004d40" />
            </View>
            <Text className="flex-1 font-bold text-gray-700">{label}</Text>
            <ChevronRight size={18} color="#9ca3af" />
        </TouchableOpacity>
    );
}
