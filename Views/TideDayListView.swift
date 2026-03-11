import SwiftUI

struct TideDayListView: View {
    let rows: [TideRow]

    private let brandStroke = Color(red: 0.137, green: 0.267, blue: 0.408)

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            ForEach(rows) { row in
                HStack {
                    Text("\(row.time.uppercased()) \(row.type.uppercased())")
                        .font(.custom("Calder-LC", size: 18))
                        .foregroundColor(.black)
                    Spacer()
                    Text(row.height.uppercased())
                        .font(.custom("Calder-LC", size: 18))
                        .foregroundColor(.black)
                }
                .padding(.vertical, 1)
            }
        }
        .padding(.vertical, 14)
        .padding(.horizontal, 16)
        .background(
            Rectangle()
                .stroke(brandStroke, lineWidth: 4)
        )
    }
}
