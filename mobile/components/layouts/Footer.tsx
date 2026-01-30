import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function Footer() {
    const router = useRouter();

    return (
        <View className="border-t border-gray-100 bg-gray-50 pt-10 pb-8 px-6">
            {/* Brand */}
            <View className="mb-8 items-center">
                <View className="flex-row items-center gap-3 mb-4">
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                    <View>
                        <Text className="text-xl font-bold text-foreground leading-tight">Bangsamoro</Text>
                        <Text className="text-xs font-bold tracking-wide text-foreground">
                            <Text className="text-secondary uppercase">Scholarship</Text> Portal
                        </Text>
                    </View>
                </View>
                <Text className="text-sm text-gray-500 text-center leading-relaxed mb-6">
                    Bridging Opportunities and the Bangsamoro Youth through accessible education.
                </Text>

                <View className="flex-row gap-4">
                    <SocialButton icon={Facebook} />
                    <SocialButton icon={Twitter} />
                    <SocialButton icon={Instagram} />
                </View>
            </View>

            {/* Accordion-style Links (Simplified for Mobile) */}
            <View className="flex-row flex-wrap justify-between gap-y-8 mb-10">
                <View className="w-[45%]">
                    <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Quick Links</Text>
                    <View className="gap-3">
                        <FooterLink label="Browse Scholarships" onPress={() => router.push('/(tabs)/scholarships')} />
                        <FooterLink label="About Us" onPress={() => router.push('/(public)/about')} />
                        <FooterLink label="Success Stories" onPress={() => router.push('/(public)/success-stories')} />
                        <FooterLink label="Contact Support" onPress={() => router.push('/(public)/contact')} />
                    </View>
                </View>

                <View className="w-[45%]">
                    <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Portals</Text>
                    <View className="gap-3">
                        <FooterLink label="Applicant Portal" onPress={() => router.push('/(auth)/login')} />
                        {/* Admin Portals redirect to Web */}
                        <FooterLink label="Entity Admin" onPress={() => Linking.openURL('https://scholarships.bangsamoro.gov.ph/admin')} />
                        <FooterLink label="Evaluator" onPress={() => Linking.openURL('https://scholarships.bangsamoro.gov.ph/evaluator')} />
                        <FooterLink label="Partner Portal" onPress={() => Linking.openURL('https://scholarships.bangsamoro.gov.ph/partner')} />
                    </View>
                </View>
            </View>

            {/* Contact */}
            <View className="mb-10">
                <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-4 text-center">Contact Us</Text>
                <View className="gap-4">
                    <ContactRow icon={MapPin} text="BARMM Gov. Center, Cotabato City" />
                    <ContactRow icon={Phone} text="(064) 123-4567" />
                    <ContactRow icon={Mail} text="support@bsp.gov.ph" />
                </View>
            </View>

            {/* Copyright */}
            <View className="border-t border-gray-200 pt-8 items-center">
                <Text className="text-xs text-gray-400 text-center mb-4">
                    © 2026 Bangsamoro Scholarship Portal.{'\n'}All rights reserved. Built by MoroTech.
                </Text>
                <View className="flex-row gap-6">
                    <TouchableOpacity><Text className="text-xs text-gray-500 font-medium underline">Privacy</Text></TouchableOpacity>
                    <TouchableOpacity><Text className="text-xs text-gray-500 font-medium underline">Terms</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function SocialButton({ icon: Icon }: { icon: any }) {
    return (
        <TouchableOpacity className="p-2.5 rounded-full border border-gray-200 bg-white items-center justify-center">
            <Icon size={18} color="#374151" />
        </TouchableOpacity>
    );
}

function FooterLink({ label, onPress }: { label: string, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text className="text-sm text-gray-500 font-medium">{label}</Text>
        </TouchableOpacity>
    )
}

function ContactRow({ icon: Icon, text }: { icon: any, text: string }) {
    return (
        <View className="flex-row items-center justify-center">
            <Icon size={16} color="#c5a020" />
            <Text className="ml-3 text-sm text-gray-500">{text}</Text>
        </View>
    )
}
