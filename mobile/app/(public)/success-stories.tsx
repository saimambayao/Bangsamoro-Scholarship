import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Footer } from '../../components/layouts/Footer';
import { SUCCESS_STORIES } from '../../constants/mock-data';
import '../../global.css';

export default function SuccessStories() {
    const router = useRouter();
    const featuredStory = SUCCESS_STORIES.find((s) => s.featured) || SUCCESS_STORIES[0];
    const otherStories = SUCCESS_STORIES.filter((s) => s.id !== featuredStory.id);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1">

                {/* Header */}
                <View className="px-6 py-4 flex-row items-center border-b border-gray-50 bg-white">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ArrowLeft size={24} color="#004d40" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg text-primary">Success Stories</Text>
                </View>

                {/* Page Title */}
                <View className="px-6 pt-8 pb-6">
                    <Text className="text-3xl font-extrabold text-foreground leading-tight mb-3">
                        Transforming Lives
                    </Text>
                    <Text className="text-gray-500 leading-relaxed text-base">
                        Read the inspiring journeys of Bangsamoro scholars who are turning their dreams into reality.
                    </Text>
                </View>

                {/* Featured Story */}
                <View className="px-5 mb-10">
                    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <View className="h-56 bg-primary/5 items-center justify-center relative overflow-hidden">
                            <Image
                                source={featuredStory.image}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                            <View className="absolute bottom-4 left-4 bg-primary/90 px-3 py-1 rounded-full">
                                <Text className="text-xs font-bold text-white uppercase">Featured Story</Text>
                            </View>
                        </View>

                        <View className="p-5">
                            <Text className="text-2xl font-bold text-foreground mb-1 leading-tight">
                                "From a Small Barangay to Licensed Nurse"
                            </Text>
                            <Text className="text-primary font-bold text-base mb-4">{featuredStory.name}</Text>

                            <View className="relative pl-4 border-l-4 border-secondary/50 mb-6">
                                <Quote size={20} color="#c5a020" className="opacity-40 absolute -top-1 -left-1" />
                                <Text className="text-gray-600 italic leading-relaxed">
                                    "{featuredStory.quote}"
                                </Text>
                            </View>

                            <Button
                                title="Read Full Story"
                                variant="outline"
                                size="sm"
                                onPress={() => { }}
                                icon={<ArrowRight size={16} color="#004d40" />}
                            />
                        </View>
                    </View>
                </View>

                {/* Other Stories Grid */}
                <View className="px-5 mb-12">
                    <Text className="text-xl font-bold text-foreground mb-4">More Inspiring Stories</Text>
                    <View className="gap-5">
                        {otherStories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </View>
                </View>

                {/* Call to Action */}
                <View className="px-5 mb-12">
                    <View className="bg-primary rounded-2xl p-6 items-center">
                        <Text className="text-xl font-bold text-white text-center mb-2">Share Your Story</Text>
                        <Text className="text-white/80 text-center text-sm leading-relaxed mb-6">
                            Are you a Bangsamoro scholar with an inspiring journey? Encourage the next generation.
                        </Text>
                        <Button
                            title="Submit Your Story"
                            variant="secondary"
                            className="bg-secondary w-full"
                        />
                    </View>
                </View>

                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
}

function StoryCard({ story }: { story: any }) {
    return (
        <View className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-row">
            <View className="w-24 h-28 bg-gray-50 overflow-hidden">
                <Image
                    source={story.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </View>
            <View className="flex-1 p-3">
                <View className="flex-row mb-1">
                    <Badge variant="outline" className="scale-75 origin-left">{story.role}</Badge>
                </View>
                <Text className="font-bold text-foreground text-sm mb-1">{story.name}</Text>
                <Text className="text-xs text-gray-500 mb-2">{story.school}</Text>
                <TouchableOpacity className="flex-row items-center">
                    <Text className="text-primary font-bold text-xs mr-1">Read Story</Text>
                    <ArrowRight size={12} color="#004d40" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
