import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function AboutPage() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
            <Stack.Screen options={{
                title: 'About Us',
                headerShown: true,
                headerBackTitle: 'Back'
            }} />
            <ScrollView className="flex-1 p-6">
                <Text className="text-2xl font-bold text-primary mb-4">About the Portal</Text>
                <Text className="text-gray-600 text-base leading-relaxed mb-6">
                    The Bangsamoro Scholarship Portal is a unified platform designed to streamline the application and management of scholarship programs across the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).
                </Text>

                <Text className="text-xl font-bold text-gray-800 mb-3">Our Mission</Text>
                <Text className="text-gray-600 text-base leading-relaxed mb-6">
                    To provide equitable access to educational opportunities for the Bangsamoro youth, ensuring that no deserving student is left behind due to financial constraints.
                </Text>

                <Text className="text-xl font-bold text-gray-800 mb-3">Key Features</Text>
                <View className="gap-2 mb-6">
                    <FeatureItem text="Unified Application Process" />
                    <FeatureItem text="Real-time Status Tracking" />
                    <FeatureItem text="Automated Matching & Eligibility" />
                    <FeatureItem text="Secure Document Vault" />
                </View>

                <View className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <Text className="text-sm text-primary font-medium text-center">
                        Built with ❤️ by the MoroTech Team for the Bangsamoro People.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <View className="flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-secondary mr-2" />
            <Text className="text-gray-600 font-medium">{text}</Text>
        </View>
    );
}
