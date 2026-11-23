import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { BottomNav, IconButton, MapPlaceholder, NoticeBanner, Screen, SearchField, SectionTitle, StatusPill, useAppColors, go } from "@/components/app-ui";
import { SPACE } from "@/lib/design-system";

export default function HomeScreen() {
  const colors = useAppColors();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  return <View style={[styles.page, { backgroundColor: colors.background }]}>
    <Screen scroll={false} contentStyle={styles.homeContent}>
      <View style={styles.homeHeader}><View><StatusPill label="CONTEXTROUTE AI" tone="primary" /><Text style={[styles.title, { color: colors.foreground }]}>Plan around what matters.</Text><Text style={[styles.subtitle, { color: colors.muted }]}>A clearer route starts with your context.</Text></View><IconButton name="notifications-outline" label="Notifications" onPress={() => go("/notifications")} /></View>
      <MapPlaceholder>
        <View style={styles.mapControls}><IconButton name="locate-outline" label="Current location" variant="primary" onPress={() => {}} /><IconButton name="layers-outline" label="Map layers" onPress={() => {}} /></View>
        <View style={styles.mapMarker}><View style={[styles.markerDot, { backgroundColor: colors.primary }]} /><Text style={[styles.markerText, { color: colors.foreground }]}>Your context</Text></View>
      </MapPlaceholder>
      <View style={[styles.searchPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <SearchField value={origin} onChangeText={setOrigin} placeholder="Starting point" />
        <View style={[styles.connector, { backgroundColor: colors.border }]} />
        <SearchField value={destination} onChangeText={setDestination} placeholder="Where to?" onPress={() => go("/search")} editable={false} />
        <Pressable onPress={() => go("/context")} accessibilityRole="button" style={({ pressed }) => [styles.planLink, { backgroundColor: colors.surfaceAlt, opacity: pressed ? 0.72 : 1 }]}><View><Text style={[styles.planTitle, { color: colors.foreground }]}>Start a route plan</Text><Text style={[styles.planBody, { color: colors.muted }]}>Add purpose, traveler context and preferences</Text></View><Text style={[styles.arrow, { color: colors.primary }]}>→</Text></Pressable>
      </View>
      <NoticeBanner title="Map data is not connected" body="Live tiles, search, GPS and routing will appear after an integration is configured." icon="map-outline" />
      <SectionTitle title="Your planning space" action="Saved" onAction={() => go("/saved")} />
      <View style={styles.quickGrid}><Pressable onPress={() => go("/report")} style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.quickKicker, { color: colors.primary }]}>REPORT</Text><Text style={[styles.quickTitle, { color: colors.foreground }]}>Share a road concern</Text><Text style={[styles.quickBody, { color: colors.muted }]}>Saved locally until reporting is connected.</Text></Pressable><Pressable onPress={() => go("/emergency")} style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.quickKicker, { color: colors.warning }]}>ASSIST</Text><Text style={[styles.quickTitle, { color: colors.foreground }]}>Emergency assistance</Text><Text style={[styles.quickBody, { color: colors.muted }]}>See supported device actions.</Text></Pressable></View>
    </Screen>
    <BottomNav active="home" />
  </View>;
}

const styles = StyleSheet.create({ page: { flex: 1 }, homeContent: { paddingTop: SPACE.lg, gap: SPACE.lg }, homeHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACE.lg }, title: { fontSize: 26, lineHeight: 32, fontWeight: "700", marginTop: SPACE.md, letterSpacing: -0.4 }, subtitle: { fontSize: 14, lineHeight: 20, marginTop: 4 }, mapControls: { position: "absolute", right: SPACE.lg, bottom: SPACE.lg, gap: SPACE.sm }, mapMarker: { position: "absolute", left: "44%", top: "45%", flexDirection: "row", alignItems: "center", gap: 6 }, markerDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: "#FFFFFF" }, markerText: { fontSize: 12, fontWeight: "700" }, searchPanel: { borderRadius: 24, borderWidth: 1, padding: SPACE.md, gap: 8, marginTop: -42, shadowColor: "#09224A", shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 5 }, connector: { position: "absolute", left: 35, top: 66, width: 2, height: 28 }, planLink: { borderRadius: 16, minHeight: 60, paddingHorizontal: SPACE.lg, paddingVertical: SPACE.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 }, planTitle: { fontSize: 14, fontWeight: "700" }, planBody: { fontSize: 12, lineHeight: 17, marginTop: 3 }, arrow: { fontSize: 24, fontWeight: "700" }, quickGrid: { flexDirection: "row", gap: SPACE.md }, quickCard: { flex: 1, minHeight: 140, borderRadius: 20, borderWidth: 1, padding: SPACE.lg, gap: 7 }, quickKicker: { fontSize: 11, fontWeight: "800", letterSpacing: 1 }, quickTitle: { fontSize: 15, fontWeight: "700", lineHeight: 20 }, quickBody: { fontSize: 12, lineHeight: 17 } });
