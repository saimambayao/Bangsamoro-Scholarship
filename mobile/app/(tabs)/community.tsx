import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share2, MoreHorizontal, Search, PlusCircle } from 'lucide-react-native';
import '../../global.css';

const MOCK_POSTS = [
    {
        id: '1',
        author: 'Sarah Alih',
        role: 'Scholar',
        time: '2h ago',
        content: 'Just finished my first semester at MSU! So grateful for the BASE scholarship support.',
        likes: 24,
        comments: 5,
        image: null
    },
    {
        id: '2',
        author: 'MoroTech Official',
        role: 'Community Partner',
        time: '5h ago',
        content: 'Join our upcoming webinar on Digital Literacy and Modern Tools for Scholars!',
        likes: 42,
        comments: 12,
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '3',
        author: 'Abdul Rahim',
        role: 'Alumni',
        time: '1d ago',
        content: 'Pro tip for new applicants: Make sure your residency certificates are up to date before the deadline!',
        likes: 56,
        comments: 18,
        image: null
    }
];

export default function CommunityScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-foreground">Community</Text>
                <TouchableOpacity>
                    <PlusCircle size={24} color="#004d40" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Search / Share something */}
                <View className="p-6 bg-white mb-2">
                    <View className="flex-row items-center bg-gray-100 rounded-full px-4 h-12 mb-4">
                        <Search size={20} color="#9ca3af" />
                        <TextInput
                            placeholder="Search discussions..."
                            className="flex-1 ml-2 text-gray-800"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                    <TouchableOpacity className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                        <Text className="text-primary font-medium">Share an update with the community...</Text>
                    </TouchableOpacity>
                </View>

                {/* Feed */}
                {MOCK_POSTS.map((post) => (
                    <View key={post.id} className="bg-white mb-2 p-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                                    <View className="w-full h-full bg-primary/10 items-center justify-center">
                                        <Text className="text-primary font-bold">{post.author[0]}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-900">{post.author}</Text>
                                    <View className="flex-row items-center">
                                        <Text className="text-xs text-gray-500">{post.role} • {post.time}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <MoreHorizontal size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-gray-800 text-base leading-6 mb-4">{post.content}</Text>

                        {post.image && (
                            <View className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <Image source={{ uri: post.image }} className="w-full h-full" resizeMode="cover" />
                            </View>
                        )}

                        <View className="flex-row items-center border-t border-gray-50 pt-4">
                            <TouchableOpacity className="flex-row items-center mr-6">
                                <Heart size={20} color="#6b7280" className="mr-2" />
                                <Text className="text-gray-500 text-sm font-medium">{post.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center mr-6">
                                <MessageCircle size={20} color="#6b7280" className="mr-2" />
                                <Text className="text-gray-500 text-sm font-medium">{post.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center">
                                <Share2 size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
