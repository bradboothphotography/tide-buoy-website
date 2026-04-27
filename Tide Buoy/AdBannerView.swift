import SwiftUI
import UIKit
#if canImport(GoogleMobileAds)
import GoogleMobileAds
#endif

enum AdMobConfig {
    // Live AdMob IDs.
    static let appID = "ca-app-pub-6342044419043640~8787733920"
    private static let liveBannerAdUnitID = "ca-app-pub-6342044419043640/2151153329"
    private static let debugTestBannerAdUnitID = "ca-app-pub-3940256099942544/2435281174"

    static var bannerAdUnitID: String {
        #if DEBUG
        // Always show test ads while developing to avoid invalid traffic.
        return debugTestBannerAdUnitID
        #else
        return liveBannerAdUnitID
        #endif
    }
}

struct AdBannerContainerView: View {
    @ObservedObject private var adConsentManager = AdTrackingConsentManager.shared

    var body: some View {
        #if canImport(GoogleMobileAds)
        if adConsentManager.canLoadAds {
            AdMobBannerRepresentable(adUnitID: AdMobConfig.bannerAdUnitID)
                .frame(height: 50)
        }
        #else
        EmptyView()
        #endif
    }
}

#if canImport(GoogleMobileAds)
private struct AdMobBannerRepresentable: UIViewRepresentable {
    let adUnitID: String

    final class Coordinator {
        var didLoad = false
    }

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> BannerView {
        let banner = BannerView(adSize: AdSizeBanner)
        banner.adUnitID = adUnitID
        if let rootVC = UIApplication.topViewController() {
            banner.rootViewController = rootVC
        }
        return banner
    }

    func updateUIView(_ uiView: BannerView, context: Context) {
        guard uiView.rootViewController == nil || !context.coordinator.didLoad else { return }
        if let rootVC = UIApplication.topViewController() {
            uiView.rootViewController = rootVC
            if !context.coordinator.didLoad {
                context.coordinator.didLoad = true
                uiView.load(Request())
            }
        }
    }
}

private extension UIApplication {
    static func topViewController(
        base: UIViewController? = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first(where: \.isKeyWindow)?
            .rootViewController
    ) -> UIViewController? {
        if let nav = base as? UINavigationController {
            return topViewController(base: nav.visibleViewController)
        }
        if let tab = base as? UITabBarController, let selected = tab.selectedViewController {
            return topViewController(base: selected)
        }
        if let presented = base?.presentedViewController {
            return topViewController(base: presented)
        }
        return base
    }
}
#endif
