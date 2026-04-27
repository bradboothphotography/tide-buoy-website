# Tide Buoy App Store Prep

Last updated: April 24, 2026

## Recommended App Description Draft

Tide Buoy helps you quickly check tides, nearby NOAA stations, and offshore buoy conditions with a clean, fast coastal forecast view.

Use Tide Buoy to:
- View current and upcoming tides
- Find nearby tide stations using your current location
- Check buoy and swell conditions
- Save favorite spots
- Unlock premium features for future tide lookahead, map-based spot picking, and expanded buoy access

Tide and buoy data is sourced from public NOAA services, including CO-OPS and NDBC.

Premium Subscription:
- Tide Buoy Premium
- 1-year auto-renewing subscription

Terms of Use: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
Privacy Policy: https://bradboothmedia.com/tidebuoy-support

## Metadata Notes

- `Privacy Policy URL`: Set to `https://bradboothmedia.com/tidebuoy-support`
- `EULA`: If using Apple's standard EULA, keep the App Store Connect default and also include the Terms of Use link in the description for every locale.
- `Subtitle`: Keep it under 30 characters and avoid promises the app does not clearly deliver in the current build.
- `Promotional text`: Avoid mentioning features not currently shipped, especially alerts if they are still gated but not implemented.

## App Privacy Mapping

Use this as the starting point for App Store Connect. These answers should reflect the most inclusive behavior of the shipped app and embedded SDKs.

### Data used to track users

- `Device ID`
  Purpose: `Third-Party Advertising`
  Why: Google AdMob may use advertising identifiers when the user allows App Tracking Transparency.

- `Advertising Data`
  Purpose: `Third-Party Advertising`
  Why: Ad interaction/ad measurement behavior is described in the privacy policy and enabled through AdMob.

### Data linked to the user

- `Precise Location`
  Purposes: `App Functionality`
  Why: Used to find nearby tide stations and buoy data.

- `Purchase History`
  Purposes: `App Functionality`
  Why: StoreKit purchase state is used to unlock premium access and restore purchases.

### Data not linked to the user or third-party collected data

- `Product Interaction`
  Purposes: `Third-Party Advertising`
  Why: AdMob may collect ad interaction data.

- `Diagnostics`
  Types: `Crash Data`, `Performance Data`
  Purposes: `Analytics`, `App Functionality`
  Why: Covered by the live privacy policy for reliability and performance.

### Usually not declared from this codebase alone

- `Saved spots`
  Reason: Stored locally on device with `UserDefaults`; not clearly transmitted to your server from this app code.

- `NOAA request data`
  Reason: Apple says request-only transmission that is not retained beyond servicing the request does not need to be declared as collected.

## Local Evidence

- Privacy manifest added for required-reason API usage:
  [Tide Buoy/PrivacyInfo.xcprivacy](/Users/bradboothair/Documents/App/Tide%20Buoy/Tide%20Buoy/PrivacyInfo.xcprivacy)

- `UserDefaults` usage requiring manifest coverage:
  [ViewModels/TideViewModel.swift](/Users/bradboothair/Documents/App/Tide%20Buoy/ViewModels/TideViewModel.swift:1137)

- ATT and ads:
  [Tide Buoy/AdTrackingConsentManager.swift](/Users/bradboothair/Documents/App/Tide%20Buoy/Tide%20Buoy/AdTrackingConsentManager.swift:23)
  [Tide Buoy/AdBannerView.swift](/Users/bradboothair/Documents/App/Tide%20Buoy/Tide%20Buoy/AdBannerView.swift:8)

- Subscription paywall details:
  [Views/HomeView.swift](/Users/bradboothair/Documents/App/Tide%20Buoy/Views/HomeView.swift:1025)

- Usage strings:
  [Tide-Buoy-Info.plist](/Users/bradboothair/Documents/App/Tide%20Buoy/Tide-Buoy-Info.plist:14)

- Live privacy/support page source:
  [PRIVACY_POLICY.md](/Users/bradboothair/Documents/App/Tide%20Buoy/PRIVACY_POLICY.md)

## Final Manual Checklist

- Confirm the App Store Connect privacy answers match Google AdMob's current SDK behavior.
- Confirm the App Store description for every locale includes the Terms of Use and Privacy Policy links.
- Confirm App Store screenshots and preview videos show only shipped features.
- Confirm any mention of alerts is removed from metadata until the feature is live.
