import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Mail, Phone, MapPin, Globe } from 'lucide-react-native';

export default function ContactPage() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
            <Stack.Screen options={{
                title: 'Contact Support',
                headerShown: true,
                headerBackTitle: 'Back'
            }} />
            <ScrollView className="flex-1 p-6">
                <Text className="text-2xl font-bold text-primary mb-2">Get in Touch</Text>
                <Text className="text-gray-500 mb-8">
                    Have questions about your application? Our support team is here to help.
                </Text>

                <View className="gap-4">
                    <ContactCard
                        icon={Phone}
                        title="Call Us"
                        value="(064) 123-4567"
                        action={() => Linking.openURL('tel:0641234567')}
                        actionLabel="Call Now"
                    />
                    <ContactCard
                        icon={Mail}
                        title="Email Support"
                        value="support@bsp.gov.ph"
                        action={() => Linking.openURL('mailto:support@bsp.gov.ph')}
                        actionLabel="Send Email"
                    />
                    <ContactCard
                        icon={MapPin}
                        title="Visit Us"
                        value="BARMM Government Center, Cotabato City, 9600"
                        action={() => Linking.openURL('https://maps.google.com/?q=BARMM+Government+Center')}
                        actionLabel="Open Maps"
                    />
                    <ContactCard
                        icon={Globe}
                        title="Official Website"
                        value="scholarship.bangsamoro.site"
                        action={() => Linking.openURL('https://scholarship.bangsamoro.site')}
                        actionLabel="Visit Site"
                    />
                </View>

                <View className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <Text className="text-xs text-center text-gray-400">
                        Operating Hours: Monday - Friday, 8:00 AM - 5:00 PM
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function ContactCard({ icon: Icon, title, value, action, actionLabel }: { icon: any, title: string, value: string, action: () => void, actionLabel: string }) {
    return (
        <View className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-4">
                <View className="w-12 h-12 bg-primary/5 rounded-full items-center justify-center mr-4">
                    <Icon size={24} color="#004d40" />
                </View>
                <View className="flex-1">
                    <Text className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">{title}</Text>
                    <Text className="text-gray-900 font-bold" numberOfLines={1}>{value}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={action}
                className="bg-secondary/10 px-4 py-2 rounded-lg"
            >
                <Text className="text-secondary font-bold text-xs">{actionLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}
