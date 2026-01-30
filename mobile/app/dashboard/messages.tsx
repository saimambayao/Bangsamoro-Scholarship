import { View, Text, ScrollView, TouchableOpacity, Search } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search as SearchIcon, MessageSquare, Plus } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import '../../global.css';

const MOCK_MESSAGES = [
    {
        id: '1',
        sender: 'MBHTE Support',
        lastMessage: 'Your document for AHME has been verified.',
        time: '10:30 AM',
        unread: true,
        avatar: 'M'
    },
    {
        id: '2',
        sender: 'MOST Evaluation Team',
        lastMessage: 'Congratulations! Your application has been approved.',
        time: 'Yesterday',
        unread: false,
        avatar: 'T'
    },
    {
        id: '3',
        sender: 'Regional Admin',
        lastMessage: 'Please check the new guidelines for 2026.',
        time: 'Jan 25',
        unread: false,
        avatar: 'A'
    }
];

export default function MessagesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#004d40" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 flex-1">Messages</Text>
            </View>

            <View className="px-6 pt-6 pb-2">
                <View className="bg-gray-100 rounded-xl flex-row items-center px-4 h-12 mb-4">
                    <SearchIcon size={20} color="#9ca3af" />
                    <Input
                        placeholder="Search messages..."
                        containerClassName="mb-0 flex-1 ml-2"
                        className="bg-transparent border-0 h-12 py-0"
                    />
                </View>
            </View>

            <ScrollView className="flex-1">
                {MOCK_MESSAGES.map((msg) => (
                    <TouchableOpacity
                        key={msg.id}
                        className="px-6 py-4 flex-row items-center border-b border-gray-50 active:bg-gray-50"
                        onPress={() => { }}
                    >
                        <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mr-4">
                            <Text className="text-primary font-bold text-lg">{msg.avatar}</Text>
                        </View>

                        <View className="flex-1">
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className={`text-base ${msg.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                    {msg.sender}
                                </Text>
                                <Text className="text-xs text-gray-400">{msg.time}</Text>
                            </View>
                            <Text className={`text-sm ${msg.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`} numberOfLines={1}>
                                {msg.lastMessage}
                            </Text>
                        </View>

                        {msg.unread && (
                            <View className="w-2.5 h-2.5 bg-primary rounded-full ml-2" />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg">
                <Plus size={24} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
