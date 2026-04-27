import Combine
import Foundation

#if canImport(AppTrackingTransparency)
import AppTrackingTransparency
#endif

#if canImport(GoogleMobileAds)
import GoogleMobileAds
#endif

@MainActor
final class AdTrackingConsentManager: ObservableObject {
    static let shared = AdTrackingConsentManager()

    @Published private(set) var canLoadAds = false

    private var didPrepareAds = false
    private var didStartMobileAds = false

    private init() {}

    func prepareAds() {
        guard !didPrepareAds else { return }
        didPrepareAds = true

        #if canImport(GoogleMobileAds)
        guard hasGoogleMobileAdsAppID else {
            canLoadAds = false
            return
        }

        #if canImport(AppTrackingTransparency)
        if ATTrackingManager.trackingAuthorizationStatus == .notDetermined {
            ATTrackingManager.requestTrackingAuthorization { [weak self] _ in
                Task { @MainActor in
                    self?.startMobileAds()
                }
            }
        } else {
            startMobileAds()
        }
        #else
        startMobileAds()
        #endif
        #else
        canLoadAds = false
        #endif
    }

    #if canImport(GoogleMobileAds)
    private var hasGoogleMobileAdsAppID: Bool {
        let appID = (Bundle.main.object(forInfoDictionaryKey: "GADApplicationIdentifier") as? String)?
            .trimmingCharacters(in: .whitespacesAndNewlines)
        return appID?.isEmpty == false
    }

    private func startMobileAds() {
        guard !didStartMobileAds else {
            canLoadAds = true
            return
        }

        didStartMobileAds = true
        MobileAds.shared.start(completionHandler: nil)
        canLoadAds = true
    }
    #endif
}
