import math, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONT = sys.argv[1]
font = TTFont(FONT)
gs = font.getGlyphSet(); cmap = font.getBestCmap()

def glyph_path(ch, cx, cy, height):
    """Return path for glyph ch scaled so cap height == height, centred at (cx, cy) (SVG coords)."""
    name = cmap[ord(ch)]
    bp = BoundsPen(gs); gs[name].draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    s = height / (ymax - ymin)
    w = (xmax - xmin) * s
    # flip y: svg_y = cy + h/2 - (y - ymin)*s
    tx = cx - w / 2 - xmin * s
    ty = cy + height / 2 + ymin * s
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip('0').rstrip('.'))
    gs[name].draw(TransformPen(pen, (s, 0, 0, -s, tx, ty)))
    return pen.getCommands()

def f(v): return f"{v:.2f}".rstrip('0').rstrip('.')

def leaf(x, y, ang, L, W):
    # almond leaf from (x,y) pointing at angle ang (radians, svg coords)
    ca, sa = math.cos(ang), math.sin(ang)
    def P(u, v): return (x + u * ca - v * sa, y + u * sa + v * ca)
    p1 = P(L * 0.5, W); p2 = P(L, 0); p3 = P(L * 0.5, -W)
    return f"M{f(x)} {f(y)}Q{f(p1[0])} {f(p1[1])} {f(p2[0])} {f(p2[1])}Q{f(p3[0])} {f(p3[1])} {f(x)} {f(y)}Z"

CX, CY, RX, RY = 100, 98, 68, 80
R = RX
def pt(theta): return (CX + RX * math.cos(theta), CY - RY * math.sin(theta))

def branch(side):
    # side = -1 left, +1 right. theta in math coords (y up).
    start, end = math.radians(-90 + 22 * -side * -1), None
    # left branch: from -68deg (right of bottom) sweeping clockwise through 180 to 118
    if side < 0: t0, t1 = math.radians(-90), math.radians(-238)
    else:        t0, t1 = math.radians(-90), math.radians(58)
    leaves, stem = [], []
    N = 10
    # stem as polyline approximated by arc command
    a, b = pt(t0), pt(t1)
    sweep = 1 if side < 0 else 0
    # crossed tail below the wreath: left stem continues down-right, right stem down-left
    tail = (a[0] + 9 * -side, a[1] + 8)
    stem = f"M{f(tail[0])} {f(tail[1])}L{f(a[0])} {f(a[1])}A{RX} {RY} 0 0 {sweep} {f(b[0])} {f(b[1])}"
    for i in range(N):
        t = 0.1 + 0.9 * i / (N - 1)
        th = t0 + (t1 - t0) * t
        x, y = pt(th)
        # tangent direction in svg coords pointing toward the tip
        d = 1 if (t1 - t0) > 0 else -1
        tx, ty = -RX * math.sin(th) * d, -RY * math.cos(th) * d
        tang = math.atan2(ty, tx)
        size = 1 - 0.45 * t
        L, W = 18 * size, 5.6 * size
        # outward normal: away from centre
        for off in (+0.62, -0.62):
            leaves.append(leaf(x, y, tang + off, L, W))
    # tip leaf
    th = t1; x, y = pt(th)
    d = 1 if (t1 - t0) > 0 else -1
    tang = math.atan2(-RY * math.cos(th) * d, -RX * math.sin(th) * d)
    leaves.append(leaf(x, y, tang, 12, 3.4))
    return stem, leaves

stems, leaves = [], []
for s in (-1, 1):
    st, lv = branch(s); stems.append(st); leaves += lv

C = glyph_path('C', 88, 86, 64)
G = glyph_path('G', 113, 114, 64)
out = {
  'stems': ' '.join(stems),
  'leaves': ''.join(leaves),
  'C': C, 'G': G,
}
import json; print(json.dumps(out))
