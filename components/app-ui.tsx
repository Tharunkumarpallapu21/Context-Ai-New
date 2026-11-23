import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_COLORS, RADIUS, SPACE } from "@/lib/design-system";
import { useThemeContext } from "@/lib/theme-provider";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
type Tone = "default" | "primary" | "success" | "warning" | "error";

export function go(path: string) {
  router.push(path as Href);
}

export function useAppColors() {
  const { colorScheme } = useThemeContext();
  return APP_COLORS[colorScheme];
}

export function Screen({ children, scroll = true, style, contentStyle }: PropsWithChildren<{ scroll?: boolean; style?: StyleProp<ViewStyle>; contentStyle?: StyleProp<ViewStyle> }>) {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const body = scroll ? (
    <ScrollView style={styles.flex} contentContainerStyle={[styles.screenContent, { paddingBottom: Math.max(insets.bottom + 24, 32) }, contentStyle]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : <View style={[styles.flex, styles.screenContent, { paddingBottom: Math.max(insets.bottom + 24, 32) }, contentStyle]}>{children}</View>;
  return <View style={[styles.flex, { backgroundColor: colors.background }, style]}>{body}</View>;
}

export function TopBar({ title, subtitle, onBack, right, transparent = false }: { title: string; subtitle?: string; onBack?: () => void; right?: ReactNode; transparent?: boolean }) {
  const colors = useAppColors();
  return (
    <View style={[styles.topBar, transparent && styles.topBarTransparent]}>
      <View style={styles.topBarLeft}>
        {onBack ? <IconButton name="arrow-back" label="Go back" onPress={onBack} variant="ghost" /> : null}
        <View style={styles.topBarCopy}>
          <Text style={[styles.topBarTitle, { color: colors.foreground }]}>{title}</Text>
          {subtitle ? <Text style={[styles.topBarSubtitle, { color: colors.muted }]}>{subtitle}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}

export function AppIcon({ name, size = 22, color, background, label }: { name: IconName; size?: number; color?: string; background?: string; label?: string }) {
  const colors = useAppColors();
  return (
    <View style={[styles.iconWrap, background ? { backgroundColor: background } : null]}>
      <Ionicons name={name} size={size} color={color ?? colors.primary} accessibilityLabel={label} />
    </View>
  );
}

export function IconButton({ name, label, onPress, variant = "surface", disabled = false }: { name: IconName; label: string; onPress?: () => void; variant?: "surface" | "ghost" | "primary"; disabled?: boolean }) {
  const colors = useAppColors();
  const backgroundColor = variant === "primary" ? colors.primary : variant === "surface" ? colors.surface : "transparent";
  const tint = variant === "primary" ? "#FFFFFF" : colors.foreground;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.iconButton, { backgroundColor, borderColor: variant === "ghost" ? "transparent" : colors.border, opacity: disabled ? 0.45 : pressed ? 0.68 : 1 }]}>
      <Ionicons name={name} size={20} color={tint} />
    </Pressable>
  );
}

export function PrimaryButton({ label, onPress, icon, loading = false, disabled = false }: { label: string; onPress?: () => void; icon?: IconName; loading?: boolean; disabled?: boolean }) {
  const colors = useAppColors();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, opacity: disabled ? 0.45 : pressed ? 0.82 : 1 }]}>
      {loading ? <ActivityIndicator color="#FFFFFF" /> : icon ? <Ionicons name={icon} size={18} color="#FFFFFF" /> : null}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress, icon, disabled = false }: { label: string; onPress?: () => void; icon?: IconName; disabled?: boolean }) {
  const colors = useAppColors();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border, opacity: disabled ? 0.45 : pressed ? 0.72 : 1 }]}>
      {icon ? <Ionicons name={icon} size={18} color={colors.primary} /> : null}
      <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

export function SearchField({ value, onChangeText, placeholder = "Search destination or place", onPress, editable = true }: { value?: string; onChangeText?: (text: string) => void; placeholder?: string; onPress?: () => void; editable?: boolean }) {
  const colors = useAppColors();
  return (
    <Pressable onPress={onPress} disabled={editable || !onPress} style={[styles.searchField, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name="search" size={20} color={colors.primary} />
      <TextInput accessibilityLabel={placeholder} editable={editable} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} style={[styles.searchInput, { color: colors.foreground }]} returnKeyType="search" />
      {value ? <Ionicons name="close-circle" size={18} color={colors.muted} /> : null}
    </Pressable>
  );
}

export function FormField({ label, hint, error, ...props }: { label: string; hint?: string; error?: string } & TextInputProps) {
  const colors = useAppColors();
  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.fieldLabel, { color: colors.foreground }]}>{label}</Text>
      <TextInput accessibilityLabel={label} {...props} placeholderTextColor={colors.muted} style={[styles.textInput, { backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border, color: colors.foreground }]} />
      {error ? <Text style={[styles.helper, { color: colors.error }]}>{error}</Text> : hint ? <Text style={[styles.helper, { color: colors.muted }]}>{hint}</Text> : null}
    </View>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useAppColors();
  return <View style={styles.sectionTitle}><Text style={[styles.sectionTitleText, { color: colors.foreground }]}>{title}</Text>{action ? <Pressable onPress={onAction} accessibilityRole="button"><Text style={[styles.sectionAction, { color: colors.primary }]}>{action}</Text></Pressable> : null}</View>;
}

export function StatusPill({ label, tone = "default" }: { label: string; tone?: Tone }) {
  const colors = useAppColors();
  const toneColors = { default: [colors.surfaceAlt, colors.primary], primary: [colors.surfaceAlt, colors.primary], success: ["#EAF8EF", colors.success], warning: ["#FFF5E6", colors.warning], error: ["#FFF0EE", colors.error] } as const;
  const [bg, fg] = toneColors[tone];
  return <View style={[styles.statusPill, { backgroundColor: bg }]}><View style={[styles.statusDot, { backgroundColor: fg }]} /><Text style={[styles.statusText, { color: fg }]}>{label}</Text></View>;
}

export function NoticeBanner({ title, body, tone = "default", icon = "information-circle-outline" }: { title: string; body: string; tone?: Tone; icon?: IconName }) {
  const colors = useAppColors();
  const tint = tone === "warning" ? colors.warning : tone === "error" ? colors.error : tone === "success" ? colors.success : colors.primary;
  return <View style={[styles.notice, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}><Ionicons name={icon} size={20} color={tint} /><View style={styles.noticeCopy}><Text style={[styles.noticeTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.noticeBody, { color: colors.muted }]}>{body}</Text></View></View>;
}

export function ChoiceCard({ icon, title, body, selected, onPress, badge }: { icon: IconName; title: string; body: string; selected?: boolean; onPress?: () => void; badge?: string }) {
  const colors = useAppColors();
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.choiceCard, { backgroundColor: selected ? colors.surfaceAlt : colors.surface, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}><AppIcon name={icon} background={selected ? colors.surface : colors.surfaceAlt} /><View style={styles.choiceCopy}><View style={styles.choiceTitleRow}><Text style={[styles.choiceTitle, { color: colors.foreground }]}>{title}</Text>{badge ? <StatusPill label={badge} tone="primary" /> : null}</View><Text style={[styles.choiceBody, { color: colors.muted }]}>{body}</Text></View>{selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : <Ionicons name="chevron-forward" size={18} color={colors.muted} />}</Pressable>;
}

export function ListRow({ icon, title, body, onPress, right, destructive = false }: { icon: IconName; title: string; body?: string; onPress?: () => void; right?: ReactNode; destructive?: boolean }) {
  const colors = useAppColors();
  return <Pressable accessibilityRole={onPress ? "button" : undefined} onPress={onPress} style={({ pressed }) => [styles.listRow, { borderBottomColor: colors.border, opacity: pressed ? 0.72 : 1 }]}><AppIcon name={icon} background={destructive ? "#FFF0EE" : colors.surfaceAlt} color={destructive ? colors.error : colors.primary} /><View style={styles.listRowCopy}><Text style={[styles.listRowTitle, { color: destructive ? colors.error : colors.foreground }]}>{title}</Text>{body ? <Text style={[styles.listRowBody, { color: colors.muted }]}>{body}</Text> : null}</View>{right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.muted} /> : null)}</Pressable>;
}

export function EmptyState({ icon = "layers-outline", title, body, action, onAction }: { icon?: IconName; title: string; body: string; action?: string; onAction?: () => void }) {
  const colors = useAppColors();
  return <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}><AppIcon name={icon} size={28} background={colors.surfaceAlt} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.emptyBody, { color: colors.muted }]}>{body}</Text>{action ? <SecondaryButton label={action} onPress={onAction} /> : null}</View>;
}

export function PermissionCard({ title, body, action = "Check permissions", onAction }: { title: string; body: string; action?: string; onAction?: () => void }) {
  const colors = useAppColors();
  return <View style={[styles.permissionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={[styles.permissionIcon, { backgroundColor: "#FFF5E6" }]}><Ionicons name="navigate" size={20} color={colors.warning} /></View><View style={styles.permissionCopy}><Text style={[styles.permissionTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.permissionBody, { color: colors.muted }]}>{body}</Text><Pressable onPress={onAction} accessibilityRole="button"><Text style={[styles.permissionAction, { color: colors.primary }]}>{action}</Text></Pressable></View></View>;
}

export function MapPlaceholder({ compact = false, children }: PropsWithChildren<{ compact?: boolean }>) {
  const colors = useAppColors();
  return <View style={[styles.map, compact && styles.mapCompact, { backgroundColor: colors.map, borderColor: colors.border }]} accessibilityLabel="Map integration pending">
    <View style={[styles.waterShape, { backgroundColor: colors.mapWater }]} />
    <View style={[styles.contour, styles.contourOne, { borderColor: colors.mapLine }]} />
    <View style={[styles.contour, styles.contourTwo, { borderColor: colors.mapLine }]} />
    <View style={[styles.street, styles.streetA, { backgroundColor: colors.mapLine }]} />
    <View style={[styles.street, styles.streetB, { backgroundColor: colors.mapLine }]} />
    <View style={[styles.mapTag, { backgroundColor: colors.surface }]}><Ionicons name="map-outline" size={16} color={colors.primary} /><Text style={[styles.mapTagText, { color: colors.foreground }]}>Map integration pending</Text></View>
    {children}
  </View>;
}

export function BottomNav({ active }: { active: "home" | "explore" | "profile" }) {
  const colors = useAppColors();
  const items = [{ key: "home", label: "Home", icon: "home-outline" as IconName, activeIcon: "home" as IconName, path: "/" }, { key: "explore", label: "Explore", icon: "compass-outline" as IconName, activeIcon: "compass" as IconName, path: "/explore" }, { key: "profile", label: "Profile", icon: "person-outline" as IconName, activeIcon: "person" as IconName, path: "/profile" }];
  return <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>{items.map((item) => { const selected = item.key === active; return <Pressable key={item.key} onPress={() => go(item.path)} accessibilityRole="tab" accessibilityState={{ selected }} accessibilityLabel={item.label} style={styles.navItem}><View style={[styles.navIconWrap, selected && { backgroundColor: colors.surfaceAlt }]}><Ionicons name={selected ? item.activeIcon : item.icon} size={21} color={selected ? colors.primary : colors.muted} /></View><Text style={[styles.navLabel, { color: selected ? colors.primary : colors.muted }]}>{item.label}</Text></Pressable>; })}</View>;
}

export function RouteCard({ title, body, selected, unavailable, onPress }: { title: string; body: string; selected?: boolean; unavailable?: boolean; onPress?: () => void }) {
  const colors = useAppColors();
  return <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.routeCard, { backgroundColor: selected ? colors.surfaceAlt : colors.surface, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.76 : 1 }]}><View style={[styles.routeBadge, { backgroundColor: selected ? colors.primary : colors.surfaceAlt }]}><Ionicons name="git-branch-outline" size={18} color={selected ? "#FFFFFF" : colors.primary} /></View><View style={styles.routeCopy}><Text style={[styles.routeTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.routeBody, { color: colors.muted }]}>{body}</Text>{unavailable ? <StatusPill label="Requires routing data" tone="warning" /> : null}</View>{selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : <Ionicons name="chevron-forward" size={18} color={colors.muted} />}</Pressable>;
}

export function ModalSheet({ visible, title, onClose, children }: PropsWithChildren<{ visible: boolean; title: string; onClose: () => void }>) {
  const colors = useAppColors();
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={styles.modalBackdrop}><View style={[styles.sheet, { backgroundColor: colors.surface }]}><View style={styles.sheetHandle} accessibilityLabel="Resize sheet" /><View style={styles.sheetHeader}><Text style={[styles.sheetTitle, { color: colors.foreground }]}>{title}</Text><IconButton name="close" label="Close" onPress={onClose} variant="ghost" /></View>{children}</View></View></Modal>;
}

export function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  const colors = useAppColors();
  return <View style={[styles.segmented, { backgroundColor: colors.surfaceAlt }]}>{options.map((option) => <Pressable key={option} onPress={() => onChange(option)} accessibilityRole="button" style={[styles.segment, option === value && { backgroundColor: colors.surface }]}><Text style={[styles.segmentText, { color: option === value ? colors.primary : colors.muted }]}>{option}</Text></Pressable>)}</View>;
}

export function ScreenHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  const colors = useAppColors();
  return <View style={styles.heading}><View style={styles.headingTop}>{eyebrow ? <StatusPill label={eyebrow} tone="primary" /> : null}</View><Text style={[styles.headingTitle, { color: colors.foreground }]}>{title}</Text>{body ? <Text style={[styles.headingBody, { color: colors.muted }]}>{body}</Text> : null}</View>;
}

export function useSheet() {
  const [visible, setVisible] = useState(false);
  return useMemo(() => ({ visible, open: () => setVisible(true), close: () => setVisible(false) }), [visible]);
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screenContent: { paddingHorizontal: SPACE.lg, paddingTop: SPACE.lg, gap: SPACE.lg },
  topBar: { minHeight: 64, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SPACE.md },
  topBarTransparent: { backgroundColor: "transparent" },
  topBarLeft: { flexDirection: "row", alignItems: "center", gap: SPACE.sm, flex: 1 },
  topBarCopy: { flex: 1 },
  topBarTitle: { fontSize: 18, lineHeight: 24, fontWeight: "700" },
  topBarSubtitle: { fontSize: 12, lineHeight: 16, marginTop: 2 },
  iconWrap: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  iconButton: { minWidth: 44, minHeight: 44, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  primaryButton: { minHeight: 52, paddingHorizontal: SPACE.xl, borderRadius: RADIUS.pill, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: SPACE.sm },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  secondaryButton: { minHeight: 50, paddingHorizontal: SPACE.xl, borderRadius: RADIUS.pill, borderWidth: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: SPACE.sm },
  secondaryButtonText: { fontSize: 15, fontWeight: "700" },
  searchField: { minHeight: 56, borderRadius: RADIUS.lg, borderWidth: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: SPACE.lg, gap: SPACE.sm },
  searchInput: { flex: 1, minHeight: 50, fontSize: 15 },
  fieldGroup: { gap: SPACE.sm },
  fieldLabel: { fontSize: 13, fontWeight: "700" },
  textInput: { minHeight: 52, borderRadius: RADIUS.md, borderWidth: 1, paddingHorizontal: SPACE.lg, fontSize: 15 },
  helper: { fontSize: 12, lineHeight: 16 },
  sectionTitle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: SPACE.sm },
  sectionTitleText: { fontSize: 18, lineHeight: 24, fontWeight: "700" },
  sectionAction: { fontSize: 13, fontWeight: "700" },
  statusPill: { alignSelf: "flex-start", minHeight: 26, borderRadius: RADIUS.pill, paddingHorizontal: SPACE.sm, flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  notice: { borderRadius: RADIUS.md, borderWidth: 1, padding: SPACE.lg, flexDirection: "row", gap: SPACE.md },
  noticeCopy: { flex: 1, gap: 4 },
  noticeTitle: { fontSize: 14, fontWeight: "700" },
  noticeBody: { fontSize: 13, lineHeight: 19 },
  choiceCard: { borderRadius: RADIUS.lg, borderWidth: 1, padding: SPACE.lg, flexDirection: "row", alignItems: "center", gap: SPACE.md },
  choiceCopy: { flex: 1, gap: 4 },
  choiceTitleRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm },
  choiceTitle: { fontSize: 15, fontWeight: "700", flexShrink: 1 },
  choiceBody: { fontSize: 13, lineHeight: 18 },
  listRow: { minHeight: 68, paddingVertical: SPACE.md, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", gap: SPACE.md },
  listRowCopy: { flex: 1, gap: 4 },
  listRowTitle: { fontSize: 15, fontWeight: "700" },
  listRowBody: { fontSize: 13, lineHeight: 18 },
  emptyState: { borderRadius: RADIUS.lg, borderWidth: 1, padding: SPACE.xxl, alignItems: "center", gap: SPACE.md },
  emptyTitle: { fontSize: 17, fontWeight: "700", textAlign: "center" },
  emptyBody: { fontSize: 14, lineHeight: 20, textAlign: "center", maxWidth: 300 },
  permissionCard: { borderRadius: RADIUS.lg, borderWidth: 1, padding: SPACE.lg, flexDirection: "row", gap: SPACE.md },
  permissionIcon: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  permissionCopy: { flex: 1, gap: 5 },
  permissionTitle: { fontSize: 15, fontWeight: "700" },
  permissionBody: { fontSize: 13, lineHeight: 18 },
  permissionAction: { fontSize: 13, fontWeight: "700", marginTop: 3 },
  map: { minHeight: 330, overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, position: "relative" },
  mapCompact: { minHeight: 220 },
  waterShape: { position: "absolute", width: 240, height: 160, right: -60, top: 34, borderRadius: 90, transform: [{ rotate: "-18deg" }] },
  contour: { position: "absolute", borderWidth: 2, borderRadius: 160, width: 340, height: 180 },
  contourOne: { top: 105, left: -60, transform: [{ rotate: "15deg" }] },
  contourTwo: { top: 148, left: -30, transform: [{ rotate: "15deg" }] },
  street: { position: "absolute", height: 8, borderRadius: 10, opacity: 0.75 },
  streetA: { width: 430, top: 170, left: -80, transform: [{ rotate: "-20deg" }] },
  streetB: { width: 360, top: 240, left: 30, transform: [{ rotate: "28deg" }] },
  mapTag: { position: "absolute", top: SPACE.lg, left: SPACE.lg, minHeight: 34, paddingHorizontal: SPACE.md, borderRadius: RADIUS.pill, flexDirection: "row", alignItems: "center", gap: 6, shadowColor: "#001F4D", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  mapTagText: { fontSize: 12, fontWeight: "700" },
  bottomNav: { minHeight: 76, borderTopWidth: 1, flexDirection: "row", paddingHorizontal: SPACE.lg, paddingTop: SPACE.sm, paddingBottom: Platform.OS === "web" ? SPACE.sm : SPACE.lg },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  navIconWrap: { width: 54, height: 30, borderRadius: RADIUS.pill, alignItems: "center", justifyContent: "center" },
  navLabel: { fontSize: 11, fontWeight: "700" },
  routeCard: { borderRadius: RADIUS.lg, borderWidth: 1, padding: SPACE.lg, flexDirection: "row", alignItems: "center", gap: SPACE.md },
  routeBadge: { width: 42, height: 42, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  routeCopy: { flex: 1, gap: 5 },
  routeTitle: { fontSize: 15, fontWeight: "700" },
  routeBody: { fontSize: 13, lineHeight: 18 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(5, 18, 38, 0.48)" },
  sheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE.lg, gap: SPACE.lg, minHeight: 260 },
  sheetHandle: { alignSelf: "center", width: 42, height: 5, borderRadius: 4, backgroundColor: "#9AA8BA" },
  sheetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sheetTitle: { fontSize: 19, fontWeight: "700" },
  segmented: { minHeight: 48, borderRadius: RADIUS.md, padding: 4, flexDirection: "row", gap: 4 },
  segment: { flex: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  segmentText: { fontSize: 13, fontWeight: "700" },
  heading: { gap: SPACE.sm },
  headingTop: { minHeight: 26 },
  headingTitle: { fontSize: 28, lineHeight: 34, fontWeight: "700", letterSpacing: -0.4 },
  headingBody: { fontSize: 15, lineHeight: 22, maxWidth: 560 },
});
