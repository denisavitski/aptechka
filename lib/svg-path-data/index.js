// @license
(!SVGPathElement.prototype.getPathData || !SVGPathElement.prototype.setPathData) && function() {
  var V = {
    Z: "Z",
    M: "M",
    L: "L",
    C: "C",
    Q: "Q",
    A: "A",
    H: "H",
    V: "V",
    S: "S",
    T: "T",
    z: "Z",
    m: "m",
    l: "l",
    c: "c",
    q: "q",
    a: "a",
    h: "h",
    v: "v",
    s: "s",
    t: "t"
  }, M = function(n) {
    this._string = n, this._currentIndex = 0, this._endIndex = this._string.length, this._prevCommand = null, this._skipOptionalSpaces();
  }, E = window.navigator.userAgent.indexOf("MSIE ") !== -1;
  M.prototype = {
    parseSegment: function() {
      var n = this._string[this._currentIndex], t = V[n] ? V[n] : null;
      if (t === null) {
        if (this._prevCommand === null || ((n === "+" || n === "-" || n === "." || n >= "0" && n <= "9") && this._prevCommand !== "Z" ? this._prevCommand === "M" ? t = "L" : this._prevCommand === "m" ? t = "l" : t = this._prevCommand : t = null, t === null))
          return null;
      } else
        this._currentIndex += 1;
      this._prevCommand = t;
      var e = null, s = t.toUpperCase();
      return s === "H" || s === "V" ? e = [this._parseNumber()] : s === "M" || s === "L" || s === "T" ? e = [this._parseNumber(), this._parseNumber()] : s === "S" || s === "Q" ? e = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ] : s === "C" ? e = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ] : s === "A" ? e = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseArcFlag(),
        this._parseArcFlag(),
        this._parseNumber(),
        this._parseNumber()
      ] : s === "Z" && (this._skipOptionalSpaces(), e = []), e === null || e.indexOf(null) >= 0 ? null : { type: t, values: e };
    },
    hasMoreData: function() {
      return this._currentIndex < this._endIndex;
    },
    peekSegmentType: function() {
      var n = this._string[this._currentIndex];
      return V[n] ? V[n] : null;
    },
    initialCommandIsMoveTo: function() {
      if (!this.hasMoreData())
        return !0;
      var n = this.peekSegmentType();
      return n === "M" || n === "m";
    },
    _isCurrentSpace: function() {
      var n = this._string[this._currentIndex];
      return n <= " " && (n === " " || n === `
` || n === "	" || n === "\r" || n === "\f");
    },
    _skipOptionalSpaces: function() {
      for (; this._currentIndex < this._endIndex && this._isCurrentSpace(); )
        this._currentIndex += 1;
      return this._currentIndex < this._endIndex;
    },
    _skipOptionalSpacesOrDelimiter: function() {
      return this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string[this._currentIndex] !== "," ? !1 : (this._skipOptionalSpaces() && this._currentIndex < this._endIndex && this._string[this._currentIndex] === "," && (this._currentIndex += 1, this._skipOptionalSpaces()), this._currentIndex < this._endIndex);
    },
    // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from
    // Source/core/svg/SVGParserUtilities.cpp.
    // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
    _parseNumber: function() {
      var n = 0, t = 0, e = 1, s = 0, l = 1, u = 1, a = this._currentIndex;
      if (this._skipOptionalSpaces(), this._currentIndex < this._endIndex && this._string[this._currentIndex] === "+" ? this._currentIndex += 1 : this._currentIndex < this._endIndex && this._string[this._currentIndex] === "-" && (this._currentIndex += 1, l = -1), this._currentIndex === this._endIndex || (this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") && this._string[this._currentIndex] !== ".")
        return null;
      for (var p = this._currentIndex; this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"; )
        this._currentIndex += 1;
      if (this._currentIndex !== p)
        for (var i = this._currentIndex - 1, r = 1; i >= p; )
          t += r * (this._string[i] - "0"), i -= 1, r *= 10;
      if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ".") {
        if (this._currentIndex += 1, this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9")
          return null;
        for (; this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"; )
          e *= 10, s += (this._string.charAt(this._currentIndex) - "0") / e, this._currentIndex += 1;
      }
      if (this._currentIndex !== a && this._currentIndex + 1 < this._endIndex && (this._string[this._currentIndex] === "e" || this._string[this._currentIndex] === "E") && this._string[this._currentIndex + 1] !== "x" && this._string[this._currentIndex + 1] !== "m") {
        if (this._currentIndex += 1, this._string[this._currentIndex] === "+" ? this._currentIndex += 1 : this._string[this._currentIndex] === "-" && (this._currentIndex += 1, u = -1), this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9")
          return null;
        for (; this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"; )
          n *= 10, n += this._string[this._currentIndex] - "0", this._currentIndex += 1;
      }
      var v = t + s;
      return v *= l, n && (v *= Math.pow(10, u * n)), a === this._currentIndex ? null : (this._skipOptionalSpacesOrDelimiter(), v);
    },
    _parseArcFlag: function() {
      if (this._currentIndex >= this._endIndex)
        return null;
      var n = null, t = this._string[this._currentIndex];
      if (this._currentIndex += 1, t === "0")
        n = 0;
      else if (t === "1")
        n = 1;
      else
        return null;
      return this._skipOptionalSpacesOrDelimiter(), n;
    }
  };
  var A = function(n) {
    if (!n || n.length === 0)
      return [];
    var t = new M(n), e = [];
    if (t.initialCommandIsMoveTo())
      for (; t.hasMoreData(); ) {
        var s = t.parseSegment();
        if (s === null)
          break;
        e.push(s);
      }
    return e;
  }, P = SVGPathElement.prototype.setAttribute, S = SVGPathElement.prototype.setAttributeNS, _ = SVGPathElement.prototype.removeAttribute, x = SVGPathElement.prototype.removeAttributeNS, y = window.Symbol ? Symbol() : "__cachedPathData", m = window.Symbol ? Symbol() : "__cachedNormalizedPathData", L = function(n, t, e, s, l, u, a, p, i, r) {
    var v = function(X) {
      return Math.PI * X / 180;
    }, h = function(X, tt, Y) {
      var ht = X * Math.cos(Y) - tt * Math.sin(Y), pt = X * Math.sin(Y) + tt * Math.cos(Y);
      return { x: ht, y: pt };
    }, f = v(a), c = [], d, o, I, b;
    if (r)
      d = r[0], o = r[1], I = r[2], b = r[3];
    else {
      var O = h(n, t, -f);
      n = O.x, t = O.y;
      var T = h(e, s, -f);
      e = T.x, s = T.y;
      var w = (n - e) / 2, C = (t - s) / 2, G = w * w / (l * l) + C * C / (u * u);
      G > 1 && (G = Math.sqrt(G), l = G * l, u = G * u);
      var k;
      p === i ? k = -1 : k = 1;
      var z = l * l, H = u * u, et = z * H - z * C * C - H * w * w, at = z * C * C + H * w * w, q = k * Math.sqrt(Math.abs(et / at));
      I = q * l * C / u + (n + e) / 2, b = q * -u * w / l + (t + s) / 2, d = Math.asin(parseFloat(((t - b) / u).toFixed(9))), o = Math.asin(parseFloat(((s - b) / u).toFixed(9))), n < I && (d = Math.PI - d), e < I && (o = Math.PI - o), d < 0 && (d = Math.PI * 2 + d), o < 0 && (o = Math.PI * 2 + o), i && d > o && (d = d - Math.PI * 2), !i && o > d && (o = o - Math.PI * 2);
    }
    var B = o - d;
    if (Math.abs(B) > Math.PI * 120 / 180) {
      var rt = o, st = e, nt = s;
      i && o > d ? o = d + Math.PI * 120 / 180 * 1 : o = d + Math.PI * 120 / 180 * -1, e = I + l * Math.cos(o), s = b + u * Math.sin(o), c = L(
        e,
        s,
        st,
        nt,
        l,
        u,
        a,
        0,
        i,
        [o, rt, I, b]
      );
    }
    B = o - d;
    var it = Math.cos(d), ut = Math.sin(d), lt = Math.cos(o), vt = Math.sin(o), F = Math.tan(B / 4), j = 4 / 3 * l * F, J = 4 / 3 * u * F, K = [n, t], Z = [n + j * ut, t - J * it], W = [e + j * vt, s - J * lt], U = [e, s];
    if (Z[0] = 2 * K[0] - Z[0], Z[1] = 2 * K[1] - Z[1], r)
      return [Z, W, U].concat(c);
    c = [Z, W, U].concat(c);
    for (var R = [], N = 0; N < c.length; N += 3) {
      var l = h(c[N][0], c[N][1], f), u = h(c[N + 1][0], c[N + 1][1], f), g = h(c[N + 2][0], c[N + 2][1], f);
      R.push([l.x, l.y, u.x, u.y, g.x, g.y]);
    }
    return R;
  }, D = function(n) {
    return n.map(function(t) {
      return {
        type: t.type,
        values: Array.prototype.slice.call(t.values)
      };
    });
  }, $ = function(n) {
    var t = [], e = null, s = null, l = null, u = null;
    return n.forEach(function(a) {
      var p = a.type;
      if (p === "M") {
        var i = a.values[0], r = a.values[1];
        t.push({ type: "M", values: [i, r] }), l = i, u = r, e = i, s = r;
      } else if (p === "m") {
        var i = e + a.values[0], r = s + a.values[1];
        t.push({ type: "M", values: [i, r] }), l = i, u = r, e = i, s = r;
      } else if (p === "L") {
        var i = a.values[0], r = a.values[1];
        t.push({ type: "L", values: [i, r] }), e = i, s = r;
      } else if (p === "l") {
        var i = e + a.values[0], r = s + a.values[1];
        t.push({ type: "L", values: [i, r] }), e = i, s = r;
      } else if (p === "C") {
        var v = a.values[0], h = a.values[1], f = a.values[2], c = a.values[3], i = a.values[4], r = a.values[5];
        t.push({
          type: "C",
          values: [v, h, f, c, i, r]
        }), e = i, s = r;
      } else if (p === "c") {
        var v = e + a.values[0], h = s + a.values[1], f = e + a.values[2], c = s + a.values[3], i = e + a.values[4], r = s + a.values[5];
        t.push({
          type: "C",
          values: [v, h, f, c, i, r]
        }), e = i, s = r;
      } else if (p === "Q") {
        var v = a.values[0], h = a.values[1], i = a.values[2], r = a.values[3];
        t.push({ type: "Q", values: [v, h, i, r] }), e = i, s = r;
      } else if (p === "q") {
        var v = e + a.values[0], h = s + a.values[1], i = e + a.values[2], r = s + a.values[3];
        t.push({ type: "Q", values: [v, h, i, r] }), e = i, s = r;
      } else if (p === "A") {
        var i = a.values[5], r = a.values[6];
        t.push({
          type: "A",
          values: [
            a.values[0],
            a.values[1],
            a.values[2],
            a.values[3],
            a.values[4],
            i,
            r
          ]
        }), e = i, s = r;
      } else if (p === "a") {
        var i = e + a.values[5], r = s + a.values[6];
        t.push({
          type: "A",
          values: [
            a.values[0],
            a.values[1],
            a.values[2],
            a.values[3],
            a.values[4],
            i,
            r
          ]
        }), e = i, s = r;
      } else if (p === "H") {
        var i = a.values[0];
        t.push({ type: "H", values: [i] }), e = i;
      } else if (p === "h") {
        var i = e + a.values[0];
        t.push({ type: "H", values: [i] }), e = i;
      } else if (p === "V") {
        var r = a.values[0];
        t.push({ type: "V", values: [r] }), s = r;
      } else if (p === "v") {
        var r = s + a.values[0];
        t.push({ type: "V", values: [r] }), s = r;
      } else if (p === "S") {
        var f = a.values[0], c = a.values[1], i = a.values[2], r = a.values[3];
        t.push({ type: "S", values: [f, c, i, r] }), e = i, s = r;
      } else if (p === "s") {
        var f = e + a.values[0], c = s + a.values[1], i = e + a.values[2], r = s + a.values[3];
        t.push({ type: "S", values: [f, c, i, r] }), e = i, s = r;
      } else if (p === "T") {
        var i = a.values[0], r = a.values[1];
        t.push({ type: "T", values: [i, r] }), e = i, s = r;
      } else if (p === "t") {
        var i = e + a.values[0], r = s + a.values[1];
        t.push({ type: "T", values: [i, r] }), e = i, s = r;
      } else
        (p === "Z" || p === "z") && (t.push({ type: "Z", values: [] }), e = l, s = u);
    }), t;
  }, Q = function(n) {
    var t = [], e = null, s = null, l = null, u = null, a = null, p = null, i = null;
    return n.forEach(function(r) {
      if (r.type === "M") {
        var v = r.values[0], h = r.values[1];
        t.push({ type: "M", values: [v, h] }), p = v, i = h, u = v, a = h;
      } else if (r.type === "C") {
        var f = r.values[0], c = r.values[1], d = r.values[2], o = r.values[3], v = r.values[4], h = r.values[5];
        t.push({ type: "C", values: [f, c, d, o, v, h] }), s = d, l = o, u = v, a = h;
      } else if (r.type === "L") {
        var v = r.values[0], h = r.values[1];
        t.push({ type: "L", values: [v, h] }), u = v, a = h;
      } else if (r.type === "H") {
        var v = r.values[0];
        t.push({ type: "L", values: [v, a] }), u = v;
      } else if (r.type === "V") {
        var h = r.values[0];
        t.push({ type: "L", values: [u, h] }), a = h;
      } else if (r.type === "S") {
        var d = r.values[0], o = r.values[1], v = r.values[2], h = r.values[3], I, b;
        e === "C" || e === "S" ? (I = u + (u - s), b = a + (a - l)) : (I = u, b = a), t.push({ type: "C", values: [I, b, d, o, v, h] }), s = d, l = o, u = v, a = h;
      } else if (r.type === "T") {
        var v = r.values[0], h = r.values[1], f, c;
        e === "Q" || e === "T" ? (f = u + (u - s), c = a + (a - l)) : (f = u, c = a);
        var I = u + 2 * (f - u) / 3, b = a + 2 * (c - a) / 3, O = v + 2 * (f - v) / 3, T = h + 2 * (c - h) / 3;
        t.push({
          type: "C",
          values: [I, b, O, T, v, h]
        }), s = f, l = c, u = v, a = h;
      } else if (r.type === "Q") {
        var f = r.values[0], c = r.values[1], v = r.values[2], h = r.values[3], I = u + 2 * (f - u) / 3, b = a + 2 * (c - a) / 3, O = v + 2 * (f - v) / 3, T = h + 2 * (c - h) / 3;
        t.push({
          type: "C",
          values: [I, b, O, T, v, h]
        }), s = f, l = c, u = v, a = h;
      } else if (r.type === "A") {
        var w = Math.abs(r.values[0]), C = Math.abs(r.values[1]), G = r.values[2], k = r.values[3], z = r.values[4], v = r.values[5], h = r.values[6];
        if (w === 0 || C === 0)
          t.push({
            type: "C",
            values: [u, a, v, h, v, h]
          }), u = v, a = h;
        else if (u !== v || a !== h) {
          var H = L(
            u,
            a,
            v,
            h,
            w,
            C,
            G,
            k,
            z
          );
          H.forEach(function(q) {
            t.push({ type: "C", values: q });
          }), u = v, a = h;
        }
      } else
        r.type === "Z" && (t.push(r), u = p, a = i);
      e = r.type;
    }), t;
  };
  SVGPathElement.prototype.setAttribute = function(n, t) {
    n === "d" && (this[y] = null, this[m] = null), P.call(this, n, t);
  }, SVGPathElement.prototype.setAttributeNS = function(n, t, e) {
    if (t === "d") {
      var s = "http://www.w3.org/2000/svg";
      if (n)
        for (var l of this.ownerSVGElement.attributes)
          l.name === `xmlns:${n}` && (s = l.value);
      s === "http://www.w3.org/2000/svg" && (this[y] = null, this[m] = null);
    }
    S.call(this, n, t, e);
  }, SVGPathElement.prototype.removeAttribute = function(n, t) {
    n === "d" && (this[y] = null, this[m] = null), _.call(this, n);
  }, SVGPathElement.prototype.removeAttributeNS = function(n, t) {
    if (t === "d") {
      var e = "http://www.w3.org/2000/svg";
      if (n)
        for (var s of this.ownerSVGElement.attributes)
          s.name === `xmlns:${n}` && (e = s.value);
      e === "http://www.w3.org/2000/svg" && (this[y] = null, this[m] = null);
    }
    x.call(this, n, t);
  }, SVGPathElement.prototype.getPathData = function(n) {
    if (n && n.normalize) {
      if (this[m])
        return D(this[m]);
      var t;
      this[y] ? t = D(this[y]) : (t = A(this.getAttribute("d") || ""), this[y] = D(t));
      var e = Q($(t));
      return this[m] = D(e), e;
    } else {
      if (this[y])
        return D(this[y]);
      var t = A(this.getAttribute("d") || "");
      return this[y] = D(t), t;
    }
  }, SVGPathElement.prototype.setPathData = function(n) {
    if (n.length === 0)
      E ? this.setAttribute("d", "") : this.removeAttribute("d");
    else {
      for (var t = "", e = 0, s = n.length; e < s; e += 1) {
        var l = n[e];
        e > 0 && (t += " "), t += l.type, l.values && l.values.length > 0 && (t += " " + l.values.join(" "));
      }
      this.setAttribute("d", t);
    }
  }, SVGRectElement.prototype.getPathData = function(n) {
    var t = this.x.baseVal.value, e = this.y.baseVal.value, s = this.width.baseVal.value, l = this.height.baseVal.value, u = this.hasAttribute("rx") ? this.rx.baseVal.value : this.ry.baseVal.value, a = this.hasAttribute("ry") ? this.ry.baseVal.value : this.rx.baseVal.value;
    u > s / 2 && (u = s / 2), a > l / 2 && (a = l / 2);
    var p = [
      { type: "M", values: [t + u, e] },
      { type: "H", values: [t + s - u] },
      { type: "A", values: [u, a, 0, 0, 1, t + s, e + a] },
      { type: "V", values: [e + l - a] },
      { type: "A", values: [u, a, 0, 0, 1, t + s - u, e + l] },
      { type: "H", values: [t + u] },
      { type: "A", values: [u, a, 0, 0, 1, t, e + l - a] },
      { type: "V", values: [e + a] },
      { type: "A", values: [u, a, 0, 0, 1, t + u, e] },
      { type: "Z", values: [] }
    ];
    return p = p.filter(function(i) {
      return !(i.type === "A" && (i.values[0] === 0 || i.values[1] === 0));
    }), n && n.normalize === !0 && (p = Q(p)), p;
  }, SVGCircleElement.prototype.getPathData = function(n) {
    var t = this.cx.baseVal.value, e = this.cy.baseVal.value, s = this.r.baseVal.value, l = [
      { type: "M", values: [t + s, e] },
      { type: "A", values: [s, s, 0, 0, 1, t, e + s] },
      { type: "A", values: [s, s, 0, 0, 1, t - s, e] },
      { type: "A", values: [s, s, 0, 0, 1, t, e - s] },
      { type: "A", values: [s, s, 0, 0, 1, t + s, e] },
      { type: "Z", values: [] }
    ];
    return n && n.normalize === !0 && (l = Q(l)), l;
  }, SVGEllipseElement.prototype.getPathData = function(n) {
    var t = this.cx.baseVal.value, e = this.cy.baseVal.value, s = this.rx.baseVal.value, l = this.ry.baseVal.value, u = [
      { type: "M", values: [t + s, e] },
      { type: "A", values: [s, l, 0, 0, 1, t, e + l] },
      { type: "A", values: [s, l, 0, 0, 1, t - s, e] },
      { type: "A", values: [s, l, 0, 0, 1, t, e - l] },
      { type: "A", values: [s, l, 0, 0, 1, t + s, e] },
      { type: "Z", values: [] }
    ];
    return n && n.normalize === !0 && (u = Q(u)), u;
  }, SVGLineElement.prototype.getPathData = function() {
    return [
      { type: "M", values: [this.x1.baseVal.value, this.y1.baseVal.value] },
      { type: "L", values: [this.x2.baseVal.value, this.y2.baseVal.value] }
    ];
  }, SVGPolylineElement.prototype.getPathData = function() {
    for (var n = [], t = 0; t < this.points.numberOfItems; t += 1) {
      var e = this.points.getItem(t);
      n.push({
        type: t === 0 ? "M" : "L",
        values: [e.x, e.y]
      });
    }
    return n;
  }, SVGPolygonElement.prototype.getPathData = function() {
    for (var n = [], t = 0; t < this.points.numberOfItems; t += 1) {
      var e = this.points.getItem(t);
      n.push({
        type: t === 0 ? "M" : "L",
        values: [e.x, e.y]
      });
    }
    return n.push({
      type: "Z",
      values: []
    }), n;
  };
}();
function ct(V, { pathSelector: M = "path" } = {}) {
  const E = document.createElement(null);
  E.innerHTML = V;
  const A = E.firstElementChild, S = A.querySelector(M).getPathData(), _ = A.getAttribute("viewBox").split(" ").map((m) => m.trim()), x = {
    x: parseInt(_[0]),
    y: parseInt(_[1]),
    width: parseInt(_[2]),
    height: parseInt(_[3])
  }, y = Math.min(x.width, x.height);
  return S.forEach((m) => {
    m.values = m.values.map((L) => L / y);
  }), S;
}
function ot(V, M, E, A, P) {
  const S = [];
  for (let _ = 0; _ <= 1; _ += 1 / P) {
    const x = Math.pow(1 - _, 3) * V.x + 3 * Math.pow(1 - _, 2) * _ * M.x + 3 * (1 - _) * Math.pow(_, 2) * E.x + Math.pow(_, 3) * A.x, y = Math.pow(1 - _, 3) * V.y + 3 * Math.pow(1 - _, 2) * _ * M.y + 3 * (1 - _) * Math.pow(_, 2) * E.y + Math.pow(_, 3) * A.y;
    S.push({ x, y });
  }
  return S;
}
function ft(V, M) {
  const E = (M == null ? void 0 : M.segments) || 20, A = ct(V, M);
  let P = [];
  for (let S = 0; S < A.length - 1; S++) {
    const { type: _, values: x } = A[S];
    if (_ === "M" && S === 0)
      P.push({ x: x[0], y: x[1] });
    else if (_ === "C") {
      const y = P[P.length - 1], m = { x: x[0], y: x[1] }, L = { x: x[2], y: x[3] }, D = { x: x[4], y: x[5] }, $ = ot(y, m, L, D, E);
      P = [...P, ...$];
    }
  }
  return P;
}
export {
  ct as getPathData,
  ft as getPoints
};
