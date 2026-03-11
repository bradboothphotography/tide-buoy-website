import Foundation

struct TidePoint: Identifiable {
    let id = UUID()
    let time: Date
    let height: Double
}
