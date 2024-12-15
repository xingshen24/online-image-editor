var Nn = Object.defineProperty;
var Gn = (a, t, e) => t in a ? Nn(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var p = (a, t, e) => Gn(a, typeof t != "symbol" ? t + "" : t, e);
function m(a, t, e) {
  return (t = function(s) {
    var i = function(r, n) {
      if (typeof r != "object" || !r) return r;
      var o = r[Symbol.toPrimitive];
      if (o !== void 0) {
        var h = o.call(r, n || "default");
        if (typeof h != "object") return h;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (n === "string" ? String : Number)(r);
    }(s, "string");
    return typeof i == "symbol" ? i : i + "";
  }(t)) in a ? Object.defineProperty(a, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : a[t] = e, a;
}
function $i(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(a);
    t && (s = s.filter(function(i) {
      return Object.getOwnPropertyDescriptor(a, i).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function y(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $i(Object(e), !0).forEach(function(s) {
      m(a, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : $i(Object(e)).forEach(function(s) {
      Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return a;
}
function V(a, t) {
  if (a == null) return {};
  var e, s, i = function(n, o) {
    if (n == null) return {};
    var h = {};
    for (var c in n) if ({}.hasOwnProperty.call(n, c)) {
      if (o.indexOf(c) >= 0) continue;
      h[c] = n[c];
    }
    return h;
  }(a, t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    for (s = 0; s < r.length; s++) e = r[s], t.indexOf(e) >= 0 || {}.propertyIsEnumerable.call(a, e) && (i[e] = a[e]);
  }
  return i;
}
function te(a, t) {
  return t || (t = a.slice(0)), Object.freeze(Object.defineProperties(a, { raw: { value: Object.freeze(t) } }));
}
class Qi {
  constructor() {
    m(this, "browserShadowBlurConstant", 1), m(this, "DPI", 96), m(this, "devicePixelRatio", typeof window < "u" ? window.devicePixelRatio : 1), m(this, "perfLimitSizeTotal", 2097152), m(this, "maxCacheSideLimit", 4096), m(this, "minCacheSideLimit", 256), m(this, "disableStyleCopyPaste", !1), m(this, "enableGLFiltering", !0), m(this, "textureSize", 4096), m(this, "forceGLPutImageData", !1), m(this, "cachesBoundsOfCurve", !1), m(this, "fontPaths", {}), m(this, "NUM_FRACTION_DIGITS", 4);
  }
}
const j = new class extends Qi {
  constructor(a) {
    super(), this.configure(a);
  }
  configure() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.assign(this, a);
  }
  addFonts() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fontPaths = y(y({}, this.fontPaths), a);
  }
  removeFonts() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((a) => {
      delete this.fontPaths[a];
    });
  }
  clearFonts() {
    this.fontPaths = {};
  }
  restoreDefaults(a) {
    const t = new Qi(), e = (a == null ? void 0 : a.reduce((s, i) => (s[i] = t[i], s), {})) || t;
    this.configure(e);
  }
}(), $t = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return console[a]("fabric", ...e);
};
class Wt extends Error {
  constructor(t, e) {
    super("fabric: ".concat(t), e);
  }
}
class Un extends Wt {
  constructor(t) {
    super("".concat(t, " 'options.signal' is in 'aborted' state"));
  }
}
class qn {
}
class Kn extends qn {
  testPrecision(t, e) {
    const s = "precision ".concat(e, ` float;
void main(){}`), i = t.createShader(t.FRAGMENT_SHADER);
    return !!i && (t.shaderSource(i, s), t.compileShader(i), !!t.getShaderParameter(i, t.COMPILE_STATUS));
  }
  queryWebGL(t) {
    const e = t.getContext("webgl");
    e && (this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE), this.GLPrecision = ["highp", "mediump", "lowp"].find((s) => this.testPrecision(e, s)), e.getExtension("WEBGL_lose_context").loseContext(), $t("log", "WebGL: max texture size ".concat(this.maxTextureSize)));
  }
  isSupported(t) {
    return !!this.maxTextureSize && this.maxTextureSize >= t;
  }
}
const Jn = {};
let tr;
const zt = () => tr || (tr = { document, window, isTouchSupported: "ontouchstart" in window || "ontouchstart" in document || window && window.navigator && window.navigator.maxTouchPoints > 0, WebGLProbe: new Kn(), dispose() {
}, copyPasteData: Jn }), Me = () => zt().document, Ri = () => zt().window, Wr = () => {
  var a;
  return Math.max((a = j.devicePixelRatio) !== null && a !== void 0 ? a : Ri().devicePixelRatio, 1);
}, Be = new class {
  constructor() {
    m(this, "charWidthsCache", {}), m(this, "boundsOfCurveCache", {});
  }
  getFontCache(a) {
    let { fontFamily: t, fontStyle: e, fontWeight: s } = a;
    t = t.toLowerCase(), this.charWidthsCache[t] || (this.charWidthsCache[t] = {});
    const i = this.charWidthsCache[t], r = "".concat(e.toLowerCase(), "_").concat((s + "").toLowerCase());
    return i[r] || (i[r] = {}), i[r];
  }
  clearFontCache(a) {
    (a = (a || "").toLowerCase()) ? this.charWidthsCache[a] && delete this.charWidthsCache[a] : this.charWidthsCache = {};
  }
  limitDimsByArea(a) {
    const { perfLimitSizeTotal: t } = j, e = Math.sqrt(t * a);
    return [Math.floor(e), Math.floor(t / e)];
  }
}(), fi = "6.5.1";
function Es() {
}
const Je = Math.PI / 2, js = 2 * Math.PI, ji = Math.PI / 180, ot = Object.freeze([1, 0, 0, 1, 0, 0]), Li = 16, Kt = 0.4477152502, R = "center", I = "left", ht = "top", mi = "bottom", q = "right", ct = "none", Pi = /\r?\n/, zr = "moving", Ns = "scaling", Ir = "rotating", Fi = "rotate", Br = "skewing", Ve = "resizing", Zn = "modifyPoly", $n = "modifyPath", Ls = "changed", Gs = "scale", ut = "scaleX", _t = "scaleY", De = "skewX", Ae = "skewY", Z = "fill", lt = "stroke", Ps = "modified", me = "json", ii = "svg", T = new class {
  constructor() {
    this[me] = /* @__PURE__ */ new Map(), this[ii] = /* @__PURE__ */ new Map();
  }
  has(a) {
    return this[me].has(a);
  }
  getClass(a) {
    const t = this[me].get(a);
    if (!t) throw new Wt("No class registered for ".concat(a));
    return t;
  }
  setClass(a, t) {
    t ? this[me].set(t, a) : (this[me].set(a.type, a), this[me].set(a.type.toLowerCase(), a));
  }
  getSVGClass(a) {
    return this[ii].get(a);
  }
  setSVGClass(a, t) {
    this[ii].set(t ?? a.type.toLowerCase(), a);
  }
}(), Fs = new class extends Array {
  remove(a) {
    const t = this.indexOf(a);
    t > -1 && this.splice(t, 1);
  }
  cancelAll() {
    const a = this.splice(0);
    return a.forEach((t) => t.abort()), a;
  }
  cancelByCanvas(a) {
    if (!a) return [];
    const t = this.filter((e) => {
      var s;
      return e.target === a || typeof e.target == "object" && ((s = e.target) === null || s === void 0 ? void 0 : s.canvas) === a;
    });
    return t.forEach((e) => e.abort()), t;
  }
  cancelByTarget(a) {
    if (!a) return [];
    const t = this.filter((e) => e.target === a);
    return t.forEach((e) => e.abort()), t;
  }
}();
class Qn {
  constructor() {
    m(this, "__eventListeners", {});
  }
  on(t, e) {
    if (this.__eventListeners || (this.__eventListeners = {}), typeof t == "object") return Object.entries(t).forEach((s) => {
      let [i, r] = s;
      this.on(i, r);
    }), () => this.off(t);
    if (e) {
      const s = t;
      return this.__eventListeners[s] || (this.__eventListeners[s] = []), this.__eventListeners[s].push(e), () => this.off(s, e);
    }
    return () => !1;
  }
  once(t, e) {
    if (typeof t == "object") {
      const s = [];
      return Object.entries(t).forEach((i) => {
        let [r, n] = i;
        s.push(this.once(r, n));
      }), () => s.forEach((i) => i());
    }
    if (e) {
      const s = this.on(t, function() {
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++) r[n] = arguments[n];
        e.call(this, ...r), s();
      });
      return s;
    }
    return () => !1;
  }
  _removeEventListener(t, e) {
    if (this.__eventListeners[t]) if (e) {
      const s = this.__eventListeners[t], i = s.indexOf(e);
      i > -1 && s.splice(i, 1);
    } else this.__eventListeners[t] = [];
  }
  off(t, e) {
    if (this.__eventListeners) if (t === void 0) for (const s in this.__eventListeners) this._removeEventListener(s);
    else typeof t == "object" ? Object.entries(t).forEach((s) => {
      let [i, r] = s;
      this._removeEventListener(i, r);
    }) : this._removeEventListener(t, e);
  }
  fire(t, e) {
    var s;
    if (!this.__eventListeners) return;
    const i = (s = this.__eventListeners[t]) === null || s === void 0 ? void 0 : s.concat();
    if (i) for (let r = 0; r < i.length; r++) i[r].call(this, e || {});
  }
}
const we = (a, t) => {
  const e = a.indexOf(t);
  return e !== -1 && a.splice(e, 1), a;
}, Nt = (a) => {
  if (a === 0) return 1;
  switch (Math.abs(a) / Je) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(a);
}, Gt = (a) => {
  if (a === 0) return 0;
  const t = a / Je, e = Math.sign(a);
  switch (t) {
    case 1:
      return e;
    case 2:
      return 0;
    case 3:
      return -e;
  }
  return Math.sin(a);
};
class w {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    typeof t == "object" ? (this.x = t.x, this.y = t.y) : (this.x = t, this.y = e);
  }
  add(t) {
    return new w(this.x + t.x, this.y + t.y);
  }
  addEquals(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  scalarAdd(t) {
    return new w(this.x + t, this.y + t);
  }
  scalarAddEquals(t) {
    return this.x += t, this.y += t, this;
  }
  subtract(t) {
    return new w(this.x - t.x, this.y - t.y);
  }
  subtractEquals(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  scalarSubtract(t) {
    return new w(this.x - t, this.y - t);
  }
  scalarSubtractEquals(t) {
    return this.x -= t, this.y -= t, this;
  }
  multiply(t) {
    return new w(this.x * t.x, this.y * t.y);
  }
  scalarMultiply(t) {
    return new w(this.x * t, this.y * t);
  }
  scalarMultiplyEquals(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return new w(this.x / t.x, this.y / t.y);
  }
  scalarDivide(t) {
    return new w(this.x / t, this.y / t);
  }
  scalarDivideEquals(t) {
    return this.x /= t, this.y /= t, this;
  }
  eq(t) {
    return this.x === t.x && this.y === t.y;
  }
  lt(t) {
    return this.x < t.x && this.y < t.y;
  }
  lte(t) {
    return this.x <= t.x && this.y <= t.y;
  }
  gt(t) {
    return this.x > t.x && this.y > t.y;
  }
  gte(t) {
    return this.x >= t.x && this.y >= t.y;
  }
  lerp(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
    return e = Math.max(Math.min(1, e), 0), new w(this.x + (t.x - this.x) * e, this.y + (t.y - this.y) * e);
  }
  distanceFrom(t) {
    const e = this.x - t.x, s = this.y - t.y;
    return Math.sqrt(e * e + s * s);
  }
  midPointFrom(t) {
    return this.lerp(t);
  }
  min(t) {
    return new w(Math.min(this.x, t.x), Math.min(this.y, t.y));
  }
  max(t) {
    return new w(Math.max(this.x, t.x), Math.max(this.y, t.y));
  }
  toString() {
    return "".concat(this.x, ",").concat(this.y);
  }
  setXY(t, e) {
    return this.x = t, this.y = e, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setFromPoint(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  swap(t) {
    const e = this.x, s = this.y;
    this.x = t.x, this.y = t.y, t.x = e, t.y = s;
  }
  clone() {
    return new w(this.x, this.y);
  }
  rotate(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Wi;
    const s = Gt(t), i = Nt(t), r = this.subtract(e);
    return new w(r.x * i - r.y * s, r.x * s + r.y * i).add(e);
  }
  transform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    return new w(t[0] * this.x + t[2] * this.y + (e ? 0 : t[4]), t[1] * this.x + t[3] * this.y + (e ? 0 : t[5]));
  }
}
const Wi = new w(0, 0), ks = (a) => !!a && Array.isArray(a._objects);
function Xr(a) {
  class t extends a {
    constructor() {
      super(...arguments), m(this, "_objects", []);
    }
    _onObjectAdded(s) {
    }
    _onObjectRemoved(s) {
    }
    _onStackOrderChanged(s) {
    }
    add() {
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
      const n = this._objects.push(...i);
      return i.forEach((o) => this._onObjectAdded(o)), n;
    }
    insertAt(s) {
      for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n];
      return this._objects.splice(s, 0, ...r), r.forEach((o) => this._onObjectAdded(o)), this._objects.length;
    }
    remove() {
      const s = this._objects, i = [];
      for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
      return n.forEach((h) => {
        const c = s.indexOf(h);
        c !== -1 && (s.splice(c, 1), i.push(h), this._onObjectRemoved(h));
      }), i;
    }
    forEachObject(s) {
      this.getObjects().forEach((i, r, n) => s(i, r, n));
    }
    getObjects() {
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
      return i.length === 0 ? [...this._objects] : this._objects.filter((n) => n.isType(...i));
    }
    item(s) {
      return this._objects[s];
    }
    isEmpty() {
      return this._objects.length === 0;
    }
    size() {
      return this._objects.length;
    }
    contains(s, i) {
      return !!this._objects.includes(s) || !!i && this._objects.some((r) => r instanceof t && r.contains(s, !0));
    }
    complexity() {
      return this._objects.reduce((s, i) => s += i.complexity ? i.complexity() : 0, 0);
    }
    sendObjectToBack(s) {
      return !(!s || s === this._objects[0]) && (we(this._objects, s), this._objects.unshift(s), this._onStackOrderChanged(s), !0);
    }
    bringObjectToFront(s) {
      return !(!s || s === this._objects[this._objects.length - 1]) && (we(this._objects, s), this._objects.push(s), this._onStackOrderChanged(s), !0);
    }
    sendObjectBackwards(s, i) {
      if (!s) return !1;
      const r = this._objects.indexOf(s);
      if (r !== 0) {
        const n = this.findNewLowerIndex(s, r, i);
        return we(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), !0;
      }
      return !1;
    }
    bringObjectForward(s, i) {
      if (!s) return !1;
      const r = this._objects.indexOf(s);
      if (r !== this._objects.length - 1) {
        const n = this.findNewUpperIndex(s, r, i);
        return we(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), !0;
      }
      return !1;
    }
    moveObjectTo(s, i) {
      return s !== this._objects[i] && (we(this._objects, s), this._objects.splice(i, 0, s), this._onStackOrderChanged(s), !0);
    }
    findNewLowerIndex(s, i, r) {
      let n;
      if (r) {
        n = i;
        for (let o = i - 1; o >= 0; --o) if (s.isOverlapping(this._objects[o])) {
          n = o;
          break;
        }
      } else n = i - 1;
      return n;
    }
    findNewUpperIndex(s, i, r) {
      let n;
      if (r) {
        n = i;
        for (let o = i + 1; o < this._objects.length; ++o) if (s.isOverlapping(this._objects[o])) {
          n = o;
          break;
        }
      } else n = i + 1;
      return n;
    }
    collectObjects(s) {
      let { left: i, top: r, width: n, height: o } = s, { includeIntersecting: h = !0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const c = [], l = new w(i, r), u = l.add(new w(n, o));
      for (let d = this._objects.length - 1; d >= 0; d--) {
        const g = this._objects[d];
        g.selectable && g.visible && (h && g.intersectsWithRect(l, u) || g.isContainedWithinRect(l, u) || h && g.containsPoint(l) || h && g.containsPoint(u)) && c.push(g);
      }
      return c;
    }
  }
  return t;
}
class Yr extends Qn {
  _setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for (const e in t) this.set(e, t[e]);
  }
  _setObject(t) {
    for (const e in t) this._set(e, t[e]);
  }
  set(t, e) {
    return typeof t == "object" ? this._setObject(t) : this._set(t, e), this;
  }
  _set(t, e) {
    this[t] = e;
  }
  toggle(t) {
    const e = this.get(t);
    return typeof e == "boolean" && this.set(t, !e), this;
  }
  get(t) {
    return this[t];
  }
}
function Ms(a) {
  return Ri().requestAnimationFrame(a);
}
function to(a) {
  return Ri().cancelAnimationFrame(a);
}
let eo = 0;
const Qt = () => eo++, St = () => {
  const a = Me().createElement("canvas");
  if (!a || a.getContext === void 0) throw new Wt("Failed to create `canvas` element");
  return a;
}, so = () => Me().createElement("img"), It = (a) => {
  const t = St();
  return t.width = a.width, t.height = a.height, t;
}, Hr = (a, t, e) => a.toDataURL("image/".concat(t), e), K = (a) => a * ji, de = (a) => a / ji, io = (a) => a.every((t, e) => t === ot[e]), at = (a, t, e) => new w(a).transform(t, e), Dt = (a) => {
  const t = 1 / (a[0] * a[3] - a[1] * a[2]), e = [t * a[3], -t * a[1], -t * a[2], t * a[0], 0, 0], { x: s, y: i } = new w(a[4], a[5]).transform(e, !0);
  return e[4] = -s, e[5] = -i, e;
}, et = (a, t, e) => [a[0] * t[0] + a[2] * t[1], a[1] * t[0] + a[3] * t[1], a[0] * t[2] + a[2] * t[3], a[1] * t[2] + a[3] * t[3], e ? 0 : a[0] * t[4] + a[2] * t[5] + a[4], e ? 0 : a[1] * t[4] + a[3] * t[5] + a[5]], zi = (a, t) => a.reduceRight((e, s) => s && e ? et(s, e, t) : s || e, void 0) || ot.concat(), Vr = (a) => {
  let [t, e] = a;
  return Math.atan2(e, t);
}, Ws = (a) => {
  const t = Vr(a), e = Math.pow(a[0], 2) + Math.pow(a[1], 2), s = Math.sqrt(e), i = (a[0] * a[3] - a[2] * a[1]) / s, r = Math.atan2(a[0] * a[2] + a[1] * a[3], e);
  return { angle: de(t), scaleX: s, scaleY: i, skewX: de(r), skewY: 0, translateX: a[4] || 0, translateY: a[5] || 0 };
}, Ze = function(a) {
  return [1, 0, 0, 1, a, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0];
};
function $e() {
  let { angle: a = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { x: t = 0, y: e = 0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const s = K(a), i = Nt(s), r = Gt(s);
  return [i, r, -r, i, t ? t - (i * t - r * e) : 0, e ? e - (r * t + i * e) : 0];
}
const Ii = function(a) {
  return [a, 0, 0, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : a, 0, 0];
}, Nr = (a) => Math.tan(K(a)), Gr = (a) => [1, 0, Nr(a), 1, 0, 0], Ur = (a) => [1, Nr(a), 0, 1, 0, 0], Us = (a) => {
  let { scaleX: t = 1, scaleY: e = 1, flipX: s = !1, flipY: i = !1, skewX: r = 0, skewY: n = 0 } = a, o = Ii(s ? -t : t, i ? -e : e);
  return r && (o = et(o, Gr(r), !0)), n && (o = et(o, Ur(n), !0)), o;
}, ro = (a) => {
  const { translateX: t = 0, translateY: e = 0, angle: s = 0 } = a;
  let i = Ze(t, e);
  s && (i = et(i, $e({ angle: s })));
  const r = Us(a);
  return io(r) || (i = et(i, r)), i;
}, Ds = function(a) {
  let { signal: t, crossOrigin: e = null } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise(function(s, i) {
    if (t && t.aborted) return i(new Un("loadImage"));
    const r = so();
    let n;
    t && (n = function(h) {
      r.src = "", i(h);
    }, t.addEventListener("abort", n, { once: !0 }));
    const o = function() {
      r.onload = r.onerror = null, n && (t == null || t.removeEventListener("abort", n)), s(r);
    };
    a ? (r.onload = o, r.onerror = function() {
      n && (t == null || t.removeEventListener("abort", n)), i(new Wt("Error loading ".concat(r.src)));
    }, e && (r.crossOrigin = e), r.src = a) : o();
  });
}, Ne = function(a) {
  let { signal: t, reviver: e = Es } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((s, i) => {
    const r = [];
    t && t.addEventListener("abort", i, { once: !0 }), Promise.all(a.map((n) => T.getClass(n.type).fromObject(n, { signal: t }).then((o) => (e(n, o), r.push(o), o)))).then(s).catch((n) => {
      r.forEach((o) => {
        o.dispose && o.dispose();
      }), i(n);
    }).finally(() => {
      t && t.removeEventListener("abort", i);
    });
  });
}, qs = function(a) {
  let { signal: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((e, s) => {
    const i = [];
    t && t.addEventListener("abort", s, { once: !0 });
    const r = Object.values(a).map((o) => o && o.type && T.has(o.type) ? Ne([o], { signal: t }).then((h) => {
      let [c] = h;
      return i.push(c), c;
    }) : o), n = Object.keys(a);
    Promise.all(r).then((o) => o.reduce((h, c, l) => (h[n[l]] = c, h), {})).then(e).catch((o) => {
      i.forEach((h) => {
        h.dispose && h.dispose();
      }), s(o);
    }).finally(() => {
      t && t.removeEventListener("abort", s);
    });
  });
}, Re = function(a) {
  return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []).reduce((t, e) => (e in a && (t[e] = a[e]), t), {});
}, Bi = (a, t) => Object.keys(a).reduce((e, s) => (t(a[s], s, a) && (e[s] = a[s]), e), {}), er = { aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#0FF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000", blanchedalmond: "#FFEBCD", blue: "#00F", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#0FF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgrey: "#A9A9A9", darkgreen: "#006400", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#F0F", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#ADFF2F", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgrey: "#D3D3D3", lightgreen: "#90EE90", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#789", lightslategrey: "#789", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#0F0", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#F0F", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#639", red: "#F00", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFF", whitesmoke: "#F5F5F5", yellow: "#FF0", yellowgreen: "#9ACD32" }, ri = (a, t, e) => (e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? a + 6 * (t - a) * e : e < 0.5 ? t : e < 2 / 3 ? a + (t - a) * (2 / 3 - e) * 6 : a), sr = (a, t, e, s) => {
  a /= 255, t /= 255, e /= 255;
  const i = Math.max(a, t, e), r = Math.min(a, t, e);
  let n, o;
  const h = (i + r) / 2;
  if (i === r) n = o = 0;
  else {
    const c = i - r;
    switch (o = h > 0.5 ? c / (2 - i - r) : c / (i + r), i) {
      case a:
        n = (t - e) / c + (t < e ? 6 : 0);
        break;
      case t:
        n = (e - a) / c + 2;
        break;
      case e:
        n = (a - t) / c + 4;
    }
    n /= 6;
  }
  return [Math.round(360 * n), Math.round(100 * o), Math.round(100 * h), s];
}, ir = function() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "1";
  return parseFloat(a) / (a.endsWith("%") ? 100 : 1);
}, ts = (a) => Math.min(Math.round(a), 255).toString(16).toUpperCase().padStart(2, "0"), rr = (a) => {
  let [t, e, s, i = 1] = a;
  const r = Math.round(0.3 * t + 0.59 * e + 0.11 * s);
  return [r, r, r, i];
};
class z {
  constructor(t) {
    if (m(this, "isUnrecognised", !1), t) if (t instanceof z) this.setSource([...t._source]);
    else if (Array.isArray(t)) {
      const [e, s, i, r = 1] = t;
      this.setSource([e, s, i, r]);
    } else this.setSource(this._tryParsingColor(t));
    else this.setSource([0, 0, 0, 1]);
  }
  _tryParsingColor(t) {
    return t in er && (t = er[t]), t === "transparent" ? [255, 255, 255, 0] : z.sourceFromHex(t) || z.sourceFromRgb(t) || z.sourceFromHsl(t) || (this.isUnrecognised = !0) && [0, 0, 0, 1];
  }
  getSource() {
    return this._source;
  }
  setSource(t) {
    this._source = t;
  }
  toRgb() {
    const [t, e, s] = this.getSource();
    return "rgb(".concat(t, ",").concat(e, ",").concat(s, ")");
  }
  toRgba() {
    return "rgba(".concat(this.getSource().join(","), ")");
  }
  toHsl() {
    const [t, e, s] = sr(...this.getSource());
    return "hsl(".concat(t, ",").concat(e, "%,").concat(s, "%)");
  }
  toHsla() {
    const [t, e, s, i] = sr(...this.getSource());
    return "hsla(".concat(t, ",").concat(e, "%,").concat(s, "%,").concat(i, ")");
  }
  toHex() {
    return this.toHexa().slice(0, 6);
  }
  toHexa() {
    const [t, e, s, i] = this.getSource();
    return "".concat(ts(t)).concat(ts(e)).concat(ts(s)).concat(ts(Math.round(255 * i)));
  }
  getAlpha() {
    return this.getSource()[3];
  }
  setAlpha(t) {
    return this._source[3] = t, this;
  }
  toGrayscale() {
    return this.setSource(rr(this.getSource())), this;
  }
  toBlackWhite(t) {
    const [e, , , s] = rr(this.getSource()), i = e < (t || 127) ? 0 : 255;
    return this.setSource([i, i, i, s]), this;
  }
  overlayWith(t) {
    t instanceof z || (t = new z(t));
    const e = this.getSource(), s = t.getSource(), [i, r, n] = e.map((o, h) => Math.round(0.5 * o + 0.5 * s[h]));
    return this.setSource([i, r, n, e[3]]), this;
  }
  static fromRgb(t) {
    return z.fromRgba(t);
  }
  static fromRgba(t) {
    return new z(z.sourceFromRgb(t));
  }
  static sourceFromRgb(t) {
    const e = t.match(/^rgba?\(\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d{0,3}(?:\.\d+)?%?)\s*)?\)$/i);
    if (e) {
      const [s, i, r] = e.slice(1, 4).map((n) => {
        const o = parseFloat(n);
        return n.endsWith("%") ? Math.round(2.55 * o) : o;
      });
      return [s, i, r, ir(e[4])];
    }
  }
  static fromHsl(t) {
    return z.fromHsla(t);
  }
  static fromHsla(t) {
    return new z(z.sourceFromHsl(t));
  }
  static sourceFromHsl(t) {
    const e = t.match(/^hsla?\(\s*([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d*(?:\.\d+)?%?)\s*)?\)$/i);
    if (!e) return;
    const s = (z.parseAngletoDegrees(e[1]) % 360 + 360) % 360 / 360, i = parseFloat(e[2]) / 100, r = parseFloat(e[3]) / 100;
    let n, o, h;
    if (i === 0) n = o = h = r;
    else {
      const c = r <= 0.5 ? r * (i + 1) : r + i - r * i, l = 2 * r - c;
      n = ri(l, c, s + 1 / 3), o = ri(l, c, s), h = ri(l, c, s - 1 / 3);
    }
    return [Math.round(255 * n), Math.round(255 * o), Math.round(255 * h), ir(e[4])];
  }
  static fromHex(t) {
    return new z(z.sourceFromHex(t));
  }
  static sourceFromHex(t) {
    if (t.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e = t.slice(t.indexOf("#") + 1);
      let s;
      s = e.length <= 4 ? e.split("").map((h) => h + h) : e.match(/.{2}/g);
      const [i, r, n, o = 255] = s.map((h) => parseInt(h, 16));
      return [i, r, n, o / 255];
    }
  }
  static parseAngletoDegrees(t) {
    const e = t.toLowerCase(), s = parseFloat(e);
    return e.includes("rad") ? de(s) : e.includes("turn") ? 360 * s : s;
  }
}
const G = (a, t) => parseFloat(Number(a).toFixed(t)), Te = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Li;
  const e = /\D{0,2}$/.exec(a), s = parseFloat(a), i = j.DPI;
  switch (e == null ? void 0 : e[0]) {
    case "mm":
      return s * i / 25.4;
    case "cm":
      return s * i / 2.54;
    case "in":
      return s * i;
    case "pt":
      return s * i / 72;
    case "pc":
      return s * i / 72 * 12;
    case "em":
      return s * t;
    default:
      return s;
  }
}, no = (a) => {
  const [t, e] = a.trim().split(" "), [s, i] = (r = t) && r !== ct ? [r.slice(1, 4), r.slice(5, 8)] : r === ct ? [r, r] : ["Mid", "Mid"];
  var r;
  return { meetOrSlice: e || "meet", alignX: s, alignY: i };
}, zs = (a) => "matrix(" + a.map((t) => G(t, j.NUM_FRACTION_DIGITS)).join(" ") + ")", Ge = function(a, t) {
  let e, s, i = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
  if (t) if (t.toLive) e = "url(#SVGID_".concat(t.id, ")");
  else {
    const r = new z(t), n = r.getAlpha();
    e = r.toRgb(), n !== 1 && (s = n.toString());
  }
  else e = "none";
  return i ? "".concat(a, ": ").concat(e, "; ").concat(s ? "".concat(a, "-opacity: ").concat(s, "; ") : "") : "".concat(a, '="').concat(e, '" ').concat(s ? "".concat(a, '-opacity="').concat(s, '" ') : "");
}, bt = (a) => !!a && a.toLive !== void 0, nr = (a) => !!a && typeof a.toObject == "function", or = (a) => !!a && a.offsetX !== void 0 && "source" in a, qr = (a) => !!a && typeof a._renderText == "function", ne = (a) => !!a && "multiSelectionStacking" in a;
function Kr(a) {
  const t = a && Mt(a);
  let e = 0, s = 0;
  if (!a || !t) return { left: e, top: s };
  let i = a;
  const r = t.documentElement, n = t.body || { scrollLeft: 0, scrollTop: 0 };
  for (; i && (i.parentNode || i.host) && (i = i.parentNode || i.host, i === t ? (e = n.scrollLeft || r.scrollLeft || 0, s = n.scrollTop || r.scrollTop || 0) : (e += i.scrollLeft || 0, s += i.scrollTop || 0), i.nodeType !== 1 || i.style.position !== "fixed"); ) ;
  return { left: e, top: s };
}
const Mt = (a) => a.ownerDocument || null, Jr = (a) => {
  var t;
  return ((t = a.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView) || null;
}, Zr = function(a, t, e) {
  let { width: s, height: i } = e, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  a.width = s, a.height = i, r > 1 && (a.setAttribute("width", (s * r).toString()), a.setAttribute("height", (i * r).toString()), t.scale(r, r));
}, vi = (a, t) => {
  let { width: e, height: s } = t;
  e && (a.style.width = typeof e == "number" ? "".concat(e, "px") : e), s && (a.style.height = typeof s == "number" ? "".concat(s, "px") : s);
};
function ar(a) {
  return a.onselectstart !== void 0 && (a.onselectstart = () => !1), a.style.userSelect = ct, a;
}
class $r {
  constructor(t) {
    m(this, "_originalCanvasStyle", void 0), m(this, "lower", void 0);
    const e = this.createLowerCanvas(t);
    this.lower = { el: e, ctx: e.getContext("2d") };
  }
  createLowerCanvas(t) {
    const e = (s = t) && s.getContext !== void 0 ? t : t && Me().getElementById(t) || St();
    var s;
    if (e.hasAttribute("data-fabric")) throw new Wt("Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?");
    return this._originalCanvasStyle = e.style.cssText, e.setAttribute("data-fabric", "main"), e.classList.add("lower-canvas"), e;
  }
  cleanupDOM(t) {
    let { width: e, height: s } = t;
    const { el: i } = this.lower;
    i.classList.remove("lower-canvas"), i.removeAttribute("data-fabric"), i.setAttribute("width", "".concat(e)), i.setAttribute("height", "".concat(s)), i.style.cssText = this._originalCanvasStyle || "", this._originalCanvasStyle = void 0;
  }
  setDimensions(t, e) {
    const { el: s, ctx: i } = this.lower;
    Zr(s, i, t, e);
  }
  setCSSDimensions(t) {
    vi(this.lower.el, t);
  }
  calcOffset() {
    return function(t) {
      var e;
      const s = t && Mt(t), i = { left: 0, top: 0 };
      if (!s) return i;
      const r = ((e = Jr(t)) === null || e === void 0 ? void 0 : e.getComputedStyle(t, null)) || {};
      i.left += parseInt(r.borderLeftWidth, 10) || 0, i.top += parseInt(r.borderTopWidth, 10) || 0, i.left += parseInt(r.paddingLeft, 10) || 0, i.top += parseInt(r.paddingTop, 10) || 0;
      let n = { left: 0, top: 0 };
      const o = s.documentElement;
      t.getBoundingClientRect !== void 0 && (n = t.getBoundingClientRect());
      const h = Kr(t);
      return { left: n.left + h.left - (o.clientLeft || 0) + i.left, top: n.top + h.top - (o.clientTop || 0) + i.top };
    }(this.lower.el);
  }
  dispose() {
    zt().dispose(this.lower.el), delete this.lower;
  }
}
const oo = { backgroundVpt: !0, backgroundColor: "", overlayVpt: !0, overlayColor: "", includeDefaultValues: !0, svgViewportTransformation: !0, renderOnAddRemove: !0, skipOffscreen: !0, enableRetinaScaling: !0, imageSmoothingEnabled: !0, controlsAboveOverlay: !1, allowTouchScrolling: !1, viewportTransform: [...ot] };
class je extends Xr(Yr) {
  get lowerCanvasEl() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.el;
  }
  get contextContainer() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.ctx;
  }
  static getDefaults() {
    return je.ownDefaults;
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, this.constructor.getDefaults()), this.set(e), this.initElements(t), this._setDimensionsImpl({ width: this.width || this.elements.lower.el.width || 0, height: this.height || this.elements.lower.el.height || 0 }), this.skipControlsDrawing = !1, this.viewportTransform = [...this.viewportTransform], this.calcViewportBoundaries();
  }
  initElements(t) {
    this.elements = new $r(t);
  }
  add() {
    const t = super.add(...arguments);
    return arguments.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) s[i - 1] = arguments[i];
    const r = super.insertAt(t, ...s);
    return s.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), r;
  }
  remove() {
    const t = super.remove(...arguments);
    return t.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  _onObjectAdded(t) {
    t.canvas && t.canvas !== this && ($t("warn", `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`), t.canvas.remove(t)), t._set("canvas", this), t.setCoords(), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t) {
    t._set("canvas", void 0), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll();
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? Wr() : 1;
  }
  calcOffset() {
    return this._offset = this.elements.calcOffset();
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setWidth(t, e) {
    return this.setDimensions({ width: t }, e);
  }
  setHeight(t, e) {
    return this.setDimensions({ height: t }, e);
  }
  _setDimensionsImpl(t) {
    let { cssOnly: e = !1, backstoreOnly: s = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!e) {
      const i = y({ width: this.width, height: this.height }, t);
      this.elements.setDimensions(i, this.getRetinaScaling()), this.hasLostContext = !0, this.width = i.width, this.height = i.height;
    }
    s || this.elements.setCSSDimensions(t), this.calcOffset();
  }
  setDimensions(t, e) {
    this._setDimensionsImpl(t, e), e && e.cssOnly || this.requestRenderAll();
  }
  getZoom() {
    return this.viewportTransform[0];
  }
  setViewportTransform(t) {
    this.viewportTransform = t, this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll();
  }
  zoomToPoint(t, e) {
    const s = t, i = [...this.viewportTransform], r = at(t, Dt(i));
    i[0] = e, i[3] = e;
    const n = at(r, i);
    i[4] += s.x - n.x, i[5] += s.y - n.y, this.setViewportTransform(i);
  }
  setZoom(t) {
    this.zoomToPoint(new w(0, 0), t);
  }
  absolutePan(t) {
    const e = [...this.viewportTransform];
    return e[4] = -t.x, e[5] = -t.y, this.setViewportTransform(e);
  }
  relativePan(t) {
    return this.absolutePan(new w(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]));
  }
  getElement() {
    return this.elements.lower.el;
  }
  clearContext(t) {
    t.clearRect(0, 0, this.width, this.height);
  }
  getContext() {
    return this.elements.lower.ctx;
  }
  clear() {
    this.remove(...this.getObjects()), this.backgroundImage = void 0, this.overlayImage = void 0, this.backgroundColor = "", this.overlayColor = "", this.clearContext(this.getContext()), this.fire("canvas:cleared"), this.renderOnAddRemove && this.requestRenderAll();
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || this.renderCanvas(this.getContext(), this._objects);
  }
  renderAndReset() {
    this.nextRenderHandle = 0, this.renderAll();
  }
  requestRenderAll() {
    this.nextRenderHandle || this.disposed || this.destroyed || (this.nextRenderHandle = Ms(() => this.renderAndReset()));
  }
  calcViewportBoundaries() {
    const t = this.width, e = this.height, s = Dt(this.viewportTransform), i = at({ x: 0, y: 0 }, s), r = at({ x: t, y: e }, s), n = i.min(r), o = i.max(r);
    return this.vptCoords = { tl: n, tr: new w(o.x, n.y), bl: new w(n.x, o.y), br: o };
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (to(this.nextRenderHandle), this.nextRenderHandle = 0);
  }
  drawControls(t) {
  }
  renderCanvas(t, e) {
    if (this.destroyed) return;
    const s = this.viewportTransform, i = this.clipPath;
    this.calcViewportBoundaries(), this.clearContext(t), t.imageSmoothingEnabled = this.imageSmoothingEnabled, t.patternQuality = "best", this.fire("before:render", { ctx: t }), this._renderBackground(t), t.save(), t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this._renderObjects(t, e), t.restore(), this.controlsAboveOverlay || this.skipControlsDrawing || this.drawControls(t), i && (i._set("canvas", this), i.shouldCache(), i._transformDone = !0, i.renderCache({ forClipping: !0 }), this.drawClipPathOnCanvas(t, i)), this._renderOverlay(t), this.controlsAboveOverlay && !this.skipControlsDrawing && this.drawControls(t), this.fire("after:render", { ctx: t }), this.__cleanupTask && (this.__cleanupTask(), this.__cleanupTask = void 0);
  }
  drawClipPathOnCanvas(t, e) {
    const s = this.viewportTransform;
    t.save(), t.transform(...s), t.globalCompositeOperation = "destination-in", e.transform(t), t.scale(1 / e.zoomX, 1 / e.zoomY), t.drawImage(e._cacheCanvas, -e.cacheTranslationX, -e.cacheTranslationY), t.restore();
  }
  _renderObjects(t, e) {
    for (let s = 0, i = e.length; s < i; ++s) e[s] && e[s].render(t);
  }
  _renderBackgroundOrOverlay(t, e) {
    const s = this["".concat(e, "Color")], i = this["".concat(e, "Image")], r = this.viewportTransform, n = this["".concat(e, "Vpt")];
    if (!s && !i) return;
    const o = bt(s);
    if (s) {
      if (t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(this.width, 0), t.lineTo(this.width, this.height), t.lineTo(0, this.height), t.closePath(), t.fillStyle = o ? s.toLive(t) : s, n && t.transform(...r), o) {
        t.transform(1, 0, 0, 1, s.offsetX || 0, s.offsetY || 0);
        const h = s.gradientTransform || s.patternTransform;
        h && t.transform(...h);
      }
      t.fill(), t.restore();
    }
    if (i) {
      t.save();
      const { skipOffscreen: h } = this;
      this.skipOffscreen = n, n && t.transform(...r), i.render(t), this.skipOffscreen = h, t.restore();
    }
  }
  _renderBackground(t) {
    this._renderBackgroundOrOverlay(t, "background");
  }
  _renderOverlay(t) {
    this._renderBackgroundOrOverlay(t, "overlay");
  }
  getCenter() {
    return { top: this.height / 2, left: this.width / 2 };
  }
  getCenterPoint() {
    return new w(this.width / 2, this.height / 2);
  }
  centerObjectH(t) {
    return this._centerObject(t, new w(this.getCenterPoint().x, t.getCenterPoint().y));
  }
  centerObjectV(t) {
    return this._centerObject(t, new w(t.getCenterPoint().x, this.getCenterPoint().y));
  }
  centerObject(t) {
    return this._centerObject(t, this.getCenterPoint());
  }
  viewportCenterObject(t) {
    return this._centerObject(t, this.getVpCenter());
  }
  viewportCenterObjectH(t) {
    return this._centerObject(t, new w(this.getVpCenter().x, t.getCenterPoint().y));
  }
  viewportCenterObjectV(t) {
    return this._centerObject(t, new w(t.getCenterPoint().x, this.getVpCenter().y));
  }
  getVpCenter() {
    return at(this.getCenterPoint(), Dt(this.viewportTransform));
  }
  _centerObject(t, e) {
    t.setXY(e, R, R), t.setCoords(), this.renderOnAddRemove && this.requestRenderAll();
  }
  toDatalessJSON(t) {
    return this.toDatalessObject(t);
  }
  toObject(t) {
    return this._toObjectMethod("toObject", t);
  }
  toJSON() {
    return this.toObject();
  }
  toDatalessObject(t) {
    return this._toObjectMethod("toDatalessObject", t);
  }
  _toObjectMethod(t, e) {
    const s = this.clipPath, i = s && !s.excludeFromExport ? this._toObject(s, t, e) : null;
    return y(y(y({ version: fi }, Re(this, e)), {}, { objects: this._objects.filter((r) => !r.excludeFromExport).map((r) => this._toObject(r, t, e)) }, this.__serializeBgOverlay(t, e)), i ? { clipPath: i } : null);
  }
  _toObject(t, e, s) {
    let i;
    this.includeDefaultValues || (i = t.includeDefaultValues, t.includeDefaultValues = !1);
    const r = t[e](s);
    return this.includeDefaultValues || (t.includeDefaultValues = !!i), r;
  }
  __serializeBgOverlay(t, e) {
    const s = {}, i = this.backgroundImage, r = this.overlayImage, n = this.backgroundColor, o = this.overlayColor;
    return bt(n) ? n.excludeFromExport || (s.background = n.toObject(e)) : n && (s.background = n), bt(o) ? o.excludeFromExport || (s.overlay = o.toObject(e)) : o && (s.overlay = o), i && !i.excludeFromExport && (s.backgroundImage = this._toObject(i, t, e)), r && !r.excludeFromExport && (s.overlayImage = this._toObject(r, t, e)), s;
  }
  toSVG() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 ? arguments[1] : void 0;
    t.reviver = e;
    const s = [];
    return this._setSVGPreamble(s, t), this._setSVGHeader(s, t), this.clipPath && s.push('<g clip-path="url(#'.concat(this.clipPath.clipPathId, `)" >
`)), this._setSVGBgOverlayColor(s, "background"), this._setSVGBgOverlayImage(s, "backgroundImage", e), this._setSVGObjects(s, e), this.clipPath && s.push(`</g>
`), this._setSVGBgOverlayColor(s, "overlay"), this._setSVGBgOverlayImage(s, "overlayImage", e), s.push("</svg>"), s.join("");
  }
  _setSVGPreamble(t, e) {
    e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || "UTF-8", `" standalone="no" ?>
`, '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', `"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`);
  }
  _setSVGHeader(t, e) {
    const s = e.width || "".concat(this.width), i = e.height || "".concat(this.height), r = j.NUM_FRACTION_DIGITS, n = e.viewBox;
    let o;
    if (n) o = 'viewBox="'.concat(n.x, " ").concat(n.y, " ").concat(n.width, " ").concat(n.height, '" ');
    else if (this.svgViewportTransformation) {
      const h = this.viewportTransform;
      o = 'viewBox="'.concat(G(-h[4] / h[0], r), " ").concat(G(-h[5] / h[3], r), " ").concat(G(this.width / h[0], r), " ").concat(G(this.height / h[3], r), '" ');
    } else o = 'viewBox="0 0 '.concat(this.width, " ").concat(this.height, '" ');
    t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', s, '" ', 'height="', i, '" ', o, `xml:space="preserve">
`, "<desc>Created with Fabric.js ", fi, `</desc>
`, `<defs>
`, this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), this.createSVGClipPathMarkup(e), `</defs>
`);
  }
  createSVGClipPathMarkup(t) {
    const e = this.clipPath;
    return e ? (e.clipPathId = "CLIPPATH_".concat(Qt()), '<clipPath id="'.concat(e.clipPathId, `" >
`).concat(e.toClipPathSVG(t.reviver), `</clipPath>
`)) : "";
  }
  createSVGRefElementsMarkup() {
    return ["background", "overlay"].map((t) => {
      const e = this["".concat(t, "Color")];
      if (bt(e)) {
        const s = this["".concat(t, "Vpt")], i = this.viewportTransform, r = { isType: () => !1, width: this.width / (s ? i[0] : 1), height: this.height / (s ? i[3] : 1) };
        return e.toSVG(r, { additionalTransform: s ? zs(i) : "" });
      }
    }).join("");
  }
  createSVGFontFacesMarkup() {
    const t = [], e = {}, s = j.fontPaths;
    this._objects.forEach(function r(n) {
      t.push(n), ks(n) && n._objects.forEach(r);
    }), t.forEach((r) => {
      if (!qr(r)) return;
      const { styles: n, fontFamily: o } = r;
      !e[o] && s[o] && (e[o] = !0, n && Object.values(n).forEach((h) => {
        Object.values(h).forEach((c) => {
          let { fontFamily: l = "" } = c;
          !e[l] && s[l] && (e[l] = !0);
        });
      }));
    });
    const i = Object.keys(e).map((r) => `		@font-face {
			font-family: '`.concat(r, `';
			src: url('`).concat(s[r], `');
		}
`)).join("");
    return i ? `	<style type="text/css"><![CDATA[
`.concat(i, `]]></style>
`) : "";
  }
  _setSVGObjects(t, e) {
    this.forEachObject((s) => {
      s.excludeFromExport || this._setSVGObject(t, s, e);
    });
  }
  _setSVGObject(t, e, s) {
    t.push(e.toSVG(s));
  }
  _setSVGBgOverlayImage(t, e, s) {
    const i = this[e];
    i && !i.excludeFromExport && i.toSVG && t.push(i.toSVG(s));
  }
  _setSVGBgOverlayColor(t, e) {
    const s = this["".concat(e, "Color")];
    if (s) if (bt(s)) {
      const i = s.repeat || "", r = this.width, n = this.height, o = this["".concat(e, "Vpt")] ? zs(Dt(this.viewportTransform)) : "";
      t.push('<rect transform="'.concat(o, " translate(").concat(r / 2, ",").concat(n / 2, ')" x="').concat(s.offsetX - r / 2, '" y="').concat(s.offsetY - n / 2, '" width="').concat(i !== "repeat-y" && i !== "no-repeat" || !or(s) ? r : s.source.width, '" height="').concat(i !== "repeat-x" && i !== "no-repeat" || !or(s) ? n : s.source.height, '" fill="url(#SVGID_').concat(s.id, `)"></rect>
`));
    } else t.push('<rect x="0" y="0" width="100%" height="100%" ', 'fill="', s, '"', `></rect>
`);
  }
  loadFromJSON(t, e) {
    let { signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t) return Promise.reject(new Wt("`json` is undefined"));
    const i = typeof t == "string" ? JSON.parse(t) : t, { objects: r = [], backgroundImage: n, background: o, overlayImage: h, overlay: c, clipPath: l } = i, u = this.renderOnAddRemove;
    return this.renderOnAddRemove = !1, Promise.all([Ne(r, { reviver: e, signal: s }), qs({ backgroundImage: n, backgroundColor: o, overlayImage: h, overlayColor: c, clipPath: l }, { signal: s })]).then((d) => {
      let [g, f] = d;
      return this.clear(), this.add(...g), this.set(i), this.set(f), this.renderOnAddRemove = u, this;
    });
  }
  clone(t) {
    const e = this.toObject(t);
    return this.cloneWithoutData().loadFromJSON(e);
  }
  cloneWithoutData() {
    const t = It(this);
    return new this.constructor(t);
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: i = 1, enableRetinaScaling: r = !1 } = t, n = i * (r ? this.getRetinaScaling() : 1);
    return Hr(this.toCanvasElement(n, t), e, s);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, { width: e, height: s, left: i, top: r, filter: n } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = (e || this.width) * t, h = (s || this.height) * t, c = this.getZoom(), l = this.width, u = this.height, d = this.skipControlsDrawing, g = c * t, f = this.viewportTransform, v = [g, 0, 0, g, (f[4] - (i || 0)) * t, (f[5] - (r || 0)) * t], x = this.enableRetinaScaling, b = It({ width: o, height: h }), C = n ? this._objects.filter((_) => n(_)) : this._objects;
    return this.enableRetinaScaling = !1, this.viewportTransform = v, this.width = o, this.height = h, this.skipControlsDrawing = !0, this.calcViewportBoundaries(), this.renderCanvas(b.getContext("2d"), C), this.viewportTransform = f, this.width = l, this.height = u, this.calcViewportBoundaries(), this.enableRetinaScaling = x, this.skipControlsDrawing = d, b;
  }
  dispose() {
    return !this.disposed && this.elements.cleanupDOM({ width: this.width, height: this.height }), Fs.cancelByCanvas(this), this.disposed = !0, new Promise((t, e) => {
      const s = () => {
        this.destroy(), t(!0);
      };
      s.kill = e, this.__cleanupTask && this.__cleanupTask.kill("aborted"), this.destroyed ? t(!1) : this.nextRenderHandle ? this.__cleanupTask = s : s();
    });
  }
  destroy() {
    this.destroyed = !0, this.cancelRequestedRender(), this.forEachObject((t) => t.dispose()), this._objects = [], this.backgroundImage && this.backgroundImage.dispose(), this.backgroundImage = void 0, this.overlayImage && this.overlayImage.dispose(), this.overlayImage = void 0, this.elements.dispose();
  }
  toString() {
    return "#<Canvas (".concat(this.complexity(), "): { objects: ").concat(this._objects.length, " }>");
  }
}
m(je, "ownDefaults", oo);
const ao = ["touchstart", "touchmove", "touchend"], ho = (a) => {
  const t = Kr(a.target), e = function(s) {
    const i = s.changedTouches;
    return i && i[0] ? i[0] : s;
  }(a);
  return new w(e.clientX + t.left, e.clientY + t.top);
}, yi = (a) => ao.includes(a.type) || a.pointerType === "touch", xi = (a) => {
  a.preventDefault(), a.stopPropagation();
}, Vt = (a) => {
  let t = 0, e = 0, s = 0, i = 0;
  for (let r = 0, n = a.length; r < n; r++) {
    const { x: o, y: h } = a[r];
    (o > s || !r) && (s = o), (o < t || !r) && (t = o), (h > i || !r) && (i = h), (h < e || !r) && (e = h);
  }
  return { left: t, top: e, width: s - t, height: i - e };
}, co = ["translateX", "translateY", "scaleX", "scaleY"], lo = (a, t) => Is(a, et(t, a.calcOwnMatrix())), Is = (a, t) => {
  const e = Ws(t), { translateX: s, translateY: i, scaleX: r, scaleY: n } = e, o = V(e, co), h = new w(s, i);
  a.flipX = !1, a.flipY = !1, Object.assign(a, o), a.set({ scaleX: r, scaleY: n }), a.setPositionByOrigin(h, R, R);
}, uo = (a) => {
  a.scaleX = 1, a.scaleY = 1, a.skewX = 0, a.skewY = 0, a.flipX = !1, a.flipY = !1, a.rotate(0);
}, Qr = (a) => ({ scaleX: a.scaleX, scaleY: a.scaleY, skewX: a.skewX, skewY: a.skewY, angle: a.angle, left: a.left, flipX: a.flipX, flipY: a.flipY, top: a.top }), Xi = (a, t, e) => {
  const s = a / 2, i = t / 2, r = [new w(-s, -i), new w(s, -i), new w(-s, i), new w(s, i)].map((o) => o.transform(e)), n = Vt(r);
  return new w(n.width, n.height);
}, Ks = function() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ot;
  return et(Dt(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ot), a);
}, Oe = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ot, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ot;
  return a.transform(Ks(t, e));
}, go = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ot, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ot;
  return a.transform(Ks(t, e), !0);
}, po = (a, t, e) => {
  const s = Ks(t, e);
  return Is(a, et(s, a.calcOwnMatrix())), s;
}, tn = (a, t) => {
  var e;
  const { transform: { target: s } } = t;
  (e = s.canvas) === null || e === void 0 || e.fire("object:".concat(a), y(y({}, t), {}, { target: s })), s.fire(a, t);
}, fo = { left: -0.5, top: -0.5, center: 0, bottom: 0.5, right: 0.5 }, J = (a) => typeof a == "string" ? fo[a] : a - 0.5, Bs = "not-allowed";
function en(a) {
  return J(a.originX) === J(R) && J(a.originY) === J(R);
}
function hr(a) {
  return 0.5 - J(a);
}
const Rt = (a, t) => a[t], sn = (a, t, e, s) => ({ e: a, transform: t, pointer: new w(e, s) });
function rn(a, t) {
  const e = a.getTotalAngle() + de(Math.atan2(t.y, t.x)) + 360;
  return Math.round(e % 360 / 45);
}
function Yi(a, t, e, s, i) {
  var r;
  let { target: n, corner: o } = a;
  const h = n.controls[o], c = ((r = n.canvas) === null || r === void 0 ? void 0 : r.getZoom()) || 1, l = n.padding / c, u = function(d, g, f, v) {
    const x = d.getRelativeCenterPoint(), b = f !== void 0 && v !== void 0 ? d.translateToGivenOrigin(x, R, R, f, v) : new w(d.left, d.top);
    return (d.angle ? g.rotate(-K(d.angle), x) : g).subtract(b);
  }(n, new w(s, i), t, e);
  return u.x >= l && (u.x -= l), u.x <= -l && (u.x += l), u.y >= l && (u.y -= l), u.y <= l && (u.y += l), u.x -= h.offsetX, u.y -= h.offsetY, u;
}
const mo = (a, t, e, s) => {
  const { target: i, offsetX: r, offsetY: n } = t, o = e - r, h = s - n, c = !Rt(i, "lockMovementX") && i.left !== o, l = !Rt(i, "lockMovementY") && i.top !== h;
  return c && i.set(I, o), l && i.set(ht, h), (c || l) && tn(zr, sn(a, t, e, s)), c || l;
};
class nn {
  getSvgStyles(t) {
    const e = this.fillRule ? this.fillRule : "nonzero", s = this.strokeWidth ? this.strokeWidth : "0", i = this.strokeDashArray ? this.strokeDashArray.join(" ") : ct, r = this.strokeDashOffset ? this.strokeDashOffset : "0", n = this.strokeLineCap ? this.strokeLineCap : "butt", o = this.strokeLineJoin ? this.strokeLineJoin : "miter", h = this.strokeMiterLimit ? this.strokeMiterLimit : "4", c = this.opacity !== void 0 ? this.opacity : "1", l = this.visible ? "" : " visibility: hidden;", u = t ? "" : this.getSvgFilter(), d = Ge(Z, this.fill);
    return [Ge(lt, this.stroke), "stroke-width: ", s, "; ", "stroke-dasharray: ", i, "; ", "stroke-linecap: ", n, "; ", "stroke-dashoffset: ", r, "; ", "stroke-linejoin: ", o, "; ", "stroke-miterlimit: ", h, "; ", d, "fill-rule: ", e, "; ", "opacity: ", c, ";", u, l].join("");
  }
  getSvgFilter() {
    return this.shadow ? "filter: url(#SVGID_".concat(this.shadow.id, ");") : "";
  }
  getSvgCommons() {
    return [this.id ? 'id="'.concat(this.id, '" ') : "", this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ""].join("");
  }
  getSvgTransform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = t ? this.calcTransformMatrix() : this.calcOwnMatrix(), i = 'transform="'.concat(zs(s));
    return "".concat(i).concat(e, '" ');
  }
  _toSVG(t) {
    return [""];
  }
  toSVG(t) {
    return this._createBaseSVGMarkup(this._toSVG(t), { reviver: t });
  }
  toClipPathSVG(t) {
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(t), { reviver: t });
  }
  _createBaseClipPathSVGMarkup(t) {
    let { reviver: e, additionalTransform: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const i = [this.getSvgTransform(!0, s), this.getSvgCommons()].join(""), r = t.indexOf("COMMON_PARTS");
    return t[r] = i, e ? e(t.join("")) : t.join("");
  }
  _createBaseSVGMarkup(t) {
    let { noStyle: e, reviver: s, withShadow: i, additionalTransform: r } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = e ? "" : 'style="'.concat(this.getSvgStyles(), '" '), o = i ? 'style="'.concat(this.getSvgFilter(), '" ') : "", h = this.clipPath, c = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", l = h && h.absolutePositioned, u = this.stroke, d = this.fill, g = this.shadow, f = [], v = t.indexOf("COMMON_PARTS");
    let x;
    h && (h.clipPathId = "CLIPPATH_".concat(Qt()), x = '<clipPath id="'.concat(h.clipPathId, `" >
`).concat(h.toClipPathSVG(s), `</clipPath>
`)), l && f.push("<g ", o, this.getSvgCommons(), ` >
`), f.push("<g ", this.getSvgTransform(!1), l ? "" : o + this.getSvgCommons(), ` >
`);
    const b = [n, c, e ? "" : this.addPaintOrder(), " ", r ? 'transform="'.concat(r, '" ') : ""].join("");
    return t[v] = b, bt(d) && f.push(d.toSVG(this)), bt(u) && f.push(u.toSVG(this)), g && f.push(g.toSVG(this)), h && f.push(x), f.push(t.join("")), f.push(`</g>
`), l && f.push(`</g>
`), s ? s(f.join("")) : f.join("");
  }
  addPaintOrder() {
    return this.paintFirst !== Z ? ' paint-order="'.concat(this.paintFirst, '" ') : "";
  }
}
function Js(a) {
  return new RegExp("^(" + a.join("|") + ")\\b", "i");
}
var cr;
const ge = String.raw(cr || (cr = te(["(?:[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?)"], ["(?:[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?)"]))), vo = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + ge + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + ge + "))?\\s+(.*)"), yo = { cx: I, x: I, r: "radius", cy: ht, y: ht, display: "visible", visibility: "visible", transform: "transformMatrix", "fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "letter-spacing": "charSpacing", "paint-order": "paintFirst", "stroke-dasharray": "strokeDashArray", "stroke-dashoffset": "strokeDashOffset", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", "text-anchor": "textAnchor", opacity: "opacity", "clip-path": "clipPath", "clip-rule": "clipRule", "vector-effect": "strokeUniform", "image-rendering": "imageSmoothing" }, ni = "font-size", oi = "clip-path";
Js(["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text"]);
Js(["symbol", "image", "marker", "pattern", "view", "svg"]);
const lr = Js(["symbol", "g", "a", "svg", "clipPath", "defs"]), xo = new w(1, 0), on = new w(), an = (a, t) => a.rotate(t), wi = (a, t) => new w(t).subtract(a), bi = (a) => a.distanceFrom(on), Ci = (a, t) => Math.atan2(Xe(a, t), bo(a, t)), wo = (a) => Ci(xo, a), Hi = (a) => a.eq(on) ? a : a.scalarDivide(bi(a)), hn = function(a) {
  let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return Hi(new w(-a.y, a.x).scalarMultiply(t ? 1 : -1));
}, Xe = (a, t) => a.x * t.y - a.y * t.x, bo = (a, t) => a.x * t.x + a.y * t.y, ur = (a, t, e) => {
  if (a.eq(t) || a.eq(e)) return !0;
  const s = Xe(t, e), i = Xe(t, a), r = Xe(e, a);
  return s >= 0 ? i >= 0 && r <= 0 : !(i <= 0 && r >= 0);
}, dr = "(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?", gr = new RegExp("(?:\\s|^)" + dr + dr + "(" + ge + "?(?:px)?)?(?:\\s?|$)(?:$|\\s)");
class Ct {
  constructor(t) {
    const e = typeof t == "string" ? Ct.parseShadow(t) : t;
    Object.assign(this, Ct.ownDefaults, e), this.id = Qt();
  }
  static parseShadow(t) {
    const e = t.trim(), [, s = 0, i = 0, r = 0] = (gr.exec(e) || []).map((n) => parseFloat(n) || 0);
    return { color: (e.replace(gr, "") || "rgb(0,0,0)").trim(), offsetX: s, offsetY: i, blur: r };
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
  }
  toSVG(t) {
    const e = an(new w(this.offsetX, this.offsetY), K(-t.angle)), s = new z(this.color);
    let i = 40, r = 40;
    return t.width && t.height && (i = 100 * G((Math.abs(e.x) + this.blur) / t.width, j.NUM_FRACTION_DIGITS) + 20, r = 100 * G((Math.abs(e.y) + this.blur) / t.height, j.NUM_FRACTION_DIGITS) + 20), t.flipX && (e.x *= -1), t.flipY && (e.y *= -1), '<filter id="SVGID_'.concat(this.id, '" y="-').concat(r, '%" height="').concat(100 + 2 * r, '%" x="-').concat(i, '%" width="').concat(100 + 2 * i, `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`).concat(G(this.blur ? this.blur / 2 : 0, j.NUM_FRACTION_DIGITS), `"></feGaussianBlur>
	<feOffset dx="`).concat(G(e.x, j.NUM_FRACTION_DIGITS), '" dy="').concat(G(e.y, j.NUM_FRACTION_DIGITS), `" result="oBlur" ></feOffset>
	<feFlood flood-color="`).concat(s.toRgb(), '" flood-opacity="').concat(s.getAlpha(), `"/>
	<feComposite in2="oBlur" operator="in" />
	<feMerge>
		<feMergeNode></feMergeNode>
		<feMergeNode in="SourceGraphic"></feMergeNode>
	</feMerge>
</filter>
`);
  }
  toObject() {
    const t = { color: this.color, blur: this.blur, offsetX: this.offsetX, offsetY: this.offsetY, affectStroke: this.affectStroke, nonScaling: this.nonScaling, type: this.constructor.type }, e = Ct.ownDefaults;
    return this.includeDefaultValues ? t : Bi(t, (s, i) => s !== e[i]);
  }
  static async fromObject(t) {
    return new this(t);
  }
}
m(Ct, "ownDefaults", { color: "rgb(0,0,0)", blur: 0, offsetX: 0, offsetY: 0, affectStroke: !1, includeDefaultValues: !0, nonScaling: !1 }), m(Ct, "type", "shadow"), T.setClass(Ct, "shadow");
const ke = (a, t, e) => Math.max(a, Math.min(t, e)), Co = [ht, I, ut, _t, "flipX", "flipY", "originX", "originY", "angle", "opacity", "globalCompositeOperation", "shadow", "visible", De, Ae], Ut = [Z, lt, "strokeWidth", "strokeDashArray", "width", "height", "paintFirst", "strokeUniform", "strokeLineCap", "strokeDashOffset", "strokeLineJoin", "strokeMiterLimit", "backgroundColor", "clipPath"], _o = { top: 0, left: 0, width: 0, height: 0, angle: 0, flipX: !1, flipY: !1, scaleX: 1, scaleY: 1, minScaleLimit: 0, skewX: 0, skewY: 0, originX: I, originY: ht, strokeWidth: 1, strokeUniform: !1, padding: 0, opacity: 1, paintFirst: Z, fill: "rgb(0,0,0)", fillRule: "nonzero", stroke: null, strokeDashArray: null, strokeDashOffset: 0, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 4, globalCompositeOperation: "source-over", backgroundColor: "", shadow: null, visible: !0, includeDefaultValues: !0, excludeFromExport: !1, objectCaching: !0, clipPath: void 0, inverted: !1, absolutePositioned: !1, centeredRotation: !0, centeredScaling: !1, dirty: !0 }, So = (a, t, e, s) => -e * Math.cos(a / s * Je) + e + t, To = () => !1;
class Vi {
  constructor(t) {
    let { startValue: e, byValue: s, duration: i = 500, delay: r = 0, easing: n = So, onStart: o = Es, onChange: h = Es, onComplete: c = Es, abort: l = To, target: u } = t;
    m(this, "_state", "pending"), m(this, "durationProgress", 0), m(this, "valueProgress", 0), this.tick = this.tick.bind(this), this.duration = i, this.delay = r, this.easing = n, this._onStart = o, this._onChange = h, this._onComplete = c, this._abort = l, this.target = u, this.startValue = e, this.byValue = s, this.value = this.startValue, this.endValue = Object.freeze(this.calculate(this.duration).value);
  }
  get state() {
    return this._state;
  }
  isDone() {
    return this._state === "aborted" || this._state === "completed";
  }
  start() {
    const t = (e) => {
      this._state === "pending" && (this.startTime = e || +/* @__PURE__ */ new Date(), this._state = "running", this._onStart(), this.tick(this.startTime));
    };
    this.register(), this.delay > 0 ? setTimeout(() => Ms(t), this.delay) : Ms(t);
  }
  tick(t) {
    const e = (t || +/* @__PURE__ */ new Date()) - this.startTime, s = Math.min(e, this.duration);
    this.durationProgress = s / this.duration;
    const { value: i, valueProgress: r } = this.calculate(s);
    this.value = Object.freeze(i), this.valueProgress = r, this._state !== "aborted" && (this._abort(this.value, this.valueProgress, this.durationProgress) ? (this._state = "aborted", this.unregister()) : e >= this.duration ? (this.durationProgress = this.valueProgress = 1, this._onChange(this.endValue, this.valueProgress, this.durationProgress), this._state = "completed", this._onComplete(this.endValue, this.valueProgress, this.durationProgress), this.unregister()) : (this._onChange(this.value, this.valueProgress, this.durationProgress), Ms(this.tick)));
  }
  register() {
    Fs.push(this);
  }
  unregister() {
    Fs.remove(this);
  }
  abort() {
    this._state = "aborted", this.unregister();
  }
}
const Oo = ["startValue", "endValue"];
class Eo extends Vi {
  constructor(t) {
    let { startValue: e = 0, endValue: s = 100 } = t;
    super(y(y({}, V(t, Oo)), {}, { startValue: e, byValue: s - e }));
  }
  calculate(t) {
    const e = this.easing(t, this.startValue, this.byValue, this.duration);
    return { value: e, valueProgress: Math.abs((e - this.startValue) / this.byValue) };
  }
}
const ko = ["startValue", "endValue"];
class Mo extends Vi {
  constructor(t) {
    let { startValue: e = [0], endValue: s = [100] } = t;
    super(y(y({}, V(t, ko)), {}, { startValue: e, byValue: s.map((i, r) => i - e[r]) }));
  }
  calculate(t) {
    const e = this.startValue.map((s, i) => this.easing(t, s, this.byValue[i], this.duration, i));
    return { value: e, valueProgress: Math.abs((e[0] - this.startValue[0]) / this.byValue[0]) };
  }
}
const Do = ["startValue", "endValue", "easing", "onChange", "onComplete", "abort"], Ao = (a, t, e, s) => t + e * (1 - Math.cos(a / s * Je)), ai = (a) => a && ((t, e, s) => a(new z(t).toRgba(), e, s));
class Ro extends Vi {
  constructor(t) {
    let { startValue: e, endValue: s, easing: i = Ao, onChange: r, onComplete: n, abort: o } = t, h = V(t, Do);
    const c = new z(e).getSource(), l = new z(s).getSource();
    super(y(y({}, h), {}, { startValue: c, byValue: l.map((u, d) => u - c[d]), easing: i, onChange: ai(r), onComplete: ai(n), abort: ai(o) }));
  }
  calculate(t) {
    const [e, s, i, r] = this.startValue.map((o, h) => this.easing(t, o, this.byValue[h], this.duration, h)), n = [...[e, s, i].map(Math.round), ke(0, r, 1)];
    return { value: n, valueProgress: n.map((o, h) => this.byValue[h] !== 0 ? Math.abs((o - this.startValue[h]) / this.byValue[h]) : 0).find((o) => o !== 0) || 0 };
  }
}
function cn(a) {
  const t = ((e) => Array.isArray(e.startValue) || Array.isArray(e.endValue))(a) ? new Mo(a) : new Eo(a);
  return t.start(), t;
}
function jo(a) {
  const t = new Ro(a);
  return t.start(), t;
}
class N {
  constructor(t) {
    this.status = t, this.points = [];
  }
  includes(t) {
    return this.points.some((e) => e.eq(t));
  }
  append() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return this.points = this.points.concat(e.filter((i) => !this.includes(i))), this;
  }
  static isPointContained(t, e, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
    if (e.eq(s)) return t.eq(e);
    if (e.x === s.x) return t.x === e.x && (i || t.y >= Math.min(e.y, s.y) && t.y <= Math.max(e.y, s.y));
    if (e.y === s.y) return t.y === e.y && (i || t.x >= Math.min(e.x, s.x) && t.x <= Math.max(e.x, s.x));
    {
      const r = wi(e, s), n = wi(e, t).divide(r);
      return i ? Math.abs(n.x) === Math.abs(n.y) : n.x === n.y && n.x >= 0 && n.x <= 1;
    }
  }
  static isPointInPolygon(t, e) {
    const s = new w(t).setX(Math.min(t.x - 1, ...e.map((r) => r.x)));
    let i = 0;
    for (let r = 0; r < e.length; r++) {
      const n = this.intersectSegmentSegment(e[r], e[(r + 1) % e.length], t, s);
      if (n.includes(t)) return !0;
      i += +(n.status === "Intersection");
    }
    return i % 2 == 1;
  }
  static intersectLineLine(t, e, s, i) {
    let r = !(arguments.length > 4 && arguments[4] !== void 0) || arguments[4], n = !(arguments.length > 5 && arguments[5] !== void 0) || arguments[5];
    const o = e.x - t.x, h = e.y - t.y, c = i.x - s.x, l = i.y - s.y, u = t.x - s.x, d = t.y - s.y, g = c * d - l * u, f = o * d - h * u, v = l * o - c * h;
    if (v !== 0) {
      const x = g / v, b = f / v;
      return (r || 0 <= x && x <= 1) && (n || 0 <= b && b <= 1) ? new N("Intersection").append(new w(t.x + x * o, t.y + x * h)) : new N();
    }
    if (g === 0 || f === 0) {
      const x = r || n || N.isPointContained(t, s, i) || N.isPointContained(e, s, i) || N.isPointContained(s, t, e) || N.isPointContained(i, t, e);
      return new N(x ? "Coincident" : void 0);
    }
    return new N("Parallel");
  }
  static intersectSegmentLine(t, e, s, i) {
    return N.intersectLineLine(t, e, s, i, !1, !0);
  }
  static intersectSegmentSegment(t, e, s, i) {
    return N.intersectLineLine(t, e, s, i, !1, !1);
  }
  static intersectLinePolygon(t, e, s) {
    let i = !(arguments.length > 3 && arguments[3] !== void 0) || arguments[3];
    const r = new N(), n = s.length;
    for (let o, h, c, l = 0; l < n; l++) {
      if (o = s[l], h = s[(l + 1) % n], c = N.intersectLineLine(t, e, o, h, i, !1), c.status === "Coincident") return c;
      r.append(...c.points);
    }
    return r.points.length > 0 && (r.status = "Intersection"), r;
  }
  static intersectSegmentPolygon(t, e, s) {
    return N.intersectLinePolygon(t, e, s, !1);
  }
  static intersectPolygonPolygon(t, e) {
    const s = new N(), i = t.length, r = [];
    for (let n = 0; n < i; n++) {
      const o = t[n], h = t[(n + 1) % i], c = N.intersectSegmentPolygon(o, h, e);
      c.status === "Coincident" ? (r.push(c), s.append(o, h)) : s.append(...c.points);
    }
    return r.length > 0 && r.length === t.length ? new N("Coincident") : (s.points.length > 0 && (s.status = "Intersection"), s);
  }
  static intersectPolygonRectangle(t, e, s) {
    const i = e.min(s), r = e.max(s), n = new w(r.x, i.y), o = new w(i.x, r.y);
    return N.intersectPolygonPolygon(t, [i, n, r, o]);
  }
}
class Lo extends Yr {
  getX() {
    return this.getXY().x;
  }
  setX(t) {
    this.setXY(this.getXY().setX(t));
  }
  getY() {
    return this.getXY().y;
  }
  setY(t) {
    this.setXY(this.getXY().setY(t));
  }
  getRelativeX() {
    return this.left;
  }
  setRelativeX(t) {
    this.left = t;
  }
  getRelativeY() {
    return this.top;
  }
  setRelativeY(t) {
    this.top = t;
  }
  getXY() {
    const t = this.getRelativeXY();
    return this.group ? at(t, this.group.calcTransformMatrix()) : t;
  }
  setXY(t, e, s) {
    this.group && (t = at(t, Dt(this.group.calcTransformMatrix()))), this.setRelativeXY(t, e, s);
  }
  getRelativeXY() {
    return new w(this.left, this.top);
  }
  setRelativeXY(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.originX, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.originY;
    this.setPositionByOrigin(t, e, s);
  }
  isStrokeAccountedForInDimensions() {
    return !1;
  }
  getCoords() {
    const { tl: t, tr: e, br: s, bl: i } = this.aCoords || (this.aCoords = this.calcACoords()), r = [t, e, s, i];
    if (this.group) {
      const n = this.group.calcTransformMatrix();
      return r.map((o) => at(o, n));
    }
    return r;
  }
  intersectsWithRect(t, e) {
    return N.intersectPolygonRectangle(this.getCoords(), t, e).status === "Intersection";
  }
  intersectsWithObject(t) {
    const e = N.intersectPolygonPolygon(this.getCoords(), t.getCoords());
    return e.status === "Intersection" || e.status === "Coincident" || t.isContainedWithinObject(this) || this.isContainedWithinObject(t);
  }
  isContainedWithinObject(t) {
    return this.getCoords().every((e) => t.containsPoint(e));
  }
  isContainedWithinRect(t, e) {
    const { left: s, top: i, width: r, height: n } = this.getBoundingRect();
    return s >= t.x && s + r <= e.x && i >= t.y && i + n <= e.y;
  }
  isOverlapping(t) {
    return this.intersectsWithObject(t) || this.isContainedWithinObject(t) || t.isContainedWithinObject(this);
  }
  containsPoint(t) {
    return N.isPointInPolygon(t, this.getCoords());
  }
  isOnScreen() {
    if (!this.canvas) return !1;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return !!this.getCoords().some((s) => s.x <= e.x && s.x >= t.x && s.y <= e.y && s.y >= t.y) || !!this.intersectsWithRect(t, e) || this.containsPoint(t.midPointFrom(e));
  }
  isPartiallyOnScreen() {
    if (!this.canvas) return !1;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return this.intersectsWithRect(t, e) ? !0 : this.getCoords().every((s) => (s.x >= e.x || s.x <= t.x) && (s.y >= e.y || s.y <= t.y)) && this.containsPoint(t.midPointFrom(e));
  }
  getBoundingRect() {
    return Vt(this.getCoords());
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x;
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y;
  }
  scale(t) {
    this._set(ut, t), this._set(_t, t), this.setCoords();
  }
  scaleToWidth(t) {
    const e = this.getBoundingRect().width / this.getScaledWidth();
    return this.scale(t / this.width / e);
  }
  scaleToHeight(t) {
    const e = this.getBoundingRect().height / this.getScaledHeight();
    return this.scale(t / this.height / e);
  }
  getCanvasRetinaScaling() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.getRetinaScaling()) || 1;
  }
  getTotalAngle() {
    return this.group ? de(Vr(this.calcTransformMatrix())) : this.angle;
  }
  getViewportTransform() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.viewportTransform) || ot.concat();
  }
  calcACoords() {
    const t = $e({ angle: this.angle }), { x: e, y: s } = this.getRelativeCenterPoint(), i = Ze(e, s), r = et(i, t), n = this._getTransformedDimensions(), o = n.x / 2, h = n.y / 2;
    return { tl: at({ x: -o, y: -h }, r), tr: at({ x: o, y: -h }, r), bl: at({ x: -o, y: h }, r), br: at({ x: o, y: h }, r) };
  }
  setCoords() {
    this.aCoords = this.calcACoords();
  }
  transformMatrixKey() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = [];
    return !t && this.group && (e = this.group.transformMatrixKey(t)), e.push(this.top, this.left, this.width, this.height, this.scaleX, this.scaleY, this.angle, this.strokeWidth, this.skewX, this.skewY, +this.flipX, +this.flipY, J(this.originX), J(this.originY)), e;
  }
  calcTransformMatrix() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = this.calcOwnMatrix();
    if (t || !this.group) return e;
    const s = this.transformMatrixKey(t), i = this.matrixCache;
    return i && i.key.every((r, n) => r === s[n]) ? i.value : (this.group && (e = et(this.group.calcTransformMatrix(!1), e)), this.matrixCache = { key: s, value: e }, e);
  }
  calcOwnMatrix() {
    const t = this.transformMatrixKey(!0), e = this.ownMatrixCache;
    if (e && e.key === t) return e.value;
    const s = this.getRelativeCenterPoint(), i = { angle: this.angle, translateX: s.x, translateY: s.y, scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, flipX: this.flipX, flipY: this.flipY }, r = ro(i);
    return this.ownMatrixCache = { key: t, value: r }, r;
  }
  _getNonTransformedDimensions() {
    return new w(this.width, this.height).scalarAdd(this.strokeWidth);
  }
  _calculateCurrentDimensions(t) {
    return this._getTransformedDimensions(t).transform(this.getViewportTransform(), !0).scalarAdd(2 * this.padding);
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = y({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, width: this.width, height: this.height, strokeWidth: this.strokeWidth }, t), s = e.strokeWidth;
    let i = s, r = 0;
    this.strokeUniform && (i = 0, r = s);
    const n = e.width + i, o = e.height + i;
    let h;
    return h = e.skewX === 0 && e.skewY === 0 ? new w(n * e.scaleX, o * e.scaleY) : Xi(n, o, Us(e)), h.scalarAdd(r);
  }
  translateToGivenOrigin(t, e, s, i, r) {
    let n = t.x, o = t.y;
    const h = J(i) - J(e), c = J(r) - J(s);
    if (h || c) {
      const l = this._getTransformedDimensions();
      n += h * l.x, o += c * l.y;
    }
    return new w(n, o);
  }
  translateToCenterPoint(t, e, s) {
    if (e === R && s === R) return t;
    const i = this.translateToGivenOrigin(t, e, s, R, R);
    return this.angle ? i.rotate(K(this.angle), t) : i;
  }
  translateToOriginPoint(t, e, s) {
    const i = this.translateToGivenOrigin(t, R, R, e, s);
    return this.angle ? i.rotate(K(this.angle), t) : i;
  }
  getCenterPoint() {
    const t = this.getRelativeCenterPoint();
    return this.group ? at(t, this.group.calcTransformMatrix()) : t;
  }
  getRelativeCenterPoint() {
    return this.translateToCenterPoint(new w(this.left, this.top), this.originX, this.originY);
  }
  getPointByOrigin(t, e) {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), t, e);
  }
  setPositionByOrigin(t, e, s) {
    const i = this.translateToCenterPoint(t, e, s), r = this.translateToOriginPoint(i, this.originX, this.originY);
    this.set({ left: r.x, top: r.y });
  }
  _getLeftTopCoords() {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), I, ht);
  }
}
const Po = ["type"], Fo = ["extraParam"];
let Bt = class As extends Lo {
  static getDefaults() {
    return As.ownDefaults;
  }
  get type() {
    const t = this.constructor.type;
    return t === "FabricObject" ? "object" : t.toLowerCase();
  }
  set type(t) {
    $t("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    super(), m(this, "_cacheContext", null), Object.assign(this, As.ownDefaults), this.setOptions(t);
  }
  _createCacheCanvas() {
    this._cacheCanvas = St(), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas(), this.dirty = !0;
  }
  _limitCacheSize(t) {
    const e = t.width, s = t.height, i = j.maxCacheSideLimit, r = j.minCacheSideLimit;
    if (e <= i && s <= i && e * s <= j.perfLimitSizeTotal) return e < r && (t.width = r), s < r && (t.height = r), t;
    const n = e / s, [o, h] = Be.limitDimsByArea(n), c = ke(r, o, i), l = ke(r, h, i);
    return e > c && (t.zoomX /= e / c, t.width = c, t.capped = !0), s > l && (t.zoomY /= s / l, t.height = l, t.capped = !0), t;
  }
  _getCacheCanvasDimensions() {
    const t = this.getTotalObjectScaling(), e = this._getTransformedDimensions({ skewX: 0, skewY: 0 }), s = e.x * t.x / this.scaleX, i = e.y * t.y / this.scaleY;
    return { width: s + 2, height: i + 2, zoomX: t.x, zoomY: t.y, x: s, y: i };
  }
  _updateCacheCanvas() {
    const t = this._cacheCanvas, e = this._cacheContext, s = this._limitCacheSize(this._getCacheCanvasDimensions()), i = j.minCacheSideLimit, r = s.width, n = s.height, o = s.zoomX, h = s.zoomY, c = r !== t.width || n !== t.height, l = this.zoomX !== o || this.zoomY !== h;
    if (!t || !e) return !1;
    let u, d, g = c || l, f = 0, v = 0, x = !1;
    if (c) {
      const b = this._cacheCanvas.width, C = this._cacheCanvas.height, _ = r > b || n > C;
      x = _ || (r < 0.9 * b || n < 0.9 * C) && b > i && C > i, _ && !s.capped && (r > i || n > i) && (f = 0.1 * r, v = 0.1 * n);
    }
    return qr(this) && this.path && (g = !0, x = !0, f += this.getHeightOfLine(0) * this.zoomX, v += this.getHeightOfLine(0) * this.zoomY), !!g && (x ? (t.width = Math.ceil(r + f), t.height = Math.ceil(n + v)) : (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height)), u = s.x / 2, d = s.y / 2, this.cacheTranslationX = Math.round(t.width / 2 - u) + u, this.cacheTranslationY = Math.round(t.height / 2 - d) + d, e.translate(this.cacheTranslationX, this.cacheTranslationY), e.scale(o, h), this.zoomX = o, this.zoomY = h, !0);
  }
  setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this._setOptions(t);
  }
  transform(t) {
    const e = this.group && !this.group._transformDone || this.group && this.canvas && t === this.canvas.contextTop, s = this.calcTransformMatrix(!e);
    t.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
  }
  getObjectScaling() {
    if (!this.group) return new w(Math.abs(this.scaleX), Math.abs(this.scaleY));
    const t = Ws(this.calcTransformMatrix());
    return new w(Math.abs(t.scaleX), Math.abs(t.scaleY));
  }
  getTotalObjectScaling() {
    const t = this.getObjectScaling();
    if (this.canvas) {
      const e = this.canvas.getZoom(), s = this.getCanvasRetinaScaling();
      return t.scalarMultiply(e * s);
    }
    return t;
  }
  getObjectOpacity() {
    let t = this.opacity;
    return this.group && (t *= this.group.getObjectOpacity()), t;
  }
  _constrainScale(t) {
    return Math.abs(t) < this.minScaleLimit ? t < 0 ? -this.minScaleLimit : this.minScaleLimit : t === 0 ? 1e-4 : t;
  }
  _set(t, e) {
    t !== ut && t !== _t || (e = this._constrainScale(e)), t === ut && e < 0 ? (this.flipX = !this.flipX, e *= -1) : t === "scaleY" && e < 0 ? (this.flipY = !this.flipY, e *= -1) : t !== "shadow" || !e || e instanceof Ct || (e = new Ct(e));
    const s = this[t] !== e;
    return this[t] = e, s && this.constructor.cacheProperties.includes(t) && (this.dirty = !0), this.parent && (this.dirty || s && this.constructor.stateProperties.includes(t)) && this.parent._set("dirty", !0), this;
  }
  isNotVisible() {
    return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
  }
  render(t) {
    this.isNotVisible() || this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (t.save(), this._setupCompositeOperation(t), this.drawSelectionBackground(t), this.transform(t), this._setOpacity(t), this._setShadow(t), this.shouldCache() ? (this.renderCache(), this.drawCacheOnCanvas(t)) : (this._removeCacheCanvas(), this.drawObject(t, !1, {}), this.dirty = !1), t.restore());
  }
  drawSelectionBackground(t) {
  }
  renderCache(t) {
    if (t = t || {}, this._cacheCanvas && this._cacheContext || this._createCacheCanvas(), this.isCacheDirty() && this._cacheContext) {
      const { zoomX: e, zoomY: s, cacheTranslationX: i, cacheTranslationY: r } = this, { width: n, height: o } = this._cacheCanvas;
      this.drawObject(this._cacheContext, t.forClipping, { zoomX: e, zoomY: s, cacheTranslationX: i, cacheTranslationY: r, width: n, height: o, parentClipPaths: [] }), this.dirty = !1;
    }
  }
  _removeCacheCanvas() {
    this._cacheCanvas = void 0, this._cacheContext = null;
  }
  hasStroke() {
    return this.stroke && this.stroke !== "transparent" && this.strokeWidth !== 0;
  }
  hasFill() {
    return this.fill && this.fill !== "transparent";
  }
  needsItsOwnCache() {
    return !!(this.paintFirst === lt && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath;
  }
  shouldCache() {
    return this.ownCaching = this.needsItsOwnCache() || this.objectCaching && (!this.parent || !this.parent.isOnACache()), this.ownCaching;
  }
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
  }
  drawClipPathOnCache(t, e, s) {
    t.save(), e.inverted ? t.globalCompositeOperation = "destination-out" : t.globalCompositeOperation = "destination-in", t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(s, 0, 0), t.restore();
  }
  drawObject(t, e, s) {
    const i = this.fill, r = this.stroke;
    e ? (this.fill = "black", this.stroke = "", this._setClippingProperties(t)) : this._renderBackground(t), this._render(t), this._drawClipPath(t, this.clipPath, s), this.fill = i, this.stroke = r;
  }
  createClipPathLayer(t, e) {
    const s = It(e), i = s.getContext("2d");
    if (i.translate(e.cacheTranslationX, e.cacheTranslationY), i.scale(e.zoomX, e.zoomY), t._cacheCanvas = s, e.parentClipPaths.forEach((r) => {
      r.transform(i);
    }), e.parentClipPaths.push(t), t.absolutePositioned) {
      const r = Dt(this.calcTransformMatrix());
      i.transform(r[0], r[1], r[2], r[3], r[4], r[5]);
    }
    return t.transform(i), t.drawObject(i, !0, e), s;
  }
  _drawClipPath(t, e, s) {
    if (!e) return;
    e._transformDone = !0;
    const i = this.createClipPathLayer(e, s);
    this.drawClipPathOnCache(t, e, i);
  }
  drawCacheOnCanvas(t) {
    t.scale(1 / this.zoomX, 1 / this.zoomY), t.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
  }
  isCacheDirty() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
    if (this.isNotVisible()) return !1;
    const e = this._cacheCanvas, s = this._cacheContext;
    return !(!e || !s || t || !this._updateCacheCanvas()) || !!(this.dirty || this.clipPath && this.clipPath.absolutePositioned) && (e && s && !t && (s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, e.width, e.height), s.restore()), !0);
  }
  _renderBackground(t) {
    if (!this.backgroundColor) return;
    const e = this._getNonTransformedDimensions();
    t.fillStyle = this.backgroundColor, t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y), this._removeShadow(t);
  }
  _setOpacity(t) {
    this.group && !this.group._transformDone ? t.globalAlpha = this.getObjectOpacity() : t.globalAlpha *= this.opacity;
  }
  _setStrokeStyles(t, e) {
    const s = e.stroke;
    s && (t.lineWidth = e.strokeWidth, t.lineCap = e.strokeLineCap, t.lineDashOffset = e.strokeDashOffset, t.lineJoin = e.strokeLineJoin, t.miterLimit = e.strokeMiterLimit, bt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? this._applyPatternForTransformedGradient(t, s) : (t.strokeStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.strokeStyle = e.stroke);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    s && (bt(s) ? (t.fillStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.fillStyle = s);
  }
  _setClippingProperties(t) {
    t.globalAlpha = 1, t.strokeStyle = "transparent", t.fillStyle = "#000000";
  }
  _setLineDash(t, e) {
    e && e.length !== 0 && (1 & e.length && e.push(...e), t.setLineDash(e));
  }
  _setShadow(t) {
    if (!this.shadow) return;
    const e = this.shadow, s = this.canvas, i = this.getCanvasRetinaScaling(), [r, , , n] = (s == null ? void 0 : s.viewportTransform) || ot, o = r * i, h = n * i, c = e.nonScaling ? new w(1, 1) : this.getObjectScaling();
    t.shadowColor = e.color, t.shadowBlur = e.blur * j.browserShadowBlurConstant * (o + h) * (c.x + c.y) / 4, t.shadowOffsetX = e.offsetX * o * c.x, t.shadowOffsetY = e.offsetY * h * c.y;
  }
  _removeShadow(t) {
    this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0);
  }
  _applyPatternGradientTransform(t, e) {
    if (!bt(e)) return { offsetX: 0, offsetY: 0 };
    const s = e.gradientTransform || e.patternTransform, i = -this.width / 2 + e.offsetX || 0, r = -this.height / 2 + e.offsetY || 0;
    return e.gradientUnits === "percentage" ? t.transform(this.width, 0, 0, this.height, i, r) : t.transform(1, 0, 0, 1, i, r), s && t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), { offsetX: i, offsetY: r };
  }
  _renderPaintInOrder(t) {
    this.paintFirst === lt ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t));
  }
  _render(t) {
  }
  _renderFill(t) {
    this.fill && (t.save(), this._setFillStyles(t, this), this.fillRule === "evenodd" ? t.fill("evenodd") : t.fill(), t.restore());
  }
  _renderStroke(t) {
    if (this.stroke && this.strokeWidth !== 0) {
      if (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeUniform) {
        const e = this.getObjectScaling();
        t.scale(1 / e.x, 1 / e.y);
      }
      this._setLineDash(t, this.strokeDashArray), this._setStrokeStyles(t, this), t.stroke(), t.restore();
    }
  }
  _applyPatternForTransformedGradient(t, e) {
    var s;
    const i = this._limitCacheSize(this._getCacheCanvasDimensions()), r = this.getCanvasRetinaScaling(), n = i.x / this.scaleX / r, o = i.y / this.scaleY / r, h = It({ width: Math.ceil(n), height: Math.ceil(o) }), c = h.getContext("2d");
    c && (c.beginPath(), c.moveTo(0, 0), c.lineTo(n, 0), c.lineTo(n, o), c.lineTo(0, o), c.closePath(), c.translate(n / 2, o / 2), c.scale(i.zoomX / this.scaleX / r, i.zoomY / this.scaleY / r), this._applyPatternGradientTransform(c, e), c.fillStyle = e.toLive(t), c.fill(), t.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2), t.scale(r * this.scaleX / i.zoomX, r * this.scaleY / i.zoomY), t.strokeStyle = (s = c.createPattern(h, "no-repeat")) !== null && s !== void 0 ? s : "");
  }
  _findCenterFromElement() {
    return new w(this.left + this.width / 2, this.top + this.height / 2);
  }
  clone(t) {
    const e = this.toObject(t);
    return this.constructor.fromObject(e);
  }
  cloneAsImage(t) {
    const e = this.toCanvasElement(t);
    return new (T.getClass("image"))(e);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = Qr(this), s = this.group, i = this.shadow, r = Math.abs, n = t.enableRetinaScaling ? Wr() : 1, o = (t.multiplier || 1) * n, h = t.canvasProvider || ((C) => new je(C, { enableRetinaScaling: !1, renderOnAddRemove: !1, skipOffscreen: !1 }));
    delete this.group, t.withoutTransform && uo(this), t.withoutShadow && (this.shadow = null), t.viewportTransform && po(this, this.getViewportTransform()), this.setCoords();
    const c = St(), l = this.getBoundingRect(), u = this.shadow, d = new w();
    if (u) {
      const C = u.blur, _ = u.nonScaling ? new w(1, 1) : this.getObjectScaling();
      d.x = 2 * Math.round(r(u.offsetX) + C) * r(_.x), d.y = 2 * Math.round(r(u.offsetY) + C) * r(_.y);
    }
    const g = l.width + d.x, f = l.height + d.y;
    c.width = Math.ceil(g), c.height = Math.ceil(f);
    const v = h(c);
    t.format === "jpeg" && (v.backgroundColor = "#fff"), this.setPositionByOrigin(new w(v.width / 2, v.height / 2), R, R);
    const x = this.canvas;
    v._objects = [this], this.set("canvas", v), this.setCoords();
    const b = v.toCanvasElement(o || 1, t);
    return this.set("canvas", x), this.shadow = i, s && (this.group = s), this.set(e), this.setCoords(), v._objects = [], v.destroy(), b;
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Hr(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  isType() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return e.includes(this.constructor.type) || e.includes(this.type);
  }
  complexity() {
    return 1;
  }
  toJSON() {
    return this.toObject();
  }
  rotate(t) {
    const { centeredRotation: e, originX: s, originY: i } = this;
    if (e) {
      const { x: r, y: n } = this.getRelativeCenterPoint();
      this.originX = R, this.originY = R, this.left = r, this.top = n;
    }
    if (this.set("angle", t), e) {
      const { x: r, y: n } = this.translateToOriginPoint(this.getRelativeCenterPoint(), s, i);
      this.left = r, this.top = n, this.originX = s, this.originY = i;
    }
  }
  setOnGroup() {
  }
  _setupCompositeOperation(t) {
    this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation);
  }
  dispose() {
    Fs.cancelByTarget(this), this.off(), this._set("canvas", void 0), this._cacheCanvas && zt().dispose(this._cacheCanvas), this._cacheCanvas = void 0, this._cacheContext = null;
  }
  animate(t, e) {
    return Object.entries(t).reduce((s, i) => {
      let [r, n] = i;
      return s[r] = this._animate(r, n, e), s;
    }, {});
  }
  _animate(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = t.split("."), r = this.constructor.colorProperties.includes(i[i.length - 1]), { abort: n, startValue: o, onChange: h, onComplete: c } = s, l = y(y({}, s), {}, { target: this, startValue: o ?? i.reduce((u, d) => u[d], this), endValue: e, abort: n == null ? void 0 : n.bind(this), onChange: (u, d, g) => {
      i.reduce((f, v, x) => (x === i.length - 1 && (f[v] = u), f[v]), this), h && h(u, d, g);
    }, onComplete: (u, d, g) => {
      this.setCoords(), c && c(u, d, g);
    } });
    return r ? jo(l) : cn(l);
  }
  isDescendantOf(t) {
    const { parent: e, group: s } = this;
    return e === t || s === t || !!e && e.isDescendantOf(t) || !!s && s !== e && s.isDescendantOf(t);
  }
  getAncestors() {
    const t = [];
    let e = this;
    do
      e = e.parent, e && t.push(e);
    while (e);
    return t;
  }
  findCommonAncestors(t) {
    if (this === t) return { fork: [], otherFork: [], common: [this, ...this.getAncestors()] };
    const e = this.getAncestors(), s = t.getAncestors();
    if (e.length === 0 && s.length > 0 && this === s[s.length - 1]) return { fork: [], otherFork: [t, ...s.slice(0, s.length - 1)], common: [this] };
    for (let i, r = 0; r < e.length; r++) {
      if (i = e[r], i === t) return { fork: [this, ...e.slice(0, r)], otherFork: [], common: e.slice(r) };
      for (let n = 0; n < s.length; n++) {
        if (this === s[n]) return { fork: [], otherFork: [t, ...s.slice(0, n)], common: [this, ...e] };
        if (i === s[n]) return { fork: [this, ...e.slice(0, r)], otherFork: [t, ...s.slice(0, n)], common: e.slice(r) };
      }
    }
    return { fork: [this, ...e], otherFork: [t, ...s], common: [] };
  }
  hasCommonAncestors(t) {
    const e = this.findCommonAncestors(t);
    return e && !!e.common.length;
  }
  isInFrontOf(t) {
    if (this === t) return;
    const e = this.findCommonAncestors(t);
    if (e.fork.includes(t)) return !0;
    if (e.otherFork.includes(this)) return !1;
    const s = e.common[0] || this.canvas;
    if (!s) return;
    const i = e.fork.pop(), r = e.otherFork.pop(), n = s._objects.indexOf(i), o = s._objects.indexOf(r);
    return n > -1 && n > o;
  }
  toObject() {
    const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).concat(As.customProperties, this.constructor.customProperties || []);
    let e;
    const s = j.NUM_FRACTION_DIGITS, { clipPath: i, fill: r, stroke: n, shadow: o, strokeDashArray: h, left: c, top: l, originX: u, originY: d, width: g, height: f, strokeWidth: v, strokeLineCap: x, strokeDashOffset: b, strokeLineJoin: C, strokeUniform: _, strokeMiterLimit: S, scaleX: k, scaleY: M, angle: A, flipX: E, flipY: F, opacity: P, visible: Y, backgroundColor: H, fillRule: L, paintFirst: X, globalCompositeOperation: Q, skewX: U, skewY: dt } = this;
    i && !i.excludeFromExport && (e = i.toObject(t.concat("inverted", "absolutePositioned")));
    const W = (vt) => G(vt, s), mt = y(y({}, Re(this, t)), {}, { type: this.constructor.type, version: fi, originX: u, originY: d, left: W(c), top: W(l), width: W(g), height: W(f), fill: nr(r) ? r.toObject() : r, stroke: nr(n) ? n.toObject() : n, strokeWidth: W(v), strokeDashArray: h && h.concat(), strokeLineCap: x, strokeDashOffset: b, strokeLineJoin: C, strokeUniform: _, strokeMiterLimit: W(S), scaleX: W(k), scaleY: W(M), angle: W(A), flipX: E, flipY: F, opacity: W(P), shadow: o && o.toObject(), visible: Y, backgroundColor: H, fillRule: L, paintFirst: X, globalCompositeOperation: Q, skewX: W(U), skewY: W(dt) }, e ? { clipPath: e } : null);
    return this.includeDefaultValues ? mt : this._removeDefaultValues(mt);
  }
  toDatalessObject(t) {
    return this.toObject(t);
  }
  _removeDefaultValues(t) {
    const e = this.constructor.getDefaults(), s = Object.keys(e).length > 0 ? e : Object.getPrototypeOf(this);
    return Bi(t, (i, r) => {
      if (r === I || r === ht || r === "type") return !0;
      const n = s[r];
      return i !== n && !(Array.isArray(i) && Array.isArray(n) && i.length === 0 && n.length === 0);
    });
  }
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }
  static _fromObject(t) {
    let e = V(t, Po), s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { extraParam: i } = s, r = V(s, Fo);
    return qs(e, r).then((n) => i ? (delete n[i], new this(e[i], n)) : new this(n));
  }
  static fromObject(t, e) {
    return this._fromObject(t, e);
  }
};
m(Bt, "stateProperties", Co), m(Bt, "cacheProperties", Ut), m(Bt, "ownDefaults", _o), m(Bt, "type", "FabricObject"), m(Bt, "colorProperties", [Z, lt, "backgroundColor"]), m(Bt, "customProperties", []), T.setClass(Bt), T.setClass(Bt, "object");
const Le = (a, t, e) => (s, i, r, n) => {
  const o = t(s, i, r, n);
  return o && tn(a, y(y({}, sn(s, i, r, n)), e)), o;
};
function Pe(a) {
  return (t, e, s, i) => {
    const { target: r, originX: n, originY: o } = e, h = r.getRelativeCenterPoint(), c = r.translateToOriginPoint(h, n, o), l = a(t, e, s, i);
    return r.setPositionByOrigin(c, e.originX, e.originY), l;
  };
}
const pr = Le(Ve, Pe((a, t, e, s) => {
  const i = Yi(t, t.originX, t.originY, e, s);
  if (J(t.originX) === J(R) || J(t.originX) === J(q) && i.x < 0 || J(t.originX) === J(I) && i.x > 0) {
    const { target: r } = t, n = r.strokeWidth / (r.strokeUniform ? r.scaleX : 1), o = en(t) ? 2 : 1, h = r.width, c = Math.abs(i.x * o / r.scaleX) - n;
    return r.set("width", Math.max(c, 1)), h !== r.width;
  }
  return !1;
}));
function Wo(a, t, e, s, i) {
  s = s || {};
  const r = this.sizeX || s.cornerSize || i.cornerSize, n = this.sizeY || s.cornerSize || i.cornerSize, o = s.transparentCorners !== void 0 ? s.transparentCorners : i.transparentCorners, h = o ? lt : Z, c = !o && (s.cornerStrokeColor || i.cornerStrokeColor);
  let l, u = t, d = e;
  a.save(), a.fillStyle = s.cornerColor || i.cornerColor || "", a.strokeStyle = s.cornerStrokeColor || i.cornerStrokeColor || "", r > n ? (l = r, a.scale(1, n / r), d = e * r / n) : n > r ? (l = n, a.scale(r / n, 1), u = t * n / r) : l = r, a.beginPath(), a.arc(u, d, l / 2, 0, js, !1), a[h](), c && a.stroke(), a.restore();
}
function zo(a, t, e, s, i) {
  s = s || {};
  const r = this.sizeX || s.cornerSize || i.cornerSize, n = this.sizeY || s.cornerSize || i.cornerSize, o = s.transparentCorners !== void 0 ? s.transparentCorners : i.transparentCorners, h = o ? lt : Z, c = !o && (s.cornerStrokeColor || i.cornerStrokeColor), l = r / 2, u = n / 2;
  a.save(), a.fillStyle = s.cornerColor || i.cornerColor || "", a.strokeStyle = s.cornerStrokeColor || i.cornerStrokeColor || "", a.translate(t, e);
  const d = i.getTotalAngle();
  a.rotate(K(d)), a["".concat(h, "Rect")](-l, -u, r, n), c && a.strokeRect(-l, -u, r, n), a.restore();
}
class Et {
  constructor(t) {
    m(this, "visible", !0), m(this, "actionName", Gs), m(this, "angle", 0), m(this, "x", 0), m(this, "y", 0), m(this, "offsetX", 0), m(this, "offsetY", 0), m(this, "sizeX", 0), m(this, "sizeY", 0), m(this, "touchSizeX", 0), m(this, "touchSizeY", 0), m(this, "cursorStyle", "crosshair"), m(this, "withConnection", !1), Object.assign(this, t);
  }
  shouldActivate(t, e, s, i) {
    var r;
    let { tl: n, tr: o, br: h, bl: c } = i;
    return ((r = e.canvas) === null || r === void 0 ? void 0 : r.getActiveObject()) === e && e.isControlVisible(t) && N.isPointInPolygon(s, [n, o, h, c]);
  }
  getActionHandler(t, e, s) {
    return this.actionHandler;
  }
  getMouseDownHandler(t, e, s) {
    return this.mouseDownHandler;
  }
  getMouseUpHandler(t, e, s) {
    return this.mouseUpHandler;
  }
  cursorStyleHandler(t, e, s) {
    return e.cursorStyle;
  }
  getActionName(t, e, s) {
    return e.actionName;
  }
  getVisibility(t, e) {
    var s, i;
    return (s = (i = t._controlsVisibility) === null || i === void 0 ? void 0 : i[e]) !== null && s !== void 0 ? s : this.visible;
  }
  setVisibility(t, e, s) {
    this.visible = t;
  }
  positionHandler(t, e, s, i) {
    return new w(this.x * t.x + this.offsetX, this.y * t.y + this.offsetY).transform(e);
  }
  calcCornerCoords(t, e, s, i, r, n) {
    const o = zi([Ze(s, i), $e({ angle: t }), Ii((r ? this.touchSizeX : this.sizeX) || e, (r ? this.touchSizeY : this.sizeY) || e)]);
    return { tl: new w(-0.5, -0.5).transform(o), tr: new w(0.5, -0.5).transform(o), br: new w(0.5, 0.5).transform(o), bl: new w(-0.5, 0.5).transform(o) };
  }
  render(t, e, s, i, r) {
    ((i = i || {}).cornerStyle || r.cornerStyle) === "circle" ? Wo.call(this, t, e, s, i, r) : zo.call(this, t, e, s, i, r);
  }
}
const Io = (a, t, e) => e.lockRotation ? Bs : t.cursorStyle, Bo = Le(Ir, Pe((a, t, e, s) => {
  let { target: i, ex: r, ey: n, theta: o, originX: h, originY: c } = t;
  const l = i.translateToOriginPoint(i.getRelativeCenterPoint(), h, c);
  if (Rt(i, "lockRotation")) return !1;
  const u = Math.atan2(n - l.y, r - l.x), d = Math.atan2(s - l.y, e - l.x);
  let g = de(d - u + o);
  if (i.snapAngle && i.snapAngle > 0) {
    const v = i.snapAngle, x = i.snapThreshold || v, b = Math.ceil(g / v) * v, C = Math.floor(g / v) * v;
    Math.abs(g - C) < x ? g = C : Math.abs(g - b) < x && (g = b);
  }
  g < 0 && (g = 360 + g), g %= 360;
  const f = i.angle !== g;
  return i.angle = g, f;
}));
function ln(a, t) {
  const e = t.canvas, s = a[e.uniScaleKey];
  return e.uniformScaling && !s || !e.uniformScaling && s;
}
function un(a, t, e) {
  const s = Rt(a, "lockScalingX"), i = Rt(a, "lockScalingY");
  if (s && i || !t && (s || i) && e || s && t === "x" || i && t === "y") return !0;
  const { width: r, height: n, strokeWidth: o } = a;
  return r === 0 && o === 0 && t !== "y" || n === 0 && o === 0 && t !== "x";
}
const Xo = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"], Ie = (a, t, e) => {
  const s = ln(a, e);
  if (un(e, t.x !== 0 && t.y === 0 ? "x" : t.x === 0 && t.y !== 0 ? "y" : "", s)) return Bs;
  const i = rn(e, t);
  return "".concat(Xo[i], "-resize");
};
function Ni(a, t, e, s) {
  let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
  const r = t.target, n = i.by, o = ln(a, r);
  let h, c, l, u, d, g;
  if (un(r, n, o)) return !1;
  if (t.gestureScale) c = t.scaleX * t.gestureScale, l = t.scaleY * t.gestureScale;
  else {
    if (h = Yi(t, t.originX, t.originY, e, s), d = n !== "y" ? Math.sign(h.x || t.signX || 1) : 1, g = n !== "x" ? Math.sign(h.y || t.signY || 1) : 1, t.signX || (t.signX = d), t.signY || (t.signY = g), Rt(r, "lockScalingFlip") && (t.signX !== d || t.signY !== g)) return !1;
    if (u = r._getTransformedDimensions(), o && !n) {
      const x = Math.abs(h.x) + Math.abs(h.y), { original: b } = t, C = x / (Math.abs(u.x * b.scaleX / r.scaleX) + Math.abs(u.y * b.scaleY / r.scaleY));
      c = b.scaleX * C, l = b.scaleY * C;
    } else c = Math.abs(h.x * r.scaleX / u.x), l = Math.abs(h.y * r.scaleY / u.y);
    en(t) && (c *= 2, l *= 2), t.signX !== d && n !== "y" && (t.originX = hr(t.originX), c *= -1, t.signX = d), t.signY !== g && n !== "x" && (t.originY = hr(t.originY), l *= -1, t.signY = g);
  }
  const f = r.scaleX, v = r.scaleY;
  return n ? (n === "x" && r.set(ut, c), n === "y" && r.set(_t, l)) : (!Rt(r, "lockScalingX") && r.set(ut, c), !Rt(r, "lockScalingY") && r.set(_t, l)), f !== r.scaleX || v !== r.scaleY;
}
const es = Le(Ns, Pe((a, t, e, s) => Ni(a, t, e, s))), Yo = Le(Ns, Pe((a, t, e, s) => Ni(a, t, e, s, { by: "x" }))), Ho = Le(Ns, Pe((a, t, e, s) => Ni(a, t, e, s, { by: "y" }))), Vo = ["target", "ex", "ey", "skewingSide"], hi = { x: { counterAxis: "y", scale: ut, skew: De, lockSkewing: "lockSkewingX", origin: "originX", flip: "flipX" }, y: { counterAxis: "x", scale: _t, skew: Ae, lockSkewing: "lockSkewingY", origin: "originY", flip: "flipY" } }, No = ["ns", "nesw", "ew", "nwse"], Go = (a, t, e) => {
  if (t.x !== 0 && Rt(e, "lockSkewingY") || t.y !== 0 && Rt(e, "lockSkewingX")) return Bs;
  const s = rn(e, t) % 4;
  return "".concat(No[s], "-resize");
};
function dn(a, t, e, s, i) {
  const { target: r } = e, { counterAxis: n, origin: o, lockSkewing: h, skew: c, flip: l } = hi[a];
  if (Rt(r, h)) return !1;
  const { origin: u, flip: d } = hi[n], g = J(e[u]) * (r[d] ? -1 : 1), f = -Math.sign(g) * (r[l] ? -1 : 1), v = 0.5 * -((r[c] === 0 && Yi(e, R, R, s, i)[a] > 0 || r[c] > 0 ? 1 : -1) * f) + 0.5;
  return Le(Br, Pe((b, C, _, S) => function(k, M, A) {
    let { target: E, ex: F, ey: P, skewingSide: Y } = M, H = V(M, Vo);
    const { skew: L } = hi[k], X = A.subtract(new w(F, P)).divide(new w(E.scaleX, E.scaleY))[k], Q = E[L], U = H[L], dt = Math.tan(K(U)), W = k === "y" ? E._getTransformedDimensions({ scaleX: 1, scaleY: 1, skewX: 0 }).x : E._getTransformedDimensions({ scaleX: 1, scaleY: 1 }).y, mt = 2 * X * Y / Math.max(W, 1) + dt, vt = de(Math.atan(mt));
    E.set(L, vt);
    const se = Q !== E[L];
    if (se && k === "y") {
      const { skewX: We, scaleX: ie } = E, Tt = E._getTransformedDimensions({ skewY: Q }), re = E._getTransformedDimensions(), yt = We !== 0 ? Tt.x / re.x : 1;
      yt !== 1 && E.set(ut, yt * ie);
    }
    return se;
  }(a, C, new w(_, S))))(t, y(y({}, e), {}, { [o]: v, skewingSide: f }), s, i);
}
const Uo = (a, t, e, s) => dn("x", a, t, e, s), qo = (a, t, e, s) => dn("y", a, t, e, s);
function Zs(a, t) {
  return a[t.canvas.altActionKey];
}
const ss = (a, t, e) => {
  const s = Zs(a, e);
  return t.x === 0 ? s ? De : _t : t.y === 0 ? s ? Ae : ut : "";
}, be = (a, t, e) => Zs(a, e) ? Go(0, t, e) : Ie(a, t, e), fr = (a, t, e, s) => Zs(a, t.target) ? qo(a, t, e, s) : Yo(a, t, e, s), mr = (a, t, e, s) => Zs(a, t.target) ? Uo(a, t, e, s) : Ho(a, t, e, s), gn = () => ({ ml: new Et({ x: -0.5, y: 0, cursorStyleHandler: be, actionHandler: fr, getActionName: ss }), mr: new Et({ x: 0.5, y: 0, cursorStyleHandler: be, actionHandler: fr, getActionName: ss }), mb: new Et({ x: 0, y: 0.5, cursorStyleHandler: be, actionHandler: mr, getActionName: ss }), mt: new Et({ x: 0, y: -0.5, cursorStyleHandler: be, actionHandler: mr, getActionName: ss }), tl: new Et({ x: -0.5, y: -0.5, cursorStyleHandler: Ie, actionHandler: es }), tr: new Et({ x: 0.5, y: -0.5, cursorStyleHandler: Ie, actionHandler: es }), bl: new Et({ x: -0.5, y: 0.5, cursorStyleHandler: Ie, actionHandler: es }), br: new Et({ x: 0.5, y: 0.5, cursorStyleHandler: Ie, actionHandler: es }), mtr: new Et({ x: 0, y: -0.5, actionHandler: Bo, cursorStyleHandler: Io, offsetY: -40, withConnection: !0, actionName: Fi }) }), Ko = () => ({ mr: new Et({ x: 0.5, y: 0, actionHandler: pr, cursorStyleHandler: be, actionName: Ve }), ml: new Et({ x: -0.5, y: 0, actionHandler: pr, cursorStyleHandler: be, actionName: Ve }) }), Jo = () => y(y({}, gn()), Ko());
class Ue extends Bt {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Ue.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, this.constructor.createControls(), Ue.ownDefaults), this.setOptions(t);
  }
  static createControls() {
    return { controls: gn() };
  }
  _updateCacheCanvas() {
    const t = this.canvas;
    if (this.noScaleCache && t && t._currentTransform) {
      const e = t._currentTransform, s = e.target, i = e.action;
      if (this === s && i && i.startsWith(Gs)) return !1;
    }
    return super._updateCacheCanvas();
  }
  getActiveControl() {
    const t = this.__corner;
    return t ? { key: t, control: this.controls[t], coord: this.oCoords[t] } : void 0;
  }
  findControl(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    if (!this.hasControls || !this.canvas) return;
    this.__corner = void 0;
    const s = Object.entries(this.oCoords);
    for (let i = s.length - 1; i >= 0; i--) {
      const [r, n] = s[i], o = this.controls[r];
      if (o.shouldActivate(r, this, t, e ? n.touchCorner : n.corner)) return this.__corner = r, { key: r, control: o, coord: this.oCoords[r] };
    }
  }
  calcOCoords() {
    const t = this.getViewportTransform(), e = this.getCenterPoint(), s = Ze(e.x, e.y), i = $e({ angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0) }), r = et(s, i), n = et(t, r), o = et(n, [1 / t[0], 0, 0, 1 / t[3], 0, 0]), h = this.group ? Ws(this.calcTransformMatrix()) : void 0;
    h && (h.scaleX = Math.abs(h.scaleX), h.scaleY = Math.abs(h.scaleY));
    const c = this._calculateCurrentDimensions(h), l = {};
    return this.forEachControl((u, d) => {
      const g = u.positionHandler(c, o, this, u);
      l[d] = Object.assign(g, this._calcCornerCoords(u, g));
    }), l;
  }
  _calcCornerCoords(t, e) {
    const s = this.getTotalAngle();
    return { corner: t.calcCornerCoords(s, this.cornerSize, e.x, e.y, !1, this), touchCorner: t.calcCornerCoords(s, this.touchCornerSize, e.x, e.y, !0, this) };
  }
  setCoords() {
    super.setCoords(), this.canvas && (this.oCoords = this.calcOCoords());
  }
  forEachControl(t) {
    for (const e in this.controls) t(this.controls[e], e, this);
  }
  drawSelectionBackground(t) {
    if (!this.selectionBackgroundColor || this.canvas && this.canvas._activeObject !== this) return;
    t.save();
    const e = this.getRelativeCenterPoint(), s = this._calculateCurrentDimensions(), i = this.getViewportTransform();
    t.translate(e.x, e.y), t.scale(1 / i[0], 1 / i[3]), t.rotate(K(this.angle)), t.fillStyle = this.selectionBackgroundColor, t.fillRect(-s.x / 2, -s.y / 2, s.x, s.y), t.restore();
  }
  strokeBorders(t, e) {
    t.strokeRect(-e.x / 2, -e.y / 2, e.x, e.y);
  }
  _drawBorders(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = y({ hasControls: this.hasControls, borderColor: this.borderColor, borderDashArray: this.borderDashArray }, s);
    t.save(), t.strokeStyle = i.borderColor, this._setLineDash(t, i.borderDashArray), this.strokeBorders(t, e), i.hasControls && this.drawControlsConnectingLines(t, e), t.restore();
  }
  _renderControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { hasBorders: s, hasControls: i } = this, r = y({ hasBorders: s, hasControls: i }, e), n = this.getViewportTransform(), o = r.hasBorders, h = r.hasControls, c = et(n, this.calcTransformMatrix()), l = Ws(c);
    t.save(), t.translate(l.translateX, l.translateY), t.lineWidth = this.borderScaleFactor, this.group === this.parent && (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), this.flipX && (l.angle -= 180), t.rotate(K(this.group ? l.angle : this.angle)), o && this.drawBorders(t, l, e), h && this.drawControls(t, e), t.restore();
  }
  drawBorders(t, e, s) {
    let i;
    if (s && s.forActiveSelection || this.group) {
      const r = Xi(this.width, this.height, Us(e)), n = this.isStrokeAccountedForInDimensions() ? Wi : (this.strokeUniform ? new w().scalarAdd(this.canvas ? this.canvas.getZoom() : 1) : new w(e.scaleX, e.scaleY)).scalarMultiply(this.strokeWidth);
      i = r.add(n).scalarAdd(this.borderScaleFactor).scalarAdd(2 * this.padding);
    } else i = this._calculateCurrentDimensions().scalarAdd(this.borderScaleFactor);
    this._drawBorders(t, i, s);
  }
  drawControlsConnectingLines(t, e) {
    let s = !1;
    t.beginPath(), this.forEachControl((i, r) => {
      i.withConnection && i.getVisibility(this, r) && (s = !0, t.moveTo(i.x * e.x, i.y * e.y), t.lineTo(i.x * e.x + i.offsetX, i.y * e.y + i.offsetY));
    }), s && t.stroke();
  }
  drawControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    t.save();
    const s = this.getCanvasRetinaScaling(), { cornerStrokeColor: i, cornerDashArray: r, cornerColor: n } = this, o = y({ cornerStrokeColor: i, cornerDashArray: r, cornerColor: n }, e);
    t.setTransform(s, 0, 0, s, 0, 0), t.strokeStyle = t.fillStyle = o.cornerColor, this.transparentCorners || (t.strokeStyle = o.cornerStrokeColor), this._setLineDash(t, o.cornerDashArray), this.forEachControl((h, c) => {
      if (h.getVisibility(this, c)) {
        const l = this.oCoords[c];
        h.render(t, l.x, l.y, o, this);
      }
    }), t.restore();
  }
  isControlVisible(t) {
    return this.controls[t] && this.controls[t].getVisibility(this, t);
  }
  setControlVisible(t, e) {
    this._controlsVisibility || (this._controlsVisibility = {}), this._controlsVisibility[t] = e;
  }
  setControlsVisibility() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.entries(t).forEach((e) => {
      let [s, i] = e;
      return this.setControlVisible(s, i);
    });
  }
  clearContextTop(t) {
    if (!this.canvas) return;
    const e = this.canvas.contextTop;
    if (!e) return;
    const s = this.canvas.viewportTransform;
    e.save(), e.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this.transform(e);
    const i = this.width + 4, r = this.height + 4;
    return e.clearRect(-i / 2, -r / 2, i, r), t || e.restore(), e;
  }
  onDeselect(t) {
    return !1;
  }
  onSelect(t) {
    return !1;
  }
  shouldStartDragging(t) {
    return !1;
  }
  onDragStart(t) {
    return !1;
  }
  canDrop(t) {
    return !1;
  }
  renderDragSourceEffect(t) {
  }
  renderDropTargetEffect(t) {
  }
}
function pn(a, t) {
  return t.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      s !== "constructor" && Object.defineProperty(a.prototype, s, Object.getOwnPropertyDescriptor(e.prototype, s) || /* @__PURE__ */ Object.create(null));
    });
  }), a;
}
m(Ue, "ownDefaults", { noScaleCache: !0, lockMovementX: !1, lockMovementY: !1, lockRotation: !1, lockScalingX: !1, lockScalingY: !1, lockSkewingX: !1, lockSkewingY: !1, lockScalingFlip: !1, cornerSize: 13, touchCornerSize: 24, transparentCorners: !0, cornerColor: "rgb(178,204,255)", cornerStrokeColor: "", cornerStyle: "rect", cornerDashArray: null, hasControls: !0, borderColor: "rgb(178,204,255)", borderDashArray: null, borderOpacityWhenMoving: 0.4, borderScaleFactor: 1, hasBorders: !0, selectionBackgroundColor: "", selectable: !0, evented: !0, perPixelTargetFind: !1, activeOn: "down", hoverCursor: null, moveCursor: null });
class it extends Ue {
}
pn(it, [nn]), T.setClass(it), T.setClass(it, "object");
const Zo = (a, t, e, s) => {
  const i = 2 * (s = Math.round(s)) + 1, { data: r } = a.getImageData(t - s, e - s, i, i);
  for (let n = 3; n < r.length; n += 4)
    if (r[n] > 0) return !1;
  return !0;
};
class fn {
  constructor(t) {
    this.options = t, this.strokeProjectionMagnitude = this.options.strokeWidth / 2, this.scale = new w(this.options.scaleX, this.options.scaleY), this.strokeUniformScalar = this.options.strokeUniform ? new w(1 / this.options.scaleX, 1 / this.options.scaleY) : new w(1, 1);
  }
  createSideVector(t, e) {
    const s = wi(t, e);
    return this.options.strokeUniform ? s.multiply(this.scale) : s;
  }
  projectOrthogonally(t, e, s) {
    return this.applySkew(t.add(this.calcOrthogonalProjection(t, e, s)));
  }
  isSkewed() {
    return this.options.skewX !== 0 || this.options.skewY !== 0;
  }
  applySkew(t) {
    const e = new w(t);
    return e.y += e.x * Math.tan(K(this.options.skewY)), e.x += e.y * Math.tan(K(this.options.skewX)), e;
  }
  scaleUnitVector(t, e) {
    return t.multiply(this.strokeUniformScalar).scalarMultiply(e);
  }
}
const $o = new w();
class Ee extends fn {
  static getOrthogonalRotationFactor(t, e) {
    const s = e ? Ci(t, e) : wo(t);
    return Math.abs(s) < Je ? -1 : 1;
  }
  constructor(t, e, s, i) {
    super(i), m(this, "AB", void 0), m(this, "AC", void 0), m(this, "alpha", void 0), m(this, "bisector", void 0), this.A = new w(t), this.B = new w(e), this.C = new w(s), this.AB = this.createSideVector(this.A, this.B), this.AC = this.createSideVector(this.A, this.C), this.alpha = Ci(this.AB, this.AC), this.bisector = Hi(an(this.AB.eq($o) ? this.AC : this.AB, this.alpha / 2));
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const i = this.createSideVector(t, e), r = hn(i), n = Ee.getOrthogonalRotationFactor(r, this.bisector);
    return this.scaleUnitVector(r, s * n);
  }
  projectBevel() {
    const t = [];
    return (this.alpha % js == 0 ? [this.B] : [this.B, this.C]).forEach((e) => {
      t.push(this.projectOrthogonally(this.A, e)), t.push(this.projectOrthogonally(this.A, e, -this.strokeProjectionMagnitude));
    }), t;
  }
  projectMiter() {
    const t = [], e = Math.abs(this.alpha), s = 1 / Math.sin(e / 2), i = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s), r = this.options.strokeUniform ? bi(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit)) : this.options.strokeMiterLimit;
    return bi(i) / this.strokeProjectionMagnitude <= r && t.push(this.applySkew(this.A.add(i))), t.push(...this.projectBevel()), t;
  }
  projectRoundNoSkew(t, e) {
    const s = [], i = new w(Ee.getOrthogonalRotationFactor(this.bisector), Ee.getOrthogonalRotationFactor(new w(this.bisector.y, this.bisector.x)));
    return [new w(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i), new w(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i)].forEach((r) => {
      ur(r, t, e) && s.push(this.A.add(r));
    }), s;
  }
  projectRoundWithSkew(t, e) {
    const s = [], { skewX: i, skewY: r, scaleX: n, scaleY: o, strokeUniform: h } = this.options, c = new w(Math.tan(K(i)), Math.tan(K(r))), l = this.strokeProjectionMagnitude, u = h ? l / o / Math.sqrt(1 / o ** 2 + 1 / n ** 2 * c.y ** 2) : l / Math.sqrt(1 + c.y ** 2), d = new w(Math.sqrt(Math.max(l ** 2 - u ** 2, 0)), u), g = h ? l / Math.sqrt(1 + c.x ** 2 * (1 / o) ** 2 / (1 / n + 1 / n * c.x * c.y) ** 2) : l / Math.sqrt(1 + c.x ** 2 / (1 + c.x * c.y) ** 2), f = new w(g, Math.sqrt(Math.max(l ** 2 - g ** 2, 0)));
    return [f, f.scalarMultiply(-1), d, d.scalarMultiply(-1)].map((v) => this.applySkew(h ? v.multiply(this.strokeUniformScalar) : v)).forEach((v) => {
      ur(v, t, e) && s.push(this.applySkew(this.A).add(v));
    }), s;
  }
  projectRound() {
    const t = [];
    t.push(...this.projectBevel());
    const e = this.alpha % js == 0, s = this.applySkew(this.A), i = t[e ? 0 : 2].subtract(s), r = t[e ? 1 : 0].subtract(s), n = e ? this.applySkew(this.AB.scalarMultiply(-1)) : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)), o = Xe(i, n) > 0, h = o ? i : r, c = o ? r : i;
    return this.isSkewed() ? t.push(...this.projectRoundWithSkew(h, c)) : t.push(...this.projectRoundNoSkew(h, c)), t;
  }
  projectPoints() {
    switch (this.options.strokeLineJoin) {
      case "miter":
        return this.projectMiter();
      case "round":
        return this.projectRound();
      default:
        return this.projectBevel();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t, angle: this.alpha, bisector: this.bisector }));
  }
}
class vr extends fn {
  constructor(t, e, s) {
    super(s), this.A = new w(t), this.T = new w(e);
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const i = this.createSideVector(t, e);
    return this.scaleUnitVector(hn(i), s);
  }
  projectButt() {
    return [this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude), this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)];
  }
  projectRound() {
    const t = [];
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e = new w(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.applySkew(this.A.add(e)), this.applySkew(this.A.subtract(e)));
    } else t.push(...new Ee(this.A, this.T, this.T, this.options).projectRound());
    return t;
  }
  projectSquare() {
    const t = [];
    if (this.A.eq(this.T)) {
      const e = new w(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.A.add(e), this.A.subtract(e));
    } else {
      const e = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude), s = this.scaleUnitVector(Hi(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude), i = this.A.add(s);
      t.push(i.add(e), i.subtract(e));
    }
    return t.map((e) => this.applySkew(e));
  }
  projectPoints() {
    switch (this.options.strokeLineCap) {
      case "round":
        return this.projectRound();
      case "square":
        return this.projectSquare();
      default:
        return this.projectButt();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t }));
  }
}
const Qo = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  const s = [];
  if (a.length === 0) return s;
  const i = a.reduce((r, n) => (r[r.length - 1].eq(n) || r.push(new w(n)), r), [new w(a[0])]);
  if (i.length === 1) e = !0;
  else if (!e) {
    const r = i[0], n = ((o, h) => {
      for (let c = o.length - 1; c >= 0; c--) if (h(o[c], c, o)) return c;
      return -1;
    })(i, (o) => !o.eq(r));
    i.splice(n + 1);
  }
  return i.forEach((r, n, o) => {
    let h, c;
    n === 0 ? (c = o[1], h = e ? r : o[o.length - 1]) : n === o.length - 1 ? (h = o[n - 1], c = e ? r : o[0]) : (h = o[n - 1], c = o[n + 1]), e && o.length === 1 ? s.push(...new vr(r, r, t).project()) : !e || n !== 0 && n !== o.length - 1 ? s.push(...new Ee(r, h, c, t).project()) : s.push(...new vr(r, n === 0 ? c : h, t).project());
  }), s;
}, Gi = (a) => {
  const t = {};
  return Object.keys(a).forEach((e) => {
    t[e] = {}, Object.keys(a[e]).forEach((s) => {
      t[e][s] = y({}, a[e][s]);
    });
  }), t;
}, ta = (a) => a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), Ui = (a) => {
  const t = [];
  for (let e, s = 0; s < a.length; s++) (e = ea(a, s)) !== !1 && t.push(e);
  return t;
}, ea = (a, t) => {
  const e = a.charCodeAt(t);
  if (isNaN(e)) return "";
  if (e < 55296 || e > 57343) return a.charAt(t);
  if (55296 <= e && e <= 56319) {
    if (a.length <= t + 1) throw "High surrogate without following low surrogate";
    const i = a.charCodeAt(t + 1);
    if (56320 > i || i > 57343) throw "High surrogate without following low surrogate";
    return a.charAt(t) + a.charAt(t + 1);
  }
  if (t === 0) throw "Low surrogate without preceding high surrogate";
  const s = a.charCodeAt(t - 1);
  if (55296 > s || s > 56319) throw "Low surrogate without preceding high surrogate";
  return !1;
}, qi = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  return a.fill !== t.fill || a.stroke !== t.stroke || a.strokeWidth !== t.strokeWidth || a.fontSize !== t.fontSize || a.fontFamily !== t.fontFamily || a.fontWeight !== t.fontWeight || a.fontStyle !== t.fontStyle || a.textBackgroundColor !== t.textBackgroundColor || a.deltaY !== t.deltaY || e && (a.overline !== t.overline || a.underline !== t.underline || a.linethrough !== t.linethrough);
}, sa = (a, t) => {
  const e = t.split(`
`), s = [];
  let i = -1, r = {};
  a = Gi(a);
  for (let n = 0; n < e.length; n++) {
    const o = Ui(e[n]);
    if (a[n]) for (let h = 0; h < o.length; h++) {
      i++;
      const c = a[n][h];
      c && Object.keys(c).length > 0 && (qi(r, c, !0) ? s.push({ start: i, end: i + 1, style: c }) : s[s.length - 1].end++), r = c || {};
    }
    else i += o.length, r = {};
  }
  return s;
}, ia = (a, t) => {
  if (!Array.isArray(a)) return Gi(a);
  const e = t.split(Pi), s = {};
  let i = -1, r = 0;
  for (let n = 0; n < e.length; n++) {
    const o = Ui(e[n]);
    for (let h = 0; h < o.length; h++) i++, a[r] && a[r].start <= i && i < a[r].end && (s[n] = s[n] || {}, s[n][h] = y({}, a[r].style), i === a[r].end - 1 && r++);
  }
  return s;
}, ee = ["display", "transform", Z, "fill-opacity", "fill-rule", "opacity", lt, "stroke-dasharray", "stroke-linecap", "stroke-dashoffset", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "vector-effect", "instantiated_by_use", "clip-path"];
function yr(a, t) {
  const e = a.nodeName, s = a.getAttribute("class"), i = a.getAttribute("id"), r = "(?![a-zA-Z\\-]+)";
  let n;
  if (n = new RegExp("^" + e, "i"), t = t.replace(n, ""), i && t.length && (n = new RegExp("#" + i + r, "i"), t = t.replace(n, "")), s && t.length) {
    const o = s.split(" ");
    for (let h = o.length; h--; ) n = new RegExp("\\." + o[h] + r, "i"), t = t.replace(n, "");
  }
  return t.length === 0;
}
function ra(a, t) {
  let e = !0;
  const s = yr(a, t.pop());
  return s && t.length && (e = function(i, r) {
    let n, o = !0;
    for (; i.parentElement && i.parentElement.nodeType === 1 && r.length; ) o && (n = r.pop()), o = yr(i = i.parentElement, n);
    return r.length === 0;
  }(a, t)), s && e && t.length === 0;
}
const na = (a) => {
  var t;
  return (t = yo[a]) !== null && t !== void 0 ? t : a;
}, oa = new RegExp("(".concat(ge, ")"), "gi"), aa = (a) => a.replace(oa, " $1 ").replace(/,/gi, " ").replace(/\s+/gi, " ");
var xr, wr, br, Cr, _r, Sr, Tr;
const nt = "(".concat(ge, ")"), ha = String.raw(xr || (xr = te(["(skewX)(", ")"], ["(skewX)\\(", "\\)"])), nt), ca = String.raw(wr || (wr = te(["(skewY)(", ")"], ["(skewY)\\(", "\\)"])), nt), la = String.raw(br || (br = te(["(rotate)(", "(?: ", " ", ")?)"], ["(rotate)\\(", "(?: ", " ", ")?\\)"])), nt, nt, nt), ua = String.raw(Cr || (Cr = te(["(scale)(", "(?: ", ")?)"], ["(scale)\\(", "(?: ", ")?\\)"])), nt, nt), da = String.raw(_r || (_r = te(["(translate)(", "(?: ", ")?)"], ["(translate)\\(", "(?: ", ")?\\)"])), nt, nt), ga = String.raw(Sr || (Sr = te(["(matrix)(", " ", " ", " ", " ", " ", ")"], ["(matrix)\\(", " ", " ", " ", " ", " ", "\\)"])), nt, nt, nt, nt, nt, nt), Ki = "(?:".concat(ga, "|").concat(da, "|").concat(la, "|").concat(ua, "|").concat(ha, "|").concat(ca, ")"), pa = "(?:".concat(Ki, "*)"), fa = String.raw(Tr || (Tr = te(["^s*(?:", "?)s*$"], ["^\\s*(?:", "?)\\s*$"])), pa), ma = new RegExp(fa), va = new RegExp(Ki), ya = new RegExp(Ki, "g");
function _i(a) {
  const t = [];
  if (!(a = aa(a).replace(/\s*([()])\s*/gi, "$1")) || a && !ma.test(a)) return [...ot];
  for (const e of a.matchAll(ya)) {
    const s = va.exec(e[0]);
    if (!s) continue;
    let i = ot;
    const r = s.filter((f) => !!f), [, n, ...o] = r, [h, c, l, u, d, g] = o.map((f) => parseFloat(f));
    switch (n) {
      case "translate":
        i = Ze(h, c);
        break;
      case Fi:
        i = $e({ angle: h }, { x: c, y: l });
        break;
      case Gs:
        i = Ii(h, c);
        break;
      case De:
        i = Gr(h);
        break;
      case Ae:
        i = Ur(h);
        break;
      case "matrix":
        i = [h, c, l, u, d, g];
    }
    t.push(i);
  }
  return zi(t);
}
function xa(a, t, e, s) {
  const i = Array.isArray(t);
  let r, n = t;
  if (a !== Z && a !== lt || t !== ct) {
    if (a === "strokeUniform") return t === "non-scaling-stroke";
    if (a === "strokeDashArray") n = t === ct ? null : t.replace(/,/g, " ").split(/\s+/).map(parseFloat);
    else if (a === "transformMatrix") n = e && e.transformMatrix ? et(e.transformMatrix, _i(t)) : _i(t);
    else if (a === "visible") n = t !== ct && t !== "hidden", e && e.visible === !1 && (n = !1);
    else if (a === "opacity") n = parseFloat(t), e && e.opacity !== void 0 && (n *= e.opacity);
    else if (a === "textAnchor") n = t === "start" ? I : t === "end" ? q : R;
    else if (a === "charSpacing") r = Te(t, s) / s * 1e3;
    else if (a === "paintFirst") {
      const o = t.indexOf(Z), h = t.indexOf(lt);
      n = Z, (o > -1 && h > -1 && h < o || o === -1 && h > -1) && (n = lt);
    } else {
      if (a === "href" || a === "xlink:href" || a === "font" || a === "id") return t;
      if (a === "imageSmoothing") return t === "optimizeQuality";
      r = i ? t.map(Te) : Te(t, s);
    }
  } else n = "";
  return !i && isNaN(r) ? n : r;
}
function wa(a, t) {
  const e = a.match(vo);
  if (!e) return;
  const s = e[1], i = e[3], r = e[4], n = e[5], o = e[6];
  s && (t.fontStyle = s), i && (t.fontWeight = isNaN(parseFloat(i)) ? i : parseFloat(i)), r && (t.fontSize = Te(r)), o && (t.fontFamily = o), n && (t.lineHeight = n === "normal" ? 1 : n);
}
function ba(a, t) {
  a.replace(/;\s*$/, "").split(";").forEach((e) => {
    if (!e) return;
    const [s, i] = e.split(":");
    t[s.trim().toLowerCase()] = i.trim();
  });
}
function Ca(a) {
  const t = {}, e = a.getAttribute("style");
  return e && (typeof e == "string" ? ba(e, t) : function(s, i) {
    Object.entries(s).forEach((r) => {
      let [n, o] = r;
      o !== void 0 && (i[n.toLowerCase()] = o);
    });
  }(e, t)), t;
}
const _a = { stroke: "strokeOpacity", fill: "fillOpacity" };
function qt(a, t, e) {
  if (!a) return {};
  let s, i = {}, r = Li;
  a.parentNode && lr.test(a.parentNode.nodeName) && (i = qt(a.parentElement, t, e), i.fontSize && (s = r = Te(i.fontSize)));
  const n = y(y(y({}, t.reduce((c, l) => {
    const u = a.getAttribute(l);
    return u && (c[l] = u), c;
  }, {})), function(c) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = {};
    for (const d in l) ra(c, d.split(" ")) && (u = y(y({}, u), l[d]));
    return u;
  }(a, e)), Ca(a));
  n[oi] && a.setAttribute(oi, n[oi]), n[ni] && (s = Te(n[ni], r), n[ni] = "".concat(s));
  const o = {};
  for (const c in n) {
    const l = na(c), u = xa(l, n[c], i, s);
    o[l] = u;
  }
  o && o.font && wa(o.font, o);
  const h = y(y({}, i), o);
  return lr.test(a.nodeName) ? h : function(c) {
    const l = it.getDefaults();
    return Object.entries(_a).forEach((u) => {
      let [d, g] = u;
      if (c[g] === void 0 || c[d] === "") return;
      if (c[d] === void 0) {
        if (!l[d]) return;
        c[d] = l[d];
      }
      if (c[d].indexOf("url(") === 0) return;
      const f = new z(c[d]);
      c[d] = f.setAlpha(G(f.getAlpha() * c[g], 2)).toRgba();
    }), c;
  }(h);
}
const Sa = ["left", "top", "width", "height", "visible"], mn = ["rx", "ry"];
class wt extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), wt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, wt.ownDefaults), this.setOptions(t), this._initRxRy();
  }
  _initRxRy() {
    const { rx: t, ry: e } = this;
    t && !e ? this.ry = t : e && !t && (this.rx = e);
  }
  _render(t) {
    const { width: e, height: s } = this, i = -e / 2, r = -s / 2, n = this.rx ? Math.min(this.rx, e / 2) : 0, o = this.ry ? Math.min(this.ry, s / 2) : 0, h = n !== 0 || o !== 0;
    t.beginPath(), t.moveTo(i + n, r), t.lineTo(i + e - n, r), h && t.bezierCurveTo(i + e - Kt * n, r, i + e, r + Kt * o, i + e, r + o), t.lineTo(i + e, r + s - o), h && t.bezierCurveTo(i + e, r + s - Kt * o, i + e - Kt * n, r + s, i + e - n, r + s), t.lineTo(i + n, r + s), h && t.bezierCurveTo(i + Kt * n, r + s, i, r + s - Kt * o, i, r + s - o), t.lineTo(i, r + o), h && t.bezierCurveTo(i, r + Kt * o, i + Kt * n, r, i + n, r), t.closePath(), this._renderPaintInOrder(t);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...mn, ...t]);
  }
  _toSVG() {
    const { width: t, height: e, rx: s, ry: i } = this;
    return ["<rect ", "COMMON_PARTS", 'x="'.concat(-t / 2, '" y="').concat(-e / 2, '" rx="').concat(s, '" ry="').concat(i, '" width="').concat(t, '" height="').concat(e, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const i = qt(t, this.ATTRIBUTE_NAMES, s), { left: r = 0, top: n = 0, width: o = 0, height: h = 0, visible: c = !0 } = i, l = V(i, Sa);
    return new this(y(y(y({}, e), l), {}, { left: r, top: n, width: o, height: h, visible: !!(c && o && h) }));
  }
}
m(wt, "type", "Rect"), m(wt, "cacheProperties", [...Ut, ...mn]), m(wt, "ownDefaults", { rx: 0, ry: 0 }), m(wt, "ATTRIBUTE_NAMES", [...ee, "x", "y", "rx", "ry", "width", "height"]), T.setClass(wt), T.setSVGClass(wt);
const Ht = "initialization", Xs = "added", Ji = "removed", Ys = "imperative", vn = (a, t) => {
  const { strokeUniform: e, strokeWidth: s, width: i, height: r, group: n } = t, o = n && n !== a ? Ks(n.calcTransformMatrix(), a.calcTransformMatrix()) : null, h = o ? t.getRelativeCenterPoint().transform(o) : t.getRelativeCenterPoint(), c = !t.isStrokeAccountedForInDimensions(), l = e && c ? go(new w(s, s), void 0, a.calcTransformMatrix()) : Wi, u = !e && c ? s : 0, d = Xi(i + u, r + u, zi([o, t.calcOwnMatrix()], !0)).add(l).scalarDivide(2);
  return [h.subtract(d), h.add(d)];
};
class $s {
  calcLayoutResult(t, e) {
    if (this.shouldPerformLayout(t)) return this.calcBoundingBox(e, t);
  }
  shouldPerformLayout(t) {
    let { type: e, prevStrategy: s, strategy: i } = t;
    return e === Ht || e === Ys || !!s && i !== s;
  }
  shouldLayoutClipPath(t) {
    let { type: e, target: { clipPath: s } } = t;
    return e !== Ht && s && !s.absolutePositioned;
  }
  getInitialSize(t, e) {
    return e.size;
  }
  calcBoundingBox(t, e) {
    const { type: s, target: i } = e;
    if (s === Ys && e.overrides) return e.overrides;
    if (t.length === 0) return;
    const { left: r, top: n, width: o, height: h } = Vt(t.map((u) => vn(i, u)).reduce((u, d) => u.concat(d), [])), c = new w(o, h), l = new w(r, n).add(c.scalarDivide(2));
    if (s === Ht) {
      const u = this.getInitialSize(e, { size: c, center: l });
      return { center: l, relativeCorrection: new w(0, 0), size: u };
    }
    return { center: l.transform(i.calcOwnMatrix()), size: c };
  }
}
m($s, "type", "strategy");
class Si extends $s {
  shouldPerformLayout(t) {
    return !0;
  }
}
m(Si, "type", "fit-content"), T.setClass(Si);
const Ta = ["strategy"], Oa = ["target", "strategy", "bubbles", "prevStrategy"], yn = "layoutManager";
class qe {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Si();
    m(this, "strategy", void 0), this.strategy = t, this._subscriptions = /* @__PURE__ */ new Map();
  }
  performLayout(t) {
    const e = y(y({ bubbles: !0, strategy: this.strategy }, t), {}, { prevStrategy: this._prevLayoutStrategy, stopPropagation() {
      this.bubbles = !1;
    } });
    this.onBeforeLayout(e);
    const s = this.getLayoutResult(e);
    s && this.commitLayout(e, s), this.onAfterLayout(e, s), this._prevLayoutStrategy = e.strategy;
  }
  attachHandlers(t, e) {
    const { target: s } = e;
    return [Ps, zr, Ve, Ir, Ns, Br, Ls, Zn, $n].map((i) => t.on(i, (r) => this.performLayout(i === Ps ? { type: "object_modified", trigger: i, e: r, target: s } : { type: "object_modifying", trigger: i, e: r, target: s })));
  }
  subscribe(t, e) {
    this.unsubscribe(t, e);
    const s = this.attachHandlers(t, e);
    this._subscriptions.set(t, s);
  }
  unsubscribe(t, e) {
    (this._subscriptions.get(t) || []).forEach((s) => s()), this._subscriptions.delete(t);
  }
  unsubscribeTargets(t) {
    t.targets.forEach((e) => this.unsubscribe(e, t));
  }
  subscribeTargets(t) {
    t.targets.forEach((e) => this.subscribe(e, t));
  }
  onBeforeLayout(t) {
    const { target: e, type: s } = t, { canvas: i } = e;
    if (s === Ht || s === Xs ? this.subscribeTargets(t) : s === Ji && this.unsubscribeTargets(t), e.fire("layout:before", { context: t }), i && i.fire("object:layout:before", { target: e, context: t }), s === Ys && t.deep) {
      const r = V(t, Ta);
      e.forEachObject((n) => n.layoutManager && n.layoutManager.performLayout(y(y({}, r), {}, { bubbles: !1, target: n })));
    }
  }
  getLayoutResult(t) {
    const { target: e, strategy: s, type: i } = t, r = s.calcLayoutResult(t, e.getObjects());
    if (!r) return;
    const n = i === Ht ? new w() : e.getRelativeCenterPoint(), { center: o, correction: h = new w(), relativeCorrection: c = new w() } = r, l = n.subtract(o).add(h).transform(i === Ht ? ot : Dt(e.calcOwnMatrix()), !0).add(c);
    return { result: r, prevCenter: n, nextCenter: o, offset: l };
  }
  commitLayout(t, e) {
    const { target: s } = t, { result: { size: i }, nextCenter: r } = e;
    var n, o;
    s.set({ width: i.x, height: i.y }), this.layoutObjects(t, e), t.type === Ht ? s.set({ left: (n = t.x) !== null && n !== void 0 ? n : r.x + i.x * J(s.originX), top: (o = t.y) !== null && o !== void 0 ? o : r.y + i.y * J(s.originY) }) : (s.setPositionByOrigin(r, R, R), s.setCoords(), s.set("dirty", !0));
  }
  layoutObjects(t, e) {
    const { target: s } = t;
    s.forEachObject((i) => {
      i.group === s && this.layoutObject(t, e, i);
    }), t.strategy.shouldLayoutClipPath(t) && this.layoutObject(t, e, s.clipPath);
  }
  layoutObject(t, e, s) {
    let { offset: i } = e;
    s.set({ left: s.left + i.x, top: s.top + i.y });
  }
  onAfterLayout(t, e) {
    const { target: s, strategy: i, bubbles: r, prevStrategy: n } = t, o = V(t, Oa), { canvas: h } = s;
    s.fire("layout:after", { context: t, result: e }), h && h.fire("object:layout:after", { context: t, result: e, target: s });
    const c = s.parent;
    r && c != null && c.layoutManager && ((o.path || (o.path = [])).push(s), c.layoutManager.performLayout(y(y({}, o), {}, { target: c }))), s.set("dirty", !0);
  }
  dispose() {
    const { _subscriptions: t } = this;
    t.forEach((e) => e.forEach((s) => s())), t.clear();
  }
  toObject() {
    return { type: yn, strategy: this.strategy.constructor.type };
  }
  toJSON() {
    return this.toObject();
  }
}
T.setClass(qe, yn);
const Ea = ["type", "objects", "layoutManager"];
class ka extends qe {
  performLayout() {
  }
}
class le extends Xr(it) {
  static getDefaults() {
    return y(y({}, super.getDefaults()), le.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), m(this, "_activeObjects", []), m(this, "__objectSelectionTracker", void 0), m(this, "__objectSelectionDisposer", void 0), Object.assign(this, le.ownDefaults), this.setOptions(e), this.groupInit(t, e);
  }
  groupInit(t, e) {
    var s;
    this._objects = [...t], this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, !0), this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, !1), this.forEachObject((i) => {
      this.enterGroup(i, !1);
    }), this.layoutManager = (s = e.layoutManager) !== null && s !== void 0 ? s : new qe(), this.layoutManager.performLayout({ type: Ht, target: this, targets: [...t], x: e.left, y: e.top });
  }
  canEnterGroup(t) {
    return t === this || this.isDescendantOf(t) ? ($t("error", "Group: circular object trees are not supported, this call has no effect"), !1) : this._objects.indexOf(t) === -1 || ($t("error", "Group: duplicate objects are not supported inside group, this call has no effect"), !1);
  }
  _filterObjectsBeforeEnteringGroup(t) {
    return t.filter((e, s, i) => this.canEnterGroup(e) && i.indexOf(e) === s);
  }
  add() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    const i = this._filterObjectsBeforeEnteringGroup(e), r = super.add(...i);
    return this._onAfterObjectsChange(Xs, i), r;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) s[i - 1] = arguments[i];
    const r = this._filterObjectsBeforeEnteringGroup(s), n = super.insertAt(t, ...r);
    return this._onAfterObjectsChange(Xs, r), n;
  }
  remove() {
    const t = super.remove(...arguments);
    return this._onAfterObjectsChange(Ji, t), t;
  }
  _onObjectAdded(t) {
    this.enterGroup(t, !0), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t, e) {
    this.exitGroup(t, e), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onAfterObjectsChange(t, e) {
    this.layoutManager.performLayout({ type: t, targets: e, target: this });
  }
  _onStackOrderChanged() {
    this._set("dirty", !0);
  }
  _set(t, e) {
    const s = this[t];
    return super._set(t, e), t === "canvas" && s !== e && (this._objects || []).forEach((i) => {
      i._set(t, e);
    }), this;
  }
  _shouldSetNestedCoords() {
    return this.subTargetCheck;
  }
  removeAll() {
    return this._activeObjects = [], this.remove(...this._objects);
  }
  __objectSelectionMonitor(t, e) {
    let { target: s } = e;
    const i = this._activeObjects;
    if (t) i.push(s), this._set("dirty", !0);
    else if (i.length > 0) {
      const r = i.indexOf(s);
      r > -1 && (i.splice(r, 1), this._set("dirty", !0));
    }
  }
  _watchObject(t, e) {
    t && this._watchObject(!1, e), t ? (e.on("selected", this.__objectSelectionTracker), e.on("deselected", this.__objectSelectionDisposer)) : (e.off("selected", this.__objectSelectionTracker), e.off("deselected", this.__objectSelectionDisposer));
  }
  enterGroup(t, e) {
    t.group && t.group.remove(t), t._set("parent", this), this._enterGroup(t, e);
  }
  _enterGroup(t, e) {
    e && Is(t, et(Dt(this.calcTransformMatrix()), t.calcTransformMatrix())), this._shouldSetNestedCoords() && t.setCoords(), t._set("group", this), t._set("canvas", this.canvas), this._watchObject(!0, t);
    const s = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject();
    s && (s === t || t.isDescendantOf(s)) && this._activeObjects.push(t);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t._set("parent", void 0), t._set("canvas", void 0);
  }
  _exitGroup(t, e) {
    t._set("group", void 0), e || (Is(t, et(this.calcTransformMatrix(), t.calcTransformMatrix())), t.setCoords()), this._watchObject(!1, t);
    const s = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t) : -1;
    s > -1 && this._activeObjects.splice(s, 1);
  }
  shouldCache() {
    const t = it.prototype.shouldCache.call(this);
    if (t) {
      for (let e = 0; e < this._objects.length; e++) if (this._objects[e].willDrawShadow()) return this.ownCaching = !1, !1;
    }
    return t;
  }
  willDrawShadow() {
    if (super.willDrawShadow()) return !0;
    for (let t = 0; t < this._objects.length; t++) if (this._objects[t].willDrawShadow()) return !0;
    return !1;
  }
  isOnACache() {
    return this.ownCaching || !!this.parent && this.parent.isOnACache();
  }
  drawObject(t, e, s) {
    this._renderBackground(t);
    for (let r = 0; r < this._objects.length; r++) {
      var i;
      const n = this._objects[r];
      (i = this.canvas) !== null && i !== void 0 && i.preserveObjectStacking && n.group !== this ? (t.save(), t.transform(...Dt(this.calcTransformMatrix())), n.render(t), t.restore()) : n.group === this && n.render(t);
    }
    this._drawClipPath(t, this.clipPath, s);
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t) => t.setCoords());
  }
  triggerLayout() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.layoutManager.performLayout(y({ target: this, type: Ys }, t));
  }
  render(t) {
    this._transformDone = !0, super.render(t), this._transformDone = !1;
  }
  __serializeObjects(t, e) {
    const s = this.includeDefaultValues;
    return this._objects.filter(function(i) {
      return !i.excludeFromExport;
    }).map(function(i) {
      const r = i.includeDefaultValues;
      i.includeDefaultValues = s;
      const n = i[t || "toObject"](e);
      return i.includeDefaultValues = r, n;
    });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.layoutManager.toObject();
    return y(y(y({}, super.toObject(["subTargetCheck", "interactive", ...t])), e.strategy !== "fit-content" || this.includeDefaultValues ? { layoutManager: e } : {}), {}, { objects: this.__serializeObjects("toObject", t) });
  }
  toString() {
    return "#<Group: (".concat(this.complexity(), ")>");
  }
  dispose() {
    this.layoutManager.unsubscribeTargets({ targets: this.getObjects(), target: this }), this._activeObjects = [], this.forEachObject((t) => {
      this._watchObject(!1, t), t.dispose();
    }), super.dispose();
  }
  _createSVGBgRect(t) {
    if (!this.backgroundColor) return "";
    const e = wt.prototype._toSVG.call(this), s = e.indexOf("COMMON_PARTS");
    e[s] = 'for="group" ';
    const i = e.join("");
    return t ? t(i) : i;
  }
  _toSVG(t) {
    const e = ["<g ", "COMMON_PARTS", ` >
`], s = this._createSVGBgRect(t);
    s && e.push("		", s);
    for (let i = 0; i < this._objects.length; i++) e.push("		", this._objects[i].toSVG(t));
    return e.push(`</g>
`), e;
  }
  getSvgStyles() {
    const t = this.opacity !== void 0 && this.opacity !== 1 ? "opacity: ".concat(this.opacity, ";") : "", e = this.visible ? "" : " visibility: hidden;";
    return [t, this.getSvgFilter(), e].join("");
  }
  toClipPathSVG(t) {
    const e = [], s = this._createSVGBgRect(t);
    s && e.push("	", s);
    for (let i = 0; i < this._objects.length; i++) e.push("	", this._objects[i].toClipPathSVG(t));
    return this._createBaseClipPathSVGMarkup(e, { reviver: t });
  }
  static fromObject(t, e) {
    let { type: s, objects: i = [], layoutManager: r } = t, n = V(t, Ea);
    return Promise.all([Ne(i, e), qs(n, e)]).then((o) => {
      let [h, c] = o;
      const l = new this(h, y(y(y({}, n), c), {}, { layoutManager: new ka() }));
      if (r) {
        const u = T.getClass(r.type), d = T.getClass(r.strategy);
        l.layoutManager = new u(new d());
      } else l.layoutManager = new qe();
      return l.layoutManager.subscribeTargets({ type: Ht, target: l, targets: l.getObjects() }), l.setCoords(), l;
    });
  }
}
m(le, "type", "Group"), m(le, "ownDefaults", { strokeWidth: 0, subTargetCheck: !1, interactive: !1 }), T.setClass(le);
const Ma = (a, t) => Math.min(t.width / a.width, t.height / a.height), Da = (a, t) => Math.max(t.width / a.width, t.height / a.height), Ti = "\\s*,?\\s*", ze = "".concat(Ti, "(").concat(ge, ")"), Aa = "".concat(ze).concat(ze).concat(ze).concat(Ti, "([01])").concat(Ti, "([01])").concat(ze).concat(ze), Ra = { m: "l", M: "L" }, ja = (a, t, e, s, i, r, n, o, h, c, l) => {
  const u = Nt(a), d = Gt(a), g = Nt(t), f = Gt(t), v = e * i * g - s * r * f + n, x = s * i * g + e * r * f + o;
  return ["C", c + h * (-e * i * d - s * r * u), l + h * (-s * i * d + e * r * u), v + h * (e * i * f + s * r * g), x + h * (s * i * f - e * r * g), v, x];
}, Or = (a, t, e, s) => {
  const i = Math.atan2(t, a), r = Math.atan2(s, e);
  return r >= i ? r - i : 2 * Math.PI - (i - r);
};
function Er(a, t, e, s, i, r, n, o) {
  let h;
  if (j.cachesBoundsOfCurve && (h = [...arguments].join(), Be.boundsOfCurveCache[h])) return Be.boundsOfCurveCache[h];
  const c = Math.sqrt, l = Math.abs, u = [], d = [[0, 0], [0, 0]];
  let g = 6 * a - 12 * e + 6 * i, f = -3 * a + 9 * e - 9 * i + 3 * n, v = 3 * e - 3 * a;
  for (let S = 0; S < 2; ++S) {
    if (S > 0 && (g = 6 * t - 12 * s + 6 * r, f = -3 * t + 9 * s - 9 * r + 3 * o, v = 3 * s - 3 * t), l(f) < 1e-12) {
      if (l(g) < 1e-12) continue;
      const F = -v / g;
      0 < F && F < 1 && u.push(F);
      continue;
    }
    const k = g * g - 4 * v * f;
    if (k < 0) continue;
    const M = c(k), A = (-g + M) / (2 * f);
    0 < A && A < 1 && u.push(A);
    const E = (-g - M) / (2 * f);
    0 < E && E < 1 && u.push(E);
  }
  let x = u.length;
  const b = x, C = xn(a, t, e, s, i, r, n, o);
  for (; x--; ) {
    const { x: S, y: k } = C(u[x]);
    d[0][x] = S, d[1][x] = k;
  }
  d[0][b] = a, d[1][b] = t, d[0][b + 1] = n, d[1][b + 1] = o;
  const _ = [new w(Math.min(...d[0]), Math.min(...d[1])), new w(Math.max(...d[0]), Math.max(...d[1]))];
  return j.cachesBoundsOfCurve && (Be.boundsOfCurveCache[h] = _), _;
}
const La = (a, t, e) => {
  let [s, i, r, n, o, h, c, l] = e;
  const u = ((d, g, f, v, x, b, C) => {
    if (f === 0 || v === 0) return [];
    let _ = 0, S = 0, k = 0;
    const M = Math.PI, A = C * ji, E = Gt(A), F = Nt(A), P = 0.5 * (-F * d - E * g), Y = 0.5 * (-F * g + E * d), H = f ** 2, L = v ** 2, X = Y ** 2, Q = P ** 2, U = H * L - H * X - L * Q;
    let dt = Math.abs(f), W = Math.abs(v);
    if (U < 0) {
      const Lt = Math.sqrt(1 - U / (H * L));
      dt *= Lt, W *= Lt;
    } else k = (x === b ? -1 : 1) * Math.sqrt(U / (H * X + L * Q));
    const mt = k * dt * Y / W, vt = -k * W * P / dt, se = F * mt - E * vt + 0.5 * d, We = E * mt + F * vt + 0.5 * g;
    let ie = Or(1, 0, (P - mt) / dt, (Y - vt) / W), Tt = Or((P - mt) / dt, (Y - vt) / W, (-P - mt) / dt, (-Y - vt) / W);
    b === 0 && Tt > 0 ? Tt -= 2 * M : b === 1 && Tt < 0 && (Tt += 2 * M);
    const re = Math.ceil(Math.abs(Tt / M * 2)), yt = [], jt = Tt / re, Qe = 8 / 3 * Math.sin(jt / 4) * Math.sin(jt / 4) / Math.sin(jt / 2);
    let fe = ie + jt;
    for (let Lt = 0; Lt < re; Lt++) yt[Lt] = ja(ie, fe, F, E, dt, W, se, We, Qe, _, S), _ = yt[Lt][5], S = yt[Lt][6], ie = fe, fe += jt;
    return yt;
  })(c - a, l - t, i, r, o, h, n);
  for (let d = 0, g = u.length; d < g; d++) u[d][1] += a, u[d][2] += t, u[d][3] += a, u[d][4] += t, u[d][5] += a, u[d][6] += t;
  return u;
}, Pa = (a) => {
  let t = 0, e = 0, s = 0, i = 0;
  const r = [];
  let n, o = 0, h = 0;
  for (const c of a) {
    const l = [...c];
    let u;
    switch (l[0]) {
      case "l":
        l[1] += t, l[2] += e;
      case "L":
        t = l[1], e = l[2], u = ["L", t, e];
        break;
      case "h":
        l[1] += t;
      case "H":
        t = l[1], u = ["L", t, e];
        break;
      case "v":
        l[1] += e;
      case "V":
        e = l[1], u = ["L", t, e];
        break;
      case "m":
        l[1] += t, l[2] += e;
      case "M":
        t = l[1], e = l[2], s = l[1], i = l[2], u = ["M", t, e];
        break;
      case "c":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e, l[5] += t, l[6] += e;
      case "C":
        o = l[3], h = l[4], t = l[5], e = l[6], u = ["C", l[1], l[2], o, h, t, e];
        break;
      case "s":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e;
      case "S":
        n === "C" ? (o = 2 * t - o, h = 2 * e - h) : (o = t, h = e), t = l[3], e = l[4], u = ["C", o, h, l[1], l[2], t, e], o = u[3], h = u[4];
        break;
      case "q":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e;
      case "Q":
        o = l[1], h = l[2], t = l[3], e = l[4], u = ["Q", o, h, t, e];
        break;
      case "t":
        l[1] += t, l[2] += e;
      case "T":
        n === "Q" ? (o = 2 * t - o, h = 2 * e - h) : (o = t, h = e), t = l[1], e = l[2], u = ["Q", o, h, t, e];
        break;
      case "a":
        l[6] += t, l[7] += e;
      case "A":
        La(t, e, l).forEach((d) => r.push(d)), t = l[6], e = l[7];
        break;
      case "z":
      case "Z":
        t = s, e = i, u = ["Z"];
    }
    u ? (r.push(u), n = u[0]) : n = "";
  }
  return r;
}, Hs = (a, t, e, s) => Math.sqrt((e - a) ** 2 + (s - t) ** 2), xn = (a, t, e, s, i, r, n, o) => (h) => {
  const c = h ** 3, l = ((g) => 3 * g ** 2 * (1 - g))(h), u = ((g) => 3 * g * (1 - g) ** 2)(h), d = ((g) => (1 - g) ** 3)(h);
  return new w(n * c + i * l + e * u + a * d, o * c + r * l + s * u + t * d);
}, wn = (a) => a ** 2, bn = (a) => 2 * a * (1 - a), Cn = (a) => (1 - a) ** 2, Fa = (a, t, e, s, i, r, n, o) => (h) => {
  const c = wn(h), l = bn(h), u = Cn(h), d = 3 * (u * (e - a) + l * (i - e) + c * (n - i)), g = 3 * (u * (s - t) + l * (r - s) + c * (o - r));
  return Math.atan2(g, d);
}, Wa = (a, t, e, s, i, r) => (n) => {
  const o = wn(n), h = bn(n), c = Cn(n);
  return new w(i * o + e * h + a * c, r * o + s * h + t * c);
}, za = (a, t, e, s, i, r) => (n) => {
  const o = 1 - n, h = 2 * (o * (e - a) + n * (i - e)), c = 2 * (o * (s - t) + n * (r - s));
  return Math.atan2(c, h);
}, kr = (a, t, e) => {
  let s = new w(t, e), i = 0;
  for (let r = 1; r <= 100; r += 1) {
    const n = a(r / 100);
    i += Hs(s.x, s.y, n.x, n.y), s = n;
  }
  return i;
}, Ia = (a, t) => {
  let e, s = 0, i = 0, r = { x: a.x, y: a.y }, n = y({}, r), o = 0.01, h = 0;
  const c = a.iterator, l = a.angleFinder;
  for (; i < t && o > 1e-4; ) n = c(s), h = s, e = Hs(r.x, r.y, n.x, n.y), e + i > t ? (s -= o, o /= 2) : (r = n, s += o, i += e);
  return y(y({}, n), {}, { angle: l(h) });
}, _n = (a) => {
  let t, e, s = 0, i = 0, r = 0, n = 0, o = 0;
  const h = [];
  for (const c of a) {
    const l = { x: i, y: r, command: c[0], length: 0 };
    switch (c[0]) {
      case "M":
        e = l, e.x = n = i = c[1], e.y = o = r = c[2];
        break;
      case "L":
        e = l, e.length = Hs(i, r, c[1], c[2]), i = c[1], r = c[2];
        break;
      case "C":
        t = xn(i, r, c[1], c[2], c[3], c[4], c[5], c[6]), e = l, e.iterator = t, e.angleFinder = Fa(i, r, c[1], c[2], c[3], c[4], c[5], c[6]), e.length = kr(t, i, r), i = c[5], r = c[6];
        break;
      case "Q":
        t = Wa(i, r, c[1], c[2], c[3], c[4]), e = l, e.iterator = t, e.angleFinder = za(i, r, c[1], c[2], c[3], c[4]), e.length = kr(t, i, r), i = c[3], r = c[4];
        break;
      case "Z":
        e = l, e.destX = n, e.destY = o, e.length = Hs(i, r, n, o), i = n, r = o;
    }
    s += e.length, h.push(e);
  }
  return h.push({ length: s, x: i, y: r }), h;
}, Ba = function(a, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _n(a), s = 0;
  for (; t - e[s].length > 0 && s < e.length - 2; ) t -= e[s].length, s++;
  const i = e[s], r = t / i.length, n = a[s];
  switch (i.command) {
    case "M":
      return { x: i.x, y: i.y, angle: 0 };
    case "Z":
      return y(y({}, new w(i.x, i.y).lerp(new w(i.destX, i.destY), r)), {}, { angle: Math.atan2(i.destY - i.y, i.destX - i.x) });
    case "L":
      return y(y({}, new w(i.x, i.y).lerp(new w(n[1], n[2]), r)), {}, { angle: Math.atan2(n[2] - i.y, n[1] - i.x) });
    case "C":
    case "Q":
      return Ia(i, t);
  }
}, Xa = new RegExp("[mzlhvcsqta][^mzlhvcsqta]*", "gi"), Mr = new RegExp(Aa, "g"), Ya = new RegExp(ge, "gi"), Ha = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 }, Va = (a) => {
  var t;
  const e = [], s = (t = a.match(Xa)) !== null && t !== void 0 ? t : [];
  for (const i of s) {
    const r = i[0];
    if (r === "z" || r === "Z") {
      e.push([r]);
      continue;
    }
    const n = Ha[r.toLowerCase()];
    let o = [];
    if (r === "a" || r === "A") {
      Mr.lastIndex = 0;
      for (let h = null; h = Mr.exec(i); ) o.push(...h.slice(1));
    } else o = i.match(Ya) || [];
    for (let h = 0; h < o.length; h += n) {
      const c = new Array(n), l = Ra[r];
      c[0] = h > 0 && l ? l : r;
      for (let u = 0; u < n; u++) c[u + 1] = parseFloat(o[h + u]);
      e.push(c);
    }
  }
  return e;
}, Na = function(a) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = new w(a[0]), s = new w(a[1]), i = 1, r = 0;
  const n = [], o = a.length, h = o > 2;
  let c;
  for (h && (i = a[2].x < s.x ? -1 : a[2].x === s.x ? 0 : 1, r = a[2].y < s.y ? -1 : a[2].y === s.y ? 0 : 1), n.push(["M", e.x - i * t, e.y - r * t]), c = 1; c < o; c++) {
    if (!e.eq(s)) {
      const l = e.midPointFrom(s);
      n.push(["Q", e.x, e.y, l.x, l.y]);
    }
    e = a[c], c + 1 < a.length && (s = a[c + 1]);
  }
  return h && (i = e.x > a[c - 2].x ? 1 : e.x === a[c - 2].x ? 0 : -1, r = e.y > a[c - 2].y ? 1 : e.y === a[c - 2].y ? 0 : -1), n.push(["L", e.x + i * t, e.y + r * t]), n;
}, Sn = (a, t) => a.map((e) => e.map((s, i) => i === 0 || t === void 0 ? s : G(s, t)).join(" ")).join(" ");
function Oi(a, t) {
  const e = a.style;
  e && t && (typeof t == "string" ? e.cssText += ";" + t : Object.entries(t).forEach((s) => {
    let [i, r] = s;
    return e.setProperty(i, r);
  }));
}
class Ga extends $r {
  constructor(t) {
    let { allowTouchScrolling: e = !1, containerClass: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(t), m(this, "upper", void 0), m(this, "container", void 0);
    const { el: i } = this.lower, r = this.createUpperCanvas();
    this.upper = { el: r, ctx: r.getContext("2d") }, this.applyCanvasStyle(i, { allowTouchScrolling: e }), this.applyCanvasStyle(r, { allowTouchScrolling: e, styles: { position: "absolute", left: "0", top: "0" } });
    const n = this.createContainerElement();
    n.classList.add(s), i.parentNode && i.parentNode.replaceChild(n, i), n.append(i, r), this.container = n;
  }
  createUpperCanvas() {
    const { el: t } = this.lower, e = St();
    return e.className = t.className, e.classList.remove("lower-canvas"), e.classList.add("upper-canvas"), e.setAttribute("data-fabric", "top"), e.style.cssText = t.style.cssText, e.setAttribute("draggable", "true"), e;
  }
  createContainerElement() {
    const t = Me().createElement("div");
    return t.setAttribute("data-fabric", "wrapper"), Oi(t, { position: "relative" }), ar(t), t;
  }
  applyCanvasStyle(t, e) {
    const { styles: s, allowTouchScrolling: i } = e;
    Oi(t, y(y({}, s), {}, { "touch-action": i ? "manipulation" : ct })), ar(t);
  }
  setDimensions(t, e) {
    super.setDimensions(t, e);
    const { el: s, ctx: i } = this.upper;
    Zr(s, i, t, e);
  }
  setCSSDimensions(t) {
    super.setCSSDimensions(t), vi(this.upper.el, t), vi(this.container, t);
  }
  cleanupDOM(t) {
    const e = this.container, { el: s } = this.lower, { el: i } = this.upper;
    super.cleanupDOM(t), e.removeChild(i), e.removeChild(s), e.parentNode && e.parentNode.replaceChild(s, e);
  }
  dispose() {
    super.dispose(), zt().dispose(this.upper.el), delete this.upper, delete this.container;
  }
}
class Qs extends je {
  constructor() {
    super(...arguments), m(this, "targets", []), m(this, "_hoveredTargets", []), m(this, "_objectsToRender", void 0), m(this, "_currentTransform", null), m(this, "_groupSelector", null), m(this, "contextTopDirty", !1);
  }
  static getDefaults() {
    return y(y({}, super.getDefaults()), Qs.ownDefaults);
  }
  get upperCanvasEl() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.el;
  }
  get contextTop() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.ctx;
  }
  get wrapperEl() {
    return this.elements.container;
  }
  initElements(t) {
    this.elements = new Ga(t, { allowTouchScrolling: this.allowTouchScrolling, containerClass: this.containerClass }), this._createCacheCanvas();
  }
  _onObjectAdded(t) {
    this._objectsToRender = void 0, super._onObjectAdded(t);
  }
  _onObjectRemoved(t) {
    this._objectsToRender = void 0, t === this._activeObject && (this.fire("before:selection:cleared", { deselected: [t] }), this._discardActiveObject(), this.fire("selection:cleared", { deselected: [t] }), t.fire("deselected", { target: t })), t === this._hoveredTarget && (this._hoveredTarget = void 0, this._hoveredTargets = []), super._onObjectRemoved(t);
  }
  _onStackOrderChanged() {
    this._objectsToRender = void 0, super._onStackOrderChanged();
  }
  _chooseObjectsToRender() {
    const t = this._activeObject;
    return !this.preserveObjectStacking && t ? this._objects.filter((e) => !e.group && e !== t).concat(t) : this._objects;
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || (!this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop), this.contextTopDirty = !1), this.hasLostContext && (this.renderTopLayer(this.contextTop), this.hasLostContext = !1), !this._objectsToRender && (this._objectsToRender = this._chooseObjectsToRender()), this.renderCanvas(this.getContext(), this._objectsToRender));
  }
  renderTopLayer(t) {
    t.save(), this.isDrawingMode && this._isCurrentlyDrawing && (this.freeDrawingBrush && this.freeDrawingBrush._render(), this.contextTopDirty = !0), this.selection && this._groupSelector && (this._drawSelection(t), this.contextTopDirty = !0), t.restore();
  }
  renderTop() {
    const t = this.contextTop;
    this.clearContext(t), this.renderTopLayer(t), this.fire("after:render", { ctx: t });
  }
  setTargetFindTolerance(t) {
    t = Math.round(t), this.targetFindTolerance = t;
    const e = this.getRetinaScaling(), s = Math.ceil((2 * t + 1) * e);
    this.pixelFindCanvasEl.width = this.pixelFindCanvasEl.height = s, this.pixelFindContext.scale(e, e);
  }
  isTargetTransparent(t, e, s) {
    const i = this.targetFindTolerance, r = this.pixelFindContext;
    this.clearContext(r), r.save(), r.translate(-e + i, -s + i), r.transform(...this.viewportTransform);
    const n = t.selectionBackgroundColor;
    t.selectionBackgroundColor = "", t.render(r), t.selectionBackgroundColor = n, r.restore();
    const o = Math.round(i * this.getRetinaScaling());
    return Zo(r, o, o, o);
  }
  _isSelectionKeyPressed(t) {
    const e = this.selectionKey;
    return !!e && (Array.isArray(e) ? !!e.find((s) => !!s && t[s] === !0) : t[e]);
  }
  _shouldClearSelection(t, e) {
    const s = this.getActiveObjects(), i = this._activeObject;
    return !!(!e || e && i && s.length > 1 && s.indexOf(e) === -1 && i !== e && !this._isSelectionKeyPressed(t) || e && !e.evented || e && !e.selectable && i && i !== e);
  }
  _shouldCenterTransform(t, e, s) {
    if (!t) return;
    let i;
    return e === Gs || e === ut || e === _t || e === Ve ? i = this.centeredScaling || t.centeredScaling : e === Fi && (i = this.centeredRotation || t.centeredRotation), i ? !s : s;
  }
  _getOriginFromCorner(t, e) {
    const s = { x: t.originX, y: t.originY };
    return e && (["ml", "tl", "bl"].includes(e) ? s.x = q : ["mr", "tr", "br"].includes(e) && (s.x = I), ["tl", "mt", "tr"].includes(e) ? s.y = mi : ["bl", "mb", "br"].includes(e) && (s.y = ht)), s;
  }
  _setupCurrentTransform(t, e, s) {
    var i;
    const r = e.group ? Oe(this.getScenePoint(t), void 0, e.group.calcTransformMatrix()) : this.getScenePoint(t), { key: n = "", control: o } = e.getActiveControl() || {}, h = s && o ? (i = o.getActionHandler(t, e, o)) === null || i === void 0 ? void 0 : i.bind(o) : mo, c = ((g, f, v, x) => {
      if (!f || !g) return "drag";
      const b = x.controls[f];
      return b.getActionName(v, b, x);
    })(s, n, t, e), l = t[this.centeredKey], u = this._shouldCenterTransform(e, c, l) ? { x: R, y: R } : this._getOriginFromCorner(e, n), d = { target: e, action: c, actionHandler: h, actionPerformed: !1, corner: n, scaleX: e.scaleX, scaleY: e.scaleY, skewX: e.skewX, skewY: e.skewY, offsetX: r.x - e.left, offsetY: r.y - e.top, originX: u.x, originY: u.y, ex: r.x, ey: r.y, lastX: r.x, lastY: r.y, theta: K(e.angle), width: e.width, height: e.height, shiftKey: t.shiftKey, altKey: l, original: y(y({}, Qr(e)), {}, { originX: u.x, originY: u.y }) };
    this._currentTransform = d, this.fire("before:transform", { e: t, transform: d });
  }
  setCursor(t) {
    this.upperCanvasEl.style.cursor = t;
  }
  _drawSelection(t) {
    const { x: e, y: s, deltaX: i, deltaY: r } = this._groupSelector, n = new w(e, s).transform(this.viewportTransform), o = new w(e + i, s + r).transform(this.viewportTransform), h = this.selectionLineWidth / 2;
    let c = Math.min(n.x, o.x), l = Math.min(n.y, o.y), u = Math.max(n.x, o.x), d = Math.max(n.y, o.y);
    this.selectionColor && (t.fillStyle = this.selectionColor, t.fillRect(c, l, u - c, d - l)), this.selectionLineWidth && this.selectionBorderColor && (t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, c += h, l += h, u -= h, d -= h, it.prototype._setLineDash.call(this, t, this.selectionDashArray), t.strokeRect(c, l, u - c, d - l));
  }
  findTarget(t) {
    if (this.skipTargetFind) return;
    const e = this.getViewportPoint(t), s = this._activeObject, i = this.getActiveObjects();
    if (this.targets = [], s && i.length >= 1) {
      if (s.findControl(e, yi(t)) || i.length > 1 && this.searchPossibleTargets([s], e)) return s;
      if (s === this.searchPossibleTargets([s], e)) {
        if (this.preserveObjectStacking) {
          const r = this.targets;
          this.targets = [];
          const n = this.searchPossibleTargets(this._objects, e);
          return t[this.altSelectionKey] && n && n !== s ? (this.targets = r, s) : n;
        }
        return s;
      }
    }
    return this.searchPossibleTargets(this._objects, e);
  }
  _pointIsInObjectSelectionArea(t, e) {
    let s = t.getCoords();
    const i = this.getZoom(), r = t.padding / i;
    if (r) {
      const [n, o, h, c] = s, l = Math.atan2(o.y - n.y, o.x - n.x), u = Nt(l) * r, d = Gt(l) * r, g = u + d, f = u - d;
      s = [new w(n.x - f, n.y - g), new w(o.x + g, o.y - f), new w(h.x + f, h.y + g), new w(c.x - g, c.y + f)];
    }
    return N.isPointInPolygon(e, s);
  }
  _checkTarget(t, e) {
    return !!(t && t.visible && t.evented && this._pointIsInObjectSelectionArea(t, Oe(e, void 0, this.viewportTransform)) && (!this.perPixelTargetFind && !t.perPixelTargetFind || t.isEditing || !this.isTargetTransparent(t, e.x, e.y)));
  }
  _searchPossibleTargets(t, e) {
    let s = t.length;
    for (; s--; ) {
      const i = t[s];
      if (this._checkTarget(i, e)) {
        if (ks(i) && i.subTargetCheck) {
          const r = this._searchPossibleTargets(i._objects, e);
          r && this.targets.push(r);
        }
        return i;
      }
    }
  }
  searchPossibleTargets(t, e) {
    const s = this._searchPossibleTargets(t, e);
    if (s && ks(s) && s.interactive && this.targets[0]) {
      const i = this.targets;
      for (let r = i.length - 1; r > 0; r--) {
        const n = i[r];
        if (!ks(n) || !n.interactive) return n;
      }
      return i[0];
    }
    return s;
  }
  getViewportPoint(t) {
    return this._pointer ? this._pointer : this.getPointer(t, !0);
  }
  getScenePoint(t) {
    return this._absolutePointer ? this._absolutePointer : this.getPointer(t);
  }
  getPointer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    const s = this.upperCanvasEl, i = s.getBoundingClientRect();
    let r = ho(t), n = i.width || 0, o = i.height || 0;
    n && o || (ht in i && mi in i && (o = Math.abs(i.top - i.bottom)), q in i && I in i && (n = Math.abs(i.right - i.left))), this.calcOffset(), r.x = r.x - this._offset.left, r.y = r.y - this._offset.top, e || (r = Oe(r, void 0, this.viewportTransform));
    const h = this.getRetinaScaling();
    h !== 1 && (r.x /= h, r.y /= h);
    const c = n === 0 || o === 0 ? new w(1, 1) : new w(s.width / n, s.height / o);
    return r.multiply(c);
  }
  _setDimensionsImpl(t, e) {
    this._resetTransformEventData(), super._setDimensionsImpl(t, e), this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
  }
  _createCacheCanvas() {
    this.pixelFindCanvasEl = St(), this.pixelFindContext = this.pixelFindCanvasEl.getContext("2d", { willReadFrequently: !0 }), this.setTargetFindTolerance(this.targetFindTolerance);
  }
  getTopContext() {
    return this.elements.upper.ctx;
  }
  getSelectionContext() {
    return this.elements.upper.ctx;
  }
  getSelectionElement() {
    return this.elements.upper.el;
  }
  getActiveObject() {
    return this._activeObject;
  }
  getActiveObjects() {
    const t = this._activeObject;
    return ne(t) ? t.getObjects() : t ? [t] : [];
  }
  _fireSelectionEvents(t, e) {
    let s = !1, i = !1;
    const r = this.getActiveObjects(), n = [], o = [];
    t.forEach((h) => {
      r.includes(h) || (s = !0, h.fire("deselected", { e, target: h }), o.push(h));
    }), r.forEach((h) => {
      t.includes(h) || (s = !0, h.fire("selected", { e, target: h }), n.push(h));
    }), t.length > 0 && r.length > 0 ? (i = !0, s && this.fire("selection:updated", { e, selected: n, deselected: o })) : r.length > 0 ? (i = !0, this.fire("selection:created", { e, selected: n })) : t.length > 0 && (i = !0, this.fire("selection:cleared", { e, deselected: o })), i && (this._objectsToRender = void 0);
  }
  setActiveObject(t, e) {
    const s = this.getActiveObjects(), i = this._setActiveObject(t, e);
    return this._fireSelectionEvents(s, e), i;
  }
  _setActiveObject(t, e) {
    const s = this._activeObject;
    return s !== t && !(!this._discardActiveObject(e, t) && this._activeObject) && !t.onSelect({ e }) && (this._activeObject = t, ne(t) && s !== t && t.set("canvas", this), t.setCoords(), !0);
  }
  _discardActiveObject(t, e) {
    const s = this._activeObject;
    return !!s && !s.onDeselect({ e: t, object: e }) && (this._currentTransform && this._currentTransform.target === s && this.endCurrentTransform(t), ne(s) && s === this._hoveredTarget && (this._hoveredTarget = void 0), this._activeObject = void 0, !0);
  }
  discardActiveObject(t) {
    const e = this.getActiveObjects(), s = this.getActiveObject();
    e.length && this.fire("before:selection:cleared", { e: t, deselected: [s] });
    const i = this._discardActiveObject(t);
    return this._fireSelectionEvents(e, t), i;
  }
  endCurrentTransform(t) {
    const e = this._currentTransform;
    this._finalizeCurrentTransform(t), e && e.target && (e.target.isMoving = !1), this._currentTransform = null;
  }
  _finalizeCurrentTransform(t) {
    const e = this._currentTransform, s = e.target, i = { e: t, target: s, transform: e, action: e.action };
    s._scaling && (s._scaling = !1), s.setCoords(), e.actionPerformed && (this.fire("object:modified", i), s.fire(Ps, i));
  }
  setViewportTransform(t) {
    super.setViewportTransform(t);
    const e = this._activeObject;
    e && e.setCoords();
  }
  destroy() {
    const t = this._activeObject;
    ne(t) && (t.removeAll(), t.dispose()), delete this._activeObject, super.destroy(), this.pixelFindContext = null, this.pixelFindCanvasEl = void 0;
  }
  clear() {
    this.discardActiveObject(), this._activeObject = void 0, this.clearContext(this.contextTop), super.clear();
  }
  drawControls(t) {
    const e = this._activeObject;
    e && e._renderControls(t);
  }
  _toObject(t, e, s) {
    const i = this._realizeGroupTransformOnObject(t), r = super._toObject(t, e, s);
    return t.set(i), r;
  }
  _realizeGroupTransformOnObject(t) {
    const { group: e } = t;
    if (e && ne(e) && this._activeObject === e) {
      const s = Re(t, ["angle", "flipX", "flipY", I, ut, _t, De, Ae, ht]);
      return lo(t, e.calcOwnMatrix()), s;
    }
    return {};
  }
  _setSVGObject(t, e, s) {
    const i = this._realizeGroupTransformOnObject(e);
    super._setSVGObject(t, e, s), e.set(i);
  }
}
m(Qs, "ownDefaults", { uniformScaling: !0, uniScaleKey: "shiftKey", centeredScaling: !1, centeredRotation: !1, centeredKey: "altKey", altActionKey: "shiftKey", selection: !0, selectionKey: "shiftKey", selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, selectionFullyContained: !1, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", notAllowedCursor: "not-allowed", perPixelTargetFind: !1, targetFindTolerance: 0, skipTargetFind: !1, stopContextMenu: !1, fireRightClick: !1, fireMiddleClick: !1, enablePointerEvents: !1, containerClass: "canvas-container", preserveObjectStacking: !1 });
class Ua {
  constructor(t) {
    m(this, "targets", []), m(this, "__disposer", void 0);
    const e = () => {
      const { hiddenTextarea: i } = t.getActiveObject() || {};
      i && i.focus();
    }, s = t.upperCanvasEl;
    s.addEventListener("click", e), this.__disposer = () => s.removeEventListener("click", e);
  }
  exitTextEditing() {
    this.target = void 0, this.targets.forEach((t) => {
      t.isEditing && t.exitEditing();
    });
  }
  add(t) {
    this.targets.push(t);
  }
  remove(t) {
    this.unregister(t), we(this.targets, t);
  }
  register(t) {
    this.target = t;
  }
  unregister(t) {
    t === this.target && (this.target = void 0);
  }
  onMouseMove(t) {
    var e;
    !((e = this.target) === null || e === void 0) && e.isEditing && this.target.updateSelectionOnMouseMove(t);
  }
  clear() {
    this.targets = [], this.target = void 0;
  }
  dispose() {
    this.clear(), this.__disposer(), delete this.__disposer;
  }
}
const qa = ["target", "oldTarget", "fireCanvas", "e"], gt = { passive: !1 }, ve = (a, t) => {
  const e = a.getViewportPoint(t), s = a.getScenePoint(t);
  return { viewportPoint: e, scenePoint: s, pointer: e, absolutePointer: s };
}, Jt = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return a.addEventListener(...e);
}, xt = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return a.removeEventListener(...e);
}, Ka = { mouse: { in: "over", out: "out", targetIn: "mouseover", targetOut: "mouseout", canvasIn: "mouse:over", canvasOut: "mouse:out" }, drag: { in: "enter", out: "leave", targetIn: "dragenter", targetOut: "dragleave", canvasIn: "drag:enter", canvasOut: "drag:leave" } };
class Ei extends Qs {
  constructor(t) {
    super(t, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), m(this, "_isClick", void 0), m(this, "textEditingManager", new Ua(this)), ["_onMouseDown", "_onTouchStart", "_onMouseMove", "_onMouseUp", "_onTouchEnd", "_onResize", "_onMouseWheel", "_onMouseOut", "_onMouseEnter", "_onContextMenu", "_onDoubleClick", "_onDragStart", "_onDragEnd", "_onDragProgress", "_onDragOver", "_onDragEnter", "_onDragLeave", "_onDrop"].forEach((e) => {
      this[e] = this[e].bind(this);
    }), this.addOrRemove(Jt, "add");
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? "pointer" : "mouse";
  }
  addOrRemove(t, e) {
    const s = this.upperCanvasEl, i = this._getEventPrefix();
    t(Jr(s), "resize", this._onResize), t(s, i + "down", this._onMouseDown), t(s, "".concat(i, "move"), this._onMouseMove, gt), t(s, "".concat(i, "out"), this._onMouseOut), t(s, "".concat(i, "enter"), this._onMouseEnter), t(s, "wheel", this._onMouseWheel), t(s, "contextmenu", this._onContextMenu), t(s, "dblclick", this._onDoubleClick), t(s, "dragstart", this._onDragStart), t(s, "dragend", this._onDragEnd), t(s, "dragover", this._onDragOver), t(s, "dragenter", this._onDragEnter), t(s, "dragleave", this._onDragLeave), t(s, "drop", this._onDrop), this.enablePointerEvents || t(s, "touchstart", this._onTouchStart, gt);
  }
  removeListeners() {
    this.addOrRemove(xt, "remove");
    const t = this._getEventPrefix(), e = Mt(this.upperCanvasEl);
    xt(e, "".concat(t, "up"), this._onMouseUp), xt(e, "touchend", this._onTouchEnd, gt), xt(e, "".concat(t, "move"), this._onMouseMove, gt), xt(e, "touchmove", this._onMouseMove, gt), clearTimeout(this._willAddMouseDown);
  }
  _onMouseWheel(t) {
    this.__onMouseWheel(t);
  }
  _onMouseOut(t) {
    const e = this._hoveredTarget, s = y({ e: t }, ve(this, t));
    this.fire("mouse:out", y(y({}, s), {}, { target: e })), this._hoveredTarget = void 0, e && e.fire("mouseout", y({}, s)), this._hoveredTargets.forEach((i) => {
      this.fire("mouse:out", y(y({}, s), {}, { target: i })), i && i.fire("mouseout", y({}, s));
    }), this._hoveredTargets = [];
  }
  _onMouseEnter(t) {
    this._currentTransform || this.findTarget(t) || (this.fire("mouse:over", y({ e: t }, ve(this, t))), this._hoveredTarget = void 0, this._hoveredTargets = []);
  }
  _onDragStart(t) {
    this._isClick = !1;
    const e = this.getActiveObject();
    if (e && e.onDragStart(t)) {
      this._dragSource = e;
      const s = { e: t, target: e };
      return this.fire("dragstart", s), e.fire("dragstart", s), void Jt(this.upperCanvasEl, "drag", this._onDragProgress);
    }
    xi(t);
  }
  _renderDragEffects(t, e, s) {
    let i = !1;
    const r = this._dropTarget;
    r && r !== e && r !== s && (r.clearContextTop(), i = !0), e == null || e.clearContextTop(), s !== e && (s == null || s.clearContextTop());
    const n = this.contextTop;
    n.save(), n.transform(...this.viewportTransform), e && (n.save(), e.transform(n), e.renderDragSourceEffect(t), n.restore(), i = !0), s && (n.save(), s.transform(n), s.renderDropTargetEffect(t), n.restore(), i = !0), n.restore(), i && (this.contextTopDirty = !0);
  }
  _onDragEnd(t) {
    const e = !!t.dataTransfer && t.dataTransfer.dropEffect !== ct, s = e ? this._activeObject : void 0, i = { e: t, target: this._dragSource, subTargets: this.targets, dragSource: this._dragSource, didDrop: e, dropTarget: s };
    xt(this.upperCanvasEl, "drag", this._onDragProgress), this.fire("dragend", i), this._dragSource && this._dragSource.fire("dragend", i), delete this._dragSource, this._onMouseUp(t);
  }
  _onDragProgress(t) {
    const e = { e: t, target: this._dragSource, dragSource: this._dragSource, dropTarget: this._draggedoverTarget };
    this.fire("drag", e), this._dragSource && this._dragSource.fire("drag", e);
  }
  findDragTargets(t) {
    return this.targets = [], { target: this._searchPossibleTargets(this._objects, this.getViewportPoint(t)), targets: [...this.targets] };
  }
  _onDragOver(t) {
    const e = "dragover", { target: s, targets: i } = this.findDragTargets(t), r = this._dragSource, n = { e: t, target: s, subTargets: i, dragSource: r, canDrop: !1, dropTarget: void 0 };
    let o;
    this.fire(e, n), this._fireEnterLeaveEvents(s, n), s && (s.canDrop(t) && (o = s), s.fire(e, n));
    for (let h = 0; h < i.length; h++) {
      const c = i[h];
      c.canDrop(t) && (o = c), c.fire(e, n);
    }
    this._renderDragEffects(t, r, o), this._dropTarget = o;
  }
  _onDragEnter(t) {
    const { target: e, targets: s } = this.findDragTargets(t), i = { e: t, target: e, subTargets: s, dragSource: this._dragSource };
    this.fire("dragenter", i), this._fireEnterLeaveEvents(e, i);
  }
  _onDragLeave(t) {
    const e = { e: t, target: this._draggedoverTarget, subTargets: this.targets, dragSource: this._dragSource };
    this.fire("dragleave", e), this._fireEnterLeaveEvents(void 0, e), this._renderDragEffects(t, this._dragSource), this._dropTarget = void 0, this.targets = [], this._hoveredTargets = [];
  }
  _onDrop(t) {
    const { target: e, targets: s } = this.findDragTargets(t), i = this._basicEventHandler("drop:before", y({ e: t, target: e, subTargets: s, dragSource: this._dragSource }, ve(this, t)));
    i.didDrop = !1, i.dropTarget = void 0, this._basicEventHandler("drop", i), this.fire("drop:after", i);
  }
  _onContextMenu(t) {
    const e = this.findTarget(t), s = this.targets || [], i = this._basicEventHandler("contextmenu:before", { e: t, target: e, subTargets: s });
    return this.stopContextMenu && xi(t), this._basicEventHandler("contextmenu", i), !1;
  }
  _onDoubleClick(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "dblclick"), this._resetTransformEventData();
  }
  getPointerId(t) {
    const e = t.changedTouches;
    return e ? e[0] && e[0].identifier : this.enablePointerEvents ? t.pointerId : -1;
  }
  _isMainEvent(t) {
    return t.isPrimary === !0 || t.isPrimary !== !1 && (t.type === "touchend" && t.touches.length === 0 || !t.changedTouches || t.changedTouches[0].identifier === this.mainTouchId);
  }
  _onTouchStart(t) {
    let e = !this.allowTouchScrolling;
    const s = this._activeObject;
    this.mainTouchId === void 0 && (this.mainTouchId = this.getPointerId(t)), this.__onMouseDown(t), (this.isDrawingMode || s && this._target === s) && (e = !0), e && t.preventDefault(), this._resetTransformEventData();
    const i = this.upperCanvasEl, r = this._getEventPrefix(), n = Mt(i);
    Jt(n, "touchend", this._onTouchEnd, gt), e && Jt(n, "touchmove", this._onMouseMove, gt), xt(i, "".concat(r, "down"), this._onMouseDown);
  }
  _onMouseDown(t) {
    this.__onMouseDown(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    xt(e, "".concat(s, "move"), this._onMouseMove, gt);
    const i = Mt(e);
    Jt(i, "".concat(s, "up"), this._onMouseUp), Jt(i, "".concat(s, "move"), this._onMouseMove, gt);
  }
  _onTouchEnd(t) {
    if (t.touches.length > 0) return;
    this.__onMouseUp(t), this._resetTransformEventData(), delete this.mainTouchId;
    const e = this._getEventPrefix(), s = Mt(this.upperCanvasEl);
    xt(s, "touchend", this._onTouchEnd, gt), xt(s, "touchmove", this._onMouseMove, gt), this._willAddMouseDown && clearTimeout(this._willAddMouseDown), this._willAddMouseDown = setTimeout(() => {
      Jt(this.upperCanvasEl, "".concat(e, "down"), this._onMouseDown), this._willAddMouseDown = 0;
    }, 400);
  }
  _onMouseUp(t) {
    this.__onMouseUp(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    if (this._isMainEvent(t)) {
      const i = Mt(this.upperCanvasEl);
      xt(i, "".concat(s, "up"), this._onMouseUp), xt(i, "".concat(s, "move"), this._onMouseMove, gt), Jt(e, "".concat(s, "move"), this._onMouseMove, gt);
    }
  }
  _onMouseMove(t) {
    const e = this.getActiveObject();
    !this.allowTouchScrolling && (!e || !e.shouldStartDragging(t)) && t.preventDefault && t.preventDefault(), this.__onMouseMove(t);
  }
  _onResize() {
    this.calcOffset(), this._resetTransformEventData();
  }
  _shouldRender(t) {
    const e = this.getActiveObject();
    return !!e != !!t || e && t && e !== t;
  }
  __onMouseUp(t) {
    var e;
    this._cacheTransformEventData(t), this._handleEvent(t, "up:before");
    const s = this._currentTransform, i = this._isClick, r = this._target, { button: n } = t;
    if (n) return (this.fireMiddleClick && n === 1 || this.fireRightClick && n === 2) && this._handleEvent(t, "up"), void this._resetTransformEventData();
    if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    let o, h, c = !1;
    if (s && (this._finalizeCurrentTransform(t), c = s.actionPerformed), !i) {
      const l = r === this._activeObject;
      this.handleSelection(t), c || (c = this._shouldRender(r) || !l && r === this._activeObject);
    }
    if (r) {
      const l = r.findControl(this.getViewportPoint(t), yi(t)), { key: u, control: d } = l || {};
      if (h = u, r.selectable && r !== this._activeObject && r.activeOn === "up") this.setActiveObject(r, t), c = !0;
      else if (d) {
        const g = d.getMouseUpHandler(t, r, d);
        g && (o = this.getScenePoint(t), g.call(d, t, s, o.x, o.y));
      }
      r.isMoving = !1;
    }
    if (s && (s.target !== r || s.corner !== h)) {
      const l = s.target && s.target.controls[s.corner], u = l && l.getMouseUpHandler(t, s.target, l);
      o = o || this.getScenePoint(t), u && u.call(l, t, s, o.x, o.y);
    }
    this._setCursorFromEvent(t, r), this._handleEvent(t, "up"), this._groupSelector = null, this._currentTransform = null, r && (r.__corner = void 0), c ? this.requestRenderAll() : i || (e = this._activeObject) !== null && e !== void 0 && e.isEditing || this.renderTop();
  }
  _basicEventHandler(t, e) {
    const { target: s, subTargets: i = [] } = e;
    this.fire(t, e), s && s.fire(t, e);
    for (let r = 0; r < i.length; r++) i[r] !== s && i[r].fire(t, e);
    return e;
  }
  _handleEvent(t, e) {
    const s = this._target, i = this.targets || [], r = y(y({ e: t, target: s, subTargets: i }, ve(this, t)), {}, { transform: this._currentTransform }, e === "up:before" || e === "up" ? { isClick: this._isClick, currentTarget: this.findTarget(t), currentSubTargets: this.targets } : {});
    this.fire("mouse:".concat(e), r), s && s.fire("mouse".concat(e), r);
    for (let n = 0; n < i.length; n++) i[n] !== s && i[n].fire("mouse".concat(e), r);
  }
  _onMouseDownInDrawingMode(t) {
    this._isCurrentlyDrawing = !0, this.getActiveObject() && (this.discardActiveObject(t), this.requestRenderAll());
    const e = this.getScenePoint(t);
    this.freeDrawingBrush && this.freeDrawingBrush.onMouseDown(e, { e: t, pointer: e }), this._handleEvent(t, "down");
  }
  _onMouseMoveInDrawingMode(t) {
    if (this._isCurrentlyDrawing) {
      const e = this.getScenePoint(t);
      this.freeDrawingBrush && this.freeDrawingBrush.onMouseMove(e, { e: t, pointer: e });
    }
    this.setCursor(this.freeDrawingCursor), this._handleEvent(t, "move");
  }
  _onMouseUpInDrawingMode(t) {
    const e = this.getScenePoint(t);
    this.freeDrawingBrush ? this._isCurrentlyDrawing = !!this.freeDrawingBrush.onMouseUp({ e: t, pointer: e }) : this._isCurrentlyDrawing = !1, this._handleEvent(t, "up");
  }
  __onMouseDown(t) {
    this._isClick = !0, this._cacheTransformEventData(t), this._handleEvent(t, "down:before");
    let e = this._target;
    const { button: s } = t;
    if (s) return (this.fireMiddleClick && s === 1 || this.fireRightClick && s === 2) && this._handleEvent(t, "down"), void this._resetTransformEventData();
    if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t);
    if (!this._isMainEvent(t) || this._currentTransform) return;
    let i = this._shouldRender(e), r = !1;
    if (this.handleMultiSelection(t, e) ? (e = this._activeObject, r = !0, i = !0) : this._shouldClearSelection(t, e) && this.discardActiveObject(t), this.selection && (!e || !e.selectable && !e.isEditing && e !== this._activeObject)) {
      const n = this.getScenePoint(t);
      this._groupSelector = { x: n.x, y: n.y, deltaY: 0, deltaX: 0 };
    }
    if (e) {
      const n = e === this._activeObject;
      e.selectable && e.activeOn === "down" && this.setActiveObject(e, t);
      const o = e.findControl(this.getViewportPoint(t), yi(t));
      if (e === this._activeObject && (o || !r)) {
        this._setupCurrentTransform(t, e, n);
        const h = o ? o.control : void 0, c = this.getScenePoint(t), l = h && h.getMouseDownHandler(t, e, h);
        l && l.call(h, t, this._currentTransform, c.x, c.y);
      }
    }
    i && (this._objectsToRender = void 0), this._handleEvent(t, "down"), i && this.requestRenderAll();
  }
  _resetTransformEventData() {
    this._target = void 0, this._pointer = void 0, this._absolutePointer = void 0;
  }
  _cacheTransformEventData(t) {
    this._resetTransformEventData(), this._pointer = this.getViewportPoint(t), this._absolutePointer = Oe(this._pointer, void 0, this.viewportTransform), this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t);
  }
  __onMouseMove(t) {
    if (this._isClick = !1, this._cacheTransformEventData(t), this._handleEvent(t, "move:before"), this.isDrawingMode) return void this._onMouseMoveInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    const e = this._groupSelector;
    if (e) {
      const s = this.getScenePoint(t);
      e.deltaX = s.x - e.x, e.deltaY = s.y - e.y, this.renderTop();
    } else if (this._currentTransform) this._transformObject(t);
    else {
      const s = this.findTarget(t);
      this._setCursorFromEvent(t, s), this._fireOverOutEvents(t, s);
    }
    this.textEditingManager.onMouseMove(t), this._handleEvent(t, "move"), this._resetTransformEventData();
  }
  _fireOverOutEvents(t, e) {
    const s = this._hoveredTarget, i = this._hoveredTargets, r = this.targets, n = Math.max(i.length, r.length);
    this.fireSyntheticInOutEvents("mouse", { e: t, target: e, oldTarget: s, fireCanvas: !0 });
    for (let o = 0; o < n; o++) this.fireSyntheticInOutEvents("mouse", { e: t, target: r[o], oldTarget: i[o] });
    this._hoveredTarget = e, this._hoveredTargets = this.targets.concat();
  }
  _fireEnterLeaveEvents(t, e) {
    const s = this._draggedoverTarget, i = this._hoveredTargets, r = this.targets, n = Math.max(i.length, r.length);
    this.fireSyntheticInOutEvents("drag", y(y({}, e), {}, { target: t, oldTarget: s, fireCanvas: !0 }));
    for (let o = 0; o < n; o++) this.fireSyntheticInOutEvents("drag", y(y({}, e), {}, { target: r[o], oldTarget: i[o] }));
    this._draggedoverTarget = t;
  }
  fireSyntheticInOutEvents(t, e) {
    let { target: s, oldTarget: i, fireCanvas: r, e: n } = e, o = V(e, qa);
    const { targetIn: h, targetOut: c, canvasIn: l, canvasOut: u } = Ka[t], d = i !== s;
    if (i && d) {
      const g = y(y({}, o), {}, { e: n, target: i, nextTarget: s }, ve(this, n));
      r && this.fire(u, g), i.fire(c, g);
    }
    if (s && d) {
      const g = y(y({}, o), {}, { e: n, target: s, previousTarget: i }, ve(this, n));
      r && this.fire(l, g), s.fire(h, g);
    }
  }
  __onMouseWheel(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "wheel"), this._resetTransformEventData();
  }
  _transformObject(t) {
    const e = this.getScenePoint(t), s = this._currentTransform, i = s.target, r = i.group ? Oe(e, void 0, i.group.calcTransformMatrix()) : e;
    s.shiftKey = t.shiftKey, s.altKey = !!this.centeredKey && t[this.centeredKey], this._performTransformAction(t, s, r), s.actionPerformed && this.requestRenderAll();
  }
  _performTransformAction(t, e, s) {
    const { action: i, actionHandler: r, target: n } = e, o = !!r && r(t, e, s.x, s.y);
    o && n.setCoords(), i === "drag" && o && (e.target.isMoving = !0, this.setCursor(e.target.moveCursor || this.moveCursor)), e.actionPerformed = e.actionPerformed || o;
  }
  _setCursorFromEvent(t, e) {
    if (!e) return void this.setCursor(this.defaultCursor);
    let s = e.hoverCursor || this.hoverCursor;
    const i = ne(this._activeObject) ? this._activeObject : null, r = (!i || e.group !== i) && e.findControl(this.getViewportPoint(t));
    if (r) {
      const n = r.control;
      this.setCursor(n.cursorStyleHandler(t, n, e));
    } else e.subTargetCheck && this.targets.concat().reverse().map((n) => {
      s = n.hoverCursor || s;
    }), this.setCursor(s);
  }
  handleMultiSelection(t, e) {
    const s = this._activeObject, i = ne(s);
    if (s && this._isSelectionKeyPressed(t) && this.selection && e && e.selectable && (s !== e || i) && (i || !e.isDescendantOf(s) && !s.isDescendantOf(e)) && !e.onSelect({ e: t }) && !s.getActiveControl()) {
      if (i) {
        const r = s.getObjects();
        if (e === s) {
          const n = this.getViewportPoint(t);
          if (!(e = this.searchPossibleTargets(r, n) || this.searchPossibleTargets(this._objects, n)) || !e.selectable) return !1;
        }
        e.group === s ? (s.remove(e), this._hoveredTarget = e, this._hoveredTargets = [...this.targets], s.size() === 1 && this._setActiveObject(s.item(0), t)) : (s.multiSelectAdd(e), this._hoveredTarget = s, this._hoveredTargets = [...this.targets]), this._fireSelectionEvents(r, t);
      } else {
        s.isEditing && s.exitEditing();
        const r = new (T.getClass("ActiveSelection"))([], { canvas: this });
        r.multiSelectAdd(s, e), this._hoveredTarget = r, this._setActiveObject(r, t), this._fireSelectionEvents([s], t);
      }
      return !0;
    }
    return !1;
  }
  handleSelection(t) {
    if (!this.selection || !this._groupSelector) return !1;
    const { x: e, y: s, deltaX: i, deltaY: r } = this._groupSelector, n = new w(e, s), o = n.add(new w(i, r)), h = n.min(o), c = n.max(o).subtract(h), l = this.collectObjects({ left: h.x, top: h.y, width: c.x, height: c.y }, { includeIntersecting: !this.selectionFullyContained }), u = n.eq(o) ? l[0] ? [l[0]] : [] : l.length > 1 ? l.filter((d) => !d.onSelect({ e: t })).reverse() : l;
    if (u.length === 1) this.setActiveObject(u[0], t);
    else if (u.length > 1) {
      const d = T.getClass("ActiveSelection");
      this.setActiveObject(new d(u, { canvas: this }), t);
    }
    return this._groupSelector = null, !0;
  }
  clear() {
    this.textEditingManager.clear(), super.clear();
  }
  destroy() {
    this.removeListeners(), this.textEditingManager.dispose(), super.destroy();
  }
}
const Tn = { x1: 0, y1: 0, x2: 0, y2: 0 }, Ja = y(y({}, Tn), {}, { r1: 0, r2: 0 }), Ce = (a, t) => isNaN(a) && typeof t == "number" ? t : a, Za = /^(\d+\.\d+)%|(\d+)%$/;
function On(a) {
  return a && Za.test(a);
}
function En(a, t) {
  const e = typeof a == "number" ? a : typeof a == "string" ? parseFloat(a) / (On(a) ? 100 : 1) : NaN;
  return ke(0, Ce(e, t), 1);
}
const $a = /\s*;\s*/, Qa = /\s*:\s*/;
function th(a, t) {
  let e, s;
  const i = a.getAttribute("style");
  if (i) {
    const n = i.split($a);
    n[n.length - 1] === "" && n.pop();
    for (let o = n.length; o--; ) {
      const [h, c] = n[o].split(Qa).map((l) => l.trim());
      h === "stop-color" ? e = c : h === "stop-opacity" && (s = c);
    }
  }
  const r = new z(e || a.getAttribute("stop-color") || "rgb(0,0,0)");
  return { offset: En(a.getAttribute("offset"), 0), color: r.toRgb(), opacity: Ce(parseFloat(s || a.getAttribute("stop-opacity") || ""), 1) * r.getAlpha() * t };
}
function eh(a, t) {
  const e = [], s = a.getElementsByTagName("stop"), i = En(t, 1);
  for (let r = s.length; r--; ) e.push(th(s[r], i));
  return e;
}
function kn(a) {
  return a.nodeName === "linearGradient" || a.nodeName === "LINEARGRADIENT" ? "linear" : "radial";
}
function Mn(a) {
  return a.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage";
}
function Ot(a, t) {
  return a.getAttribute(t);
}
function sh(a, t) {
  return function(e, s) {
    let i, { width: r, height: n, gradientUnits: o } = s;
    return Object.keys(e).reduce((h, c) => {
      const l = e[c];
      return l === "Infinity" ? i = 1 : l === "-Infinity" ? i = 0 : (i = typeof l == "string" ? parseFloat(l) : l, typeof l == "string" && On(l) && (i *= 0.01, o === "pixels" && (c !== "x1" && c !== "x2" && c !== "r2" || (i *= r), c !== "y1" && c !== "y2" || (i *= n)))), h[c] = i, h;
    }, {});
  }(kn(a) === "linear" ? function(e) {
    return { x1: Ot(e, "x1") || 0, y1: Ot(e, "y1") || 0, x2: Ot(e, "x2") || "100%", y2: Ot(e, "y2") || 0 };
  }(a) : function(e) {
    return { x1: Ot(e, "fx") || Ot(e, "cx") || "50%", y1: Ot(e, "fy") || Ot(e, "cy") || "50%", r1: 0, x2: Ot(e, "cx") || "50%", y2: Ot(e, "cy") || "50%", r2: Ot(e, "r") || "50%" };
  }(a), y(y({}, t), {}, { gradientUnits: Mn(a) }));
}
class is {
  constructor(t) {
    const { type: e = "linear", gradientUnits: s = "pixels", coords: i = {}, colorStops: r = [], offsetX: n = 0, offsetY: o = 0, gradientTransform: h, id: c } = t || {};
    Object.assign(this, { type: e, gradientUnits: s, coords: y(y({}, e === "radial" ? Ja : Tn), i), colorStops: r, offsetX: n, offsetY: o, gradientTransform: h, id: c ? "".concat(c, "_").concat(Qt()) : Qt() });
  }
  addColorStop(t) {
    for (const e in t) {
      const s = new z(t[e]);
      this.colorStops.push({ offset: parseFloat(e), color: s.toRgb(), opacity: s.getAlpha() });
    }
    return this;
  }
  toObject(t) {
    return y(y({}, Re(this, t)), {}, { type: this.type, coords: y({}, this.coords), colorStops: this.colorStops.map((e) => y({}, e)), offsetX: this.offsetX, offsetY: this.offsetY, gradientUnits: this.gradientUnits, gradientTransform: this.gradientTransform ? [...this.gradientTransform] : void 0 });
  }
  toSVG(t) {
    let { additionalTransform: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = [], i = this.gradientTransform ? this.gradientTransform.concat() : ot.concat(), r = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox", n = this.colorStops.map((u) => y({}, u)).sort((u, d) => u.offset - d.offset);
    let o = -this.offsetX, h = -this.offsetY;
    var c;
    r === "objectBoundingBox" ? (o /= t.width, h /= t.height) : (o += t.width / 2, h += t.height / 2), (c = t) && typeof c._renderPathCommands == "function" && this.gradientUnits !== "percentage" && (o -= t.pathOffset.x, h -= t.pathOffset.y), i[4] -= o, i[5] -= h;
    const l = ['id="SVGID_'.concat(this.id, '"'), 'gradientUnits="'.concat(r, '"'), 'gradientTransform="'.concat(e ? e + " " : "").concat(zs(i), '"'), ""].join(" ");
    if (this.type === "linear") {
      const { x1: u, y1: d, x2: g, y2: f } = this.coords;
      s.push("<linearGradient ", l, ' x1="', u, '" y1="', d, '" x2="', g, '" y2="', f, `">
`);
    } else if (this.type === "radial") {
      const { x1: u, y1: d, x2: g, y2: f, r1: v, r2: x } = this.coords, b = v > x;
      s.push("<radialGradient ", l, ' cx="', b ? u : g, '" cy="', b ? d : f, '" r="', b ? v : x, '" fx="', b ? g : u, '" fy="', b ? f : d, `">
`), b && (n.reverse(), n.forEach((_) => {
        _.offset = 1 - _.offset;
      }));
      const C = Math.min(v, x);
      if (C > 0) {
        const _ = C / Math.max(v, x);
        n.forEach((S) => {
          S.offset += _ * (1 - S.offset);
        });
      }
    }
    return n.forEach((u) => {
      let { color: d, offset: g, opacity: f } = u;
      s.push("<stop ", 'offset="', 100 * g + "%", '" style="stop-color:', d, f !== void 0 ? ";stop-opacity: " + f : ";", `"/>
`);
    }), s.push(this.type === "linear" ? "</linearGradient>" : "</radialGradient>", `
`), s.join("");
  }
  toLive(t) {
    const { x1: e, y1: s, x2: i, y2: r, r1: n, r2: o } = this.coords, h = this.type === "linear" ? t.createLinearGradient(e, s, i, r) : t.createRadialGradient(e, s, n, i, r, o);
    return this.colorStops.forEach((c) => {
      let { color: l, opacity: u, offset: d } = c;
      h.addColorStop(d, u !== void 0 ? new z(l).setAlpha(u).toRgba() : l);
    }), h;
  }
  static async fromObject(t) {
    const { colorStops: e, gradientTransform: s } = t;
    return new this(y(y({}, t), {}, { colorStops: e ? e.map((i) => y({}, i)) : void 0, gradientTransform: s ? [...s] : void 0 }));
  }
  static fromElement(t, e, s) {
    const i = Mn(t), r = e._findCenterFromElement();
    return new this(y({ id: t.getAttribute("id") || void 0, type: kn(t), coords: sh(t, { width: s.viewBoxWidth || s.width, height: s.viewBoxHeight || s.height }), colorStops: eh(t, s.opacity), gradientUnits: i, gradientTransform: _i(t.getAttribute("gradientTransform") || "") }, i === "pixels" ? { offsetX: e.width / 2 - r.x, offsetY: e.height / 2 - r.y } : { offsetX: 0, offsetY: 0 }));
  }
}
m(is, "type", "Gradient"), T.setClass(is, "gradient"), T.setClass(is, "linear"), T.setClass(is, "radial");
const ih = ["type", "source", "patternTransform"];
class Rs {
  get type() {
    return "pattern";
  }
  set type(t) {
    $t("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    m(this, "repeat", "repeat"), m(this, "offsetX", 0), m(this, "offsetY", 0), m(this, "crossOrigin", ""), this.id = Qt(), Object.assign(this, t);
  }
  isImageSource() {
    return !!this.source && typeof this.source.src == "string";
  }
  isCanvasSource() {
    return !!this.source && !!this.source.toDataURL;
  }
  sourceToString() {
    return this.isImageSource() ? this.source.src : this.isCanvasSource() ? this.source.toDataURL() : "";
  }
  toLive(t) {
    return this.source && (!this.isImageSource() || this.source.complete && this.source.naturalWidth !== 0 && this.source.naturalHeight !== 0) ? t.createPattern(this.source, this.repeat) : null;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const { repeat: e, crossOrigin: s } = this;
    return y(y({}, Re(this, t)), {}, { type: "pattern", source: this.sourceToString(), repeat: e, crossOrigin: s, offsetX: G(this.offsetX, j.NUM_FRACTION_DIGITS), offsetY: G(this.offsetY, j.NUM_FRACTION_DIGITS), patternTransform: this.patternTransform ? [...this.patternTransform] : null });
  }
  toSVG(t) {
    let { width: e, height: s } = t;
    const { source: i, repeat: r, id: n } = this, o = Ce(this.offsetX / e, 0), h = Ce(this.offsetY / s, 0), c = r === "repeat-y" || r === "no-repeat" ? 1 + Math.abs(o || 0) : Ce(i.width / e, 0), l = r === "repeat-x" || r === "no-repeat" ? 1 + Math.abs(h || 0) : Ce(i.height / s, 0);
    return ['<pattern id="SVGID_'.concat(n, '" x="').concat(o, '" y="').concat(h, '" width="').concat(c, '" height="').concat(l, '">'), '<image x="0" y="0" width="'.concat(i.width, '" height="').concat(i.height, '" xlink:href="').concat(this.sourceToString(), '"></image>'), "</pattern>", ""].join(`
`);
  }
  static async fromObject(t, e) {
    let { type: s, source: i, patternTransform: r } = t, n = V(t, ih);
    const o = await Ds(i, y(y({}, e), {}, { crossOrigin: n.crossOrigin }));
    return new this(y(y({}, n), {}, { patternTransform: r && r.slice(0), source: o }));
  }
}
m(Rs, "type", "Pattern"), T.setClass(Rs), T.setClass(Rs, "pattern");
class rh {
  constructor(t) {
    m(this, "color", "rgb(0, 0, 0)"), m(this, "width", 1), m(this, "shadow", null), m(this, "strokeLineCap", "round"), m(this, "strokeLineJoin", "round"), m(this, "strokeMiterLimit", 10), m(this, "strokeDashArray", null), m(this, "limitedToCanvasSize", !1), this.canvas = t;
  }
  _setBrushStyles(t) {
    t.strokeStyle = this.color, t.lineWidth = this.width, t.lineCap = this.strokeLineCap, t.miterLimit = this.strokeMiterLimit, t.lineJoin = this.strokeLineJoin, t.setLineDash(this.strokeDashArray || []);
  }
  _saveAndTransform(t) {
    const e = this.canvas.viewportTransform;
    t.save(), t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
  }
  needsFullRender() {
    return new z(this.color).getAlpha() < 1 || !!this.shadow;
  }
  _setShadow() {
    if (!this.shadow || !this.canvas) return;
    const t = this.canvas, e = this.shadow, s = t.contextTop, i = t.getZoom() * t.getRetinaScaling();
    s.shadowColor = e.color, s.shadowBlur = e.blur * i, s.shadowOffsetX = e.offsetX * i, s.shadowOffsetY = e.offsetY * i;
  }
  _resetShadow() {
    const t = this.canvas.contextTop;
    t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0;
  }
  _isOutSideCanvas(t) {
    return t.x < 0 || t.x > this.canvas.getWidth() || t.y < 0 || t.y > this.canvas.getHeight();
  }
}
const nh = ["path", "left", "top"], oh = ["d"];
class Yt extends it {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { path: s, left: i, top: r } = e, n = V(e, nh);
    super(), Object.assign(this, Yt.ownDefaults), this.setOptions(n), this._setPath(t || [], !0), typeof i == "number" && this.set(I, i), typeof r == "number" && this.set(ht, r);
  }
  _setPath(t, e) {
    this.path = Pa(Array.isArray(t) ? t : Va(t)), this.setBoundingBox(e);
  }
  _findCenterFromElement() {
    const t = this._calcBoundsFromPath();
    return new w(t.left + t.width / 2, t.top + t.height / 2);
  }
  _renderPathCommands(t) {
    const e = -this.pathOffset.x, s = -this.pathOffset.y;
    t.beginPath();
    for (const i of this.path) switch (i[0]) {
      case "L":
        t.lineTo(i[1] + e, i[2] + s);
        break;
      case "M":
        t.moveTo(i[1] + e, i[2] + s);
        break;
      case "C":
        t.bezierCurveTo(i[1] + e, i[2] + s, i[3] + e, i[4] + s, i[5] + e, i[6] + s);
        break;
      case "Q":
        t.quadraticCurveTo(i[1] + e, i[2] + s, i[3] + e, i[4] + s);
        break;
      case "Z":
        t.closePath();
    }
  }
  _render(t) {
    this._renderPathCommands(t), this._renderPaintInOrder(t);
  }
  toString() {
    return "#<Path (".concat(this.complexity(), '): { "top": ').concat(this.top, ', "left": ').concat(this.left, " }>");
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject(t)), {}, { path: this.path.map((e) => e.slice()) });
  }
  toDatalessObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.toObject(t);
    return this.sourcePath && (delete e.path, e.sourcePath = this.sourcePath), e;
  }
  _toSVG() {
    const t = Sn(this.path, j.NUM_FRACTION_DIGITS);
    return ["<path ", "COMMON_PARTS", 'd="'.concat(t, `" stroke-linecap="round" />
`)];
  }
  _getOffsetTransform() {
    const t = j.NUM_FRACTION_DIGITS;
    return " translate(".concat(G(-this.pathOffset.x, t), ", ").concat(G(-this.pathOffset.y, t), ")");
  }
  toClipPathSVG(t) {
    const e = this._getOffsetTransform();
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  toSVG(t) {
    const e = this._getOffsetTransform();
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  complexity() {
    return this.path.length;
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { width: e, height: s, pathOffset: i } = this._calcDimensions();
    this.set({ width: e, height: s, pathOffset: i }), t && this.setPositionByOrigin(i, R, R);
  }
  _calcBoundsFromPath() {
    const t = [];
    let e = 0, s = 0, i = 0, r = 0;
    for (const n of this.path) switch (n[0]) {
      case "L":
        i = n[1], r = n[2], t.push({ x: e, y: s }, { x: i, y: r });
        break;
      case "M":
        i = n[1], r = n[2], e = i, s = r;
        break;
      case "C":
        t.push(...Er(i, r, n[1], n[2], n[3], n[4], n[5], n[6])), i = n[5], r = n[6];
        break;
      case "Q":
        t.push(...Er(i, r, n[1], n[2], n[1], n[2], n[3], n[4])), i = n[3], r = n[4];
        break;
      case "Z":
        i = e, r = s;
    }
    return Vt(t);
  }
  _calcDimensions() {
    const t = this._calcBoundsFromPath();
    return y(y({}, t), {}, { pathOffset: new w(t.left + t.width / 2, t.top + t.height / 2) });
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "path" });
  }
  static async fromElement(t, e, s) {
    const i = qt(t, this.ATTRIBUTE_NAMES, s), { d: r } = i;
    return new this(r, y(y(y({}, V(i, oh)), e), {}, { left: void 0, top: void 0 }));
  }
}
m(Yt, "type", "Path"), m(Yt, "cacheProperties", [...Ut, "path", "fillRule"]), m(Yt, "ATTRIBUTE_NAMES", [...ee, "d"]), T.setClass(Yt), T.setSVGClass(Yt);
class Ke extends rh {
  constructor(t) {
    super(t), m(this, "decimate", 0.4), m(this, "drawStraightLine", !1), m(this, "straightLineKey", "shiftKey"), this._points = [], this._hasStraightLine = !1;
  }
  needsFullRender() {
    return super.needsFullRender() || this._hasStraightLine;
  }
  static drawSegment(t, e, s) {
    const i = e.midPointFrom(s);
    return t.quadraticCurveTo(e.x, e.y, i.x, i.y), i;
  }
  onMouseDown(t, e) {
    let { e: s } = e;
    this.canvas._isMainEvent(s) && (this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey], this._prepareForDrawing(t), this._addPoint(t), this._render());
  }
  onMouseMove(t, e) {
    let { e: s } = e;
    if (this.canvas._isMainEvent(s) && (this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey], (this.limitedToCanvasSize !== !0 || !this._isOutSideCanvas(t)) && this._addPoint(t) && this._points.length > 1)) if (this.needsFullRender()) this.canvas.clearContext(this.canvas.contextTop), this._render();
    else {
      const i = this._points, r = i.length, n = this.canvas.contextTop;
      this._saveAndTransform(n), this.oldEnd && (n.beginPath(), n.moveTo(this.oldEnd.x, this.oldEnd.y)), this.oldEnd = Ke.drawSegment(n, i[r - 2], i[r - 1]), n.stroke(), n.restore();
    }
  }
  onMouseUp(t) {
    let { e } = t;
    return !this.canvas._isMainEvent(e) || (this.drawStraightLine = !1, this.oldEnd = void 0, this._finalizeAndAddPath(), !1);
  }
  _prepareForDrawing(t) {
    this._reset(), this._addPoint(t), this.canvas.contextTop.moveTo(t.x, t.y);
  }
  _addPoint(t) {
    return !(this._points.length > 1 && t.eq(this._points[this._points.length - 1])) && (this.drawStraightLine && this._points.length > 1 && (this._hasStraightLine = !0, this._points.pop()), this._points.push(t), !0);
  }
  _reset() {
    this._points = [], this._setBrushStyles(this.canvas.contextTop), this._setShadow(), this._hasStraightLine = !1;
  }
  _render() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.canvas.contextTop, e = this._points[0], s = this._points[1];
    if (this._saveAndTransform(t), t.beginPath(), this._points.length === 2 && e.x === s.x && e.y === s.y) {
      const i = this.width / 1e3;
      e.x -= i, s.x += i;
    }
    t.moveTo(e.x, e.y);
    for (let i = 1; i < this._points.length; i++) Ke.drawSegment(t, e, s), e = this._points[i], s = this._points[i + 1];
    t.lineTo(e.x, e.y), t.stroke(), t.restore();
  }
  convertPointsToSVGPath(t) {
    const e = this.width / 1e3;
    return Na(t, e);
  }
  createPath(t) {
    const e = new Yt(t, { fill: null, stroke: this.color, strokeWidth: this.width, strokeLineCap: this.strokeLineCap, strokeMiterLimit: this.strokeMiterLimit, strokeLineJoin: this.strokeLineJoin, strokeDashArray: this.strokeDashArray });
    return this.shadow && (this.shadow.affectStroke = !0, e.shadow = new Ct(this.shadow)), e;
  }
  decimatePoints(t, e) {
    if (t.length <= 2) return t;
    let s, i = t[0];
    const r = this.canvas.getZoom(), n = Math.pow(e / r, 2), o = t.length - 1, h = [i];
    for (let c = 1; c < o - 1; c++) s = Math.pow(i.x - t[c].x, 2) + Math.pow(i.y - t[c].y, 2), s >= n && (i = t[c], h.push(i));
    return h.push(t[o]), h;
  }
  _finalizeAndAddPath() {
    this.canvas.contextTop.closePath(), this.decimate && (this._points = this.decimatePoints(this._points, this.decimate));
    const t = this.convertPointsToSVGPath(this._points);
    if (function(s) {
      return Sn(s) === "M 0 0 Q 0 0 0 0 L 0 0";
    }(t)) return void this.canvas.requestRenderAll();
    const e = this.createPath(t);
    this.canvas.clearContext(this.canvas.contextTop), this.canvas.fire("before:path:created", { path: e }), this.canvas.add(e), this.canvas.requestRenderAll(), e.setCoords(), this._resetShadow(), this.canvas.fire("path:created", { path: e });
  }
}
const ah = ["left", "top", "radius"], Dn = ["radius", "startAngle", "endAngle", "counterClockwise"];
class Xt extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), Xt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Xt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    return super._set(t, e), t === "radius" && this.setRadius(e), this;
  }
  _render(t) {
    t.beginPath(), t.arc(0, 0, this.radius, K(this.startAngle), K(this.endAngle), this.counterClockwise), this._renderPaintInOrder(t);
  }
  getRadiusX() {
    return this.get("radius") * this.get(ut);
  }
  getRadiusY() {
    return this.get("radius") * this.get(_t);
  }
  setRadius(t) {
    this.radius = t, this.set({ width: 2 * t, height: 2 * t });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Dn, ...t]);
  }
  _toSVG() {
    const t = (this.endAngle - this.startAngle) % 360;
    if (t === 0) return ["<circle ", "COMMON_PARTS", 'cx="0" cy="0" ', 'r="', "".concat(this.radius), `" />
`];
    {
      const { radius: e } = this, s = K(this.startAngle), i = K(this.endAngle), r = Nt(s) * e, n = Gt(s) * e, o = Nt(i) * e, h = Gt(i) * e, c = t > 180 ? 1 : 0, l = this.counterClockwise ? 0 : 1;
      return ['<path d="M '.concat(r, " ").concat(n, " A ").concat(e, " ").concat(e, " 0 ").concat(c, " ").concat(l, " ").concat(o, " ").concat(h, '" '), "COMMON_PARTS", ` />
`];
    }
  }
  static async fromElement(t, e, s) {
    const i = qt(t, this.ATTRIBUTE_NAMES, s), { left: r = 0, top: n = 0, radius: o = 0 } = i;
    return new this(y(y({}, V(i, ah)), {}, { radius: o, left: r - o, top: n - o }));
  }
  static fromObject(t) {
    return super._fromObject(t);
  }
}
m(Xt, "type", "Circle"), m(Xt, "cacheProperties", [...Ut, ...Dn]), m(Xt, "ownDefaults", { radius: 0, startAngle: 0, endAngle: 360, counterClockwise: !1 }), m(Xt, "ATTRIBUTE_NAMES", ["cx", "cy", "r", ...ee]), T.setClass(Xt), T.setSVGClass(Xt);
class hh extends Ke {
  constructor(t) {
    super(t);
  }
  getPatternSrc() {
    const t = St(), e = t.getContext("2d");
    return t.width = t.height = 25, e && (e.fillStyle = this.color, e.beginPath(), e.arc(10, 10, 10, 0, 2 * Math.PI, !1), e.closePath(), e.fill()), t;
  }
  getPattern(t) {
    return t.createPattern(this.source || this.getPatternSrc(), "repeat");
  }
  _setBrushStyles(t) {
    super._setBrushStyles(t);
    const e = this.getPattern(t);
    e && (t.strokeStyle = e);
  }
  createPath(t) {
    const e = super.createPath(t), s = e._getLeftTopCoords().scalarAdd(e.strokeWidth / 2);
    return e.stroke = new Rs({ source: this.source || this.getPatternSrc(), offsetX: -s.x, offsetY: -s.y }), e;
  }
}
const ch = ["x1", "y1", "x2", "y2"], lh = ["x1", "y1", "x2", "y2"], ki = ["x1", "x2", "y1", "y2"];
class Zt extends it {
  constructor() {
    let [t, e, s, i] = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [0, 0, 0, 0], r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, Zt.ownDefaults), this.setOptions(r), this.x1 = t, this.x2 = s, this.y1 = e, this.y2 = i, this._setWidthHeight();
    const { left: n, top: o } = r;
    typeof n == "number" && this.set(I, n), typeof o == "number" && this.set(ht, o);
  }
  _setWidthHeight() {
    const { x1: t, y1: e, x2: s, y2: i } = this;
    this.width = Math.abs(s - t), this.height = Math.abs(i - e);
    const { left: r, top: n, width: o, height: h } = Vt([{ x: t, y: e }, { x: s, y: i }]), c = new w(r + o / 2, n + h / 2);
    this.setPositionByOrigin(c, R, R);
  }
  _set(t, e) {
    return super._set(t, e), ki.includes(t) && this._setWidthHeight(), this;
  }
  _render(t) {
    t.beginPath();
    const e = this.calcLinePoints();
    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2), t.lineWidth = this.strokeWidth;
    const s = t.strokeStyle;
    var i;
    bt(this.stroke) ? t.strokeStyle = this.stroke.toLive(t) : t.strokeStyle = (i = this.stroke) !== null && i !== void 0 ? i : t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = s;
  }
  _findCenterFromElement() {
    return new w((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject(t)), this.calcLinePoints());
  }
  _getNonTransformedDimensions() {
    const t = super._getNonTransformedDimensions();
    return this.strokeLineCap === "butt" && (this.width === 0 && (t.y -= this.strokeWidth), this.height === 0 && (t.x -= this.strokeWidth)), t;
  }
  calcLinePoints() {
    const { x1: t, x2: e, y1: s, y2: i, width: r, height: n } = this, o = t <= e ? -1 : 1, h = s <= i ? -1 : 1;
    return { x1: o * r / 2, x2: o * -r / 2, y1: h * n / 2, y2: h * -n / 2 };
  }
  _toSVG() {
    const { x1: t, x2: e, y1: s, y2: i } = this.calcLinePoints();
    return ["<line ", "COMMON_PARTS", 'x1="'.concat(t, '" y1="').concat(s, '" x2="').concat(e, '" y2="').concat(i, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const i = qt(t, this.ATTRIBUTE_NAMES, s), { x1: r = 0, y1: n = 0, x2: o = 0, y2: h = 0 } = i;
    return new this([r, n, o, h], V(i, ch));
  }
  static fromObject(t) {
    let { x1: e, y1: s, x2: i, y2: r } = t, n = V(t, lh);
    return this._fromObject(y(y({}, n), {}, { points: [e, s, i, r] }), { extraParam: "points" });
  }
}
m(Zt, "type", "Line"), m(Zt, "cacheProperties", [...Ut, ...ki]), m(Zt, "ATTRIBUTE_NAMES", ee.concat(ki)), T.setClass(Zt), T.setSVGClass(Zt);
class ae extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ae.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, ae.ownDefaults), this.setOptions(t);
  }
  _render(t) {
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, s), t.lineTo(0, -s), t.lineTo(e, s), t.closePath(), this._renderPaintInOrder(t);
  }
  _toSVG() {
    const t = this.width / 2, e = this.height / 2;
    return ["<polygon ", "COMMON_PARTS", 'points="', "".concat(-t, " ").concat(e, ",0 ").concat(-e, ",").concat(t, " ").concat(e), '" />'];
  }
}
m(ae, "type", "Triangle"), m(ae, "ownDefaults", { width: 100, height: 100 }), T.setClass(ae), T.setSVGClass(ae);
const An = ["rx", "ry"];
class ft extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ft.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, ft.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    switch (super._set(t, e), t) {
      case "rx":
        this.rx = e, this.set("width", 2 * e);
        break;
      case "ry":
        this.ry = e, this.set("height", 2 * e);
    }
    return this;
  }
  getRx() {
    return this.get("rx") * this.get(ut);
  }
  getRy() {
    return this.get("ry") * this.get(_t);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...An, ...t]);
  }
  _toSVG() {
    return ["<ellipse ", "COMMON_PARTS", 'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(this.ry, `" />
`)];
  }
  _render(t) {
    t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(0, 0, this.rx, 0, js, !1), t.restore(), this._renderPaintInOrder(t);
  }
  static async fromElement(t, e, s) {
    const i = qt(t, this.ATTRIBUTE_NAMES, s);
    return i.left = (i.left || 0) - i.rx, i.top = (i.top || 0) - i.ry, new this(i);
  }
}
function uh(a) {
  if (!a) return [];
  const t = a.replace(/,/g, " ").trim().split(/\s+/), e = [];
  for (let s = 0; s < t.length; s += 2) e.push({ x: parseFloat(t[s]), y: parseFloat(t[s + 1]) });
  return e;
}
m(ft, "type", "Ellipse"), m(ft, "cacheProperties", [...Ut, ...An]), m(ft, "ownDefaults", { rx: 0, ry: 0 }), m(ft, "ATTRIBUTE_NAMES", [...ee, "cx", "cy", "rx", "ry"]), T.setClass(ft), T.setSVGClass(ft);
const dh = ["left", "top"], Rn = { exactBoundingBox: !1 };
class kt extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), kt.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), m(this, "strokeDiff", void 0), Object.assign(this, kt.ownDefaults), this.setOptions(e), this.points = t;
    const { left: s, top: i } = e;
    this.initialized = !0, this.setBoundingBox(!0), typeof s == "number" && this.set(I, s), typeof i == "number" && this.set(ht, i);
  }
  isOpen() {
    return !0;
  }
  _projectStrokeOnPoints(t) {
    return Qo(this.points, t, this.isOpen());
  }
  _calcDimensions(t) {
    t = y({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: this.strokeMiterLimit, strokeUniform: this.strokeUniform, strokeWidth: this.strokeWidth }, t || {});
    const e = this.exactBoundingBox ? this._projectStrokeOnPoints(t).map((c) => c.projectedPoint) : this.points;
    if (e.length === 0) return { left: 0, top: 0, width: 0, height: 0, pathOffset: new w(), strokeOffset: new w(), strokeDiff: new w() };
    const s = Vt(e), i = Us(y(y({}, t), {}, { scaleX: 1, scaleY: 1 })), r = Vt(this.points.map((c) => at(c, i, !0))), n = new w(this.scaleX, this.scaleY);
    let o = s.left + s.width / 2, h = s.top + s.height / 2;
    return this.exactBoundingBox && (o -= h * Math.tan(K(this.skewX)), h -= o * Math.tan(K(this.skewY))), y(y({}, s), {}, { pathOffset: new w(o, h), strokeOffset: new w(r.left, r.top).subtract(new w(s.left, s.top)).multiply(n), strokeDiff: new w(s.width, s.height).subtract(new w(r.width, r.height)).multiply(n) });
  }
  _findCenterFromElement() {
    const t = Vt(this.points);
    return new w(t.left + t.width / 2, t.top + t.height / 2);
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { left: e, top: s, width: i, height: r, pathOffset: n, strokeOffset: o, strokeDiff: h } = this._calcDimensions();
    this.set({ width: i, height: r, pathOffset: n, strokeOffset: o, strokeDiff: h }), t && this.setPositionByOrigin(new w(e + i / 2, s + r / 2), R, R);
  }
  isStrokeAccountedForInDimensions() {
    return this.exactBoundingBox;
  }
  _getNonTransformedDimensions() {
    return this.exactBoundingBox ? new w(this.width, this.height) : super._getNonTransformedDimensions();
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (this.exactBoundingBox) {
      let n;
      if (Object.keys(t).some((o) => this.strokeUniform || this.constructor.layoutProperties.includes(o))) {
        var e, s;
        const { width: o, height: h } = this._calcDimensions(t);
        n = new w((e = t.width) !== null && e !== void 0 ? e : o, (s = t.height) !== null && s !== void 0 ? s : h);
      } else {
        var i, r;
        n = new w((i = t.width) !== null && i !== void 0 ? i : this.width, (r = t.height) !== null && r !== void 0 ? r : this.height);
      }
      return n.multiply(new w(t.scaleX || this.scaleX, t.scaleY || this.scaleY));
    }
    return super._getTransformedDimensions(t);
  }
  _set(t, e) {
    const s = this.initialized && this[t] !== e, i = super._set(t, e);
    return this.exactBoundingBox && s && ((t === ut || t === _t) && this.strokeUniform && this.constructor.layoutProperties.includes("strokeUniform") || this.constructor.layoutProperties.includes(t)) && this.setDimensions(), i;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject(t)), {}, { points: this.points.map((e) => {
      let { x: s, y: i } = e;
      return { x: s, y: i };
    }) });
  }
  _toSVG() {
    const t = [], e = this.pathOffset.x, s = this.pathOffset.y, i = j.NUM_FRACTION_DIGITS;
    for (let r = 0, n = this.points.length; r < n; r++) t.push(G(this.points[r].x - e, i), ",", G(this.points[r].y - s, i), " ");
    return ["<".concat(this.constructor.type.toLowerCase(), " "), "COMMON_PARTS", 'points="'.concat(t.join(""), `" />
`)];
  }
  _render(t) {
    const e = this.points.length, s = this.pathOffset.x, i = this.pathOffset.y;
    if (e && !isNaN(this.points[e - 1].y)) {
      t.beginPath(), t.moveTo(this.points[0].x - s, this.points[0].y - i);
      for (let r = 0; r < e; r++) {
        const n = this.points[r];
        t.lineTo(n.x - s, n.y - i);
      }
      !this.isOpen() && t.closePath(), this._renderPaintInOrder(t);
    }
  }
  complexity() {
    return this.points.length;
  }
  static async fromElement(t, e, s) {
    return new this(uh(t.getAttribute("points")), y(y({}, V(qt(t, this.ATTRIBUTE_NAMES, s), dh)), e));
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "points" });
  }
}
m(kt, "ownDefaults", Rn), m(kt, "type", "Polyline"), m(kt, "layoutProperties", [De, Ae, "strokeLineCap", "strokeLineJoin", "strokeMiterLimit", "strokeWidth", "strokeUniform", "points"]), m(kt, "cacheProperties", [...Ut, "points"]), m(kt, "ATTRIBUTE_NAMES", [...ee]), T.setClass(kt), T.setSVGClass(kt);
class rs extends kt {
  isOpen() {
    return !1;
  }
}
m(rs, "ownDefaults", Rn), m(rs, "type", "Polygon"), T.setClass(rs), T.setSVGClass(rs);
const jn = ["fontSize", "fontWeight", "fontFamily", "fontStyle"], Ln = ["underline", "overline", "linethrough"], Pn = [...jn, "lineHeight", "text", "charSpacing", "textAlign", "styles", "path", "pathStartOffset", "pathSide", "pathAlign"], Fn = [...Pn, ...Ln, "textBackgroundColor", "direction"], gh = [...jn, ...Ln, lt, "strokeWidth", Z, "deltaY", "textBackgroundColor"], ph = { _reNewline: Pi, _reSpacesAndTabs: /[ \t\r]/g, _reSpaceAndTab: /[ \t\r]/, _reWords: /\S+/g, fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", underline: !1, overline: !1, linethrough: !1, textAlign: I, fontStyle: "normal", lineHeight: 1.16, superscript: { size: 0.6, baseline: -0.35 }, subscript: { size: 0.6, baseline: 0.11 }, textBackgroundColor: "", stroke: null, shadow: null, path: void 0, pathStartOffset: 0, pathSide: I, pathAlign: "baseline", _fontSizeFraction: 0.222, offsets: { underline: 0.1, linethrough: -0.315, overline: -0.88 }, _fontSizeMult: 1.13, charSpacing: 0, deltaY: 0, direction: "ltr", CACHE_FONT_SIZE: 400, MIN_TEXT_WIDTH: 2 }, Ft = "justify", Vs = "justify-left", Ye = "justify-right", He = "justify-center";
class Wn extends it {
  isEmptyStyles(t) {
    if (!this.styles || t !== void 0 && !this.styles[t]) return !0;
    const e = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const s in e) for (const i in e[s]) for (const r in e[s][i]) return !1;
    return !0;
  }
  styleHas(t, e) {
    if (!this.styles || e !== void 0 && !this.styles[e]) return !1;
    const s = e === void 0 ? this.styles : { 0: this.styles[e] };
    for (const i in s) for (const r in s[i]) if (s[i][r][t] !== void 0) return !0;
    return !1;
  }
  cleanStyle(t) {
    if (!this.styles) return !1;
    const e = this.styles;
    let s, i, r = 0, n = !0, o = 0;
    for (const h in e) {
      s = 0;
      for (const c in e[h]) {
        const l = e[h][c] || {};
        r++, l[t] !== void 0 ? (i ? l[t] !== i && (n = !1) : i = l[t], l[t] === this[t] && delete l[t]) : n = !1, Object.keys(l).length !== 0 ? s++ : delete e[h][c];
      }
      s === 0 && delete e[h];
    }
    for (let h = 0; h < this._textLines.length; h++) o += this._textLines[h].length;
    n && r === o && (this[t] = i, this.removeStyle(t));
  }
  removeStyle(t) {
    if (!this.styles) return;
    const e = this.styles;
    let s, i, r;
    for (i in e) {
      for (r in s = e[i], s) delete s[r][t], Object.keys(s[r]).length === 0 && delete s[r];
      Object.keys(s).length === 0 && delete e[i];
    }
  }
  _extendStyles(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t);
    this._getLineStyle(s) || this._setLineStyle(s);
    const r = Bi(y(y({}, this._getStyleDeclaration(s, i)), e), (n) => n !== void 0);
    this._setStyleDeclaration(s, i, r);
  }
  getSelectionStyles(t, e, s) {
    const i = [];
    for (let r = t; r < (e || t); r++) i.push(this.getStyleAtPosition(r, s));
    return i;
  }
  getStyleAtPosition(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t);
    return e ? this.getCompleteStyleDeclaration(s, i) : this._getStyleDeclaration(s, i);
  }
  setSelectionStyles(t, e, s) {
    for (let i = e; i < (s || e); i++) this._extendStyles(i, t);
    this._forceClearCache = !0;
  }
  _getStyleDeclaration(t, e) {
    var s;
    const i = this.styles && this.styles[t];
    return i && (s = i[e]) !== null && s !== void 0 ? s : {};
  }
  getCompleteStyleDeclaration(t, e) {
    return y(y({}, Re(this, this.constructor._styleProperties)), this._getStyleDeclaration(t, e));
  }
  _setStyleDeclaration(t, e, s) {
    this.styles[t][e] = s;
  }
  _deleteStyleDeclaration(t, e) {
    delete this.styles[t][e];
  }
  _getLineStyle(t) {
    return !!this.styles[t];
  }
  _setLineStyle(t) {
    this.styles[t] = {};
  }
  _deleteLineStyle(t) {
    delete this.styles[t];
  }
}
m(Wn, "_styleProperties", gh);
const fh = /  +/g, mh = /"/g;
function ci(a, t, e, s, i) {
  return "		".concat(function(r, n) {
    let { left: o, top: h, width: c, height: l } = n, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : j.NUM_FRACTION_DIGITS;
    const d = Ge(Z, r, !1), [g, f, v, x] = [o, h, c, l].map((b) => G(b, u));
    return "<rect ".concat(d, ' x="').concat(g, '" y="').concat(f, '" width="').concat(v, '" height="').concat(x, '"></rect>');
  }(a, { left: t, top: e, width: s, height: i }), `
`);
}
const vh = ["textAnchor", "textDecoration", "dx", "dy", "top", "left", "fontSize", "strokeWidth"];
let li;
class rt extends Wn {
  static getDefaults() {
    return y(y({}, super.getDefaults()), rt.ownDefaults);
  }
  constructor(t, e) {
    super(), m(this, "__charBounds", []), Object.assign(this, rt.ownDefaults), this.setOptions(e), this.styles || (this.styles = {}), this.text = t, this.initialized = !0, this.path && this.setPathInfo(), this.initDimensions(), this.setCoords();
  }
  setPathInfo() {
    const t = this.path;
    t && (t.segmentsInfo = _n(t.path));
  }
  _splitText() {
    const t = this._splitTextIntoLines(this.text);
    return this.textLines = t.lines, this._textLines = t.graphemeLines, this._unwrappedTextLines = t._unwrappedLines, this._text = t.graphemeText, t;
  }
  initDimensions() {
    this._splitText(), this._clearCache(), this.dirty = !0, this.path ? (this.width = this.path.width, this.height = this.path.height) : (this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH, this.height = this.calcTextHeight()), this.textAlign.includes(Ft) && this.enlargeSpaces();
  }
  enlargeSpaces() {
    let t, e, s, i, r, n, o;
    for (let h = 0, c = this._textLines.length; h < c; h++) if ((this.textAlign === Ft || h !== c - 1 && !this.isEndOfWrapping(h)) && (i = 0, r = this._textLines[h], e = this.getLineWidth(h), e < this.width && (o = this.textLines[h].match(this._reSpacesAndTabs)))) {
      s = o.length, t = (this.width - e) / s;
      for (let l = 0; l <= r.length; l++) n = this.__charBounds[h][l], this._reSpaceAndTab.test(r[l]) ? (n.width += t, n.kernedWidth += t, n.left += i, i += t) : n.left += i;
    }
  }
  isEndOfWrapping(t) {
    return t === this._textLines.length - 1;
  }
  missingNewlineOffset(t) {
    return 1;
  }
  get2DCursorLocation(t, e) {
    const s = e ? this._unwrappedTextLines : this._textLines;
    let i;
    for (i = 0; i < s.length; i++) {
      if (t <= s[i].length) return { lineIndex: i, charIndex: t };
      t -= s[i].length + this.missingNewlineOffset(i, e);
    }
    return { lineIndex: i - 1, charIndex: s[i - 1].length < t ? s[i - 1].length : t };
  }
  toString() {
    return "#<Text (".concat(this.complexity(), '): { "text": "').concat(this.text, '", "fontFamily": "').concat(this.fontFamily, '" }>');
  }
  _getCacheCanvasDimensions() {
    const t = super._getCacheCanvasDimensions(), e = this.fontSize;
    return t.width += e * t.zoomX, t.height += e * t.zoomY, t;
  }
  _render(t) {
    const e = this.path;
    e && !e.isNotVisible() && e._render(t), this._setTextStyles(t), this._renderTextLinesBackground(t), this._renderTextDecoration(t, "underline"), this._renderText(t), this._renderTextDecoration(t, "overline"), this._renderTextDecoration(t, "linethrough");
  }
  _renderText(t) {
    this.paintFirst === lt ? (this._renderTextStroke(t), this._renderTextFill(t)) : (this._renderTextFill(t), this._renderTextStroke(t));
  }
  _setTextStyles(t, e, s) {
    if (t.textBaseline = "alphabetic", this.path) switch (this.pathAlign) {
      case R:
        t.textBaseline = "middle";
        break;
      case "ascender":
        t.textBaseline = ht;
        break;
      case "descender":
        t.textBaseline = mi;
    }
    t.font = this._getFontDeclaration(e, s);
  }
  calcTextWidth() {
    let t = this.getLineWidth(0);
    for (let e = 1, s = this._textLines.length; e < s; e++) {
      const i = this.getLineWidth(e);
      i > t && (t = i);
    }
    return t;
  }
  _renderTextLine(t, e, s, i, r, n) {
    this._renderChars(t, e, s, i, r, n);
  }
  _renderTextLinesBackground(t) {
    if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor")) return;
    const e = t.fillStyle, s = this._getLeftOffset();
    let i = this._getTopOffset();
    for (let r = 0, n = this._textLines.length; r < n; r++) {
      const o = this.getHeightOfLine(r);
      if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", r)) {
        i += o;
        continue;
      }
      const h = this._textLines[r].length, c = this._getLineLeftOffset(r);
      let l, u, d = 0, g = 0, f = this.getValueOfPropertyAt(r, 0, "textBackgroundColor");
      for (let v = 0; v < h; v++) {
        const x = this.__charBounds[r][v];
        u = this.getValueOfPropertyAt(r, v, "textBackgroundColor"), this.path ? (t.save(), t.translate(x.renderLeft, x.renderTop), t.rotate(x.angle), t.fillStyle = u, u && t.fillRect(-x.width / 2, -o / this.lineHeight * (1 - this._fontSizeFraction), x.width, o / this.lineHeight), t.restore()) : u !== f ? (l = s + c + g, this.direction === "rtl" && (l = this.width - l - d), t.fillStyle = f, f && t.fillRect(l, i, d, o / this.lineHeight), g = x.left, d = x.width, f = u) : d += x.kernedWidth;
      }
      u && !this.path && (l = s + c + g, this.direction === "rtl" && (l = this.width - l - d), t.fillStyle = u, t.fillRect(l, i, d, o / this.lineHeight)), i += o;
    }
    t.fillStyle = e, this._removeShadow(t);
  }
  _measureChar(t, e, s, i) {
    const r = Be.getFontCache(e), n = this._getFontDeclaration(e), o = s + t, h = s && n === this._getFontDeclaration(i), c = e.fontSize / this.CACHE_FONT_SIZE;
    let l, u, d, g;
    if (s && r[s] !== void 0 && (d = r[s]), r[t] !== void 0 && (g = l = r[t]), h && r[o] !== void 0 && (u = r[o], g = u - d), l === void 0 || d === void 0 || u === void 0) {
      const f = function() {
        return li || (li = It({ width: 0, height: 0 }).getContext("2d")), li;
      }();
      this._setTextStyles(f, e, !0), l === void 0 && (g = l = f.measureText(t).width, r[t] = l), d === void 0 && h && s && (d = f.measureText(s).width, r[s] = d), h && u === void 0 && (u = f.measureText(o).width, r[o] = u, g = u - d);
    }
    return { width: l * c, kernedWidth: g * c };
  }
  getHeightOfChar(t, e) {
    return this.getValueOfPropertyAt(t, e, "fontSize");
  }
  measureLine(t) {
    const e = this._measureLine(t);
    return this.charSpacing !== 0 && (e.width -= this._getWidthOfCharSpacing()), e.width < 0 && (e.width = 0), e;
  }
  _measureLine(t) {
    let e, s, i = 0;
    const r = this.pathSide === q, n = this.path, o = this._textLines[t], h = o.length, c = new Array(h);
    this.__charBounds[t] = c;
    for (let l = 0; l < h; l++) {
      const u = o[l];
      s = this._getGraphemeBox(u, t, l, e), c[l] = s, i += s.kernedWidth, e = u;
    }
    if (c[h] = { left: s ? s.left + s.width : 0, width: 0, kernedWidth: 0, height: this.fontSize, deltaY: 0 }, n && n.segmentsInfo) {
      let l = 0;
      const u = n.segmentsInfo[n.segmentsInfo.length - 1].length;
      switch (this.textAlign) {
        case I:
          l = r ? u - i : 0;
          break;
        case R:
          l = (u - i) / 2;
          break;
        case q:
          l = r ? 0 : u - i;
      }
      l += this.pathStartOffset * (r ? -1 : 1);
      for (let d = r ? h - 1 : 0; r ? d >= 0 : d < h; r ? d-- : d++) s = c[d], l > u ? l %= u : l < 0 && (l += u), this._setGraphemeOnPath(l, s), l += s.kernedWidth;
    }
    return { width: i, numOfSpaces: 0 };
  }
  _setGraphemeOnPath(t, e) {
    const s = t + e.kernedWidth / 2, i = this.path, r = Ba(i.path, s, i.segmentsInfo);
    e.renderLeft = r.x - i.pathOffset.x, e.renderTop = r.y - i.pathOffset.y, e.angle = r.angle + (this.pathSide === q ? Math.PI : 0);
  }
  _getGraphemeBox(t, e, s, i, r) {
    const n = this.getCompleteStyleDeclaration(e, s), o = i ? this.getCompleteStyleDeclaration(e, s - 1) : {}, h = this._measureChar(t, n, i, o);
    let c, l = h.kernedWidth, u = h.width;
    this.charSpacing !== 0 && (c = this._getWidthOfCharSpacing(), u += c, l += c);
    const d = { width: u, left: 0, height: n.fontSize, kernedWidth: l, deltaY: n.deltaY };
    if (s > 0 && !r) {
      const g = this.__charBounds[e][s - 1];
      d.left = g.left + g.width + h.kernedWidth - h.width;
    }
    return d;
  }
  getHeightOfLine(t) {
    if (this.__lineHeights[t]) return this.__lineHeights[t];
    let e = this.getHeightOfChar(t, 0);
    for (let s = 1, i = this._textLines[t].length; s < i; s++) e = Math.max(this.getHeightOfChar(t, s), e);
    return this.__lineHeights[t] = e * this.lineHeight * this._fontSizeMult;
  }
  calcTextHeight() {
    let t, e = 0;
    for (let s = 0, i = this._textLines.length; s < i; s++) t = this.getHeightOfLine(s), e += s === i - 1 ? t / this.lineHeight : t;
    return e;
  }
  _getLeftOffset() {
    return this.direction === "ltr" ? -this.width / 2 : this.width / 2;
  }
  _getTopOffset() {
    return -this.height / 2;
  }
  _renderTextCommon(t, e) {
    t.save();
    let s = 0;
    const i = this._getLeftOffset(), r = this._getTopOffset();
    for (let n = 0, o = this._textLines.length; n < o; n++) {
      const h = this.getHeightOfLine(n), c = h / this.lineHeight, l = this._getLineLeftOffset(n);
      this._renderTextLine(e, t, this._textLines[n], i + l, r + s + c, n), s += h;
    }
    t.restore();
  }
  _renderTextFill(t) {
    (this.fill || this.styleHas(Z)) && this._renderTextCommon(t, "fillText");
  }
  _renderTextStroke(t) {
    (this.stroke && this.strokeWidth !== 0 || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray), t.beginPath(), this._renderTextCommon(t, "strokeText"), t.closePath(), t.restore());
  }
  _renderChars(t, e, s, i, r, n) {
    const o = this.getHeightOfLine(n), h = this.textAlign.includes(Ft), c = this.path, l = !h && this.charSpacing === 0 && this.isEmptyStyles(n) && !c, u = this.direction === "ltr", d = this.direction === "ltr" ? 1 : -1, g = e.direction;
    let f, v, x, b, C, _ = "", S = 0;
    if (e.save(), g !== this.direction && (e.canvas.setAttribute("dir", u ? "ltr" : "rtl"), e.direction = u ? "ltr" : "rtl", e.textAlign = u ? I : q), r -= o * this._fontSizeFraction / this.lineHeight, l) return this._renderChar(t, e, n, 0, s.join(""), i, r), void e.restore();
    for (let k = 0, M = s.length - 1; k <= M; k++) b = k === M || this.charSpacing || c, _ += s[k], x = this.__charBounds[n][k], S === 0 ? (i += d * (x.kernedWidth - x.width), S += x.width) : S += x.kernedWidth, h && !b && this._reSpaceAndTab.test(s[k]) && (b = !0), b || (f = f || this.getCompleteStyleDeclaration(n, k), v = this.getCompleteStyleDeclaration(n, k + 1), b = qi(f, v, !1)), b && (c ? (e.save(), e.translate(x.renderLeft, x.renderTop), e.rotate(x.angle), this._renderChar(t, e, n, k, _, -S / 2, 0), e.restore()) : (C = i, this._renderChar(t, e, n, k, _, C, r)), _ = "", f = v, i += d * S, S = 0);
    e.restore();
  }
  _applyPatternGradientTransformText(t) {
    const e = this.width + this.strokeWidth, s = this.height + this.strokeWidth, i = It({ width: e, height: s }), r = i.getContext("2d");
    return i.width = e, i.height = s, r.beginPath(), r.moveTo(0, 0), r.lineTo(e, 0), r.lineTo(e, s), r.lineTo(0, s), r.closePath(), r.translate(e / 2, s / 2), r.fillStyle = t.toLive(r), this._applyPatternGradientTransform(r, t), r.fill(), r.createPattern(i, "no-repeat");
  }
  handleFiller(t, e, s) {
    let i, r;
    return bt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? (i = -this.width / 2, r = -this.height / 2, t.translate(i, r), t[e] = this._applyPatternGradientTransformText(s), { offsetX: i, offsetY: r }) : (t[e] = s.toLive(t), this._applyPatternGradientTransform(t, s)) : (t[e] = s, { offsetX: 0, offsetY: 0 });
  }
  _setStrokeStyles(t, e) {
    let { stroke: s, strokeWidth: i } = e;
    return t.lineWidth = i, t.lineCap = this.strokeLineCap, t.lineDashOffset = this.strokeDashOffset, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, this.handleFiller(t, "strokeStyle", s);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    return this.handleFiller(t, "fillStyle", s);
  }
  _renderChar(t, e, s, i, r, n, o) {
    const h = this._getStyleDeclaration(s, i), c = this.getCompleteStyleDeclaration(s, i), l = t === "fillText" && c.fill, u = t === "strokeText" && c.stroke && c.strokeWidth;
    if (u || l) {
      if (e.save(), e.font = this._getFontDeclaration(c), h.textBackgroundColor && this._removeShadow(e), h.deltaY && (o += h.deltaY), l) {
        const d = this._setFillStyles(e, c);
        e.fillText(r, n - d.offsetX, o - d.offsetY);
      }
      if (u) {
        const d = this._setStrokeStyles(e, c);
        e.strokeText(r, n - d.offsetX, o - d.offsetY);
      }
      e.restore();
    }
  }
  setSuperscript(t, e) {
    this._setScript(t, e, this.superscript);
  }
  setSubscript(t, e) {
    this._setScript(t, e, this.subscript);
  }
  _setScript(t, e, s) {
    const i = this.get2DCursorLocation(t, !0), r = this.getValueOfPropertyAt(i.lineIndex, i.charIndex, "fontSize"), n = this.getValueOfPropertyAt(i.lineIndex, i.charIndex, "deltaY"), o = { fontSize: r * s.size, deltaY: n + r * s.baseline };
    this.setSelectionStyles(o, t, e);
  }
  _getLineLeftOffset(t) {
    const e = this.getLineWidth(t), s = this.width - e, i = this.textAlign, r = this.direction, n = this.isEndOfWrapping(t);
    let o = 0;
    return i === Ft || i === He && !n || i === Ye && !n || i === Vs && !n ? 0 : (i === R && (o = s / 2), i === q && (o = s), i === He && (o = s / 2), i === Ye && (o = s), r === "rtl" && (i === q || i === Ft || i === Ye ? o = 0 : i === I || i === Vs ? o = -s : i !== R && i !== He || (o = -s / 2)), o);
  }
  _clearCache() {
    this._forceClearCache = !1, this.__lineWidths = [], this.__lineHeights = [], this.__charBounds = [];
  }
  getLineWidth(t) {
    if (this.__lineWidths[t] !== void 0) return this.__lineWidths[t];
    const { width: e } = this.measureLine(t);
    return this.__lineWidths[t] = e, e;
  }
  _getWidthOfCharSpacing() {
    return this.charSpacing !== 0 ? this.fontSize * this.charSpacing / 1e3 : 0;
  }
  getValueOfPropertyAt(t, e, s) {
    var i;
    return (i = this._getStyleDeclaration(t, e)[s]) !== null && i !== void 0 ? i : this[s];
  }
  _renderTextDecoration(t, e) {
    if (!this[e] && !this.styleHas(e)) return;
    let s = this._getTopOffset();
    const i = this._getLeftOffset(), r = this.path, n = this._getWidthOfCharSpacing(), o = this.offsets[e];
    for (let h = 0, c = this._textLines.length; h < c; h++) {
      const l = this.getHeightOfLine(h);
      if (!this[e] && !this.styleHas(e, h)) {
        s += l;
        continue;
      }
      const u = this._textLines[h], d = l / this.lineHeight, g = this._getLineLeftOffset(h);
      let f, v, x = 0, b = 0, C = this.getValueOfPropertyAt(h, 0, e), _ = this.getValueOfPropertyAt(h, 0, Z);
      const S = s + d * (1 - this._fontSizeFraction);
      let k = this.getHeightOfChar(h, 0), M = this.getValueOfPropertyAt(h, 0, "deltaY");
      for (let E = 0, F = u.length; E < F; E++) {
        const P = this.__charBounds[h][E];
        f = this.getValueOfPropertyAt(h, E, e), v = this.getValueOfPropertyAt(h, E, Z);
        const Y = this.getHeightOfChar(h, E), H = this.getValueOfPropertyAt(h, E, "deltaY");
        if (r && f && v) t.save(), t.fillStyle = _, t.translate(P.renderLeft, P.renderTop), t.rotate(P.angle), t.fillRect(-P.kernedWidth / 2, o * Y + H, P.kernedWidth, this.fontSize / 15), t.restore();
        else if ((f !== C || v !== _ || Y !== k || H !== M) && b > 0) {
          let L = i + g + x;
          this.direction === "rtl" && (L = this.width - L - b), C && _ && (t.fillStyle = _, t.fillRect(L, S + o * k + M, b, this.fontSize / 15)), x = P.left, b = P.width, C = f, _ = v, k = Y, M = H;
        } else b += P.kernedWidth;
      }
      let A = i + g + x;
      this.direction === "rtl" && (A = this.width - A - b), t.fillStyle = v, f && v && t.fillRect(A, S + o * k + M, b - n, this.fontSize / 15), s += l;
    }
    this._removeShadow(t);
  }
  _getFontDeclaration() {
    let { fontFamily: t = this.fontFamily, fontStyle: e = this.fontStyle, fontWeight: s = this.fontWeight, fontSize: i = this.fontSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    const n = t.includes("'") || t.includes('"') || t.includes(",") || rt.genericFonts.includes(t.toLowerCase()) ? t : '"'.concat(t, '"');
    return [e, s, "".concat(r ? this.CACHE_FONT_SIZE : i, "px"), n].join(" ");
  }
  render(t) {
    this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._forceClearCache && this.initDimensions(), super.render(t)));
  }
  graphemeSplit(t) {
    return Ui(t);
  }
  _splitTextIntoLines(t) {
    const e = t.split(this._reNewline), s = new Array(e.length), i = [`
`];
    let r = [];
    for (let n = 0; n < e.length; n++) s[n] = this.graphemeSplit(e[n]), r = r.concat(s[n], i);
    return r.pop(), { _unwrappedLines: s, lines: e, graphemeText: r, graphemeLines: s };
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return y(y({}, super.toObject([...Fn, ...t])), {}, { styles: sa(this.styles, this.text) }, this.path ? { path: this.path.toObject() } : {});
  }
  set(t, e) {
    const { textLayoutProperties: s } = this.constructor;
    super.set(t, e);
    let i = !1, r = !1;
    if (typeof t == "object") for (const n in t) n === "path" && this.setPathInfo(), i = i || s.includes(n), r = r || n === "path";
    else i = s.includes(t), r = t === "path";
    return r && this.setPathInfo(), i && this.initialized && (this.initDimensions(), this.setCoords()), this;
  }
  complexity() {
    return 1;
  }
  static async fromElement(t, e, s) {
    const i = qt(t, rt.ATTRIBUTE_NAMES, s), r = y(y({}, e), i), { textAnchor: n = I, textDecoration: o = "", dx: h = 0, dy: c = 0, top: l = 0, left: u = 0, fontSize: d = Li, strokeWidth: g = 1 } = r, f = V(r, vh), v = new this((t.textContent || "").replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " "), y({ left: u + h, top: l + c, underline: o.includes("underline"), overline: o.includes("overline"), linethrough: o.includes("line-through"), strokeWidth: 0, fontSize: d }, f)), x = v.getScaledHeight() / v.height, b = ((v.height + v.strokeWidth) * v.lineHeight - v.height) * x, C = v.getScaledHeight() + b;
    let _ = 0;
    return n === R && (_ = v.getScaledWidth() / 2), n === q && (_ = v.getScaledWidth()), v.set({ left: v.left - _, top: v.top - (C - v.fontSize * (0.07 + v._fontSizeFraction)) / v.lineHeight, strokeWidth: g }), v;
  }
  static fromObject(t) {
    return this._fromObject(y(y({}, t), {}, { styles: ia(t.styles || {}, t.text) }), { extraParam: "text" });
  }
}
m(rt, "textLayoutProperties", Pn), m(rt, "cacheProperties", [...Ut, ...Fn]), m(rt, "ownDefaults", ph), m(rt, "type", "Text"), m(rt, "genericFonts", ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]), m(rt, "ATTRIBUTE_NAMES", ee.concat("x", "y", "dx", "dy", "font-family", "font-style", "font-weight", "font-size", "letter-spacing", "text-decoration", "text-anchor")), pn(rt, [class extends nn {
  _toSVG() {
    const a = this._getSVGLeftTopOffsets(), t = this._getSVGTextAndBg(a.textTop, a.textLeft);
    return this._wrapSVGTextAndBg(t);
  }
  toSVG(a) {
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: a, noStyle: !0, withShadow: !0 });
  }
  _getSVGLeftTopOffsets() {
    return { textLeft: -this.width / 2, textTop: -this.height / 2, lineTop: this.getHeightOfLine(0) };
  }
  _wrapSVGTextAndBg(a) {
    let { textBgRects: t, textSpans: e } = a;
    const s = this.getSvgTextDecoration(this);
    return [t.join(""), '		<text xml:space="preserve" ', this.fontFamily ? 'font-family="'.concat(this.fontFamily.replace(mh, "'"), '" ') : "", this.fontSize ? 'font-size="'.concat(this.fontSize, '" ') : "", this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : "", this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : "", s ? 'text-decoration="'.concat(s, '" ') : "", this.direction === "rtl" ? 'direction="'.concat(this.direction, '" ') : "", 'style="', this.getSvgStyles(!0), '"', this.addPaintOrder(), " >", e.join(""), `</text>
`];
  }
  _getSVGTextAndBg(a, t) {
    const e = [], s = [];
    let i, r = a;
    this.backgroundColor && s.push(...ci(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height));
    for (let n = 0, o = this._textLines.length; n < o; n++) i = this._getLineLeftOffset(n), this.direction === "rtl" && (i += this.width), (this.textBackgroundColor || this.styleHas("textBackgroundColor", n)) && this._setSVGTextLineBg(s, n, t + i, r), this._setSVGTextLineText(e, n, t + i, r), r += this.getHeightOfLine(n);
    return { textSpans: e, textBgRects: s };
  }
  _createTextCharSpan(a, t, e, s) {
    const i = this.getSvgSpanStyles(t, a !== a.trim() || !!a.match(fh)), r = i ? 'style="'.concat(i, '"') : "", n = t.deltaY, o = n ? ' dy="'.concat(G(n, j.NUM_FRACTION_DIGITS), '" ') : "";
    return '<tspan x="'.concat(G(e, j.NUM_FRACTION_DIGITS), '" y="').concat(G(s, j.NUM_FRACTION_DIGITS), '" ').concat(o).concat(r, ">").concat(ta(a), "</tspan>");
  }
  _setSVGTextLineText(a, t, e, s) {
    const i = this.getHeightOfLine(t), r = this.textAlign.includes(Ft), n = this._textLines[t];
    let o, h, c, l, u, d = "", g = 0;
    s += i * (1 - this._fontSizeFraction) / this.lineHeight;
    for (let f = 0, v = n.length - 1; f <= v; f++) u = f === v || this.charSpacing, d += n[f], c = this.__charBounds[t][f], g === 0 ? (e += c.kernedWidth - c.width, g += c.width) : g += c.kernedWidth, r && !u && this._reSpaceAndTab.test(n[f]) && (u = !0), u || (o = o || this.getCompleteStyleDeclaration(t, f), h = this.getCompleteStyleDeclaration(t, f + 1), u = qi(o, h, !0)), u && (l = this._getStyleDeclaration(t, f), a.push(this._createTextCharSpan(d, l, e, s)), d = "", o = h, this.direction === "rtl" ? e -= g : e += g, g = 0);
  }
  _setSVGTextLineBg(a, t, e, s) {
    const i = this._textLines[t], r = this.getHeightOfLine(t) / this.lineHeight;
    let n, o = 0, h = 0, c = this.getValueOfPropertyAt(t, 0, "textBackgroundColor");
    for (let l = 0; l < i.length; l++) {
      const { left: u, width: d, kernedWidth: g } = this.__charBounds[t][l];
      n = this.getValueOfPropertyAt(t, l, "textBackgroundColor"), n !== c ? (c && a.push(...ci(c, e + h, s, o, r)), h = u, o = d, c = n) : o += g;
    }
    n && a.push(...ci(c, e + h, s, o, r));
  }
  _getSVGLineTopOffset(a) {
    let t, e = 0;
    for (t = 0; t < a; t++) e += this.getHeightOfLine(t);
    const s = this.getHeightOfLine(t);
    return { lineTop: e, offset: (this._fontSizeMult - this._fontSizeFraction) * s / (this.lineHeight * this._fontSizeMult) };
  }
  getSvgStyles(a) {
    return "".concat(super.getSvgStyles(a), " white-space: pre;");
  }
  getSvgSpanStyles(a, t) {
    const { fontFamily: e, strokeWidth: s, stroke: i, fill: r, fontSize: n, fontStyle: o, fontWeight: h, deltaY: c } = a, l = this.getSvgTextDecoration(a);
    return [i ? Ge(lt, i) : "", s ? "stroke-width: ".concat(s, "; ") : "", e ? "font-family: ".concat(e.includes("'") || e.includes('"') ? e : "'".concat(e, "'"), "; ") : "", n ? "font-size: ".concat(n, "px; ") : "", o ? "font-style: ".concat(o, "; ") : "", h ? "font-weight: ".concat(h, "; ") : "", l && "text-decoration: ".concat(l, "; "), r ? Ge(Z, r) : "", c ? "baseline-shift: ".concat(-c, "; ") : "", t ? "white-space: pre; " : ""].join("");
  }
  getSvgTextDecoration(a) {
    return ["overline", "underline", "line-through"].filter((t) => a[t.replace("-", "")]).join(" ");
  }
}]), T.setClass(rt), T.setSVGClass(rt);
class yh {
  constructor(t) {
    m(this, "target", void 0), m(this, "__mouseDownInPlace", !1), m(this, "__dragStartFired", !1), m(this, "__isDraggingOver", !1), m(this, "__dragStartSelection", void 0), m(this, "__dragImageDisposer", void 0), m(this, "_dispose", void 0), this.target = t;
    const e = [this.target.on("dragenter", this.dragEnterHandler.bind(this)), this.target.on("dragover", this.dragOverHandler.bind(this)), this.target.on("dragleave", this.dragLeaveHandler.bind(this)), this.target.on("dragend", this.dragEndHandler.bind(this)), this.target.on("drop", this.dropHandler.bind(this))];
    this._dispose = () => {
      e.forEach((s) => s()), this._dispose = void 0;
    };
  }
  isPointerOverSelection(t) {
    const e = this.target, s = e.getSelectionStartFromPointer(t);
    return e.isEditing && s >= e.selectionStart && s <= e.selectionEnd && e.selectionStart < e.selectionEnd;
  }
  start(t) {
    return this.__mouseDownInPlace = this.isPointerOverSelection(t);
  }
  isActive() {
    return this.__mouseDownInPlace;
  }
  end(t) {
    const e = this.isActive();
    return e && !this.__dragStartFired && (this.target.setCursorByClick(t), this.target.initDelayedCursor(!0)), this.__mouseDownInPlace = !1, this.__dragStartFired = !1, this.__isDraggingOver = !1, e;
  }
  getDragStartSelection() {
    return this.__dragStartSelection;
  }
  setDragImage(t, e) {
    var s;
    let { selectionStart: i, selectionEnd: r } = e;
    const n = this.target, o = n.canvas, h = new w(n.flipX ? -1 : 1, n.flipY ? -1 : 1), c = n._getCursorBoundaries(i), l = new w(c.left + c.leftOffset, c.top + c.topOffset).multiply(h).transform(n.calcTransformMatrix()), u = o.getScenePoint(t).subtract(l), d = n.getCanvasRetinaScaling(), g = n.getBoundingRect(), f = l.subtract(new w(g.left, g.top)), v = o.viewportTransform, x = f.add(u).transform(v, !0), b = n.backgroundColor, C = Gi(n.styles);
    n.backgroundColor = "";
    const _ = { stroke: "transparent", fill: "transparent", textBackgroundColor: "transparent" };
    n.setSelectionStyles(_, 0, i), n.setSelectionStyles(_, r, n.text.length), n.dirty = !0;
    const S = n.toCanvasElement({ enableRetinaScaling: o.enableRetinaScaling, viewportTransform: !0 });
    n.backgroundColor = b, n.styles = C, n.dirty = !0, Oi(S, { position: "fixed", left: "".concat(-S.width, "px"), border: ct, width: "".concat(S.width / d, "px"), height: "".concat(S.height / d, "px") }), this.__dragImageDisposer && this.__dragImageDisposer(), this.__dragImageDisposer = () => {
      S.remove();
    }, Mt(t.target || this.target.hiddenTextarea).body.appendChild(S), (s = t.dataTransfer) === null || s === void 0 || s.setDragImage(S, x.x, x.y);
  }
  onDragStart(t) {
    this.__dragStartFired = !0;
    const e = this.target, s = this.isActive();
    if (s && t.dataTransfer) {
      const i = this.__dragStartSelection = { selectionStart: e.selectionStart, selectionEnd: e.selectionEnd }, r = e._text.slice(i.selectionStart, i.selectionEnd).join(""), n = y({ text: e.text, value: r }, i);
      t.dataTransfer.setData("text/plain", r), t.dataTransfer.setData("application/fabric", JSON.stringify({ value: r, styles: e.getSelectionStyles(i.selectionStart, i.selectionEnd, !0) })), t.dataTransfer.effectAllowed = "copyMove", this.setDragImage(t, n);
    }
    return e.abortCursorAnimation(), s;
  }
  canDrop(t) {
    if (this.target.editable && !this.target.getActiveControl() && !t.defaultPrevented) {
      if (this.isActive() && this.__dragStartSelection) {
        const e = this.target.getSelectionStartFromPointer(t), s = this.__dragStartSelection;
        return e < s.selectionStart || e > s.selectionEnd;
      }
      return !0;
    }
    return !1;
  }
  targetCanDrop(t) {
    return this.target.canDrop(t);
  }
  dragEnterHandler(t) {
    let { e } = t;
    const s = this.targetCanDrop(e);
    !this.__isDraggingOver && s && (this.__isDraggingOver = !0);
  }
  dragOverHandler(t) {
    const { e } = t, s = this.targetCanDrop(e);
    !this.__isDraggingOver && s ? this.__isDraggingOver = !0 : this.__isDraggingOver && !s && (this.__isDraggingOver = !1), this.__isDraggingOver && (e.preventDefault(), t.canDrop = !0, t.dropTarget = this.target);
  }
  dragLeaveHandler() {
    (this.__isDraggingOver || this.isActive()) && (this.__isDraggingOver = !1);
  }
  dropHandler(t) {
    var e;
    const { e: s } = t, i = s.defaultPrevented;
    this.__isDraggingOver = !1, s.preventDefault();
    let r = (e = s.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain");
    if (r && !i) {
      const n = this.target, o = n.canvas;
      let h = n.getSelectionStartFromPointer(s);
      const { styles: c } = s.dataTransfer.types.includes("application/fabric") ? JSON.parse(s.dataTransfer.getData("application/fabric")) : {}, l = r[Math.max(0, r.length - 1)], u = 0;
      if (this.__dragStartSelection) {
        const d = this.__dragStartSelection.selectionStart, g = this.__dragStartSelection.selectionEnd;
        h > d && h <= g ? h = d : h > g && (h -= g - d), n.removeChars(d, g), delete this.__dragStartSelection;
      }
      n._reNewline.test(l) && (n._reNewline.test(n._text[h]) || h === n._text.length) && (r = r.trimEnd()), t.didDrop = !0, t.dropTarget = n, n.insertChars(r, c, h), o.setActiveObject(n), n.enterEditing(s), n.selectionStart = Math.min(h + u, n._text.length), n.selectionEnd = Math.min(n.selectionStart + r.length, n._text.length), n.hiddenTextarea.value = n.text, n._updateTextarea(), n.hiddenTextarea.focus(), n.fire(Ls, { index: h + u, action: "drop" }), o.fire("text:changed", { target: n }), o.contextTopDirty = !0, o.requestRenderAll();
    }
  }
  dragEndHandler(t) {
    let { e } = t;
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s;
      const i = this.target, r = this.target.canvas, { selectionStart: n, selectionEnd: o } = this.__dragStartSelection, h = ((s = e.dataTransfer) === null || s === void 0 ? void 0 : s.dropEffect) || ct;
      h === ct ? (i.selectionStart = n, i.selectionEnd = o, i._updateTextarea(), i.hiddenTextarea.focus()) : (i.clearContextTop(), h === "move" && (i.removeChars(n, o), i.selectionStart = i.selectionEnd = n, i.hiddenTextarea && (i.hiddenTextarea.value = i.text), i._updateTextarea(), i.fire(Ls, { index: n, action: "dragend" }), r.fire("text:changed", { target: i }), r.requestRenderAll()), i.exitEditing());
    }
    this.__dragImageDisposer && this.__dragImageDisposer(), delete this.__dragImageDisposer, delete this.__dragStartSelection, this.__isDraggingOver = !1;
  }
  dispose() {
    this._dispose && this._dispose();
  }
}
const Dr = /[ \n\.,;!\?\-]/;
class xh extends rt {
  constructor() {
    super(...arguments), m(this, "_currentCursorOpacity", 1);
  }
  initBehavior() {
    this._tick = this._tick.bind(this), this._onTickComplete = this._onTickComplete.bind(this), this.updateSelectionOnMouseMove = this.updateSelectionOnMouseMove.bind(this);
  }
  onDeselect(t) {
    return this.isEditing && this.exitEditing(), this.selected = !1, super.onDeselect(t);
  }
  _animateCursor(t) {
    let { toValue: e, duration: s, delay: i, onComplete: r } = t;
    return cn({ startValue: this._currentCursorOpacity, endValue: e, duration: s, delay: i, onComplete: r, abort: () => !this.canvas || this.selectionStart !== this.selectionEnd, onChange: (n) => {
      this._currentCursorOpacity = n, this.renderCursorOrSelection();
    } });
  }
  _tick(t) {
    this._currentTickState = this._animateCursor({ toValue: 0, duration: this.cursorDuration / 2, delay: Math.max(t || 0, 100), onComplete: this._onTickComplete });
  }
  _onTickComplete() {
    var t;
    (t = this._currentTickCompleteState) === null || t === void 0 || t.abort(), this._currentTickCompleteState = this._animateCursor({ toValue: 1, duration: this.cursorDuration, onComplete: this._tick });
  }
  initDelayedCursor(t) {
    this.abortCursorAnimation(), this._tick(t ? 0 : this.cursorDelay);
  }
  abortCursorAnimation() {
    let t = !1;
    [this._currentTickState, this._currentTickCompleteState].forEach((e) => {
      e && !e.isDone() && (t = !0, e.abort());
    }), this._currentCursorOpacity = 1, t && this.clearContextTop();
  }
  restartCursorIfNeeded() {
    [this._currentTickState, this._currentTickCompleteState].some((t) => !t || t.isDone()) && this.initDelayedCursor();
  }
  selectAll() {
    return this.selectionStart = 0, this.selectionEnd = this._text.length, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  getSelectedText() {
    return this._text.slice(this.selectionStart, this.selectionEnd).join("");
  }
  findWordBoundaryLeft(t) {
    let e = 0, s = t - 1;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s--;
    for (; /\S/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findWordBoundaryRight(t) {
    let e = 0, s = t;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s++;
    for (; /\S/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  findLineBoundaryLeft(t) {
    let e = 0, s = t - 1;
    for (; !/\n/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findLineBoundaryRight(t) {
    let e = 0, s = t;
    for (; !/\n/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  searchWordBoundary(t, e) {
    const s = this._text;
    let i = t > 0 && this._reSpace.test(s[t]) && (e === -1 || !Pi.test(s[t - 1])) ? t - 1 : t, r = s[i];
    for (; i > 0 && i < s.length && !Dr.test(r); ) i += e, r = s[i];
    return e === -1 && Dr.test(r) && i++, i;
  }
  selectWord(t) {
    t = t || this.selectionStart;
    const e = this.searchWordBoundary(t, -1), s = Math.max(e, this.searchWordBoundary(t, 1));
    this.selectionStart = e, this.selectionEnd = s, this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection();
  }
  selectLine(t) {
    t = t || this.selectionStart;
    const e = this.findLineBoundaryLeft(t), s = this.findLineBoundaryRight(t);
    return this.selectionStart = e, this.selectionEnd = s, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  enterEditing(t) {
    !this.isEditing && this.editable && (this.enterEditingImpl(), this.fire("editing:entered", t ? { e: t } : void 0), this._fireSelectionChanged(), this.canvas && (this.canvas.fire("text:editing:entered", { target: this, e: t }), this.canvas.requestRenderAll()));
  }
  enterEditingImpl() {
    this.canvas && (this.canvas.calcOffset(), this.canvas.textEditingManager.exitTextEditing()), this.isEditing = !0, this.initHiddenTextarea(), this.hiddenTextarea.focus(), this.hiddenTextarea.value = this.text, this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._textBeforeEdit = this.text, this._tick();
  }
  updateSelectionOnMouseMove(t) {
    if (this.getActiveControl()) return;
    const e = this.hiddenTextarea;
    Mt(e).activeElement !== e && e.focus();
    const s = this.getSelectionStartFromPointer(t), i = this.selectionStart, r = this.selectionEnd;
    (s === this.__selectionStartOnMouseDown && i !== r || i !== s && r !== s) && (s > this.__selectionStartOnMouseDown ? (this.selectionStart = this.__selectionStartOnMouseDown, this.selectionEnd = s) : (this.selectionStart = s, this.selectionEnd = this.__selectionStartOnMouseDown), this.selectionStart === i && this.selectionEnd === r || (this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()));
  }
  _setEditingProps() {
    this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = !1, this.lockMovementX = this.lockMovementY = !0;
  }
  fromStringToGraphemeSelection(t, e, s) {
    const i = s.slice(0, t), r = this.graphemeSplit(i).length;
    if (t === e) return { selectionStart: r, selectionEnd: r };
    const n = s.slice(t, e);
    return { selectionStart: r, selectionEnd: r + this.graphemeSplit(n).length };
  }
  fromGraphemeToStringSelection(t, e, s) {
    const i = s.slice(0, t).join("").length;
    return t === e ? { selectionStart: i, selectionEnd: i } : { selectionStart: i, selectionEnd: i + s.slice(t, e).join("").length };
  }
  _updateTextarea() {
    if (this.cursorOffsetCache = {}, this.hiddenTextarea) {
      if (!this.inCompositionMode) {
        const t = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
        this.hiddenTextarea.selectionStart = t.selectionStart, this.hiddenTextarea.selectionEnd = t.selectionEnd;
      }
      this.updateTextareaPosition();
    }
  }
  updateFromTextArea() {
    if (!this.hiddenTextarea) return;
    this.cursorOffsetCache = {};
    const t = this.hiddenTextarea;
    this.text = t.value, this.set("dirty", !0), this.initDimensions(), this.setCoords();
    const e = this.fromStringToGraphemeSelection(t.selectionStart, t.selectionEnd, t.value);
    this.selectionEnd = this.selectionStart = e.selectionEnd, this.inCompositionMode || (this.selectionStart = e.selectionStart), this.updateTextareaPosition();
  }
  updateTextareaPosition() {
    if (this.selectionStart === this.selectionEnd) {
      const t = this._calcTextareaPosition();
      this.hiddenTextarea.style.left = t.left, this.hiddenTextarea.style.top = t.top;
    }
  }
  _calcTextareaPosition() {
    if (!this.canvas) return { left: "1px", top: "1px" };
    const t = this.inCompositionMode ? this.compositionStart : this.selectionStart, e = this._getCursorBoundaries(t), s = this.get2DCursorLocation(t), i = s.lineIndex, r = s.charIndex, n = this.getValueOfPropertyAt(i, r, "fontSize") * this.lineHeight, o = e.leftOffset, h = this.getCanvasRetinaScaling(), c = this.canvas.upperCanvasEl, l = c.width / h, u = c.height / h, d = l - n, g = u - n, f = new w(e.left + o, e.top + e.topOffset + n).transform(this.calcTransformMatrix()).transform(this.canvas.viewportTransform).multiply(new w(c.clientWidth / l, c.clientHeight / u));
    return f.x < 0 && (f.x = 0), f.x > d && (f.x = d), f.y < 0 && (f.y = 0), f.y > g && (f.y = g), f.x += this.canvas._offset.left, f.y += this.canvas._offset.top, { left: "".concat(f.x, "px"), top: "".concat(f.y, "px"), fontSize: "".concat(n, "px"), charHeight: n };
  }
  _saveEditingProps() {
    this._savedProps = { hasControls: this.hasControls, borderColor: this.borderColor, lockMovementX: this.lockMovementX, lockMovementY: this.lockMovementY, hoverCursor: this.hoverCursor, selectable: this.selectable, defaultCursor: this.canvas && this.canvas.defaultCursor, moveCursor: this.canvas && this.canvas.moveCursor };
  }
  _restoreEditingProps() {
    this._savedProps && (this.hoverCursor = this._savedProps.hoverCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.selectable = this._savedProps.selectable, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor || this.canvas.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor || this.canvas.moveCursor), delete this._savedProps);
  }
  _exitEditing() {
    const t = this.hiddenTextarea;
    this.selected = !1, this.isEditing = !1, t && (t.blur && t.blur(), t.parentNode && t.parentNode.removeChild(t)), this.hiddenTextarea = null, this.abortCursorAnimation(), this.selectionStart !== this.selectionEnd && this.clearContextTop();
  }
  exitEditingImpl() {
    this._exitEditing(), this.selectionEnd = this.selectionStart, this._restoreEditingProps(), this._forceClearCache && (this.initDimensions(), this.setCoords());
  }
  exitEditing() {
    const t = this._textBeforeEdit !== this.text;
    return this.exitEditingImpl(), this.fire("editing:exited"), t && this.fire(Ps), this.canvas && (this.canvas.fire("text:editing:exited", { target: this }), t && this.canvas.fire("object:modified", { target: this })), this;
  }
  _removeExtraneousStyles() {
    for (const t in this.styles) this._textLines[t] || delete this.styles[t];
  }
  removeStyleFromTo(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t, !0), { lineIndex: r, charIndex: n } = this.get2DCursorLocation(e, !0);
    if (s !== r) {
      if (this.styles[s]) for (let o = i; o < this._unwrappedTextLines[s].length; o++) delete this.styles[s][o];
      if (this.styles[r]) for (let o = n; o < this._unwrappedTextLines[r].length; o++) {
        const h = this.styles[r][o];
        h && (this.styles[s] || (this.styles[s] = {}), this.styles[s][i + o - n] = h);
      }
      for (let o = s + 1; o <= r; o++) delete this.styles[o];
      this.shiftLineStyles(r, s - r);
    } else if (this.styles[s]) {
      const o = this.styles[s], h = n - i;
      for (let c = i; c < n; c++) delete o[c];
      for (const c in this.styles[s]) {
        const l = parseInt(c, 10);
        l >= n && (o[l - h] = o[c], delete o[c]);
      }
    }
  }
  shiftLineStyles(t, e) {
    const s = Object.assign({}, this.styles);
    for (const i in this.styles) {
      const r = parseInt(i, 10);
      r > t && (this.styles[r + e] = s[r], s[r - e] || delete this.styles[r]);
    }
  }
  insertNewlineStyleObject(t, e, s, i) {
    const r = {}, n = this._unwrappedTextLines[t].length, o = n === e;
    let h = !1;
    s || (s = 1), this.shiftLineStyles(t, s);
    const c = this.styles[t] ? this.styles[t][e === 0 ? e : e - 1] : void 0;
    for (const u in this.styles[t]) {
      const d = parseInt(u, 10);
      d >= e && (h = !0, r[d - e] = this.styles[t][u], o && e === 0 || delete this.styles[t][u]);
    }
    let l = !1;
    for (h && !o && (this.styles[t + s] = r, l = !0), (l || n > e) && s--; s > 0; ) i && i[s - 1] ? this.styles[t + s] = { 0: y({}, i[s - 1]) } : c ? this.styles[t + s] = { 0: y({}, c) } : delete this.styles[t + s], s--;
    this._forceClearCache = !0;
  }
  insertCharStyleObject(t, e, s, i) {
    this.styles || (this.styles = {});
    const r = this.styles[t], n = r ? y({}, r) : {};
    s || (s = 1);
    for (const h in n) {
      const c = parseInt(h, 10);
      c >= e && (r[c + s] = n[c], n[c - s] || delete r[c]);
    }
    if (this._forceClearCache = !0, i) {
      for (; s--; ) Object.keys(i[s]).length && (this.styles[t] || (this.styles[t] = {}), this.styles[t][e + s] = y({}, i[s]));
      return;
    }
    if (!r) return;
    const o = r[e ? e - 1 : 1];
    for (; o && s--; ) this.styles[t][e + s] = y({}, o);
  }
  insertNewStyleBlock(t, e, s) {
    const i = this.get2DCursorLocation(e, !0), r = [0];
    let n, o = 0;
    for (let h = 0; h < t.length; h++) t[h] === `
` ? (o++, r[o] = 0) : r[o]++;
    for (r[0] > 0 && (this.insertCharStyleObject(i.lineIndex, i.charIndex, r[0], s), s = s && s.slice(r[0] + 1)), o && this.insertNewlineStyleObject(i.lineIndex, i.charIndex + r[0], o), n = 1; n < o; n++) r[n] > 0 ? this.insertCharStyleObject(i.lineIndex + n, 0, r[n], s) : s && this.styles[i.lineIndex + n] && s[0] && (this.styles[i.lineIndex + n][0] = s[0]), s = s && s.slice(r[n] + 1);
    r[n] > 0 && this.insertCharStyleObject(i.lineIndex + n, 0, r[n], s);
  }
  removeChars(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t + 1;
    this.removeStyleFromTo(t, e), this._text.splice(t, e - t), this.text = this._text.join(""), this.set("dirty", !0), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  insertChars(t, e, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s;
    i > s && this.removeStyleFromTo(s, i);
    const r = this.graphemeSplit(t);
    this.insertNewStyleBlock(r, s, e), this._text = [...this._text.slice(0, s), ...r, ...this._text.slice(i)], this.text = this._text.join(""), this.set("dirty", !0), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  setSelectionStartEndWithShift(t, e, s) {
    s <= t ? (e === t ? this._selectionDirection = I : this._selectionDirection === q && (this._selectionDirection = I, this.selectionEnd = t), this.selectionStart = s) : s > t && s < e ? this._selectionDirection === q ? this.selectionEnd = s : this.selectionStart = s : (e === t ? this._selectionDirection = q : this._selectionDirection === I && (this._selectionDirection = q, this.selectionStart = e), this.selectionEnd = s);
  }
}
class wh extends xh {
  initHiddenTextarea() {
    const t = this.canvas && Mt(this.canvas.getElement()) || Me(), e = t.createElement("textarea");
    Object.entries({ autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "data-fabric": "textarea", wrap: "off" }).map((n) => {
      let [o, h] = n;
      return e.setAttribute(o, h);
    });
    const { top: s, left: i, fontSize: r } = this._calcTextareaPosition();
    e.style.cssText = "position: absolute; top: ".concat(s, "; left: ").concat(i, "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ").concat(r, ";"), (this.hiddenTextareaContainer || t.body).appendChild(e), Object.entries({ blur: "blur", keydown: "onKeyDown", keyup: "onKeyUp", input: "onInput", copy: "copy", cut: "copy", paste: "paste", compositionstart: "onCompositionStart", compositionupdate: "onCompositionUpdate", compositionend: "onCompositionEnd" }).map((n) => {
      let [o, h] = n;
      return e.addEventListener(o, this[h].bind(this));
    }), this.hiddenTextarea = e;
  }
  blur() {
    this.abortCursorAnimation();
  }
  onKeyDown(t) {
    if (!this.isEditing) return;
    const e = this.direction === "rtl" ? this.keysMapRtl : this.keysMap;
    if (t.keyCode in e) this[e[t.keyCode]](t);
    else {
      if (!(t.keyCode in this.ctrlKeysMapDown) || !t.ctrlKey && !t.metaKey) return;
      this[this.ctrlKeysMapDown[t.keyCode]](t);
    }
    t.stopImmediatePropagation(), t.preventDefault(), t.keyCode >= 33 && t.keyCode <= 40 ? (this.inCompositionMode = !1, this.clearContextTop(), this.renderCursorOrSelection()) : this.canvas && this.canvas.requestRenderAll();
  }
  onKeyUp(t) {
    !this.isEditing || this._copyDone || this.inCompositionMode ? this._copyDone = !1 : t.keyCode in this.ctrlKeysMapUp && (t.ctrlKey || t.metaKey) && (this[this.ctrlKeysMapUp[t.keyCode]](t), t.stopImmediatePropagation(), t.preventDefault(), this.canvas && this.canvas.requestRenderAll());
  }
  onInput(t) {
    const e = this.fromPaste;
    if (this.fromPaste = !1, t && t.stopPropagation(), !this.isEditing) return;
    const s = () => {
      this.updateFromTextArea(), this.fire(Ls), this.canvas && (this.canvas.fire("text:changed", { target: this }), this.canvas.requestRenderAll());
    };
    if (this.hiddenTextarea.value === "") return this.styles = {}, void s();
    const i = this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText, r = this._text.length, n = i.length, o = this.selectionStart, h = this.selectionEnd, c = o !== h;
    let l, u, d, g, f = n - r;
    const v = this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart, this.hiddenTextarea.selectionEnd, this.hiddenTextarea.value), x = o > v.selectionStart;
    c ? (u = this._text.slice(o, h), f += h - o) : n < r && (u = x ? this._text.slice(h + f, h) : this._text.slice(o, o - f));
    const b = i.slice(v.selectionEnd - f, v.selectionEnd);
    if (u && u.length && (b.length && (l = this.getSelectionStyles(o, o + 1, !1), l = b.map(() => l[0])), c ? (d = o, g = h) : x ? (d = h - u.length, g = h) : (d = h, g = h + u.length), this.removeStyleFromTo(d, g)), b.length) {
      const { copyPasteData: C } = zt();
      e && b.join("") === C.copiedText && !j.disableStyleCopyPaste && (l = C.copiedTextStyle), this.insertNewStyleBlock(b, o, l);
    }
    s();
  }
  onCompositionStart() {
    this.inCompositionMode = !0;
  }
  onCompositionEnd() {
    this.inCompositionMode = !1;
  }
  onCompositionUpdate(t) {
    let { target: e } = t;
    const { selectionStart: s, selectionEnd: i } = e;
    this.compositionStart = s, this.compositionEnd = i, this.updateTextareaPosition();
  }
  copy() {
    if (this.selectionStart === this.selectionEnd) return;
    const { copyPasteData: t } = zt();
    t.copiedText = this.getSelectedText(), j.disableStyleCopyPaste ? t.copiedTextStyle = void 0 : t.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, !0), this._copyDone = !0;
  }
  paste() {
    this.fromPaste = !0;
  }
  _getWidthBeforeCursor(t, e) {
    let s, i = this._getLineLeftOffset(t);
    return e > 0 && (s = this.__charBounds[t][e - 1], i += s.left + s.width), i;
  }
  getDownCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), i = this.get2DCursorLocation(s), r = i.lineIndex;
    if (r === this._textLines.length - 1 || t.metaKey || t.keyCode === 34) return this._text.length - s;
    const n = i.charIndex, o = this._getWidthBeforeCursor(r, n), h = this._getIndexOnLine(r + 1, o);
    return this._textLines[r].slice(n).length + h + 1 + this.missingNewlineOffset(r);
  }
  _getSelectionForOffset(t, e) {
    return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart;
  }
  getUpCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), i = this.get2DCursorLocation(s), r = i.lineIndex;
    if (r === 0 || t.metaKey || t.keyCode === 33) return -s;
    const n = i.charIndex, o = this._getWidthBeforeCursor(r, n), h = this._getIndexOnLine(r - 1, o), c = this._textLines[r].slice(0, n), l = this.missingNewlineOffset(r - 1);
    return -this._textLines[r - 1].length + h - c.length + (1 - l);
  }
  _getIndexOnLine(t, e) {
    const s = this._textLines[t];
    let i, r, n = this._getLineLeftOffset(t), o = 0;
    for (let h = 0, c = s.length; h < c; h++) if (i = this.__charBounds[t][h].width, n += i, n > e) {
      r = !0;
      const l = n - i, u = n, d = Math.abs(l - e);
      o = Math.abs(u - e) < d ? h : h - 1;
      break;
    }
    return r || (o = s.length - 1), o;
  }
  moveCursorDown(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t);
  }
  moveCursorUp(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorUpOrDown("Up", t);
  }
  _moveCursorUpOrDown(t, e) {
    const s = this["get".concat(t, "CursorOffset")](e, this._selectionDirection === q);
    if (e.shiftKey ? this.moveCursorWithShift(s) : this.moveCursorWithoutShift(s), s !== 0) {
      const i = this.text.length;
      this.selectionStart = ke(0, this.selectionStart, i), this.selectionEnd = ke(0, this.selectionEnd, i), this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea();
    }
  }
  moveCursorWithShift(t) {
    const e = this._selectionDirection === I ? this.selectionStart + t : this.selectionEnd + t;
    return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e), t !== 0;
  }
  moveCursorWithoutShift(t) {
    return t < 0 ? (this.selectionStart += t, this.selectionEnd = this.selectionStart) : (this.selectionEnd += t, this.selectionStart = this.selectionEnd), t !== 0;
  }
  moveCursorLeft(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorLeftOrRight("Left", t);
  }
  _move(t, e, s) {
    let i;
    if (t.altKey) i = this["findWordBoundary".concat(s)](this[e]);
    else {
      if (!t.metaKey && t.keyCode !== 35 && t.keyCode !== 36) return this[e] += s === "Left" ? -1 : 1, !0;
      i = this["findLineBoundary".concat(s)](this[e]);
    }
    return i !== void 0 && this[e] !== i && (this[e] = i, !0);
  }
  _moveLeft(t, e) {
    return this._move(t, e, "Left");
  }
  _moveRight(t, e) {
    return this._move(t, e, "Right");
  }
  moveCursorLeftWithoutShift(t) {
    let e = !0;
    return this._selectionDirection = I, this.selectionEnd === this.selectionStart && this.selectionStart !== 0 && (e = this._moveLeft(t, "selectionStart")), this.selectionEnd = this.selectionStart, e;
  }
  moveCursorLeftWithShift(t) {
    return this._selectionDirection === q && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : this.selectionStart !== 0 ? (this._selectionDirection = I, this._moveLeft(t, "selectionStart")) : void 0;
  }
  moveCursorRight(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t);
  }
  _moveCursorLeftOrRight(t, e) {
    const s = "moveCursor".concat(t).concat(e.shiftKey ? "WithShift" : "WithoutShift");
    this._currentCursorOpacity = 1, this[s](e) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea());
  }
  moveCursorRightWithShift(t) {
    return this._selectionDirection === I && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = q, this._moveRight(t, "selectionEnd")) : void 0;
  }
  moveCursorRightWithoutShift(t) {
    let e = !0;
    return this._selectionDirection = q, this.selectionStart === this.selectionEnd ? (e = this._moveRight(t, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e;
  }
}
const ui = (a) => !!a.button;
class bh extends wh {
  constructor() {
    super(...arguments), m(this, "draggableTextDelegate", void 0);
  }
  initBehavior() {
    this.on("mousedown", this._mouseDownHandler), this.on("mousedown:before", this._mouseDownHandlerBefore), this.on("mouseup", this.mouseUpHandler), this.on("mousedblclick", this.doubleClickHandler), this.on("tripleclick", this.tripleClickHandler), this.__lastClickTime = +/* @__PURE__ */ new Date(), this.__lastLastClickTime = +/* @__PURE__ */ new Date(), this.__lastPointer = {}, this.on("mousedown", this.onMouseDown), this.draggableTextDelegate = new yh(this), super.initBehavior();
  }
  shouldStartDragging() {
    return this.draggableTextDelegate.isActive();
  }
  onDragStart(t) {
    return this.draggableTextDelegate.onDragStart(t);
  }
  canDrop(t) {
    return this.draggableTextDelegate.canDrop(t);
  }
  onMouseDown(t) {
    if (!this.canvas) return;
    this.__newClickTime = +/* @__PURE__ */ new Date();
    const e = t.pointer;
    this.isTripleClick(e) && (this.fire("tripleclick", t), xi(t.e)), this.__lastLastClickTime = this.__lastClickTime, this.__lastClickTime = this.__newClickTime, this.__lastPointer = e, this.__lastSelected = this.selected && !this.getActiveControl();
  }
  isTripleClick(t) {
    return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === t.x && this.__lastPointer.y === t.y;
  }
  doubleClickHandler(t) {
    this.isEditing && this.selectWord(this.getSelectionStartFromPointer(t.e));
  }
  tripleClickHandler(t) {
    this.isEditing && this.selectLine(this.getSelectionStartFromPointer(t.e));
  }
  _mouseDownHandler(t) {
    let { e } = t;
    this.canvas && this.editable && !ui(e) && !this.getActiveControl() && (this.draggableTextDelegate.start(e) || (this.canvas.textEditingManager.register(this), this.selected && (this.inCompositionMode = !1, this.setCursorByClick(e)), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection())));
  }
  _mouseDownHandlerBefore(t) {
    let { e } = t;
    this.canvas && this.editable && !ui(e) && (this.selected = this === this.canvas._activeObject);
  }
  mouseUpHandler(t) {
    let { e, transform: s } = t;
    const i = this.draggableTextDelegate.end(e);
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this);
      const r = this.canvas._activeObject;
      if (r && r !== this) return;
    }
    !this.editable || this.group && !this.group.interactive || s && s.actionPerformed || ui(e) || i || (this.__lastSelected && !this.getActiveControl() ? (this.selected = !1, this.__lastSelected = !1, this.enterEditing(e), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(!0) : this.renderCursorOrSelection()) : this.selected = !0);
  }
  setCursorByClick(t) {
    const e = this.getSelectionStartFromPointer(t), s = this.selectionStart, i = this.selectionEnd;
    t.shiftKey ? this.setSelectionStartEndWithShift(s, i, e) : (this.selectionStart = e, this.selectionEnd = e), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea());
  }
  getSelectionStartFromPointer(t) {
    const e = this.canvas.getScenePoint(t).transform(Dt(this.calcTransformMatrix())).add(new w(-this._getLeftOffset(), -this._getTopOffset()));
    let s = 0, i = 0, r = 0;
    for (let c = 0; c < this._textLines.length && s <= e.y; c++) s += this.getHeightOfLine(c), r = c, c > 0 && (i += this._textLines[c - 1].length + this.missingNewlineOffset(c - 1));
    let n = Math.abs(this._getLineLeftOffset(r));
    const o = this._textLines[r].length, h = this.__charBounds[r];
    for (let c = 0; c < o; c++) {
      const l = n + h[c].kernedWidth;
      if (e.x <= l) {
        Math.abs(e.x - l) <= Math.abs(e.x - n) && i++;
        break;
      }
      n = l, i++;
    }
    return Math.min(this.flipX ? o - i : i, this._text.length);
  }
}
const ns = "moveCursorUp", os = "moveCursorDown", as = "moveCursorLeft", hs = "moveCursorRight", cs = "exitEditing", Ch = y({ selectionStart: 0, selectionEnd: 0, selectionColor: "rgba(17,119,255,0.3)", isEditing: !1, editable: !0, editingBorderColor: "rgba(102,153,255,0.25)", cursorWidth: 2, cursorColor: "", cursorDelay: 1e3, cursorDuration: 600, caching: !0, hiddenTextareaContainer: null, keysMap: { 9: cs, 27: cs, 33: ns, 34: os, 35: hs, 36: as, 37: as, 38: ns, 39: hs, 40: os }, keysMapRtl: { 9: cs, 27: cs, 33: ns, 34: os, 35: as, 36: hs, 37: hs, 38: ns, 39: as, 40: os }, ctrlKeysMapDown: { 65: "selectAll" }, ctrlKeysMapUp: { 67: "copy", 88: "cut" } }, { _selectionDirection: null, _reSpace: /\s|\r?\n/, inCompositionMode: !1 });
class At extends bh {
  static getDefaults() {
    return y(y({}, super.getDefaults()), At.ownDefaults);
  }
  get type() {
    const t = super.type;
    return t === "itext" ? "i-text" : t;
  }
  constructor(t, e) {
    super(t, y(y({}, At.ownDefaults), e)), this.initBehavior();
  }
  _set(t, e) {
    return this.isEditing && this._savedProps && t in this._savedProps ? (this._savedProps[t] = e, this) : (t === "canvas" && (this.canvas instanceof Ei && this.canvas.textEditingManager.remove(this), e instanceof Ei && e.textEditingManager.add(this)), super._set(t, e));
  }
  setSelectionStart(t) {
    t = Math.max(t, 0), this._updateAndFire("selectionStart", t);
  }
  setSelectionEnd(t) {
    t = Math.min(t, this.text.length), this._updateAndFire("selectionEnd", t);
  }
  _updateAndFire(t, e) {
    this[t] !== e && (this._fireSelectionChanged(), this[t] = e), this._updateTextarea();
  }
  _fireSelectionChanged() {
    this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", { target: this });
  }
  initDimensions() {
    this.isEditing && this.initDelayedCursor(), super.initDimensions();
  }
  getSelectionStyles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart || 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionEnd, s = arguments.length > 2 ? arguments[2] : void 0;
    return super.getSelectionStyles(t, e, s);
  }
  setSelectionStyles(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionStart || 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.selectionEnd;
    return super.setSelectionStyles(t, e, s);
  }
  get2DCursorLocation() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    return super.get2DCursorLocation(t, e);
  }
  render(t) {
    super.render(t), this.cursorOffsetCache = {}, this.renderCursorOrSelection();
  }
  toCanvasElement(t) {
    const e = this.isEditing;
    this.isEditing = !1;
    const s = super.toCanvasElement(t);
    return this.isEditing = e, s;
  }
  renderCursorOrSelection() {
    if (!this.isEditing) return;
    const t = this.clearContextTop(!0);
    if (!t) return;
    const e = this._getCursorBoundaries();
    this.selectionStart !== this.selectionEnd || this.inCompositionMode ? this.renderSelection(t, e) : this.renderCursor(t, e), this.canvas.contextTopDirty = !0, t.restore();
  }
  _getCursorBoundaries() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    const s = this._getLeftOffset(), i = this._getTopOffset(), r = this._getCursorBoundariesOffsets(t, e);
    return { left: s, top: i, leftOffset: r.left, topOffset: r.top };
  }
  _getCursorBoundariesOffsets(t, e) {
    return e ? this.__getCursorBoundariesOffsets(t) : this.cursorOffsetCache && "top" in this.cursorOffsetCache ? this.cursorOffsetCache : this.cursorOffsetCache = this.__getCursorBoundariesOffsets(t);
  }
  __getCursorBoundariesOffsets(t) {
    let e = 0, s = 0;
    const { charIndex: i, lineIndex: r } = this.get2DCursorLocation(t);
    for (let c = 0; c < r; c++) e += this.getHeightOfLine(c);
    const n = this._getLineLeftOffset(r), o = this.__charBounds[r][i];
    o && (s = o.left), this.charSpacing !== 0 && i === this._textLines[r].length && (s -= this._getWidthOfCharSpacing());
    const h = { top: e, left: n + (s > 0 ? s : 0) };
    return this.direction === "rtl" && (this.textAlign === q || this.textAlign === Ft || this.textAlign === Ye ? h.left *= -1 : this.textAlign === I || this.textAlign === Vs ? h.left = n - (s > 0 ? s : 0) : this.textAlign !== R && this.textAlign !== He || (h.left = n - (s > 0 ? s : 0))), h;
  }
  renderCursorAt(t) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t, !0), t);
  }
  renderCursor(t, e) {
    this._renderCursor(t, e, this.selectionStart);
  }
  getCursorRenderingData() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._getCursorBoundaries(t);
    const s = this.get2DCursorLocation(t), i = s.lineIndex, r = s.charIndex > 0 ? s.charIndex - 1 : 0, n = this.getValueOfPropertyAt(i, r, "fontSize"), o = this.getObjectScaling().x * this.canvas.getZoom(), h = this.cursorWidth / o, c = this.getValueOfPropertyAt(i, r, "deltaY"), l = e.topOffset + (1 - this._fontSizeFraction) * this.getHeightOfLine(i) / this.lineHeight - n * (1 - this._fontSizeFraction);
    return { color: this.cursorColor || this.getValueOfPropertyAt(i, r, "fill"), opacity: this._currentCursorOpacity, left: e.left + e.leftOffset - h / 2, top: l + e.top + c, width: h, height: n };
  }
  _renderCursor(t, e, s) {
    const { color: i, opacity: r, left: n, top: o, width: h, height: c } = this.getCursorRenderingData(s, e);
    t.fillStyle = i, t.globalAlpha = r, t.fillRect(n, o, h, c);
  }
  renderSelection(t, e) {
    const s = { selectionStart: this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, selectionEnd: this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd };
    this._renderSelection(t, s, e);
  }
  renderDragSourceEffect() {
    const t = this.draggableTextDelegate.getDragStartSelection();
    this._renderSelection(this.canvas.contextTop, t, this._getCursorBoundaries(t.selectionStart, !0));
  }
  renderDropTargetEffect(t) {
    const e = this.getSelectionStartFromPointer(t);
    this.renderCursorAt(e);
  }
  _renderSelection(t, e, s) {
    const i = e.selectionStart, r = e.selectionEnd, n = this.textAlign.includes(Ft), o = this.get2DCursorLocation(i), h = this.get2DCursorLocation(r), c = o.lineIndex, l = h.lineIndex, u = o.charIndex < 0 ? 0 : o.charIndex, d = h.charIndex < 0 ? 0 : h.charIndex;
    for (let g = c; g <= l; g++) {
      const f = this._getLineLeftOffset(g) || 0;
      let v = this.getHeightOfLine(g), x = 0, b = 0, C = 0;
      if (g === c && (b = this.__charBounds[c][u].left), g >= c && g < l) C = n && !this.isEndOfWrapping(g) ? this.width : this.getLineWidth(g) || 5;
      else if (g === l) if (d === 0) C = this.__charBounds[l][d].left;
      else {
        const A = this._getWidthOfCharSpacing();
        C = this.__charBounds[l][d - 1].left + this.__charBounds[l][d - 1].width - A;
      }
      x = v, (this.lineHeight < 1 || g === l && this.lineHeight > 1) && (v /= this.lineHeight);
      let _ = s.left + f + b, S = v, k = 0;
      const M = C - b;
      this.inCompositionMode ? (t.fillStyle = this.compositionColor || "black", S = 1, k = v) : t.fillStyle = this.selectionColor, this.direction === "rtl" && (this.textAlign === q || this.textAlign === Ft || this.textAlign === Ye ? _ = this.width - _ - M : this.textAlign === I || this.textAlign === Vs ? _ = s.left + f - C : this.textAlign !== R && this.textAlign !== He || (_ = s.left + f - C)), t.fillRect(_, s.top + s.topOffset + k, M, S), s.topOffset += x;
    }
  }
  getCurrentCharFontSize() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, "fontSize");
  }
  getCurrentCharColor() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, Z);
  }
  _getCurrentCharIndex() {
    const t = this.get2DCursorLocation(this.selectionStart, !0), e = t.charIndex > 0 ? t.charIndex - 1 : 0;
    return { l: t.lineIndex, c: e };
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose();
  }
}
m(At, "ownDefaults", Ch), m(At, "type", "IText"), T.setClass(At), T.setClass(At, "i-text");
class he extends At {
  static getDefaults() {
    return y(y({}, super.getDefaults()), he.ownDefaults);
  }
  constructor(t, e) {
    super(t, y(y({}, he.ownDefaults), e));
  }
  static createControls() {
    return { controls: Jo() };
  }
  initDimensions() {
    this.initialized && (this.isEditing && this.initDelayedCursor(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this.textAlign.includes(Ft) && this.enlargeSpaces(), this.height = this.calcTextHeight());
  }
  _generateStyleMap(t) {
    let e = 0, s = 0, i = 0;
    const r = {};
    for (let n = 0; n < t.graphemeLines.length; n++) t.graphemeText[i] === `
` && n > 0 ? (s = 0, i++, e++) : !this.splitByGrapheme && this._reSpaceAndTab.test(t.graphemeText[i]) && n > 0 && (s++, i++), r[n] = { line: e, offset: s }, i += t.graphemeLines[n].length, s += t.graphemeLines[n].length;
    return r;
  }
  styleHas(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[e];
      s && (e = s.line);
    }
    return super.styleHas(t, e);
  }
  isEmptyStyles(t) {
    if (!this.styles) return !0;
    let e, s = 0, i = t + 1, r = !1;
    const n = this._styleMap[t], o = this._styleMap[t + 1];
    n && (t = n.line, s = n.offset), o && (i = o.line, r = i === t, e = o.offset);
    const h = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const c in h) for (const l in h[c]) {
      const u = parseInt(l, 10);
      if (u >= s && (!r || u < e)) for (const d in h[c][l]) return !1;
    }
    return !0;
  }
  _getStyleDeclaration(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[t];
      if (!s) return {};
      t = s.line, e = s.offset + e;
    }
    return super._getStyleDeclaration(t, e);
  }
  _setStyleDeclaration(t, e, s) {
    const i = this._styleMap[t];
    super._setStyleDeclaration(i.line, i.offset + e, s);
  }
  _deleteStyleDeclaration(t, e) {
    const s = this._styleMap[t];
    super._deleteStyleDeclaration(s.line, s.offset + e);
  }
  _getLineStyle(t) {
    const e = this._styleMap[t];
    return !!this.styles[e.line];
  }
  _setLineStyle(t) {
    const e = this._styleMap[t];
    super._setLineStyle(e.line);
  }
  _wrapText(t, e) {
    this.isWrapping = !0;
    const s = this.getGraphemeDataForRender(t), i = [];
    for (let r = 0; r < s.wordsData.length; r++) i.push(...this._wrapLine(r, e, s));
    return this.isWrapping = !1, i;
  }
  getGraphemeDataForRender(t) {
    const e = this.splitByGrapheme, s = e ? "" : " ";
    let i = 0;
    return { wordsData: t.map((r, n) => {
      let o = 0;
      const h = e ? this.graphemeSplit(r) : this.wordSplit(r);
      return h.length === 0 ? [{ word: [], width: 0 }] : h.map((c) => {
        const l = e ? [c] : this.graphemeSplit(c), u = this._measureWord(l, n, o);
        return i = Math.max(u, i), o += l.length + s.length, { word: l, width: u };
      });
    }), largestWordWidth: i };
  }
  _measureWord(t, e) {
    let s, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = 0;
    for (let n = 0, o = t.length; n < o; n++)
      r += this._getGraphemeBox(t[n], e, n + i, s, !0).kernedWidth, s = t[n];
    return r;
  }
  wordSplit(t) {
    return t.split(this._wordJoiners);
  }
  _wrapLine(t, e, s) {
    let { largestWordWidth: i, wordsData: r } = s, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    const o = this._getWidthOfCharSpacing(), h = this.splitByGrapheme, c = [], l = h ? "" : " ";
    let u = 0, d = [], g = 0, f = 0, v = !0;
    e -= n;
    const x = Math.max(e, i, this.dynamicMinWidth), b = r[t];
    let C;
    for (g = 0, C = 0; C < b.length; C++) {
      const { word: _, width: S } = b[C];
      g += _.length, u += f + S - o, u > x && !v ? (c.push(d), d = [], u = S, v = !0) : u += o, v || h || d.push(l), d = d.concat(_), f = h ? 0 : this._measureWord([l], t, g), g++, v = !1;
    }
    return C && c.push(d), i + n > this.dynamicMinWidth && (this.dynamicMinWidth = i - o + n), c;
  }
  isEndOfWrapping(t) {
    return !this._styleMap[t + 1] || this._styleMap[t + 1].line !== this._styleMap[t].line;
  }
  missingNewlineOffset(t, e) {
    return this.splitByGrapheme && !e ? this.isEndOfWrapping(t) ? 1 : 0 : 1;
  }
  _splitTextIntoLines(t) {
    const e = super._splitTextIntoLines(t), s = this._wrapText(e.lines, this.width), i = new Array(s.length);
    for (let r = 0; r < s.length; r++) i[r] = s[r].join("");
    return e.lines = i, e.graphemeLines = s, e;
  }
  getMinWidth() {
    return Math.max(this.minWidth, this.dynamicMinWidth);
  }
  _removeExtraneousStyles() {
    const t = /* @__PURE__ */ new Map();
    for (const e in this._styleMap) {
      const s = parseInt(e, 10);
      if (this._textLines[s]) {
        const i = this._styleMap[e].line;
        t.set("".concat(i), !0);
      }
    }
    for (const e in this.styles) t.has(e) || delete this.styles[e];
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject(["minWidth", "splitByGrapheme", ...t]);
  }
}
m(he, "type", "Textbox"), m(he, "textLayoutProperties", [...At.textLayoutProperties, "width"]), m(he, "ownDefaults", { minWidth: 20, dynamicMinWidth: 2, lockScalingFlip: !0, noScaleCache: !1, _wordJoiners: /[ \t\r]/, splitByGrapheme: !1 }), T.setClass(he);
class Ar extends $s {
  shouldPerformLayout(t) {
    return !!t.target.clipPath && super.shouldPerformLayout(t);
  }
  shouldLayoutClipPath() {
    return !1;
  }
  calcLayoutResult(t, e) {
    const { target: s } = t, { clipPath: i, group: r } = s;
    if (!i || !this.shouldPerformLayout(t)) return;
    const { width: n, height: o } = Vt(vn(s, i)), h = new w(n, o);
    if (i.absolutePositioned)
      return { center: Oe(i.getRelativeCenterPoint(), void 0, r ? r.calcTransformMatrix() : void 0), size: h };
    {
      const c = i.getRelativeCenterPoint().transform(s.calcOwnMatrix(), !0);
      if (this.shouldPerformLayout(t)) {
        const { center: l = new w(), correction: u = new w() } = this.calcBoundingBox(e, t) || {};
        return { center: l.add(c), correction: u.subtract(c), size: h };
      }
      return { center: s.getRelativeCenterPoint().add(c), size: h };
    }
  }
}
m(Ar, "type", "clip-path"), T.setClass(Ar);
class Rr extends $s {
  getInitialSize(t, e) {
    let { target: s } = t, { size: i } = e;
    return new w(s.width || i.x, s.height || i.y);
  }
}
m(Rr, "type", "fixed"), T.setClass(Rr);
class _h extends qe {
  subscribeTargets(t) {
    const e = t.target;
    t.targets.reduce((s, i) => (i.parent && s.add(i.parent), s), /* @__PURE__ */ new Set()).forEach((s) => {
      s.layoutManager.subscribeTargets({ target: s, targets: [e] });
    });
  }
  unsubscribeTargets(t) {
    const e = t.target, s = e.getObjects();
    t.targets.reduce((i, r) => (r.parent && i.add(r.parent), i), /* @__PURE__ */ new Set()).forEach((i) => {
      !s.some((r) => r.parent === i) && i.layoutManager.unsubscribeTargets({ target: i, targets: [e] });
    });
  }
}
class ce extends le {
  static getDefaults() {
    return y(y({}, super.getDefaults()), ce.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, ce.ownDefaults), this.setOptions(e);
    const { left: s, top: i, layoutManager: r } = e;
    this.groupInit(t, { left: s, top: i, layoutManager: r ?? new _h() });
  }
  _shouldSetNestedCoords() {
    return !0;
  }
  __objectSelectionMonitor() {
  }
  multiSelectAdd() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    this.multiSelectionStacking === "selection-order" ? this.add(...e) : e.forEach((i) => {
      const r = this._objects.findIndex((o) => o.isInFrontOf(i)), n = r === -1 ? this.size() : r;
      this.insertAt(n, i);
    });
  }
  canEnterGroup(t) {
    return this.getObjects().some((e) => e.isDescendantOf(t) || t.isDescendantOf(e)) ? ($t("error", "ActiveSelection: circular object trees are not supported, this call has no effect"), !1) : super.canEnterGroup(t);
  }
  enterGroup(t, e) {
    t.parent && t.parent === t.group ? t.parent._exitGroup(t) : t.group && t.parent !== t.group && t.group.remove(t), this._enterGroup(t, e);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t.parent && t.parent._enterGroup(t, !0);
  }
  _onAfterObjectsChange(t, e) {
    super._onAfterObjectsChange(t, e);
    const s = /* @__PURE__ */ new Set();
    e.forEach((i) => {
      const { parent: r } = i;
      r && s.add(r);
    }), t === Ji ? s.forEach((i) => {
      i._onAfterObjectsChange(Xs, e);
    }) : s.forEach((i) => {
      i._set("dirty", !0);
    });
  }
  onDeselect() {
    return this.removeAll(), !1;
  }
  toString() {
    return "#<ActiveSelection: (".concat(this.complexity(), ")>");
  }
  shouldCache() {
    return !1;
  }
  isOnACache() {
    return !1;
  }
  _renderControls(t, e, s) {
    t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    const i = y(y({ hasControls: !1 }, s), {}, { forActiveSelection: !0 });
    for (let r = 0; r < this._objects.length; r++) this._objects[r]._renderControls(t, i);
    super._renderControls(t, e), t.restore();
  }
}
m(ce, "type", "ActiveSelection"), m(ce, "ownDefaults", { multiSelectionStacking: "canvas-stacking" }), T.setClass(ce), T.setClass(ce, "activeSelection");
class Sh {
  constructor() {
    m(this, "resources", {});
  }
  applyFilters(t, e, s, i, r) {
    const n = r.getContext("2d");
    if (!n) return;
    n.drawImage(e, 0, 0, s, i);
    const o = { sourceWidth: s, sourceHeight: i, imageData: n.getImageData(0, 0, s, i), originalEl: e, originalImageData: n.getImageData(0, 0, s, i), canvasEl: r, ctx: n, filterBackend: this };
    t.forEach((c) => {
      c.applyTo(o);
    });
    const { imageData: h } = o;
    return h.width === s && h.height === i || (r.width = h.width, r.height = h.height), n.putImageData(h, 0, 0), o;
  }
}
class zn {
  constructor() {
    let { tileSize: t = j.textureSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    m(this, "aPosition", new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), m(this, "resources", {}), this.tileSize = t, this.setupGLContext(t, t), this.captureGPUInfo();
  }
  setupGLContext(t, e) {
    this.dispose(), this.createWebGLCanvas(t, e);
  }
  createWebGLCanvas(t, e) {
    const s = It({ width: t, height: e }), i = s.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, depth: !1, stencil: !1, antialias: !1 });
    i && (i.clearColor(0, 0, 0, 0), this.canvas = s, this.gl = i);
  }
  applyFilters(t, e, s, i, r, n) {
    const o = this.gl, h = r.getContext("2d");
    if (!o || !h) return;
    let c;
    n && (c = this.getCachedTexture(n, e));
    const l = { originalWidth: e.width || e.originalWidth || 0, originalHeight: e.height || e.originalHeight || 0, sourceWidth: s, sourceHeight: i, destinationWidth: s, destinationHeight: i, context: o, sourceTexture: this.createTexture(o, s, i, c ? void 0 : e), targetTexture: this.createTexture(o, s, i), originalTexture: c || this.createTexture(o, s, i, c ? void 0 : e), passes: t.length, webgl: !0, aPosition: this.aPosition, programCache: this.programCache, pass: 0, filterBackend: this, targetCanvas: r }, u = o.createFramebuffer();
    return o.bindFramebuffer(o.FRAMEBUFFER, u), t.forEach((d) => {
      d && d.applyTo(l);
    }), function(d) {
      const g = d.targetCanvas, f = g.width, v = g.height, x = d.destinationWidth, b = d.destinationHeight;
      f === x && v === b || (g.width = x, g.height = b);
    }(l), this.copyGLTo2D(o, l), o.bindTexture(o.TEXTURE_2D, null), o.deleteTexture(l.sourceTexture), o.deleteTexture(l.targetTexture), o.deleteFramebuffer(u), h.setTransform(1, 0, 0, 1, 0, 0), l;
  }
  dispose() {
    this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches();
  }
  clearWebGLCaches() {
    this.programCache = {}, this.textureCache = {};
  }
  createTexture(t, e, s, i, r) {
    const { NEAREST: n, TEXTURE_2D: o, RGBA: h, UNSIGNED_BYTE: c, CLAMP_TO_EDGE: l, TEXTURE_MAG_FILTER: u, TEXTURE_MIN_FILTER: d, TEXTURE_WRAP_S: g, TEXTURE_WRAP_T: f } = t, v = t.createTexture();
    return t.bindTexture(o, v), t.texParameteri(o, u, r || n), t.texParameteri(o, d, r || n), t.texParameteri(o, g, l), t.texParameteri(o, f, l), i ? t.texImage2D(o, 0, h, h, c, i) : t.texImage2D(o, 0, h, e, s, 0, h, c, null), v;
  }
  getCachedTexture(t, e, s) {
    const { textureCache: i } = this;
    if (i[t]) return i[t];
    {
      const r = this.createTexture(this.gl, e.width, e.height, e, s);
      return r && (i[t] = r), r;
    }
  }
  evictCachesForKey(t) {
    this.textureCache[t] && (this.gl.deleteTexture(this.textureCache[t]), delete this.textureCache[t]);
  }
  copyGLTo2D(t, e) {
    const s = t.canvas, i = e.targetCanvas, r = i.getContext("2d");
    if (!r) return;
    r.translate(0, i.height), r.scale(1, -1);
    const n = s.height - i.height;
    r.drawImage(s, 0, n, i.width, i.height, 0, 0, i.width, i.height);
  }
  copyGLTo2DPutImageData(t, e) {
    const s = e.targetCanvas.getContext("2d"), i = e.destinationWidth, r = e.destinationHeight, n = i * r * 4;
    if (!s) return;
    const o = new Uint8Array(this.imageBuffer, 0, n), h = new Uint8ClampedArray(this.imageBuffer, 0, n);
    t.readPixels(0, 0, i, r, t.RGBA, t.UNSIGNED_BYTE, o);
    const c = new ImageData(h, i, r);
    s.putImageData(c, 0, 0);
  }
  captureGPUInfo() {
    if (this.gpuInfo) return this.gpuInfo;
    const t = this.gl, e = { renderer: "", vendor: "" };
    if (!t) return e;
    const s = t.getExtension("WEBGL_debug_renderer_info");
    if (s) {
      const i = t.getParameter(s.UNMASKED_RENDERER_WEBGL), r = t.getParameter(s.UNMASKED_VENDOR_WEBGL);
      i && (e.renderer = i.toLowerCase()), r && (e.vendor = r.toLowerCase());
    }
    return this.gpuInfo = e, e;
  }
}
let di;
function Th() {
  const { WebGLProbe: a } = zt();
  return a.queryWebGL(St()), j.enableGLFiltering && a.isSupported(j.textureSize) ? new zn({ tileSize: j.textureSize }) : new Sh();
}
function gi() {
  return !di && (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && (di = Th()), di;
}
const Oh = ["filters", "resizeFilter", "src", "crossOrigin", "type"], In = ["cropX", "cropY"];
class tt extends it {
  static getDefaults() {
    return y(y({}, super.getDefaults()), tt.ownDefaults);
  }
  constructor(t, e) {
    super(), m(this, "_lastScaleX", 1), m(this, "_lastScaleY", 1), m(this, "_filterScalingX", 1), m(this, "_filterScalingY", 1), this.filters = [], Object.assign(this, tt.ownDefaults), this.setOptions(e), this.cacheKey = "texture".concat(Qt()), this.setElement(typeof t == "string" ? (this.canvas && Mt(this.canvas.getElement()) || Me()).getElementById(t) : t, e);
  }
  getElement() {
    return this._element;
  }
  setElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._element = t, this._originalElement = t, this._setWidthHeight(e), t.classList.add(tt.CSS_CANVAS), this.filters.length !== 0 && this.applyFilters(), this.resizeFilter && this.applyResizeFilters();
  }
  removeTexture(t) {
    const e = gi(!1);
    e instanceof zn && e.evictCachesForKey(t);
  }
  dispose() {
    super.dispose(), this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._cacheContext = null, ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach((t) => {
      const e = this[t];
      e && zt().dispose(e), this[t] = void 0;
    });
  }
  getCrossOrigin() {
    return this._originalElement && (this._originalElement.crossOrigin || null);
  }
  getOriginalSize() {
    const t = this.getElement();
    return t ? { width: t.naturalWidth || t.width, height: t.naturalHeight || t.height } : { width: 0, height: 0 };
  }
  _stroke(t) {
    if (!this.stroke || this.strokeWidth === 0) return;
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, -s), t.lineTo(e, -s), t.lineTo(e, s), t.lineTo(-e, s), t.lineTo(-e, -s), t.closePath();
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = [];
    return this.filters.forEach((s) => {
      s && e.push(s.toObject());
    }), y(y({}, super.toObject([...In, ...t])), {}, { src: this.getSrc(), crossOrigin: this.getCrossOrigin(), filters: e }, this.resizeFilter ? { resizeFilter: this.resizeFilter.toObject() } : {});
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height;
  }
  _toSVG() {
    const t = [], e = this._element, s = -this.width / 2, i = -this.height / 2;
    let r = [], n = [], o = "", h = "";
    if (!e) return [];
    if (this.hasCrop()) {
      const c = Qt();
      r.push('<clipPath id="imageCrop_' + c + `">
`, '	<rect x="' + s + '" y="' + i + '" width="' + this.width + '" height="' + this.height + `" />
`, `</clipPath>
`), o = ' clip-path="url(#imageCrop_' + c + ')" ';
    }
    if (this.imageSmoothing || (h = ' image-rendering="optimizeSpeed"'), t.push("	<image ", "COMMON_PARTS", 'xlink:href="'.concat(this.getSvgSrc(!0), '" x="').concat(s - this.cropX, '" y="').concat(i - this.cropY, '" width="').concat(e.width || e.naturalWidth, '" height="').concat(e.height || e.naturalHeight, '"').concat(h).concat(o, `></image>
`)), this.stroke || this.strokeDashArray) {
      const c = this.fill;
      this.fill = null, n = ['	<rect x="'.concat(s, '" y="').concat(i, '" width="').concat(this.width, '" height="').concat(this.height, '" style="').concat(this.getSvgStyles(), `" />
`)], this.fill = c;
    }
    return r = this.paintFirst !== Z ? r.concat(n, t) : r.concat(t, n), r;
  }
  getSrc(t) {
    const e = t ? this._element : this._originalElement;
    return e ? e.toDataURL ? e.toDataURL() : this.srcFromAttribute ? e.getAttribute("src") || "" : e.src : this.src || "";
  }
  getSvgSrc(t) {
    return this.getSrc(t);
  }
  setSrc(t) {
    let { crossOrigin: e, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Ds(t, { crossOrigin: e, signal: s }).then((i) => {
      e !== void 0 && this.set({ crossOrigin: e }), this.setElement(i);
    });
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>');
  }
  applyResizeFilters() {
    const t = this.resizeFilter, e = this.minimumScaleTrigger, s = this.getTotalObjectScaling(), i = s.x, r = s.y, n = this._filteredEl || this._originalElement;
    if (this.group && this.set("dirty", !0), !t || i > e && r > e) return this._element = n, this._filterScalingX = 1, this._filterScalingY = 1, this._lastScaleX = i, void (this._lastScaleY = r);
    const o = It(n), { width: h, height: c } = n;
    this._element = o, this._lastScaleX = t.scaleX = i, this._lastScaleY = t.scaleY = r, gi().applyFilters([t], n, h, c, this._element), this._filterScalingX = o.width / this._originalElement.width, this._filterScalingY = o.height / this._originalElement.height;
  }
  applyFilters() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.filters || [];
    if (t = t.filter((r) => r && !r.isNeutralState()), this.set("dirty", !0), this.removeTexture("".concat(this.cacheKey, "_filtered")), t.length === 0) return this._element = this._originalElement, this._filteredEl = void 0, this._filterScalingX = 1, void (this._filterScalingY = 1);
    const e = this._originalElement, s = e.naturalWidth || e.width, i = e.naturalHeight || e.height;
    if (this._element === this._originalElement) {
      const r = It({ width: s, height: i });
      this._element = r, this._filteredEl = r;
    } else this._filteredEl && (this._element = this._filteredEl, this._filteredEl.getContext("2d").clearRect(0, 0, s, i), this._lastScaleX = 1, this._lastScaleY = 1);
    gi().applyFilters(t, this._originalElement, s, i, this._element), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height);
  }
  _render(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, this.isMoving !== !0 && this.resizeFilter && this._needsResize() && this.applyResizeFilters(), this._stroke(t), this._renderPaintInOrder(t);
  }
  drawCacheOnCanvas(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, super.drawCacheOnCanvas(t);
  }
  shouldCache() {
    return this.needsItsOwnCache();
  }
  _renderFill(t) {
    const e = this._element;
    if (!e) return;
    const s = this._filterScalingX, i = this._filterScalingY, r = this.width, n = this.height, o = Math.max(this.cropX, 0), h = Math.max(this.cropY, 0), c = e.naturalWidth || e.width, l = e.naturalHeight || e.height, u = o * s, d = h * i, g = Math.min(r * s, c - u), f = Math.min(n * i, l - d), v = -r / 2, x = -n / 2, b = Math.min(r, c / s - o), C = Math.min(n, l / i - h);
    e && t.drawImage(e, u, d, g, f, v, x, b, C);
  }
  _needsResize() {
    const t = this.getTotalObjectScaling();
    return t.x !== this._lastScaleX || t.y !== this._lastScaleY;
  }
  _resetWidthHeight() {
    this.set(this.getOriginalSize());
  }
  _setWidthHeight() {
    let { width: t, height: e } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const s = this.getOriginalSize();
    this.width = t || s.width, this.height = e || s.height;
  }
  parsePreserveAspectRatioAttribute() {
    const t = no(this.preserveAspectRatio || ""), e = this.width, s = this.height, i = { width: e, height: s };
    let r, n = this._element.width, o = this._element.height, h = 1, c = 1, l = 0, u = 0, d = 0, g = 0;
    return !t || t.alignX === ct && t.alignY === ct ? (h = e / n, c = s / o) : (t.meetOrSlice === "meet" && (h = c = Ma(this._element, i), r = (e - n * h) / 2, t.alignX === "Min" && (l = -r), t.alignX === "Max" && (l = r), r = (s - o * c) / 2, t.alignY === "Min" && (u = -r), t.alignY === "Max" && (u = r)), t.meetOrSlice === "slice" && (h = c = Da(this._element, i), r = n - e / h, t.alignX === "Mid" && (d = r / 2), t.alignX === "Max" && (d = r), r = o - s / c, t.alignY === "Mid" && (g = r / 2), t.alignY === "Max" && (g = r), n = e / h, o = s / c)), { width: n, height: o, scaleX: h, scaleY: c, offsetLeft: l, offsetTop: u, cropX: d, cropY: g };
  }
  static fromObject(t, e) {
    let { filters: s, resizeFilter: i, src: r, crossOrigin: n, type: o } = t, h = V(t, Oh);
    return Promise.all([Ds(r, y(y({}, e), {}, { crossOrigin: n })), s && Ne(s, e), i && Ne([i], e), qs(h, e)]).then((c) => {
      let [l, u = [], [d] = [], g = {}] = c;
      return new this(l, y(y({}, h), {}, { src: r, filters: u, resizeFilter: d }, g));
    });
  }
  static fromURL(t) {
    let { crossOrigin: e = null, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 ? arguments[2] : void 0;
    return Ds(t, { crossOrigin: e, signal: s }).then((r) => new this(r, i));
  }
  static async fromElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 ? arguments[2] : void 0;
    const i = qt(t, this.ATTRIBUTE_NAMES, s);
    return this.fromURL(i["xlink:href"], e, i).catch((r) => ($t("log", "Unable to parse Image", r), null));
  }
}
m(tt, "type", "Image"), m(tt, "cacheProperties", [...Ut, ...In]), m(tt, "ownDefaults", { strokeWidth: 0, srcFromAttribute: !1, minimumScaleTrigger: 0.5, cropX: 0, cropY: 0, imageSmoothing: !0 }), m(tt, "CSS_CANVAS", "canvas-img"), m(tt, "ATTRIBUTE_NAMES", [...ee, "x", "y", "width", "height", "preserveAspectRatio", "xlink:href", "crossOrigin", "image-rendering"]), T.setClass(tt), T.setSVGClass(tt);
Js(["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"]);
const ti = (a) => a.webgl !== void 0, Zi = "precision highp float", Eh = `
    `.concat(Zi, `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`), kh = ["type"], Mh = ["type"], Dh = new RegExp(Zi, "g");
class $ {
  get type() {
    return this.constructor.type;
  }
  constructor() {
    let t = V(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, kh);
    Object.assign(this, this.constructor.defaults, t);
  }
  getFragmentSource() {
    return Eh;
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }`;
  }
  createProgram(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getFragmentSource(), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.getVertexSource();
    const { WebGLProbe: { GLPrecision: i = "highp" } } = zt();
    i !== "highp" && (e = e.replace(Dh, Zi.replace("highp", i)));
    const r = t.createShader(t.VERTEX_SHADER), n = t.createShader(t.FRAGMENT_SHADER), o = t.createProgram();
    if (!r || !n || !o) throw new Wt("Vertex, fragment shader or program creation error");
    if (t.shaderSource(r, s), t.compileShader(r), !t.getShaderParameter(r, t.COMPILE_STATUS)) throw new Wt("Vertex shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(r)));
    if (t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Wt("Fragment shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(n)));
    if (t.attachShader(o, r), t.attachShader(o, n), t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS)) throw new Wt('Shader link error for "'.concat(this.type, '" ').concat(t.getProgramInfoLog(o)));
    const h = this.getUniformLocations(t, o) || {};
    return h.uStepW = t.getUniformLocation(o, "uStepW"), h.uStepH = t.getUniformLocation(o, "uStepH"), { program: o, attributeLocations: this.getAttributeLocations(t, o), uniformLocations: h };
  }
  getAttributeLocations(t, e) {
    return { aPosition: t.getAttribLocation(e, "aPosition") };
  }
  getUniformLocations(t, e) {
    const s = this.constructor.uniformLocations, i = {};
    for (let r = 0; r < s.length; r++) i[s[r]] = t.getUniformLocation(e, s[r]);
    return i;
  }
  sendAttributeData(t, e, s) {
    const i = e.aPosition, r = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, r), t.enableVertexAttribArray(i), t.vertexAttribPointer(i, 2, t.FLOAT, !1, 0, 0), t.bufferData(t.ARRAY_BUFFER, s, t.STATIC_DRAW);
  }
  _setupFrameBuffer(t) {
    const e = t.context;
    if (t.passes > 1) {
      const s = t.destinationWidth, i = t.destinationHeight;
      t.sourceWidth === s && t.sourceHeight === i || (e.deleteTexture(t.targetTexture), t.targetTexture = t.filterBackend.createTexture(e, s, i)), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.targetTexture, 0);
    } else e.bindFramebuffer(e.FRAMEBUFFER, null), e.finish();
  }
  _swapTextures(t) {
    t.passes--, t.pass++;
    const e = t.targetTexture;
    t.targetTexture = t.sourceTexture, t.sourceTexture = e;
  }
  isNeutralState(t) {
    return !1;
  }
  applyTo(t) {
    ti(t) ? (this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
  }
  getCacheKey() {
    return this.type;
  }
  retrieveShader(t) {
    const e = this.getCacheKey();
    return t.programCache[e] || (t.programCache[e] = this.createProgram(t.context)), t.programCache[e];
  }
  applyToWebGL(t) {
    const e = t.context, s = this.retrieveShader(t);
    t.pass === 0 && t.originalTexture ? e.bindTexture(e.TEXTURE_2D, t.originalTexture) : e.bindTexture(e.TEXTURE_2D, t.sourceTexture), e.useProgram(s.program), this.sendAttributeData(e, s.attributeLocations, t.aPosition), e.uniform1f(s.uniformLocations.uStepW, 1 / t.sourceWidth), e.uniform1f(s.uniformLocations.uStepH, 1 / t.sourceHeight), this.sendUniformData(e, s.uniformLocations), e.viewport(0, 0, t.destinationWidth, t.destinationHeight), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
  }
  bindAdditionalTexture(t, e, s) {
    t.activeTexture(s), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE0);
  }
  unbindAdditionalTexture(t, e) {
    t.activeTexture(e), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE0);
  }
  sendUniformData(t, e) {
  }
  createHelpLayer(t) {
    if (!t.helpLayer) {
      const { sourceWidth: e, sourceHeight: s } = t, i = It({ width: e, height: s });
      t.helpLayer = i;
    }
  }
  toObject() {
    const t = Object.keys(this.constructor.defaults || {});
    return y({ type: this.type }, t.reduce((e, s) => (e[s] = this[s], e), {}));
  }
  toJSON() {
    return this.toObject();
  }
  static async fromObject(t, e) {
    return new this(V(t, Mh));
  }
}
m($, "type", "BaseFilter"), m($, "uniformLocations", []);
const Ah = { multiply: `gl_FragColor.rgb *= uColor.rgb;
`, screen: `gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);
`, add: `gl_FragColor.rgb += uColor.rgb;
`, difference: `gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);
`, subtract: `gl_FragColor.rgb -= uColor.rgb;
`, lighten: `gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);
`, darken: `gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);
`, exclusion: `gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);
`, overlay: `
    if (uColor.r < 0.5) {
      gl_FragColor.r *= 2.0 * uColor.r;
    } else {
      gl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);
    }
    if (uColor.g < 0.5) {
      gl_FragColor.g *= 2.0 * uColor.g;
    } else {
      gl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);
    }
    if (uColor.b < 0.5) {
      gl_FragColor.b *= 2.0 * uColor.b;
    } else {
      gl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);
    }
    `, tint: `
    gl_FragColor.rgb *= (1.0 - uColor.a);
    gl_FragColor.rgb += uColor.rgb;
    ` };
class ls extends $ {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        gl_FragColor = color;
        if (color.a > 0.0) {
          `.concat(Ah[this.mode], `
        }
      }
      `);
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = new z(this.color).getSource(), i = s[0] * this.alpha, r = s[1] * this.alpha, n = s[2] * this.alpha, o = 1 - this.alpha;
    for (let h = 0; h < e.length; h += 4) {
      const c = e[h], l = e[h + 1], u = e[h + 2];
      switch (this.mode) {
        case "multiply":
          e[h] = c * i / 255, e[h + 1] = l * r / 255, e[h + 2] = u * n / 255;
          break;
        case "screen":
          e[h] = 255 - (255 - c) * (255 - i) / 255, e[h + 1] = 255 - (255 - l) * (255 - r) / 255, e[h + 2] = 255 - (255 - u) * (255 - n) / 255;
          break;
        case "add":
          e[h] = c + i, e[h + 1] = l + r, e[h + 2] = u + n;
          break;
        case "difference":
          e[h] = Math.abs(c - i), e[h + 1] = Math.abs(l - r), e[h + 2] = Math.abs(u - n);
          break;
        case "subtract":
          e[h] = c - i, e[h + 1] = l - r, e[h + 2] = u - n;
          break;
        case "darken":
          e[h] = Math.min(c, i), e[h + 1] = Math.min(l, r), e[h + 2] = Math.min(u, n);
          break;
        case "lighten":
          e[h] = Math.max(c, i), e[h + 1] = Math.max(l, r), e[h + 2] = Math.max(u, n);
          break;
        case "overlay":
          e[h] = i < 128 ? 2 * c * i / 255 : 255 - 2 * (255 - c) * (255 - i) / 255, e[h + 1] = r < 128 ? 2 * l * r / 255 : 255 - 2 * (255 - l) * (255 - r) / 255, e[h + 2] = n < 128 ? 2 * u * n / 255 : 255 - 2 * (255 - u) * (255 - n) / 255;
          break;
        case "exclusion":
          e[h] = i + c - 2 * i * c / 255, e[h + 1] = r + l - 2 * r * l / 255, e[h + 2] = n + u - 2 * n * u / 255;
          break;
        case "tint":
          e[h] = i + c * o, e[h + 1] = r + l * o, e[h + 2] = n + u * o;
      }
    }
  }
  sendUniformData(t, e) {
    const s = new z(this.color).getSource();
    s[0] = this.alpha * s[0] / 255, s[1] = this.alpha * s[1] / 255, s[2] = this.alpha * s[2] / 255, s[3] = this.alpha, t.uniform4fv(e.uColor, s);
  }
}
m(ls, "defaults", { color: "#F95C63", mode: "multiply", alpha: 1 }), m(ls, "type", "BlendColor"), m(ls, "uniformLocations", ["uColor"]), T.setClass(ls);
const Rh = { multiply: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.rgba *= color2.rgba;
      gl_FragColor = color;
    }
    `, mask: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.a = color2.a;
      gl_FragColor = color;
    }
    ` }, jh = ["type", "image"];
class us extends $ {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Rh[this.mode];
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    uniform mat3 uTransformMatrix;
    void main() {
      vTexCoord = aPosition;
      vTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
    `;
  }
  applyToWebGL(t) {
    const e = t.context, s = this.createTexture(t.filterBackend, this.image);
    this.bindAdditionalTexture(e, s, e.TEXTURE1), super.applyToWebGL(t), this.unbindAdditionalTexture(e, e.TEXTURE1);
  }
  createTexture(t, e) {
    return t.getCachedTexture(e.cacheKey, e.getElement());
  }
  calculateMatrix() {
    const t = this.image, { width: e, height: s } = t.getElement();
    return [1 / t.scaleX, 0, 0, 0, 1 / t.scaleY, 0, -t.left / e, -t.top / s, 1];
  }
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: i }, filterBackend: { resources: r } } = t;
    const n = this.image;
    r.blendImage || (r.blendImage = St());
    const o = r.blendImage, h = o.getContext("2d");
    o.width !== s || o.height !== i ? (o.width = s, o.height = i) : h.clearRect(0, 0, s, i), h.setTransform(n.scaleX, 0, 0, n.scaleY, n.left, n.top), h.drawImage(n.getElement(), 0, 0, s, i);
    const c = h.getImageData(0, 0, s, i).data;
    for (let l = 0; l < e.length; l += 4) {
      const u = e[l], d = e[l + 1], g = e[l + 2], f = e[l + 3], v = c[l], x = c[l + 1], b = c[l + 2], C = c[l + 3];
      switch (this.mode) {
        case "multiply":
          e[l] = u * v / 255, e[l + 1] = d * x / 255, e[l + 2] = g * b / 255, e[l + 3] = f * C / 255;
          break;
        case "mask":
          e[l + 3] = C;
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.calculateMatrix();
    t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, !1, s);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { image: this.image && this.image.toObject() });
  }
  static async fromObject(t, e) {
    let { type: s, image: i } = t, r = V(t, jh);
    return tt.fromObject(i, e).then((n) => new this(y(y({}, r), {}, { image: n })));
  }
}
m(us, "type", "BlendImage"), m(us, "defaults", { mode: "multiply", alpha: 1 }), m(us, "uniformLocations", ["uTransformMatrix", "uImage"]), T.setClass(us);
class ds extends $ {
  getFragmentSource() {
    return `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uDelta;
    varying vec2 vTexCoord;
    const float nSamples = 15.0;
    vec3 v3offset = vec3(12.9898, 78.233, 151.7182);
    float random(vec3 scale) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);
    }
    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;
      float offset = random(v3offset);
      for (float t = -nSamples; t <= nSamples; t++) {
        float percent = (t + offset - 0.5) / nSamples;
        float weight = 1.0 - abs(percent);
        color += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;
        total += weight;
      }
      gl_FragColor = color / total;
    }
  `;
  }
  applyTo(t) {
    ti(t) ? (this.aspectRatio = t.sourceWidth / t.sourceHeight, t.passes++, this._setupFrameBuffer(t), this.horizontal = !0, this.applyToWebGL(t), this._swapTextures(t), this._setupFrameBuffer(t), this.horizontal = !1, this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
    t.imageData = this.simpleBlur(t);
  }
  simpleBlur(t) {
    let { ctx: e, imageData: s, filterBackend: { resources: i } } = t;
    const { width: r, height: n } = s;
    i.blurLayer1 || (i.blurLayer1 = St(), i.blurLayer2 = St());
    const o = i.blurLayer1, h = i.blurLayer2;
    o.width === r && o.height === n || (h.width = o.width = r, h.height = o.height = n);
    const c = o.getContext("2d"), l = h.getContext("2d"), u = 15, d = 0.06 * this.blur * 0.5;
    let g, f, v, x;
    for (c.putImageData(s, 0, 0), l.clearRect(0, 0, r, n), x = -15; x <= u; x++) g = (Math.random() - 0.5) / 4, f = x / u, v = d * f * r + g, l.globalAlpha = 1 - Math.abs(f), l.drawImage(o, v, g), c.drawImage(h, 0, 0), l.globalAlpha = 1, l.clearRect(0, 0, h.width, h.height);
    for (x = -15; x <= u; x++) g = (Math.random() - 0.5) / 4, f = x / u, v = d * f * n + g, l.globalAlpha = 1 - Math.abs(f), l.drawImage(o, g, v), c.drawImage(h, 0, 0), l.globalAlpha = 1, l.clearRect(0, 0, h.width, h.height);
    e.drawImage(o, 0, 0);
    const b = e.getImageData(0, 0, o.width, o.height);
    return c.globalAlpha = 1, c.clearRect(0, 0, o.width, o.height), b;
  }
  sendUniformData(t, e) {
    const s = this.chooseRightDelta();
    t.uniform2fv(e.uDelta, s);
  }
  isNeutralState() {
    return this.blur === 0;
  }
  chooseRightDelta() {
    let t = 1;
    const e = [0, 0];
    this.horizontal ? this.aspectRatio > 1 && (t = 1 / this.aspectRatio) : this.aspectRatio < 1 && (t = this.aspectRatio);
    const s = t * this.blur * 0.12;
    return this.horizontal ? e[0] = s : e[1] = s, e;
  }
}
m(ds, "type", "Blur"), m(ds, "defaults", { blur: 0 }), m(ds, "uniformLocations", ["uDelta"]), T.setClass(ds);
class gs extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBrightness;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += uBrightness;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.round(255 * this.brightness);
    for (let i = 0; i < e.length; i += 4) e[i] = e[i] + s, e[i + 1] = e[i + 1] + s, e[i + 2] = e[i + 2] + s;
  }
  isNeutralState() {
    return this.brightness === 0;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBrightness, this.brightness);
  }
}
m(gs, "type", "Brightness"), m(gs, "defaults", { brightness: 0 }), m(gs, "uniformLocations", ["uBrightness"]), T.setClass(gs);
class _e extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vTexCoord;
  uniform mat4 uColorMatrix;
  uniform vec4 uConstants;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color *= uColorMatrix;
    color += uConstants;
    gl_FragColor = color;
  }`;
  }
  applyTo2d(t) {
    const e = t.imageData.data, s = this.matrix, i = this.colorsOnly;
    for (let r = 0; r < e.length; r += 4) {
      const n = e[r], o = e[r + 1], h = e[r + 2];
      if (i) e[r] = n * s[0] + o * s[1] + h * s[2] + 255 * s[4], e[r + 1] = n * s[5] + o * s[6] + h * s[7] + 255 * s[9], e[r + 2] = n * s[10] + o * s[11] + h * s[12] + 255 * s[14];
      else {
        const c = e[r + 3];
        e[r] = n * s[0] + o * s[1] + h * s[2] + c * s[3] + 255 * s[4], e[r + 1] = n * s[5] + o * s[6] + h * s[7] + c * s[8] + 255 * s[9], e[r + 2] = n * s[10] + o * s[11] + h * s[12] + c * s[13] + 255 * s[14], e[r + 3] = n * s[15] + o * s[16] + h * s[17] + c * s[18] + 255 * s[19];
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.matrix, i = [s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]], r = [s[4], s[9], s[14], s[19]];
    t.uniformMatrix4fv(e.uColorMatrix, !1, i), t.uniform4fv(e.uConstants, r);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { matrix: [...this.matrix] });
  }
}
function pe(a, t) {
  var e;
  const s = (m(e = class extends _e {
    toObject() {
      return { type: this.type, colorsOnly: this.colorsOnly };
    }
  }, "type", a), m(e, "defaults", { colorsOnly: !1, matrix: t }), e);
  return T.setClass(s, a), s;
}
m(_e, "type", "ColorMatrix"), m(_e, "defaults", { matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], colorsOnly: !0 }), m(_e, "uniformLocations", ["uColorMatrix", "uConstants"]), T.setClass(_e);
pe("Brownie", [0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965, 0, 0, 0, 1, 0]);
pe("Vintage", [0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0, 0, 0, 1, 0]);
pe("Kodachrome", [1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972, 0, 0, 0, 1, 0]);
pe("Technicolor", [1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137, 0, 0, 0, 1, 0]);
pe("Polaroid", [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]);
pe("Sepia", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]);
pe("BlackWhite", [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]);
class jr extends $ {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.subFilters = t.subFilters || [];
  }
  applyTo(t) {
    ti(t) && (t.passes += this.subFilters.length - 1), this.subFilters.forEach((e) => {
      e.applyTo(t);
    });
  }
  toObject() {
    return { type: this.type, subFilters: this.subFilters.map((t) => t.toObject()) };
  }
  isNeutralState() {
    return !this.subFilters.some((t) => !t.isNeutralState());
  }
  static fromObject(t, e) {
    return Promise.all((t.subFilters || []).map((s) => T.getClass(s.type).fromObject(s, e))).then((s) => new this({ subFilters: s }));
  }
}
m(jr, "type", "Composed"), T.setClass(jr);
class ps extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uContrast;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));
    color.rgb = contrastF * (color.rgb - 0.5) + 0.5;
    gl_FragColor = color;
  }`;
  }
  isNeutralState() {
    return this.contrast === 0;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.floor(255 * this.contrast), i = 259 * (s + 255) / (255 * (259 - s));
    for (let r = 0; r < e.length; r += 4) e[r] = i * (e[r] - 128) + 128, e[r + 1] = i * (e[r + 1] - 128) + 128, e[r + 2] = i * (e[r + 2] - 128) + 128;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uContrast, this.contrast);
  }
}
m(ps, "type", "Contrast"), m(ps, "defaults", { contrast: 0 }), m(ps, "uniformLocations", ["uContrast"]), T.setClass(ps);
const Lh = { Convolute_3_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_3_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_5_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_5_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_7_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_7_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_9_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_9_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    ` };
class fs extends $ {
  getCacheKey() {
    return "".concat(this.type, "_").concat(Math.sqrt(this.matrix.length), "_").concat(this.opaque ? 1 : 0);
  }
  getFragmentSource() {
    return Lh[this.getCacheKey()];
  }
  applyTo2d(t) {
    const e = t.imageData, s = e.data, i = this.matrix, r = Math.round(Math.sqrt(i.length)), n = Math.floor(r / 2), o = e.width, h = e.height, c = t.ctx.createImageData(o, h), l = c.data, u = this.opaque ? 1 : 0;
    let d, g, f, v, x, b, C, _, S, k, M, A, E;
    for (M = 0; M < h; M++) for (k = 0; k < o; k++) {
      for (x = 4 * (M * o + k), d = 0, g = 0, f = 0, v = 0, E = 0; E < r; E++) for (A = 0; A < r; A++) C = M + E - n, b = k + A - n, C < 0 || C >= h || b < 0 || b >= o || (_ = 4 * (C * o + b), S = i[E * r + A], d += s[_] * S, g += s[_ + 1] * S, f += s[_ + 2] * S, u || (v += s[_ + 3] * S));
      l[x] = d, l[x + 1] = g, l[x + 2] = f, l[x + 3] = u ? s[x + 3] : v;
    }
    t.imageData = c;
  }
  sendUniformData(t, e) {
    t.uniform1fv(e.uMatrix, this.matrix);
  }
  toObject() {
    return y(y({}, super.toObject()), {}, { opaque: this.opaque, matrix: [...this.matrix] });
  }
}
m(fs, "type", "Convolute"), m(fs, "defaults", { opaque: !1, matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0] }), m(fs, "uniformLocations", ["uMatrix", "uOpaque", "uHalfSize", "uSize"]), T.setClass(fs);
const Bn = "Gamma";
class ms extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec3 uGamma;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    vec3 correction = (1.0 / uGamma);
    color.r = pow(color.r, correction.r);
    color.g = pow(color.g, correction.g);
    color.b = pow(color.b, correction.b);
    gl_FragColor = color;
    gl_FragColor.rgb *= color.a;
  }
`;
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.gamma = t.gamma || this.constructor.defaults.gamma.concat();
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.gamma, i = 1 / s[0], r = 1 / s[1], n = 1 / s[2];
    this.rgbValues || (this.rgbValues = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) });
    const o = this.rgbValues;
    for (let h = 0; h < 256; h++) o.r[h] = 255 * Math.pow(h / 255, i), o.g[h] = 255 * Math.pow(h / 255, r), o.b[h] = 255 * Math.pow(h / 255, n);
    for (let h = 0; h < e.length; h += 4) e[h] = o.r[e[h]], e[h + 1] = o.g[e[h + 1]], e[h + 2] = o.b[e[h + 2]];
  }
  sendUniformData(t, e) {
    t.uniform3fv(e.uGamma, this.gamma);
  }
  isNeutralState() {
    const { gamma: t } = this;
    return t[0] === 1 && t[1] === 1 && t[2] === 1;
  }
  toObject() {
    return { type: Bn, gamma: this.gamma.concat() };
  }
}
m(ms, "type", Bn), m(ms, "defaults", { gamma: [1, 1, 1] }), m(ms, "uniformLocations", ["uGamma"]), T.setClass(ms);
const Ph = { average: `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      float average = (color.r + color.b + color.g) / 3.0;
      gl_FragColor = vec4(average, average, average, color.a);
    }
    `, lightness: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `, luminosity: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    ` };
class vs extends $ {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s, i = 0; i < e.length; i += 4) {
      switch (this.mode) {
        case "average":
          s = (e[i] + e[i + 1] + e[i + 2]) / 3;
          break;
        case "lightness":
          s = (Math.min(e[i], e[i + 1], e[i + 2]) + Math.max(e[i], e[i + 1], e[i + 2])) / 2;
          break;
        case "luminosity":
          s = 0.21 * e[i] + 0.72 * e[i + 1] + 0.07 * e[i + 2];
      }
      e[i] = s, e[i + 1] = s, e[i + 2] = s;
    }
  }
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Ph[this.mode];
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uMode, 1);
  }
  isNeutralState() {
    return !1;
  }
}
m(vs, "type", "Grayscale"), m(vs, "defaults", { mode: "average" }), m(vs, "uniformLocations", ["uMode"]), T.setClass(vs);
class pi extends _e {
  calculateMatrix() {
    const t = this.rotation * Math.PI, e = Nt(t), s = Gt(t), i = 1 / 3, r = Math.sqrt(i) * s, n = 1 - e;
    this.matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], this.matrix[0] = e + n / 3, this.matrix[1] = i * n - r, this.matrix[2] = i * n + r, this.matrix[5] = i * n + r, this.matrix[6] = e + i * n, this.matrix[7] = i * n - r, this.matrix[10] = i * n - r, this.matrix[11] = i * n + r, this.matrix[12] = e + i * n;
  }
  isNeutralState() {
    return this.rotation === 0;
  }
  applyTo(t) {
    this.calculateMatrix(), super.applyTo(t);
  }
  toObject() {
    return { type: this.type, rotation: this.rotation };
  }
}
m(pi, "type", "HueRotation"), m(pi, "defaults", { rotation: 0 }), T.setClass(pi);
class ys extends $ {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s = 0; s < e.length; s += 4) e[s] = 255 - e[s], e[s + 1] = 255 - e[s + 1], e[s + 2] = 255 - e[s + 2], this.alpha && (e[s + 3] = 255 - e[s + 3]);
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform int uInvert;
  uniform int uAlpha;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    if (uInvert == 1) {
      if (uAlpha == 1) {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,1.0 -color.a);
      } else {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);
      }
    } else {
      gl_FragColor = color;
    }
  }
`;
  }
  isNeutralState() {
    return !this.invert;
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uInvert, Number(this.invert)), t.uniform1i(e.uAlpha, Number(this.alpha));
  }
}
m(ys, "type", "Invert"), m(ys, "defaults", { alpha: !1, invert: !0 }), m(ys, "uniformLocations", ["uInvert", "uAlpha"]), T.setClass(ys);
class xs extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uStepH;
  uniform float uNoise;
  uniform float uSeed;
  varying vec2 vTexCoord;
  float rand(vec2 co, float seed, float vScale) {
    return fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);
  }
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.noise;
    for (let i = 0; i < e.length; i += 4) {
      const r = (0.5 - Math.random()) * s;
      e[i] += r, e[i + 1] += r, e[i + 2] += r;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uNoise, this.noise / 255), t.uniform1f(e.uSeed, Math.random());
  }
  isNeutralState() {
    return this.noise === 0;
  }
}
m(xs, "type", "Noise"), m(xs, "defaults", { noise: 0 }), m(xs, "uniformLocations", ["uNoise", "uSeed"]), T.setClass(xs);
class ws extends $ {
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: i } } = t;
    for (let r = 0; r < i; r += this.blocksize) for (let n = 0; n < s; n += this.blocksize) {
      const o = 4 * r * s + 4 * n, h = e[o], c = e[o + 1], l = e[o + 2], u = e[o + 3];
      for (let d = r; d < Math.min(r + this.blocksize, i); d++) for (let g = n; g < Math.min(n + this.blocksize, s); g++) {
        const f = 4 * d * s + 4 * g;
        e[f] = h, e[f + 1] = c, e[f + 2] = l, e[f + 3] = u;
      }
    }
  }
  isNeutralState() {
    return this.blocksize === 1;
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBlocksize;
  uniform float uStepW;
  uniform float uStepH;
  varying vec2 vTexCoord;
  void main() {
    float blockW = uBlocksize * uStepW;
    float blockH = uBlocksize * uStepH;
    int posX = int(vTexCoord.x / blockW);
    int posY = int(vTexCoord.y / blockH);
    float fposX = float(posX);
    float fposY = float(posY);
    vec2 squareCoords = vec2(fposX * blockW, fposY * blockH);
    vec4 color = texture2D(uTexture, squareCoords);
    gl_FragColor = color;
  }
`;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBlocksize, this.blocksize);
  }
}
m(ws, "type", "Pixelate"), m(ws, "defaults", { blocksize: 4 }), m(ws, "uniformLocations", ["uBlocksize"]), T.setClass(ws);
class bs extends $ {
  getFragmentSource() {
    return `
precision highp float;
uniform sampler2D uTexture;
uniform vec4 uLow;
uniform vec4 uHigh;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = texture2D(uTexture, vTexCoord);
  if(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {
    gl_FragColor.a = 0.0;
  }
}
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = 255 * this.distance, i = new z(this.color).getSource(), r = [i[0] - s, i[1] - s, i[2] - s], n = [i[0] + s, i[1] + s, i[2] + s];
    for (let o = 0; o < e.length; o += 4) {
      const h = e[o], c = e[o + 1], l = e[o + 2];
      h > r[0] && c > r[1] && l > r[2] && h < n[0] && c < n[1] && l < n[2] && (e[o + 3] = 0);
    }
  }
  sendUniformData(t, e) {
    const s = new z(this.color).getSource(), i = this.distance, r = [0 + s[0] / 255 - i, 0 + s[1] / 255 - i, 0 + s[2] / 255 - i, 1], n = [s[0] / 255 + i, s[1] / 255 + i, s[2] / 255 + i, 1];
    t.uniform4fv(e.uLow, r), t.uniform4fv(e.uHigh, n);
  }
}
m(bs, "type", "RemoveColor"), m(bs, "defaults", { color: "#FFFFFF", distance: 0.02, useAlpha: !1 }), m(bs, "uniformLocations", ["uLow", "uHigh"]), T.setClass(bs);
class Cs extends $ {
  sendUniformData(t, e) {
    t.uniform2fv(e.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]), t.uniform1fv(e.uTaps, this.taps);
  }
  getFilterWindow() {
    const t = this.tempScale;
    return Math.ceil(this.lanczosLobes / t);
  }
  getCacheKey() {
    const t = this.getFilterWindow();
    return "".concat(this.type, "_").concat(t);
  }
  getFragmentSource() {
    const t = this.getFilterWindow();
    return this.generateShader(t);
  }
  getTaps() {
    const t = this.lanczosCreate(this.lanczosLobes), e = this.tempScale, s = this.getFilterWindow(), i = new Array(s);
    for (let r = 1; r <= s; r++) i[r - 1] = t(r * e);
    return i;
  }
  generateShader(t) {
    const e = new Array(t);
    for (let s = 1; s <= t; s++) e[s - 1] = "".concat(s, ".0 * uDelta");
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uDelta;
      varying vec2 vTexCoord;
      uniform float uTaps[`.concat(t, `];
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        float sum = 1.0;
        `).concat(e.map((s, i) => `
              color += texture2D(uTexture, vTexCoord + `.concat(s, ") * uTaps[").concat(i, "] + texture2D(uTexture, vTexCoord - ").concat(s, ") * uTaps[").concat(i, `];
              sum += 2.0 * uTaps[`).concat(i, `];
            `)).join(`
`), `
        gl_FragColor = color / sum;
      }
    `);
  }
  applyToForWebgl(t) {
    t.passes++, this.width = t.sourceWidth, this.horizontal = !0, this.dW = Math.round(this.width * this.scaleX), this.dH = t.sourceHeight, this.tempScale = this.dW / this.width, this.taps = this.getTaps(), t.destinationWidth = this.dW, super.applyTo(t), t.sourceWidth = t.destinationWidth, this.height = t.sourceHeight, this.horizontal = !1, this.dH = Math.round(this.height * this.scaleY), this.tempScale = this.dH / this.height, this.taps = this.getTaps(), t.destinationHeight = this.dH, super.applyTo(t), t.sourceHeight = t.destinationHeight;
  }
  applyTo(t) {
    ti(t) ? this.applyToForWebgl(t) : this.applyTo2d(t);
  }
  isNeutralState() {
    return this.scaleX === 1 && this.scaleY === 1;
  }
  lanczosCreate(t) {
    return (e) => {
      if (e >= t || e <= -t) return 0;
      if (e < 11920929e-14 && e > -11920929e-14) return 1;
      const s = (e *= Math.PI) / t;
      return Math.sin(e) / e * Math.sin(s) / s;
    };
  }
  applyTo2d(t) {
    const e = t.imageData, s = this.scaleX, i = this.scaleY;
    this.rcpScaleX = 1 / s, this.rcpScaleY = 1 / i;
    const r = e.width, n = e.height, o = Math.round(r * s), h = Math.round(n * i);
    let c;
    c = this.resizeType === "sliceHack" ? this.sliceByTwo(t, r, n, o, h) : this.resizeType === "hermite" ? this.hermiteFastResize(t, r, n, o, h) : this.resizeType === "bilinear" ? this.bilinearFiltering(t, r, n, o, h) : this.resizeType === "lanczos" ? this.lanczosResize(t, r, n, o, h) : new ImageData(o, h), t.imageData = c;
  }
  sliceByTwo(t, e, s, i, r) {
    const n = t.imageData, o = 0.5;
    let h = !1, c = !1, l = e * o, u = s * o;
    const d = t.filterBackend.resources;
    let g = 0, f = 0;
    const v = e;
    let x = 0;
    d.sliceByTwo || (d.sliceByTwo = St());
    const b = d.sliceByTwo;
    (b.width < 1.5 * e || b.height < s) && (b.width = 1.5 * e, b.height = s);
    const C = b.getContext("2d");
    for (C.clearRect(0, 0, 1.5 * e, s), C.putImageData(n, 0, 0), i = Math.floor(i), r = Math.floor(r); !h || !c; ) e = l, s = u, i < Math.floor(l * o) ? l = Math.floor(l * o) : (l = i, h = !0), r < Math.floor(u * o) ? u = Math.floor(u * o) : (u = r, c = !0), C.drawImage(b, g, f, e, s, v, x, l, u), g = v, f = x, x += u;
    return C.getImageData(g, f, i, r);
  }
  lanczosResize(t, e, s, i, r) {
    const n = t.imageData.data, o = t.ctx.createImageData(i, r), h = o.data, c = this.lanczosCreate(this.lanczosLobes), l = this.rcpScaleX, u = this.rcpScaleY, d = 2 / this.rcpScaleX, g = 2 / this.rcpScaleY, f = Math.ceil(l * this.lanczosLobes / 2), v = Math.ceil(u * this.lanczosLobes / 2), x = {}, b = { x: 0, y: 0 }, C = { x: 0, y: 0 };
    return function _(S) {
      let k, M, A, E, F, P, Y, H, L, X, Q;
      for (b.x = (S + 0.5) * l, C.x = Math.floor(b.x), k = 0; k < r; k++) {
        for (b.y = (k + 0.5) * u, C.y = Math.floor(b.y), F = 0, P = 0, Y = 0, H = 0, L = 0, M = C.x - f; M <= C.x + f; M++) if (!(M < 0 || M >= e)) {
          X = Math.floor(1e3 * Math.abs(M - b.x)), x[X] || (x[X] = {});
          for (let U = C.y - v; U <= C.y + v; U++) U < 0 || U >= s || (Q = Math.floor(1e3 * Math.abs(U - b.y)), x[X][Q] || (x[X][Q] = c(Math.sqrt(Math.pow(X * d, 2) + Math.pow(Q * g, 2)) / 1e3)), A = x[X][Q], A > 0 && (E = 4 * (U * e + M), F += A, P += A * n[E], Y += A * n[E + 1], H += A * n[E + 2], L += A * n[E + 3]));
        }
        E = 4 * (k * i + S), h[E] = P / F, h[E + 1] = Y / F, h[E + 2] = H / F, h[E + 3] = L / F;
      }
      return ++S < i ? _(S) : o;
    }(0);
  }
  bilinearFiltering(t, e, s, i, r) {
    let n, o, h, c, l, u, d, g, f, v, x, b, C, _ = 0;
    const S = this.rcpScaleX, k = this.rcpScaleY, M = 4 * (e - 1), A = t.imageData.data, E = t.ctx.createImageData(i, r), F = E.data;
    for (d = 0; d < r; d++) for (g = 0; g < i; g++) for (l = Math.floor(S * g), u = Math.floor(k * d), f = S * g - l, v = k * d - u, C = 4 * (u * e + l), x = 0; x < 4; x++) n = A[C + x], o = A[C + 4 + x], h = A[C + M + x], c = A[C + M + 4 + x], b = n * (1 - f) * (1 - v) + o * f * (1 - v) + h * v * (1 - f) + c * f * v, F[_++] = b;
    return E;
  }
  hermiteFastResize(t, e, s, i, r) {
    const n = this.rcpScaleX, o = this.rcpScaleY, h = Math.ceil(n / 2), c = Math.ceil(o / 2), l = t.imageData.data, u = t.ctx.createImageData(i, r), d = u.data;
    for (let g = 0; g < r; g++) for (let f = 0; f < i; f++) {
      const v = 4 * (f + g * i);
      let x = 0, b = 0, C = 0, _ = 0, S = 0, k = 0, M = 0;
      const A = (g + 0.5) * o;
      for (let E = Math.floor(g * o); E < (g + 1) * o; E++) {
        const F = Math.abs(A - (E + 0.5)) / c, P = (f + 0.5) * n, Y = F * F;
        for (let H = Math.floor(f * n); H < (f + 1) * n; H++) {
          let L = Math.abs(P - (H + 0.5)) / h;
          const X = Math.sqrt(Y + L * L);
          X > 1 && X < -1 || (x = 2 * X * X * X - 3 * X * X + 1, x > 0 && (L = 4 * (H + E * e), M += x * l[L + 3], C += x, l[L + 3] < 255 && (x = x * l[L + 3] / 250), _ += x * l[L], S += x * l[L + 1], k += x * l[L + 2], b += x));
        }
      }
      d[v] = _ / b, d[v + 1] = S / b, d[v + 2] = k / b, d[v + 3] = M / C;
    }
    return u;
  }
}
m(Cs, "type", "Resize"), m(Cs, "defaults", { resizeType: "hermite", scaleX: 1, scaleY: 1, lanczosLobes: 3 }), m(Cs, "uniformLocations", ["uDelta", "uTaps"]), T.setClass(Cs);
class _s extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uSaturation;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float rgMax = max(color.r, color.g);
    float rgbMax = max(rgMax, color.b);
    color.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;
    color.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;
    color.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.saturation;
    for (let i = 0; i < e.length; i += 4) {
      const r = Math.max(e[i], e[i + 1], e[i + 2]);
      e[i] += r !== e[i] ? (r - e[i]) * s : 0, e[i + 1] += r !== e[i + 1] ? (r - e[i + 1]) * s : 0, e[i + 2] += r !== e[i + 2] ? (r - e[i + 2]) * s : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uSaturation, -this.saturation);
  }
  isNeutralState() {
    return this.saturation === 0;
  }
}
m(_s, "type", "Saturation"), m(_s, "defaults", { saturation: 0 }), m(_s, "uniformLocations", ["uSaturation"]), T.setClass(_s);
class Ss extends $ {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVibrance;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float max = max(color.r, max(color.g, color.b));
    float avg = (color.r + color.g + color.b) / 3.0;
    float amt = (abs(max - avg) * 2.0) * uVibrance;
    color.r += max != color.r ? (max - color.r) * amt : 0.00;
    color.g += max != color.g ? (max - color.g) * amt : 0.00;
    color.b += max != color.b ? (max - color.b) * amt : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.vibrance;
    for (let i = 0; i < e.length; i += 4) {
      const r = Math.max(e[i], e[i + 1], e[i + 2]), n = (e[i] + e[i + 1] + e[i + 2]) / 3, o = 2 * Math.abs(r - n) / 255 * s;
      e[i] += r !== e[i] ? (r - e[i]) * o : 0, e[i + 1] += r !== e[i + 1] ? (r - e[i + 1]) * o : 0, e[i + 2] += r !== e[i + 2] ? (r - e[i + 2]) * o : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uVibrance, -this.vibrance);
  }
  isNeutralState() {
    return this.vibrance === 0;
  }
}
m(Ss, "type", "Vibrance"), m(Ss, "defaults", { vibrance: 0 }), m(Ss, "uniformLocations", ["uVibrance"]), T.setClass(Ss);
const Fe = "#FF0000", ei = 4;
var D = /* @__PURE__ */ ((a) => (a[a.RECT = 0] = "RECT", a[a.ELLIPSE = 1] = "ELLIPSE", a[a.ARROW = 2] = "ARROW", a[a.DRAW = 3] = "DRAW", a[a.TEXT = 4] = "TEXT", a[a.MOSAIC = 5] = "MOSAIC", a[a.EDIT_BASEMAP = 6] = "EDIT_BASEMAP", a[a.NONE = 7] = "NONE", a))(D || {});
const Ts = 5;
function Fh(a) {
  const { data: t } = a, e = a.height, s = a.width;
  let i, r, n, o, h, c, l, u, d, g, f;
  for (r = 0; r < e; r += Ts)
    for (h = 0; h < s; h += Ts)
      for (i = r * 4 * s + h * 4, u = t[i], d = t[i + 1], g = t[i + 2], f = t[i + 3], o = Math.min(r + Ts, e), l = Math.min(h + Ts, s), n = r; n < o; n++)
        for (c = h; c < l; c++)
          i = n * 4 * s + c * 4, t[i] = u, t[i + 1] = d, t[i + 2] = g, t[i + 3] = f;
}
class Mi {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "history");
    // 10小 20中 40大
    p(this, "width", 20);
    p(this, "mosaicBrush");
    p(this, "recorder");
    p(this, "enableDraw", !1);
    this.imageEditor = t, this.canvas = t.getCanvas(), this.history = t.getHistory(), this.recorder = this.recordPathCreate.bind(this);
  }
  getOperatorSize() {
    return this.width;
  }
  getOperatorColor() {
    return Fe;
  }
  setOperatorSize(t) {
    this.width = t, this.mosaicBrush.width = t;
  }
  setOperatorColor() {
  }
  recordPathCreate(t) {
    const e = t.path;
    e.selectable = !1, e.evented = !1, e.hoverCursor = "default", e.lockScalingFlip = !0;
    const s = e.getBoundingRect();
    e.set({
      originX: "center",
      originY: "center",
      left: s.left + s.width / 2,
      top: s.top + s.height / 2
    }), this.canvas.renderAll(), this.history.recordCreateAction(e);
  }
  tryToStartMosaic() {
    this.imageEditor.getOperatorType() === D.MOSAIC && (this.canvas._hoveredTarget || (this.enableDraw = !0, this.startMosaicMode()));
  }
  tryToFinishMosaic() {
    this.imageEditor.getOperatorType() === D.MOSAIC && this.enableDraw && (this.endMosaicMode(), this.enableDraw = !1);
  }
  startMosaicMode() {
    const t = this.canvas;
    t.isDrawingMode = !0;
    const e = new hh(t);
    this.mosaicBrush = e, t.freeDrawingBrush = e, e.width = this.width, e.shadow = new Ct({
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: !0
    }), e.getPatternSrc = function() {
      const s = {
        left: 0,
        top: 0,
        width: t.width,
        height: t.height
      }, i = t.toCanvasElement(1, s), r = i.getContext("2d"), n = r.getImageData(
        0,
        0,
        i.width,
        i.height
      );
      Fh(n), r.putImageData(n, 0, 0);
      const o = document.createElement("canvas"), h = o.getContext("2d");
      return o.width = t.width || 0, o.height = t.height || 0, h.drawImage(
        i,
        0,
        0,
        i.width,
        i.height,
        s.left,
        s.top,
        s.width,
        s.height
      ), o;
    }, this.canvas.on("path:created", this.recorder);
  }
  endMosaicMode() {
    this.canvas.isDrawingMode = !1, this.canvas.off("path:created", this.recorder);
  }
}
class Xn {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "start", !1);
    p(this, "startX");
    p(this, "startY");
    p(this, "allowCreate", !0);
    p(this, "fontSize", 20);
    p(this, "color", Fe);
    this.imageEditor = t, this.canvas = t.getCanvas(), this.startX = 0, this.startY = 0;
  }
  getOperatorSize() {
    return this.fontSize;
  }
  getOperatorColor() {
    return this.color;
  }
  setOperatorSize(t) {
    this.fontSize = t;
  }
  setOperatorColor(t) {
    this.color = t;
  }
  handleMouseDownBefore() {
    this.imageEditor.getOperatorType() == D.TEXT && (this.canvas.getActiveObject() ? this.allowCreate = !1 : this.allowCreate = !0);
  }
  handleMouseDown(t) {
    if (!this.allowCreate)
      return;
    const e = this.canvas;
    if (e.getActiveObject() || this.imageEditor.getOperatorType() != D.TEXT)
      return;
    const s = e.getScenePoint(t.e);
    this.startX = s.x, this.startY = s.y, this.start = !0;
  }
  handleMouseUp(t) {
    if (!this.allowCreate || !this.start || this.imageEditor.getOperatorType() != D.TEXT)
      return;
    this.start = !1;
    const e = this.canvas, s = e.getScenePoint(t.e), i = Math.abs(s.x - this.startX), r = Math.abs(s.y - this.startY);
    if (i * i + r * r > 100)
      return;
    const n = new At("请输入内容", {
      left: s.x,
      top: s.y,
      originX: "center",
      originY: "center",
      fontSize: this.fontSize,
      fill: this.color,
      lockScalingFlip: !0,
      perPixelTargetFind: !0
    });
    n.setControlVisible("mt", !1), n.setControlVisible("mb", !1), n.setControlVisible("ml", !1), n.setControlVisible("mr", !1), e.add(n), e.setActiveObject(n), e.renderAll(), this.imageEditor.getHistory().recordCreateAction(n);
  }
}
function Wh(a) {
  const t = a.getBoundingClientRect(), e = t.left + window.scrollX, s = t.top + window.scrollY;
  return { x: e, y: s };
}
class Os {
  constructor(t) {
    p(this, "canvasWrapper");
    p(this, "left");
    p(this, "top");
    this.canvasWrapper = t, this.left = t.style.left, this.top = t.style.top;
  }
  restore() {
    this.canvasWrapper.style.left = this.left, this.canvasWrapper.style.top = this.top;
  }
}
class ye {
  constructor(t, e, s) {
    p(this, "canvasWrapper");
    p(this, "fabricWrapperEl");
    p(this, "canvas");
    p(this, "top");
    p(this, "left");
    p(this, "width");
    p(this, "height");
    p(this, "fwTop");
    p(this, "fwLeft");
    p(this, "canvasWidth");
    p(this, "canvasHeight");
    p(this, "offsetX", 0);
    p(this, "offsetY", 0);
    p(this, "imageEditor");
    this.left = t.style.left, this.top = t.style.top, this.width = t.style.width, this.height = t.style.height, this.fwTop = e.style.top, this.fwLeft = e.style.left, this.canvasWidth = s.width, this.canvasHeight = s.height, this.canvasWrapper = t, this.fabricWrapperEl = e, this.canvas = s;
  }
  equals(t) {
    let e = this.top === t.top;
    return e = e && this.left === t.left, e = e && this.width === t.width, e = e && this.height === t.height, e = e && this.fwTop === t.fwTop, e = e && this.fwLeft === t.fwLeft, e = e && this.canvasWidth === t.canvasWidth, e = e && this.canvasHeight === t.canvasHeight, e;
  }
  restore() {
    this.canvasWrapper.style.left = this.left, this.canvasWrapper.style.top = this.top, this.canvasWrapper.style.width = this.width, this.canvasWrapper.style.height = this.height, this.fabricWrapperEl.style.top = this.fwTop, this.fabricWrapperEl.style.left = this.fwLeft, this.canvas.setDimensions({ width: this.canvasWidth, height: this.canvasHeight }), this.imageEditor && this.imageEditor.transform(this.offsetX, this.offsetY);
  }
}
class zh {
  constructor(t, e, s) {
    p(this, "previous");
    p(this, "current");
    p(this, "restore", !1);
    p(this, "fixer");
    this.previous = t, this.current = e, this.fixer = s;
  }
  undo() {
    this.restore || (this.previous.restore(), this.fixer(), this.restore = !0);
  }
  redo() {
    this.restore && (this.current.restore(), this.restore = !1, this.fixer());
  }
}
const B = {
  RED: "#FF0000",
  ORANGLE: "#FFA500",
  BLUE: "#1A9BFF",
  GREEN: "#1AAF19",
  BLACK: "#323232",
  GREY: "#808080",
  WHITE: "#FFFFFF"
}, Pt = () => {
}, O = (a) => a == null || (a = a.replace("px", ""), a == "") ? 0 : Number(a), xe = (a) => (a == "" && (a = "0"), Number(a)), st = class st {
  constructor(t, e, s) {
    p(this, "imageEditor", null);
    p(this, "parent");
    p(this, "head");
    p(this, "canvasWrapper");
    p(this, "canvas");
    p(this, "fabricWrapperEl", null);
    p(this, "northResizer");
    p(this, "northWestResizer");
    p(this, "westResizer");
    p(this, "southWestResizer");
    p(this, "southResizer");
    p(this, "southEastResizer");
    p(this, "eastResizer");
    p(this, "northEastResizer");
    p(this, "resizingType", null);
    p(this, "resizeStartInfo", {
      x: NaN,
      y: NaN,
      left: NaN,
      top: NaN,
      width: NaN,
      height: NaN,
      fwTop: NaN,
      fwLeft: NaN
    });
    p(this, "recordBeforeResize");
    // fw Fabric Wrapper
    p(this, "northStartFn", Pt);
    p(this, "northWestStartFn", Pt);
    p(this, "westStartFn", Pt);
    p(this, "southWestStartFn", Pt);
    p(this, "southStartFn", Pt);
    p(this, "southEastStartFn", Pt);
    p(this, "eastStartFn", Pt);
    p(this, "northEastStartFn", Pt);
    p(this, "resizeMoveFn", Pt);
    p(this, "resizeFinishFn", Pt);
    p(this, "wrapper");
    p(this, "screenshotCanvas");
    p(this, "screenshotResizer");
    p(this, "screenshotToolbar");
    p(this, "screenshotConfirmButton");
    p(this, "screenshotCancelButton");
    p(this, "toolbar");
    p(this, "rectangleMenu");
    p(this, "ellipseMenu");
    p(this, "arrowMenu");
    p(this, "drawMenu");
    p(this, "textMenu");
    p(this, "mosaicMenu");
    p(this, "scaleUpMenu");
    p(this, "scaleDownMenu");
    p(this, "editPictureMenu");
    p(this, "shrinkMenu");
    p(this, "extendMenu");
    p(this, "flipXMenu");
    p(this, "flipYMenu");
    p(this, "rotateClockwiseMenu");
    p(this, "rotateCounterClockwiseMenu");
    p(this, "cropMenu");
    p(this, "undoMenu");
    p(this, "redoMenu");
    p(this, "resetMenu");
    p(this, "cancelMenu");
    p(this, "confirmMenu");
    p(this, "optionBar");
    p(this, "small");
    p(this, "normal");
    p(this, "big");
    p(this, "red");
    p(this, "orangle");
    p(this, "blue");
    p(this, "green");
    p(this, "black");
    p(this, "white");
    p(this, "grey");
    p(this, "sizeOptions");
    p(this, "colorOptions");
    p(this, "optionArrow");
    p(this, "menuMap", /* @__PURE__ */ new Map());
    p(this, "eleColorMap", /* @__PURE__ */ new Map());
    p(this, "colorEleMap", /* @__PURE__ */ new Map());
    p(this, "confirmDialogWrapper");
    p(this, "confirmDialogMessage");
    p(this, "confirmButtonConfirm");
    p(this, "confirmButtonCancel");
    this.parent = e, this.head = s, this.wrapper = t.wrapper, this.canvas = t.canvas, this.screenshotCanvas = t.screenshotCanvas, this.screenshotResizer = t.screenshotResizer, this.screenshotToolbar = t.screenshotToolbar.toolbar, this.screenshotConfirmButton = t.screenshotToolbar.screenshot.confirm, this.screenshotCancelButton = t.screenshotToolbar.screenshot.cancel, this.canvasWrapper = t.canvasWrapper, this.northResizer = t.northResizer, this.northWestResizer = t.northWestResizer, this.westResizer = t.westResizer, this.southWestResizer = t.southWestResizer, this.southResizer = t.southResizer, this.southEastResizer = t.southEastResizer, this.eastResizer = t.eastResizer, this.northEastResizer = t.northEastResizer, this.confirmDialogWrapper = t.confirmDialogWrapper, this.confirmDialogMessage = t.confirmDialogMessage, this.confirmButtonConfirm = t.confirmButtonConfirm, this.confirmButtonCancel = t.confirmButtonCancel, this.fixResizerPosition(), this.toolbar = t.toolbar, this.rectangleMenu = t.rectangleMenu, this.menuMap.set(D.RECT, this.rectangleMenu), this.ellipseMenu = t.ellipseMenu, this.menuMap.set(D.ELLIPSE, this.ellipseMenu), this.arrowMenu = t.arrowMenu, this.menuMap.set(D.ARROW, this.arrowMenu), this.drawMenu = t.drawMenu, this.menuMap.set(D.DRAW, this.drawMenu), this.textMenu = t.textMenu, this.menuMap.set(D.TEXT, this.textMenu), this.mosaicMenu = t.mosaicMenu, this.menuMap.set(D.MOSAIC, this.mosaicMenu), this.editPictureMenu = t.editPictureMenu, this.menuMap.set(D.EDIT_BASEMAP, this.editPictureMenu), this.scaleUpMenu = t.scaleUpMenu, this.scaleDownMenu = t.scaleDownMenu, this.shrinkMenu = t.shrinkMenu, this.extendMenu = t.extendMenu, this.flipXMenu = t.flipXMenu, this.flipYMenu = t.flipYMenu, this.rotateClockwiseMenu = t.rotateClockwiseMenu, this.rotateCounterClockwiseMenu = t.rotateCounterClockwiseMenu, this.cropMenu = t.cropMenu, this.undoMenu = t.undoMenu, this.redoMenu = t.redoMenu, this.resetMenu = t.resetMenu, this.cancelMenu = t.cancelMenu, this.confirmMenu = t.confirmMenu;
    const i = this.createOperatorOptionBar();
    this.optionBar = i.optionBar, this.small = i.small, this.normal = i.normal, this.big = i.big, this.red = i.red, this.orangle = i.orangle, this.green = i.green, this.blue = i.blue, this.black = i.black, this.white = i.white, this.grey = i.grey, this.sizeOptions = i.sizeOptions, this.colorOptions = i.colorOptions, this.optionArrow = i.arrow, this.eleColorMap.set(this.red, B.RED), this.eleColorMap.set(this.orangle, B.ORANGLE), this.eleColorMap.set(this.green, B.GREEN), this.eleColorMap.set(this.blue, B.BLUE), this.eleColorMap.set(this.black, B.BLACK), this.eleColorMap.set(this.white, B.WHITE), this.eleColorMap.set(this.grey, B.GREY), this.colorEleMap.set(B.RED, this.red), this.colorEleMap.set(B.ORANGLE, this.orangle), this.colorEleMap.set(B.GREEN, this.green), this.colorEleMap.set(B.BLUE, this.black), this.colorEleMap.set(B.BLACK, this.black), this.colorEleMap.set(B.WHITE, this.white), this.colorEleMap.set(B.GREY, this.grey);
  }
  init(t) {
    this.imageEditor = t, this.fabricWrapperEl = t.getCanvas().wrapperEl, this.initResizers(), this.fixToolbarPosition(), this.appendGlobalCSS();
  }
  appendGlobalCSS() {
    if (st.HAS_CURSOR_CSS_ADDED)
      return;
    const t = document.createElement("style"), e = `
      .north-cursor-resize:hover, .south-cursor-resize:hover{
        cursor: ns-resize;
      }

      .west-cursor-resize:hover, .east-cursor-resize:hover{
        cursor: ew-resize;
      }

      .north-east-cursor-resize:hover, .south-west-cursor-resize:hover{
        cursor: nesw-resize;
      }

      .north-west-cursor-resize:hover, .south-east-cursor-resize:hover{
        cursor: nwse-resize;
      }
    `;
    this.northResizer.classList.add("north-cursor-resize"), this.northWestResizer.classList.add("north-west-cursor-resize"), this.westResizer.classList.add("west-cursor-resize"), this.southWestResizer.classList.add("south-west-cursor-resize"), this.southResizer.classList.add("south-cursor-resize"), this.southEastResizer.classList.add("south-east-cursor-resize"), this.eastResizer.classList.add("east-cursor-resize"), this.northEastResizer.classList.add("north-east-cursor-resize"), this.screenshotResizer.north.classList.add("north-cursor-resize"), this.screenshotResizer.northWest.classList.add("north-west-cursor-resize"), this.screenshotResizer.west.classList.add("west-cursor-resize"), this.screenshotResizer.southWest.classList.add("south-west-cursor-resize"), this.screenshotResizer.south.classList.add("south-cursor-resize"), this.screenshotResizer.southEast.classList.add("south-east-cursor-resize"), this.screenshotResizer.east.classList.add("east-cursor-resize"), this.screenshotResizer.northEast.classList.add("north-east-cursor-resize"), t.appendChild(document.createTextNode(e + `
    .online-image-editor-confirm-dialog-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .online-image-editor-confirm-dialog {
      background: white;
      border-radius: 2px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
      min-width: 300px;
      padding-bottom: 20px;
    }

    .online-image-editor-confirm-dialog-message {
      padding-top: 25px;
      padding-bottom: 14px;
      font-size: 18px;
      color: #606266;
    }

    .online-image-editor-confirm-btn {
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: #007BFF;
      color: white;
      transition: background-color 0.3s ease;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }

    .online-image-editor-confirm-btn.online-image-editor-confirm-btn-cancel {
      background-color: white;
      color: #606266;
      border: 1px solid #dcdfe6;
      padding: 4px 15px 4px 15px;
      margin-right: 6px;
    }

    .online-image-editor-confirm-btn.online-image-editor-confirm-btn-confirm {
      background-color: #409eff;
      color: white;
      border-color: #409eff;
      padding: 4px 15px 4px 15px;
      margin-left: 6px;
    }

    .online-image-editor-confirm-btn:hover {
      opacity: 0.8;
    }
    `)), this.head.appendChild(t), st.HAS_CURSOR_CSS_ADDED = !0;
  }
  createOperatorOptionBar() {
    const t = document.createElement("div");
    t.style.zIndex = "10", t.style.display = "none", t.style.backgroundColor = "white", t.style.position = "absolute", t.style.borderRadius = "4px", t.style.fontSize = "0";
    const e = document.createElement("span"), s = document.createElement("span");
    e.style.display = "inline-block", s.style.display = "inline-block", t.append(e), t.append(s);
    const i = document.createElement("span");
    i.style.width = "8px", i.style.height = "8px", i.style.margin = "16px 0 16px 16px", i.style.backgroundColor = st.DEACTIVE_SIZE_COLOR, i.style.display = "inline-block", i.style.borderRadius = "50%";
    const r = document.createElement("span");
    r.style.width = "12px", r.style.height = "12px", r.style.margin = "14px 0 14px 14px", r.style.backgroundColor = st.DEACTIVE_SIZE_COLOR, r.style.display = "inline-block", r.style.borderRadius = "50%";
    const n = document.createElement("span");
    n.style.width = "16px", n.style.height = "16px", n.style.margin = "12px 16px 12px 14px", n.style.backgroundColor = st.DEACTIVE_SIZE_COLOR, n.style.display = "inline-block", n.style.borderRadius = "50%", e.append(i), i.classList.add("online-image-editor-operator-option"), e.append(r), r.classList.add("online-image-editor-operator-option"), e.append(n), n.classList.add("online-image-editor-operator-option");
    const o = document.createElement("span");
    o.style.backgroundColor = B.RED;
    const h = document.createElement("span");
    h.style.backgroundColor = B.ORANGLE;
    const c = document.createElement("span");
    c.style.backgroundColor = B.BLUE;
    const l = document.createElement("span");
    l.style.backgroundColor = B.GREEN;
    const u = document.createElement("span");
    u.style.backgroundColor = B.BLACK;
    const d = document.createElement("span");
    d.style.backgroundColor = B.WHITE;
    const g = document.createElement("span");
    g.style.backgroundColor = B.GREY, s.append(o), s.append(h), s.append(c), s.append(l), s.append(u), s.append(d), s.append(g);
    const f = [o, h, c, l, u, d, g];
    for (const _ of f) {
      const S = _.style;
      S.display = "inline-block", S.width = "20px", S.height = "20px", S.margin = "10px 0 10px 8px", S.boxSizing = "border-box", _.classList.add("online-image-editor-operator-option");
    }
    o.style.margin = "10px 0 10px 0", g.style.marginRight = "8px", d.style.border = "solid 1px #E6E6E6", d.style.boxSizing = "border-box";
    const v = document.createElement("div"), x = document.createElement("div");
    x.style.position = "absolute", x.style.left = "142px", x.style.top = "-8px", x.style.borderTopWidth = "0", x.classList.add("online-image-editor-operator-option-arrow"), v.append(x), t.append(v);
    const b = document.createElement("style");
    return b.appendChild(document.createTextNode(`
      .online-image-editor-operator-option:hover{
        cursor: pointer;
      }

      .online-image-editor-operator-option-arrow:after{
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 8px;
        content: "";
        top:1px;
        margin-left:-8px;
        border-top-width:0;
        border-bottom-color: #FFF;
      }
    `)), this.head.appendChild(b), this.parent.append(t), {
      optionBar: t,
      small: i,
      normal: r,
      big: n,
      red: o,
      orangle: h,
      green: l,
      blue: c,
      black: u,
      white: d,
      grey: g,
      sizeOptions: e,
      colorOptions: s,
      arrow: x
    };
  }
  bindEvents() {
    const t = this.imageEditor;
    this.rectangleMenu.onclick = () => {
      this.switchOperator(D.RECT);
    }, this.ellipseMenu.onclick = () => {
      this.switchOperator(D.ELLIPSE);
    }, this.arrowMenu.onclick = () => {
      this.switchOperator(D.ARROW);
    }, this.drawMenu.onclick = () => {
      this.switchOperator(D.DRAW);
    }, this.mosaicMenu.onclick = () => {
      this.switchOperator(D.MOSAIC);
    }, this.textMenu.onclick = () => {
      this.switchOperator(D.TEXT);
    }, this.editPictureMenu.onclick = () => {
      this.switchOperator(D.EDIT_BASEMAP);
    };
    const e = this.imageEditor.getHistory();
    this.scaleUpMenu.onclick = () => {
      this.scaleObjects(0.1);
      const s = () => this.scaleObjects(-0.1), i = () => this.scaleObjects(0.1);
      e.recordReverseAction(s, i);
    }, this.scaleDownMenu.onclick = () => {
      this.scaleObjects(-0.1);
      const s = () => this.scaleObjects(0.1), i = () => this.scaleObjects(-0.1);
      e.recordReverseAction(s, i);
    }, this.shrinkMenu.onclick = () => {
      this.shrinkCanvas();
    }, this.extendMenu.onclick = () => {
      this.extendsCanvas();
    }, this.flipXMenu.onclick = () => {
      this.flipHorizontal(), e.recordReverseAction(() => this.flipHorizontal(), () => this.flipHorizontal());
    }, this.flipYMenu.onclick = () => {
      this.flipVertical(), this.imageEditor.getHistory().recordReverseAction(() => this.flipVertical(), () => this.flipVertical());
    }, this.rotateClockwiseMenu.onclick = () => {
      const s = new Os(this.canvasWrapper);
      this.rotateClockwise();
      const i = new Os(this.canvasWrapper);
      this.imageEditor.getHistory().recordReverseAction(() => {
        this.rotateCounterClockwise(), s.restore(), this.fixResizerPosition();
      }, () => {
        this.rotateClockwise(), i.restore(), this.fixResizerPosition();
      });
    }, this.rotateCounterClockwiseMenu.onclick = () => {
      const s = new Os(this.canvasWrapper);
      this.rotateCounterClockwise();
      const i = new Os(this.canvasWrapper);
      this.imageEditor.getHistory().recordReverseAction(() => {
        this.rotateClockwise(), s.restore(), this.fixResizerPosition();
      }, () => {
        this.rotateCounterClockwise(), i.restore(), this.fixResizerPosition();
      });
    }, this.cropMenu.onclick = () => {
      this.cropImage();
    }, this.undoMenu.onclick = () => {
      t.getHistory().undo();
    }, this.redoMenu.onclick = () => {
      t.getHistory().redo();
    }, this.resetMenu.onclick = () => {
      this.confirmAction("请问您确定要重置图片吗？", () => this.resetImageEditor());
    }, this.confirmMenu.onclick = () => {
      const s = t.getCanvas();
      s.discardActiveObject(), s.renderAll(), t.confirm(this.captureAreaImage()), this.destory();
    }, this.cancelMenu.onclick = () => {
      this.confirmAction("请问您确定要放弃本次编辑吗？", () => {
        t.cancel(), this.destory();
      });
    };
  }
  switchOperator(t) {
    const e = this.imageEditor, s = e.getOperatorType();
    e.getOperatorType() == t ? e.changeOperatorType(D.NONE) : e.changeOperatorType(t), s == D.EDIT_BASEMAP && this.setBackgroundEnable(!1);
    const i = e.getOperatorType();
    if (i == D.EDIT_BASEMAP && this.setBackgroundEnable(!0), s != D.NONE) {
      const r = this.menuMap.get(s);
      r.style.backgroundColor = "transparent", this.hideOptionBar();
    }
    if (i != D.NONE) {
      const r = this.menuMap.get(i);
      r.style.backgroundColor = "#FFF", i != D.EDIT_BASEMAP && this.showOptionBar(r);
    }
  }
  scaleObjects(t) {
    if (!this.imageEditor.scale(t))
      return;
    const s = this.imageEditor.getCanvas(), i = this.imageEditor.getBackgroundImage(), r = i.getX(), n = i.getY(), o = s.getObjects(), h = i.getScaledWidth(), c = i.getScaledHeight(), l = i.scaleX + t, u = i.scaleY + t;
    i.scaleX = l > 0.1 ? l : 0.1, i.scaleY = u > 0.1 ? u : 0.1, i.setCoords();
    const d = i.getScaledWidth() / h, g = i.getScaledHeight() / c;
    for (const f of o) {
      if (f === i)
        continue;
      const v = f.scaleX + t, x = f.scaleY + t;
      f.scaleX = v > 0.1 ? v : 0.1, f.scaleY = x > 0.1 ? x : 0.1;
      const b = f.getX(), C = f.getY(), _ = (r - b) * d, S = (n - C) * g;
      f.setX(r - _), f.setY(n - S), f.setCoords();
    }
    s.discardActiveObject(), s.renderAll();
  }
  setBackgroundEnable(t) {
    const e = this.imageEditor, s = e.getCanvas(), i = e.getBackgroundImage(), r = s.getObjects();
    i.evented = t, i.selectable = t;
    for (const n of r)
      n !== i && (n.evented = !t, n.selectable = !t);
    t ? s.setActiveObject(i) : s.discardActiveObject(), s.renderAll();
  }
  hideOptionBar() {
    this.optionBar.style.display = "none";
  }
  showOptionBarDirect() {
    this.optionBar.style.display = "inline-block";
  }
  showOptionBar(t) {
    const e = this.imageEditor;
    this.adjustOptionBarPosition(t);
    const s = e.getActiveOperator();
    if (s instanceof Mi)
      this.showSizeOptions();
    else {
      this.showFullOptions();
      const l = this, u = s.getOperatorColor(), d = this.eleColorMap.keys();
      for (const g of d)
        this.eleColorMap.get(g) == u ? this.activeColor(g) : this.deactiveColor(g);
      this.red.onclick = () => {
        l.changeColor(s, B.RED, l.red);
      }, this.orangle.onclick = () => {
        l.changeColor(s, B.ORANGLE, l.orangle);
      }, this.green.onclick = () => {
        l.changeColor(s, B.GREEN, l.green);
      }, this.blue.onclick = () => {
        l.changeColor(s, B.BLUE, l.blue);
      }, this.black.onclick = () => {
        l.changeColor(s, B.BLACK, l.black);
      }, this.white.onclick = () => {
        l.changeColor(s, B.WHITE, l.white);
      }, this.grey.onclick = () => {
        l.changeColor(s, B.GREY, l.grey);
      };
    }
    let r = 2, n = 4, o = 6;
    switch (s instanceof Mi ? (r = 10, n = 20, o = 40) : s instanceof Xn && (r = 15, n = 20, o = 25), s.getOperatorSize()) {
      case r:
        this.selectSize(this.small);
        break;
      case n:
        this.selectSize(this.normal);
        break;
      case o:
        this.selectSize(this.big);
        break;
    }
    const c = this;
    this.small.onclick = () => {
      s.setOperatorSize(r), c.selectSize(c.small);
    }, this.normal.onclick = () => {
      s.setOperatorSize(n), c.selectSize(c.normal);
    }, this.big.onclick = () => {
      s.setOperatorSize(o), c.selectSize(c.big);
    };
  }
  showSizeOptions() {
    if (!(this.imageEditor.getOperatorType() != D.MOSAIC)) {
      this.colorOptions.style.display = "none";
      let e = Number(this.optionBar.style.left.replace("px", ""));
      e = e + 196 / 2;
      let s = this.optionBar.getBoundingClientRect().width;
      this.optionBar.style.left = e + "px";
      const i = s / 2;
      this.optionArrow.style.left = i + "px";
    }
  }
  showFullOptions() {
    if (!(this.colorOptions.style.display == "inline-block")) {
      this.colorOptions.style.display = "inline-block";
      let e = Number(this.optionArrow.style.left.replace("px", ""));
      e = e + 168 / 2, this.optionArrow.style.left = e + "px";
    }
  }
  changeColor(t, e, s) {
    t.setOperatorColor(e);
    const i = [this.red, this.orangle, this.green, this.blue, this.black, this.white, this.grey];
    for (const r of i)
      r == s ? this.activeColor(r) : this.deactiveColor(r);
  }
  activeColor(t) {
    t.setAttribute(st.COLOR_ACTIVE_FLAG, "true"), t != this.white ? (t.style.border = "6px solid " + this.eleColorMap.get(t), t.style.backgroundColor = "white") : (t.style.border = "6px solid #E6E6E6", t.style.backgroundColor = "white");
  }
  deactiveColor(t) {
    t.getAttribute(st.COLOR_ACTIVE_FLAG) && (t != this.white ? (t.style.border = "0", t.style.backgroundColor = this.eleColorMap.get(t)) : (t.style.border = "solid 1px #E6E6E6", t.style.backgroundColor = "white"), t.removeAttribute(st.COLOR_ACTIVE_FLAG));
  }
  selectSize(t) {
    const e = [this.small, this.normal, this.big];
    for (const s of e)
      t == s ? this.activeSize(s) : this.deactiveSize(s);
  }
  activeSize(t) {
    t.style.backgroundColor = st.ACTIVE_SIZE_COLOR;
  }
  deactiveSize(t) {
    t.style.backgroundColor = st.DEACTIVE_SIZE_COLOR;
  }
  hideToolbar() {
    this.toolbar.style.visibility = "hidden", this.hideOptionBar();
  }
  showToolbar() {
    this.toolbar.style.visibility = "visible", this.imageEditor.getOperatorType() != D.NONE && this.showOptionBarDirect(), this.fixToolbarPosition();
  }
  initResizers() {
    const t = this;
    this.northStartFn = (e) => {
      t.resizeStart("north", e);
    }, this.northWestStartFn = (e) => {
      t.resizeStart("northwest", e);
    }, this.westStartFn = (e) => {
      t.resizeStart("west", e);
    }, this.southWestStartFn = (e) => {
      t.resizeStart("southwest", e);
    }, this.southStartFn = (e) => {
      t.resizeStart("south", e);
    }, this.southEastStartFn = (e) => {
      t.resizeStart("southeast", e);
    }, this.eastStartFn = (e) => {
      t.resizeStart("east", e);
    }, this.northEastStartFn = (e) => {
      t.resizeStart("northeast", e);
    }, this.resizeMoveFn = (e) => {
      this.resizingType !== null && (t.onResizeMove(e), t.fixResizerPosition());
    }, this.resizeFinishFn = (e) => {
      if (this.resizingType === null)
        return;
      const s = this.finishResize();
      this.showToolbar();
      const i = new ye(
        this.canvasWrapper,
        this.fabricWrapperEl,
        this.imageEditor.getCanvas()
      );
      this.recordBeforeResize.offsetX = -s.offsetX, this.recordBeforeResize.offsetY = -s.offsetY, i.offsetX = s.offsetX, i.offsetY = s.offsetY, this.imageEditor.getHistory().recordDimsChangeAction(this.recordBeforeResize, i, () => this.fixResizerPosition());
    }, this.northResizer.addEventListener("mousedown", this.northStartFn), this.northWestResizer.addEventListener("mousedown", this.northWestStartFn), this.westResizer.addEventListener("mousedown", this.westStartFn), this.southWestResizer.addEventListener("mousedown", this.southWestStartFn), this.southResizer.addEventListener("mousedown", this.southStartFn), this.southEastResizer.addEventListener("mousedown", this.southEastStartFn), this.eastResizer.addEventListener("mousedown", this.eastStartFn), this.northEastResizer.addEventListener("mousedown", this.northEastStartFn), document.addEventListener("mousemove", this.resizeMoveFn), document.addEventListener("mouseup", this.resizeFinishFn);
  }
  resizeStart(t, e) {
    this.recordBeforeResize = new ye(
      this.canvasWrapper,
      this.fabricWrapperEl,
      this.imageEditor.getCanvas()
    );
    const s = this.canvasWrapper.style, i = this.fabricWrapperEl.style;
    this.resizingType = t, this.resizeStartInfo = {
      x: e.pageX,
      y: e.pageY,
      left: O(s.left),
      top: O(s.top),
      height: O(s.height),
      width: O(s.width),
      fwLeft: O(i.left),
      fwTop: O(i.top)
    }, this.hideToolbar();
  }
  onResizeMove(t) {
    if (this.resizingType === null)
      return;
    const e = this.resizeStartInfo, s = t.pageX, i = t.pageY, r = this.resizingType, n = r !== "north" && r !== "south" ? s - e.x : 0, o = r !== "east" && r !== "west" ? i - e.y : 0;
    let h = n, c = o;
    const l = r === "north" || r === "northeast" || r === "northwest", u = r === "west" || r === "southwest" || r === "northwest", d = r === "south" || r === "southeast" || r === "southwest", g = r === "east" || r === "northeast" || r === "southeast";
    let f = e.top, v = e.fwTop, x = e.left, b = e.fwLeft, C = e.height, _ = e.width;
    l && c != 0 ? (C = e.height - c, C < 80 && (C = 80, c = e.height - C), f = e.top + c, v = e.fwTop - c) : d && c != 0 && (C = e.height + c, C < 80 && (C = 80)), u && h != 0 ? (_ = e.width - h, _ < 80 && (_ = 80, h = e.width - _), x = e.left + h, b = e.fwLeft - h) : g && h != 0 && (_ = e.width + h, _ < 80 && (_ = 80)), this.canvasWrapper.style.width = _ + "px", this.canvasWrapper.style.height = C + "px", this.canvasWrapper.style.top = f + "px", this.canvasWrapper.style.left = x + "px", this.fabricWrapperEl.style.top = v + "px", this.fabricWrapperEl.style.left = b + "px";
  }
  finishResize() {
    const t = document.querySelector("body");
    return t.style.cursor = "default", this.resizingType != null ? (this.resizingType = null, this.adaptCanvasToViewport()) : { offsetX: 0, offsetY: 0 };
  }
  adaptCanvasToViewport() {
    const t = this.imageEditor, e = this.fabricWrapperEl.style, s = this.canvasWrapper.style, i = O(e.top), r = O(e.left), n = O(e.width), o = O(e.height), h = O(s.width), c = O(s.height);
    let l = i, u = r, d = n, g = o, f = 0, v = 0;
    i > 0 && (l = 0, g = g + i, v = i), r > 0 && (u = 0, d = d + r, f = r);
    const x = d - u - h;
    x < 0 && (d = d + Math.abs(x));
    const b = g - l - c;
    return b < 0 && (g = g + Math.abs(b)), l != i && (e.top = l + "px"), (d != n || g != o) && t.setCanvasDims(d, g), (f != 0 || v != 0) && t.transform(f, v), (u != r || l != i) && (e.left = u + "px", e.top = l + "px"), {
      offsetX: f,
      offsetY: v
    };
  }
  // 四周如果有白板，就把白板都缩了，其它的不同，相当于只动画板，不动画布
  shrinkCanvas() {
    const t = this.imageEditor.getCanvas(), e = this.imageEditor.getBackgroundImage(), s = e.getXY(), i = new ye(this.canvasWrapper, this.fabricWrapperEl, t);
    if (e.angle % 90 != 0)
      throw new Error("底图只能旋转90度或者180度");
    const r = e.angle % 180 == 0, n = r ? e.width : e.height, o = r ? e.height : e.width, { visiableHeight: h, visiableWidth: c, left: l, top: u } = this.getCanvasAreaInfo(), d = s.x - n / 2, g = d > l ? d - l : 0, f = s.y - o / 2, v = f > u ? f - u : 0, x = s.x + n / 2, b = l + c > x ? l + c - x : 0, C = s.y + o / 2, _ = u + h > C ? u + h - C : 0, S = O(this.canvasWrapper.style.width), k = O(this.canvasWrapper.style.height), M = O(this.canvasWrapper.style.top), A = O(this.canvasWrapper.style.left);
    this.canvasWrapper.style.width = S - g - b + "px", this.canvasWrapper.style.height = k - _ - v + "px", this.canvasWrapper.style.top = M + v + "px", this.canvasWrapper.style.left = A + g + "px", this.fabricWrapperEl.style.top = -u - v + "px", this.fabricWrapperEl.style.left = -l - g + "px", this.fixComponentsPosition();
    const E = new ye(this.canvasWrapper, this.fabricWrapperEl, t);
    this.imageEditor.getHistory().recordDimsChangeAction(i, E, () => this.fixComponentsPosition());
  }
  // 如果图片没有显示全，那么先显示全图片
  extendsCanvas() {
    const t = this.imageEditor.getCanvas(), e = this.imageEditor.getBackgroundImage(), { visiableHeight: s, visiableWidth: i, left: r, top: n, canvasHeight: o, canvasWidth: h } = this.getCanvasAreaInfo(), c = new ye(this.canvasWrapper, this.fabricWrapperEl, t), l = e.getXY();
    if (e.angle % 90 != 0)
      throw new Error("底图只能旋转90度或者180度");
    const u = e.angle % 180 == 0, d = u ? e.width : e.height, g = u ? e.height : e.width, f = l.x - d / 2, v = l.x + d / 2, x = l.y - g / 2, b = l.y + g / 2, C = x - n, _ = f - r, S = s - (b - n), k = i - (v - r), M = O(this.canvasWrapper.style.width), A = O(this.canvasWrapper.style.height), E = O(this.canvasWrapper.style.top), F = O(this.canvasWrapper.style.left);
    let P = Math.max(_, k), Y = Math.max(C, S), H = Math.min(_, k), L = Math.min(C, S), X = 0, Q = 0;
    P >= 0 && P !== H ? X = P : P >= 0 && P === H && (X = P + Math.round(e.width * 0.2)), Y >= 0 && Y !== L ? Q = Y : Y >= 0 && Y === L && (Q = Y + Math.round(e.height * 0.15));
    const U = X - _, dt = X - k, W = Q - C, mt = Q - S, vt = A + mt + W, se = M + U + dt;
    this.canvasWrapper.style.width = se + "px", this.canvasWrapper.style.height = vt + "px";
    const We = E - W > 0 ? E - W : 0, ie = F - U > 0 ? F - U : 0;
    this.canvasWrapper.style.top = We + "px", this.canvasWrapper.style.left = ie + "px";
    let Tt = 0, re = 0, yt = 0, jt = 0;
    U < r ? (Tt = U - r, this.fabricWrapperEl.style.left = Tt + "px") : U >= r && (yt = U - r, this.fabricWrapperEl.style.left = "0", this.imageEditor.transformX(yt)), W < n ? (re = W - n, this.fabricWrapperEl.style.top = re + "px") : W >= n && (jt = W - n, this.fabricWrapperEl.style.top = "0", this.imageEditor.transformY(jt));
    const Qe = se - (h - r), fe = vt - (o - n), Lt = Qe > 0 ? h + Qe : h, Vn = fe > 0 ? o + fe : o;
    this.imageEditor.setCanvasDims(Lt, Vn), this.fixComponentsPosition();
    const si = new ye(this.canvasWrapper, this.fabricWrapperEl, t);
    si.offsetX = yt, si.offsetY = jt, c.offsetX = -yt, c.offsetY = -jt, this.imageEditor.getHistory().recordDimsChangeAction(c, si, () => this.fixComponentsPosition());
  }
  flipHorizontal() {
    var c;
    const { right: t, canvasWidth: e } = this.getCanvasAreaInfo();
    this.fabricWrapperEl.style.left = -t + "px";
    const s = (c = this.imageEditor) == null ? void 0 : c.getCanvas(), i = this.imageEditor.getBackgroundImage(), r = i.flipX;
    i.flipX = !r;
    const n = i.getX(), o = e - n;
    i.setX(o);
    const h = s.getObjects() ?? [];
    for (const l of h) {
      if (l === i)
        continue;
      const u = l.flipX, d = l.getX(), g = e - d;
      l.flipX = !u, l.setX(g), l.setCoords();
    }
    s.renderAll();
  }
  flipVertical() {
    var c;
    const { bottom: t, canvasHeight: e } = this.getCanvasAreaInfo();
    this.fabricWrapperEl.style.top = -t + "px";
    const s = (c = this.imageEditor) == null ? void 0 : c.getCanvas(), i = this.imageEditor.getBackgroundImage(), r = i.flipY;
    i.flipY = !r;
    const n = i.getY(), o = e - n;
    i.setY(o);
    const h = s.getObjects() ?? [];
    for (const l of h) {
      if (l === i)
        continue;
      const u = l.flipY, d = l.getY(), g = e - d;
      l.flipY = !u, l.setY(g), s.setActiveObject(l);
    }
    s.renderAll();
  }
  // 顺时针旋转90度
  rotateClockwise() {
    const t = this.getCanvasAreaInfo(), { left: e, bottom: s } = t, { canvasWidth: i, canvasHeight: r } = t, { visiableHeight: n, visiableWidth: o } = t, h = this.imageEditor.getCanvas();
    this.imageEditor.setCanvasDims(r, i);
    const c = this.fabricWrapperEl.style;
    c.left = -1 * s + "px", c.top = -1 * e + "px", this.canvasWrapper.style.width = n + "px", this.canvasWrapper.style.height = o + "px";
    const l = h.getObjects() ?? [];
    for (const d of l) {
      const f = (d.angle + 90) % 360;
      d.set("angle", f);
      const v = d.getCenterPoint();
      console.log(v);
      const x = new w(r - v.y, v.x);
      d.setXY(x, "center", "center");
    }
    const u = h.getObjects() ?? [];
    for (const d of u)
      d.setCoords();
    h.renderAll(), this.moveCanvasToCenter();
  }
  // 逆时针旋转90度
  rotateCounterClockwise() {
    const t = this.getCanvasAreaInfo(), { right: e, top: s } = t, { canvasWidth: i, canvasHeight: r } = t, { visiableHeight: n, visiableWidth: o } = t, h = this.imageEditor.getCanvas();
    this.imageEditor.setCanvasDims(r, i);
    const c = this.fabricWrapperEl.style;
    c.left = -1 * s + "px", c.top = -1 * e + "px", this.canvasWrapper.style.width = n + "px", this.canvasWrapper.style.height = o + "px";
    const l = h.getObjects() ?? [];
    for (const d of l) {
      const f = (d.angle - 90) % 360;
      d.set("angle", f);
      const v = d.getCenterPoint(), x = new w(v.y, i - v.x);
      d.setXY(x, "center", "center");
    }
    const u = h.getObjects() ?? [];
    for (const d of u)
      d.setCoords();
    h.renderAll(), this.moveCanvasToCenter();
  }
  moveCanvasToCenter() {
    const { width: t, height: e } = this.wrapper.getBoundingClientRect(), { width: s, height: i, left: r, top: n } = this.canvasWrapper.getBoundingClientRect();
    let o, h;
    t <= s ? (o = 0, this.canvasWrapper.style.left = String(o)) : (o = (t - s) / 2, this.canvasWrapper.style.left = o + "px"), e <= i ? (h = 0, this.canvasWrapper.style.top = String(h)) : (h = (e - i) / 2, this.canvasWrapper.style.top = h + "px"), this.fixComponentsPosition();
  }
  fixComponentsPosition() {
    this.fixResizerPosition();
  }
  fixResizerPosition() {
    const t = O(this.canvasWrapper.style.top), e = O(this.canvasWrapper.style.left), s = O(this.canvasWrapper.style.width), i = O(this.canvasWrapper.style.height), r = t - 12, n = e + s / 2 - 6, o = t + i / 2 - 6, h = e - 12, c = t + i, l = e + s / 2 - 6, u = t + i / 2 - 6, d = e + s;
    this.northResizer.style.top = r + "px", this.northResizer.style.left = n + "px", this.northWestResizer.style.top = r + "px", this.northWestResizer.style.left = h + "px", this.westResizer.style.top = o + "px", this.westResizer.style.left = h + "px", this.southWestResizer.style.top = c + "px", this.southWestResizer.style.left = h + "px", this.southResizer.style.top = c + "px", this.southResizer.style.left = l + "px", this.southEastResizer.style.top = c + "px", this.southEastResizer.style.left = d + "px", this.eastResizer.style.top = u + "px", this.eastResizer.style.left = d + "px", this.northEastResizer.style.top = r + "px", this.northEastResizer.style.left = d + "px";
  }
  fixToolbarPosition() {
  }
  adjustOptionBarPosition(t) {
    if (t == null)
      return;
    const e = Wh(t), s = this.optionBar;
    s.style.display = "inline-block", s.style.left = Math.round(e.x - 130) + "px", s.style.top = Math.round(e.y + 36) + "px";
  }
  getCanvasAreaInfo() {
    const t = xe(this.fabricWrapperEl.style.width.replace("px", "")), e = xe(this.fabricWrapperEl.style.height.replace("px", "")), s = -1 * xe(this.fabricWrapperEl.style.left.replace("px", "")), i = -1 * xe(this.fabricWrapperEl.style.top.replace("px", "")), r = xe(this.canvasWrapper.style.width.replace("px", "")), n = xe(this.canvasWrapper.style.height.replace("px", "")), o = t - r - s, h = e - n - i;
    return {
      canvasWidth: t,
      canvasHeight: e,
      visiableWidth: r,
      visiableHeight: n,
      top: i,
      bottom: h,
      left: s,
      right: o
    };
  }
  getScreenshotCanvas() {
    return this.screenshotCanvas;
  }
  getScreenshotResizers() {
    return this.screenshotResizer;
  }
  getScreenshotToolbar() {
    return this.screenshotToolbar;
  }
  getScreenshotConfirmButton() {
    return this.screenshotConfirmButton;
  }
  getScreenshotCancelButton() {
    return this.screenshotCancelButton;
  }
  getFabricWrapper() {
    return this.fabricWrapperEl;
  }
  // 不能用两个canvas，两个canvas会带来闪烁的问题，直接在原来的canvas上操作
  cropImage() {
    this.hideToolbar();
    const t = O(this.canvasWrapper.style.width), e = O(this.canvasWrapper.style.height), s = this.imageEditor.getScreenshoter(), i = O(this.canvasWrapper.style.left), r = O(this.canvasWrapper.style.top);
    s.initMask(i, r, t, e);
  }
  resetWrapper(t, e) {
    this.canvasWrapper.style.width = t + "px", this.canvasWrapper.style.height = e + "px", this.moveCanvasToCenter();
  }
  hideResizer() {
    this.northResizer.style.display = "none", this.northWestResizer.style.display = "none", this.westResizer.style.display = "none", this.southWestResizer.style.display = "none", this.southResizer.style.display = "none", this.southEastResizer.style.display = "none", this.eastResizer.style.display = "none", this.northEastResizer.style.display = "none";
  }
  showResizer() {
    this.northResizer.style.display = "block", this.northWestResizer.style.display = "block", this.westResizer.style.display = "block", this.southWestResizer.style.display = "block", this.southResizer.style.display = "block", this.southEastResizer.style.display = "block", this.eastResizer.style.display = "block", this.northEastResizer.style.display = "block";
  }
  resetImageEditor() {
    const t = this.imageEditor.getCanvas(), e = this.imageEditor.getBackgroundImage(), s = this.imageEditor.getInitialBackgroundImage(), i = this.imageEditor.getInitialBackgroundImageDimension(), r = i.width, n = i.height;
    this.imageEditor.setCanvasDims(r, n), s.setXY(new w(r / 2, n / 2)), s.angle = 0, s.scaleX = 1, s.scaleY = 1, s.width = r, s.height = n, s.flipX = !1, s.flipY = !1;
    const o = t.getObjects();
    t.add(s), t.remove(e), s.setCoords();
    for (const f of o)
      f != s && t.remove(f);
    t.renderAll(), this.fabricWrapperEl.style.top = "0", this.fabricWrapperEl.style.left = "0", this.canvasWrapper.style.width = t.width + "px", this.canvasWrapper.style.height = t.height + "px";
    const h = this.wrapper.getBoundingClientRect(), c = h.width, l = h.height;
    let u = (c - r) / 2;
    u <= 20 && (u = 20);
    let d = (l - n) / 2;
    d <= 20 && (d = 20), this.canvasWrapper.style.left = u + "px", this.canvasWrapper.style.top = d + "px", this.imageEditor.setBackgroundImage(s), this.fixComponentsPosition(), this.imageEditor.resetGlobalScale(), this.imageEditor.getHistory().clearStack();
  }
  captureAreaImage() {
    const t = O(this.canvasWrapper.style.width), e = O(this.canvasWrapper.style.height), s = -1 * O(this.fabricWrapperEl.style.left), i = -1 * O(this.fabricWrapperEl.style.top), r = new w(s, i), n = new w(s + t, i + e);
    return this.imageEditor.getAreaImageInfo(r, n);
  }
  confirmAction(t, e = () => {
  }, s = () => {
  }) {
    this.confirmDialogWrapper.style.display = "flex", this.confirmDialogMessage.innerText = t, this.confirmButtonConfirm.onclick = () => {
      e(), this.confirmDialogWrapper.style.display = "none";
    }, this.confirmButtonCancel.onclick = () => {
      s(), this.confirmDialogWrapper.style.display = "none";
    };
  }
  destory() {
    document.removeEventListener("mousemove", this.resizeMoveFn), document.removeEventListener("mouseup", this.resizeFinishFn), this.imageEditor.destory(), this.parent.removeChild(this.wrapper), this.parent.removeChild(this.toolbar), this.parent.removeChild(this.optionBar);
  }
};
p(st, "HAS_CURSOR_CSS_ADDED", !1), p(st, "COLOR_ACTIVE_FLAG", "color_in_active"), p(st, "ACTIVE_SIZE_COLOR", "#1AAD19"), p(st, "DEACTIVE_SIZE_COLOR", "#C8C8C8");
let Di = st;
class ue {
  // 在scale的时候，直接重新绘制，不要等比例变换，等比例变换会导致矩形、箭头出问题
  static setScaleToRedraw(t, e) {
    t.on("scaling", () => {
      const s = e.getTransform();
      if (!s || s.target !== t)
        return;
      const i = e.getTransformState(), { scaleX: r, scaleY: n, width: o, height: h } = t, { scaleX: c, scaleY: l } = i;
      t.set({
        width: o * r,
        height: h * n,
        scaleX: c,
        // 重置缩放
        scaleY: l
      }), t.objectCaching = !1;
    });
  }
  // 专门针对椭圆进行的重绘
  static setScaleToRedrawEllipse(t, e) {
    t.on("scaling", () => {
      const s = e.getTransform();
      if (!s || s.target !== t)
        return;
      const i = e.getTransformState(), { scaleX: r, scaleY: n, width: o, height: h } = t, { scaleX: c, scaleY: l } = i, u = t.strokeWidth;
      let d = o * r / 2, g = h * n / 2;
      d > u / 2 && (d = d - u / 2), g > u / 2 && (g = g - u / 2), t.set({
        rx: d,
        ry: g,
        width: o * r,
        height: h * n,
        scaleX: c,
        // 重置缩放
        scaleY: l
      }), t.objectCaching = !1;
    });
  }
  static setCenterOrigin(t) {
    t.originX = "center", t.originY = "center";
  }
  static setCornerControlsOnly(t) {
    t.setControlsVisibility({
      mt: !1,
      // 中上
      mb: !1,
      // 中下
      ml: !1,
      // 中左
      mr: !1,
      // 中右
      mtr: !1,
      // 旋转
      tl: !0,
      // 左上角
      tr: !0,
      // 右上角
      bl: !0,
      // 左下角
      br: !0
      // 右下角
    });
  }
}
class Lr {
  constructor(t, e, s) {
    p(this, "canvasWrapper");
    p(this, "fabricWrapperEl");
    p(this, "canvas");
    p(this, "top");
    p(this, "left");
    p(this, "width");
    p(this, "height");
    p(this, "fwTop");
    p(this, "fwLeft");
    p(this, "canvasWidth");
    p(this, "canvasHeight");
    p(this, "objects");
    this.left = t.style.left, this.top = t.style.top, this.width = t.style.width, this.height = t.style.height, this.fwTop = e.style.top, this.fwLeft = e.style.left, this.canvasWidth = s.width, this.canvasHeight = s.height, this.canvasWrapper = t, this.fabricWrapperEl = e, this.canvas = s, this.objects = this.canvas.getObjects();
  }
  restore() {
    this.canvasWrapper.style.left = this.left, this.canvasWrapper.style.top = this.top, this.canvasWrapper.style.width = this.width, this.canvasWrapper.style.height = this.height, this.fabricWrapperEl.style.top = this.fwTop, this.fabricWrapperEl.style.left = this.fwLeft, this.canvas.setDimensions({ width: this.canvasWidth, height: this.canvasHeight });
    const t = this.canvas.getObjects();
    for (const e of t)
      this.canvas.remove(e);
    for (const e of this.objects)
      this.canvas.add(e);
  }
}
class Ih {
  constructor(t, e, s) {
    p(this, "previous");
    p(this, "current");
    p(this, "restore", !1);
    p(this, "fixer");
    this.previous = t, this.current = e, this.fixer = s;
  }
  undo() {
    this.restore || (this.previous.restore(), this.fixer(), this.restore = !0);
  }
  redo() {
    this.restore && (this.current.restore(), this.fixer(), this.restore = !1);
  }
}
class Bh {
  constructor(t, e) {
    p(this, "canvas");
    p(this, "object");
    p(this, "state", 0);
    this.canvas = t, this.object = e;
  }
  undo() {
    this.state == 0 && (this.canvas.remove(this.object), this.canvas.renderAll(), this.state = 1);
  }
  redo() {
    this.state == 1 && (this.canvas.add(this.object), this.canvas.renderAll(), this.state = 0);
  }
}
class Xh {
  constructor(t, e) {
    p(this, "canvas");
    p(this, "object");
    p(this, "state", 0);
    this.canvas = t, this.object = e;
  }
  undo() {
    this.state == 0 && (this.canvas.add(this.object), this.canvas.renderAll(), this.state = 1);
  }
  redo() {
    this.state == 1 && (this.canvas.remove(this.object), this.canvas.renderAll(), this.state = 0);
  }
}
class Yh {
  constructor(t, e, s, i) {
    p(this, "canvas");
    p(this, "object");
    p(this, "previousX");
    p(this, "previousY");
    p(this, "currentX");
    p(this, "currentY");
    this.object = e, this.previousX = s, this.previousY = i, this.currentX = e.getX(), this.currentY = e.getY(), this.canvas = t;
  }
  undo() {
    this.object.setX(this.previousX), this.object.setY(this.previousY), this.object.setCoords(), this.canvas.renderAll();
  }
  redo() {
    this.object.setX(this.currentX), this.object.setY(this.currentY), this.object.setCoords(), this.canvas.renderAll();
  }
}
class Hh {
  constructor(t, e, s) {
    p(this, "canvas");
    p(this, "object");
    p(this, "previousAngle");
    p(this, "currentAngle");
    this.object = e, this.canvas = t, this.previousAngle = s, this.currentAngle = e.angle;
  }
  undo() {
    this.object.angle = this.previousAngle, this.object.setCoords(), this.canvas.renderAll();
  }
  redo() {
    this.object.angle = this.currentAngle, this.object.setCoords(), this.canvas.renderAll();
  }
}
class Yn {
  constructor(t, e, s, i, r, n) {
    p(this, "canvas");
    p(this, "object");
    p(this, "previousWidth");
    p(this, "previousHeight");
    p(this, "previousX");
    p(this, "previousY");
    p(this, "currentWidth");
    p(this, "currentHeight");
    p(this, "currentX");
    p(this, "currentY");
    this.canvas = t, this.object = e, this.previousWidth = s, this.previousHeight = i, this.previousX = r, this.previousY = n, this.currentWidth = e.get("width"), this.currentHeight = e.get("height"), this.currentX = e.getX(), this.currentY = e.getY();
  }
  undo() {
    this.object.set({ width: this.previousWidth, height: this.previousHeight }), this.object.setX(this.previousX), this.object.setY(this.previousY), this.object.setCoords(), this.canvas.renderAll();
  }
  redo() {
    this.object.set({ width: this.currentWidth, height: this.currentHeight }), this.object.setX(this.currentX), this.object.setY(this.currentY), this.object.setCoords(), this.canvas.renderAll();
  }
}
class Vh {
  constructor(t, e, s, i, r, n) {
    p(this, "canvas");
    p(this, "object");
    p(this, "preScaleX");
    p(this, "preScaleY");
    p(this, "preX");
    p(this, "preY");
    p(this, "curScaleX");
    p(this, "curScaleY");
    p(this, "curX");
    p(this, "curY");
    this.canvas = t, this.object = e, this.preScaleX = s, this.preScaleY = i, this.preX = r, this.preY = n, this.curScaleX = e.scaleX, this.curScaleY = e.scaleY, this.curX = e.getX(), this.curY = e.getY();
  }
  undo() {
    this.object.scaleX = this.preScaleX, this.object.scaleY = this.preScaleY, this.object.setXY(new w(this.preX, this.preY)), this.object.setCoords(), this.canvas.renderAll();
  }
  redo() {
    this.object.scaleX = this.curScaleX, this.object.scaleY = this.curScaleX, this.object.setXY(new w(this.curX, this.curY)), this.object.setCoords(), this.canvas.renderAll();
  }
}
class Nh extends Yn {
  constructor(e, s, i, r, n, o, h, c) {
    super(e, s, i, r, n, o);
    p(this, "previousRX");
    p(this, "previousRY");
    p(this, "currentRX");
    p(this, "currentRY");
    this.previousRX = h, this.previousRY = c, this.currentRX = s.rx, this.currentRY = s.ry;
  }
  undo() {
    const e = this.object;
    e.rx = this.previousRX, e.ry = this.previousRY, super.undo();
  }
  redo() {
    const e = this.object;
    e.rx = this.currentRX, e.ry = this.currentRY, super.redo();
  }
}
class Gh {
  constructor(t, e) {
    p(this, "undoFn");
    p(this, "redoFn");
    p(this, "restore", !1);
    this.undoFn = t, this.redoFn = e;
  }
  undo() {
    this.restore || (this.undoFn(), this.restore = !0);
  }
  redo() {
    this.restore && (this.redoFn(), this.restore = !1);
  }
}
class Uh {
  constructor(t) {
    p(this, "undoStack");
    p(this, "redoStack");
    p(this, "imageEditor");
    p(this, "canvas");
    this.undoStack = [], this.redoStack = [], this.imageEditor = t, this.canvas = t.getCanvas();
  }
  getCanvas() {
    return this.canvas;
  }
  redo() {
    if (this.redoStack.length > 0) {
      const t = this.redoStack.pop();
      return t.redo(), this.undoStack.push(t), !0;
    }
    return !1;
  }
  undo() {
    if (this.undoStack.length > 0) {
      const t = this.undoStack.pop();
      return t.undo(), this.redoStack.push(t), !0;
    }
    return !1;
  }
  recordCreateAction(t) {
    this.undoStack.push(new Bh(this.canvas, t)), this.clearRedoStack();
  }
  recordRemoveAction(t) {
    this.undoStack.push(new Xh(this.canvas, t)), this.clearRedoStack();
  }
  recordRotateAction(t, e) {
    this.undoStack.push(new Hh(this.canvas, t, e)), this.clearRedoStack();
  }
  recordMoveAction(t, e, s) {
    this.undoStack.push(new Yh(this.canvas, t, e, s)), this.clearRedoStack();
  }
  // 放缩会改变图形的位置，因此还原的时候要注意
  recordRedrawScaleAction(t, e, s, i, r) {
    this.undoStack.push(new Yn(this.canvas, t, e, s, i, r)), this.clearRedoStack();
  }
  // 放缩会改变图形的位置，因此还原的时候要注意
  recordKeepRatioScaleAction(t, e, s, i, r) {
    this.undoStack.push(new Vh(this.canvas, t, e, s, i, r)), this.clearRedoStack();
  }
  recordEllipseScaleAction(t, e, s, i, r, n, o) {
    this.undoStack.push(new Nh(this.canvas, t, e, s, i, r, n, o)), this.clearRedoStack();
  }
  recordCropAction() {
    this.clearRedoStack();
  }
  recordDimsChangeAction(t, e, s) {
    t.equals(e) || (t.imageEditor = this.imageEditor, e.imageEditor = this.imageEditor, this.undoStack.push(new zh(t, e, s)), this.clearRedoStack());
  }
  // 通过反向操作实现撤销，通常应用于翻转
  recordReverseAction(t, e) {
    this.undoStack.push(new Gh(t, e)), this.clearRedoStack();
  }
  recordSnapshotAction(t, e, s) {
    this.undoStack.push(new Ih(t, e, s)), this.clearRedoStack();
  }
  clearRedoStack() {
    this.redoStack = [];
  }
  clearStack() {
    this.redoStack = [], this.undoStack = [];
  }
}
class Hn extends Zt {
  constructor([e, s, i, r] = [0, 0, 0, 0], n = {}) {
    super([e, s, i, r], n);
    p(this, "arrowWidth", 4);
  }
  // 8种情况的分解 是在所难免的
  _render(e) {
    super._render(e), e.save();
    const s = this.x2 - this.x1, i = this.y2 - this.y1;
    let r = i > 0 ? this.height : -this.height, n = s > 0 ? this.width : -this.width;
    s == 0 && (n = 0), i == 0 && (r = 0);
    const o = Math.atan2(r, n);
    this.translateArrow(e), e.rotate(o), e.beginPath(), e.moveTo(this.arrowWidth * 2, 0), e.lineTo(-this.arrowWidth * 2, this.arrowWidth * 2), e.lineTo(-this.arrowWidth * 2, -this.arrowWidth * 2), e.closePath(), e.fillStyle = String(this.stroke), e.fill(), e.restore();
  }
  translateArrow(e) {
    const s = this.x2 - this.x1, i = this.y2 - this.y1;
    s == 0 && i > 0 ? e.translate(0, this.height / 2) : s == 0 && i < 0 ? e.translate(0, -this.height / 2) : i == 0 && s > 0 ? e.translate(this.width / 2, 0) : i == 0 && s < 0 ? e.translate(-this.width / 2, 0) : s > 0 && i > 0 ? e.translate(this.width / 2, this.height / 2) : s > 0 && i < 0 ? e.translate(this.width / 2, -this.height / 2) : s < 0 && i > 0 ? e.translate(-this.width / 2, this.height / 2) : s < 0 && i < 0 && e.translate(-this.width / 2, -this.height / 2);
  }
}
class qh {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "start");
    p(this, "current");
    p(this, "startX");
    p(this, "startY");
    p(this, "color", Fe);
    p(this, "strokeWidth", ei);
    this.imageEditor = t, this.canvas = t.getCanvas(), this.start = !1, this.startX = 0, this.startY = 0;
  }
  getOperatorSize() {
    return this.strokeWidth;
  }
  getOperatorColor() {
    return this.color;
  }
  setOperatorSize(t) {
    this.strokeWidth = t;
  }
  setOperatorColor(t) {
    this.color = t;
  }
  handleMouseDown(t) {
    let e = this.canvas.getActiveObject() != null || this.start;
    if (e = e || this.imageEditor.getOperatorType() != D.ARROW, e)
      return;
    this.start = !0;
    const s = this.canvas;
    s.requestRenderAll();
    let i = s.getScenePoint(t.e);
    const r = [i.x, i.y, i.x, i.y];
    this.startX = i.x, this.startY = i.y;
    const n = new Hn(r, {
      strokeWidth: this.strokeWidth,
      stroke: this.color,
      lockScalingFlip: !0,
      perPixelTargetFind: !0,
      originX: "center",
      originY: "center"
    });
    this.current = n, s.add(n);
  }
  handleMouseMove(t) {
    var s;
    if (!this.start)
      return;
    const e = this.canvas.getScenePoint(t.e);
    (s = this.current) == null || s.set({
      x2: e.x,
      y2: e.y
    }), this.canvas.renderAll();
  }
  handleMouseUp(t) {
    if (this.imageEditor.getOperatorType() != D.ARROW || !this.start)
      return;
    this.start = !1;
    const s = this.canvas.getScenePoint(t.e);
    Math.abs(s.x - this.startX) < 8 && Math.abs(s.y - this.startY) < 8 && this.current ? this.canvas.remove(this.current) : (ue.setScaleToRedraw(this.current, this.imageEditor), this.imageEditor.getHistory().recordCreateAction(this.current), this.canvas.setActiveObject(this.current), this.current.setCoords());
  }
}
class Kh {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "history");
    p(this, "color", Fe);
    p(this, "strokeWidth", ei);
    p(this, "recorder");
    p(this, "brush");
    p(this, "enableDraw", !1);
    this.imageEditor = t, this.canvas = t.getCanvas(), this.history = t.getHistory(), this.recorder = this.recordPathCreate.bind(this);
  }
  getOperatorSize() {
    return this.strokeWidth;
  }
  getOperatorColor() {
    return this.color;
  }
  setOperatorSize(t) {
    this.strokeWidth = t, this.brush.width = t;
  }
  setOperatorColor(t) {
    this.color = t, this.brush.color = t;
  }
  recordPathCreate(t) {
    const e = t.path, s = e.getBoundingRect();
    e.set({
      originX: "center",
      originY: "center",
      left: s.left + s.width / 2,
      top: s.top + s.height / 2
    }), e.perPixelTargetFind = !0, e.lockScalingFlip = !0, this.canvas.renderAll(), this.history.recordCreateAction(e);
  }
  tryToStartDraw() {
    this.imageEditor.getOperatorType() === D.DRAW && (this.canvas._hoveredTarget || (this.enableDraw = !0, this.startDrawMode()));
  }
  tryToFinishDraw() {
    this.imageEditor.getOperatorType() === D.DRAW && this.enableDraw && (this.endDrawMode(), this.enableDraw = !1);
  }
  startDrawMode() {
    const t = this.canvas;
    t.isDrawingMode = !0, t.freeDrawingBrush = new Ke(t), this.brush = t.freeDrawingBrush;
    let e = t.freeDrawingBrush;
    e.color = this.color, e.width = this.strokeWidth, e.shadow = new Ct({ blur: 2, offsetX: 0, offsetY: 0, color: "#333" }), this.canvas.on("path:created", this.recorder);
  }
  endDrawMode() {
    this.canvas.isDrawingMode = !1, this.canvas.off("path:created", this.recorder);
  }
}
class Jh {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "start");
    p(this, "current");
    p(this, "startX");
    p(this, "startY");
    p(this, "strokeWidth", ei);
    p(this, "color", Fe);
    this.imageEditor = t, this.canvas = t.getCanvas(), this.start = !1, this.startX = 0, this.startY = 0;
  }
  getOperatorSize() {
    return this.strokeWidth;
  }
  getOperatorColor() {
    return this.color;
  }
  setOperatorSize(t) {
    this.strokeWidth = t;
  }
  setOperatorColor(t) {
    this.color = t;
  }
  handleMouseDown(t) {
    const e = this.canvas;
    if (e.getActiveObject() != null || this.imageEditor.getOperatorType() != D.ELLIPSE || this.start)
      return;
    this.start = !0;
    let s = e.getScenePoint(t.e);
    this.startX = s.x, this.startY = s.y, this.current = new ft({
      originX: "center",
      originY: "center",
      rx: 0,
      ry: 0,
      fill: "transparent",
      stroke: this.color,
      strokeWidth: this.strokeWidth,
      lockScalingFlip: !0,
      perPixelTargetFind: !0
    }), e.add(this.current);
  }
  handleMouseMove(t) {
    if (!this.start)
      return;
    let e = this.canvas.getScenePoint(t.e), s = Math.abs(e.x - this.startX) / 2, i = Math.abs(e.y - this.startY) / 2;
    s > this.strokeWidth / 2 && (s = s - this.strokeWidth / 2), i > this.strokeWidth / 2 && (i = i - this.strokeWidth / 2);
    let r = (this.startX + e.x) / 2, n = (this.startY + e.y) / 2;
    this.current.set("rx", s), this.current.set("ry", i), this.current.setXY(new w(r, n)), this.canvas.requestRenderAll();
  }
  handleMouseUp(t) {
    if (!this.start || this.imageEditor.getOperatorType() != D.ELLIPSE)
      return;
    this.start = !1;
    let e = this.canvas.getScenePoint(t.e);
    e.x == this.startX || e.y == this.startY ? this.canvas.remove(this.current) : (ue.setScaleToRedrawEllipse(this.current, this.imageEditor), this.imageEditor.getHistory().recordCreateAction(this.current), this.canvas.setActiveObject(this.current), this.current.setCoords()), this.current = void 0;
  }
}
class Zh {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "canvas");
    p(this, "start");
    p(this, "startX");
    p(this, "startY");
    p(this, "strokeWidth", ei);
    p(this, "color", Fe);
    p(this, "current");
    this.imageEditor = t, this.canvas = t.getCanvas(), this.start = !1, this.startX = 0, this.startY = 0;
  }
  getOperatorSize() {
    return this.strokeWidth;
  }
  getOperatorColor() {
    return this.color;
  }
  setOperatorSize(t) {
    this.strokeWidth = t;
  }
  setOperatorColor(t) {
    this.color = t;
  }
  handleMouseDown(t) {
    const e = this.canvas;
    if (e.getActiveObject() != null || this.imageEditor.getOperatorType() != D.RECT || this.start)
      return;
    this.start = !0;
    let s = e.getScenePoint(t.e);
    this.startX = s.x, this.startY = s.y, this.current = new wt({
      originX: "center",
      originY: "center",
      width: 0,
      height: 0,
      fill: "transparent",
      stroke: this.color,
      strokeWidth: this.strokeWidth,
      lockScalingFlip: !0,
      perPixelTargetFind: !0,
      objectCaching: !1
    }), e.add(this.current);
  }
  handleMouseMove(t) {
    if (!this.start)
      return;
    let e = this.canvas.getScenePoint(t.e), s = Math.abs(e.x - this.startX), i = Math.abs(e.y - this.startY);
    const r = (e.x + this.startX) / 2, n = (e.y + this.startY) / 2;
    this.current.set("width", Math.round(s)), this.current.set("height", Math.round(i)), this.current.setXY(new w(r, n)), this.current.setCoords(), this.canvas.requestRenderAll();
  }
  handleMouseUp(t) {
    if (!this.start || this.imageEditor.getOperatorType() != D.RECT)
      return;
    this.start = !1;
    let e = this.canvas.getScenePoint(t.e), s = Math.abs(e.x - this.startX), i = Math.abs(e.y - this.startY);
    s <= 0 || i <= 0 ? this.canvas.remove(this.current) : (ue.setScaleToRedraw(this.current, this.imageEditor), this.imageEditor.getHistory().recordCreateAction(this.current), this.current.setCoords(), this.canvas.setActiveObject(this.current));
  }
}
const pt = (a) => {
};
class $h {
  constructor() {
    p(this, "mouseMoving", pt);
    p(this, "mouseUp", pt);
    p(this, "resizerPosX", 0);
    p(this, "resizerPosY", 0);
    p(this, "startX", 0);
    p(this, "startY", 0);
    p(this, "movingX", 0);
    p(this, "movingY", 0);
    p(this, "width", 0);
    p(this, "height", 0);
    p(this, "maxLeft", 0);
    p(this, "minLeft", 0);
    p(this, "maxTop", 0);
    p(this, "minTop", 0);
    // 正在激活的
    p(this, "activeResizer", "none");
    p(this, "mask");
    p(this, "maskLeft", 0);
    p(this, "maskTop", 0);
    p(this, "fabricWrapperEl");
    p(this, "imageEditor");
    p(this, "elementManager");
    p(this, "clipArea", { startX: 0, startY: 0, width: 0, height: 0 });
    p(this, "dragger", {
      isClipAreaInDrag: !1,
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
      // 记录鼠标一开始落在的位置
      pointerDownX: 0,
      pointerDownY: 0,
      // 做临时变量用，拖拽结束的时候需要用到
      currentX: 0,
      currentY: 0
    });
    p(this, "dragRecord", {
      northWestTop: 0,
      northWestLeft: 0,
      northTop: 0,
      northLeft: 0,
      northEastTop: 0,
      northEastLeft: 0,
      eastTop: 0,
      eastLeft: 0,
      southTop: 0,
      southLeft: 0,
      southWestTop: 0,
      southWestLeft: 0,
      westTop: 0,
      westLeft: 0
    });
    p(this, "cursorInClipArea", !1);
    p(this, "screenshotResizer");
    p(this, "toolbar");
    p(this, "confirm");
    p(this, "cancel");
    p(this, "confirmFunc", () => {
    });
    p(this, "cancelFunc", () => {
    });
    p(this, "mouseDownNorthWest", pt);
    p(this, "mouseDownNorth", pt);
    p(this, "mouseDownNorthEast", pt);
    p(this, "mouseDownEast", pt);
    p(this, "mouseDownSouthEast", pt);
    p(this, "mosueDownSouth", pt);
    p(this, "mouseDownSouthWest", pt);
    p(this, "mouseDownWest", pt);
    p(this, "canvasMouseDownFunc", pt);
    p(this, "canvasMouseMoveFunc", pt);
    p(this, "canvasMouseUpFunc", pt);
  }
  init(t, e) {
    this.elementManager = e, this.imageEditor = t, this.fabricWrapperEl = e.getFabricWrapper(), this.mask = e.getScreenshotCanvas(), this.screenshotResizer = e.getScreenshotResizers(), this.toolbar = e.getScreenshotToolbar(), this.confirm = e.getScreenshotConfirmButton(), this.cancel = e.getScreenshotCancelButton();
    const s = this, i = (n, o, h) => {
      s.activeResizer = n, s.startX = h.pageX, s.startY = h.pageY, s.resizerPosX = O(o.left), s.resizerPosY = O(o.top);
    }, r = s.screenshotResizer;
    s.mouseDownNorthWest = (n) => {
      i("northwest", r.northWest.style, n);
    }, this.screenshotResizer.northWest.addEventListener("pointerdown", this.mouseDownNorthWest), s.mouseDownNorth = (n) => {
      i("north", r.north.style, n);
    }, this.screenshotResizer.north.addEventListener("pointerdown", this.mouseDownNorth), s.mouseDownNorthEast = (n) => {
      i("northeast", r.northEast.style, n);
    }, this.screenshotResizer.northEast.addEventListener("pointerdown", this.mouseDownNorthEast), s.mouseDownEast = (n) => {
      i("east", r.east.style, n);
    }, this.screenshotResizer.east.addEventListener("pointerdown", this.mouseDownEast), s.mouseDownSouthEast = (n) => {
      i("southeast", r.southEast.style, n);
    }, this.screenshotResizer.southEast.addEventListener("pointerdown", this.mouseDownSouthEast), s.mosueDownSouth = (n) => {
      i("south", r.south.style, n);
    }, this.screenshotResizer.south.addEventListener("pointerdown", this.mosueDownSouth), s.mouseDownSouthWest = (n) => {
      i("southwest", r.southWest.style, n);
    }, this.screenshotResizer.southWest.addEventListener("pointerdown", this.mouseDownSouthWest), s.mouseDownWest = (n) => {
      i("west", r.west.style, n);
    }, this.screenshotResizer.west.addEventListener("pointerdown", this.mouseDownWest), this.cancel.removeEventListener("click", this.cancelFunc), this.confirm.removeEventListener("click", this.confirmFunc), this.cancelFunc = this.cancelScreenshot.bind(this), this.confirmFunc = this.confirmScreenshot.bind(this), this.cancel.addEventListener("click", this.cancelFunc), this.confirm.addEventListener("click", this.confirmFunc);
  }
  handleDragArea() {
    const t = this.mask;
    t.removeEventListener("mousemove", this.canvasMouseMoveFunc), t.removeEventListener("mousedown", this.canvasMouseDownFunc), document.removeEventListener("mouseup", this.canvasMouseUpFunc), this.canvasMouseMoveFunc = (e) => {
      const s = this.clipArea, i = [s.startX, s.startX + s.width], r = [s.startY, s.startY + s.height], n = Math.round(e.pageX - this.maskLeft), o = Math.round(e.pageY - this.maskTop), h = n >= i[0] && n <= i[1], c = o >= r[0] && o <= r[1], l = t.style.cursor;
      if (this.cursorInClipArea = h && c, h && c && l != "move" ? t.style.cursor = "move" : (!h || !c) && l != "default" && !this.dragger.isClipAreaInDrag && (t.style.cursor = "default"), this.dragger.isClipAreaInDrag) {
        const u = e.pageX, d = e.pageY;
        let g = u - this.dragger.pointerDownX, f = d - this.dragger.pointerDownY;
        g + s.startX < 0 ? g = -s.startX : s.startX + g + s.width > this.width && (g = this.width - s.width - s.startX), f + s.startY < 0 ? f = -s.startY : s.startY + f + s.height > this.height && (f = this.height - s.height - s.startY), this.transferClipArea(g, f), this.fixedScreenshotToolbarPosition();
      }
    }, this.canvasMouseDownFunc = (e) => {
      if (this.cursorInClipArea === !1)
        return;
      this.dragger.isClipAreaInDrag = !0, this.dragger.pointerDownX = e.pageX, this.dragger.pointerDownY = e.pageY;
      const s = this.screenshotResizer;
      Object.entries(s).forEach((i) => {
        const r = i[0], n = i[1];
        this.dragRecord[r + "Left"] = O(n.style.left), this.dragRecord[r + "Top"] = O(n.style.top);
      }), this.dragger.height = this.clipArea.height, this.dragger.width = this.clipArea.width, this.dragger.startX = this.clipArea.startX, this.dragger.startY = this.clipArea.startY;
    }, this.canvasMouseUpFunc = (e) => {
      this.dragger.isClipAreaInDrag && (this.dragger.isClipAreaInDrag = !1, this.clipArea.startX = this.dragger.currentX, this.clipArea.startY = this.dragger.currentY);
    }, document.addEventListener("mousemove", this.canvasMouseMoveFunc), t.addEventListener("mousedown", this.canvasMouseDownFunc), document.addEventListener("mouseup", this.canvasMouseUpFunc);
  }
  transferClipArea(t, e) {
    const s = this.screenshotResizer;
    Object.entries(s).forEach((c) => {
      const l = c[0], u = this.dragRecord[l + "Left"], d = this.dragRecord[l + "Top"];
      c[1].style.left = u + t + "px", c[1].style.top = d + e + "px";
    });
    const i = this.dragger.startX + t, r = this.dragger.startY + e, n = this.dragger.width, o = this.dragger.height, h = this.mask.getContext("2d");
    h.clearRect(0, 0, this.width, this.height), h.fillStyle = "rgba(0,0,0,0.4)", h.fillRect(0, 0, this.width, this.height), h.clearRect(i, r, n, o), this.dragger.currentX = i, this.dragger.currentY = r;
  }
  updateClipArea() {
  }
  getClipAreaRect() {
    const t = this.screenshotResizer, e = O(t.northEast.style.top), s = O(t.northWest.style.top), i = O(t.southWest.style.top), r = O(t.southEast.style.top), n = O(t.northWest.style.left), o = O(t.northEast.style.left), h = O(t.southWest.style.left), c = O(t.southEast.style.left), l = Math.max(e, s, i, r), u = Math.min(e, s, i, r), d = Math.max(n, o, h, c), g = Math.min(n, o, h, c), f = Math.abs(O(this.fabricWrapperEl.style.left)), v = Math.abs(O(this.fabricWrapperEl.style.top)), x = Math.abs(O(this.mask.style.left)), b = Math.abs(O(this.mask.style.top)), C = u - b + v, _ = g - x + f, S = d - g, k = l - u;
    return { top: C, left: _, width: S, height: k };
  }
  // TODO 结束的时候要把所有的事件全部都干掉
  async confirmScreenshot() {
    const t = this.elementManager, e = new Lr(
      t.canvasWrapper,
      t.getFabricWrapper(),
      this.imageEditor.getCanvas()
    ), { top: s, left: i, width: r, height: n } = this.getClipAreaRect(), o = new w(i, s), h = new w(i + r, n + s), c = this.imageEditor.getAreaImageInfo(o, h);
    this.handleScreenshotFinished(), await this.imageEditor.renderToCanvas(c);
    const l = new Lr(
      t.canvasWrapper,
      t.getFabricWrapper(),
      this.imageEditor.getCanvas()
    );
    this.imageEditor.getHistory().recordSnapshotAction(e, l, () => t.fixComponentsPosition());
  }
  cancelScreenshot() {
    this.handleScreenshotFinished();
  }
  handleScreenshotFinished() {
    var e;
    this.toolbar.style.display = "none";
    const t = this.screenshotResizer;
    Object.entries(t).forEach(([s, i]) => {
      i.style.display = "none";
    }), this.activeResizer = "none", this.mask.style.display = "none", this.elementManager.showResizer(), (e = this.elementManager) == null || e.showToolbar(), document.removeEventListener("pointermove", this.mouseMoving), document.removeEventListener("pointerup", this.mouseUp), document.removeEventListener("mouseup", this.canvasMouseUpFunc);
  }
  fixedScreenshotToolbarPosition() {
    const t = this.toolbar, e = this.screenshotResizer;
    t.style.display == "none" && (t.style.display = "block");
    const s = O(e.northEast.style.top), i = O(e.northWest.style.top), r = O(e.southWest.style.top), n = O(e.southEast.style.top), o = O(e.northWest.style.left), h = O(e.northEast.style.left), c = O(e.southWest.style.left), l = O(e.southEast.style.left), u = Math.max(s, i, r, n), d = Math.max(o, h, c, l);
    t.style.left = d - 64 + "px", t.style.top = u + 10 + "px";
  }
  resizeArea() {
    const t = this.screenshotResizer, e = this.movingX - this.startX, s = this.movingY - this.startY;
    let i = this.resizerPosX + e, r = this.resizerPosY + s;
    i < this.minLeft ? i = this.minLeft : i > this.maxLeft && (i = this.maxLeft), r < this.minTop ? r = this.minTop : r > this.maxTop && (r = this.maxTop), this.activeResizer == "northwest" ? (t.northWest.style.left = i + "px", t.northWest.style.top = r + "px", t.west.style.left = i + "px", t.north.style.top = r + "px", t.southWest.style.left = i + "px", t.northEast.style.top = r + "px") : this.activeResizer == "north" ? (t.north.style.top = r + "px", t.northEast.style.top = r + "px", t.northWest.style.top = r + "px") : this.activeResizer == "northeast" ? (t.northEast.style.left = i + "px", t.northEast.style.top = r + "px", t.north.style.top = r + "px", t.northWest.style.top = r + "px", t.east.style.left = i + "px", t.southEast.style.left = i + "px") : this.activeResizer == "east" ? (t.east.style.left = i + "px", t.northEast.style.left = i + "px", t.southEast.style.left = i + "px") : this.activeResizer == "southeast" ? (t.southEast.style.left = i + "px", t.southEast.style.top = r + "px", t.east.style.left = i + "px", t.south.style.top = r + "px", t.northEast.style.left = i + "px", t.southWest.style.top = r + "px") : this.activeResizer == "south" ? (t.south.style.top = r + "px", t.southEast.style.top = r + "px", t.southWest.style.top = r + "px") : this.activeResizer == "southwest" ? (t.southWest.style.left = i + "px", t.southWest.style.top = r + "px", t.west.style.left = i + "px", t.south.style.top = r + "px", t.northWest.style.left = i + "px", t.southEast.style.top = r + "px") : this.activeResizer == "west" && (t.west.style.left = i + "px", t.southWest.style.left = i + "px", t.northWest.style.left = i + "px"), this.formatCenterResizer();
    const n = O(this.mask.style.left), o = O(this.mask.style.top), h = O(t.northWest.style.left), c = O(t.northWest.style.top), l = O(t.southEast.style.left), u = O(t.southEast.style.top), d = Math.round(l - h), g = Math.round(u - c), f = this.mask.getContext("2d");
    f.clearRect(0, 0, this.width, this.height), f.fillStyle = "rgba(0,0,0,0.4)", f.fillRect(0, 0, this.width, this.height);
    const v = h - n, x = c - o;
    f.clearRect(v, x, d, g), this.clipArea.startX = v, this.clipArea.startY = x, this.clipArea.width = d, this.clipArea.height = g, this.fixedScreenshotToolbarPosition();
  }
  formatCenterResizer() {
    const t = this.screenshotResizer, e = O(t.northWest.style.left), s = O(t.northWest.style.top), i = O(t.northEast.style.left), r = O(t.southWest.style.top), n = (e + i) / 2, o = (s + r) / 2;
    t.north.style.left = n + "px", t.south.style.left = n + "px", t.west.style.top = o + "px", t.east.style.top = o + "px";
  }
  initMask(t, e, s, i) {
    this.width = s, this.height = i;
    const r = this.mask;
    r.style.left = t + "px", r.style.top = e + "px", r.style.width = this.width + "px", r.style.height = this.height + "px", r.style.display = "block", r.width = this.width, r.height = this.height, this.maskLeft = t, this.maskTop = e, this.minLeft = t, this.maxLeft = this.minLeft + s, this.minTop = e, this.maxTop = this.minTop + i;
    const n = r.getContext("2d");
    n.fillStyle = "rgba(0,0,0,0.4)", n.fillRect(0, 0, this.width, this.height);
    const o = Math.round(this.width * 0.2), h = Math.round(this.height * 0.2), c = o, l = h, u = Math.round(this.width * 0.6), d = Math.round(this.height * 0.6);
    n.clearRect(c, l, u, d), this.clipArea = {
      startX: c,
      startY: l,
      width: u,
      height: d
    };
    const g = this.screenshotResizer;
    g.northWest.style.left = t + o + "px", g.northWest.style.top = e + +h + "px", g.north.style.left = t + o + Math.round(u / 2) + "px", g.north.style.top = e + +h + "px", g.northEast.style.left = t + o + u + "px", g.northEast.style.top = e + +h + "px", g.east.style.left = t + o + u + "px", g.east.style.top = e + +h + +Math.round(d / 2) + "px", g.southEast.style.left = t + o + u + "px", g.southEast.style.top = e + +h + d + "px", g.south.style.left = t + o + Math.round(u / 2) + "px", g.south.style.top = e + +h + +d + "px", g.southWest.style.left = t + o + "px", g.southWest.style.top = e + +h + d + "px", g.west.style.left = t + o + "px", g.west.style.top = e + +h + Math.round(d / 2) + "px", Object.entries(g).forEach(([f, v]) => {
      v.style.display = "block";
    }), document.removeEventListener("pointermove", this.mouseMoving), document.removeEventListener("pointerup", this.mouseUp), this.mouseMoving = (f) => {
      this.activeResizer != "none" && (this.movingX = f.pageX, this.movingY = f.pageY, this.resizeArea());
    }, document.addEventListener("pointermove", this.mouseMoving), this.mouseUp = () => {
      this.activeResizer = "none";
    }, document.addEventListener("pointerup", this.mouseUp), this.handleDragArea(), this.elementManager.hideResizer(), this.fixedScreenshotToolbarPosition();
  }
}
class Qh {
  constructor(t) {
    p(this, "imageEditor");
    p(this, "keyboardEventHandler");
    this.imageEditor = t, this.keyboardEventHandler = this.handleKeyboardEvent.bind(this), document.addEventListener("keydown", this.keyboardEventHandler);
  }
  handleKeyboardEvent(t) {
    const e = !t.ctrlKey && !t.shiftKey && !t.altKey, s = t.ctrlKey && !t.shiftKey && !t.altKey;
    if (t.key.toLowerCase() === "delete" && e)
      this.imageEditor.removeActiveObjects();
    else if (s)
      switch (t.key.toLowerCase()) {
        case "z":
          this.imageEditor.getHistory().undo();
          break;
        case "y":
          this.imageEditor.getHistory().redo();
          break;
      }
  }
  destroy() {
    document.removeEventListener("keydown", this.keyboardEventHandler);
  }
}
const Pr = { x: 0, y: 0, width: 0, height: 0, scaleX: 1, scaleY: 1, angle: 0, rx: 0, ry: 0 }, Se = class Se {
  constructor(t, e, s, i) {
    // 控制图片编辑器的整体大小
    p(this, "globalScale", 1);
    p(this, "backgroundImage");
    p(this, "backgroundImageDimension");
    p(this, "initialBackgroundImage");
    p(this, "initialBackgroundImageDimension");
    p(this, "canvas");
    p(this, "currTransform", null);
    p(this, "transformStartState", Pr);
    p(this, "screenshoter");
    p(this, "history");
    p(this, "operatorType", D.NONE);
    p(this, "elementManager");
    p(this, "rectOperator");
    p(this, "ellipseOperator");
    p(this, "arrowOperator");
    p(this, "drawOperator");
    p(this, "mosaicOperator");
    p(this, "textOperator");
    p(this, "operatorMap", /* @__PURE__ */ new Map());
    p(this, "shortcutManager");
    p(this, "confirmFn");
    p(this, "cancelFn");
    this.confirmFn = s, this.cancelFn = i, this.elementManager = e, this.canvas = t;
    const r = t.getObjects()[0];
    if (!(r instanceof tt))
      throw new Error("unable to load background image");
    this.backgroundImage = r, this.backgroundImageDimension = {
      width: r.width,
      height: r.height
    }, this.initialBackgroundImage = r, this.initialBackgroundImageDimension = {
      width: r.width,
      height: r.height
    }, this.history = new Uh(this), this.rectOperator = new Zh(this), this.ellipseOperator = new Jh(this), this.arrowOperator = new qh(this), this.drawOperator = new Kh(this), this.mosaicOperator = new Mi(this), this.textOperator = new Xn(this), this.bindOperators(), this.operatorMap.set(D.RECT, this.rectOperator), this.operatorMap.set(D.ELLIPSE, this.ellipseOperator), this.operatorMap.set(D.ARROW, this.arrowOperator), this.operatorMap.set(D.TEXT, this.textOperator), this.operatorMap.set(D.DRAW, this.drawOperator), this.operatorMap.set(D.MOSAIC, this.mosaicOperator), this.canvas.selection = !1, this.screenshoter = new $h(), this.shortcutManager = new Qh(this);
  }
  init() {
    this.elementManager.init(this), this.elementManager.bindEvents(), this.screenshoter.init(this, this.elementManager), ue.setCornerControlsOnly(this.backgroundImage);
  }
  bindOperators() {
    const t = this.rectOperator;
    this.canvas.on("mouse:down", t.handleMouseDown.bind(t)), this.canvas.on("mouse:move", t.handleMouseMove.bind(t)), this.canvas.on("mouse:up", t.handleMouseUp.bind(t));
    const e = this.ellipseOperator;
    this.canvas.on("mouse:down", e.handleMouseDown.bind(e)), this.canvas.on("mouse:move", e.handleMouseMove.bind(e)), this.canvas.on("mouse:up", e.handleMouseUp.bind(e));
    const s = this.arrowOperator;
    this.canvas.on("mouse:down", s.handleMouseDown.bind(s)), this.canvas.on("mouse:move", s.handleMouseMove.bind(s)), this.canvas.on("mouse:up", s.handleMouseUp.bind(s));
    const i = this.textOperator;
    this.canvas.on("mouse:down:before", i.handleMouseDownBefore.bind(i)), this.canvas.on("mouse:down", i.handleMouseDown.bind(i)), this.canvas.on("mouse:up", i.handleMouseUp.bind(i));
    const r = this.drawOperator;
    this.canvas.on("mouse:down:before", r.tryToStartDraw.bind(r)), this.canvas.on("mouse:up", r.tryToFinishDraw.bind(r));
    const n = this.mosaicOperator;
    this.canvas.on("mouse:down:before", n.tryToStartMosaic.bind(n)), this.canvas.on("mouse:up", n.tryToFinishMosaic.bind(n)), this.canvas.on("before:transform", (o) => {
      this.currTransform = o.transform;
      const h = o.transform.target;
      this.transformStartState = {
        x: h.getX(),
        y: h.getY(),
        width: h.width,
        height: h.height,
        scaleX: h.scaleX,
        scaleY: h.scaleY,
        angle: h.angle,
        rx: 0,
        ry: 0
      }, h instanceof ft && (this.transformStartState.rx = h.getRx(), this.transformStartState.ry = h.getRy());
    }), this.canvas.on("mouse:up", () => {
      if (this.currTransform) {
        const o = this.currTransform, h = o.action, c = o.target, l = this.transformStartState;
        if (h === "drag") {
          const { x: u, y: d } = l;
          this.history.recordMoveAction(c, u, d);
        } else if (h === "scale" || h === "scaleX" || h === "scaleY") {
          const u = c instanceof At || c instanceof Yt || c instanceof tt, d = c instanceof Hn || c instanceof wt || c instanceof ft, { scaleX: g, scaleY: f, x: v, y: x, width: b, height: C, rx: _, ry: S } = l;
          if (u)
            this.history.recordKeepRatioScaleAction(c, g, f, v, x);
          else if (d)
            c instanceof ft ? this.history.recordEllipseScaleAction(c, b, C, v, x, _, S) : this.history.recordRedrawScaleAction(c, b, C, v, x);
          else
            throw new Error("未知的类型");
        } else if (h === "rotate") {
          const { angle: u } = l;
          this.history.recordRotateAction(c, u);
        }
        this.transformStartState = Pr, this.currTransform = null;
      }
    });
  }
  getCanvas() {
    return this.canvas;
  }
  getActiveOperator() {
    return this.operatorMap.get(this.operatorType);
  }
  getOperatorType() {
    return this.operatorType;
  }
  changeOperatorType(t) {
    if (this.operatorType == t)
      return;
    const e = t;
    this.operatorType = e;
  }
  getHistory() {
    return this.history;
  }
  setCanvasHeight(t) {
    this.canvas.setDimensions({ height: t });
  }
  setCanvasWidth(t) {
    this.canvas.setDimensions({ width: t });
  }
  setCanvasDims(t, e) {
    this.canvas.setDimensions({ height: e, width: t });
  }
  transform(t, e) {
    const s = this.getBackgroundImage();
    console.log(s);
    const i = s.getX(), r = s.getY();
    s.setXY(new w(i + t, r + e)), s.setCoords();
    const n = this.canvas.getObjects();
    if (t != 0 || e != 0)
      for (const o of n)
        o !== s && (o.left += t, o.top += e, o.setCoords());
    this.canvas.renderAll();
  }
  transformX(t) {
    const e = this.getBackgroundImage(), s = e.getX();
    e.setX(s + t);
    let i = this.canvas.getObjects();
    i == null && (i = []);
    for (const r of i)
      r != e && (r.left += t), r.setCoords();
    this.canvas.renderAll();
  }
  transformY(t) {
    const e = this.getBackgroundImage(), s = e.getY();
    e.setY(s + t);
    let i = this.canvas.getObjects();
    i == null && (i = []);
    for (const r of i)
      r != e && (r.top += t), r.setCoords();
    this.canvas.renderAll();
  }
  getAreaImageInfo(t, e) {
    const s = e.x - t.x, i = e.y - t.y, r = new je(void 0, { width: s, height: i });
    r.add(new tt(this.canvas.lowerCanvasEl, {
      left: 0,
      top: 0
    }));
    const n = devicePixelRatio || 1;
    return r.toDataURL({
      format: "jpeg",
      left: t.x * n,
      top: t.y * n,
      width: s * n,
      height: i * n,
      quality: 0.92,
      // 这个要考虑改成1
      multiplier: 1
    });
  }
  async renderToCanvas(t) {
    const e = this.canvas, s = e.getObjects();
    for (const n of s)
      e.remove(n);
    e.clear();
    const i = this.elementManager;
    let r;
    return await tt.fromURL(t, { crossOrigin: "anonymous" }).then((n) => {
      r = n, n.evented = !1, n.selectable = !1, n.lockScalingFlip = !0;
      const o = n.width, h = n.height;
      e.setDimensions({ width: o, height: h }), ue.setCenterOrigin(n), n.setXY(new w(o / 2, h / 2)), this.backgroundImage = n, this.backgroundImageDimension = {
        width: o,
        height: h
      }, ue.setCornerControlsOnly(n), e.add(n), e.backgroundColor = "#FFF";
      const c = i.getFabricWrapper().style;
      c.left = "0px", c.top = "0px", i.resetWrapper(o, h), e.renderAll();
    }), r;
  }
  getScreenshoter() {
    return this.screenshoter;
  }
  // 保存状态，后面还原直接用
  storeCanvasState() {
  }
  destory() {
    this.shortcutManager.destroy(), this.canvas.destroy();
  }
  removeActiveObjects() {
    const t = this.canvas.getActiveObject();
    t && (this.canvas.remove(t), this.history.recordRemoveAction(t));
  }
  scale(t) {
    const e = this.globalScale + t;
    return e < Se.MIN_SCALE || e > Se.MAX_SCALE ? !1 : (this.globalScale = e, !0);
  }
  getBackgroundImage() {
    return this.backgroundImage;
  }
  setBackgroundImage(t) {
    this.backgroundImage = t;
  }
  getInitialBackgroundImage() {
    return this.initialBackgroundImage;
  }
  getBackgroundImageDimension() {
    return this.backgroundImageDimension;
  }
  getInitialBackgroundImageDimension() {
    return this.initialBackgroundImageDimension;
  }
  confirm(t) {
    this.confirmFn(t);
  }
  cancel() {
    this.cancelFn();
  }
  getTransform() {
    return this.currTransform;
  }
  getTransformState() {
    return this.transformStartState;
  }
  moveCanvasToCenter() {
    this.elementManager.moveCanvasToCenter();
  }
  resetGlobalScale() {
    this.globalScale = 1;
  }
};
p(Se, "MIN_SCALE", 0.2), p(Se, "MAX_SCALE", 2);
let Ai = Se;
const oe = class oe {
  static async createImageEditor(t, e = ".", s = (o) => {
  }, i = () => {
  }, r = document.body, n = document.head) {
    const o = this.createElement(r, e), h = new Di(o, r, n), c = await this.initCanvas(o.canvas, t), l = c.getObjects()[0];
    if (!(l instanceof tt))
      throw new Error("unable to load background image");
    this.resizeCanvas(c, h, l.width, l.height);
    const u = new Ai(c, h, s, i);
    return u.init(), oe.currentImageEditor = u, u;
  }
  static createElement(t, e) {
    const s = this.CANVAS_DEFAULT_WIDTH, i = this.CANVAS_DEFAULT_HEIGHT, r = document.createElement("div");
    r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.visibility = "hidden", r.style.backgroundColor = "gainsboro", t.appendChild(r);
    const n = document.createElement("div");
    n.style.zIndex = "1", n.style.position = "fixed", n.style.bottom = "50px", n.style.left = "50%", n.style.transform = "translateX(-50%)";
    const o = this.initToolbar(n, e), h = document.createElement("div");
    h.style.backgroundColor = "white", h.style.position = "relative", h.style.overflow = "hidden";
    const c = this.createCanvasResizer(r), l = document.createElement("canvas");
    l.style.display = "none", l.style.left = "0", l.style.top = "0", l.style.position = "absolute";
    const u = document.createElement("canvas");
    u.style.width = s + "px", u.style.height = i + "px", u.width = s, u.height = i, h.append(u), r.appendChild(h), t.appendChild(n), r.appendChild(l), t.appendChild(r);
    const d = this.createScreenshotResizers(r), g = this.createScreenshotToolbar(r, e), f = document.createElement("div"), v = document.createElement("div"), x = document.createElement("div"), b = document.createElement("button"), C = document.createElement("button");
    return b.innerText = "确认", C.innerText = "取消", f.appendChild(v), v.appendChild(x), v.appendChild(C), v.appendChild(b), h.append(f), f.classList.add("online-image-editor-confirm-dialog-wrapper"), v.classList.add("online-image-editor-confirm-dialog"), x.classList.add("online-image-editor-confirm-dialog-message"), b.classList.add("online-image-editor-confirm-btn", "online-image-editor-confirm-btn-confirm"), C.classList.add("online-image-editor-confirm-btn", "online-image-editor-confirm-btn-cancel"), {
      ...o,
      canvas: u,
      canvasWrapper: h,
      ...c,
      toolbar: n,
      wrapper: r,
      screenshotCanvas: l,
      screenshotResizer: d,
      screenshotToolbar: g,
      confirmDialogWrapper: f,
      confirmDialog: v,
      confirmDialogMessage: x,
      confirmButtonConfirm: b,
      confirmButtonCancel: C
    };
  }
  static createScreenshotToolbar(t, e) {
    const s = document.createElement("div"), i = s.style;
    i.position = "absolute", i.backgroundColor = "rgb(229,230,231)", i.borderRadius = "4px 4px 4px 4px", i.height = "24px", i.width = "64px", i.paddingTop = "4px", i.paddingBottom = "4px", i.display = "none";
    const r = this.appendMenu(s, e + "/assets/cancel.svg", "取消", 8, 0), n = this.appendMenu(s, e + "/assets/confirm.svg", "确认", 0, 0);
    return t.appendChild(s), {
      toolbar: s,
      screenshot: {
        confirm: n,
        cancel: r
      }
    };
  }
  static createScreenshotResizers(t) {
    const e = () => {
      const u = document.createElement("div"), d = u.style;
      return d.left = "0", d.top = "0", d.position = "absolute", d.width = "8px", d.height = "8px", d.boxSizing = "border-box", d.border = "1px solid #19a918", d.transform = "translate(-50%,-50%)", d.display = "none", u.addEventListener("dragstart", function(g) {
        g.preventDefault();
      }), u.draggable = !1, t.appendChild(u), u;
    }, s = e(), i = e(), r = e(), n = e(), o = e(), h = e(), c = e(), l = e();
    return {
      northWest: s,
      north: i,
      northEast: r,
      east: n,
      southEast: o,
      south: h,
      southWest: c,
      west: l
    };
  }
  // topbar和bottombar都要做固定width，居中
  // 不要考虑其它的，尾部也是一样的
  static initToolbar(t, e) {
    t.style.padding = "8px", t.style.backgroundColor = "#e5e6e7", t.style.borderRadius = "4px 4px 4px 4px", t.style.height = "24px", t.style.width = "780px";
    const s = {};
    return s.rectangleMenu = this.appendMenu(t, e + "/assets/rect.svg", "矩形"), s.ellipseMenu = this.appendMenu(t, e + "/assets/circle.svg", "圆形"), s.arrowMenu = this.appendMenu(t, e + "/assets/arrow.svg", "箭头"), s.drawMenu = this.appendMenu(t, e + "/assets/draw.svg", "绘图"), s.textMenu = this.appendMenu(t, e + "/assets/text.svg", "文本"), s.mosaicMenu = this.appendMenu(t, e + "/assets/mosaic.svg", "马赛克"), s.editPictureMenu = this.appendMenu(t, e + "/assets/edit.svg", "编辑底图"), s.scaleUpMenu = this.appendMenu(t, e + "/assets/scaleUp.svg", "放大所有元素", 42), s.scaleDownMenu = this.appendMenu(t, e + "/assets/scaleDown.svg", "缩小所有元素"), s.shrinkMenu = this.appendMenu(t, e + "/assets/shrink.svg", "缩减绘制区域"), s.extendMenu = this.appendMenu(t, e + "/assets/extend.svg", "扩展绘制区域"), s.flipXMenu = this.appendMenu(t, e + "/assets/flipX.svg", "水平翻转"), s.flipYMenu = this.appendMenu(t, e + "/assets/flipY.svg", "垂直翻转"), s.rotateCounterClockwiseMenu = this.appendMenu(t, e + "/assets/rotate.svg", "逆时针旋转"), s.rotateCounterClockwiseMenu.style.transform = "rotateY(180deg)", s.rotateClockwiseMenu = this.appendMenu(t, e + "/assets/rotate.svg", "顺时针旋转"), s.cropMenu = this.appendMenu(t, e + "/assets/crop.svg", "裁剪"), s.undoMenu = this.appendMenu(t, e + "/assets/undo.svg", "撤销", 38), s.redoMenu = this.appendMenu(t, e + "/assets/redo.svg", "恢复"), s.resetMenu = this.appendMenu(t, e + "/assets/reset.svg", "重置"), s.cancelMenu = this.appendMenu(t, e + "/assets/cancel.svg", "放弃本次编辑", 36), s.confirmMenu = this.appendMenu(t, e + "/assets/confirm.svg", "保存编辑结果", 0, 0), s;
  }
  static appendMenu(t, e, s, i = 0, r = 8) {
    const n = document.createElement("div");
    n.style.display = "inline-block", n.style.width = "24px", n.style.height = "24px", n.style.marginRight = r + "px", n.style.borderRadius = "4px", n.style.lineHeight = "1", i != 0 && (n.style.marginLeft = i + "px");
    const o = document.createElement("i");
    return o.title = s, o.style.display = "block", o.style.width = "24px", o.style.height = "24px", o.style.backgroundSize = "100% 100%", o.style.backgroundRepeat = "no-repeat", o.style.cursor = "pointer", o.style.opacity = "0.8", o.style.backgroundImage = `url('${e}')`, n.appendChild(o), t.appendChild(n), n;
  }
  static async initCanvas(t, e) {
    const s = new Ei(t, {
      width: this.CANVAS_DEFAULT_WIDTH,
      height: this.CANVAS_DEFAULT_HEIGHT,
      preserveObjectStacking: !0
    });
    return await tt.fromURL(e, { crossOrigin: "anonymous" }).then((i) => {
      s.backgroundColor = "#FFF", i.evented = !1, i.selectable = !1, i.lockScalingFlip = !0, s.add(i), s.sendObjectToBack(i), s.renderAll();
      const r = i.width, n = i.height;
      ue.setCenterOrigin(i), i.setXY(new w(r / 2, n / 2));
    }), s;
  }
  static resizeCanvas(t, e, s, i) {
    const r = this.dpr, n = e.wrapper, o = e.canvasWrapper, h = e.canvas;
    o.style.width = s + "px", o.style.height = i + "px";
    const c = n.getBoundingClientRect(), l = c.width, u = c.height;
    let d = (l - s) / 2;
    d <= 20 && (d = 20);
    let g = (u - i) / 2;
    g <= 20 && (g = 20), o.style.left = d + "px", o.style.top = g + "px", h.style.width = s + "px", h.style.height = i + "px", h.width = Math.round(s * r), h.height = Math.round(i * r), t.setDimensions({ width: s, height: i }), e.fixComponentsPosition(), n.style.visibility = "visible";
  }
  static createCanvasResizer(t) {
    const s = document.createElement("div"), i = document.createElement("div"), r = document.createElement("div"), n = document.createElement("div"), o = document.createElement("div"), h = document.createElement("div"), c = document.createElement("div"), l = document.createElement("div");
    function u(d) {
      d.style.width = "12px", d.style.height = "12px", d.style.backgroundColor = "white", d.style.position = "absolute", d.style.border = "solid 1px #000", d.style.boxSizing = "border-box", d.draggable = !1, d.addEventListener("dragstart", function(g) {
        g.preventDefault();
      });
    }
    return u(s), u(i), u(r), u(n), u(o), u(h), u(c), u(l), t.appendChild(s), t.appendChild(i), t.appendChild(r), t.appendChild(n), t.appendChild(o), t.appendChild(h), t.appendChild(c), t.appendChild(l), {
      northResizer: s,
      northWestResizer: i,
      westResizer: r,
      southWestResizer: n,
      southResizer: o,
      southEastResizer: h,
      eastResizer: c,
      northEastResizer: l
    };
  }
};
p(oe, "currentImageEditor"), p(oe, "dpr", window.devicePixelRatio || 1), p(oe, "CANVAS_DEFAULT_WIDTH", 100), p(oe, "CANVAS_DEFAULT_HEIGHT", 100);
let Fr = oe;
export {
  Fr as ImageEditorHelper
};
