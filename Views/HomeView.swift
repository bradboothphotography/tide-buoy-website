import SwiftUI
import MapKit

private enum TideBuoyLegalLinks {
    static let privacyPolicy = URL(string: "https://github.com/bradboothphotography/tide-buoy/blob/main/PRIVACY_POLICY.md")!
    static let termsOfUse = URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!
}

struct HomeView: View {
    @Environment(\.scenePhase) private var scenePhase
    @StateObject private var viewModel = TideViewModel()
    @StateObject private var premiumManager = PremiumAccessManager()
    @State private var selectedTideMarkerID: TideChartMarker.ID?
    @State private var selectedScrubXFrac: CGFloat?
    @State private var selectedBuoyForMap: BuoyCard?
    @State private var showFutureTides = false
    @State private var showSideMenu = false
    @State private var showChartDayPicker = false
    @State private var activeSheet: HomeSheet?
    @State private var showLaunchSplash = true
    @State private var launchStartedAt = Date()
    private let brandBlue = Color(red: 0.137, green: 0.267, blue: 0.408)
    private let pageBackground = Color(red: 0.93, green: 0.93, blue: 0.93)

    private enum HomeSheet: String, Identifiable {
        case savedSpots
        case mapPicker
        case premium
        case settings
        case about

        var id: String { rawValue }
    }

    var body: some View {
        ZStack(alignment: .top) {
            pageBackground
                .ignoresSafeArea()

            ScrollView(showsIndicators: false) {
                VStack(spacing: 14) {
                    headerSection
                    locationSection
                    chartSection
                    currentAndNextTideSection
                    if !premiumManager.isPremiumUnlocked {
                        freeBannerSection
                    }
                    TideDayListView(rows: viewModel.todaysTideRows)
                        .padding(.horizontal, 20)
                    checkFutureTidesButton
                    modeToggle
                    buoySection
                    premiumSection
                    footerSection
                }
                .padding(.bottom, 20)
            }
            .ignoresSafeArea(edges: .top)
            .scrollDisabled(selectedScrubXFrac != nil)

            if selectedTideMarkerID != nil {
                Color.clear
                    .contentShape(Rectangle())
                    .ignoresSafeArea()
                    .onTapGesture {
                        selectedTideMarkerID = nil
                    }
            }

            if showSideMenu {
                sideMenuOverlay
            }

            if showLaunchSplash {
                launchSplashOverlay
                    .transition(.opacity)
                    .zIndex(100)
            }
        }
        .sheet(isPresented: $showFutureTides) {
            FutureTidesSheet(viewModel: viewModel)
        }
        .sheet(item: $activeSheet) { sheet in
            switch sheet {
            case .savedSpots:
                SavedSpotsSheet(viewModel: viewModel)
            case .mapPicker:
                MapPickerSheet(viewModel: viewModel)
            case .premium:
                PremiumInfoSheet(premiumManager: premiumManager)
            case .settings:
                SettingsSheet(viewModel: viewModel)
            case .about:
                AboutTideBuoySheet(premiumManager: premiumManager)
            }
        }
        .sheet(item: $selectedBuoyForMap) { buoy in
            BuoyMapSheet(buoy: buoy)
        }
        .onAppear {
            launchStartedAt = Date()
            Task { @MainActor in
                try? await Task.sleep(nanoseconds: 1_200_000_000)
                hideLaunchSplash(force: true)
            }
            viewModel.setPremiumUnlocked(premiumManager.isPremiumUnlocked)
        }
        .onChange(of: viewModel.tidePoints.count) { _, count in
            if count > 1 {
                hideLaunchSplash(force: false)
            }
        }
        .onChange(of: premiumManager.isPremiumUnlocked) { _, unlocked in
            viewModel.setPremiumUnlocked(unlocked)
            if !unlocked && viewModel.mode == .fish {
                viewModel.setMode(.surf)
            }
        }
        .onChange(of: viewModel.selectedChartDayOffset) { _, _ in
            selectedTideMarkerID = nil
            selectedScrubXFrac = nil
        }
        .onChange(of: scenePhase) { _, newPhase in
            guard newPhase == .active else { return }
            viewModel.refreshOnAppActive()
        }
        .animation(.easeInOut(duration: 0.22), value: showSideMenu)
    }

    private var launchSplashOverlay: some View {
        ZStack {
            brandBlue.ignoresSafeArea()
            Image("Splash")
                .resizable()
                .scaledToFit()
                .frame(width: 220)
        }
    }

    private var headerSection: some View {
        VStack(spacing: 0) {
            HStack {
                Image("LogoHeader")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 40)

                Spacer()

                Button {
                    showSideMenu.toggle()
                } label: {
                    Image("ButtonSettings")
                        .resizable()
                        .frame(width: 30, height: 30)
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 18)
            .padding(.top, 56)
            .padding(.bottom, 10)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 156)
        .background(brandBlue)
    }

    private var locationSection: some View {
        let title = (viewModel.locationName ?? "LOCATION").uppercased()
        let isLongCoastalTitle = title.hasPrefix("NEAREST COAST:")

        return VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.custom("Calder-LC", size: isLongCoastalTitle ? 30 : 38))
                        .foregroundColor(brandBlue)
                        .lineLimit(isLongCoastalTitle ? 2 : 1)
                        .minimumScaleFactor(isLongCoastalTitle ? 0.55 : 0.75)
                        .fixedSize(horizontal: false, vertical: true)

                    Button {
                        if premiumManager.isPremiumUnlocked {
                            withAnimation(.easeInOut(duration: 0.18)) {
                                showChartDayPicker.toggle()
                            }
                        } else {
                            activeSheet = .premium
                        }
                    } label: {
                        HStack(spacing: 5) {
                            Text(viewModel.formattedDate)
                                .font(.custom("Calder-LC", size: 21))
                                .foregroundColor(.black)
                                .lineLimit(1)

                            if premiumManager.isPremiumUnlocked {
                                Image(systemName: showChartDayPicker ? "chevron.up" : "chevron.down")
                                    .font(.system(size: 11, weight: .semibold))
                                    .foregroundColor(.black.opacity(0.7))
                            }
                        }
                    }
                    .buttonStyle(.plain)
                }

                Spacer(minLength: 12)

                Button {
                    showChartDayPicker = false
                    viewModel.useCurrentLocation()
                } label: {
                    Image("ButtonLocation")
                        .resizable()
                        .frame(width: 24, height: 24)
                        .padding(.top, 8)
                }
                .buttonStyle(.plain)
                .contextMenu {
                    Button("SAVE CURRENT SPOT") {
                        if premiumManager.isPremiumUnlocked {
                            viewModel.saveCurrentSpot()
                        } else {
                            activeSheet = .premium
                        }
                    }
                    if premiumManager.isPremiumUnlocked && !viewModel.savedSpots.isEmpty {
                        ForEach(viewModel.savedSpots) { spot in
                            Button(spot.name) {
                                viewModel.selectSavedSpot(spot)
                            }
                        }
                    }
                }
            }

            if showChartDayPicker {
                HStack(spacing: 7) {
                    ForEach(0..<4, id: \.self) { offset in
                        let isSelected = viewModel.selectedChartDayOffset == offset
                        Button {
                            viewModel.selectChartDay(offset: offset)
                            withAnimation(.easeInOut(duration: 0.16)) {
                                showChartDayPicker = false
                            }
                        } label: {
                            Text(viewModel.chartDayLabel(offset: offset))
                                .font(.custom("Calder-LC", size: 14))
                                .foregroundColor(isSelected ? .white : brandBlue)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(
                                    Capsule()
                                        .fill(isSelected ? brandBlue : Color.white.opacity(0.6))
                                )
                        }
                        .buttonStyle(.plain)
                    }
                }
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .padding(.horizontal, 20)
        .padding(.top, 4)
    }

    private var chartSection: some View {
        TideCurveView(
            points: viewModel.tidePoints,
            markers: viewModel.tideMarkers,
            currentX: viewModel.currentXFrac,
            showCurrentTimeLine: viewModel.selectedChartDayOffset == 0,
            scrubInfoProvider: { xFrac in
                viewModel.tideScrubInfo(at: xFrac)
            },
            selectedMarkerID: $selectedTideMarkerID,
            scrubXFrac: $selectedScrubXFrac
        )
        .frame(minHeight: 240, maxHeight: 300)
        .padding(.horizontal, 20)
    }

    private var currentAndNextTideSection: some View {
        VStack(spacing: 8) {
            Text(viewModel.currentTideLabel)
                .font(.custom("Calder-LC", size: 28))
                .foregroundColor(brandBlue)

            VStack(spacing: 0) {
                Text("NEXT TIDE:")
                    .font(.custom("Calder-LC", size: 26))
                    .foregroundColor(.white)

                Text("\(viewModel.nextTideTime.uppercased()) - \(viewModel.nextTideType.uppercased()) \(viewModel.nextTideHeight)")
                    .font(.custom("Calder-LC", size: 19))
                    .foregroundColor(.white)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .background(
                Rectangle()
                    .fill(brandBlue)
            )
        }
        .padding(.horizontal, 20)
    }

    private var checkFutureTidesButton: some View {
        Button {
            if premiumManager.isPremiumUnlocked {
                viewModel.fetchFutureTides(daysAhead: 6)
                showFutureTides = true
            } else {
                activeSheet = .premium
            }
        } label: {
            Text("CHECK FUTURE TIDES")
                .font(.custom("Calder-LC", size: 20))
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(
                    Capsule()
                        .fill(brandBlue)
                )
        }
        .buttonStyle(.plain)
        .padding(.horizontal, 20)
    }

    private var modeToggle: some View {
        HStack(spacing: 4) {
            modeButton(title: "SURF", mode: .surf)
            modeButton(title: "FISH", mode: .fish)
        }
        .padding(4)
        .background(
            Capsule()
                .fill(Color.gray.opacity(0.35))
        )
        .padding(.horizontal, 20)
    }

    private var buoySection: some View {
        VStack(alignment: .leading, spacing: 14) {
            if viewModel.mode == .surf {
                if !premiumManager.isPremiumUnlocked {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("SURF DATA IS PREMIUM")
                            .font(.custom("Calder-LC", size: 25))
                            .foregroundColor(.black)

                        Text("UNLOCK OFFSHORE BUOY SWELL, PERIOD, WIND, WATER TEMP, AND BUOY MAP LOCATIONS.")
                            .font(.custom("Calder-LC", size: 15))
                            .foregroundColor(.black.opacity(0.82))
                            .lineSpacing(2)

                        Button {
                            activeSheet = .premium
                        } label: {
                            Text("START PREMIUM \(premiumManager.displayPrice)")
                                .font(.custom("Calder-LC", size: 18))
                                .foregroundColor(.white)
                                .padding(.horizontal, 14)
                                .padding(.vertical, 8)
                                .background(Capsule().fill(brandBlue))
                        }
                        .buttonStyle(.plain)
                    }
                } else if viewModel.buoyCards.isEmpty {
                    Text(viewModel.buoySummaries.first ?? "LOADING BUOY DATA...")
                        .font(.custom("Calder-LC", size: 18))
                        .foregroundColor(.black.opacity(0.7))
                } else {
                    ForEach(Array(viewModel.buoyCards.prefix(2).enumerated()), id: \.element.id) { index, card in
                        Button {
                            selectedBuoyForMap = card
                        } label: {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(card.title)
                                    .font(.custom("Calder-LC", size: 27))
                                    .foregroundColor(.black)

                                if card.details.isEmpty {
                                    Text("NO RECENT OBSERVATIONS")
                                        .font(.custom("Calder-LC", size: 16))
                                        .foregroundColor(.black.opacity(0.8))
                                } else {
                                    ForEach(card.details, id: \.self) { detail in
                                        Text(detail)
                                            .font(.custom("Calder-LC", size: 16))
                                            .foregroundColor(.black)
                                    }
                                }

                                Text("TAP TO VIEW MAP LOCATION")
                                    .font(.custom("Calder-LC", size: 13))
                                    .foregroundColor(brandBlue.opacity(0.9))
                            }
                        }
                        .buttonStyle(.plain)

                        if index == 0 && viewModel.buoyCards.count > 1 {
                            Spacer()
                                .frame(height: 6)
                        }
                    }
                }
            } else {
                ZStack(alignment: .topTrailing) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text(viewModel.fishingNowLine)
                            .font(.custom("Calder-LC", size: 28))
                            .foregroundColor(brandBlue)

                        VStack(alignment: .leading, spacing: 6) {
                            Text(viewModel.fishingScoreLine)
                                .font(.custom("Calder-LC", size: 20))
                                .foregroundColor(.black)

                            Text(viewModel.fishingBestWindowLine)
                                .font(.custom("Calder-LC", size: 17))
                                .foregroundColor(.black.opacity(0.85))

                            Text(viewModel.fishingWindLine)
                                .font(.custom("Calder-LC", size: 15))
                                .foregroundColor(.black.opacity(0.86))

                            Text(viewModel.fishingTideMovementLine)
                                .font(.custom("Calder-LC", size: 15))
                                .foregroundColor(.black.opacity(0.86))

                            ForEach(viewModel.fishingReasonLines, id: \.self) { line in
                                Text(line)
                                    .font(.custom("Calder-LC", size: 15))
                                    .foregroundColor(.black.opacity(0.86))
                            }
                        }
                        .padding(.trailing, 108)

                        Text("FISHING INDEX IS ESTIMATED. RESULTS MAY VARY.")
                            .font(.custom("Calder-LC", size: 11))
                            .foregroundColor(.black.opacity(0.56))
                            .padding(.top, 2)
                    }

                    MoonPhaseBadge(
                        phaseName: viewModel.fishingMoonPhaseName,
                        illuminationFraction: viewModel.fishingMoonIlluminationFraction
                    )
                    .padding(.top, 120)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 18)
        .padding(.vertical, 18)
        .background(
            RoundedRectangle(cornerRadius: 22)
                .fill(Color(red: 0.88, green: 0.88, blue: 0.88))
        )
        .padding(.horizontal, 20)
    }

    private var premiumSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(premiumManager.isPremiumUnlocked ? "PREMIUM ACTIVE" : "UPGRADE TO PREMIUM:")
                .font(.custom("Calder-LC", size: 26))
                .foregroundColor(.white)

            Text("YEARLY PREMIUM PLAN\nSURF DATA + SAVED SPOTS + MAP PICKER")
                .font(.custom("Calder-LC", size: 17))
                .foregroundColor(.white)
                .lineSpacing(2)

            ZStack {
                Capsule()
                    .fill(Color(red: 0.92, green: 0.92, blue: 0.92))
                    .frame(height: 34)
                Text(premiumManager.isPremiumUnlocked ? "ACTIVE" : "START \(premiumManager.displayPrice)")
                    .font(.custom("Calder-LC", size: 19))
                    .foregroundColor(.black)
            }
            .padding(.top, 4)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 18)
        .padding(.vertical, 16)
        .background(
            RoundedRectangle(cornerRadius: 22)
                .fill(brandBlue)
        )
        .padding(.horizontal, 20)
        .onTapGesture {
            if !premiumManager.isPremiumUnlocked {
                activeSheet = .premium
            }
        }
    }

    private var freeBannerSection: some View {
        AdBannerContainerView()
            .padding(.horizontal, 20)
    }

    private var footerSection: some View {
        ZStack {
            Rectangle()
                .fill(brandBlue)
            Image("LogoFooter")
                .resizable()
                .scaledToFit()
                .frame(height: 44)
                .padding(.bottom, 2)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 86)
        .padding(.top, 8)
        .padding(.horizontal, -20)
    }

    private var sideMenuOverlay: some View {
        ZStack {
            Color.black.opacity(0.24)
                .ignoresSafeArea()
                .onTapGesture {
                    showSideMenu = false
                }

            HStack {
                Spacer()
                sideMenuPanel
            }
            .ignoresSafeArea(edges: .vertical)
            .transition(.move(edge: .trailing).combined(with: .opacity))
        }
    }

    private var sideMenuPanel: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("MENU")
                    .font(.custom("Calder-LC", size: 27))
                    .foregroundColor(.white)
                Spacer()
                Button {
                    showSideMenu = false
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .padding(10)
                        .background(Circle().fill(Color.white.opacity(0.18)))
                }
                .buttonStyle(.plain)
            }
            .padding(.bottom, 6)

            sideMenuAction(title: "SAVED SPOTS", systemImage: "bookmark.fill") {
                openSheet(.savedSpots, requiresPremium: true)
            }
            sideMenuAction(title: "MAP PICKER", systemImage: "map.fill") {
                openSheet(.mapPicker, requiresPremium: true)
            }
            sideMenuAction(title: "PREMIUM", systemImage: "star.fill") {
                openSheet(.premium)
            }
            sideMenuAction(title: "ABOUT / SUPPORT", systemImage: "heart.fill") {
                openSheet(.about)
            }
            sideMenuAction(title: "SETTINGS", systemImage: "slider.horizontal.3") {
                openSheet(.settings)
            }

            if premiumManager.isPremiumUnlocked && !viewModel.savedSpots.isEmpty {
                Divider()
                    .overlay(Color.white.opacity(0.25))
                    .padding(.vertical, 6)

                Text("QUICK SPOTS")
                    .font(.custom("Calder-LC", size: 16))
                    .foregroundColor(.white.opacity(0.85))

                ForEach(viewModel.savedSpots.prefix(5)) { spot in
                    Button {
                        viewModel.selectSavedSpot(spot)
                        showSideMenu = false
                    } label: {
                        HStack {
                            Image(systemName: "mappin.and.ellipse")
                                .foregroundColor(.white.opacity(0.9))
                            Text(spot.name)
                                .font(.custom("Calder-LC", size: 18))
                                .foregroundColor(.white)
                                .lineLimit(1)
                            Spacer()
                        }
                        .padding(.vertical, 6)
                    }
                    .buttonStyle(.plain)
                }
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 16)
        .padding(.top, 52)
        .padding(.bottom, 24)
        .frame(width: 290)
        .frame(maxHeight: .infinity)
        .background(
            LinearGradient(
                colors: [brandBlue, Color(red: 0.102, green: 0.192, blue: 0.298)],
                startPoint: .top,
                endPoint: .bottom
            )
        )
        .shadow(color: .black.opacity(0.28), radius: 14, x: -6)
    }

    private func sideMenuAction(title: String, systemImage: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: systemImage)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(width: 20)
                Text(title)
                    .font(.custom("Calder-LC", size: 22))
                    .foregroundColor(.white)
                Spacer()
            }
            .padding(.vertical, 8)
        }
        .buttonStyle(.plain)
    }

    private func openSheet(_ sheet: HomeSheet, requiresPremium: Bool = false) {
        showSideMenu = false
        if requiresPremium && !premiumManager.isPremiumUnlocked {
            activeSheet = .premium
        } else {
            activeSheet = sheet
        }
    }

    private func modeButton(title: String, mode: TideViewModel.Mode) -> some View {
        Button {
            if mode == .fish && !premiumManager.isPremiumUnlocked {
                activeSheet = .premium
                return
            }
            viewModel.setMode(mode)
        } label: {
            Text(title)
                .font(.custom("Calder-LC", size: 22))
                .foregroundColor(viewModel.mode == mode ? .white : .white.opacity(0.9))
                .frame(maxWidth: .infinity)
                .frame(height: 44)
                .background(
                    RoundedRectangle(cornerRadius: 18)
                        .fill(viewModel.mode == mode ? brandBlue : Color.gray.opacity(0.45))
                )
        }
        .buttonStyle(.plain)
    }

    private func hideLaunchSplash(force: Bool) {
        guard showLaunchSplash else { return }

        let minVisibleDuration: TimeInterval = 0.45
        let elapsed = Date().timeIntervalSince(launchStartedAt)
        if force || elapsed >= minVisibleDuration {
            withAnimation(.easeOut(duration: 0.2)) {
                showLaunchSplash = false
            }
            return
        }

        let delay = minVisibleDuration - elapsed
        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
            guard showLaunchSplash else { return }
            withAnimation(.easeOut(duration: 0.2)) {
                showLaunchSplash = false
            }
        }
    }

}

private struct MoonPhaseBadge: View {
    let phaseName: String
    let illuminationFraction: Double

    private var isWaxing: Bool {
        phaseName.contains("WAXING") || phaseName.contains("FIRST QUARTER")
    }

    private var clampedIllumination: CGFloat {
        CGFloat(max(0, min(1, illuminationFraction)))
    }

    var body: some View {
        VStack(spacing: 3) {
            ZStack {
                Circle()
                    .fill(Color.black.opacity(0.9))

                Circle()
                    .fill(Color.white)
                    .opacity(clampedIllumination < 0.03 ? 0 : 1)
                    .scaleEffect(
                        x: max(0.06, clampedIllumination),
                        y: 1,
                        anchor: isWaxing ? .trailing : .leading
                    )
                    .clipShape(Circle())

                Circle()
                    .stroke(Color.black.opacity(0.28), lineWidth: 1)
            }
            .frame(width: 54, height: 54)
            .offset(y: 3)

            Text(phaseName)
                .font(.custom("Calder-LC", size: 11))
                .foregroundColor(.black.opacity(0.86))
                .multilineTextAlignment(.center)
                .lineLimit(2)
                .frame(width: 88)

            Text(String(format: "%.0f%% LIT", clampedIllumination * 100))
                .font(.custom("Calder-LC", size: 10))
                .foregroundColor(.black.opacity(0.7))
        }
    }
}

private struct FutureTidesSheet: View {
    @ObservedObject var viewModel: TideViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoadingFutureTides {
                    VStack(spacing: 14) {
                        ProgressView()
                        Text("LOADING FUTURE TIDES...")
                            .font(.custom("Calder-LC", size: 18))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if viewModel.futureTideDays.isEmpty {
                    VStack(spacing: 14) {
                        Text("NO FUTURE TIDES AVAILABLE")
                            .font(.custom("Calder-LC", size: 20))
                        Text("TRY AGAIN IN A FEW SECONDS.")
                            .font(.custom("Calder-LC", size: 16))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    List {
                        ForEach(viewModel.futureTideDays) { day in
                            Section(day.label) {
                                ForEach(day.rows) { row in
                                    HStack {
                                        Text("\(row.time.uppercased()) \(row.type.uppercased())")
                                            .font(.custom("Calder-LC", size: 17))
                                        Spacer()
                                        Text(row.height.uppercased())
                                            .font(.custom("Calder-LC", size: 17))
                                    }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("FUTURE TIDES")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") {
                        dismiss()
                    }
                    .font(.custom("Calder-LC", size: 16))
                }
            }
        }
        .onAppear {
            if viewModel.futureTideDays.isEmpty {
                viewModel.fetchFutureTides(daysAhead: 6)
            }
        }
    }
}

private struct SavedSpotsSheet: View {
    @ObservedObject var viewModel: TideViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button("SAVE CURRENT SPOT") {
                        viewModel.saveCurrentSpot()
                    }
                    .font(.custom("Calder-LC", size: 18))
                }

                if viewModel.savedSpots.isEmpty {
                    Section {
                        Text("NO SAVED SPOTS YET")
                            .font(.custom("Calder-LC", size: 18))
                            .foregroundColor(.secondary)
                    }
                } else {
                    Section("SAVED SPOTS") {
                        ForEach(viewModel.savedSpots) { spot in
                            Button {
                                viewModel.selectSavedSpot(spot)
                                dismiss()
                            } label: {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(spot.name)
                                        .font(.custom("Calder-LC", size: 20))
                                    Text(String(format: "%.4f, %.4f", spot.latitude, spot.longitude))
                                        .font(.custom("Calder-LC", size: 14))
                                        .foregroundColor(.secondary)
                                }
                            }
                            .buttonStyle(.plain)
                        }
                        .onDelete { idx in
                            idx.map { viewModel.savedSpots[$0] }.forEach(viewModel.removeSavedSpot)
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("SAVED SPOTS")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}

private struct MapPickerSheet: View {
    @ObservedObject var viewModel: TideViewModel
    @Environment(\.dismiss) private var dismiss

    @State private var position: MapCameraPosition
    @State private var center: CLLocationCoordinate2D

    init(viewModel: TideViewModel) {
        self.viewModel = viewModel
        let start = viewModel.initialMapCoordinate()
        let region = MKCoordinateRegion(
            center: start,
            span: MKCoordinateSpan(latitudeDelta: 0.45, longitudeDelta: 0.45)
        )
        _position = State(initialValue: .region(region))
        _center = State(initialValue: start)
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Map(position: $position)
                    .onMapCameraChange(frequency: .continuous) { context in
                        center = context.region.center
                    }
                    .ignoresSafeArea()
                    .overlay(alignment: .center) {
                        // Keep the visual pin tip at the exact coordinate we save.
                        Image(systemName: "mappin.circle.fill")
                            .font(.system(size: 30))
                            .foregroundColor(.red)
                            .shadow(radius: 2)
                            .offset(y: -16)
                            .allowsHitTesting(false)
                    }

                VStack {
                    Spacer()
                    VStack(spacing: 6) {
                        Text("MAP CENTER")
                            .font(.custom("Calder-LC", size: 15))
                            .foregroundColor(.secondary)
                        Text(String(format: "%.4f, %.4f", center.latitude, center.longitude))
                            .font(.custom("Calder-LC", size: 20))
                        Button("USE THIS SPOT") {
                            viewModel.setManualLocation(
                                latitude: center.latitude,
                                longitude: center.longitude,
                                label: "CUSTOM SPOT"
                            )
                            dismiss()
                        }
                        .font(.custom("Calder-LC", size: 18))
                        .padding(.horizontal, 20)
                        .padding(.vertical, 8)
                        .background(Capsule().fill(Color(red: 0.137, green: 0.267, blue: 0.408)))
                        .foregroundColor(.white)
                    }
                    .padding(12)
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 14))
                    .padding(.horizontal, 16)
                    .padding(.bottom, 20)
                }
            }
            .navigationTitle("MAP PICKER")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}

private struct BuoyMapSheet: View {
    let buoy: BuoyCard
    @Environment(\.dismiss) private var dismiss
    @State private var position: MapCameraPosition

    init(buoy: BuoyCard) {
        self.buoy = buoy
        let center = CLLocationCoordinate2D(latitude: buoy.latitude, longitude: buoy.longitude)
        let region = MKCoordinateRegion(
            center: center,
            span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        )
        _position = State(initialValue: .region(region))
    }

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Map(position: $position) {
                    Marker(buoy.title, coordinate: CLLocationCoordinate2D(latitude: buoy.latitude, longitude: buoy.longitude))
                }
                .ignoresSafeArea()

                VStack(alignment: .leading, spacing: 6) {
                    Text(buoy.title)
                        .font(.custom("Calder-LC", size: 24))
                        .foregroundColor(.white)
                    Text("BUOY \(buoy.stationID)")
                        .font(.custom("Calder-LC", size: 15))
                        .foregroundColor(.white.opacity(0.92))
                    Text(String(format: "%.4f, %.4f", buoy.latitude, buoy.longitude))
                        .font(.custom("Calder-LC", size: 15))
                        .foregroundColor(.white.opacity(0.92))
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(14)
                .background(
                    RoundedRectangle(cornerRadius: 14)
                        .fill(Color(red: 0.137, green: 0.267, blue: 0.408).opacity(0.94))
                )
                .padding(.horizontal, 16)
                .padding(.bottom, 20)
            }
            .navigationTitle("BUOY MAP")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}

private struct PremiumInfoSheet: View {
    @ObservedObject var premiumManager: PremiumAccessManager
    @Environment(\.dismiss) private var dismiss

    private let perks = [
        "$3/YEAR PREMIUM SUBSCRIPTION",
        "LIVE SURF/BUOY CONDITIONS",
        "UNLIMITED SAVED SPOTS",
        "MAP-BASED SPOT PICKER",
        "TAP BUOYS TO VIEW MAP LOCATION",
        "7+ DAY FUTURE TIDE LOOKAHEAD",
        "CUSTOM ALERTS (HIGH/LOW TIDE)",
        "BUOY PRIORITY FILTERS"
    ]

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 14) {
                Text("PREMIUM FEATURES")
                    .font(.custom("Calder-LC", size: 30))
                    .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))

                ForEach(perks, id: \.self) { perk in
                    HStack(alignment: .top, spacing: 10) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                        Text(perk)
                            .font(.custom("Calder-LC", size: 21))
                    }
                }

                VStack(alignment: .leading, spacing: 6) {
                    Text("SUBSCRIPTION")
                        .font(.custom("Calder-LC", size: 18))
                        .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                    Text("TIDE BUOY PREMIUM • 1 YEAR")
                        .font(.custom("Calder-LC", size: 17))
                        .foregroundColor(.black.opacity(0.86))
                    Text("\(premiumManager.displayPrice) PER YEAR • AUTO-RENEWS UNTIL CANCELED")
                        .font(.custom("Calder-LC", size: 16))
                        .foregroundColor(.black.opacity(0.76))
                    HStack(spacing: 14) {
                        Link("PRIVACY POLICY", destination: TideBuoyLegalLinks.privacyPolicy)
                            .font(.custom("Calder-LC", size: 16))
                        Link("TERMS OF USE", destination: TideBuoyLegalLinks.termsOfUse)
                            .font(.custom("Calder-LC", size: 16))
                    }
                    .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                }
                .padding(.top, 2)

                Spacer()
                if premiumManager.isPremiumUnlocked {
                    Text("PREMIUM ACTIVE")
                        .font(.custom("Calder-LC", size: 30))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Capsule().fill(Color(red: 0.137, green: 0.267, blue: 0.408)))
                        .foregroundColor(.white)
                } else {
                    Button {
                        Task {
                            await premiumManager.purchasePremium()
                        }
                    } label: {
                        Text(premiumManager.isBusy ? "PROCESSING..." : "START \(premiumManager.displayPrice)")
                            .font(.custom("Calder-LC", size: 30))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Capsule().fill(Color(red: 0.137, green: 0.267, blue: 0.408)))
                            .foregroundColor(.white)
                    }
                    .buttonStyle(.plain)
                    .disabled(premiumManager.isBusy)

                    Button {
                        Task {
                            await premiumManager.restorePurchases()
                        }
                    } label: {
                        Text("RESTORE PURCHASES")
                            .font(.custom("Calder-LC", size: 18))
                            .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.plain)
                    .padding(.top, 2)
                }

                if let message = premiumManager.purchaseMessage, !message.isEmpty {
                    Text(message.uppercased())
                        .font(.custom("Calder-LC", size: 15))
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity, alignment: .center)
                }
            }
            .padding(20)
            .navigationTitle("PREMIUM")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}

private struct AboutTideBuoySheet: View {
    @ObservedObject var premiumManager: PremiumAccessManager
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 14) {
                    Text("ABOUT TIDE BUOY")
                        .font(.custom("Calder-LC", size: 30))
                        .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))

                    Text("TIDE BUOY PREMIUM IS A LOW-COST YEARLY PLAN TO HELP KEEP THE APP RUNNING.")
                        .font(.custom("Calder-LC", size: 22))
                        .foregroundColor(.black)

                    Text("THIS APP WAS BUILT FROM A PERSONAL WANT AND NEED. PREMIUM HELPS FUND DATA, TOOLS, AND ONGOING UPDATES. IF YOU WANT TO SUPPORT EVEN MORE, YOU CAN LEAVE A TIP BELOW.")
                        .font(.custom("Calder-LC", size: 18))
                        .foregroundColor(.black.opacity(0.86))
                        .lineSpacing(2)

                    Text("OPTIONAL SUPPORT TIP")
                        .font(.custom("Calder-LC", size: 20))
                        .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                        .padding(.top, 4)

                    ForEach(premiumManager.tipOptions) { tip in
                        Button {
                            Task {
                                await premiumManager.purchaseTip(productID: tip.id)
                            }
                        } label: {
                            HStack {
                                Text(tip.title)
                                    .font(.custom("Calder-LC", size: 20))
                                    .foregroundColor(.white)
                                Spacer()
                                Text(tip.displayPrice)
                                    .font(.custom("Calder-LC", size: 20))
                                    .foregroundColor(.white)
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 10)
                            .background(
                                RoundedRectangle(cornerRadius: 14)
                                    .fill(Color(red: 0.137, green: 0.267, blue: 0.408))
                            )
                        }
                        .buttonStyle(.plain)
                        .disabled(premiumManager.isBusy)
                    }

                    if premiumManager.isBusy {
                        Text("PROCESSING...")
                            .font(.custom("Calder-LC", size: 15))
                            .foregroundColor(.secondary)
                    }

                    if let tipMessage = premiumManager.tipMessage, !tipMessage.isEmpty {
                        Text(tipMessage.uppercased())
                            .font(.custom("Calder-LC", size: 15))
                            .foregroundColor(.secondary)
                    }

                    HStack(spacing: 14) {
                        Link("PRIVACY POLICY", destination: TideBuoyLegalLinks.privacyPolicy)
                            .font(.custom("Calder-LC", size: 15))
                        Link("TERMS OF USE", destination: TideBuoyLegalLinks.termsOfUse)
                            .font(.custom("Calder-LC", size: 15))
                    }
                    .foregroundColor(Color(red: 0.137, green: 0.267, blue: 0.408))
                    .padding(.top, 2)

                    Text("THANK YOU FOR SUPPORTING TIDE BUOY.")
                        .font(.custom("Calder-LC", size: 16))
                        .foregroundColor(.black.opacity(0.72))
                        .padding(.top, 4)
                }
                .padding(20)
            }
            .navigationTitle("ABOUT / SUPPORT")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}

private struct SettingsSheet: View {
    @ObservedObject var viewModel: TideViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section("LOCATION") {
                    Button("LOCATE ME NOW") {
                        viewModel.useCurrentLocation()
                    }
                    .font(.custom("Calder-LC", size: 18))
                }

                Section("SAVED DATA") {
                    Button("CLEAR SAVED SPOTS", role: .destructive) {
                        viewModel.clearSavedSpots()
                    }
                    .font(.custom("Calder-LC", size: 18))
                }

                Section("UNITS") {
                    HStack {
                        Text("WATER TEMP")
                            .font(.custom("Calder-LC", size: 16))
                        Spacer()
                        Picker("WATER TEMP", selection: Binding(
                            get: { viewModel.temperatureUnit },
                            set: { viewModel.setTemperatureUnit($0) }
                        )) {
                            Text("°F").tag(TemperatureUnit.fahrenheit)
                            Text("°C").tag(TemperatureUnit.celsius)
                        }
                        .pickerStyle(.segmented)
                        .frame(width: 124)
                    }

                    HStack {
                        Text("TIDE/SWELL HEIGHT")
                            .font(.custom("Calder-LC", size: 16))
                        Spacer()
                        Picker("HEIGHT", selection: Binding(
                            get: { viewModel.tideHeightUnit },
                            set: { viewModel.setTideHeightUnit($0) }
                        )) {
                            Text("FT").tag(TideHeightUnit.feet)
                            Text("M").tag(TideHeightUnit.meters)
                        }
                        .pickerStyle(.segmented)
                        .frame(width: 124)
                    }

                    HStack {
                        Text("WIND SPEED")
                            .font(.custom("Calder-LC", size: 16))
                        Spacer()
                        Picker("WIND", selection: Binding(
                            get: { viewModel.windSpeedUnit },
                            set: { viewModel.setWindSpeedUnit($0) }
                        )) {
                            Text("KTS").tag(WindSpeedUnit.knots)
                            Text("MPH").tag(WindSpeedUnit.mph)
                            Text("KPH").tag(WindSpeedUnit.kph)
                        }
                        .pickerStyle(.segmented)
                        .frame(width: 180)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("SETTINGS")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("DONE") { dismiss() }
                        .font(.custom("Calder-LC", size: 16))
                }
            }
        }
    }
}
