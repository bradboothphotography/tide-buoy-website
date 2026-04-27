import Foundation
import CoreLocation
import SwiftUI
import StoreKit

// MARK: - Small on-disk cache (Caches/ folder)
final class APITideCache {
    static let shared = APITideCache()
    private init() {
        try? FileManager.default.createDirectory(at: cacheDir, withIntermediateDirectories: true)
        purgeExpired()
    }

    private let folder = "APITideCache"
    private var cacheDir: URL {
        let dir = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
        return dir.appendingPathComponent(folder, isDirectory: true)
    }

    private struct Entry: Codable { let expiresAt: Date; let payload: Data }

    func save(key: String, data: Data, ttlSeconds: TimeInterval) {
        let entry = Entry(expiresAt: Date().addingTimeInterval(ttlSeconds), payload: data)
        let url = path(for: key)
        if let blob = try? JSONEncoder().encode(entry) {
            try? blob.write(to: url, options: .atomic)
        }
    }

    func load(key: String) -> Data? {
        let url = path(for: key)
        guard let data = try? Data(contentsOf: url),
              let entry = try? JSONDecoder().decode(Entry.self, from: data) else { return nil }
        if entry.expiresAt > Date() { return entry.payload }
        try? FileManager.default.removeItem(at: url)
        return nil
    }

    func purgeExpired() {
        guard let files = try? FileManager.default.contentsOfDirectory(at: cacheDir, includingPropertiesForKeys: nil) else { return }
        for f in files {
            if let data = try? Data(contentsOf: f),
               let entry = try? JSONDecoder().decode(Entry.self, from: data),
               entry.expiresAt <= Date() {
                try? FileManager.default.removeItem(at: f)
            }
        }
    }

    private func path(for key: String) -> URL {
        let name = safeFilename(for: key)
        return cacheDir.appendingPathComponent(name + ".json")
    }

    private func safeFilename(for key: String) -> String {
        var encoded = Data(key.utf8)
            .base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")

        if encoded.count > 180 {
            encoded = fnv1a64Hex(key) + "-" + String(encoded.prefix(120))
        }

        return encoded.isEmpty ? "cache-key" : encoded
    }

    private func fnv1a64Hex(_ string: String) -> String {
        var hash: UInt64 = 0xcbf29ce484222325
        for byte in string.utf8 {
            hash ^= UInt64(byte)
            hash &*= 0x100000001b3
        }

        let hex = String(hash, radix: 16)
        return String(repeating: "0", count: max(0, 16 - hex.count)) + hex
    }
}

struct TideExtreme: Hashable {
    let time: String
    let height: Double
    let type: String
}

// MARK: - NOAA predictions (high/low)
struct NOAAResponse: Decodable {
    struct Prediction: Decodable {
        let t: String   // "yyyy-MM-dd HH:mm"
        let v: String
        let type: String // "H" or "L"
    }
    let predictions: [Prediction]
}

struct NOAAErrorResponse: Decodable {
    struct NOAAError: Decodable {
        let message: String
    }
    let error: NOAAError
}

struct NOAAStationListResponse: Decodable {
    let stations: [NOAAStation]
}

struct NOAAStation: Decodable, Hashable {
    let id: String
    let name: String?
    let lat: Double?
    let lon: Double?

    enum CodingKeys: String, CodingKey {
        case id, name, lat, lng, lon
    }

    init(id: String, name: String?, lat: Double?, lon: Double?) {
        self.id = id
        self.name = name
        self.lat = lat
        self.lon = lon
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        if let idString = try? c.decode(String.self, forKey: .id) {
            id = idString
        } else if let idNumber = try? c.decode(Int.self, forKey: .id) {
            id = String(idNumber)
        } else {
            throw DecodingError.dataCorruptedError(forKey: .id, in: c, debugDescription: "Missing NOAA station id")
        }
        name = try? c.decode(String.self, forKey: .name)

        func decodeDouble(_ key: CodingKeys) -> Double? {
            if let stringValue = try? c.decode(String.self, forKey: key) {
                return Double(stringValue)
            }
            return try? c.decode(Double.self, forKey: key)
        }

        lat = decodeDouble(.lat)
        lon = decodeDouble(.lng) ?? decodeDouble(.lon)
    }
}

// MARK: - Table rows shown in the "Tide chart" box
struct TideRow: Identifiable, Hashable {
    let id = UUID()
    let date: Date
    let time: String        // e.g. "3:29 PM"
    let type: String        // "High" / "Low"
    let height: String      // e.g. "4.60 FT."
}

struct TideChartMarker: Identifiable, Hashable {
    let id = UUID()
    let date: Date
    let x: CGFloat
    let y: CGFloat
    let type: String
    let timeText: String
    let heightText: String
}

struct TideScrubInfo: Hashable {
    let timeText: String
    let heightText: String
}

struct BuoyCard: Identifiable, Hashable {
    let id: String
    let stationID: String
    let title: String
    let details: [String]
    let latitude: Double
    let longitude: Double
}

struct SavedSpot: Identifiable, Codable, Hashable {
    let id: UUID
    let name: String
    let latitude: Double
    let longitude: Double

    init(id: UUID = UUID(), name: String, latitude: Double, longitude: Double) {
        self.id = id
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
    }
}

struct FutureTideDay: Identifiable, Hashable {
    let id: Date
    let date: Date
    let label: String
    let rows: [TideRow]
}

enum TemperatureUnit: String, CaseIterable, Codable, Identifiable {
    case fahrenheit
    case celsius

    var id: String { rawValue }
    var label: String { self == .fahrenheit ? "°F" : "°C" }
}

enum TideHeightUnit: String, CaseIterable, Codable, Identifiable {
    case feet
    case meters

    var id: String { rawValue }
    var label: String { self == .feet ? "FT" : "M" }
}

enum WindSpeedUnit: String, CaseIterable, Codable, Identifiable {
    case knots
    case mph
    case kph

    var id: String { rawValue }
    var label: String {
        switch self {
        case .knots: return "KTS"
        case .mph: return "MPH"
        case .kph: return "KPH"
        }
    }
}

private enum SurfBuoyRegion {
    case atlanticSouth
    case atlanticMidNorth
    case gulf
    case westCoast
    case hawaii
    case other
}

// MARK: - NOAA NDBC stations & observations (current conditions)
struct NDBCStation: Decodable, Hashable {
    let id: String
    let lat: Double
    let lon: Double
    let name: String?
    let owner: String?
    let type: String? // "buoy"/"tower"/etc.
}

struct NDBCObs: Codable {
    let timestamp: String?
    let wind_dir: Double?
    let wind_spd: Double?        // m/s
    let gust: Double?
    let wave_height: Double?     // meters
    let dominant_wpd: Double?    // seconds
    let wave_dir: Double?        // degrees true
    let water_temp: Double?      // °C
    let air_temp: Double?

    // Alternative JSON keys in some feeds
    let wdir: Double?
    let wspd: Double?
    let wtmp: Double?
    let atmp: Double?
    let dom_period: Double?

    var resolvedWindDir: Double?         { wind_dir ?? wdir }
    var resolvedWindSpdMS: Double?       { wind_spd ?? wspd }
    var resolvedWaterTempC: Double?      { water_temp ?? wtmp }
    var resolvedAirTempC: Double?        { air_temp ?? atmp }
    var resolvedDominantPeriodS: Double? { dominant_wpd ?? dom_period }
}

@MainActor
final class PremiumAccessManager: ObservableObject {
    static let yearlyProductID = "Brad_Booth_Media.Tide_Buoy.premium.yearly"
    static let lifetimeLegacyProductID = "Brad_Booth_Media.Tide_Buoy.premium.lifetime"
    static let tipOneProductID = "Brad_Booth_Media.Tide_Buoy.tip.1"
    static let tipFiveProductID = "Brad_Booth_Media.Tide_Buoy.tip.5"
    static let tipTenProductID = "Brad_Booth_Media.Tide_Buoy.tip.10"
    static var acceptedProductIDs: Set<String> { [yearlyProductID, lifetimeLegacyProductID] }
    static var tipProductIDs: Set<String> { [tipOneProductID, tipFiveProductID, tipTenProductID] }
    static var allKnownProductIDs: Set<String> { acceptedProductIDs.union(tipProductIDs) }

    struct TipProductOption: Identifiable, Hashable {
        let id: String
        let title: String
        let fallbackPrice: String
        var displayPrice: String
    }

    @Published private(set) var isPremiumUnlocked = false
    @Published private(set) var displayPrice: String = "$3.00/YEAR"
    @Published private(set) var isBusy = false
    @Published var purchaseMessage: String?
    @Published var tipMessage: String?
    @Published private(set) var tipOptions: [TipProductOption] = [
        TipProductOption(id: PremiumAccessManager.tipOneProductID, title: "TIP JAR", fallbackPrice: "$1.00", displayPrice: "$1.00"),
        TipProductOption(id: PremiumAccessManager.tipFiveProductID, title: "SUPPORTER", fallbackPrice: "$5.00", displayPrice: "$5.00"),
        TipProductOption(id: PremiumAccessManager.tipTenProductID, title: "LEGEND", fallbackPrice: "$10.00", displayPrice: "$10.00")
    ]

    private var product: Product?
    private var tipProductsByID: [String: Product] = [:]
    private var updatesTask: Task<Void, Never>?

    init() {
        Task { [weak self] in
            await self?.refreshEntitlements()
            await self?.loadProduct()
        }

        updatesTask = Task { [weak self] in
            guard let self = self else { return }
            for await update in Transaction.updates {
                do {
                    let transaction = try self.verify(update)
                    if Self.acceptedProductIDs.contains(transaction.productID) {
                        await transaction.finish()
                        await self.refreshEntitlements()
                    } else if Self.tipProductIDs.contains(transaction.productID) {
                        await transaction.finish()
                    }
                } catch {
                    self.purchaseMessage = "Could not verify purchase update."
                }
            }
        }
    }

    deinit {
        updatesTask?.cancel()
    }

    func purchasePremium() async {
        if isPremiumUnlocked {
            purchaseMessage = "Premium already unlocked."
            return
        }

        isBusy = true
        purchaseMessage = nil
        defer { isBusy = false }

        if product == nil {
            await loadProduct()
        }

        guard let product else {
            purchaseMessage = "Purchase unavailable right now. Try again shortly."
            return
        }

        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                let transaction = try verify(verification)
                await transaction.finish()
                await refreshEntitlements()
                if isPremiumUnlocked {
                    purchaseMessage = "Premium unlocked."
                } else {
                    purchaseMessage = "Purchase completed, but unlock not detected yet."
                }
            case .userCancelled:
                purchaseMessage = nil
            case .pending:
                purchaseMessage = "Purchase is pending approval."
            @unknown default:
                purchaseMessage = "Purchase did not complete."
            }
        } catch {
            purchaseMessage = "Purchase failed. Please try again."
        }
    }

    // Backward-compatible call name from older UI code.
    func purchaseLifetime() async {
        await purchasePremium()
    }

    func purchaseTip(productID: String) async {
        guard Self.tipProductIDs.contains(productID) else { return }

        isBusy = true
        tipMessage = nil
        defer { isBusy = false }

        if tipProductsByID[productID] == nil {
            await loadProduct()
        }

        guard let tipProduct = tipProductsByID[productID] else {
            tipMessage = "Tip option unavailable right now."
            return
        }

        do {
            let result = try await tipProduct.purchase()
            switch result {
            case .success(let verification):
                let transaction = try verify(verification)
                await transaction.finish()
                tipMessage = "Thank you for supporting Tide Buoy."
            case .userCancelled:
                tipMessage = nil
            case .pending:
                tipMessage = "Tip purchase is pending approval."
            @unknown default:
                tipMessage = "Tip purchase did not complete."
            }
        } catch {
            tipMessage = "Tip purchase failed. Please try again."
        }
    }

    func restorePurchases() async {
        isBusy = true
        purchaseMessage = nil
        defer { isBusy = false }

        do {
            try await AppStore.sync()
            await refreshEntitlements()
            purchaseMessage = isPremiumUnlocked
                ? "Purchase restored."
                : "No previous premium purchase found."
        } catch {
            purchaseMessage = "Restore failed. Please try again."
        }
    }

    private func loadProduct() async {
        do {
            let products = try await Product.products(for: Array(Self.allKnownProductIDs))
            guard !products.isEmpty else { return }
            let item = products.first(where: { $0.id == Self.yearlyProductID })
                ?? products.first(where: { $0.id == Self.lifetimeLegacyProductID })
                ?? products[0]
            product = item
            if let period = item.subscription?.subscriptionPeriod {
                let periodLabel: String
                switch period.unit {
                case .day:
                    periodLabel = period.value == 1 ? "DAY" : "\(period.value) DAYS"
                case .week:
                    periodLabel = period.value == 1 ? "WEEK" : "\(period.value) WEEKS"
                case .month:
                    periodLabel = period.value == 1 ? "MONTH" : "\(period.value) MONTHS"
                case .year:
                    periodLabel = period.value == 1 ? "YEAR" : "\(period.value) YEARS"
                @unknown default:
                    periodLabel = "PERIOD"
                }
                displayPrice = "\(item.displayPrice)/\(periodLabel)"
            } else if item.id == Self.yearlyProductID {
                displayPrice = "\(item.displayPrice)/YEAR"
            } else {
                displayPrice = item.displayPrice
            }

            let tips = products.filter { Self.tipProductIDs.contains($0.id) }
            tipProductsByID = Dictionary(uniqueKeysWithValues: tips.map { ($0.id, $0) })
            tipOptions = tipOptions.map { option in
                guard let p = tipProductsByID[option.id] else { return option }
                var updated = option
                updated.displayPrice = p.displayPrice
                return updated
            }
        } catch {
            // keep default fallback price
        }
    }

    private func refreshEntitlements() async {
        var unlocked = false
        for await entitlement in Transaction.currentEntitlements {
            guard let transaction = try? verify(entitlement) else { continue }
            guard Self.acceptedProductIDs.contains(transaction.productID) else { continue }
            guard transaction.revocationDate == nil else { continue }
            unlocked = true
        }
        isPremiumUnlocked = unlocked
    }

    private func verify<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .verified(let safe):
            return safe
        case .unverified:
            throw NSError(domain: "PremiumAccessManager", code: 1)
        }
    }
}

// MARK: - ViewModel
final class TideViewModel: NSObject, ObservableObject, CLLocationManagerDelegate {

    enum Mode { case surf, fish }

    // UI state
    @Published var locationName: String? = "LONG KEY, FL"
    @Published var formattedDate: String = TideViewModel.displayDateString(for: Date())
    @Published var mode: Mode = .surf

    // Tide display (for TideCurveView)
    @Published var tidePoints: [CGPoint] = []         // normalized 0..1 (x across day, y 0..1)
    @Published var tideMarkers: [TideChartMarker] = []
    @Published var currentTideLabel: String = "INCOMING TIDE"
    @Published var nextTideTime: String = "--:--"
    @Published var nextTideType: String = "—"
    @Published var nextTideHeight: String = "(--.- FT)"
    @Published var todaysTideRows: [TideRow] = []
    @Published var tideStationName: String = ""
    @Published var savedSpots: [SavedSpot] = []
    @Published var futureTideDays: [FutureTideDay] = []
    @Published var isLoadingFutureTides = false
    @Published var isPremiumUnlocked = false
    @Published var fishingRatingTitle: String = "FISHING: --"
    @Published var fishingNowLine: String = "FISHING RIGHT NOW: --"
    @Published var fishingScoreLine: String = "SCORE: --/100"
    @Published var fishingWindLine: String = "WIND: --"
    @Published var fishingTideMovementLine: String = "TIDE MOVEMENT: --"
    @Published var fishingBestWindowLine: String = "BEST WINDOW: --"
    @Published var fishingMoonPhaseName: String = "--"
    @Published var fishingMoonIlluminationFraction: Double = 0
    @Published var fishingReasonLines: [String] = []
    @Published var temperatureUnit: TemperatureUnit = .fahrenheit
    @Published var tideHeightUnit: TideHeightUnit = .feet
    @Published var windSpeedUnit: WindSpeedUnit = .knots

    // Curve time window + current time line (0..1 across the day)
    @Published var curveStart: Date = Calendar.current.startOfDay(for: Date())
    @Published var curveEnd: Date = Calendar.current.date(byAdding: .day, value: 1, to: Calendar.current.startOfDay(for: Date()))!
    @Published var currentXFrac: CGFloat = 0.5
    @Published var selectedChartDayOffset: Int = 0

    // Surf panel summaries for up to two nearby buoys
    @Published var buoySummaries: [String] = []
    @Published var buoyCards: [BuoyCard] = []
    @Published var selectedSurfBuoyStationID: String?

    // Location
    private let locationManager = CLLocationManager()
    private let defaultCoord = CLLocationCoordinate2D(latitude: 29.0258, longitude: -80.9260) // New Smyrna Beach, FL
    private var lastRefreshLocation: CLLocation?
    private var lastRefreshAt: Date = .distantPast
    private let minRefreshDistanceM: CLLocationDistance = 1000
    private let minRefreshIntervalS: TimeInterval = 120
    private var forceLocationOnNextFix = false
    private let locateButtonMaxAccuracyM: CLLocationAccuracy = 50000
    private let passiveLocationMaxAccuracyM: CLLocationAccuracy = 25000
    private let locateButtonMaxAgeS: TimeInterval = 900
    private let passiveLocationMaxAgeS: TimeInterval = 180
    private let minOffshoreBuoyDistanceM: CLLocationDistance = 5000
    private let maxRelevantBuoyDistanceM: CLLocationDistance = 250000
    private let maxExpandedBuoyDistanceM: CLLocationDistance = 900000
    private let maxNOAATideStationDistanceM: CLLocationDistance = 250000
    private let maxNOAAFallbackStationDistanceM: CLLocationDistance = 120000
    private let inlandSnapToCoastDistanceM: CLLocationDistance = 32187
    private var currentCoord: CLLocationCoordinate2D?
    private var currentCoordShouldBePreserved = false
    private var currentTideStationID: String?
    private var forcedCoastalDisplayName: String?
    private var requestedCurveStart: Date = Calendar.current.startOfDay(for: Date())
    private var requestedCurveEnd: Date = Calendar.current.date(byAdding: .day, value: 1, to: Calendar.current.startOfDay(for: Date()))!
    private var activeTideRequestID = UUID()
    private let savedSpotsKey = "tide-buoy.saved-spots.v1"
    private let selectedSurfBuoyStationIDKey = "tide-buoy.selected-surf-buoy-station-id.v1"
    private let temperatureUnitKey = "tide-buoy.units.temperature.v1"
    private let tideHeightUnitKey = "tide-buoy.units.tide-height.v1"
    private let windSpeedUnitKey = "tide-buoy.units.wind-speed.v1"
    private var latestTideEvents: [TideEvent] = []
    private var latestFishingWindMS: Double?
    private var latestFishingWindDisplay: String?
    private var surfBuoyRegion: SurfBuoyRegion {
        guard let coord = currentCoord else { return .other }
        let lat = coord.latitude
        let lon = coord.longitude

        if lat >= 18, lat <= 24, lon <= -150 {
            return .hawaii
        }
        if lon <= -114 {
            return .westCoast
        }
        if lat >= 24, lat <= 36, lon >= -82, lon <= -70 {
            return .atlanticSouth
        }
        if lat >= 24, lat <= 32, lon >= -98, lon < -82 {
            return .gulf
        }
        if lat > 36, lat <= 46, lon >= -82, lon <= -66 {
            return .atlanticMidNorth
        }
        return .other
    }

    private struct TideEvent {
        let date: Date
        let heightMeters: Double
        let type: String
    }

    private struct TideScale {
        let mean: Double
        let maxAbsDeviation: Double
    }

    private struct ChartEventPoint {
        let x: CGFloat
        let y: CGFloat
    }

    private struct NextTideInfo {
        let timeString: String
        let type: String
        let heightText: String
    }

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyKilometer
        locationManager.distanceFilter = 500
        loadUnitPreferences()
        loadSavedSpots()
        selectedSurfBuoyStationID = UserDefaults.standard.string(forKey: selectedSurfBuoyStationIDKey)

        // seed UI with default while GPS resolves
        refreshAll(for: defaultCoord, force: true)
        updateCurrentXFrac()

        // try device location
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()

        // keep current line fresh
        Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { [weak self] _ in
            self?.updateCurrentXFrac()
        }
    }

    func setMode(_ newMode: Mode) { mode = newMode }

    func setPremiumUnlocked(_ unlocked: Bool) {
        guard isPremiumUnlocked != unlocked else { return }
        isPremiumUnlocked = unlocked

        if unlocked {
            if let coord = currentCoord {
                refreshBuoys(for: coord)
            }
        } else {
            clearBuoyDataForFreeTier()
        }
    }

    func useCurrentLocation() {
        let status: CLAuthorizationStatus
        if #available(iOS 14.0, *) {
            status = locationManager.authorizationStatus
        } else {
            status = CLLocationManager.authorizationStatus()
        }

        if status == .denied || status == .restricted {
            DispatchQueue.main.async {
                self.locationName = "LOCATION ACCESS OFF"
            }
            return
        }

        forceLocationOnNextFix = true
        DispatchQueue.main.async {
            self.locationName = "LOCATING..."
        }
        if let current = locationManager.location,
           current.horizontalAccuracy >= 0,
           current.horizontalAccuracy <= locateButtonMaxAccuracyM,
           abs(current.timestamp.timeIntervalSinceNow) <= locateButtonMaxAgeS {
            refreshAll(for: current.coordinate, force: true, preserveRequestedCoordinate: false)
        }
        if status == .notDetermined {
            locationManager.requestWhenInUseAuthorization()
        }
        locationManager.startUpdatingLocation()
        locationManager.requestLocation()
    }

    func refreshOnAppActive() {
        if let coord = currentCoord {
            refreshAll(for: coord, force: true)
        } else {
            useCurrentLocation()
        }
    }

    func setManualLocation(latitude: Double, longitude: Double, label: String? = nil) {
        let coord = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
        if let label {
            DispatchQueue.main.async {
                self.locationName = label.uppercased()
            }
        }
        refreshAll(for: coord, force: true, preserveRequestedCoordinate: false)
    }

    func initialMapCoordinate() -> CLLocationCoordinate2D {
        currentCoord ?? defaultCoord
    }

    func saveCurrentSpot() {
        guard let coord = currentCoord else { return }
        let name = (locationName ?? "CUSTOM SPOT").uppercased()
        let candidate = SavedSpot(name: name, latitude: coord.latitude, longitude: coord.longitude)

        if let existing = savedSpots.first(where: {
            abs($0.latitude - candidate.latitude) < 0.0005 &&
            abs($0.longitude - candidate.longitude) < 0.0005
        }) {
            if existing.name != candidate.name {
                savedSpots = savedSpots.map { $0.id == existing.id ? SavedSpot(id: existing.id, name: candidate.name, latitude: existing.latitude, longitude: existing.longitude) : $0 }
                persistSavedSpots()
            }
            return
        }

        savedSpots.append(candidate)
        savedSpots.sort { $0.name < $1.name }
        persistSavedSpots()
    }

    func selectSavedSpot(_ spot: SavedSpot) {
        setManualLocation(latitude: spot.latitude, longitude: spot.longitude, label: spot.name)
    }

    func selectSurfBuoy(stationID: String) {
        guard selectedSurfBuoyStationID != stationID else { return }
        selectedSurfBuoyStationID = stationID
        UserDefaults.standard.set(stationID, forKey: selectedSurfBuoyStationIDKey)
    }

    var selectedSurfBuoyCard: BuoyCard? {
        guard !buoyCards.isEmpty else { return nil }
        if let selectedSurfBuoyStationID,
           let selected = buoyCards.first(where: { $0.stationID == selectedSurfBuoyStationID }) {
            return selected
        }
        return buoyCards.first
    }

    func removeSavedSpot(_ spot: SavedSpot) {
        savedSpots.removeAll { $0.id == spot.id }
        persistSavedSpots()
    }

    func clearSavedSpots() {
        savedSpots = []
        persistSavedSpots()
    }

    func setTemperatureUnit(_ unit: TemperatureUnit) {
        guard temperatureUnit != unit else { return }
        temperatureUnit = unit
        persistUnitPreferences()
        refreshForUnitChange()
    }

    func setTideHeightUnit(_ unit: TideHeightUnit) {
        guard tideHeightUnit != unit else { return }
        tideHeightUnit = unit
        persistUnitPreferences()
        refreshForUnitChange()
    }

    func setWindSpeedUnit(_ unit: WindSpeedUnit) {
        guard windSpeedUnit != unit else { return }
        windSpeedUnit = unit
        persistUnitPreferences()
        refreshForUnitChange()
    }

    // MARK: - CLLocationManagerDelegate
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        handleAuthorizationChange(for: manager)
    }

    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        handleAuthorizationChange(for: manager)
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let fromLocateButton = forceLocationOnNextFix
        let maxAccuracy = fromLocateButton ? locateButtonMaxAccuracyM : passiveLocationMaxAccuracyM
        let maxAge = fromLocateButton ? locateButtonMaxAgeS : passiveLocationMaxAgeS

        let now = Date()
        let validLocations = locations.filter { loc in
            guard loc.horizontalAccuracy >= 0 else { return false }
            guard loc.horizontalAccuracy <= maxAccuracy else { return false }
            return abs(loc.timestamp.timeIntervalSince(now)) <= maxAge
        }

        guard let loc = validLocations.min(by: { $0.horizontalAccuracy < $1.horizontalAccuracy }) else {
            if fromLocateButton,
               let fallback = manager.location,
               fallback.horizontalAccuracy >= 0,
               fallback.horizontalAccuracy <= locateButtonMaxAccuracyM,
               abs(fallback.timestamp.timeIntervalSince(now)) <= locateButtonMaxAgeS {
                forceLocationOnNextFix = false
                refreshAll(for: fallback.coordinate, force: true, preserveRequestedCoordinate: false)
            }
            return
        }

        let force = forceLocationOnNextFix || shouldForceRefresh(for: loc)
        forceLocationOnNextFix = false
        refreshAll(for: loc.coordinate, force: force, preserveRequestedCoordinate: false)
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        #if DEBUG
        print("Location error:", error.localizedDescription)
        #endif
        if forceLocationOnNextFix {
            forceLocationOnNextFix = false
            DispatchQueue.main.async {
                self.locationName = "LOCATION UNAVAILABLE"
            }
        }
    }

    private func handleAuthorizationChange(for manager: CLLocationManager) {
        let status: CLAuthorizationStatus
        if #available(iOS 14.0, *) {
            status = manager.authorizationStatus
        } else {
            status = CLLocationManager.authorizationStatus()
        }

        switch status {
        case .authorizedWhenInUse, .authorizedAlways:
            manager.startUpdatingLocation()
            manager.requestLocation()
        case .denied, .restricted:
            DispatchQueue.main.async {
                self.locationName = "LOCATION ACCESS OFF"
            }
        case .notDetermined:
            break
        @unknown default:
            break
        }
    }

    private func shouldForceRefresh(for location: CLLocation) -> Bool {
        guard let last = lastRefreshLocation else { return true }
        let moved = location.distance(from: last)
        let elapsed = Date().timeIntervalSince(lastRefreshAt)
        return moved >= minRefreshDistanceM || elapsed >= minRefreshIntervalS
    }

    private func refreshAll(
        for coord: CLLocationCoordinate2D,
        force: Bool,
        preserveRequestedCoordinate: Bool? = nil
    ) {
        let location = CLLocation(latitude: coord.latitude, longitude: coord.longitude)
        guard force || shouldForceRefresh(for: location) else { return }

        let shouldPreserveCoordinate = preserveRequestedCoordinate ?? currentCoordShouldBePreserved
        lastRefreshLocation = location
        lastRefreshAt = Date()
        currentCoord = coord
        currentCoordShouldBePreserved = shouldPreserveCoordinate
        currentTideStationID = nil
        forcedCoastalDisplayName = nil

        reverseGeocode(coord)
        fetchTideData(for: coord, dayOffset: selectedChartDayOffset)
    }

    private func clearBuoyDataForFreeTier() {
        DispatchQueue.main.async {
            self.buoyCards = []
            self.buoySummaries = ["UNLOCK PREMIUM TO VIEW SURF & BUOY DATA"]
        }
    }

    private func refreshFishingModel() {
        let now = Date()
        let todaysEvents = latestTideEvents
            .filter { $0.date >= curveStart && $0.date < curveEnd }
            .sorted { $0.date < $1.date }

        guard !todaysEvents.isEmpty else {
            DispatchQueue.main.async {
                self.fishingRatingTitle = "FISHING: NO DATA"
                self.fishingNowLine = "FISHING RIGHT NOW: UNAVAILABLE"
                self.fishingScoreLine = "SCORE: --/100"
                self.fishingWindLine = "WIND: --"
                self.fishingTideMovementLine = "TIDE MOVEMENT: --"
                self.fishingBestWindowLine = "BEST WINDOW: --"
                self.fishingMoonPhaseName = "--"
                self.fishingMoonIlluminationFraction = 0
                self.fishingReasonLines = ["TIDE DATA NOT AVAILABLE FOR THIS LOCATION."]
            }
            return
        }

        let nearestTideMinutes = todaysEvents
            .map { abs($0.date.timeIntervalSince(now)) / 60.0 }
            .min() ?? 999

        let tideMovementScore: Int
        switch nearestTideMinutes {
        case 0...60: tideMovementScore = 35
        case 60...120: tideMovementScore = 26
        case 120...180: tideMovementScore = 16
        default: tideMovementScore = 8
        }

        let heights = todaysEvents.map(\.heightMeters)
        let rangeM = (heights.max() ?? 0) - (heights.min() ?? 0)
        let tidalRangeScore: Int
        switch rangeM {
        case 1.5...: tidalRangeScore = 20
        case 1.0..<1.5: tidalRangeScore = 14
        case 0.5..<1.0: tidalRangeScore = 8
        default: tidalRangeScore = 4
        }

        let moon = moonInfo(for: now)
        let lunarScore: Int
        if moon.illuminationFraction <= 0.15 || moon.illuminationFraction >= 0.85 {
            lunarScore = 22
        } else if moon.illuminationFraction <= 0.30 || moon.illuminationFraction >= 0.70 {
            lunarScore = 16
        } else {
            lunarScore = 10
        }

        let windScore: Int
        var windSummary = latestFishingWindDisplay ?? "WIND: N/A"
        if let ms = latestFishingWindMS {
            let knots = ms * 1.94384
            if latestFishingWindDisplay == nil {
                windSummary = "WIND: \(formatWind(ms))"
            }
            switch knots {
            case ...4: windScore = 20
            case ...9: windScore = 16
            case ...14: windScore = 10
            case ...20: windScore = 5
            default: windScore = 0
            }
        } else {
            windScore = 10
        }

        let total = max(0, min(100, 10 + tideMovementScore + tidalRangeScore + lunarScore + windScore))
        let rating: String
        switch total {
        case 85...100: rating = "GREAT"
        case 70..<85: rating = "GOOD"
        case 45..<70: rating = "FAIR"
        default: rating = "POOR"
        }

        let nowLine = "FISHING RIGHT NOW: \(rating)"
        let movementBand = tideMovementScore >= 26 ? "STRONG" : (tideMovementScore >= 16 ? "MODERATE" : "LIGHT")
        let tideMovementLine = "TIDE MOVEMENT: \(Int(nearestTideMinutes.rounded())) MIN TO NEXT TIDE TURN (\(movementBand))"

        let bestWindow = bestFishingWindow(from: todaysEvents, now: now)
        let bestWindowLine = "BEST WINDOW: \(bestWindow)"
        let reasons = [
            String(format: "LUNAR: %@ (%.0f%%)", moon.phaseName.uppercased(), moon.illuminationFraction * 100)
        ]

        DispatchQueue.main.async {
            self.fishingRatingTitle = "FISHING: \(rating)"
            self.fishingNowLine = nowLine
            self.fishingScoreLine = "SCORE: \(total)/100"
            self.fishingWindLine = windSummary
            self.fishingTideMovementLine = tideMovementLine
            self.fishingBestWindowLine = bestWindowLine
            self.fishingMoonPhaseName = moon.phaseName.uppercased()
            self.fishingMoonIlluminationFraction = moon.illuminationFraction
            self.fishingReasonLines = reasons
        }
    }

    private func bestFishingWindow(from events: [TideEvent], now: Date) -> String {
        let candidate = events.first(where: { $0.date > now }) ?? events.first
        guard let candidate else { return "--" }

        let start = candidate.date.addingTimeInterval(-75 * 60)
        let end = candidate.date.addingTimeInterval(75 * 60)
        let tf = DateFormatter()
        tf.timeStyle = .short
        tf.dateStyle = .none
        return "\(tf.string(from: start)) - \(tf.string(from: end))"
    }

    private func moonInfo(for date: Date) -> (illuminationFraction: Double, phaseName: String) {
        // Approximate moon age from a known new moon epoch.
        let synodicMonth = 29.53058867
        let reference = Date(timeIntervalSince1970: 947182440) // Jan 6, 2000 18:14 UTC
        let days = date.timeIntervalSince(reference) / 86400.0
        var age = days.truncatingRemainder(dividingBy: synodicMonth)
        if age < 0 { age += synodicMonth }
        let phase = age / synodicMonth // 0..1
        let illumination = 0.5 * (1 - cos(2 * .pi * phase))

        let phaseName: String
        switch phase {
        case 0.0..<0.03, 0.97...1.0: phaseName = "New Moon"
        case 0.03..<0.22: phaseName = "Waxing Crescent"
        case 0.22..<0.28: phaseName = "First Quarter"
        case 0.28..<0.47: phaseName = "Waxing Gibbous"
        case 0.47..<0.53: phaseName = "Full Moon"
        case 0.53..<0.72: phaseName = "Waning Gibbous"
        case 0.72..<0.78: phaseName = "Last Quarter"
        default: phaseName = "Waning Crescent"
        }
        return (illumination, phaseName)
    }

    private func parseWindMetersPerSecond(from formattedLine: String) -> Double? {
        let upper = formattedLine.uppercased()
        guard let range = upper.range(of: #"WIND:\s+[A-Z]{1,3}\s+([0-9]+(?:\.[0-9]+)?)\s*(KTS|MPH|KPH)"#, options: .regularExpression) ??
                upper.range(of: #"WIND:\s+([0-9]+(?:\.[0-9]+)?)\s*(KTS|MPH|KPH)"#, options: .regularExpression) else {
            return nil
        }

        let segment = String(upper[range])
        let tokens = segment.split { $0 == " " || $0 == ":" }
            .map(String.init)
            .filter { !$0.isEmpty }

        var value: Double?
        var unit: String?
        for token in tokens {
            if let parsed = Double(token) {
                value = parsed
            } else if token == "KTS" || token == "MPH" || token == "KPH" {
                unit = token
            }
        }

        guard let val = value, let unit else { return nil }
        switch unit {
        case "KTS": return val / 1.94384
        case "MPH": return val / 2.23694
        case "KPH": return val / 3.6
        default: return nil
        }
    }

    private func parseWindDisplay(from formattedLine: String) -> String? {
        let parts = formattedLine
            .split(separator: "|")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines).uppercased() }
        return parts.first(where: { $0.hasPrefix("WIND:") })
    }

    private func reverseGeocode(_ coord: CLLocationCoordinate2D) {
        CLGeocoder().reverseGeocodeLocation(.init(latitude: coord.latitude, longitude: coord.longitude)) { [weak self] placemarks, _ in
            guard let self = self else { return }
            if let forced = self.forcedCoastalDisplayName {
                DispatchQueue.main.async {
                    self.locationName = forced
                }
                return
            }
            if let p = placemarks?.first {
                let city = p.locality ?? p.subLocality ?? p.name ?? "Location"
                let state = p.administrativeArea
                let display = [city, state].compactMap { $0 }.joined(separator: ", ").uppercased()
                if self.isOpenWaterDisplayName(display) {
                    DispatchQueue.main.async {
                        if self.forcedCoastalDisplayName == nil {
                            self.locationName = "CUSTOM SPOT"
                        }
                    }
                    return
                }
                DispatchQueue.main.async { self.locationName = display }
            }
        }
    }

    private func coastalDisplayName(for station: NOAAStation) -> String {
        "NEAREST COAST: \((station.name ?? station.id).uppercased())"
    }

    private func isOpenWaterDisplayName(_ text: String) -> Bool {
        let upper = text.uppercased()
        let openWaterTokens = [
            "OCEAN", "ATLANTIC", "PACIFIC", "GULF", "SEA",
            "STRAIT", "CHANNEL", "BAY OF", "OFFSHORE"
        ]
        return openWaterTokens.contains { upper.contains($0) }
    }

    // MARK: - Public tides fetch (NOAA-only)
    func fetchTideData(for coord: CLLocationCoordinate2D) {
        fetchTideData(for: coord, dayOffset: selectedChartDayOffset)
    }

    func selectChartDay(offset: Int) {
        let clamped = max(0, min(3, offset))
        guard clamped != selectedChartDayOffset else { return }
        selectedChartDayOffset = clamped
        guard let coord = currentCoord else { return }
        fetchTideData(for: coord, dayOffset: clamped)
    }

    func chartDayLabel(offset: Int) -> String {
        let normalized = max(0, min(3, offset))
        if normalized == 0 { return "TODAY" }
        if normalized == 1 { return "TOMORROW" }

        let cal = Calendar.current
        let date = cal.date(byAdding: .day, value: normalized, to: Date()) ?? Date()
        let df = DateFormatter()
        df.locale = .init(identifier: "en_US_POSIX")
        df.dateFormat = "EEE d"
        return df.string(from: date).uppercased()
    }

    func tideScrubInfo(at fraction: CGFloat) -> TideScrubInfo? {
        let clamped = max(0, min(1, Double(fraction)))
        let total = curveEnd.timeIntervalSince(curveStart)
        guard total > 0 else { return nil }

        let targetDate = curveStart.addingTimeInterval(total * clamped)
        guard let heightMeters = interpolatedTideHeight(at: targetDate) else { return nil }

        let tf = DateFormatter()
        tf.timeStyle = .short
        tf.dateStyle = .none
        return TideScrubInfo(
            timeText: tf.string(from: targetDate),
            heightText: formatTideHeight(heightMeters, decimals: 2, uppercaseUnit: false)
        )
    }

    private func fetchTideData(for coord: CLLocationCoordinate2D, dayOffset: Int) {
        // define day window first
        let cal = Calendar.current
        let normalizedOffset = max(0, min(3, dayOffset))
        let targetDate = cal.date(byAdding: .day, value: normalizedOffset, to: Date()) ?? Date()
        let start = cal.startOfDay(for: targetDate)
        let end = cal.date(byAdding: .day, value: 1, to: start)!
        let requestID = UUID()
        let preserveRequestedCoordinate = currentCoordShouldBePreserved
        activeTideRequestID = requestID
        requestedCurveStart = start
        requestedCurveEnd = end

        DispatchQueue.main.async {
            self.curveStart = start
            self.curveEnd = end
            self.selectedChartDayOffset = normalizedOffset
            self.formattedDate = Self.displayDateString(for: targetDate)
            self.updateCurrentXFrac()
        }

        fetchNOAATides(
            for: coord,
            dayStart: start,
            dayEnd: end,
            requestID: requestID,
            preserveRequestedCoordinate: preserveRequestedCoordinate
        )
    }

    private func updateCurrentXFrac() {
        let now = Date()
        let total = curveEnd.timeIntervalSince(curveStart)
        let frac = max(0, min(1, now.timeIntervalSince(curveStart) / total))
        DispatchQueue.main.async {
            self.currentXFrac = CGFloat(frac)
        }
    }

    private static func displayDateString(for date: Date) -> String {
        let df = DateFormatter()
        df.locale = .init(identifier: "en_US_POSIX")
        df.dateFormat = "'DATE' MMM d, yyyy"
        return df.string(from: date).uppercased()
    }

    private func loadSavedSpots() {
        guard let data = UserDefaults.standard.data(forKey: savedSpotsKey),
              let decoded = try? JSONDecoder().decode([SavedSpot].self, from: data) else {
            savedSpots = []
            return
        }
        savedSpots = decoded.sorted { $0.name < $1.name }
    }

    private func persistSavedSpots() {
        guard let data = try? JSONEncoder().encode(savedSpots) else { return }
        UserDefaults.standard.set(data, forKey: savedSpotsKey)
    }

    private func loadUnitPreferences() {
        if let raw = UserDefaults.standard.string(forKey: temperatureUnitKey),
           let unit = TemperatureUnit(rawValue: raw) {
            temperatureUnit = unit
        }
        if let raw = UserDefaults.standard.string(forKey: tideHeightUnitKey),
           let unit = TideHeightUnit(rawValue: raw) {
            tideHeightUnit = unit
        }
        if let raw = UserDefaults.standard.string(forKey: windSpeedUnitKey),
           let unit = WindSpeedUnit(rawValue: raw) {
            windSpeedUnit = unit
        }
    }

    private func persistUnitPreferences() {
        UserDefaults.standard.set(temperatureUnit.rawValue, forKey: temperatureUnitKey)
        UserDefaults.standard.set(tideHeightUnit.rawValue, forKey: tideHeightUnitKey)
        UserDefaults.standard.set(windSpeedUnit.rawValue, forKey: windSpeedUnitKey)
    }

    private func refreshForUnitChange() {
        if let coord = currentCoord {
            refreshAll(for: coord, force: true)
        }
        if !futureTideDays.isEmpty {
            fetchFutureTides(daysAhead: 6)
        }
    }

    private func convertTideHeight(_ meters: Double) -> Double {
        switch tideHeightUnit {
        case .feet: return meters * 3.28084
        case .meters: return meters
        }
    }

    private func formatTideHeight(_ meters: Double, decimals: Int = 2, uppercaseUnit: Bool = true) -> String {
        let value = convertTideHeight(meters)
        let unit = uppercaseUnit ? tideHeightUnit.label : tideHeightUnit.label.lowercased()
        return String(format: "%.\(decimals)f %@", value, unit)
    }

    private func formatSignedTideHeight(_ meters: Double) -> String {
        let value = convertTideHeight(meters)
        let signedText = value < 0
            ? String(format: "-%.1f", abs(value))
            : String(format: "+%.1f", value)
        return "(\(signedText)\(tideHeightUnit.label))"
    }

    private func formatWaterTemp(_ celsius: Double) -> String {
        switch temperatureUnit {
        case .fahrenheit:
            let f = (celsius * 9 / 5) + 32
            return String(format: "%.0f°F", f)
        case .celsius:
            return String(format: "%.0f°C", celsius)
        }
    }

    private func formatWind(_ metersPerSecond: Double) -> String {
        switch windSpeedUnit {
        case .knots:
            return String(format: "%.0f KTS", metersPerSecond * 1.94384)
        case .mph:
            return String(format: "%.0f MPH", metersPerSecond * 2.23694)
        case .kph:
            return String(format: "%.0f KPH", metersPerSecond * 3.6)
        }
    }

    // MARK: - NOAA tides (cached 1h)
    private func fetchNOAATides(
        for coord: CLLocationCoordinate2D,
        dayStart: Date,
        dayEnd: Date,
        requestID: UUID,
        preserveRequestedCoordinate: Bool
    ) {
        let df = DateFormatter(); df.dateFormat = "yyyyMMdd"
        let fetchStart = Calendar.current.date(byAdding: .day, value: -1, to: dayStart) ?? dayStart
        let fetchEnd = Calendar.current.date(byAdding: .day, value: 1, to: dayEnd) ?? dayEnd
        let beginDate = df.string(from: fetchStart)
        let endDate = df.string(from: fetchEnd.addingTimeInterval(-1))
        
        nearestNOAAStation(for: coord) { [weak self] station in
            guard let self = self else { return }
            guard self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
            guard let station else {
                if self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) {
                    self.applyNoTideCoverageState()
                }
                return
            }

            var marineCoord = coord
            if let lat = station.lat, let lon = station.lon {
                let stationCoord = CLLocationCoordinate2D(latitude: lat, longitude: lon)
                let requested = CLLocation(latitude: coord.latitude, longitude: coord.longitude)
                let nearestCoast = CLLocation(latitude: lat, longitude: lon)
                let distanceToCoast = nearestCoast.distance(from: requested)
                let shouldSnapToStation = !preserveRequestedCoordinate && distanceToCoast > self.inlandSnapToCoastDistanceM
                let currentDisplay = (self.locationName ?? "").uppercased()
                let shouldUseCoastalLabel = !preserveRequestedCoordinate && (
                    shouldSnapToStation ||
                    self.isOpenWaterDisplayName(currentDisplay) ||
                    currentDisplay.contains("CUSTOM SPOT")
                )
                let coastalLabel = self.coastalDisplayName(for: station)

                if shouldSnapToStation {
                    marineCoord = stationCoord
                }

                if shouldUseCoastalLabel {
                    self.forcedCoastalDisplayName = coastalLabel
                    DispatchQueue.main.async {
                        self.locationName = coastalLabel
                        if shouldSnapToStation {
                            self.currentCoord = marineCoord
                        }
                    }
                }
            }

            guard self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
            self.refreshBuoys(for: marineCoord)

            DispatchQueue.main.async {
                guard self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
                self.tideStationName = (station.name ?? station.id).uppercased()
                self.currentTideStationID = station.id
            }

            var comps = URLComponents(string: "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter")!
            comps.queryItems = [
                .init(name: "product", value: "predictions"),
                .init(name: "application", value: "TideBuoy"),
                .init(name: "begin_date", value: beginDate),
                .init(name: "end_date", value: endDate),
                .init(name: "datum", value: "MLLW"),
                .init(name: "station", value: station.id),
                .init(name: "time_zone", value: "lst_ldt"),
                .init(name: "units", value: "metric"),
                .init(name: "interval", value: "hilo"),
                .init(name: "format", value: "json")
            ]
            guard let url = comps.url else { return }

            let dayKey = DateFormatter.localizedString(from: dayStart, dateStyle: .short, timeStyle: .none)
            let cacheKey = "tideExtremes-noaa48h:\(station.id):\(dayKey)"
            let ttl: TimeInterval = 3600

            if let cached = APITideCache.shared.load(key: cacheKey) {
                self.decodeAndPublishNOAA(from: cached, dayStart: dayStart, dayEnd: dayEnd, requestID: requestID)
                return
            }

            URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
                guard let self = self else { return }
                guard self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
                guard let data = data, error == nil else {
                    if self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) {
                        self.applyNoTideCoverageState()
                    }
                    return
                }
                APITideCache.shared.save(key: cacheKey, data: data, ttlSeconds: ttl)
                self.decodeAndPublishNOAA(from: data, dayStart: dayStart, dayEnd: dayEnd, requestID: requestID)
            }.resume()
        }
    }

    func fetchFutureTides(daysAhead: Int = 6) {
        guard let coord = currentCoord else { return }
        let dayCount = max(2, min(daysAhead, 10))
        isLoadingFutureTides = true

        let start = Calendar.current.startOfDay(for: Date())
        let end = Calendar.current.date(byAdding: .day, value: dayCount, to: start) ?? start
        let df = DateFormatter()
        df.dateFormat = "yyyyMMdd"
        let beginDate = df.string(from: start)
        let endDate = df.string(from: end.addingTimeInterval(-1))

        let requestForStation: (String) -> Void = { [weak self] stationID in
            guard let self = self else { return }

            var comps = URLComponents(string: "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter")!
            comps.queryItems = [
                .init(name: "product", value: "predictions"),
                .init(name: "application", value: "TideBuoy"),
                .init(name: "begin_date", value: beginDate),
                .init(name: "end_date", value: endDate),
                .init(name: "datum", value: "MLLW"),
                .init(name: "station", value: stationID),
                .init(name: "time_zone", value: "lst_ldt"),
                .init(name: "units", value: "metric"),
                .init(name: "interval", value: "hilo"),
                .init(name: "format", value: "json")
            ]
            guard let url = comps.url else {
                DispatchQueue.main.async { self.isLoadingFutureTides = false }
                return
            }

            let cacheKey = "futureTides-noaa:\(stationID):\(beginDate)-\(endDate)"
            if let cached = APITideCache.shared.load(key: cacheKey) {
                self.decodeFutureTidesAndPublish(cached)
                return
            }

            URLSession.shared.dataTask(with: url) { data, _, error in
                guard let data = data, error == nil else {
                    DispatchQueue.main.async { self.isLoadingFutureTides = false }
                    return
                }
                APITideCache.shared.save(key: cacheKey, data: data, ttlSeconds: 1800)
                self.decodeFutureTidesAndPublish(data)
            }.resume()
        }

        if let stationID = currentTideStationID {
            requestForStation(stationID)
        } else {
            nearestNOAAStation(for: coord) { [weak self] station in
                guard let self = self, let station else {
                    DispatchQueue.main.async {
                        self?.futureTideDays = []
                        self?.isLoadingFutureTides = false
                    }
                    return
                }
                self.currentTideStationID = station.id
                requestForStation(station.id)
            }
        }
    }

    private func decodeFutureTidesAndPublish(_ data: Data) {
        do {
            let decoded = try JSONDecoder().decode(NOAAResponse.self, from: data)
            let inFmt = DateFormatter()
            inFmt.dateFormat = "yyyy-MM-dd HH:mm"
            inFmt.locale = .init(identifier: "en_US_POSIX")

            let extremes: [TideExtreme] = decoded.predictions.compactMap { p in
                guard let _ = inFmt.date(from: p.t), let h = Double(p.v) else { return nil }
                let type = (p.type.uppercased() == "H") ? "high" : "low"
                let isoLike = p.t.replacingOccurrences(of: " ", with: "T") + ":00"
                return .init(time: isoLike, height: h, type: type)
            }

            let grouped = groupFutureRows(from: extremes)
            DispatchQueue.main.async {
                self.futureTideDays = grouped
                self.isLoadingFutureTides = false
            }
        } catch {
            DispatchQueue.main.async {
                self.isLoadingFutureTides = false
            }
        }
    }

    private func groupFutureRows(from extremes: [TideExtreme]) -> [FutureTideDay] {
        guard !extremes.isEmpty else { return [] }
        let calendar = Calendar.current
        let dayFmt = DateFormatter()
        dayFmt.locale = .init(identifier: "en_US_POSIX")
        dayFmt.dateFormat = "EEE MMM d"
        let tf = DateFormatter()
        tf.timeStyle = .short
        tf.dateStyle = .none

        var grouped: [Date: [TideRow]] = [:]
        for event in extremes {
            guard let date = parseTideDate(event.time) else { continue }
            let day = calendar.startOfDay(for: date)
            let row = TideRow(
                date: date,
                time: tf.string(from: date),
                type: event.type.capitalized,
                height: formatTideHeight(event.height, decimals: 2, uppercaseUnit: true) + "."
            )
            grouped[day, default: []].append(row)
        }

        return grouped.keys.sorted().map { day in
            let rows = (grouped[day] ?? []).sorted { $0.date < $1.date }
            return FutureTideDay(
                id: day,
                date: day,
                label: dayFmt.string(from: day).uppercased(),
                rows: rows
            )
        }
    }

    private func decodeAndPublishNOAA(from data: Data, dayStart: Date, dayEnd: Date, requestID: UUID) {
        guard isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
        do {
            let decoded = try JSONDecoder().decode(NOAAResponse.self, from: data)
            let inFmt = DateFormatter(); inFmt.dateFormat = "yyyy-MM-dd HH:mm"; inFmt.locale = .init(identifier: "en_US_POSIX")
            let extremes: [TideExtreme] = decoded.predictions.compactMap { p in
                guard let _ = inFmt.date(from: p.t), let h = Double(p.v) else { return nil }
                let type = (p.type.uppercased() == "H") ? "high" : "low"
                let isoLike = p.t.replacingOccurrences(of: " ", with: "T") + ":00"
                return .init(time: isoLike, height: h, type: type)
            }

            let events = parseEvents(from: extremes)
            let markers = buildChartMarkers(from: events, dayStart: dayStart, dayEnd: dayEnd)
            let points = mapTideToSmoothPoints(events: events, dayStart: dayStart, dayEnd: dayEnd)
            let next = computeNextTide(from: extremes, dayStart: dayStart, dayEnd: dayEnd)
            let rows = buildTodayRows(from: extremes, dayStart: dayStart, dayEnd: dayEnd)
            guard isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
            self.latestTideEvents = events
            self.refreshFishingModel()

            DispatchQueue.main.async {
                guard self.isActiveTideRequest(requestID, dayStart: dayStart, dayEnd: dayEnd) else { return }
                self.tidePoints = points
                self.tideMarkers = markers
                self.nextTideTime = next.timeString
                self.nextTideType = next.type.capitalized
                self.nextTideHeight = next.heightText
                self.currentTideLabel = next.type.lowercased() == "high" ? "INCOMING TIDE" : "OUTGOING TIDE"
                self.todaysTideRows = rows
            }
        } catch {
            if let apiError = try? JSONDecoder().decode(NOAAErrorResponse.self, from: data) {
                #if DEBUG
                print("NOAA API error:", apiError.error.message)
                #endif
            }
            #if DEBUG
            print("NOAA decode error:", error)
            #endif
        }
    }

    private func isActiveTideRequest(_ requestID: UUID, dayStart: Date, dayEnd: Date) -> Bool {
        let latestID: UUID
        if Thread.isMainThread {
            latestID = activeTideRequestID
        } else {
            latestID = DispatchQueue.main.sync { self.activeTideRequestID }
        }
        guard latestID == requestID else { return false }
        return isCurrentCurveWindow(dayStart: dayStart, dayEnd: dayEnd)
    }

    // MARK: - Map tide events to a clean chart curve (exact timing, stylized heights)
    private func mapTideToSmoothPoints(events: [TideEvent], dayStart: Date, dayEnd: Date) -> [CGPoint] {
        let start = dayStart
        let end = dayEnd
        let total = end.timeIntervalSince(start)
        guard total > 0 else { return [] }

        guard !events.isEmpty else {
            return stride(from: 0.0, through: 1.0, by: 1.0 / 200.0).map { CGPoint(x: CGFloat($0), y: 0.5) }
        }
        
        let scale = tideScale(from: events)
        let chartEvents = chartEventPoints(from: events, scale: scale, dayStart: dayStart, dayEnd: dayEnd)
        guard chartEvents.count >= 2 else {
            return stride(from: 0.0, through: 1.0, by: 1.0 / 200.0).map { CGPoint(x: CGFloat($0), y: 0.5) }
        }

        let samples = 280
        return (0...samples).map { step in
            let x = CGFloat(step) / CGFloat(samples)
            let y = interpolatedChartY(at: x, points: chartEvents)
            return CGPoint(x: x, y: y)
        }
    }

    // MARK: - Next tide + rows
    private func computeNextTide(from extremes: [TideExtreme], dayStart: Date, dayEnd: Date) -> NextTideInfo {
        let now = Date()
        let reference = (now >= dayStart && now < dayEnd) ? now : dayStart
        let fut = extremes.compactMap { e -> (Date, String, Double)? in
            guard let d = parseTideDate(e.time) else { return nil }
            return d >= reference ? (d, e.type, e.height) : nil
        }.sorted { $0.0 < $1.0 }

        guard let next = fut.first else {
            return NextTideInfo(timeString: "--:--", type: "—", heightText: "(\(tideHeightUnit == .feet ? "--.-FT" : "--.-M"))")
        }

        let tf = DateFormatter(); tf.timeStyle = .short; tf.dateStyle = .none
        let timeStr = tf.string(from: next.0)
        let heightText = formatSignedTideHeight(next.2)
        let displayTime = next.0 >= dayEnd ? "Tomorrow \(timeStr)" : timeStr
        return NextTideInfo(timeString: displayTime, type: next.1, heightText: heightText)
    }

    private func buildTodayRows(from extremes: [TideExtreme], dayStart: Date, dayEnd: Date) -> [TideRow] {
        let start = dayStart
        let end = dayEnd
        let tf = DateFormatter(); tf.timeStyle = .short; tf.dateStyle = .none

        let todays = extremes.compactMap { e -> TideRow? in
            guard let d = parseTideDate(e.time) else { return nil }
            guard d >= start && d < end else { return nil }
            return TideRow(date: d,
                           time: tf.string(from: d),
                           type: e.type.capitalized,
                           height: formatTideHeight(e.height, decimals: 2, uppercaseUnit: true) + ".")
        }
        .sorted { $0.date < $1.date }
        return todays
    }

    private func parseEvents(from extremes: [TideExtreme]) -> [TideEvent] {
        extremes.compactMap { extreme in
            guard let date = parseTideDate(extreme.time) else { return nil }
            return TideEvent(date: date, heightMeters: extreme.height, type: extreme.type.lowercased())
        }
        .sorted { $0.date < $1.date }
    }

    private func parseTideDate(_ raw: String) -> Date? {
        let iso = ISO8601DateFormatter()
        iso.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        if let date = iso.date(from: raw) { return date }

        iso.formatOptions = [.withInternetDateTime]
        if let date = iso.date(from: raw) { return date }

        let localSecond = DateFormatter()
        localSecond.locale = .init(identifier: "en_US_POSIX")
        localSecond.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        if let date = localSecond.date(from: raw) { return date }

        let localMinute = DateFormatter()
        localMinute.locale = .init(identifier: "en_US_POSIX")
        localMinute.dateFormat = "yyyy-MM-dd'T'HH:mm"
        return localMinute.date(from: raw)
    }

    private func buildChartMarkers(from events: [TideEvent], dayStart: Date, dayEnd: Date) -> [TideChartMarker] {
        let start = dayStart
        let end = dayEnd
        let total = end.timeIntervalSince(start)
        guard total > 0 else { return [] }
        let scale = tideScale(from: events)

        let tf = DateFormatter()
        tf.timeStyle = .short
        tf.dateStyle = .none

        return events
            .filter { $0.date >= start && $0.date < end }
            .map { event in
                TideChartMarker(
                    date: event.date,
                    x: CGFloat(max(0, min(1, event.date.timeIntervalSince(start) / total))),
                    y: chartY(for: event, scale: scale),
                    type: event.type.capitalized,
                    timeText: tf.string(from: event.date),
                    heightText: formatTideHeight(event.heightMeters, decimals: 2, uppercaseUnit: false)
                )
            }
    }

    private func tideScale(from events: [TideEvent]) -> TideScale {
        guard !events.isEmpty else {
            return TideScale(mean: 0, maxAbsDeviation: 1)
        }

        let mean = events.map(\.heightMeters).reduce(0, +) / Double(events.count)
        let maxAbs = events
            .map { abs($0.heightMeters - mean) }
            .max() ?? 1

        return TideScale(mean: mean, maxAbsDeviation: max(maxAbs, 0.01))
    }

    private func chartY(for event: TideEvent, scale: TideScale) -> CGFloat {
        let signed = (event.heightMeters - scale.mean) / scale.maxAbsDeviation
        // Keep relative highs/lows visible, but avoid occasional over-deep spikes.
        let softened = Foundation.tanh(signed * 0.95)
        let amplitude: CGFloat = 0.29
        var y = 0.5 - (CGFloat(softened) * amplitude)

        // Keep highs above the axis and lows below while retaining relative size differences.
        if event.type == "high" {
            y = min(y, 0.485)
        } else if event.type == "low" {
            y = max(y, 0.515)
        }

        return min(max(y, 0.14), 0.86)
    }

    private func chartEventPoints(from events: [TideEvent], scale: TideScale, dayStart: Date, dayEnd: Date) -> [ChartEventPoint] {
        let total = dayEnd.timeIntervalSince(dayStart)
        guard total > 0 else { return [] }

        let points = events
            .map { event in
                ChartEventPoint(
                    x: CGFloat(event.date.timeIntervalSince(dayStart) / total),
                    y: chartY(for: event, scale: scale)
                )
            }
            .filter { $0.x >= -1.2 && $0.x <= 2.2 }
            .sorted { $0.x < $1.x }

        guard !points.isEmpty else { return [] }

        var deduped: [ChartEventPoint] = []
        deduped.reserveCapacity(points.count)
        for point in points {
            if let last = deduped.last, abs(last.x - point.x) < 0.0001 {
                deduped[deduped.count - 1] = point
            } else {
                deduped.append(point)
            }
        }

        guard !deduped.isEmpty else { return [] }
        if deduped.count == 1 {
            let only = deduped[0]
            return [
                ChartEventPoint(x: 0, y: only.y),
                ChartEventPoint(x: 1, y: only.y)
            ]
        }

        var output = deduped
        if let first = output.first, first.x > 0, output.count >= 2 {
            let second = output[1]
            let yAtStart = extrapolatedChartY(targetX: 0, anchorA: first, anchorB: second)
            output.insert(ChartEventPoint(x: 0, y: yAtStart), at: 0)
        }

        if let last = output.last, last.x < 1, output.count >= 2 {
            let previous = output[output.count - 2]
            let yAtEnd = extrapolatedChartY(targetX: 1, anchorA: previous, anchorB: last)
            output.append(ChartEventPoint(x: 1, y: yAtEnd))
        }

        return output.sorted { $0.x < $1.x }
    }

    private func interpolatedChartY(at x: CGFloat, points: [ChartEventPoint]) -> CGFloat {
        guard !points.isEmpty else { return 0.5 }
        if x <= points[0].x { return points[0].y }
        if let last = points.last, x >= last.x { return last.y }

        guard let upperIndex = points.firstIndex(where: { $0.x >= x }), upperIndex > 0 else {
            return points[0].y
        }

        let a = points[upperIndex - 1]
        let b = points[upperIndex]
        let span = max(b.x - a.x, 0.0001)
        let u = max(0, min(1, (x - a.x) / span))
        let eased = CGFloat(0.5 - (Foundation.cos(Double(u) * .pi) * 0.5))
        return a.y + ((b.y - a.y) * eased)
    }

    private func interpolatedTideHeight(at date: Date) -> Double? {
        let events = latestTideEvents.sorted { $0.date < $1.date }
        guard !events.isEmpty else { return nil }
        if events.count == 1 { return events[0].heightMeters }
        if date <= events[0].date { return events[0].heightMeters }
        if let last = events.last, date >= last.date { return last.heightMeters }

        guard let upperIndex = events.firstIndex(where: { $0.date >= date }), upperIndex > 0 else {
            return events[0].heightMeters
        }

        let a = events[upperIndex - 1]
        let b = events[upperIndex]
        let span = b.date.timeIntervalSince(a.date)
        guard span > 0 else { return a.heightMeters }

        let u = max(0, min(1, date.timeIntervalSince(a.date) / span))
        let eased = 0.5 - (Foundation.cos(u * .pi) * 0.5)
        return a.heightMeters + ((b.heightMeters - a.heightMeters) * eased)
    }

    private func extrapolatedChartY(targetX: CGFloat, anchorA: ChartEventPoint, anchorB: ChartEventPoint) -> CGFloat {
        let span = max(anchorB.x - anchorA.x, 0.0001)
        let slope = (anchorB.y - anchorA.y) / span
        let y = anchorA.y + ((targetX - anchorA.x) * slope)
        return min(max(y, 0.14), 0.86)
    }

    private func isCurrentCurveWindow(dayStart: Date, dayEnd: Date) -> Bool {
        abs(requestedCurveStart.timeIntervalSince(dayStart)) < 1 &&
        abs(requestedCurveEnd.timeIntervalSince(dayEnd)) < 1
    }

    // MARK: - NOAA station discovery
    private func nearestNOAAStation(for coord: CLLocationCoordinate2D, completion: @escaping (NOAAStation?) -> Void) {
        fetchNOAAStations { stations, isFallbackList in
            let here = CLLocation(latitude: coord.latitude, longitude: coord.longitude)
            let closestPair = stations
                .compactMap { station -> (station: NOAAStation, distance: CLLocationDistance, rank: CLLocationDistance)? in
                    guard let lat = station.lat, let lon = station.lon else { return nil }
                    let distance = CLLocation(latitude: lat, longitude: lon).distance(from: here)
                    return (station, distance, distance + self.inshoreTideStationPenalty(for: station, distance: distance))
                }
                .sorted { $0.rank < $1.rank }
                .first

            guard let closestPair else {
                completion(nil)
                return
            }

            let maxDistance = isFallbackList ? self.maxNOAAFallbackStationDistanceM : self.maxNOAATideStationDistanceM
            guard closestPair.distance <= maxDistance else {
                completion(nil)
                return
            }

            completion(closestPair.station)
        }
    }

    private func inshoreTideStationPenalty(for station: NOAAStation, distance: CLLocationDistance) -> CLLocationDistance {
        guard distance > 8000 else { return 0 }

        let name = (station.name ?? "").lowercased()
        let inshoreTokens = [" river", "fork", "creek", "slough", "canal"]
        return inshoreTokens.contains { name.contains($0) } ? 80000 : 0
    }

    private func applyNoTideCoverageState() {
        let noDataPoints = stride(from: 0.0, through: 1.0, by: 1.0 / 200.0).map { x in
            CGPoint(x: CGFloat(x), y: 0.5)
        }

        DispatchQueue.main.async {
            self.currentTideStationID = nil
            self.tideStationName = "NOAA OUT OF COVERAGE"
            self.tidePoints = noDataPoints
            self.tideMarkers = []
            self.currentTideLabel = "NO DATA AVAILABLE FOR THIS LOCATION"
            self.nextTideTime = "--:--"
            self.nextTideType = "N/A"
            self.nextTideHeight = self.tideHeightUnit == .feet ? "(--.-FT)" : "(--.-M)"
            self.todaysTideRows = []
            self.futureTideDays = []
            self.isLoadingFutureTides = false
            self.buoyCards = []
            self.buoySummaries = self.isPremiumUnlocked
                ? ["NO OFFSHORE BUOY DATA FOUND NEAR THIS SPOT"]
                : ["UNLOCK PREMIUM TO VIEW SURF & BUOY DATA"]
        }
        latestTideEvents = []
        latestFishingWindMS = nil
        latestFishingWindDisplay = nil
        refreshFishingModel()
    }

    private func fetchNOAAStations(completion: @escaping ([NOAAStation], Bool) -> Void) {
        let cacheKey = "noaa-tide-stations:v1"
        if let cached = APITideCache.shared.load(key: cacheKey),
           let decoded = try? JSONDecoder().decode(NOAAStationListResponse.self, from: cached),
           !decoded.stations.isEmpty {
            completion(decoded.stations, false)
            return
        }

        guard let url = URL(string: "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions") else {
            completion(fallbackNOAAStations, true)
            return
        }

        URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
            guard let self = self else { return }
            guard error == nil, let data = data else {
                completion(self.fallbackNOAAStations, true)
                return
            }

            if let decoded = try? JSONDecoder().decode(NOAAStationListResponse.self, from: data),
               !decoded.stations.isEmpty {
                APITideCache.shared.save(key: cacheKey, data: data, ttlSeconds: 86400 * 30)
                completion(decoded.stations, false)
            } else {
                completion(self.fallbackNOAAStations, true)
            }
        }.resume()
    }

    private var fallbackNOAAStations: [NOAAStation] {
        [
            NOAAStation(id: "8724580", name: "Key West", lat: 24.5557, lon: -81.8082),
            NOAAStation(id: "8723214", name: "Virginia Key", lat: 25.7317, lon: -80.1617),
            NOAAStation(id: "8722670", name: "Lake Worth Pier", lat: 26.6133, lon: -80.0350),
            NOAAStation(id: "8721604", name: "Trident Pier", lat: 28.4158, lon: -80.5931),
            NOAAStation(id: "8721147", name: "Ponce De Leon Inlet", lat: 29.0767, lon: -80.9349),
            NOAAStation(id: "8720218", name: "Mayport", lat: 30.3925, lon: -81.4300)
        ]
    }

    // MARK: - Buoys (nearest two) — used by Surf panel

    func refreshBuoys(for coord: CLLocationCoordinate2D) {
        fetchNearestNDBCStations(to: coord, count: 300) { [weak self] stations in
            guard let self = self else { return }
            let region = self.surfBuoyRegion
            let stations = self.mergedPreferredStations(into: stations, region: region)
            guard !stations.isEmpty else {
                self.latestFishingWindMS = nil
                self.latestFishingWindDisplay = nil
                self.refreshFishingModel()
                DispatchQueue.main.async {
                    self.buoySummaries = self.isPremiumUnlocked
                        ? ["NO SWELL BUOY DATA FOUND IN SEARCH RADIUS"]
                        : ["UNLOCK PREMIUM TO VIEW SURF & BUOY DATA"]
                    self.buoyCards = []
                }
                return
            }

            // Use the robust latest_obs.txt parser (more consistent than per-station JSON)
            self.fetchLatestObs(for: stations) { lines in
                let paired = Array(zip(stations, lines))
                let withData = paired.filter { !$0.1.uppercased().contains("NO RECENT OBSERVATIONS") }
                let preferredIDs = Set(self.preferredBuoyIDs(for: region))
                let preferred = paired.filter { preferredIDs.contains($0.0.id.uppercased()) }
                let waveCapable = withData.filter {
                    let upper = $0.1.uppercased()
                    return upper.contains("SWELL HEIGHT:") ||
                           upper.contains("SWELL PERIOD:") ||
                           upper.contains("SWELL DIRECTION:")
                }

                let buoyCandidates = self.uniqueBuoyPairs(preferred + waveCapable)
                func distanceM(_ station: NDBCStation) -> CLLocationDistance {
                    CLLocation(latitude: station.lat, longitude: station.lon)
                        .distance(from: CLLocation(latitude: coord.latitude, longitude: coord.longitude))
                }

                let offshoreWave = buoyCandidates.filter {
                    self.isPreferredBuoy($0.0, region: region) ||
                    self.isOffshoreCandidate($0.0, distanceM: distanceM($0.0))
                }
                let coastFacingWave = offshoreWave.filter {
                    self.isStationFacingRegion($0.0, region: region)
                }
                let candidateWave = coastFacingWave

                let rankedWave = candidateWave.sorted { lhs, rhs in
                    let lhsDistance = CLLocation(latitude: lhs.0.lat, longitude: lhs.0.lon)
                        .distance(from: CLLocation(latitude: coord.latitude, longitude: coord.longitude))
                    let rhsDistance = CLLocation(latitude: rhs.0.lat, longitude: rhs.0.lon)
                        .distance(from: CLLocation(latitude: coord.latitude, longitude: coord.longitude))
                    let lhsPriority = self.priorityRank(for: lhs.0, region: region)
                    let rhsPriority = self.priorityRank(for: rhs.0, region: region)
                    if lhsPriority != rhsPriority {
                        return lhsPriority < rhsPriority
                    }
                    return lhsDistance < rhsDistance
                }
                let selected = Array(rankedWave.prefix(8))

                guard !selected.isEmpty else {
                    self.latestFishingWindMS = nil
                    self.latestFishingWindDisplay = nil
                    self.refreshFishingModel()
                    DispatchQueue.main.async {
                        self.buoySummaries = self.isPremiumUnlocked
                            ? ["NO OCEAN SWELL BUOY DATA FOUND IN SEARCH RADIUS"]
                            : ["UNLOCK PREMIUM TO VIEW SURF & BUOY DATA"]
                        self.buoyCards = []
                    }
                    return
                }

                let cards: [BuoyCard] = selected.map { station, line in
                    let parsed = self.parseBuoyLineForCard(raw: line, fallbackTitle: station.name ?? station.id)
                    return BuoyCard(
                        id: station.id.lowercased(),
                        stationID: station.id.uppercased(),
                        title: (station.name ?? parsed.title).uppercased(),
                        details: parsed.details,
                        latitude: station.lat,
                        longitude: station.lon
                    )
                }
                let fishingWindMS = selected
                    .compactMap { self.parseWindMetersPerSecond(from: $0.1) }
                    .first
                let fishingWindDisplay = selected
                    .compactMap { self.parseWindDisplay(from: $0.1) }
                    .first
                self.latestFishingWindMS = fishingWindMS
                self.latestFishingWindDisplay = fishingWindDisplay
                self.refreshFishingModel()

                DispatchQueue.main.async {
                    if self.isPremiumUnlocked {
                        self.buoyCards = cards
                        if let selectedID = self.selectedSurfBuoyStationID,
                           cards.contains(where: { $0.stationID == selectedID }) {
                            self.selectedSurfBuoyStationID = selectedID
                        } else {
                            self.selectedSurfBuoyStationID = cards.first?.stationID
                            if let first = cards.first?.stationID {
                                UserDefaults.standard.set(first, forKey: self.selectedSurfBuoyStationIDKey)
                            }
                        }
                        self.buoySummaries = cards.isEmpty ? ["NO RECENT SWELL BUOY OBSERVATIONS"] : cards.map { ([$0.title, "BUOY \($0.stationID)"] + $0.details).joined(separator: "|") }
                    } else {
                        self.buoyCards = []
                        self.buoySummaries = ["UNLOCK PREMIUM TO VIEW SURF & BUOY DATA"]
                    }
                }
            }
        }
    }

    private func parseBuoyLineForCard(raw: String, fallbackTitle: String) -> (title: String, details: [String]) {
        let pieces = raw
            .split(separator: "|")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines).uppercased() }
            .filter { !$0.isEmpty }

        guard let title = pieces.first else {
            return (fallbackTitle.uppercased(), [])
        }
        return (title, Array(pieces.dropFirst()))
    }
    /// Reads https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt and formats
    /// lines for the `stations` requested. This is the most reliable free feed for
    /// WVHT (wave height), DPD (dominant period), MWD (wave direction), WSPD (wind),
    /// and WTMP (water temp). We match stations by their ID.
    func fetchLatestObs(for stations: [NDBCStation], completion: @escaping ([String]) -> Void) {
        let wanted = Set(stations.map { $0.id.lowercased() })
        guard !wanted.isEmpty else { completion([]); return }

        guard let url = URL(string: "https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt") else {
            completion(stations.map { "\(($0.name ?? $0.id).uppercased())|NO RECENT OBSERVATIONS" })
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            guard error == nil, let data = data, let text = String(data: data, encoding: .utf8) else {
                completion(stations.map { "\(($0.name ?? $0.id).uppercased())|NO RECENT OBSERVATIONS" })
                return
            }

            let lines = text.split(whereSeparator: \.isNewline).map(String.init)
            guard !lines.isEmpty else { completion([]); return }

            // Find the header line (starts with '#' and contains expected columns)
            var headerTokens: [String] = []
            for l in lines {
                if l.hasPrefix("#") {
                    let toks = l.replacingOccurrences(of: "#", with: "")
                        .split { $0.isWhitespace }
                        .map(String.init)
                    // We expect at least STN and WSPD in the header
                    if toks.contains(where: { $0.uppercased() == "STN" }) &&
                       toks.contains(where: { $0.uppercased() == "WSPD" }) {
                        headerTokens = toks
                        break
                    }
                }
            }

            // Helper to find column index by name (case-insensitive)
            func idx(_ key: String) -> Int? {
                headerTokens.firstIndex { $0.uppercased() == key }
            }

            // Column indices (fallback to typical positions if header not found)
            let iSTN  = idx("STN")  ?? 0
            let iWDIR = idx("WDIR") ?? 5
            let iWSPD = idx("WSPD") ?? 6
            let iWVHT = idx("WVHT") ?? 8
            let iDPD  = idx("DPD")  ?? 9
            let iMWD  = idx("MWD")  ?? 11
            let iWTMP = idx("WTMP") ?? 15

            var outByStation: [String: String] = [:]

            // Walk data rows
            for line in lines {
                if line.hasPrefix("#") { continue }                 // skip comments
                let toks = line.split { $0.isWhitespace }.map(String.init)
                if toks.count <= max(iSTN, iWTMP) { continue }

                let stid = toks[iSTN].lowercased()
                guard wanted.contains(stid) else { continue }

                func tok(_ i: Int) -> String { (i < toks.count) ? toks[i] : "MM" }

                let wvhtM = tok(iWVHT)   // meters
                let dpdS  = tok(iDPD)    // seconds
                let mwd   = tok(iMWD)    // degrees
                let wdir  = tok(iWDIR)   // degrees
                let wspdM = tok(iWSPD)   // m/s
                let wtmpC = tok(iWTMP)   // °C

                var details: [String] = []

                if let m = Double(wvhtM) {
                    details.append("SWELL HEIGHT: \(self.formatTideHeight(m, decimals: 1, uppercaseUnit: true))")
                }

                if let s = Double(dpdS) {
                    details.append(String(format: "SWELL PERIOD: %.0f SEC", s))
                }

                if let deg = Double(mwd) {
                    details.append(String(format: "SWELL DIRECTION: %.0f°", deg))
                }

                let windDirectionText: String? = {
                    guard let windDeg = Double(wdir) else { return nil }
                    return self.degToCompass(windDeg)
                }()
                let windSpeedText: String? = {
                    guard let ms = Double(wspdM) else { return nil }
                    return self.formatWind(ms)
                }()

                switch (windDirectionText, windSpeedText) {
                case let (dir?, speed?):
                    details.append("WIND: \(dir) \(speed)")
                case let (dir?, nil):
                    details.append("WIND: \(dir)")
                case let (nil, speed?):
                    details.append("WIND: \(speed)")
                case (nil, nil):
                    details.append("WIND: N/A")
                }

                if let c = Double(wtmpC) {
                    details.append("WATER TEMP: \(self.formatWaterTemp(c))")
                }

                let pretty = (stations.first(where: { $0.id.lowercased() == stid })?.name ?? stid.uppercased()).uppercased()
                let lineOut = ([pretty] + details).joined(separator: "|")
                outByStation[stid] = lineOut
            }

            let ordered = stations.map { station in
                outByStation[station.id.lowercased()] ?? "\((station.name ?? station.id).uppercased())|NO RECENT OBSERVATIONS"
            }
            completion(ordered)
        }.resume()
    }

    private func formatBuoyLine(name: String, obs: NDBCObs?) -> String {
        guard let obs = obs else { return "\(name) — no recent obs" }

        var parts: [String] = []

        if let m = obs.wave_height {
            parts.append("Swell \(formatTideHeight(m, decimals: 1, uppercaseUnit: false))")
        } else { parts.append("Swell n/a") }

        if let s = obs.resolvedDominantPeriodS {
            parts.append(String(format: "@ %.0f s", s))
        }

        if let deg = obs.wave_dir ?? obs.resolvedWindDir {
            parts.append("(\(degToCompass(deg)))")
        }

        if let ms = obs.resolvedWindSpdMS {
            parts.append("• Wind \(formatWind(ms).lowercased())")
        }

        if let c = obs.resolvedWaterTempC {
            parts.append("• Water \(formatWaterTemp(c))")
        }

        return ([name, "—"] + parts).joined(separator: " ")
            .replacingOccurrences(of: "  ", with: " ")
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private func degToCompass(_ deg: Double) -> String {
        let dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE",
                    "S","SSW","SW","WSW","W","WNW","NW","NNW"]
        let idx = Int((deg / 22.5).rounded()) & 15
        return dirs[idx]
    }

    // MARK: - Stations list (1h cache)
    private func fetchNearestNDBCStations(to coord: CLLocationCoordinate2D, count: Int, completion: @escaping ([NDBCStation]) -> Void) {
        let stationsURL = URL(string: "https://www.ndbc.noaa.gov/activestations.xml")!
        let key = "ndbc-stations-active-xml:v2"

        if let cached = APITideCache.shared.load(key: key) {
            let stations = parseNDBCStationsXML(cached)
            if !stations.isEmpty {
                completion(closestStations(from: stations, to: coord, count: count))
                return
            }
        }

        URLSession.shared.dataTask(with: stationsURL) { [weak self] data, _, _ in
            guard let self = self else { return }

            if let data = data {
                let stations = self.parseNDBCStationsXML(data)
                if !stations.isEmpty {
                    APITideCache.shared.save(key: key, data: data, ttlSeconds: 3600)
                    completion(self.closestStations(from: stations, to: coord, count: count))
                    return
                }
            }

            // If active station feed fails, avoid fake regional data.
            completion([])
        }.resume()
    }

    private func parseNDBCStationsXML(_ data: Data) -> [NDBCStation] {
        guard let xml = String(data: data, encoding: .utf8) else { return [] }

        let stationPattern = #"<station\s+([^>]*?)\/?>"#
        let attrPattern = #"([a-zA-Z_]+)="([^"]*)""#

        guard let stationRegex = try? NSRegularExpression(pattern: stationPattern),
              let attrRegex = try? NSRegularExpression(pattern: attrPattern) else {
            return []
        }

        let fullRange = NSRange(xml.startIndex..<xml.endIndex, in: xml)
        let stationMatches = stationRegex.matches(in: xml, range: fullRange)

        var stations: [NDBCStation] = []
        stations.reserveCapacity(stationMatches.count)

        for match in stationMatches {
            guard let attrsRange = Range(match.range(at: 1), in: xml) else { continue }
            let attrs = String(xml[attrsRange])
            let attrsFullRange = NSRange(attrs.startIndex..<attrs.endIndex, in: attrs)
            let attrMatches = attrRegex.matches(in: attrs, range: attrsFullRange)

            var map: [String: String] = [:]
            for attrMatch in attrMatches {
                guard let keyRange = Range(attrMatch.range(at: 1), in: attrs),
                      let valRange = Range(attrMatch.range(at: 2), in: attrs) else { continue }
                map[String(attrs[keyRange])] = String(attrs[valRange])
            }

            guard let id = map["id"],
                  let latRaw = map["lat"], let lat = Double(latRaw),
                  let lonRaw = map["lon"], let lon = Double(lonRaw) else { continue }

            stations.append(
                NDBCStation(
                    id: id,
                    lat: lat,
                    lon: lon,
                    name: map["name"],
                    owner: map["owner"],
                    type: map["type"]
                )
            )
        }

        return stations
    }

    private func closestStations(from stations: [NDBCStation], to coord: CLLocationCoordinate2D, count: Int) -> [NDBCStation] {
        let here = CLLocation(latitude: coord.latitude, longitude: coord.longitude)
        let ranked: [(station: NDBCStation, distance: CLLocationDistance)] = stations
            .map { station in
                let distance = CLLocation(latitude: station.lat, longitude: station.lon).distance(from: here)
                return (station, distance)
            }
            .sorted { $0.distance < $1.distance }

        let expanded = ranked
            .filter { $0.distance <= maxExpandedBuoyDistanceM }
        if !expanded.isEmpty {
            return Array(expanded.prefix(max(1, count)).map(\.station))
        }

        let local = ranked
            .filter { $0.distance <= maxRelevantBuoyDistanceM }
        if !local.isEmpty {
            return Array(local.prefix(max(1, count)).map(\.station))
        }

        return Array(ranked.prefix(max(1, count)).map(\.station))
    }

    private func isOffshoreCandidate(_ station: NDBCStation, distanceM: CLLocationDistance) -> Bool {
        guard !isStronglyInshore(station) else { return false }

        let name = (station.name ?? "").lowercased()
        if hasExplicitOffshoreCue(in: name) {
            return true
        }
        return distanceM >= minOffshoreBuoyDistanceM
    }

    private func priorityRank(for station: NDBCStation, region: SurfBuoyRegion) -> Int {
        let preferredIDs = preferredBuoyIDs(for: region)
        if let idx = preferredIDs.firstIndex(of: station.id.uppercased()) {
            return idx
        }
        return preferredIDs.count + 1
    }

    private func preferredBuoyIDs(for region: SurfBuoyRegion) -> [String] {
        switch region {
        case .atlanticSouth:
            return ["41009", "41010", "41013", "41025", "41001"]
        case .atlanticMidNorth:
            return ["44017", "44025", "44065", "44008", "44011"]
        case .gulf:
            return ["42001", "42002", "42039", "42040"]
        case .westCoast:
            return ["46026", "46013", "46011", "46029", "46059"]
        case .hawaii:
            return ["51001", "51002", "51003", "51004"]
        case .other:
            return []
        }
    }

    private func isPreferredBuoy(_ station: NDBCStation, region: SurfBuoyRegion) -> Bool {
        preferredBuoyIDs(for: region).contains(station.id.uppercased())
    }

    private func mergedPreferredStations(into stations: [NDBCStation], region: SurfBuoyRegion) -> [NDBCStation] {
        var byID = Dictionary(uniqueKeysWithValues: stations.map { ($0.id.uppercased(), $0) })
        for station in preferredNDBCStations(for: region) {
            byID[station.id.uppercased()] = station
        }

        return byID.values.sorted { lhs, rhs in
            let lhsPriority = priorityRank(for: lhs, region: region)
            let rhsPriority = priorityRank(for: rhs, region: region)
            if lhsPriority != rhsPriority {
                return lhsPriority < rhsPriority
            }
            return lhs.id < rhs.id
        }
    }

    private func uniqueBuoyPairs(_ pairs: [(NDBCStation, String)]) -> [(NDBCStation, String)] {
        var seen = Set<String>()
        var unique: [(NDBCStation, String)] = []
        for pair in pairs {
            let id = pair.0.id.uppercased()
            guard !seen.contains(id) else { continue }
            seen.insert(id)
            unique.append(pair)
        }
        return unique
    }

    private func preferredNDBCStations(for region: SurfBuoyRegion) -> [NDBCStation] {
        switch region {
        case .atlanticSouth:
            return [
                NDBCStation(id: "41009", lat: 28.508, lon: -80.185, name: "CANAVERAL 20 NM EAST OF CAPE CANAVERAL, FL", owner: "NDBC", type: "buoy"),
                NDBCStation(id: "41010", lat: 28.878, lon: -78.467, name: "CANAVERAL EAST - 120NM EAST OF CAPE CANAVERAL", owner: "NDBC", type: "buoy"),
                NDBCStation(id: "41013", lat: 33.441, lon: -77.764, name: "FRYING PAN SHOALS, NC", owner: "NDBC", type: "buoy"),
                NDBCStation(id: "41025", lat: 35.026, lon: -75.38, name: "DIAMOND SHOALS, NC", owner: "NDBC", type: "buoy"),
                NDBCStation(id: "41001", lat: 34.791, lon: -72.42, name: "EAST HATTERAS - 150 NM EAST OF CAPE HATTERAS", owner: "NDBC", type: "buoy")
            ]
        case .atlanticMidNorth:
            return []
        case .gulf:
            return []
        case .westCoast:
            return []
        case .hawaii:
            return []
        case .other:
            return []
        }
    }

    private func isStationFacingRegion(_ station: NDBCStation, region: SurfBuoyRegion) -> Bool {
        let id = station.id.uppercased()
        switch region {
        case .atlanticSouth:
            return id.hasPrefix("410")
        case .atlanticMidNorth:
            return id.hasPrefix("440")
        case .gulf:
            return id.hasPrefix("420")
        case .westCoast:
            return id.hasPrefix("460")
        case .hawaii:
            return id.hasPrefix("510")
        case .other:
            return true
        }
    }

    private func isStronglyInshore(_ station: NDBCStation) -> Bool {
        let name = (station.name ?? "").lowercased()
        if hasExplicitOffshoreCue(in: name) {
            return false
        }

        let owner = (station.owner ?? "").lowercased()
        if owner.contains("army corps") {
            return true
        }

        let banned = [
            "nearshore", "near shore", "near-shore", "inlet",
            "harbor", "harbour", "inside", "river", "bay",
            "pier", "jetty", "canal", "lagoon", "sound",
            "channel", "pass", "estuary", "coastal", "intracoastal"
        ]
        return banned.contains { name.contains($0) }
    }

    private func hasExplicitOffshoreCue(in lowercasedName: String) -> Bool {
        if lowercasedName.contains("offshore") || lowercasedName.contains("off shore") || lowercasedName.contains("outer") {
            return true
        }
        return lowercasedName.range(of: #"\b\d+\s*nm\b"#, options: .regularExpression) != nil
    }

    // MARK: - Observations (5 min cache) with TXT fallback
    private func fetchNDBCObservation(stationID: String, completion: @escaping (NDBCObs?) -> Void) {
        let cacheKey = "ndbc-obs-\(stationID):v1"
        if let cached = APITideCache.shared.load(key: cacheKey),
           let obs = try? JSONDecoder().decode(NDBCObs.self, from: cached) {
            completion(obs); return
        }

        // Try JSON first
        if let url = URL(string: "https://www.ndbc.noaa.gov/data/realtime2/\(stationID).json") {
            URLSession.shared.dataTask(with: url) { data, _, _ in
                if let data = data {
                    if let obs = try? JSONDecoder().decode(NDBCObs.self, from: data) {
                        if let enc = try? JSONEncoder().encode(obs) {
                            APITideCache.shared.save(key: cacheKey, data: enc, ttlSeconds: 300)
                        }
                        completion(obs); return
                    } else if let arr = try? JSONDecoder().decode([NDBCObs].self, from: data),
                              let first = arr.first,
                              let enc = try? JSONEncoder().encode(first) {
                        APITideCache.shared.save(key: cacheKey, data: enc, ttlSeconds: 300)
                        completion(first); return
                    }
                }
                // Fallback TXT
                self.fetchNDBCText(stationID: stationID, cacheKey: cacheKey, completion: completion)
            }.resume()
            return
        }
        self.fetchNDBCText(stationID: stationID, cacheKey: cacheKey, completion: completion)
    }

    private func fetchNDBCText(stationID: String, cacheKey: String, completion: @escaping (NDBCObs?) -> Void) {
        guard let url = URL(string: "https://www.ndbc.noaa.gov/data/realtime2/\(stationID).txt") else { completion(nil); return }
        URLSession.shared.dataTask(with: url) { data, _, _ in
            guard let data = data, let raw = String(data: data, encoding: .utf8) else { completion(nil); return }
            let lines = raw.split(separator: "\n").map(String.init)
            guard let headerIdx = lines.firstIndex(where: { $0.hasPrefix("#YY") || $0.contains("YY  MM") }) else { completion(nil); return }
            let header = lines[headerIdx].replacingOccurrences(of: "#", with: "")
            let cols = header.split(separator: " ").filter { !$0.isEmpty }.map(String.init)
            guard let dataLine = lines.dropFirst(headerIdx+1).first else { completion(nil); return }
            let parts = dataLine.split(separator: " ").filter { !$0.isEmpty }.map(String.init)

            func val(_ key: String) -> Double? {
                guard let i = cols.firstIndex(of: key), i < parts.count else { return nil }
                return Double(parts[i])
            }

            let waveH = val("WVHT")
            let dpd   = val("DPD") ?? val("APD")
            let wtmp  = val("WTMP")
            let wdir  = val("WDIR")
            var wspd  = val("WSPD")
            if let s = wspd, s > 60 { wspd = s * 0.514444 } // knots -> m/s best guess

            let obs = NDBCObs(timestamp: nil,
                              wind_dir: wdir, wind_spd: wspd, gust: nil,
                              wave_height: waveH, dominant_wpd: dpd, wave_dir: nil,
                              water_temp: wtmp, air_temp: nil,
                              wdir: nil, wspd: nil, wtmp: nil, atmp: nil, dom_period: nil)

            if let enc = try? JSONEncoder().encode(obs) {
                APITideCache.shared.save(key: cacheKey, data: enc, ttlSeconds: 300)
            }
            completion(obs)
        }.resume()
    }
}
