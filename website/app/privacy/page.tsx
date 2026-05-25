import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tide Buoy",
  description: "Read the Tide Buoy privacy policy for location, advertising, diagnostics, subscriptions, and app data usage."
};

export default function PrivacyPage() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Tide buoy privacy policy</p>
        <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">Privacy Policy for Tide Buoy</h1>
        <div className="mt-10 space-y-8 rounded-[2rem] border border-[var(--outline)] bg-white p-8 leading-8 text-[var(--muted)] md:p-10">
          <section>
            <p>
              <strong>Effective Date:</strong> April 22, 2026
            </p>
            <p className="mt-4">
              Tide Buoy ("we," "our," or "us") respects your privacy. This Privacy Policy explains what information we collect, how we
              use it, and your choices when using the Tide Buoy mobile app.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">1. Information We Collect</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>Precise Location</strong> with your permission, used to find nearby tide stations, offshore buoy data, map
                locations, and saved spots.
              </li>
              <li>
                <strong>Saved Spot Data</strong> such as saved spot names and coordinates that you choose to save in the app.
              </li>
              <li>
                <strong>Identifiers and Advertising Data</strong> such as device advertising identifiers and ad interaction data
                processed by Google AdMob in the free version of the app.
              </li>
              <li>
                <strong>Usage Data</strong> such as app interactions and feature usage.
              </li>
              <li>
                <strong>Diagnostics</strong> such as crash reports, performance data, and reliability information.
              </li>
              <li>
                <strong>Purchase Data</strong> such as subscription, lifetime unlock, and tip purchase status through Apple StoreKit.
                We do not receive your full payment card details.
              </li>
            </ul>
            <p className="mt-4">We do not require account creation and do not collect passwords.</p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">2. How We Use Information</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>Provide tide and buoy features based on your selected or current location.</li>
              <li>Find nearby NOAA tide stations, buoy readings, and ocean condition data.</li>
              <li>Save and restore spots you choose to store in the app.</li>
              <li>Operate subscriptions, lifetime unlocks, support tips, and purchase restoration.</li>
              <li>Show ads in the free version of the app.</li>
              <li>Improve app stability and performance.</li>
              <li>Prevent abuse and troubleshoot issues.</li>
            </ul>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">3. Advertising and Tracking</h2>
            <p className="mt-4">Tide Buoy uses Google AdMob for ads in the free version of the app.</p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                If you allow App Tracking Transparency permission, ad-related identifiers may be used for personalized ads and ad
                measurement.
              </li>
              <li>
                If you deny App Tracking Transparency permission, ads may still be shown, but they may be less personalized.
              </li>
              <li>
                Tide Buoy asks for App Tracking Transparency permission before starting Google Mobile Ads and before loading banner ads.
              </li>
              <li>
                Tide Buoy does not intentionally send your precise GPS coordinates to Google AdMob. Precise location is used for app
                functionality, such as finding nearby tide stations and buoy data.
              </li>
            </ul>
            <p className="mt-4">
              Google AdMob may process information such as device identifiers, advertising data, general location derived from IP
              address, performance data, crash data, and ad interaction data according to Google's policies.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">4. Data Sources</h2>
            <p className="mt-4">
              Tide and buoy information is sourced from public NOAA services, including CO-OPS and NDBC. These data sources provide
              environmental information, not personal account data.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">5. Sharing of Information</h2>
            <p className="mt-4">
              We may share limited data with service providers that help operate the app, including:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>Apple services, including StoreKit, TestFlight, App Store distribution, and platform permission systems.</li>
              <li>Google AdMob for ad delivery, measurement, fraud prevention, and advertising-related analytics.</li>
              <li>NOAA public data endpoints for tide, buoy, station, and ocean condition information.</li>
            </ul>
            <p className="mt-4">We do not sell personal information for money.</p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">6. Data Retention</h2>
            <p className="mt-4">
              We retain data only as long as needed for app functionality, legal obligations, diagnostics, and reliability purposes.
              Some data may be retained by Apple or Google under their own policies.
            </p>
            <p className="mt-4">
              Tide Buoy stores saved spots and cached tide or buoy data on your device. Cached API data is temporary and may be removed
              automatically. You can remove locally stored app data by deleting the app from your device.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">7. Your Choices</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>Disable location access in iOS Settings.</li>
              <li>Disable tracking permission in iOS Settings under Privacy &amp; Security &gt; Tracking.</li>
              <li>Manage subscriptions in your Apple ID subscription settings.</li>
              <li>Purchase premium access to remove ads where available.</li>
              <li>Delete locally stored app data by uninstalling the app.</li>
            </ul>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">8. Children&apos;s Privacy</h2>
            <p className="mt-4">
              Tide Buoy is not directed to children under 13, and we do not knowingly collect personal information from children under 13.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">9. Regional Rights</h2>
            <p className="mt-4">
              Depending on your location, you may have rights related to access, deletion, correction, or limitation of personal data.
              Contact us to request assistance.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">10. Changes to This Policy</h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. We will post the updated version with a new effective date on the Tide
              Buoy support and privacy page.
            </p>
          </section>
          <section>
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">11. Contact Us</h2>
            <p className="mt-4">For support or privacy questions, visit:</p>
            <p className="mt-2">
              <a
                href="https://bradboothmedia.com/tidebuoy-support"
                className="font-semibold text-[var(--primary)]"
              >
                https://bradboothmedia.com/tidebuoy-support
              </a>
            </p>
            <p className="mt-4">You can also contact us at:</p>
            <p className="mt-2">
              <a href="mailto:bradboothphotography@gmail.com" className="font-semibold text-[var(--primary)]">
                bradboothphotography@gmail.com
              </a>
            </p>
            <p className="mt-4">by using Tide Buoy you agree to this.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
