//
//  Tide_BuoyApp.swift
//  Tide Buoy
//
//  Created by Brad Booth on 8/1/25.
//

import SwiftUI
import CoreText
#if canImport(UIKit)
import UIKit
#endif

@main
struct Tide_BuoyApp: App {
    init() {
        Self.registerCalderFont()
        #if DEBUG
        if UIFont(name: "Calder-LC", size: 18) == nil {
            print("Calder-LC font did not load.")
        } else {
            print("Calder-LC font loaded.")
        }
        #endif
    }

    var body: some Scene {
        WindowGroup {
            HomeView()
                .preferredColorScheme(.light)
                .task {
                    AdTrackingConsentManager.shared.prepareAds()
                }
        }
    }

    private static func registerCalderFont() {
        let bundledURL =
            Bundle.main.url(forResource: "Calder-LC", withExtension: "ttf", subdirectory: "Fonts")
            ?? Bundle.main.url(forResource: "Calder-LC", withExtension: "ttf")

        guard let fontURL = bundledURL else { return }
        var error: Unmanaged<CFError>?
        _ = CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, &error)
    }
}
