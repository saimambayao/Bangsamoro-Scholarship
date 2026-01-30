import { Tabs } from 'expo-router';
import { Home, ClipboardList, User, Users, GraduationCap } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#1B5E20', // Primary Green
                tabBarInactiveTintColor: '#94a3b8', // Slate 400
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="scholarships"
                options={{
                    title: 'Browse',
                    tabBarIcon: ({ color, size }) => <GraduationCap size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="applications"
                options={{
                    title: 'Applications',
                    tabBarIcon: ({ color, size }) => <ClipboardList size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: 'Community',
                    tabBarIcon: ({ color, size }) => <Users size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
