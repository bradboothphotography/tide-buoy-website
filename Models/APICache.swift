import Foundation
import CryptoKit

/// Very small disk cache for API responses.
/// Stores raw Data with an expiry timestamp in the Caches directory.
final class APICache {

    static let shared = APICache()
    private init() {
        try? FileManager.default.createDirectory(at: cacheDir, withIntermediateDirectories: true)
        purgeExpired()
    }

    private let cacheFolderName = "APICache"
    private var cacheDir: URL {
        let dir = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
        return dir.appendingPathComponent(cacheFolderName, isDirectory: true)
    }

    private struct Entry: Codable {
        let expiresAt: Date
        let payload: Data
    }

    /// Save raw data with a TTL (seconds)
    func save(key: String, data: Data, ttlSeconds: TimeInterval) {
        let entry = Entry(expiresAt: Date().addingTimeInterval(ttlSeconds), payload: data)
        let url = path(for: key)
        do {
            let blob = try JSONEncoder().encode(entry)
            try blob.write(to: url, options: .atomic)
        } catch {
            // Swallow cache write errors — never fail the app
            #if DEBUG
            print("APICache save error:", error)
            #endif
        }
    }

    /// Load raw data if not expired
    func load(key: String) -> Data? {
        let url = path(for: key)
        guard let data = try? Data(contentsOf: url) else { return nil }
        guard let entry = try? JSONDecoder().decode(Entry.self, from: data) else { return nil }
        if entry.expiresAt > Date() {
            return entry.payload
        } else {
            // Expired — remove file
            try? FileManager.default.removeItem(at: url)
            return nil
        }
    }

    /// Optional: clear anything expired on startup
    func purgeExpired() {
        guard let files = try? FileManager.default.contentsOfDirectory(at: cacheDir, includingPropertiesForKeys: nil) else { return }
        for file in files {
            guard let data = try? Data(contentsOf: file),
                  let entry = try? JSONDecoder().decode(Entry.self, from: data) else { continue }
            if entry.expiresAt <= Date() {
                try? FileManager.default.removeItem(at: file)
            }
        }
    }

    // MARK: - Helpers
    private func path(for key: String) -> URL {
        // Hash the key to a safe filename
        let digest = Insecure.MD5.hash(data: Data(key.utf8))
        let hex = digest.map { String(format: "%02hhx", $0) }.joined()
        return cacheDir.appendingPathComponent(hex + ".json")
    }
}//
//  APICache.swift
//  Tide Buoy
//
//  Created by Brad Booth on 8/11/25.
//

