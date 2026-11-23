import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomNav,
  ChoiceCard,
  EmptyState,
  FormField,
  IconButton,
  ListRow,
  MapPlaceholder,
  ModalSheet,
  NoticeBanner,
  PermissionCard,
  PrimaryButton,
  RouteCard,
  Screen,
  ScreenHeading,
  SearchField,
  SectionTitle,
  SecondaryButton,
  SegmentedControl,
  StatusPill,
  TopBar,
  useAppColors,
  useSheet,
  go,
} from "@/components/app-ui";
import { RADIUS, SPACE } from "@/lib/design-system";
import { useAppStore } from "@/lib/store";
import { useThemeContext } from "@/lib/theme-provider";

export function OnboardingScreen({ step }: { step: number }) {
  const colors = useAppColors();
  const slides = [
    { eyebrow: "01 / ORIENT", title: "Your trip has context.", body: "ContextRoute AI helps you plan around purpose, pace, people and the conditions that matter to you.", icon: "compass-outline" as const },
    { eyebrow: "02 / PREPARE", title: "Make the route fit the moment.", body: "Choose who is traveling, what support is useful, and which trade-offs you want to make.", icon: "options-outline" as const },
    { eyebrow: "03 / NOTICE", title: "Keep uncertainty visible.", body: "When live map or route data is not connected, the app tells you instead of filling in the blanks.", icon: "eye-outline" as const },
    { eyebrow: "04 / BEGIN", title: "Plan around what matters.", body: "You can start with a destination, a context, or a question. Your local preferences stay on this device.", icon: "sparkles-outline" as const },
  ];
  const slide = slides[Math.min(Math.max(step - 1, 0), slides.length - 1)];
  const next = step < 4 ? () => go(`/onboarding/${step + 1}`) : () => go("/welcome");
  return <Screen scroll={false} contentStyle={styles.onboarding}>
    <View style={styles.onboardingTop}><StatusPill label={slide.eyebrow} tone="primary" /><Pressable onPress={() => go("/welcome")} accessibilityRole="button"><Text style={[styles.skip, { color: colors.muted }]}>Skip</Text></Pressable></View>
    <View style={[styles.illustration, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}><View style={[styles.orbit, styles.orbitOne, { borderColor: colors.accent }]} /><View style={[styles.orbit, styles.orbitTwo, { borderColor: colors.primary }]} /><View style={[styles.illustrationCore, { backgroundColor: colors.primary }]}><Ionicons name={slide.icon} size={46} color="#FFFFFF" /></View><View style={[styles.illustrationPin, { backgroundColor: colors.surface }]}><Ionicons name="location" size={20} color={colors.primary} /></View></View>
    <View style={styles.onboardingCopy}><Text style={[styles.onboardingTitle, { color: colors.foreground }]}>{slide.title}</Text><Text style={[styles.onboardingBody, { color: colors.muted }]}>{slide.body}</Text></View>
    <View style={styles.onboardingBottom}><View style={styles.progressRow}>{slides.map((_, index) => <View key={index} style={[styles.progressDot, { backgroundColor: index === step - 1 ? colors.primary : colors.border, width: index === step - 1 ? 28 : 8 }]} />)}</View><PrimaryButton label={step < 4 ? "Continue" : "Get started"} onPress={next} icon="arrow-forward" /></View>
  </Screen>;
}

export function WelcomeScreen() {
  const colors = useAppColors();
  return <Screen scroll={false} contentStyle={styles.centeredScreen}><View style={[styles.brandMark, { backgroundColor: colors.primary }]}><Ionicons name="navigate" size={42} color="#FFFFFF" /></View><ScreenHeading eyebrow="CONTEXTROUTE AI" title="A calmer way to plan a journey." body="Set a destination, add your context, and keep every unavailable signal honest." /><View style={styles.welcomeActions}><PrimaryButton label="Create a local profile" onPress={() => go("/auth/register")} icon="arrow-forward" /><SecondaryButton label="I already have a profile" onPress={() => go("/auth/login")} /><Pressable onPress={() => go("/")} accessibilityRole="button"><Text style={[styles.textLink, { color: colors.primary }]}>Explore the frontend first</Text></Pressable></View></Screen>;
}

export function LoginScreen() {
  const colors = useAppColors();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<{ email: string; password: string }>({ defaultValues: { email: "", password: "" } });
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  register("email"); register("password");
  const submit = (data: { email: string; password: string }) => { const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(data); setMessage(parsed.success ? "This is a frontend-only form. No authentication request was sent." : "Enter a valid email and a password with at least 6 characters."); };
  return <Screen><TopBar title="Sign in" subtitle="Frontend-only access" onBack={() => go("/welcome")} /><ScreenHeading title="Welcome back." body="Your account boundary is ready for a future authentication integration." /><View style={styles.form}><FormField label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(value) => { setEmail(value); setValue("email", value); }} error={errors.email?.message} /><FormField label="Password" placeholder="At least 6 characters" secureTextEntry value={password} onChangeText={(value) => { setPassword(value); setValue("password", value); }} error={errors.password?.message} /><Pressable onPress={() => go("/auth/forgot-password")}><Text style={[styles.textLink, { color: colors.primary }]}>Forgot password?</Text></Pressable><PrimaryButton label="Sign in" onPress={handleSubmit(submit)} /><NoticeBanner title="No remote authentication" body={message || "Submitting will only validate the fields locally."} icon="shield-checkmark-outline" /></View><Pressable onPress={() => go("/auth/register")}><Text style={[styles.centerLink, { color: colors.muted }]}>Need an account? <Text style={{ color: colors.primary, fontWeight: "700" }}>Create one</Text></Text></Pressable></Screen>;
}

export function RegisterScreen() {
  const { register, handleSubmit, setValue } = useForm<{ name: string; email: string; password: string }>({ defaultValues: { name: "", email: "", password: "" } });
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  register("name"); register("email"); register("password");
  const update = (key: "name" | "email" | "password", value: string) => { setValues((current) => ({ ...current, [key]: value })); setValue(key, value); };
  const submit = (data: { name: string; email: string; password: string }) => { const parsed = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) }).safeParse(data); setMessage(parsed.success ? "Profile fields are valid locally. No account was created." : "Add your name, a valid email, and a password with at least 6 characters."); };
  return <Screen><TopBar title="Create profile" subtitle="Local preferences only" onBack={() => go("/welcome")} /><ScreenHeading title="Start with your context." body="A local profile helps the interface remember your planning preferences on this device." /><View style={styles.form}><FormField label="Name" placeholder="Your name" value={values.name} onChangeText={(value) => update("name", value)} /><FormField label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={values.email} onChangeText={(value) => update("email", value)} /><FormField label="Password" placeholder="At least 6 characters" secureTextEntry value={values.password} onChangeText={(value) => update("password", value)} /><PrimaryButton label="Create local profile" onPress={handleSubmit(submit)} /><NoticeBanner title="Account integration pending" body={message || "This screen will not contact a backend or claim success."} icon="person-add-outline" /></View></Screen>;
}

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  return <Screen><TopBar title="Forgot password" onBack={() => go("/auth/login")} /><ScreenHeading title="Recover access later." body="The recovery channel is not connected yet, so no reset email will be sent." /><FormField label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} /><PrimaryButton label="Continue" onPress={() => {}} /><NoticeBanner title="Integration pending" body="Password recovery requires an authentication provider." tone="warning" icon="mail-outline" /><SecondaryButton label="Back to sign in" onPress={() => go("/auth/login")} /></Screen>;
}

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const colors = useAppColors();
  return <Screen><TopBar title="Destination search" onBack={() => go("/")} right={<Pressable onPress={() => go("/")}><Text style={[styles.textLink, { color: colors.primary }]}>Cancel</Text></Pressable>} /><SearchField value={query} onChangeText={setQuery} placeholder="Search for a destination" /><View style={styles.searchHint}><Ionicons name="time-outline" size={20} color={colors.primary} /><View style={styles.flexCopy}><Text style={[styles.rowTitle, { color: colors.foreground }]}>Search history</Text><Text style={[styles.rowBody, { color: colors.muted }]}>Nothing is stored until a real search source is connected.</Text></View></View><EmptyState icon="search-outline" title={query ? "No live results available" : "Start with a destination"} body={query ? "Search results require a connected places or map integration." : "Type a destination to see the honest unavailable state."} action={query ? "Open empty results" : undefined} onAction={() => go("/search-results")} /></Screen>;
}

export function SearchResultsScreen() {
  return <Screen><TopBar title="Search results" onBack={() => go("/search")} /><StatusPill label="NO DATA SOURCE" tone="warning" /><EmptyState icon="location-outline" title="Results are not available yet" body="This frontend does not invent places, addresses, distances or search matches. Connect a real source to populate this screen." action="Back to search" onAction={() => go("/search")} /><NoticeBanner title="Why this is empty" body="Search needs geocoding or Places access and a location permission policy." /></Screen>;
}

export function ContextScreen() {
  const selected = useAppStore((state) => state.selectedContext);
  const setContext = useAppStore((state) => state.setContext);
  const contexts = [{ id: "everyday", icon: "walk-outline" as const, title: "Everyday travel", body: "A balanced route for a regular trip." }, { id: "work", icon: "briefcase-outline" as const, title: "Work or appointment", body: "Arrive prepared and keep timing visible." }, { id: "group", icon: "people-outline" as const, title: "With a group", body: "Plan around different needs and comfort levels." }, { id: "care", icon: "heart-outline" as const, title: "Care and assistance", body: "Make support preferences part of the plan." }];
  return <Screen><TopBar title="Travel context" subtitle="Step 1 of 3" onBack={() => go("/")} /><ScreenHeading eyebrow="WHY ARE YOU TRAVELING?" title="What matters for this journey?" body="Choose the context that should shape a future route recommendation." /><View style={styles.stack}>{contexts.map((item) => <ChoiceCard key={item.id} icon={item.icon} title={item.title} body={item.body} selected={selected === item.id} onPress={() => setContext(item.id)} />)}</View><PrimaryButton label="Continue" disabled={!selected} onPress={() => go("/travelers")} /></Screen>;
}

export function TravelersScreen() {
  const colors = useAppColors();
  const count = useAppStore((state) => state.travelerCount);
  const setCount = useAppStore((state) => state.setTravelerCount);
  const [needs, setNeeds] = useState<string[]>([]);
  const toggle = (value: string) => setNeeds((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  return <Screen><TopBar title="Traveler details" subtitle="Step 2 of 3" onBack={() => go("/context")} /><ScreenHeading title="Who is traveling?" body="Keep the planning context specific without storing a cloud profile." /><View style={[styles.counterCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View><Text style={[styles.rowTitle, { color: colors.foreground }]}>Travelers</Text><Text style={[styles.rowBody, { color: colors.muted }]}>Include everyone in the plan.</Text></View><View style={styles.counter}><IconButton name="remove" label="Remove traveler" onPress={() => setCount(Math.max(1, count - 1))} /><Text style={[styles.counterValue, { color: colors.foreground }]}>{count}</Text><IconButton name="add" label="Add traveler" onPress={() => setCount(Math.min(12, count + 1))} /></View></View><SectionTitle title="Assistance preferences" /><View style={styles.stack}>{[{ id: "step-free", title: "Step-free access", body: "Surface as a future route preference.", icon: "accessibility-outline" as const }, { id: "low-stress", title: "Lower-stress choices", body: "Avoid rushed or complex transfers when data is available.", icon: "leaf-outline" as const }, { id: "careful-crossings", title: "Extra crossing care", body: "Keep crossing comfort visible to the planner.", icon: "shield-outline" as const }].map((item) => <ChoiceCard key={item.id} icon={item.icon} title={item.title} body={item.body} selected={needs.includes(item.id)} onPress={() => toggle(item.id)} />)}</View><PrimaryButton label="Continue" onPress={() => go("/preferences")} /></Screen>;
}

export function PreferencesScreen() {
  const selectedModes = useAppStore((state) => state.selectedModes);
  const toggleMode = useAppStore((state) => state.toggleMode);
  const modes = [{ id: "walk", icon: "walk-outline" as const, title: "Walking", body: "Keep the route human-scale." }, { id: "transit", icon: "train-outline" as const, title: "Public transport", body: "Compare available transit options later." }, { id: "drive", icon: "car-outline" as const, title: "Driving", body: "Keep vehicle context available." }];
  return <Screen><TopBar title="Route preferences" subtitle="Step 3 of 3" onBack={() => go("/travelers")} /><ScreenHeading title="How should the route feel?" body="Select one or more priorities for a future route calculation." /><View style={styles.stack}>{modes.map((item) => <ChoiceCard key={item.id} icon={item.icon} title={item.title} body={item.body} selected={selectedModes.includes(item.id)} onPress={() => toggleMode(item.id)} />)}</View><NoticeBanner title="No route engine connected" body="Your choices are saved locally. Distance, ETA and safety details remain unavailable." /><PrimaryButton label="See route alternatives" onPress={() => go("/routes")} /></Screen>;
}

export function RoutesScreen() {
  const [selected, setSelected] = useState(0);
  return <Screen><TopBar title="Route alternatives" onBack={() => go("/preferences")} right={<StatusPill label="3 MAX" tone="primary" />} /><MapPlaceholder compact /><ScreenHeading title="Your options will appear here." body="The layout is ready for up to three route alternatives. No route result is fabricated." /><View style={styles.stack}>{["Context-aware route", "Lower-stress route", "Flexible route"].map((title, index) => <RouteCard key={title} title={title} body="Distance and arrival estimate unavailable" selected={selected === index} unavailable onPress={() => setSelected(index)} />)}</View><PrimaryButton label="Open route details" onPress={() => go("/route-details")} /></Screen>;
}

export function RouteDetailsScreen() {
  const colors = useAppColors();
  return <Screen><TopBar title="Route details" onBack={() => go("/routes")} /><MapPlaceholder compact><View style={styles.routePin}><Ionicons name="navigate" size={18} color="#FFFFFF" /></View></MapPlaceholder><View style={styles.detailHero}><StatusPill label="ROUTE DATA PENDING" tone="warning" /><Text style={[styles.detailTitle, { color: colors.foreground }]}>A route summary shell</Text><Text style={[styles.rowBody, { color: colors.muted }]}>Live geometry, travel time, hazards and accessibility facts will fill this panel after a routing integration is connected.</Text></View><View style={[styles.detailGrid, { backgroundColor: colors.surface, borderColor: colors.border }]}>{[["Distance", "Not available"], ["Arrival", "Not available"], ["Conditions", "Integration pending"], ["Safety", "Not scored"]].map(([label, value]) => <View key={label} style={styles.detailCell}><Text style={[styles.cellLabel, { color: colors.muted }]}>{label}</Text><Text style={[styles.cellValue, { color: colors.foreground }]}>{value}</Text></View>)}</View><PrimaryButton label="Open navigation shell" onPress={() => go("/navigation")} /></Screen>;
}

export function NavigationScreen() {
  const colors = useAppColors();
  return <Screen scroll={false} contentStyle={styles.navScreen}><TopBar title="Navigation" onBack={() => go("/route-details")} right={<StatusPill label="OFFLINE" tone="warning" />} /><MapPlaceholder><View style={[styles.navBanner, { backgroundColor: colors.surface }]}><Ionicons name="navigate-outline" size={20} color={colors.primary} /><View style={styles.flexCopy}><Text style={[styles.rowTitle, { color: colors.foreground }]}>Turn-by-turn guidance is unavailable</Text><Text style={[styles.rowBody, { color: colors.muted }]}>Live GPS and route instructions need a genuine navigation integration.</Text></View></View></MapPlaceholder><PermissionCard title="Location permission required" body="This preview does not request or infer your location. A future device flow can explain permission before starting navigation." action="Review explanation" onAction={() => {}} /><BottomNav active="home" /></Screen>;
}

export function ExploreScreen() {
  const colors = useAppColors();
  return <View style={[styles.page, { backgroundColor: colors.background }]}><Screen contentStyle={styles.exploreContent}><View style={styles.exploreTop}><ScreenHeading eyebrow="DISCOVER" title="Explore with context." body="A place becomes useful when its details are real, current and relevant to you." /><IconButton name="notifications-outline" label="Notifications" onPress={() => go("/notifications")} /></View><SearchField placeholder="Search places or experiences" onPress={() => go("/nearby")} editable={false} /><SectionTitle title="Explore pathways" /><View style={styles.stack}><ChoiceCard icon="map-outline" title="Nearby places" body="Requires location and places data." onPress={() => go("/nearby")} /><ChoiceCard icon="trail-sign-outline" title="Tourism details" body="Open a structured detail shell." onPress={() => go("/tourism-details")} /><ChoiceCard icon="bookmark-outline" title="Saved locally" body="Review items stored only on this device." onPress={() => go("/saved")} /></View><NoticeBanner title="Discovery data is not connected" body="No businesses, attractions, ratings or opening hours are invented in this frontend." /></Screen><BottomNav active="explore" /></View>;
}

export function NearbyScreen() {
  return <Screen><TopBar title="Nearby places" onBack={() => go("/explore")} /><PermissionCard title="Location permission required" body="Nearby discovery cannot start until the device grants location access and a real Places source is configured." /><EmptyState icon="location-outline" title="No nearby results" body="This empty state is intentional. It prevents fabricated place names, distances, ratings and opening hours." /><SecondaryButton label="Open tourism detail shell" onPress={() => go("/tourism-details")} /></Screen>;
}

export function TourismDetailsScreen() {
  const colors = useAppColors();
  const saveItem = useAppStore((state) => state.saveItem);
  return <Screen><TopBar title="Tourism details" onBack={() => go("/nearby")} right={<IconButton name="bookmark-outline" label="Save locally" onPress={() => saveItem({ id: "pending-place", title: "Pending place detail", kind: "place", localOnly: true })} />} /><View style={[styles.detailCover, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}><Ionicons name="image-outline" size={34} color={colors.primary} /><Text style={[styles.detailCoverText, { color: colors.foreground }]}>Place image integration pending</Text></View><ScreenHeading eyebrow="DETAIL SHELL" title="A tourism page without invented facts." body="Name, photo, hours, reviews, access notes and distance will be sourced here when a real provider is connected." /><View style={styles.stack}><NoticeBanner title="No place selected" body="Open this screen from a real search result to populate verified details." /><ListRow icon="information-circle-outline" title="About this place" body="Not available" /><ListRow icon="time-outline" title="Hours and availability" body="Not available" /><ListRow icon="accessibility-outline" title="Accessibility" body="Not available" /></View></Screen>;
}

export function SavedScreen() {
  const items = useAppStore((state) => state.savedItems);
  return <Screen><TopBar title="Saved places & routes" onBack={() => go("/profile")} /><StatusPill label="LOCAL ONLY" tone="primary" />{items.length ? <View style={styles.stack}>{items.map((item) => <ListRow key={item.id} icon={item.kind === "place" ? "location-outline" : "git-branch-outline"} title={item.title} body="Stored on this device · not synced" />)}</View> : <EmptyState icon="bookmark-outline" title="Nothing saved yet" body="Saved items will be clearly marked as local-only. Cloud sync is not connected." action="Explore details" onAction={() => go("/explore")} />}<NoticeBanner title="Local persistence only" body="This screen reads from device storage and does not represent a server account." /></Screen>;
}

const reportSchema = z.object({ category: z.string().min(1), description: z.string().min(10, "Add at least 10 characters so the report is useful.") });
type ReportForm = z.infer<typeof reportSchema>;

export function ReportScreen() {
  const colors = useAppColors();
  const submitLocalReport = useAppStore((state) => state.submitLocalReport);
  const { register, setValue, handleSubmit } = useForm<ReportForm>({ defaultValues: { category: "", description: "" } });
  const [error, setError] = useState("");
  const [values, setValues] = useState<ReportForm>({ category: "", description: "" });
  register("category"); register("description");
  const update = (key: keyof ReportForm, value: string) => { setValues((current) => ({ ...current, [key]: value })); setValue(key, value); };
  const submit = (data: ReportForm) => { const parsed = reportSchema.safeParse(data); if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check the form."); return; } setError(""); submitLocalReport(); go("/report-status"); };
  return <Screen><TopBar title="Report a hazard" onBack={() => go("/")} /><ScreenHeading eyebrow="COMMUNITY SIGNAL" title="What should others know?" body="This report is local-only until a genuine reporting service is connected." /><SectionTitle title="Category" /><View style={styles.chipWrap}>{["Road condition", "Crossing", "Lighting", "Other"].map((item) => <Pressable key={item} onPress={() => update("category", item)} style={[styles.chip, { backgroundColor: values.category === item ? colors.primary : colors.surface, borderColor: values.category === item ? colors.primary : colors.border }]}><Text style={[styles.chipText, { color: values.category === item ? "#FFFFFF" : colors.foreground }]}>{item}</Text></Pressable>)}</View><FormField label="Description" placeholder="Describe the concern" multiline numberOfLines={5} value={values.description} onChangeText={(value) => update("description", value)} hint="Avoid personal information. Add only what you can verify." /><NoticeBanner title="No cloud submission" body="Submitting stores a local pending report. It does not notify moderators or emergency services." icon="cloud-offline-outline" />{error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}<PrimaryButton label="Save report locally" onPress={handleSubmit(submit)} /></Screen>;
}

export function ReportStatusScreen() {
  const status = useAppStore((state) => state.reportStatus);
  return <Screen><TopBar title="Report status" onBack={() => go("/profile")} /><StatusPill label={status === "submitted-locally" ? "SUBMITTED LOCALLY" : "NO REPORT"} tone={status === "submitted-locally" ? "success" : "default"} /><EmptyState icon="checkmark-circle-outline" title={status === "submitted-locally" ? "Pending integration" : "Nothing submitted"} body={status === "submitted-locally" ? "Your report is stored on this device. No moderation or verification outcome has been claimed." : "Create a report to see its honest local status."} action="Report a hazard" onAction={() => go("/report")} /><NoticeBanner title="Status boundary" body="A future backend can replace this local status with a verified submission state." /></Screen>;
}

export function EmergencyScreen() {
  const colors = useAppColors();
  const call = () => { void Linking.openURL("tel:112"); };
  return <Screen><TopBar title="Emergency assistance" onBack={() => go("/profile")} /><ScreenHeading eyebrow="SAFETY FIRST" title="Get help from your device." body="This frontend does not notify a control room. Use the device action only if you understand the number and your region supports it." /><View style={[styles.emergencyCard, { backgroundColor: "#FFF0EE", borderColor: "#FFD0C9" }]}><Ionicons name="warning-outline" size={28} color={colors.error} /><Text style={[styles.emergencyTitle, { color: colors.error }]}>Emergency services are not connected</Text><Text style={[styles.emergencyBody, { color: colors.foreground }]}>The action below opens your device dialer when supported. It does not send a silent alert from the app.</Text><Pressable onPress={call} style={({ pressed }) => [styles.emergencyButton, { backgroundColor: colors.error, opacity: pressed ? 0.8 : 1 }]}><Ionicons name="call-outline" size={19} color="#FFFFFF" /><Text style={styles.emergencyButtonText}>Open device dialer</Text></Pressable></View><PermissionCard title="Prepare a safety plan" body="A future integration can surface verified local emergency guidance after location and region are known." action="Read limitation" onAction={() => {}} /></Screen>;
}

export function NotificationsScreen() {
  return <Screen><TopBar title="Notifications" onBack={() => go("/")} /><EmptyState icon="notifications-off-outline" title="No notifications" body="Emergency alerts, system updates and route changes are not generated without a connected data source." /><NoticeBanner title="Nothing to action" body="You are not missing an alert in this frontend-only preview." /></Screen>;
}

export function ProfileScreen() {
  const colors = useAppColors();
  return <View style={[styles.page, { backgroundColor: colors.background }]}><Screen contentStyle={styles.profileContent}><View style={styles.profileHeader}><View style={[styles.avatar, { backgroundColor: colors.primary }]}><Text style={styles.avatarText}>CR</Text></View><View style={styles.flexCopy}><Text style={[styles.profileName, { color: colors.foreground }]}>Local traveler</Text><Text style={[styles.rowBody, { color: colors.muted }]}>No remote account connected</Text></View><IconButton name="settings-outline" label="Settings" onPress={() => go("/settings")} /></View><StatusPill label="LOCAL PROFILE" tone="primary" /><SectionTitle title="Your planning space" /><View style={styles.stack}><ListRow icon="bookmark-outline" title="Saved places & routes" body="Stored on this device" onPress={() => go("/saved")} /><ListRow icon="flag-outline" title="Hazard reporting" body="Save a local report" onPress={() => go("/report")} /><ListRow icon="pulse-outline" title="Report status" body="See local submission state" onPress={() => go("/report-status")} /><ListRow icon="shield-checkmark-outline" title="Emergency assistance" body="Review supported device action" onPress={() => go("/emergency")} /><ListRow icon="notifications-outline" title="Notifications" body="Honest empty state" onPress={() => go("/notifications")} /></View><NoticeBanner title="Account sync is disconnected" body="Your preferences are local. Nothing here claims remote profile management." /></Screen><BottomNav active="profile" /></View>;
}

export function SettingsScreen() {
  const colors = useAppColors();
  const { colorScheme, setColorScheme } = useThemeContext();
  const sheet = useSheet();
  const [language, setLanguage] = useState("English");
  return <Screen><TopBar title="Settings / Help / About" onBack={() => go("/profile")} /><SectionTitle title="Preferences" /><View style={styles.stack}><ListRow icon="contrast-outline" title="Theme" body={colorScheme === "dark" ? "Dark" : "Light"} onPress={sheet.open} /><ListRow icon="language-outline" title="Language" body={language} onPress={() => setLanguage(language === "English" ? "System default" : "English")} /><ListRow icon="lock-closed-outline" title="Privacy boundary" body="Frontend-only, local state" /></View><SectionTitle title="Help" /><View style={styles.stack}><ListRow icon="help-circle-outline" title="How ContextRoute works" body="Plan, context, verify" /><ListRow icon="document-text-outline" title="Known limitations" body="What is not connected yet" /></View><SectionTitle title="About" /><NoticeBanner title="ContextRoute AI" body="Context-aware route recommendation interface. Backend integrations will be handled separately." /><Text style={[styles.version, { color: colors.muted }]}>Version 1.0.0 · Frontend preview</Text><ModalSheet visible={sheet.visible} title="Choose theme" onClose={sheet.close}><SegmentedControl options={["Light", "Dark"]} value={colorScheme === "dark" ? "Dark" : "Light"} onChange={(value) => { setColorScheme(value === "Dark" ? "dark" : "light"); sheet.close(); }} /><Text style={[styles.sheetNote, { color: colors.muted }]}>This preference is stored locally on the device.</Text></ModalSheet></Screen>;
}

const styles = StyleSheet.create({
  page: { flex: 1 }, flexCopy: { flex: 1 }, stack: { gap: SPACE.md }, form: { gap: SPACE.lg }, centeredScreen: { justifyContent: "center", paddingVertical: SPACE.xxxl }, brandMark: { width: 82, height: 82, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: SPACE.xl }, welcomeActions: { gap: SPACE.md, marginTop: SPACE.xl }, textLink: { fontSize: 14, fontWeight: "700" }, centerLink: { textAlign: "center", fontSize: 14 }, onboarding: { justifyContent: "space-between", paddingTop: SPACE.xl }, onboardingTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, skip: { fontSize: 13, fontWeight: "700" }, illustration: { height: 320, borderRadius: RADIUS.xl, borderWidth: 1, alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }, orbit: { position: "absolute", borderWidth: 2, borderRadius: 180 }, orbitOne: { width: 270, height: 170, transform: [{ rotate: "-22deg" }] }, orbitTwo: { width: 180, height: 270, transform: [{ rotate: "26deg" }] }, illustrationCore: { width: 104, height: 104, borderRadius: 36, alignItems: "center", justifyContent: "center", shadowColor: "#0B3B91", shadowOpacity: 0.22, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 6 }, illustrationPin: { position: "absolute", top: 62, right: 50, width: 46, height: 46, borderRadius: 17, alignItems: "center", justifyContent: "center" }, onboardingCopy: { gap: SPACE.md }, onboardingTitle: { fontSize: 31, lineHeight: 37, fontWeight: "700", letterSpacing: -0.6 }, onboardingBody: { fontSize: 16, lineHeight: 24 }, onboardingBottom: { gap: SPACE.lg }, progressRow: { flexDirection: "row", gap: 6, alignItems: "center" }, progressDot: { height: 8, borderRadius: 4 }, searchHint: { flexDirection: "row", gap: SPACE.md, alignItems: "center", padding: SPACE.lg, borderRadius: RADIUS.lg }, rowTitle: { fontSize: 15, fontWeight: "700" }, rowBody: { fontSize: 13, lineHeight: 19 }, counterCard: { borderRadius: RADIUS.lg, borderWidth: 1, padding: SPACE.lg, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, counter: { flexDirection: "row", alignItems: "center", gap: SPACE.sm }, counterValue: { fontSize: 18, fontWeight: "700", minWidth: 22, textAlign: "center" }, routePin: { position: "absolute", left: "46%", top: "44%", width: 38, height: 38, borderRadius: 14, backgroundColor: "#175CD3", alignItems: "center", justifyContent: "center" }, detailHero: { gap: SPACE.md }, detailTitle: { fontSize: 22, lineHeight: 28, fontWeight: "700" }, detailGrid: { borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md, flexDirection: "row", flexWrap: "wrap" }, detailCell: { width: "50%", padding: SPACE.md, gap: 4 }, cellLabel: { fontSize: 12 }, cellValue: { fontSize: 14, fontWeight: "700" }, navScreen: { paddingBottom: 0 }, navBanner: { position: "absolute", left: SPACE.lg, right: SPACE.lg, bottom: SPACE.lg, borderRadius: RADIUS.lg, padding: SPACE.lg, flexDirection: "row", gap: SPACE.md, shadowColor: "#09224A", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 4 }, exploreContent: { paddingTop: SPACE.xl }, exploreTop: { flexDirection: "row", alignItems: "flex-start", gap: SPACE.lg }, profileContent: { paddingTop: SPACE.xl }, profileHeader: { flexDirection: "row", alignItems: "center", gap: SPACE.md }, avatar: { width: 58, height: 58, borderRadius: 22, alignItems: "center", justifyContent: "center" }, avatarText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" }, profileName: { fontSize: 21, fontWeight: "700" }, detailCover: { minHeight: 170, borderRadius: RADIUS.xl, borderWidth: 1, alignItems: "center", justifyContent: "center", gap: SPACE.sm }, detailCoverText: { fontSize: 13, fontWeight: "700" }, chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }, chip: { borderWidth: 1, minHeight: 40, borderRadius: RADIUS.pill, paddingHorizontal: SPACE.lg, alignItems: "center", justifyContent: "center" }, chipText: { fontSize: 13, fontWeight: "700" }, errorText: { fontSize: 13, fontWeight: "700" }, emergencyCard: { borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.xl, gap: SPACE.md }, emergencyTitle: { fontSize: 18, fontWeight: "700" }, emergencyBody: { fontSize: 14, lineHeight: 21 }, emergencyButton: { minHeight: 50, borderRadius: RADIUS.pill, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SPACE.sm }, emergencyButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" }, version: { textAlign: "center", fontSize: 12 }, sheetNote: { textAlign: "center", fontSize: 13 },
});
