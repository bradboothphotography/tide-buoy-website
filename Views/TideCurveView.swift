import SwiftUI

struct TideCurveView: View {
    let points: [CGPoint]
    let markers: [TideChartMarker]
    let currentX: CGFloat
    let showCurrentTimeLine: Bool
    let scrubInfoProvider: (CGFloat) -> TideScrubInfo?
    @Binding var selectedMarkerID: TideChartMarker.ID?
    @Binding var scrubXFrac: CGFloat?

    private let brandStroke = Color(red: 0.137, green: 0.267, blue: 0.408)

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                GeometryReader { geo in
                    let chartFrame = chartMetrics(for: geo.size)
                    let currentLineX = chartFrame.minX + (max(0, min(1, currentX)) * chartFrame.width)

                    ZStack(alignment: .topLeading) {
                        Rectangle()
                            .fill(Color.clear)
                            .contentShape(Rectangle())
                            .gesture(
                                DragGesture(minimumDistance: 8)
                                    .onChanged { drag in
                                        let normalized = (drag.location.x - chartFrame.minX) / chartFrame.width
                                        scrubXFrac = max(0, min(1, normalized))
                                        selectedMarkerID = nil
                                    }
                                    .onEnded { _ in
                                        scrubXFrac = nil
                                    }
                            )

                        Canvas { ctx, _ in
                            let scaledPoints = points.map { point in
                                CGPoint(
                                    x: chartFrame.minX + (point.x * chartFrame.width),
                                    y: chartFrame.minY + (point.y * chartFrame.height)
                                )
                            }

                            guard scaledPoints.count > 1 else { return }

                            var curve = Path()
                            curve.move(to: scaledPoints[0])
                            for point in scaledPoints.dropFirst() {
                                curve.addLine(to: point)
                            }
                            ctx.stroke(curve, with: .color(.black), style: StrokeStyle(lineWidth: 5, lineCap: .round, lineJoin: .round))

                            let guideFractions: [CGFloat] = [0.25, 0.5, 0.75]
                            for fraction in guideFractions {
                                let y = chartFrame.minY + (fraction * chartFrame.height)
                                var guide = Path()
                                guide.move(to: CGPoint(x: chartFrame.minX, y: y))
                                guide.addLine(to: CGPoint(x: chartFrame.maxX, y: y))
                                let opacity = (fraction == 0.5) ? 0.42 : 0.2
                                let lineWidth: CGFloat = (fraction == 0.5) ? 1.35 : 1.0
                                ctx.stroke(guide, with: .color(.black.opacity(opacity)), lineWidth: lineWidth)
                            }

                            if showCurrentTimeLine {
                                var timeLine = Path()
                                timeLine.move(to: CGPoint(x: currentLineX, y: chartFrame.minY))
                                timeLine.addLine(to: CGPoint(x: currentLineX, y: chartFrame.maxY))
                                ctx.stroke(timeLine, with: .color(.red), lineWidth: 2)
                            }

                            if let scrubXFrac {
                                let dragX = chartFrame.minX + (max(0, min(1, scrubXFrac)) * chartFrame.width)
                                var dragLine = Path()
                                dragLine.move(to: CGPoint(x: dragX, y: chartFrame.minY))
                                dragLine.addLine(to: CGPoint(x: dragX, y: chartFrame.maxY))
                                ctx.stroke(dragLine, with: .color(.gray.opacity(0.9)), lineWidth: 1.6)
                            }

                            var border = Path()
                            border.addRect(chartFrame)
                            ctx.stroke(border, with: .color(brandStroke), lineWidth: 6)
                        }
                        .allowsHitTesting(false)

                        ForEach(markers) { marker in
                            let point = markerPosition(marker, in: chartFrame)

                            Button {
                                scrubXFrac = nil
                                selectedMarkerID = (selectedMarkerID == marker.id) ? nil : marker.id
                            } label: {
                                ZStack {
                                    Circle()
                                        .fill(Color.clear)
                                        .frame(width: 28, height: 28)

                                    Circle()
                                        .fill(Color.black)
                                        .frame(width: 10, height: 10)
                                        .overlay(
                                            Circle()
                                                .stroke(Color.black, lineWidth: 0.75)
                                        )
                                }
                            }
                            .position(point)
                            .buttonStyle(.plain)
                            .accessibilityLabel("\(marker.type) tide")
                            .accessibilityValue("\(marker.timeText), \(marker.heightText)")
                            .accessibilityHint("Shows the tide event details.")
                            .zIndex(selectedMarkerID == marker.id ? 2 : 1)
                        }

                        if let scrubXFrac,
                           let scrubInfo = scrubInfoProvider(scrubXFrac) {
                            scrubTooltip(
                                info: scrubInfo,
                                xFrac: scrubXFrac,
                                in: chartFrame
                            )
                        }

                        if scrubXFrac == nil,
                           let selectedMarker = markers.first(where: { $0.id == selectedMarkerID }) {
                            tooltip(for: selectedMarker, in: chartFrame)
                        }
                    }
                }
                .frame(height: 260)
            }

            HStack {
                Text("12AM")
                Spacer()
                Text("6AM")
                Spacer()
                Text("12PM")
                Spacer()
                Text("6PM")
                Spacer()
                Text("12AM")
            }
            .font(.custom("Calder-LC", size: 15))
            .foregroundColor(.black)
            .padding(.horizontal, 2)
        }
        .onChange(of: markers.map(\.id)) { _, _ in
            if let selectedMarkerID, !markers.contains(where: { $0.id == selectedMarkerID }) {
                self.selectedMarkerID = nil
            }
        }
    }

    private func chartMetrics(for size: CGSize) -> CGRect {
        CGRect(x: 8, y: 8, width: max(0, size.width - 16), height: max(0, size.height - 16))
    }

    private func markerPosition(_ marker: TideChartMarker, in frame: CGRect) -> CGPoint {
        CGPoint(
            x: frame.minX + (marker.x * frame.width),
            y: frame.minY + (marker.y * frame.height)
        )
    }

    @ViewBuilder
    private func tooltip(for marker: TideChartMarker, in frame: CGRect) -> some View {
        let point = markerPosition(marker, in: frame)
        let width: CGFloat = 132
        let height: CGFloat = 72
        let x = min(max(frame.minX + (width / 2), point.x), frame.maxX - (width / 2))
        let prefersBelow = marker.y < 0.35
        let y = prefersBelow
            ? min(frame.maxY - (height / 2), point.y + 54)
            : max(frame.minY + (height / 2), point.y - 54)

        VStack(spacing: 2) {
            Text("\(marker.type.uppercased()) TIDE")
                .font(.custom("Calder-LC", size: 12))
                .foregroundColor(.black.opacity(0.75))
            Text(marker.timeText)
                .font(.custom("Calder-LC", size: 16))
                .foregroundColor(.black)
            Text(marker.heightText)
                .font(.custom("Calder-LC", size: 14))
                .foregroundColor(.black.opacity(0.8))
        }
        .frame(width: width, height: height)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.white)
                .shadow(color: .black.opacity(0.15), radius: 10, y: 3)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(brandStroke.opacity(0.25), lineWidth: 1)
        )
        .position(x: x, y: y)
    }

    @ViewBuilder
    private func scrubTooltip(info: TideScrubInfo, xFrac: CGFloat, in frame: CGRect) -> some View {
        let clampedX = max(0, min(1, xFrac))
        let point = CGPoint(
            x: frame.minX + (clampedX * frame.width),
            y: frame.minY + (interpolatedCurveY(at: clampedX) * frame.height)
        )
        let width: CGFloat = 132
        let height: CGFloat = 66
        let x = min(max(frame.minX + (width / 2), point.x), frame.maxX - (width / 2))
        let prefersBelow = point.y < frame.midY
        let y = prefersBelow
            ? min(frame.maxY - (height / 2), point.y + 48)
            : max(frame.minY + (height / 2), point.y - 48)

        VStack(spacing: 2) {
            Text("ESTIMATED TIDE")
                .font(.custom("Calder-LC", size: 11))
                .foregroundColor(.black.opacity(0.72))
            Text(info.timeText)
                .font(.custom("Calder-LC", size: 16))
                .foregroundColor(.black)
            Text(info.heightText)
                .font(.custom("Calder-LC", size: 14))
                .foregroundColor(.black.opacity(0.82))
        }
        .frame(width: width, height: height)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.white)
                .shadow(color: .black.opacity(0.15), radius: 10, y: 3)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(brandStroke.opacity(0.25), lineWidth: 1)
        )
        .position(x: x, y: y)
    }

    private func interpolatedCurveY(at x: CGFloat) -> CGFloat {
        guard !points.isEmpty else { return 0.5 }
        let sorted = points.sorted { $0.x < $1.x }
        if x <= sorted[0].x { return sorted[0].y }
        if let last = sorted.last, x >= last.x { return last.y }

        guard let upperIndex = sorted.firstIndex(where: { $0.x >= x }), upperIndex > 0 else {
            return sorted[0].y
        }

        let a = sorted[upperIndex - 1]
        let b = sorted[upperIndex]
        let span = max(b.x - a.x, 0.0001)
        let u = max(0, min(1, (x - a.x) / span))
        return a.y + ((b.y - a.y) * u)
    }
}
