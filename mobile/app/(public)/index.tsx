import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, UserPlus, Search, ClipboardList, ArrowRight, Quote } from 'lucide-react-native';
import { Footer } from '../../components/layouts/Footer'; // Mobile Footer
import '../../global.css';

export default function LandingPage() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1">
                {/* Navbar */}
                <View className="px-6 py-4 flex-row justify-between items-center border-b border-gray-50 bg-white">
                    <View className="flex-row items-center gap-2">
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ width: 32, height: 32 }}
                            resizeMode="contain"
                        />
                        <Text className="font-bold text-lg text-primary">Bangsamoro</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text className="text-primary font-bold">Log In</Text>
                    </TouchableOpacity>
                </View>

                {/* Hero Section */}
                <View className="px-6 py-12 items-center">
                    <View className="mb-6 bg-primary/5 p-4 rounded-full">
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ width: 80, height: 80 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-4xl font-bold text-center text-foreground mb-4">
                        Empowering the <Text className="text-primary">Bangsamoro</Text> Youth
                    </Text>
                    <Text className="text-center text-gray-500 mb-8 text-lg leading-relaxed">
                        One portal for all scholarship opportunities in the region. Apply, track, and succeed.
                    </Text>

                    <View className="w-full gap-3">
                        <Button
                            title="Apply Now"
                            size="lg"
                            onPress={() => router.push('/(auth)/register')}
                            icon={<ArrowRight size={20} color="#fff" />}
                        />
                        <Button
                            title="Browse Scholarships"
                            variant="outline"
                            size="lg"
                            onPress={() => router.push('/(tabs)/scholarships')}
                        />
                    </View>
                </View>

                {/* Stats Section */}
                <View className="py-12 bg-gray-50 border-y border-gray-100">
                    <View className="flex-row justify-around px-6">
                        <StatItem value="15k+" label="Scholars" />
                        <StatItem value="₱250M" label="Disbursed" />
                        <StatItem value="12" label="Programs" />
                    </View>
                </View>

                {/* How It Works */}
                <View className="px-6 py-12">
                    <Text className="text-2xl font-bold text-center mb-10 uppercase text-primary">How It Works</Text>

                    <StepItem
                        number="01"
                        title="Create Profile"
                        desc="Register and complete your academic profile once."
                        icon={UserPlus}
                    />
                    <StepItem
                        number="02"
                        title="Browse"
                        desc="Find scholarships that match your eligibility."
                        icon={Search}
                    />
                    <StepItem
                        number="03"
                        title="Apply Online"
                        desc="Submit applications with a single click."
                        icon={ClipboardList}
                    />
                    <StepItem
                        number="04"
                        title="Track Status"
                        desc="Get real-time updates on your application."
                        icon={CheckCircle2}
                        last
                    />
                </View>

                {/* Inspiring Journeys Card */}
                <View className="px-6 pb-12">
                    <View className="bg-primary rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                        {/* Background Decor */}
                        <View className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full" />

                        <View className="mb-6">
                            <Text className="text-white text-3xl font-extrabold leading-tight">
                                Inspiring <Text className="text-secondary">Journeys</Text>
                            </Text>
                            <Text className="text-white/80 mt-2 font-medium">
                                See how the portal is changing lives across the region.
                            </Text>
                        </View>

                        {/* Testimonial Card Inside */}
                        <View className="bg-white/10 p-5 rounded-2xl border border-white/10 mb-6 backdrop-blur-md">
                            <Quote size={20} color="#c5a020" className="mb-2 opacity-80" />
                            <Text className="text-white/90 text-sm font-medium leading-relaxed italic mb-4">
                                "The AHME scholarship didn't just fund my education—it gave me a community of mentors who pushed me to excel."
                            </Text>
                            <View className="flex-row items-center border-t border-white/10 pt-3">
                                <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-3">
                                    <Text className="text-xs font-bold text-white">MS</Text>
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-xs">Maria Santos, RN</Text>
                                    <Text className="text-white/60 text-[10px] uppercase font-bold">MSU-IIT Graduate</Text>
                                </View>
                            </View>
                        </View>

                        <Button
                            title="Read All Stories"
                            variant="secondary"
                            className="w-full bg-secondary"
                            onPress={() => router.push('/(public)/success-stories')}
                            icon={<ArrowRight size={18} color="#1B5E20" />}
                        />
                    </View>
                </View>

                {/* Footer */}
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <View className="items-center">
            <Text className="text-3xl font-bold text-primary mb-1">{value}</Text>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</Text>
        </View>
    );
}

function StepItem({ number, title, desc, icon: Icon, last }: { number: string, title: string, desc: string, icon: any, last?: boolean }) {
    return (
        <View className="flex-row mb-8 min-h-[100px]">
            <View className="items-center mr-4">
                <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center border border-primary/20 z-10 bg-white">
                    <Icon size={24} color="#1B5E20" />
                </View>
                {!last && <View className="w-0.5 flex-1 bg-gray-200 -mt-2 pt-2" />}
            </View>
            <View className="flex-1 pb-4 pt-1">
                <Text className="text-xs font-bold text-secondary mb-1">STEP {number}</Text>
                <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
                <Text className="text-gray-500 leading-relaxed">{desc}</Text>
            </View>
        </View>
    );
}
