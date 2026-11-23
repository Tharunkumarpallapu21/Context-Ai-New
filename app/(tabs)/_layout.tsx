import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/haptic-tab";
import { useAppColors } from "@/components/app-ui";

export default function TabLayout() {
  const colors = useAppColors();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, tabBarButton: HapticTab, tabBarStyle: { display: "none" } }}>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <Ionicons size={24} name="home-outline" color={color as unknown as string | undefined} /> }} />
    <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color }) => <Ionicons size={24} name="compass-outline" color={color as unknown as string | undefined} /> }} />
    <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <Ionicons size={24} name="person-outline" color={color as unknown as string | undefined} /> }} />
  </Tabs>;
}
