/**
 * Created by windowss on 2017/5/27.
 */
(function() {
    var t = this,
        e = e || {};
    e.WEBGL_RENDERER = 0, e.CANVAS_RENDERER = 1, e.VERSION = "v1.6.1", e.blendModes = {
        NORMAL: 0,
        ADD: 1,
        MULTIPLY: 2,
        SCREEN: 3,
        OVERLAY: 4,
        DARKEN: 5,
        LIGHTEN: 6,
        COLOR_DODGE: 7,
        COLOR_BURN: 8,
        HARD_LIGHT: 9,
        SOFT_LIGHT: 10,
        DIFFERENCE: 11,
        EXCLUSION: 12,
        HUE: 13,
        SATURATION: 14,
        COLOR: 15,
        LUMINOSITY: 16
    }, e.scaleModes = {
        DEFAULT: 0,
        LINEAR: 0,
        NEAREST: 1
    }, e._UID = 0, "undefined" != typeof Float32Array ? (e.Float32Array = Float32Array, e.Uint16Array = Uint16Array) : (e.Float32Array = Array, e.Uint16Array = Array), e.INTERACTION_FREQUENCY = 30, e.AUTO_PREVENT_DEFAULT = !0, e.RAD_TO_DEG = 180 / Math.PI, e.DEG_TO_RAD = Math.PI / 180, e.dontSayHello = !1, e.sayHello = function(t) {
        if(!e.dontSayHello) {
            if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                var i = ["%c %c %c Pixi.js " + e.VERSION + " - " + t + "  %c  %c  http://www.pixijs.com/  %c %c ?%c?%c? ", "background: #ff66a5", "background: #ff66a5", "color: #ff66a5; background: #030307;", "background: #ff66a5", "background: #ffc3dc", "background: #ff66a5", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff"];
                console.log.apply(console, i)
            } else window.console && console.log("Pixi.js " + e.VERSION + " - http://www.pixijs.com/");
            e.dontSayHello = !0
        }
    }, e.Point = function(t, e) {
        this.x = t || 0, this.y = e || 0
    }, e.Point.prototype.clone = function() {
        return new e.Point(this.x, this.y)
    }, e.Point.prototype.set = function(t, e) {
        this.x = t || 0, this.y = e || (0 !== e ? this.x : 0)
    }, e.Point.prototype.constructor = e.Point, e.Rectangle = function(t, e, i, r) {
        this.x = t || 0, this.y = e || 0, this.width = i || 0, this.height = r || 0
    }, e.Rectangle.prototype.clone = function() {
        return new e.Rectangle(this.x, this.y, this.width, this.height)
    }, e.Rectangle.prototype.contains = function(t, e) {
        if(this.width <= 0 || this.height <= 0) return !1;
        var i = this.x;
        if(t >= i && t <= i + this.width) {
            var r = this.y;
            if(e >= r && e <= r + this.height) return !0
        }
        return !1
    }, e.Rectangle.prototype.constructor = e.Rectangle, e.EmptyRectangle = new e.Rectangle(0, 0, 0, 0), e.Polygon = function(t) {
        if(t instanceof Array || (t = Array.prototype.slice.call(arguments)), "number" == typeof t[0]) {
            for(var i = [], r = 0, s = t.length; s > r; r += 2) i.push(new e.Point(t[r], t[r + 1]));
            t = i
        }
        this.points = t
    }, e.Polygon.prototype.clone = function() {
        for(var t = [], i = 0; i < this.points.length; i++) t.push(this.points[i].clone());
        return new e.Polygon(t)
    }, e.Polygon.prototype.contains = function(t, e) {
        for(var i = !1, r = 0, s = this.points.length - 1; r < this.points.length; s = r++) {
            var n = this.points[r].x,
                o = this.points[r].y,
                a = this.points[s].x,
                h = this.points[s].y,
                l = o > e != h > e && (a - n) * (e - o) / (h - o) + n > t;
            l && (i = !i)
        }
        return i
    }, e.Polygon.prototype.constructor = e.Polygon, e.Circle = function(t, e, i) {
        this.x = t || 0, this.y = e || 0, this.radius = i || 0
    }, e.Circle.prototype.clone = function() {
        return new e.Circle(this.x, this.y, this.radius)
    }, e.Circle.prototype.contains = function(t, e) {
        if(this.radius <= 0) return !1;
        var i = this.x - t,
            r = this.y - e,
            s = this.radius * this.radius;
        return i *= i, r *= r, s >= i + r
    }, e.Circle.prototype.getBounds = function() {
        return new e.Rectangle(this.x - this.radius, this.y - this.radius, this.width, this.height)
    }, e.Circle.prototype.constructor = e.Circle, e.Ellipse = function(t, e, i, r) {
        this.x = t || 0, this.y = e || 0, this.width = i || 0, this.height = r || 0
    }, e.Ellipse.prototype.clone = function() {
        return new e.Ellipse(this.x, this.y, this.width, this.height)
    }, e.Ellipse.prototype.contains = function(t, e) {
        if(this.width <= 0 || this.height <= 0) return !1;
        var i = (t - this.x) / this.width,
            r = (e - this.y) / this.height;
        return i *= i, r *= r, 1 >= i + r
    }, e.Ellipse.prototype.getBounds = function() {
        return new e.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height)
    }, e.Ellipse.prototype.constructor = e.Ellipse, e.Matrix = function() {
        this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
    }, e.Matrix.prototype.fromArray = function(t) {
        this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
    }, e.Matrix.prototype.toArray = function(t) {
        this.array || (this.array = new Float32Array(9));
        var e = this.array;
        return t ? (e[0] = this.a, e[1] = this.c, e[2] = 0, e[3] = this.b, e[4] = this.d, e[5] = 0, e[6] = this.tx, e[7] = this.ty, e[8] = 1) : (e[0] = this.a, e[1] = this.b, e[2] = this.tx, e[3] = this.c, e[4] = this.d, e[5] = this.ty, e[6] = 0, e[7] = 0, e[8] = 1), e
    }, e.identityMatrix = new e.Matrix, e.determineMatrixArrayType = function() {
        return "undefined" != typeof Float32Array ? Float32Array : Array
    }, e.Matrix2 = e.determineMatrixArrayType(), e.DisplayObject = function() {
        this.position = new e.Point, this.scale = new e.Point(1, 1), this.pivot = new e.Point(0, 0), this.rotation = 0, this.alpha = 1, this.visible = !0, this.hitArea = null, this.buttonMode = !1, this.renderable = !1, this.parent = null, this.stage = null, this.worldAlpha = 1, this._interactive = !1, this.defaultCursor = "pointer", this.worldTransform = new e.Matrix, this.color = [], this.dynamic = !0, this._sr = 0, this._cr = 1, this.filterArea = null, this._bounds = new e.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null, this._cacheAsBitmap = !1, this._cacheIsDirty = !1
    }, e.DisplayObject.prototype.constructor = e.DisplayObject, e.DisplayObject.prototype.setInteractive = function(t) {
        this.interactive = t
    }, Object.defineProperty(e.DisplayObject.prototype, "interactive", {
        get: function() {
            return this._interactive
        },
        set: function(t) {
            this._interactive = t, this.stage && (this.stage.dirty = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "worldVisible", {
        get: function() {
            var t = this;
            do {
                if(!t.visible) return !1;
                t = t.parent
            } while (t);
            return !0
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "mask", {
        get: function() {
            return this._mask
        },
        set: function(t) {
            this._mask && (this._mask.isMask = !1), this._mask = t, this._mask && (this._mask.isMask = !0)
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "filters", {
        get: function() {
            return this._filters
        },
        set: function(t) {
            if(t) {
                for(var e = [], i = 0; i < t.length; i++)
                    for(var r = t[i].passes, s = 0; s < r.length; s++) e.push(r[s]);
                this._filterBlock = {
                    target: this,
                    filterPasses: e
                }
            }
            this._filters = t
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "cacheAsBitmap", {
        get: function() {
            return this._cacheAsBitmap
        },
        set: function(t) {
            this._cacheAsBitmap !== t && (t ? this._generateCachedSprite() : this._destroyCachedSprite(), this._cacheAsBitmap = t)
        }
    }), e.DisplayObject.prototype.updateTransform = function() {
        this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation));
        var t = this.parent.worldTransform,
            e = this.worldTransform,
            i = this.pivot.x,
            r = this.pivot.y,
            s = this._cr * this.scale.x,
            n = -this._sr * this.scale.y,
            o = this._sr * this.scale.x,
            a = this._cr * this.scale.y,
            h = this.position.x - s * i - r * n,
            l = this.position.y - a * r - i * o,
            u = t.a,
            c = t.b,
            d = t.c,
            p = t.d;
        e.a = u * s + c * o, e.b = u * n + c * a, e.tx = u * h + c * l + t.tx, e.c = d * s + p * o, e.d = d * n + p * a, e.ty = d * h + p * l + t.ty, this.worldAlpha = this.alpha * this.parent.worldAlpha
    }, e.DisplayObject.prototype.getBounds = function(t) {
        return t = t, e.EmptyRectangle
    }, e.DisplayObject.prototype.getLocalBounds = function() {
        return this.getBounds(e.identityMatrix)
    }, e.DisplayObject.prototype.setStageReference = function(t) {
        this.stage = t, this._interactive && (this.stage.dirty = !0)
    }, e.DisplayObject.prototype.generateTexture = function(t) {
        var i = this.getLocalBounds(),
            r = new e.RenderTexture(0 | i.width, 0 | i.height, t);
        return r.render(this, new e.Point(-i.x, -i.y)), r
    }, e.DisplayObject.prototype.updateCache = function() {
        this._generateCachedSprite()
    }, e.DisplayObject.prototype._renderCachedSprite = function(t) {
        this._cachedSprite.worldAlpha = this.worldAlpha, t.gl ? e.Sprite.prototype._renderWebGL.call(this._cachedSprite, t) : e.Sprite.prototype._renderCanvas.call(this._cachedSprite, t)
    }, e.DisplayObject.prototype._generateCachedSprite = function() {
        this._cacheAsBitmap = !1;
        var t = this.getLocalBounds();
        if(this._cachedSprite) this._cachedSprite.texture.resize(0 | t.width, 0 | t.height);
        else {
            var i = new e.RenderTexture(0 | t.width, 0 | t.height);
            this._cachedSprite = new e.Sprite(i), this._cachedSprite.worldTransform = this.worldTransform
        }
        var r = this._filters;
        this._filters = null, this._cachedSprite.filters = r, this._cachedSprite.texture.render(this, new e.Point(-t.x, -t.y)), this._cachedSprite.anchor.x = -(t.x / t.width), this._cachedSprite.anchor.y = -(t.y / t.height), this._filters = r, this._cacheAsBitmap = !0
    }, e.DisplayObject.prototype._destroyCachedSprite = function() {
        this._cachedSprite && (this._cachedSprite.texture.destroy(!0), this._cachedSprite = null)
    }, e.DisplayObject.prototype._renderWebGL = function(t) {
        t = t
    }, e.DisplayObject.prototype._renderCanvas = function(t) {
        t = t
    }, Object.defineProperty(e.DisplayObject.prototype, "x", {
        get: function() {
            return this.position.x
        },
        set: function(t) {
            this.position.x = t
        }
    }), Object.defineProperty(e.DisplayObject.prototype, "y", {
        get: function() {
            return this.position.y
        },
        set: function(t) {
            this.position.y = t
        }
    }), e.DisplayObjectContainer = function() {
        e.DisplayObject.call(this), this.children = []
    }, e.DisplayObjectContainer.prototype = Object.create(e.DisplayObject.prototype), e.DisplayObjectContainer.prototype.constructor = e.DisplayObjectContainer, Object.defineProperty(e.DisplayObjectContainer.prototype, "width", {
        get: function() {
            return this.scale.x * this.getLocalBounds().width
        },
        set: function(t) {
            var e = this.getLocalBounds().width;
            this.scale.x = 0 !== e ? t / (e / this.scale.x) : 1, this._width = t
        }
    }), Object.defineProperty(e.DisplayObjectContainer.prototype, "height", {
        get: function() {
            return this.scale.y * this.getLocalBounds().height
        },
        set: function(t) {
            var e = this.getLocalBounds().height;
            this.scale.y = 0 !== e ? t / (e / this.scale.y) : 1, this._height = t
        }
    }), e.DisplayObjectContainer.prototype.addChild = function(t) {
        return this.addChildAt(t, this.children.length)
    }, e.DisplayObjectContainer.prototype.addChildAt = function(t, e) {
        if(e >= 0 && e <= this.children.length) return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), this.stage && t.setStageReference(this.stage), t;
        throw new Error(t + " The index " + e + " supplied is out of bounds " + this.children.length)
    }, e.DisplayObjectContainer.prototype.swapChildren = function(t, e) {
        if(t !== e) {
            var i = this.children.indexOf(t),
                r = this.children.indexOf(e);
            if(0 > i || 0 > r) throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");
            this.children[i] = e, this.children[r] = t
        }
    }, e.DisplayObjectContainer.prototype.getChildAt = function(t) {
        if(t >= 0 && t < this.children.length) return this.children[t];
        throw new Error("Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller")
    }, e.DisplayObjectContainer.prototype.removeChild = function(t) {
        return this.removeChildAt(this.children.indexOf(t))
    }, e.DisplayObjectContainer.prototype.removeChildAt = function(t) {
        var e = this.getChildAt(t);
        return this.stage && e.removeStageReference(), e.parent = void 0, this.children.splice(t, 1), e
    }, e.DisplayObjectContainer.prototype.removeChildren = function(t, e) {
        var i = t || 0,
            r = "number" == typeof e ? e : this.children.length,
            s = r - i;
        if(s > 0 && r >= s) {
            for(var n = this.children.splice(i, s), o = 0; o < n.length; o++) {
                var a = n[o];
                this.stage && a.removeStageReference(), a.parent = void 0
            }
            return n
        }
        throw new Error("Range Error, numeric values are outside the acceptable range")
    }, e.DisplayObjectContainer.prototype.updateTransform = function() {
        if(this.visible && (e.DisplayObject.prototype.updateTransform.call(this), !this._cacheAsBitmap))
            for(var t = 0, i = this.children.length; i > t; t++) this.children[t].updateTransform()
    }, e.DisplayObjectContainer.prototype.getBounds = function(t) {
        if(0 === this.children.length) return e.EmptyRectangle;
        if(t) {
            var i = this.worldTransform;
            this.worldTransform = t, this.updateTransform(), this.worldTransform = i
        }
        for(var r, s, n, o = 1 / 0, a = 1 / 0, h = -1 / 0, l = -1 / 0, u = !1, c = 0, d = this.children.length; d > c; c++) {
            var p = this.children[c];
            p.visible && (u = !0, r = this.children[c].getBounds(t), o = o < r.x ? o : r.x, a = a < r.y ? a : r.y, s = r.width + r.x, n = r.height + r.y, h = h > s ? h : s, l = l > n ? l : n)
        }
        if(!u) return e.EmptyRectangle;
        var f = this._bounds;
        return f.x = o, f.y = a, f.width = h - o, f.height = l - a, f
    }, e.DisplayObjectContainer.prototype.getLocalBounds = function() {
        var t = this.worldTransform;
        this.worldTransform = e.identityMatrix;
        for(var i = 0, r = this.children.length; r > i; i++) this.children[i].updateTransform();
        var s = this.getBounds();
        return this.worldTransform = t, s
    }, e.DisplayObjectContainer.prototype.setStageReference = function(t) {
        this.stage = t, this._interactive && (this.stage.dirty = !0);
        for(var e = 0, i = this.children.length; i > e; e++) {
            var r = this.children[e];
            r.setStageReference(t)
        }
    }, e.DisplayObjectContainer.prototype.removeStageReference = function() {
        for(var t = 0, e = this.children.length; e > t; t++) {
            var i = this.children[t];
            i.removeStageReference()
        }
        this._interactive && (this.stage.dirty = !0), this.stage = null
    }, e.DisplayObjectContainer.prototype._renderWebGL = function(t) {
        if(this.visible && !(this.alpha <= 0)) {
            if(this._cacheAsBitmap) return void this._renderCachedSprite(t);
            var e, i;
            if(this._mask || this._filters) {
                for(this._filters && (t.spriteBatch.flush(), t.filterManager.pushFilter(this._filterBlock)), this._mask && (t.spriteBatch.stop(), t.maskManager.pushMask(this.mask, t), t.spriteBatch.start()), e = 0, i = this.children.length; i > e; e++) this.children[e]._renderWebGL(t);
                t.spriteBatch.stop(), this._mask && t.maskManager.popMask(this._mask, t), this._filters && t.filterManager.popFilter(), t.spriteBatch.start()
            } else
                for(e = 0, i = this.children.length; i > e; e++) this.children[e]._renderWebGL(t)
        }
    }, e.DisplayObjectContainer.prototype._renderCanvas = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha) {
            if(this._cacheAsBitmap) return void this._renderCachedSprite(t);
            this._mask && t.maskManager.pushMask(this._mask, t.context);
            for(var e = 0, i = this.children.length; i > e; e++) {
                var r = this.children[e];
                r._renderCanvas(t)
            }
            this._mask && t.maskManager.popMask(t.context)
        }
    }, e.Sprite = function(t) {
        e.DisplayObjectContainer.call(this), this.anchor = new e.Point, this.texture = t, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = e.blendModes.NORMAL, t.baseTexture.hasLoaded ? this.onTextureUpdate() : (this.onTextureUpdateBind = this.onTextureUpdate.bind(this), this.texture.addEventListener("update", this.onTextureUpdateBind)), this.renderable = !0
    }, e.Sprite.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Sprite.prototype.constructor = e.Sprite, Object.defineProperty(e.Sprite.prototype, "width", {
        get: function() {
            return this.scale.x * this.texture.frame.width
        },
        set: function(t) {
            this.scale.x = t / this.texture.frame.width, this._width = t
        }
    }), Object.defineProperty(e.Sprite.prototype, "height", {
        get: function() {
            return this.scale.y * this.texture.frame.height
        },
        set: function(t) {
            this.scale.y = t / this.texture.frame.height, this._height = t
        }
    }), e.Sprite.prototype.setTexture = function(t) {
        this.texture = t, this.cachedTint = 16777215
    }, e.Sprite.prototype.onTextureUpdate = function() {
        this._width && (this.scale.x = this._width / this.texture.frame.width), this._height && (this.scale.y = this._height / this.texture.frame.height)
    }, e.Sprite.prototype.getBounds = function(t) {
        var e = this.texture.frame.width,
            i = this.texture.frame.height,
            r = e * (1 - this.anchor.x),
            s = e * -this.anchor.x,
            n = i * (1 - this.anchor.y),
            o = i * -this.anchor.y,
            a = t || this.worldTransform,
            h = a.a,
            l = a.c,
            u = a.b,
            c = a.d,
            d = a.tx,
            p = a.ty,
            f = h * s + u * o + d,
            g = c * o + l * s + p,
            m = h * r + u * o + d,
            v = c * o + l * r + p,
            x = h * r + u * n + d,
            y = c * n + l * r + p,
            b = h * s + u * n + d,
            T = c * n + l * s + p,
            w = -1 / 0,
            S = -1 / 0,
            E = 1 / 0,
            C = 1 / 0;
        E = E > f ? f : E, E = E > m ? m : E, E = E > x ? x : E, E = E > b ? b : E, C = C > g ? g : C, C = C > v ? v : C, C = C > y ? y : C, C = C > T ? T : C, w = f > w ? f : w, w = m > w ? m : w, w = x > w ? x : w, w = b > w ? b : w, S = g > S ? g : S, S = v > S ? v : S, S = y > S ? y : S, S = T > S ? T : S;
        var A = this._bounds;
        return A.x = E, A.width = w - E, A.y = C, A.height = S - C, this._currentBounds = A, A
    }, e.Sprite.prototype._renderWebGL = function(t) {
        if(this.visible && !(this.alpha <= 0)) {
            var e, i;
            if(this._mask || this._filters) {
                var r = t.spriteBatch;
                for(this._filters && (r.flush(), t.filterManager.pushFilter(this._filterBlock)), this._mask && (r.stop(), t.maskManager.pushMask(this.mask, t), r.start()), r.render(this), e = 0, i = this.children.length; i > e; e++) this.children[e]._renderWebGL(t);
                r.stop(), this._mask && t.maskManager.popMask(this._mask, t), this._filters && t.filterManager.popFilter(), r.start()
            } else
                for(t.spriteBatch.render(this), e = 0, i = this.children.length; i > e; e++) this.children[e]._renderWebGL(t)
        }
    }, e.Sprite.prototype._renderCanvas = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha) {
            if(this.blendMode !== t.currentBlendMode && (t.currentBlendMode = this.blendMode, t.context.globalCompositeOperation = e.blendModesCanvas[t.currentBlendMode]), this._mask && t.maskManager.pushMask(this._mask, t.context), this.texture.valid) {
                t.context.globalAlpha = this.worldAlpha, t.roundPixels ? t.context.setTransform(this.worldTransform.a, this.worldTransform.c, this.worldTransform.b, this.worldTransform.d, 0 | this.worldTransform.tx, 0 | this.worldTransform.ty) : t.context.setTransform(this.worldTransform.a, this.worldTransform.c, this.worldTransform.b, this.worldTransform.d, this.worldTransform.tx, this.worldTransform.ty), t.smoothProperty && t.scaleMode !== this.texture.baseTexture.scaleMode && (t.scaleMode = this.texture.baseTexture.scaleMode, t.context[t.smoothProperty] = t.scaleMode === e.scaleModes.LINEAR);
                var i = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width,
                    r = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
                16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = e.CanvasTinter.getTintedTexture(this, this.tint)), t.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width, this.texture.crop.height, i, r, this.texture.crop.width, this.texture.crop.height)) : t.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, i, r, this.texture.crop.width, this.texture.crop.height)
            }
            for(var s = 0, n = this.children.length; n > s; s++) this.children[s]._renderCanvas(t);
            this._mask && t.maskManager.popMask(t.context)
        }
    }, e.Sprite.fromFrame = function(t) {
        var i = e.TextureCache[t];
        if(!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache' + this);
        return new e.Sprite(i)
    }, e.Sprite.fromImage = function(t, i, r) {
        var s = e.Texture.fromImage(t, i, r);
        return new e.Sprite(s)
    }, e.SpriteBatch = function(t) {
        e.DisplayObjectContainer.call(this), this.textureThing = t, this.ready = !1
    }, e.SpriteBatch.prototype = Object.create(e.DisplayObjectContainer.prototype), e.SpriteBatch.constructor = e.SpriteBatch, e.SpriteBatch.prototype.initWebGL = function(t) {
        this.fastSpriteBatch = new e.WebGLFastSpriteBatch(t), this.ready = !0
    }, e.SpriteBatch.prototype.updateTransform = function() {
        e.DisplayObject.prototype.updateTransform.call(this)
    }, e.SpriteBatch.prototype._renderWebGL = function(t) {
        !this.visible || this.alpha <= 0 || !this.children.length || (this.ready || this.initWebGL(t.gl), t.spriteBatch.stop(), t.shaderManager.setShader(t.shaderManager.fastShader), this.fastSpriteBatch.begin(this, t), this.fastSpriteBatch.render(this), t.spriteBatch.start())
    }, e.SpriteBatch.prototype._renderCanvas = function(t) {
        var i = t.context;
        i.globalAlpha = this.worldAlpha, e.DisplayObject.prototype.updateTransform.call(this);
        for(var r = this.worldTransform, s = !0, n = 0; n < this.children.length; n++) {
            var o = this.children[n];
            if(o.visible) {
                var a = o.texture,
                    h = a.frame;
                if(i.globalAlpha = this.worldAlpha * o.alpha, o.rotation % (2 * Math.PI) === 0) s && (i.setTransform(r.a, r.c, r.b, r.d, r.tx, r.ty), s = !1), i.drawImage(a.baseTexture.source, h.x, h.y, h.width, h.height, o.anchor.x * -h.width * o.scale.x + o.position.x + .5 | 0, o.anchor.y * -h.height * o.scale.y + o.position.y + .5 | 0, h.width * o.scale.x, h.height * o.scale.y);
                else {
                    s || (s = !0), e.DisplayObject.prototype.updateTransform.call(o);
                    var l = o.worldTransform;
                    t.roundPixels ? i.setTransform(l.a, l.c, l.b, l.d, 0 | l.tx, 0 | l.ty) : i.setTransform(l.a, l.c, l.b, l.d, l.tx, l.ty), i.drawImage(a.baseTexture.source, h.x, h.y, h.width, h.height, o.anchor.x * -h.width + .5 | 0, o.anchor.y * -h.height + .5 | 0, h.width, h.height)
                }
            }
        }
    }, e.MovieClip = function(t) {
        e.Sprite.call(this, t[0]), this.textures = t, this.animationSpeed = 1, this.loop = !0, this.onComplete = null, this.currentFrame = 0, this.playing = !1
    }, e.MovieClip.prototype = Object.create(e.Sprite.prototype), e.MovieClip.prototype.constructor = e.MovieClip, Object.defineProperty(e.MovieClip.prototype, "totalFrames", {
        get: function() {
            return this.textures.length
        }
    }), e.MovieClip.prototype.stop = function() {
        this.playing = !1
    }, e.MovieClip.prototype.play = function() {
        this.playing = !0
    }, e.MovieClip.prototype.gotoAndStop = function(t) {
        this.playing = !1, this.currentFrame = t;
        var e = this.currentFrame + .5 | 0;
        this.setTexture(this.textures[e % this.textures.length])
    }, e.MovieClip.prototype.gotoAndPlay = function(t) {
        this.currentFrame = t, this.playing = !0
    }, e.MovieClip.prototype.updateTransform = function() {
        if(e.Sprite.prototype.updateTransform.call(this), this.playing) {
            this.currentFrame += this.animationSpeed;
            var t = this.currentFrame + .5 | 0;
            this.currentFrame = this.currentFrame % this.textures.length, this.loop || t < this.textures.length ? this.setTexture(this.textures[t % this.textures.length]) : t >= this.textures.length && (this.gotoAndStop(this.textures.length - 1), this.onComplete && this.onComplete())
        }
    }, e.MovieClip.fromFrames = function(t) {
        for(var i = [], r = 0; r < t.length; r++) i.push(new e.Texture.fromFrame(t[r]));
        return new e.MovieClip(i)
    }, e.MovieClip.fromImages = function(t) {
        for(var i = [], r = 0; r < t.length; r++) i.push(new e.Texture.fromImage(t[r]));
        return new e.MovieClip(i)
    }, e.FilterBlock = function() {
        this.visible = !0, this.renderable = !0
    }, e.Text = function(t, i) {
        this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), e.Sprite.call(this, e.Texture.fromCanvas(this.canvas)), this.setText(t), this.setStyle(i)
    }, e.Text.prototype = Object.create(e.Sprite.prototype), e.Text.prototype.constructor = e.Text, Object.defineProperty(e.Text.prototype, "width", {
        get: function() {
            return this.dirty && (this.updateText(), this.dirty = !1), this.scale.x * this.texture.frame.width
        },
        set: function(t) {
            this.scale.x = t / this.texture.frame.width, this._width = t
        }
    }), Object.defineProperty(e.Text.prototype, "height", {
        get: function() {
            return this.dirty && (this.updateText(), this.dirty = !1), this.scale.y * this.texture.frame.height
        },
        set: function(t) {
            this.scale.y = t / this.texture.frame.height, this._height = t
        }
    }), e.Text.prototype.setStyle = function(t) {
        t = t || {}, t.font = t.font || "bold 20pt Arial", t.fill = t.fill || "black", t.align = t.align || "left", t.stroke = t.stroke || "black", t.strokeThickness = t.strokeThickness || 0, t.wordWrap = t.wordWrap || !1, t.wordWrapWidth = t.wordWrapWidth || 100, t.wordWrapWidth = t.wordWrapWidth || 100, t.dropShadow = t.dropShadow || !1, t.dropShadowAngle = t.dropShadowAngle || Math.PI / 6, t.dropShadowDistance = t.dropShadowDistance || 4, t.dropShadowColor = t.dropShadowColor || "black", this.style = t, this.dirty = !0
    }, e.Text.prototype.setText = function(t) {
        this.text = t.toString() || " ", this.dirty = !0
    }, e.Text.prototype.updateText = function() {
        this.context.font = this.style.font;
        var t = this.text;
        this.style.wordWrap && (t = this.wordWrap(this.text));
        for(var e = t.split(/(?:\r\n|\r|\n)/), i = [], r = 0, s = 0; s < e.length; s++) {
            var n = this.context.measureText(e[s]).width;
            i[s] = n, r = Math.max(r, n)
        }
        var o = r + this.style.strokeThickness;
        this.style.dropShadow && (o += this.style.dropShadowDistance), this.canvas.width = o + this.context.lineWidth;
        var a = this.determineFontHeight("font: " + this.style.font + ";") + this.style.strokeThickness,
            h = a * e.length;
        this.style.dropShadow && (h += this.style.dropShadowDistance), this.canvas.height = h, navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.font = this.style.font, this.context.strokeStyle = this.style.stroke, this.context.lineWidth = this.style.strokeThickness, this.context.textBaseline = "top";
        var l, u;
        if(this.style.dropShadow) {
            this.context.fillStyle = this.style.dropShadowColor;
            var c = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance,
                d = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
            for(s = 0; s < e.length; s++) l = this.style.strokeThickness / 2, u = this.style.strokeThickness / 2 + s * a, "right" === this.style.align ? l += r - i[s] : "center" === this.style.align && (l += (r - i[s]) / 2), this.style.fill && this.context.fillText(e[s], l + c, u + d)
        }
        for(this.context.fillStyle = this.style.fill, s = 0; s < e.length; s++) l = this.style.strokeThickness / 2, u = this.style.strokeThickness / 2 + s * a, "right" === this.style.align ? l += r - i[s] : "center" === this.style.align && (l += (r - i[s]) / 2), this.style.stroke && this.style.strokeThickness && this.context.strokeText(e[s], l, u), this.style.fill && this.context.fillText(e[s], l, u);
        this.updateTexture()
    }, e.Text.prototype.updateTexture = function() {
        this.texture.baseTexture.width = this.canvas.width, this.texture.baseTexture.height = this.canvas.height, this.texture.crop.width = this.texture.frame.width = this.canvas.width, this.texture.crop.height = this.texture.frame.height = this.canvas.height, this._width = this.canvas.width, this._height = this.canvas.height, this.requiresUpdate = !0
    }, e.Text.prototype._renderWebGL = function(t) {
        this.requiresUpdate && (this.requiresUpdate = !1, e.updateWebGLTexture(this.texture.baseTexture, t.gl)), e.Sprite.prototype._renderWebGL.call(this, t)
    }, e.Text.prototype.updateTransform = function() {
        this.dirty && (this.updateText(), this.dirty = !1), e.Sprite.prototype.updateTransform.call(this)
    }, e.Text.prototype.determineFontHeight = function(t) {
        var i = e.Text.heightCache[t];
        if(!i) {
            var r = document.getElementsByTagName("body")[0],
                s = document.createElement("div"),
                n = document.createTextNode("M");
            s.appendChild(n), s.setAttribute("style", t + ";position:absolute;top:0;left:0"), r.appendChild(s), i = s.offsetHeight, e.Text.heightCache[t] = i, r.removeChild(s)
        }
        return i
    }, e.Text.prototype.wordWrap = function(t) {
        for(var e = "", i = t.split("\n"), r = 0; r < i.length; r++) {
            for(var s = this.style.wordWrapWidth, n = i[r].split(" "), o = 0; o < n.length; o++) {
                var a = this.context.measureText(n[o]).width,
                    h = a + this.context.measureText(" ").width;
                0 === o || h > s ? (o > 0 && (e += "\n"), e += n[o], s = this.style.wordWrapWidth - a) : (s -= h, e += " " + n[o])
            }
            r < i.length - 1 && (e += "\n")
        }
        return e
    }, e.Text.prototype.destroy = function(t) {
        this.context = null, this.canvas = null, this.texture.destroy(void 0 === t ? !0 : t)
    }, e.Text.heightCache = {}, e.BitmapText = function(t, i) {
        e.DisplayObjectContainer.call(this), this._pool = [], this.setText(t), this.setStyle(i), this.updateText(), this.dirty = !1
    }, e.BitmapText.prototype = Object.create(e.DisplayObjectContainer.prototype), e.BitmapText.prototype.constructor = e.BitmapText, e.BitmapText.prototype.setText = function(t) {
        this.text = t || " ", this.dirty = !0
    }, e.BitmapText.prototype.setStyle = function(t) {
        t = t || {}, t.align = t.align || "left", this.style = t;
        var i = t.font.split(" ");
        this.fontName = i[i.length - 1], this.fontSize = i.length >= 2 ? parseInt(i[i.length - 2], 10) : e.BitmapText.fonts[this.fontName].size, this.dirty = !0, this.tint = t.tint
    }, e.BitmapText.prototype.updateText = function() {
        for(var t = e.BitmapText.fonts[this.fontName], i = new e.Point, r = null, s = [], n = 0, o = [], a = 0, h = this.fontSize / t.size, l = 0; l < this.text.length; l++) {
            var u = this.text.charCodeAt(l);
            if(/(?:\r\n|\r|\n)/.test(this.text.charAt(l))) o.push(i.x), n = Math.max(n, i.x), a++, i.x = 0, i.y += t.lineHeight, r = null;
            else {
                var c = t.chars[u];
                c && (r && c[r] && (i.x += c.kerning[r]), s.push({
                    texture: c.texture,
                    line: a,
                    charCode: u,
                    position: new e.Point(i.x + c.xOffset, i.y + c.yOffset)
                }), i.x += c.xAdvance, r = u)
            }
        }
        o.push(i.x), n = Math.max(n, i.x);
        var d = [];
        for(l = 0; a >= l; l++) {
            var p = 0;
            "right" === this.style.align ? p = n - o[l] : "center" === this.style.align && (p = (n - o[l]) / 2), d.push(p)
        }
        var f = this.children.length,
            g = s.length,
            m = this.tint || 16777215;
        for(l = 0; g > l; l++) {
            var v = f > l ? this.children[l] : this._pool.pop();
            v ? v.setTexture(s[l].texture) : v = new e.Sprite(s[l].texture), v.position.x = (s[l].position.x + d[s[l].line]) * h, v.position.y = s[l].position.y * h, v.scale.x = v.scale.y = h, v.tint = m, v.parent || this.addChild(v)
        }
        for(; this.children.length > g;) {
            var x = this.getChildAt(this.children.length - 1);
            this._pool.push(x), this.removeChild(x)
        }
        this.textWidth = n * h, this.textHeight = (i.y + t.lineHeight) * h
    }, e.BitmapText.prototype.updateTransform = function() {
        this.dirty && (this.updateText(), this.dirty = !1), e.DisplayObjectContainer.prototype.updateTransform.call(this)
    }, e.BitmapText.fonts = {}, e.InteractionData = function() {
        this.global = new e.Point, this.target = null, this.originalEvent = null
    }, e.InteractionData.prototype.getLocalPosition = function(t) {
        var i = t.worldTransform,
            r = this.global,
            s = i.a,
            n = i.b,
            o = i.tx,
            a = i.c,
            h = i.d,
            l = i.ty,
            u = 1 / (s * h + n * -a);
        return new e.Point(h * u * r.x + -n * u * r.y + (l * n - o * h) * u, s * u * r.y + -a * u * r.x + (-l * s + o * a) * u)
    }, e.InteractionData.prototype.constructor = e.InteractionData, e.InteractionManager = function(t) {
        this.stage = t, this.mouse = new e.InteractionData, this.touchs = {}, this.tempPoint = new e.Point, this.mouseoverEnabled = !0, this.pool = [], this.interactiveItems = [], this.interactionDOMElement = null, this.onMouseMove = this.onMouseMove.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.last = 0, this.currentCursorStyle = "inherit", this.mouseOut = !1
    }, e.InteractionManager.prototype.constructor = e.InteractionManager, e.InteractionManager.prototype.collectInteractiveSprite = function(t, e) {
        for(var i = t.children, r = i.length, s = r - 1; s >= 0; s--) {
            var n = i[s];
            n._interactive ? (e.interactiveChildren = !0, this.interactiveItems.push(n), n.children.length > 0 && this.collectInteractiveSprite(n, n)) : (n.__iParent = null, n.children.length > 0 && this.collectInteractiveSprite(n, e))
        }
    }, e.InteractionManager.prototype.setTarget = function(t) {
        this.target = t, null === this.interactionDOMElement && this.setTargetDomElement(t.view)
    }, e.InteractionManager.prototype.setTargetDomElement = function(t) {
        this.removeEvents(), window.navigator.msPointerEnabled && (t.style["-ms-content-zooming"] = "none", t.style["-ms-touch-action"] = "none"), this.interactionDOMElement = t, t.addEventListener("mousemove", this.onMouseMove, !0), t.addEventListener("mousedown", this.onMouseDown, !0), t.addEventListener("mouseout", this.onMouseOut, !0), t.addEventListener("touchstart", this.onTouchStart, !0), t.addEventListener("touchend", this.onTouchEnd, !0), t.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0)
    }, e.InteractionManager.prototype.removeEvents = function() {
        this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "", this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0))
    }, e.InteractionManager.prototype.update = function() {
        if(this.target) {
            var t = Date.now(),
                i = t - this.last;
            if(i = i * e.INTERACTION_FREQUENCY / 1e3, !(1 > i)) {
                this.last = t;
                var r = 0;
                this.dirty && this.rebuildInteractiveGraph();
                var s = this.interactiveItems.length,
                    n = "inherit",
                    o = !1;
                for(r = 0; s > r; r++) {
                    var a = this.interactiveItems[r];
                    a.__hit = this.hitTest(a, this.mouse), this.mouse.target = a, a.__hit && !o ? (a.buttonMode && (n = a.defaultCursor), a.interactiveChildren || (o = !0), a.__isOver || (a.mouseover && a.mouseover(this.mouse), a.__isOver = !0)) : a.__isOver && (a.mouseout && a.mouseout(this.mouse), a.__isOver = !1)
                }
                this.currentCursorStyle !== n && (this.currentCursorStyle = n, this.interactionDOMElement.style.cursor = n)
            }
        }
    }, e.InteractionManager.prototype.rebuildInteractiveGraph = function() {
        this.dirty = !1;
        for(var t = this.interactiveItems.length, e = 0; t > e; e++) this.interactiveItems[e].interactiveChildren = !1;
        this.interactiveItems = [], this.stage.interactive && this.interactiveItems.push(this.stage), this.collectInteractiveSprite(this.stage, this.stage)
    }, e.InteractionManager.prototype.onMouseMove = function(t) {
        this.dirty && this.rebuildInteractiveGraph(), this.mouse.originalEvent = t || window.event;
        var e = this.interactionDOMElement.getBoundingClientRect();
        this.mouse.global.x = (t.clientX - e.left) * (this.target.width / e.width), this.mouse.global.y = (t.clientY - e.top) * (this.target.height / e.height);
        for(var i = this.interactiveItems.length, r = 0; i > r; r++) {
            var s = this.interactiveItems[r];
            s.mousemove && s.mousemove(this.mouse)
        }
    }, e.InteractionManager.prototype.onMouseDown = function(t) {
        this.dirty && this.rebuildInteractiveGraph(), this.mouse.originalEvent = t || window.event, e.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent.preventDefault();
        for(var i = this.interactiveItems.length, r = 0; i > r; r++) {
            var s = this.interactiveItems[r];
            if((s.mousedown || s.click) && (s.__mouseIsDown = !0, s.__hit = this.hitTest(s, this.mouse), s.__hit && (s.mousedown && s.mousedown(this.mouse), s.__isDown = !0, !s.interactiveChildren))) break
        }
    }, e.InteractionManager.prototype.onMouseOut = function() {
        this.dirty && this.rebuildInteractiveGraph();
        var t = this.interactiveItems.length;
        this.interactionDOMElement.style.cursor = "inherit";
        for(var e = 0; t > e; e++) {
            var i = this.interactiveItems[e];
            i.__isOver && (this.mouse.target = i, i.mouseout && i.mouseout(this.mouse), i.__isOver = !1)
        }
        this.mouseOut = !0, this.mouse.global.x = -1e4, this.mouse.global.y = -1e4
    }, e.InteractionManager.prototype.onMouseUp = function(t) {
        this.dirty && this.rebuildInteractiveGraph(), this.mouse.originalEvent = t || window.event;
        for(var e = this.interactiveItems.length, i = !1, r = 0; e > r; r++) {
            var s = this.interactiveItems[r];
            s.__hit = this.hitTest(s, this.mouse), s.__hit && !i ? (s.mouseup && s.mouseup(this.mouse), s.__isDown && s.click && s.click(this.mouse), s.interactiveChildren || (i = !0)) : s.__isDown && s.mouseupoutside && s.mouseupoutside(this.mouse), s.__isDown = !1
        }
    }, e.InteractionManager.prototype.hitTest = function(t, i) {
        var r = i.global;
        if(!t.worldVisible) return !1;
        var s = t instanceof e.Sprite,
            n = t.worldTransform,
            o = n.a,
            a = n.b,
            h = n.tx,
            l = n.c,
            u = n.d,
            c = n.ty,
            d = 1 / (o * u + a * -l),
            p = u * d * r.x + -a * d * r.y + (c * a - h * u) * d,
            f = o * d * r.y + -l * d * r.x + (-c * o + h * l) * d;
        if(i.target = t, t.hitArea && t.hitArea.contains) return t.hitArea.contains(p, f) ? (i.target = t, !0) : !1;
        if(s) {
            var g, m = t.texture.frame.width,
                v = t.texture.frame.height,
                x = -m * t.anchor.x;
            if(p > x && x + m > p && (g = -v * t.anchor.y, f > g && g + v > f)) return i.target = t, !0
        }
        for(var y = t.children.length, b = 0; y > b; b++) {
            var T = t.children[b],
                w = this.hitTest(T, i);
            if(w) return i.target = t, !0
        }
        return !1
    }, e.InteractionManager.prototype.onTouchMove = function(t) {
        this.dirty && this.rebuildInteractiveGraph();
        var e, i = this.interactionDOMElement.getBoundingClientRect(),
            r = t.changedTouches,
            s = 0;
        for(s = 0; s < r.length; s++) {
            var n = r[s];
            e = this.touchs[n.identifier], e.originalEvent = t || window.event, e.global.x = (n.clientX - i.left) * (this.target.width / i.width), e.global.y = (n.clientY - i.top) * (this.target.height / i.height), navigator.isCocoonJS && (e.global.x = n.clientX, e.global.y = n.clientY);
            for(var o = 0; o < this.interactiveItems.length; o++) {
                var a = this.interactiveItems[o];
                a.touchmove && a.__touchData && a.__touchData[n.identifier] && a.touchmove(e)
            }
        }
    }, e.InteractionManager.prototype.onTouchStart = function(t) {
        this.dirty && this.rebuildInteractiveGraph();
        var i = this.interactionDOMElement.getBoundingClientRect();
        e.AUTO_PREVENT_DEFAULT && t.preventDefault();
        for(var r = t.changedTouches, s = 0; s < r.length; s++) {
            var n = r[s],
                o = this.pool.pop();
            o || (o = new e.InteractionData), o.originalEvent = t || window.event, this.touchs[n.identifier] = o, o.global.x = (n.clientX - i.left) * (this.target.width / i.width), o.global.y = (n.clientY - i.top) * (this.target.height / i.height), navigator.isCocoonJS && (o.global.x = n.clientX, o.global.y = n.clientY);
            for(var a = this.interactiveItems.length, h = 0; a > h; h++) {
                var l = this.interactiveItems[h];
                if((l.touchstart || l.tap) && (l.__hit = this.hitTest(l, o), l.__hit && (l.touchstart && l.touchstart(o), l.__isDown = !0, l.__touchData = l.__touchData || {}, l.__touchData[n.identifier] = o, !l.interactiveChildren))) break
            }
        }
    }, e.InteractionManager.prototype.onTouchEnd = function(t) {
        this.dirty && this.rebuildInteractiveGraph();
        for(var e = this.interactionDOMElement.getBoundingClientRect(), i = t.changedTouches, r = 0; r < i.length; r++) {
            var s = i[r],
                n = this.touchs[s.identifier],
                o = !1;
            n.global.x = (s.clientX - e.left) * (this.target.width / e.width), n.global.y = (s.clientY - e.top) * (this.target.height / e.height), navigator.isCocoonJS && (n.global.x = s.clientX, n.global.y = s.clientY);
            for(var a = this.interactiveItems.length, h = 0; a > h; h++) {
                var l = this.interactiveItems[h];
                l.__touchData && l.__touchData[s.identifier] && (l.__hit = this.hitTest(l, l.__touchData[s.identifier]), n.originalEvent = t || window.event, (l.touchend || l.tap) && (l.__hit && !o ? (l.touchend && l.touchend(n), l.__isDown && l.tap && l.tap(n), l.interactiveChildren || (o = !0)) : l.__isDown && l.touchendoutside && l.touchendoutside(n), l.__isDown = !1), l.__touchData[s.identifier] = null)
            }
            this.pool.push(n), this.touchs[s.identifier] = null
        }
    }, e.Stage = function(t) {
        e.DisplayObjectContainer.call(this), this.worldTransform = new e.Matrix, this.interactive = !0, this.interactionManager = new e.InteractionManager(this), this.dirty = !0, this.stage = this, this.stage.hitArea = new e.Rectangle(0, 0, 1e5, 1e5), this.setBackgroundColor(t)
    }, e.Stage.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Stage.prototype.constructor = e.Stage, e.Stage.prototype.setInteractionDelegate = function(t) {
        this.interactionManager.setTargetDomElement(t)
    }, e.Stage.prototype.updateTransform = function() {
        this.worldAlpha = 1;
        for(var t = 0, e = this.children.length; e > t; t++) this.children[t].updateTransform();
        this.dirty && (this.dirty = !1, this.interactionManager.dirty = !0), this.interactive && this.interactionManager.update()
    }, e.Stage.prototype.setBackgroundColor = function(t) {
        this.backgroundColor = t || 0, this.backgroundColorSplit = e.hex2rgb(this.backgroundColor);
        var i = this.backgroundColor.toString(16);
        i = "000000".substr(0, 6 - i.length) + i, this.backgroundColorString = "#" + i
    }, e.Stage.prototype.getMousePosition = function() {
        return this.interactionManager.mouse.global
    };
    for(var i = 0, r = ["ms", "moz", "webkit", "o"], s = 0; s < r.length && !window.requestAnimationFrame; ++s) window.requestAnimationFrame = window[r[s] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[r[s] + "CancelAnimationFrame"] || window[r[s] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
        var e = (new Date).getTime(),
            r = Math.max(0, 16 - (e - i)),
            s = window.setTimeout(function() {
                t(e + r)
            }, r);
        return i = e + r, s
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    }), window.requestAnimFrame = window.requestAnimationFrame, e.hex2rgb = function(t) {
        return [(t >> 16 & 255) / 255, (t >> 8 & 255) / 255, (255 & t) / 255]
    }, e.rgb2hex = function(t) {
        return(255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
    }, "function" != typeof Function.prototype.bind && (Function.prototype.bind = function() {
        var t = Array.prototype.slice;
        return function(e) {
            function i() {
                var n = s.concat(t.call(arguments));
                r.apply(this instanceof i ? this : e, n)
            }
            var r = this,
                s = t.call(arguments, 1);
            if("function" != typeof r) throw new TypeError;
            return i.prototype = function n(t) {
                return t && (n.prototype = t), this instanceof n ? void 0 : new n
            }(r.prototype), i
        }
    }()), e.AjaxRequest = function() {
        var t = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
        if(!window.ActiveXObject) return window.XMLHttpRequest ? new window.XMLHttpRequest : !1;
        for(var e = 0; e < t.length; e++) try {
            return new window.ActiveXObject(t[e])
        } catch(i) {}
    }, e.canUseNewCanvasBlendModes = function() {
        var t = document.createElement("canvas");
        t.width = 1, t.height = 1;
        var e = t.getContext("2d");
        return e.fillStyle = "#000", e.fillRect(0, 0, 1, 1), e.globalCompositeOperation = "multiply", e.fillStyle = "#fff", e.fillRect(0, 0, 1, 1), 0 === e.getImageData(0, 0, 1, 1).data[0]
    }, e.getNextPowerOfTwo = function(t) {
        if(t > 0 && 0 === (t & t - 1)) return t;
        for(var e = 1; t > e;) e <<= 1;
        return e
    }, e.EventTarget = function() {
        var t = {};
        this.addEventListener = this.on = function(e, i) {
            void 0 === t[e] && (t[e] = []), -1 === t[e].indexOf(i) && t[e].unshift(i)
        }, this.dispatchEvent = this.emit = function(e) {
            if(t[e.type] && t[e.type].length)
                for(var i = t[e.type].length - 1; i >= 0; i--) t[e.type][i](e)
        }, this.removeEventListener = this.off = function(e, i) {
            if(void 0 !== t[e]) {
                var r = t[e].indexOf(i); - 1 !== r && t[e].splice(r, 1)
            }
        }, this.removeAllEventListeners = function(e) {
            var i = t[e];
            i && (i.length = 0)
        }
    }, e.autoDetectRenderer = function(t, i, r, s, n) {
        t || (t = 800), i || (i = 600);
        var o = function() {
            try {
                var t = document.createElement("canvas");
                return !!window.WebGLRenderingContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
            } catch(e) {
                return !1
            }
        }();
        return o ? new e.WebGLRenderer(t, i, r, s, n) : new e.CanvasRenderer(t, i, r, s)
    }, e.autoDetectRecommendedRenderer = function(t, i, r, s, n) {
        t || (t = 800), i || (i = 600);
        var o = function() {
                try {
                    var t = document.createElement("canvas");
                    return !!window.WebGLRenderingContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
                } catch(e) {
                    return !1
                }
            }(),
            a = /Android/i.test(navigator.userAgent);
        return o && !a ? new e.WebGLRenderer(t, i, r, s, n) : new e.CanvasRenderer(t, i, r, s)
    }, e.PolyK = {}, e.PolyK.Triangulate = function(t) {
        var i = !0,
            r = t.length >> 1;
        if(3 > r) return [];
        for(var s = [], n = [], o = 0; r > o; o++) n.push(o);
        o = 0;
        for(var a = r; a > 3;) {
            var h = n[(o + 0) % a],
                l = n[(o + 1) % a],
                u = n[(o + 2) % a],
                c = t[2 * h],
                d = t[2 * h + 1],
                p = t[2 * l],
                f = t[2 * l + 1],
                g = t[2 * u],
                m = t[2 * u + 1],
                v = !1;
            if(e.PolyK._convex(c, d, p, f, g, m, i)) {
                v = !0;
                for(var x = 0; a > x; x++) {
                    var y = n[x];
                    if(y !== h && y !== l && y !== u && e.PolyK._PointInTriangle(t[2 * y], t[2 * y + 1], c, d, p, f, g, m)) {
                        v = !1;
                        break
                    }
                }
            }
            if(v) s.push(h, l, u), n.splice((o + 1) % a, 1), a--, o = 0;
            else if(o++ > 3 * a) {
                if(!i) return window.console.log("PIXI Warning: shape too complex to fill"), [];
                for(s = [], n = [], o = 0; r > o; o++) n.push(o);
                o = 0, a = r, i = !1
            }
        }
        return s.push(n[0], n[1], n[2]), s
    }, e.PolyK._PointInTriangle = function(t, e, i, r, s, n, o, a) {
        var h = o - i,
            l = a - r,
            u = s - i,
            c = n - r,
            d = t - i,
            p = e - r,
            f = h * h + l * l,
            g = h * u + l * c,
            m = h * d + l * p,
            v = u * u + c * c,
            x = u * d + c * p,
            y = 1 / (f * v - g * g),
            b = (v * m - g * x) * y,
            T = (f * x - g * m) * y;
        return b >= 0 && T >= 0 && 1 > b + T
    }, e.PolyK._convex = function(t, e, i, r, s, n, o) {
        return(e - r) * (s - i) + (i - t) * (n - r) >= 0 === o
    }, e.initDefaultShaders = function() {}, e.CompileVertexShader = function(t, i) {
        return e._CompileShader(t, i, t.VERTEX_SHADER)
    }, e.CompileFragmentShader = function(t, i) {
        return e._CompileShader(t, i, t.FRAGMENT_SHADER)
    }, e._CompileShader = function(t, e, i) {
        var r = e.join("\n"),
            s = t.createShader(i);
        return t.shaderSource(s, r), t.compileShader(s), t.getShaderParameter(s, t.COMPILE_STATUS) ? s : (window.console.log(t.getShaderInfoLog(s)), null)
    }, e.compileProgram = function(t, i, r) {
        var s = e.CompileFragmentShader(t, r),
            n = e.CompileVertexShader(t, i),
            o = t.createProgram();
        return t.attachShader(o, n), t.attachShader(o, s), t.linkProgram(o), t.getProgramParameter(o, t.LINK_STATUS) || window.console.log("Could not initialise shaders"), o
    }, e.PixiShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.textureCount = 0, this.attributes = [], this.init()
    }, e.PixiShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc || e.PixiShader.defaultVertexSrc, this.fragmentSrc);
        t.useProgram(i), this.uSampler = t.getUniformLocation(i, "uSampler"), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.dimensions = t.getUniformLocation(i, "dimensions"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.colorAttribute = t.getAttribLocation(i, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
        for(var r in this.uniforms) this.uniforms[r].uniformLocation = t.getUniformLocation(i, r);
        this.initUniforms(), this.program = i
    }, e.PixiShader.prototype.initUniforms = function() {
        this.textureCount = 1;
        var t, e = this.gl;
        for(var i in this.uniforms) {
            t = this.uniforms[i];
            var r = t.type;
            "sampler2D" === r ? (t._init = !1, null !== t.value && this.initSampler2D(t)) : "mat2" === r || "mat3" === r || "mat4" === r ? (t.glMatrix = !0, t.glValueLength = 1, "mat2" === r ? t.glFunc = e.uniformMatrix2fv : "mat3" === r ? t.glFunc = e.uniformMatrix3fv : "mat4" === r && (t.glFunc = e.uniformMatrix4fv)) : (t.glFunc = e["uniform" + r], t.glValueLength = "2f" === r || "2i" === r ? 2 : "3f" === r || "3i" === r ? 3 : "4f" === r || "4i" === r ? 4 : 1)
        }
    }, e.PixiShader.prototype.initSampler2D = function(t) {
        if(t.value && t.value.baseTexture && t.value.baseTexture.hasLoaded) {
            var e = this.gl;
            if(e.activeTexture(e["TEXTURE" + this.textureCount]), e.bindTexture(e.TEXTURE_2D, t.value.baseTexture._glTextures[e.id]), t.textureData) {
                var i = t.textureData,
                    r = i.magFilter ? i.magFilter : e.LINEAR,
                    s = i.minFilter ? i.minFilter : e.LINEAR,
                    n = i.wrapS ? i.wrapS : e.CLAMP_TO_EDGE,
                    o = i.wrapT ? i.wrapT : e.CLAMP_TO_EDGE,
                    a = i.luminance ? e.LUMINANCE : e.RGBA;
                if(i.repeat && (n = e.REPEAT, o = e.REPEAT), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !!i.flipY), i.width) {
                    var h = i.width ? i.width : 512,
                        l = i.height ? i.height : 2,
                        u = i.border ? i.border : 0;
                    e.texImage2D(e.TEXTURE_2D, 0, a, h, l, u, a, e.UNSIGNED_BYTE, null)
                } else e.texImage2D(e.TEXTURE_2D, 0, a, e.RGBA, e.UNSIGNED_BYTE, t.value.baseTexture.source);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, r), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, s), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, o)
            }
            e.uniform1i(t.uniformLocation, this.textureCount), t._init = !0, this.textureCount++
        }
    }, e.PixiShader.prototype.syncUniforms = function() {
        this.textureCount = 1;
        var t, i = this.gl;
        for(var r in this.uniforms) t = this.uniforms[r], 1 === t.glValueLength ? t.glMatrix === !0 ? t.glFunc.call(i, t.uniformLocation, t.transpose, t.value) : t.glFunc.call(i, t.uniformLocation, t.value) : 2 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y) : 3 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y, t.value.z) : 4 === t.glValueLength ? t.glFunc.call(i, t.uniformLocation, t.value.x, t.value.y, t.value.z, t.value.w) : "sampler2D" === t.type && (t._init ? (i.activeTexture(i["TEXTURE" + this.textureCount]), i.bindTexture(i.TEXTURE_2D, t.value.baseTexture._glTextures[i.id] || e.createWebGLTexture(t.value.baseTexture, i)), i.uniform1i(t.uniformLocation, this.textureCount), this.textureCount++) : this.initSampler2D(t))
    }, e.PixiShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
    }, e.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec2 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;", "   vColor = vec4(color * aColor.x, aColor.x);", "}"], e.PixiFastShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"], this.textureCount = 0, this.init()
    }, e.PixiFastShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.uSampler = t.getUniformLocation(i, "uSampler"), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.dimensions = t.getUniformLocation(i, "dimensions"), this.uMatrix = t.getUniformLocation(i, "uMatrix"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aPositionCoord = t.getAttribLocation(i, "aPositionCoord"), this.aScale = t.getAttribLocation(i, "aScale"), this.aRotation = t.getAttribLocation(i, "aRotation"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.colorAttribute = t.getAttribLocation(i, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute], this.program = i
    }, e.PixiFastShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
    }, e.StripShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"], this.init()
    }, e.StripShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.uSampler = t.getUniformLocation(i, "uSampler"), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.colorAttribute = t.getAttribLocation(i, "aColor"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord"), this.attributes = [this.aVertexPosition, this.aTextureCoord], this.translationMatrix = t.getUniformLocation(i, "translationMatrix"), this.alpha = t.getUniformLocation(i, "alpha"), this.program = i
    }, e.PrimitiveShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"], this.init()
    }, e.PrimitiveShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.tintColor = t.getUniformLocation(i, "tint"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.colorAttribute = t.getAttribLocation(i, "aColor"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = t.getUniformLocation(i, "translationMatrix"), this.alpha = t.getUniformLocation(i, "alpha"), this.program = i
    }, e.PrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attribute = null
    }, e.ComplexPrimitiveShader = function(t) {
        this._UID = e._UID++, this.gl = t, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"], this.init()
    }, e.ComplexPrimitiveShader.prototype.init = function() {
        var t = this.gl,
            i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
        t.useProgram(i), this.projectionVector = t.getUniformLocation(i, "projectionVector"), this.offsetVector = t.getUniformLocation(i, "offsetVector"), this.tintColor = t.getUniformLocation(i, "tint"), this.color = t.getUniformLocation(i, "color"), this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = t.getUniformLocation(i, "translationMatrix"), this.alpha = t.getUniformLocation(i, "alpha"), this.program = i
    }, e.ComplexPrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attribute = null
    }, e.WebGLGraphics = function() {}, e.WebGLGraphics.renderGraphics = function(t, i) {
        var r, s = i.gl,
            n = i.projection,
            o = i.offset,
            a = i.shaderManager.primitiveShader;
        t.dirty && e.WebGLGraphics.updateGraphics(t, s);
        for(var h = t._webGL[s.id], l = 0; l < h.data.length; l++) 1 === h.data[l].mode ? (r = h.data[l], i.stencilManager.pushStencil(t, r, i), s.drawElements(s.TRIANGLE_FAN, 4, s.UNSIGNED_SHORT, 2 * (r.indices.length - 4)), i.stencilManager.popStencil(t, r, i), this.last = r.mode) : (r = h.data[l], i.shaderManager.setShader(a), a = i.shaderManager.primitiveShader, s.uniformMatrix3fv(a.translationMatrix, !1, t.worldTransform.toArray(!0)), s.uniform2f(a.projectionVector, n.x, -n.y), s.uniform2f(a.offsetVector, -o.x, -o.y), s.uniform3fv(a.tintColor, e.hex2rgb(t.tint)), s.uniform1f(a.alpha, t.worldAlpha), s.bindBuffer(s.ARRAY_BUFFER, r.buffer), s.vertexAttribPointer(a.aVertexPosition, 2, s.FLOAT, !1, 24, 0), s.vertexAttribPointer(a.colorAttribute, 4, s.FLOAT, !1, 24, 8), s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, r.indexBuffer), s.drawElements(s.TRIANGLE_STRIP, r.indices.length, s.UNSIGNED_SHORT, 0))
    }, e.WebGLGraphics.updateGraphics = function(t, i) {
        var r = t._webGL[i.id];
        r || (r = t._webGL[i.id] = {
            lastIndex: 0,
            data: [],
            gl: i
        }), t.dirty = !1;
        var s;
        if(t.clearDirty) {
            for(t.clearDirty = !1, s = 0; s < r.data.length; s++) {
                var n = r.data[s];
                n.reset(), e.WebGLGraphics.graphicsDataPool.push(n)
            }
            r.data = [], r.lastIndex = 0
        }
        var o;
        for(s = r.lastIndex; s < t.graphicsData.length; s++) {
            var a = t.graphicsData[s];
            a.type === e.Graphics.POLY ? (a.fill && a.points.length > 6 && (a.points.length > 10 ? (o = e.WebGLGraphics.switchMode(r, 1), e.WebGLGraphics.buildComplexPoly(a, o)) : (o = e.WebGLGraphics.switchMode(r, 0), e.WebGLGraphics.buildPoly(a, o))), a.lineWidth > 0 && (o = e.WebGLGraphics.switchMode(r, 0), e.WebGLGraphics.buildLine(a, o))) : (o = e.WebGLGraphics.switchMode(r, 0), a.type === e.Graphics.RECT ? e.WebGLGraphics.buildRectangle(a, o) : a.type === e.Graphics.CIRC || a.type === e.Graphics.ELIP ? e.WebGLGraphics.buildCircle(a, o) : a.type === e.Graphics.RREC && e.WebGLGraphics.buildRoundedRectangle(a, o)), r.lastIndex++
        }
        for(s = 0; s < r.data.length; s++) o = r.data[s], o.dirty && o.upload()
    }, e.WebGLGraphics.switchMode = function(t, i) {
        var r;
        return t.data.length ? (r = t.data[t.data.length - 1], (r.mode !== i || 1 === i) && (r = e.WebGLGraphics.graphicsDataPool.pop() || new e.WebGLGraphicsData(t.gl), r.mode = i, t.data.push(r))) : (r = e.WebGLGraphics.graphicsDataPool.pop() || new e.WebGLGraphicsData(t.gl), r.mode = i, t.data.push(r)), r.dirty = !0, r
    }, e.WebGLGraphics.buildRectangle = function(t, i) {
        var r = t.points,
            s = r[0],
            n = r[1],
            o = r[2],
            a = r[3];
        if(t.fill) {
            var h = e.hex2rgb(t.fillColor),
                l = t.fillAlpha,
                u = h[0] * l,
                c = h[1] * l,
                d = h[2] * l,
                p = i.points,
                f = i.indices,
                g = p.length / 6;
            p.push(s, n), p.push(u, c, d, l), p.push(s + o, n), p.push(u, c, d, l), p.push(s, n + a), p.push(u, c, d, l), p.push(s + o, n + a), p.push(u, c, d, l), f.push(g, g, g + 1, g + 2, g + 3, g + 3)
        }
        if(t.lineWidth) {
            var m = t.points;
            t.points = [s, n, s + o, n, s + o, n + a, s, n + a, s, n], e.WebGLGraphics.buildLine(t, i), t.points = m
        }
    }, e.WebGLGraphics.buildRoundedRectangle = function(t, i) {
        var r = t.points,
            s = r[0],
            n = r[1],
            o = r[2],
            a = r[3],
            h = r[4],
            l = [];
        if(l.push(s, n + h), l = l.concat(e.WebGLGraphics.quadraticBezierCurve(s, n + a - h, s, n + a, s + h, n + a)), l = l.concat(e.WebGLGraphics.quadraticBezierCurve(s + o - h, n + a, s + o, n + a, s + o, n + a - h)), l = l.concat(e.WebGLGraphics.quadraticBezierCurve(s + o, n + h, s + o, n, s + o - h, n)), l = l.concat(e.WebGLGraphics.quadraticBezierCurve(s + h, n, s, n, s, n + h)), t.fill) {
            var u = e.hex2rgb(t.fillColor),
                c = t.fillAlpha,
                d = u[0] * c,
                p = u[1] * c,
                f = u[2] * c,
                g = i.points,
                m = i.indices,
                v = g.length / 6,
                x = e.PolyK.Triangulate(l),
                y = 0;
            for(y = 0; y < x.length; y += 3) m.push(x[y] + v), m.push(x[y] + v), m.push(x[y + 1] + v), m.push(x[y + 2] + v), m.push(x[y + 2] + v);
            for(y = 0; y < l.length; y++) g.push(l[y], l[++y], d, p, f, c)
        }
        if(t.lineWidth) {
            var b = t.points;
            t.points = l, e.WebGLGraphics.buildLine(t, i), t.points = b
        }
    }, e.WebGLGraphics.quadraticBezierCurve = function(t, e, i, r, s, n) {
        function o(t, e, i) {
            var r = e - t;
            return t + r * i
        }
        for(var a, h, l, u, c, d, p = 20, f = [], g = 0, m = 0; p >= m; m++) g = m / p, a = o(t, i, g), h = o(e, r, g), l = o(i, s, g), u = o(r, n, g), c = o(a, l, g), d = o(h, u, g), f.push(c, d);
        return f
    }, e.WebGLGraphics.buildCircle = function(t, i) {
        var r = t.points,
            s = r[0],
            n = r[1],
            o = r[2],
            a = r[3],
            h = 40,
            l = 2 * Math.PI / h,
            u = 0;
        if(t.fill) {
            var c = e.hex2rgb(t.fillColor),
                d = t.fillAlpha,
                p = c[0] * d,
                f = c[1] * d,
                g = c[2] * d,
                m = i.points,
                v = i.indices,
                x = m.length / 6;
            for(v.push(x), u = 0; h + 1 > u; u++) m.push(s, n, p, f, g, d), m.push(s + Math.sin(l * u) * o, n + Math.cos(l * u) * a, p, f, g, d), v.push(x++, x++);
            v.push(x - 1)
        }
        if(t.lineWidth) {
            var y = t.points;
            for(t.points = [], u = 0; h + 1 > u; u++) t.points.push(s + Math.sin(l * u) * o, n + Math.cos(l * u) * a);
            e.WebGLGraphics.buildLine(t, i), t.points = y
        }
    }, e.WebGLGraphics.buildLine = function(t, i) {
        var r = 0,
            s = t.points;
        if(0 !== s.length) {
            if(t.lineWidth % 2)
                for(r = 0; r < s.length; r++) s[r] += .5;
            var n = new e.Point(s[0], s[1]),
                o = new e.Point(s[s.length - 2], s[s.length - 1]);
            if(n.x === o.x && n.y === o.y) {
                s = s.slice(), s.pop(), s.pop(), o = new e.Point(s[s.length - 2], s[s.length - 1]);
                var a = o.x + .5 * (n.x - o.x),
                    h = o.y + .5 * (n.y - o.y);
                s.unshift(a, h), s.push(a, h)
            }
            var l, u, c, d, p, f, g, m, v, x, y, b, T, w, S, E, C, A, _, R, M, L, F, B = i.points,
                P = i.indices,
                D = s.length / 2,
                I = s.length,
                O = B.length / 6,
                G = t.lineWidth / 2,
                U = e.hex2rgb(t.lineColor),
                k = t.lineAlpha,
                W = U[0] * k,
                N = U[1] * k,
                j = U[2] * k;
            for(c = s[0], d = s[1], p = s[2], f = s[3], v = -(d - f), x = c - p, F = Math.sqrt(v * v + x * x), v /= F, x /= F, v *= G, x *= G, B.push(c - v, d - x, W, N, j, k), B.push(c + v, d + x, W, N, j, k), r = 1; D - 1 > r; r++) c = s[2 * (r - 1)], d = s[2 * (r - 1) + 1], p = s[2 * r], f = s[2 * r + 1], g = s[2 * (r + 1)], m = s[2 * (r + 1) + 1], v = -(d - f), x = c - p, F = Math.sqrt(v * v + x * x), v /= F, x /= F, v *= G, x *= G, y = -(f - m), b = p - g, F = Math.sqrt(y * y + b * b), y /= F, b /= F, y *= G, b *= G, S = -x + d - (-x + f), E = -v + p - (-v + c), C = (-v + c) * (-x + f) - (-v + p) * (-x + d), A = -b + m - (-b + f), _ = -y + p - (-y + g), R = (-y + g) * (-b + f) - (-y + p) * (-b + m), M = S * _ - A * E, Math.abs(M) < .1 ? (M += 10.1, B.push(p - v, f - x, W, N, j, k), B.push(p + v, f + x, W, N, j, k)) : (l = (E * R - _ * C) / M, u = (A * C - S * R) / M, L = (l - p) * (l - p) + (u - f) + (u - f), L > 19600 ? (T = v - y, w = x - b, F = Math.sqrt(T * T + w * w), T /= F, w /= F, T *= G, w *= G, B.push(p - T, f - w), B.push(W, N, j, k), B.push(p + T, f + w), B.push(W, N, j, k), B.push(p - T, f - w), B.push(W, N, j, k), I++) : (B.push(l, u), B.push(W, N, j, k), B.push(p - (l - p), f - (u - f)), B.push(W, N, j, k)));
            for(c = s[2 * (D - 2)], d = s[2 * (D - 2) + 1], p = s[2 * (D - 1)], f = s[2 * (D - 1) + 1], v = -(d - f), x = c - p, F = Math.sqrt(v * v + x * x), v /= F, x /= F, v *= G, x *= G, B.push(p - v, f - x), B.push(W, N, j, k), B.push(p + v, f + x), B.push(W, N, j, k), P.push(O), r = 0; I > r; r++) P.push(O++);
            P.push(O - 1)
        }
    }, e.WebGLGraphics.buildComplexPoly = function(t, i) {
        var r = t.points.slice();
        if(!(r.length < 6)) {
            var s = i.indices;
            i.points = r, i.alpha = t.fillAlpha, i.color = e.hex2rgb(t.fillColor);
            for(var n, o, a = 1 / 0, h = -1 / 0, l = 1 / 0, u = -1 / 0, c = 0; c < r.length; c += 2) n = r[c], o = r[c + 1], a = a > n ? n : a, h = n > h ? n : h, l = l > o ? o : l, u = o > u ? o : u;
            r.push(a, l, h, l, h, u, a, u);
            var d = r.length / 2;
            for(c = 0; d > c; c++) s.push(c)
        }
    }, e.WebGLGraphics.buildPoly = function(t, i) {
        var r = t.points;
        if(!(r.length < 6)) {
            var s = i.points,
                n = i.indices,
                o = r.length / 2,
                a = e.hex2rgb(t.fillColor),
                h = t.fillAlpha,
                l = a[0] * h,
                u = a[1] * h,
                c = a[2] * h,
                d = e.PolyK.Triangulate(r),
                p = s.length / 6,
                f = 0;
            for(f = 0; f < d.length; f += 3) n.push(d[f] + p), n.push(d[f] + p), n.push(d[f + 1] + p), n.push(d[f + 2] + p), n.push(d[f + 2] + p);
            for(f = 0; o > f; f++) s.push(r[2 * f], r[2 * f + 1], l, u, c, h)
        }
    }, e.WebGLGraphics.graphicsDataPool = [], e.WebGLGraphicsData = function(t) {
        this.gl = t, this.color = [0, 0, 0], this.points = [], this.indices = [], this.lastIndex = 0, this.buffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), this.mode = 1, this.alpha = 1, this.dirty = !0
    }, e.WebGLGraphicsData.prototype.reset = function() {
        this.points = [], this.indices = [], this.lastIndex = 0
    }, e.WebGLGraphicsData.prototype.upload = function() {
        var t = this.gl;
        this.glPoints = new Float32Array(this.points), t.bindBuffer(t.ARRAY_BUFFER, this.buffer), t.bufferData(t.ARRAY_BUFFER, this.glPoints, t.STATIC_DRAW), this.glIndicies = new Uint16Array(this.indices), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.glIndicies, t.STATIC_DRAW), this.dirty = !1
    }, e.glContexts = [], e.WebGLRenderer = function(t, i, r, s, n, o) {
        e.defaultRenderer || (e.sayHello("webGL"), e.defaultRenderer = this), this.type = e.WEBGL_RENDERER, this.transparent = !!s, this.preserveDrawingBuffer = o, this.width = t || 800, this.height = i || 600, this.view = r || document.createElement("canvas"), this.view.width = this.width, this.view.height = this.height, this.contextLost = this.handleContextLost.bind(this), this.contextRestoredLost = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.contextLost, !1), this.view.addEventListener("webglcontextrestored", this.contextRestoredLost, !1), this.options = {
            alpha: this.transparent,
            antialias: !!n,
            premultipliedAlpha: !!s,
            stencil: !0,
            preserveDrawingBuffer: o
        };
        var a = null;
        if(["experimental-webgl", "webgl"].forEach(function(t) {
                try {
                    a = a || this.view.getContext(t, this.options)
                } catch(e) {}
            }, this), !a) throw new Error("This browser does not support webGL. Try using the canvas renderer" + this);
        this.gl = a, this.glContextId = a.id = e.WebGLRenderer.glContextId++, e.glContexts[this.glContextId] = a, e.blendModesWebGL || (e.blendModesWebGL = [], e.blendModesWebGL[e.blendModes.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.ADD] = [a.SRC_ALPHA, a.DST_ALPHA], e.blendModesWebGL[e.blendModes.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.SCREEN] = [a.SRC_ALPHA, a.ONE], e.blendModesWebGL[e.blendModes.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e.blendModesWebGL[e.blendModes.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA]), this.projection = new e.Point, this.projection.x = this.width / 2, this.projection.y = -this.height / 2, this.offset = new e.Point(0, 0), this.resize(this.width, this.height), this.contextLost = !1, this.shaderManager = new e.WebGLShaderManager(a), this.spriteBatch = new e.WebGLSpriteBatch(a), this.maskManager = new e.WebGLMaskManager(a), this.filterManager = new e.WebGLFilterManager(a, this.transparent), this.stencilManager = new e.WebGLStencilManager(a), this.blendModeManager = new e.WebGLBlendModeManager(a), this.renderSession = {}, this.renderSession.gl = this.gl, this.renderSession.drawCount = 0, this.renderSession.shaderManager = this.shaderManager, this.renderSession.maskManager = this.maskManager, this.renderSession.filterManager = this.filterManager, this.renderSession.blendModeManager = this.blendModeManager, this.renderSession.spriteBatch = this.spriteBatch, this.renderSession.stencilManager = this.stencilManager, this.renderSession.renderer = this, a.useProgram(this.shaderManager.defaultShader.program), a.disable(a.DEPTH_TEST), a.disable(a.CULL_FACE), a.enable(a.BLEND), a.colorMask(!0, !0, !0, this.transparent)
    }, e.WebGLRenderer.prototype.constructor = e.WebGLRenderer, e.WebGLRenderer.prototype.render = function(t) {
        if(!this.contextLost) {
            this.__stage !== t && (t.interactive && t.interactionManager.removeEvents(), this.__stage = t), e.WebGLRenderer.updateTextures(), t.updateTransform(), t._interactive && (t._interactiveEventsAdded || (t._interactiveEventsAdded = !0, t.interactionManager.setTarget(this)));
            var i = this.gl;
            i.viewport(0, 0, this.width, this.height), i.bindFramebuffer(i.FRAMEBUFFER, null), this.transparent ? i.clearColor(0, 0, 0, 0) : i.clearColor(t.backgroundColorSplit[0], t.backgroundColorSplit[1], t.backgroundColorSplit[2], 1), i.clear(i.COLOR_BUFFER_BIT), this.renderDisplayObject(t, this.projection), t.interactive ? t._interactiveEventsAdded || (t._interactiveEventsAdded = !0, t.interactionManager.setTarget(this)) : t._interactiveEventsAdded && (t._interactiveEventsAdded = !1, t.interactionManager.setTarget(this))
        }
    }, e.WebGLRenderer.prototype.renderDisplayObject = function(t, i, r) {
        this.renderSession.blendModeManager.setBlendMode(e.blendModes.NORMAL), this.renderSession.drawCount = 0, this.renderSession.currentBlendMode = 9999, this.renderSession.projection = i, this.renderSession.offset = this.offset, this.spriteBatch.begin(this.renderSession), this.filterManager.begin(this.renderSession, r), t._renderWebGL(this.renderSession), this.spriteBatch.end()
    }, e.WebGLRenderer.updateTextures = function() {
        var t = 0;
        for(t = 0; t < e.Texture.frameUpdates.length; t++) e.WebGLRenderer.updateTextureFrame(e.Texture.frameUpdates[t]);
        for(t = 0; t < e.texturesToDestroy.length; t++) e.WebGLRenderer.destroyTexture(e.texturesToDestroy[t]);
        e.texturesToUpdate.length = 0, e.texturesToDestroy.length = 0, e.Texture.frameUpdates.length = 0
    }, e.WebGLRenderer.destroyTexture = function(t) {
        for(var i = t._glTextures.length - 1; i >= 0; i--) {
            var r = t._glTextures[i],
                s = e.glContexts[i];
            s && r && s.deleteTexture(r)
        }
        t._glTextures.length = 0
    }, e.WebGLRenderer.updateTextureFrame = function(t) {
        t._updateWebGLuvs()
    }, e.WebGLRenderer.prototype.resize = function(t, e) {
        this.width = t, this.height = e, this.view.width = t, this.view.height = e, this.gl.viewport(0, 0, this.width, this.height), this.projection.x = this.width / 2, this.projection.y = -this.height / 2
    }, e.createWebGLTexture = function(t, i) {
        return t.hasLoaded && (t._glTextures[i.id] = i.createTexture(), i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t.source), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), t._powerOf2 ? (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.REPEAT)) : (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE)), i.bindTexture(i.TEXTURE_2D, null), t._dirty[i.id] = !1), t._glTextures[i.id]
    }, e.updateWebGLTexture = function(t, i) {
        t._glTextures[i.id] && (i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t.source), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST), t._powerOf2 ? (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.REPEAT)) : (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE)), t._dirty[i.id] = !1)
    }, e.WebGLRenderer.prototype.handleContextLost = function(t) {
        t.preventDefault(), this.contextLost = !0
    }, e.WebGLRenderer.prototype.handleContextRestored = function() {
        try {
            this.gl = this.view.getContext("experimental-webgl", this.options)
        } catch(t) {
            try {
                this.gl = this.view.getContext("webgl", this.options)
            } catch(i) {
                throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this)
            }
        }
        var r = this.gl;
        r.id = e.WebGLRenderer.glContextId++, this.shaderManager.setContext(r), this.spriteBatch.setContext(r), this.primitiveBatch.setContext(r), this.maskManager.setContext(r), this.filterManager.setContext(r), this.renderSession.gl = this.gl, r.disable(r.DEPTH_TEST), r.disable(r.CULL_FACE), r.enable(r.BLEND), r.colorMask(!0, !0, !0, this.transparent), this.gl.viewport(0, 0, this.width, this.height);
        for(var s in e.TextureCache) {
            var n = e.TextureCache[s].baseTexture;
            n._glTextures = []
        }
        this.contextLost = !1
    }, e.WebGLRenderer.prototype.destroy = function() {
        this.view.removeEventListener("webglcontextlost", this.contextLost), this.view.removeEventListener("webglcontextrestored", this.contextRestoredLost), e.glContexts[this.glContextId] = null, this.projection = null, this.offset = null, this.shaderManager.destroy(), this.spriteBatch.destroy(), this.primitiveBatch.destroy(), this.maskManager.destroy(), this.filterManager.destroy(), this.shaderManager = null, this.spriteBatch = null, this.maskManager = null, this.filterManager = null, this.gl = null, this.renderSession = null
    }, e.WebGLRenderer.glContextId = 0, e.WebGLBlendModeManager = function(t) {
        this.gl = t, this.currentBlendMode = 99999
    }, e.WebGLBlendModeManager.prototype.setBlendMode = function(t) {
        if(this.currentBlendMode === t) return !1;
        this.currentBlendMode = t;
        var i = e.blendModesWebGL[this.currentBlendMode];
        return this.gl.blendFunc(i[0], i[1]), !0
    }, e.WebGLBlendModeManager.prototype.destroy = function() {
        this.gl = null
    }, e.WebGLMaskManager = function(t) {
        this.maskStack = [], this.maskPosition = 0, this.setContext(t), this.reverse = !1, this.count = 0
    }, e.WebGLMaskManager.prototype.setContext = function(t) {
        this.gl = t
    }, e.WebGLMaskManager.prototype.pushMask = function(t, i) {
        var r = i.gl;
        t.dirty && e.WebGLGraphics.updateGraphics(t, r), t._webGL[r.id].data.length && i.stencilManager.pushStencil(t, t._webGL[r.id].data[0], i)
    }, e.WebGLMaskManager.prototype.popMask = function(t, e) {
        var i = this.gl;
        e.stencilManager.popStencil(t, t._webGL[i.id].data[0], e)
    }, e.WebGLMaskManager.prototype.destroy = function() {
        this.maskStack = null, this.gl = null
    }, e.WebGLStencilManager = function(t) {
        this.stencilStack = [], this.setContext(t), this.reverse = !0, this.count = 0
    }, e.WebGLStencilManager.prototype.setContext = function(t) {
        this.gl = t
    }, e.WebGLStencilManager.prototype.pushStencil = function(t, e, i) {
        var r = this.gl;
        this.bindGraphics(t, e, i), 0 === this.stencilStack.length && (r.enable(r.STENCIL_TEST), r.clear(r.STENCIL_BUFFER_BIT), this.reverse = !0, this.count = 0), this.stencilStack.push(e);
        var s = this.count;
        r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.ALWAYS, 0, 255), r.stencilOp(r.KEEP, r.KEEP, r.INVERT), 1 === e.mode ? (r.drawElements(r.TRIANGLE_FAN, e.indices.length - 4, r.UNSIGNED_SHORT, 0), this.reverse ? (r.stencilFunc(r.EQUAL, 255 - s, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)) : (r.stencilFunc(r.EQUAL, s, 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)), r.drawElements(r.TRIANGLE_FAN, 4, r.UNSIGNED_SHORT, 2 * (e.indices.length - 4)), this.reverse ? r.stencilFunc(r.EQUAL, 255 - (s + 1), 255) : r.stencilFunc(r.EQUAL, s + 1, 255), this.reverse = !this.reverse) : (this.reverse ? (r.stencilFunc(r.EQUAL, s, 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)) : (r.stencilFunc(r.EQUAL, 255 - s, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)), r.drawElements(r.TRIANGLE_STRIP, e.indices.length, r.UNSIGNED_SHORT, 0), this.reverse ? r.stencilFunc(r.EQUAL, s + 1, 255) : r.stencilFunc(r.EQUAL, 255 - (s + 1), 255)), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), this.count++
    }, e.WebGLStencilManager.prototype.bindGraphics = function(t, i, r) {
        this._currentGraphics = t;
        var s, n = this.gl,
            o = r.projection,
            a = r.offset;
        1 === i.mode ? (s = r.shaderManager.complexPrimativeShader, r.shaderManager.setShader(s), n.uniformMatrix3fv(s.translationMatrix, !1, t.worldTransform.toArray(!0)), n.uniform2f(s.projectionVector, o.x, -o.y), n.uniform2f(s.offsetVector, -a.x, -a.y), n.uniform3fv(s.tintColor, e.hex2rgb(t.tint)), n.uniform3fv(s.color, i.color), n.uniform1f(s.alpha, t.worldAlpha * i.alpha), n.bindBuffer(n.ARRAY_BUFFER, i.buffer), n.vertexAttribPointer(s.aVertexPosition, 2, n.FLOAT, !1, 8, 0), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, i.indexBuffer)) : (s = r.shaderManager.primitiveShader, r.shaderManager.setShader(s), n.uniformMatrix3fv(s.translationMatrix, !1, t.worldTransform.toArray(!0)), n.uniform2f(s.projectionVector, o.x, -o.y), n.uniform2f(s.offsetVector, -a.x, -a.y), n.uniform3fv(s.tintColor, e.hex2rgb(t.tint)), n.uniform1f(s.alpha, t.worldAlpha), n.bindBuffer(n.ARRAY_BUFFER, i.buffer), n.vertexAttribPointer(s.aVertexPosition, 2, n.FLOAT, !1, 24, 0), n.vertexAttribPointer(s.colorAttribute, 4, n.FLOAT, !1, 24, 8), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, i.indexBuffer))
    }, e.WebGLStencilManager.prototype.popStencil = function(t, e, i) {
        var r = this.gl;
        if(this.stencilStack.pop(), this.count--, 0 === this.stencilStack.length) r.disable(r.STENCIL_TEST);
        else {
            var s = this.count;
            this.bindGraphics(t, e, i), r.colorMask(!1, !1, !1, !1), 1 === e.mode ? (this.reverse = !this.reverse, this.reverse ? (r.stencilFunc(r.EQUAL, 255 - (s + 1), 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)) : (r.stencilFunc(r.EQUAL, s + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)), r.drawElements(r.TRIANGLE_FAN, 4, r.UNSIGNED_SHORT, 2 * (e.indices.length - 4)), r.stencilFunc(r.ALWAYS, 0, 255), r.stencilOp(r.KEEP, r.KEEP, r.INVERT), r.drawElements(r.TRIANGLE_FAN, e.indices.length - 4, r.UNSIGNED_SHORT, 0), this.reverse ? r.stencilFunc(r.EQUAL, s, 255) : r.stencilFunc(r.EQUAL, 255 - s, 255)) : (this.reverse ? (r.stencilFunc(r.EQUAL, s + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)) : (r.stencilFunc(r.EQUAL, 255 - (s + 1), 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)), r.drawElements(r.TRIANGLE_STRIP, e.indices.length, r.UNSIGNED_SHORT, 0), this.reverse ? r.stencilFunc(r.EQUAL, s, 255) : r.stencilFunc(r.EQUAL, 255 - s, 255)), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
        }
    }, e.WebGLStencilManager.prototype.destroy = function() {
        this.maskStack = null, this.gl = null
    }, e.WebGLShaderManager = function(t) {
        this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [], this.shaderMap = [];
        for(var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
        this.setContext(t)
    }, e.WebGLShaderManager.prototype.setContext = function(t) {
        this.gl = t, this.primitiveShader = new e.PrimitiveShader(t), this.complexPrimativeShader = new e.ComplexPrimitiveShader(t), this.defaultShader = new e.PixiShader(t), this.fastShader = new e.PixiFastShader(t), this.stripShader = new e.StripShader(t), this.setShader(this.defaultShader)
    }, e.WebGLShaderManager.prototype.setAttribs = function(t) {
        var e;
        for(e = 0; e < this.tempAttribState.length; e++) this.tempAttribState[e] = !1;
        for(e = 0; e < t.length; e++) {
            var i = t[e];
            this.tempAttribState[i] = !0
        }
        var r = this.gl;
        for(e = 0; e < this.attribState.length; e++) this.attribState[e] !== this.tempAttribState[e] && (this.attribState[e] = this.tempAttribState[e], this.tempAttribState[e] ? r.enableVertexAttribArray(e) : r.disableVertexAttribArray(e))
    }, e.WebGLShaderManager.prototype.setShader = function(t) {
        return this._currentId === t._UID ? !1 : (this._currentId = t._UID, this.currentShader = t, this.gl.useProgram(t.program), this.setAttribs(t.attributes), !0)
    }, e.WebGLShaderManager.prototype.destroy = function() {
        this.attribState = null, this.tempAttribState = null, this.primitiveShader.destroy(), this.defaultShader.destroy(), this.fastShader.destroy(), this.stripShader.destroy(), this.gl = null
    }, e.WebGLSpriteBatch = function(t) {
        this.vertSize = 6, this.size = 2e3;
        var e = 4 * this.size * this.vertSize,
            i = 6 * this.size;
        this.vertices = new Float32Array(e), this.indices = new Uint16Array(i), this.lastIndexCount = 0;
        for(var r = 0, s = 0; i > r; r += 6, s += 4) this.indices[r + 0] = s + 0, this.indices[r + 1] = s + 1, this.indices[r + 2] = s + 2, this.indices[r + 3] = s + 0, this.indices[r + 4] = s + 2, this.indices[r + 5] = s + 3;
        this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.setContext(t), this.dirty = !0, this.textures = [], this.blendModes = []
    }, e.WebGLSpriteBatch.prototype.setContext = function(t) {
        this.gl = t, this.vertexBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW), this.currentBlendMode = 99999
    }, e.WebGLSpriteBatch.prototype.begin = function(t) {
        this.renderSession = t, this.shader = this.renderSession.shaderManager.defaultShader, this.start()
    }, e.WebGLSpriteBatch.prototype.end = function() {
        this.flush()
    }, e.WebGLSpriteBatch.prototype.render = function(t) {
        var e = t.texture;
        this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = e.baseTexture);
        var i = e._uvs;
        if(i) {
            var r, s, n, o, a = t.worldAlpha,
                h = t.tint,
                l = this.vertices,
                u = t.anchor.x,
                c = t.anchor.y;
            if(e.trim) {
                var d = e.trim;
                s = d.x - u * d.width, r = s + e.crop.width, o = d.y - c * d.height, n = o + e.crop.height
            } else r = e.frame.width * (1 - u), s = e.frame.width * -u, n = e.frame.height * (1 - c), o = e.frame.height * -c;
            var p = 4 * this.currentBatchSize * this.vertSize,
                f = t.worldTransform,
                g = f.a,
                m = f.c,
                v = f.b,
                x = f.d,
                y = f.tx,
                b = f.ty;
            l[p++] = g * s + v * o + y, l[p++] = x * o + m * s + b, l[p++] = i.x0, l[p++] = i.y0, l[p++] = a, l[p++] = h, l[p++] = g * r + v * o + y, l[p++] = x * o + m * r + b, l[p++] = i.x1, l[p++] = i.y1, l[p++] = a, l[p++] = h, l[p++] = g * r + v * n + y, l[p++] = x * n + m * r + b, l[p++] = i.x2, l[p++] = i.y2, l[p++] = a, l[p++] = h, l[p++] = g * s + v * n + y, l[p++] = x * n + m * s + b, l[p++] = i.x3, l[p++] = i.y3, l[p++] = a, l[p++] = h, this.textures[this.currentBatchSize] = t.texture.baseTexture, this.blendModes[this.currentBatchSize] = t.blendMode, this.currentBatchSize++
        }
    }, e.WebGLSpriteBatch.prototype.renderTilingSprite = function(t) {
        var i = t.tilingTexture;
        this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = i.baseTexture), t._uvs || (t._uvs = new e.TextureUvs);
        var r = t._uvs;
        t.tilePosition.x %= i.baseTexture.width * t.tileScaleOffset.x, t.tilePosition.y %= i.baseTexture.height * t.tileScaleOffset.y;
        var s = t.tilePosition.x / (i.baseTexture.width * t.tileScaleOffset.x),
            n = t.tilePosition.y / (i.baseTexture.height * t.tileScaleOffset.y),
            o = t.width / i.baseTexture.width / (t.tileScale.x * t.tileScaleOffset.x),
            a = t.height / i.baseTexture.height / (t.tileScale.y * t.tileScaleOffset.y);
        r.x0 = 0 - s, r.y0 = 0 - n, r.x1 = 1 * o - s, r.y1 = 0 - n, r.x2 = 1 * o - s, r.y2 = 1 * a - n, r.x3 = 0 - s, r.y3 = 1 * a - n;
        var h = t.worldAlpha,
            l = t.tint,
            u = this.vertices,
            c = t.width,
            d = t.height,
            p = t.anchor.x,
            f = t.anchor.y,
            g = c * (1 - p),
            m = c * -p,
            v = d * (1 - f),
            x = d * -f,
            y = 4 * this.currentBatchSize * this.vertSize,
            b = t.worldTransform,
            T = b.a,
            w = b.c,
            S = b.b,
            E = b.d,
            C = b.tx,
            A = b.ty;
        u[y++] = T * m + S * x + C, u[y++] = E * x + w * m + A, u[y++] = r.x0, u[y++] = r.y0, u[y++] = h, u[y++] = l, u[y++] = T * g + S * x + C, u[y++] = E * x + w * g + A, u[y++] = r.x1, u[y++] = r.y1, u[y++] = h, u[y++] = l, u[y++] = T * g + S * v + C, u[y++] = E * v + w * g + A, u[y++] = r.x2, u[y++] = r.y2, u[y++] = h, u[y++] = l, u[y++] = T * m + S * v + C, u[y++] = E * v + w * m + A, u[y++] = r.x3, u[y++] = r.y3, u[y++] = h, u[y++] = l, this.textures[this.currentBatchSize] = i.baseTexture, this.blendModes[this.currentBatchSize] = t.blendMode, this.currentBatchSize++
    }, e.WebGLSpriteBatch.prototype.flush = function() {
        if(0 !== this.currentBatchSize) {
            var t = this.gl;
            if(this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader), this.dirty) {
                this.dirty = !1, t.activeTexture(t.TEXTURE0), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var e = this.renderSession.projection;
                t.uniform2f(this.shader.projectionVector, e.x, e.y);
                var i = 4 * this.vertSize;
                t.vertexAttribPointer(this.shader.aVertexPosition, 2, t.FLOAT, !1, i, 0), t.vertexAttribPointer(this.shader.aTextureCoord, 2, t.FLOAT, !1, i, 8), t.vertexAttribPointer(this.shader.colorAttribute, 2, t.FLOAT, !1, i, 16)
            }
            if(this.currentBatchSize > .5 * this.size) t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices);
            else {
                var r = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                t.bufferSubData(t.ARRAY_BUFFER, 0, r)
            }
            for(var s, n, o = 0, a = 0, h = null, l = this.renderSession.blendModeManager.currentBlendMode, u = 0, c = this.currentBatchSize; c > u; u++) s = this.textures[u], n = this.blendModes[u], (h !== s || l !== n) && (this.renderBatch(h, o, a), a = u, o = 0, h = s, l = n, this.renderSession.blendModeManager.setBlendMode(l)), o++;
            this.renderBatch(h, o, a), this.currentBatchSize = 0
        }
    }, e.WebGLSpriteBatch.prototype.renderBatch = function(t, i, r) {
        if(0 !== i) {
            var s = this.gl;
            s.bindTexture(s.TEXTURE_2D, t._glTextures[s.id] || e.createWebGLTexture(t, s)), t._dirty[s.id] && e.updateWebGLTexture(this.currentBaseTexture, s), s.drawElements(s.TRIANGLES, 6 * i, s.UNSIGNED_SHORT, 6 * r * 2), this.renderSession.drawCount++
        }
    }, e.WebGLSpriteBatch.prototype.stop = function() {
        this.flush()
    }, e.WebGLSpriteBatch.prototype.start = function() {
        this.dirty = !0
    }, e.WebGLSpriteBatch.prototype.destroy = function() {
        this.vertices = null, this.indices = null, this.gl.deleteBuffer(this.vertexBuffer), this.gl.deleteBuffer(this.indexBuffer), this.currentBaseTexture = null, this.gl = null
    }, e.WebGLFastSpriteBatch = function(t) {
        this.vertSize = 10, this.maxSize = 6e3, this.size = this.maxSize;
        var e = 4 * this.size * this.vertSize,
            i = 6 * this.maxSize;
        this.vertices = new Float32Array(e), this.indices = new Uint16Array(i), this.vertexBuffer = null, this.indexBuffer = null, this.lastIndexCount = 0;
        for(var r = 0, s = 0; i > r; r += 6, s += 4) this.indices[r + 0] = s + 0, this.indices[r + 1] = s + 1, this.indices[r + 2] = s + 2, this.indices[r + 3] = s + 0, this.indices[r + 4] = s + 2, this.indices[r + 5] = s + 3;
        this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.currentBlendMode = 0, this.renderSession = null, this.shader = null, this.matrix = null, this.setContext(t)
    }, e.WebGLFastSpriteBatch.prototype.setContext = function(t) {
        this.gl = t, this.vertexBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW)
    }, e.WebGLFastSpriteBatch.prototype.begin = function(t, e) {
        this.renderSession = e, this.shader = this.renderSession.shaderManager.fastShader, this.matrix = t.worldTransform.toArray(!0), this.start()
    }, e.WebGLFastSpriteBatch.prototype.end = function() {
        this.flush()
    }, e.WebGLFastSpriteBatch.prototype.render = function(t) {
        var e = t.children,
            i = e[0];
        if(i.texture._uvs) {
            this.currentBaseTexture = i.texture.baseTexture, i.blendMode !== this.renderSession.blendModeManager.currentBlendMode && (this.flush(), this.renderSession.blendModeManager.setBlendMode(i.blendMode));
            for(var r = 0, s = e.length; s > r; r++) this.renderSprite(e[r]);
            this.flush()
        }
    }, e.WebGLFastSpriteBatch.prototype.renderSprite = function(t) {
        if(t.visible && (t.texture.baseTexture === this.currentBaseTexture || (this.flush(), this.currentBaseTexture = t.texture.baseTexture, t.texture._uvs))) {
            var e, i, r, s, n, o, a, h, l = this.vertices;
            if(e = t.texture._uvs, i = t.texture.frame.width, r = t.texture.frame.height, t.texture.trim) {
                var u = t.texture.trim;
                n = u.x - t.anchor.x * u.width, s = n + t.texture.crop.width, a = u.y - t.anchor.y * u.height, o = a + t.texture.crop.height
            } else s = t.texture.frame.width * (1 - t.anchor.x), n = t.texture.frame.width * -t.anchor.x, o = t.texture.frame.height * (1 - t.anchor.y), a = t.texture.frame.height * -t.anchor.y;
            h = 4 * this.currentBatchSize * this.vertSize, l[h++] = n, l[h++] = a, l[h++] = t.position.x, l[h++] = t.position.y, l[h++] = t.scale.x, l[h++] = t.scale.y, l[h++] = t.rotation, l[h++] = e.x0, l[h++] = e.y1, l[h++] = t.alpha, l[h++] = s, l[h++] = a, l[h++] = t.position.x, l[h++] = t.position.y, l[h++] = t.scale.x, l[h++] = t.scale.y, l[h++] = t.rotation, l[h++] = e.x1, l[h++] = e.y1, l[h++] = t.alpha, l[h++] = s, l[h++] = o, l[h++] = t.position.x, l[h++] = t.position.y, l[h++] = t.scale.x, l[h++] = t.scale.y, l[h++] = t.rotation, l[h++] = e.x2, l[h++] = e.y2, l[h++] = t.alpha, l[h++] = n, l[h++] = o, l[h++] = t.position.x, l[h++] = t.position.y, l[h++] = t.scale.x, l[h++] = t.scale.y, l[h++] = t.rotation, l[h++] = e.x3, l[h++] = e.y3, l[h++] = t.alpha, this.currentBatchSize++, this.currentBatchSize >= this.size && this.flush()
        }
    }, e.WebGLFastSpriteBatch.prototype.flush = function() {
        if(0 !== this.currentBatchSize) {
            var t = this.gl;
            if(this.currentBaseTexture._glTextures[t.id] || e.createWebGLTexture(this.currentBaseTexture, t), t.bindTexture(t.TEXTURE_2D, this.currentBaseTexture._glTextures[t.id]), this.currentBatchSize > .5 * this.size) t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices);
            else {
                var i = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                t.bufferSubData(t.ARRAY_BUFFER, 0, i)
            }
            t.drawElements(t.TRIANGLES, 6 * this.currentBatchSize, t.UNSIGNED_SHORT, 0), this.currentBatchSize = 0, this.renderSession.drawCount++
        }
    }, e.WebGLFastSpriteBatch.prototype.stop = function() {
        this.flush()
    }, e.WebGLFastSpriteBatch.prototype.start = function() {
        var t = this.gl;
        t.activeTexture(t.TEXTURE0), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var e = this.renderSession.projection;
        t.uniform2f(this.shader.projectionVector, e.x, e.y), t.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
        var i = 4 * this.vertSize;
        t.vertexAttribPointer(this.shader.aVertexPosition, 2, t.FLOAT, !1, i, 0), t.vertexAttribPointer(this.shader.aPositionCoord, 2, t.FLOAT, !1, i, 8), t.vertexAttribPointer(this.shader.aScale, 2, t.FLOAT, !1, i, 16), t.vertexAttribPointer(this.shader.aRotation, 1, t.FLOAT, !1, i, 24), t.vertexAttribPointer(this.shader.aTextureCoord, 2, t.FLOAT, !1, i, 28), t.vertexAttribPointer(this.shader.colorAttribute, 1, t.FLOAT, !1, i, 36)
    }, e.WebGLFilterManager = function(t, e) {
        this.transparent = e, this.filterStack = [], this.offsetX = 0, this.offsetY = 0, this.setContext(t)
    }, e.WebGLFilterManager.prototype.setContext = function(t) {
        this.gl = t, this.texturePool = [], this.initShaderBuffers()
    }, e.WebGLFilterManager.prototype.begin = function(t, e) {
        this.renderSession = t, this.defaultShader = t.shaderManager.defaultShader;
        var i = this.renderSession.projection;
        this.width = 2 * i.x, this.height = 2 * -i.y, this.buffer = e
    }, e.WebGLFilterManager.prototype.pushFilter = function(t) {
        var i = this.gl,
            r = this.renderSession.projection,
            s = this.renderSession.offset;
        t._filterArea = t.target.filterArea || t.target.getBounds(), this.filterStack.push(t);
        var n = t.filterPasses[0];
        this.offsetX += t._filterArea.x, this.offsetY += t._filterArea.y;
        var o = this.texturePool.pop();
        o ? o.resize(this.width, this.height) : o = new e.FilterTexture(this.gl, this.width, this.height), i.bindTexture(i.TEXTURE_2D, o.texture);
        var a = t._filterArea,
            h = n.padding;
        a.x -= h, a.y -= h, a.width += 2 * h, a.height += 2 * h, a.x < 0 && (a.x = 0), a.width > this.width && (a.width = this.width), a.y < 0 && (a.y = 0), a.height > this.height && (a.height = this.height), i.bindFramebuffer(i.FRAMEBUFFER, o.frameBuffer), i.viewport(0, 0, a.width, a.height), r.x = a.width / 2, r.y = -a.height / 2, s.x = -a.x, s.y = -a.y, this.renderSession.shaderManager.setShader(this.defaultShader), i.uniform2f(this.defaultShader.projectionVector, a.width / 2, -a.height / 2), i.uniform2f(this.defaultShader.offsetVector, -a.x, -a.y), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), t._glFilterTexture = o
    }, e.WebGLFilterManager.prototype.popFilter = function() {
        var t = this.gl,
            i = this.filterStack.pop(),
            r = i._filterArea,
            s = i._glFilterTexture,
            n = this.renderSession.projection,
            o = this.renderSession.offset;
        if(i.filterPasses.length > 1) {
            t.viewport(0, 0, r.width, r.height), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = 0, this.vertexArray[1] = r.height, this.vertexArray[2] = r.width, this.vertexArray[3] = r.height, this.vertexArray[4] = 0, this.vertexArray[5] = 0, this.vertexArray[6] = r.width, this.vertexArray[7] = 0, t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = r.width / this.width, this.uvArray[5] = r.height / this.height, this.uvArray[6] = r.width / this.width, this.uvArray[7] = r.height / this.height, t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray);
            var a = s,
                h = this.texturePool.pop();
            h || (h = new e.FilterTexture(this.gl, this.width, this.height)), h.resize(this.width, this.height), t.bindFramebuffer(t.FRAMEBUFFER, h.frameBuffer), t.clear(t.COLOR_BUFFER_BIT), t.disable(t.BLEND);
            for(var l = 0; l < i.filterPasses.length - 1; l++) {
                var u = i.filterPasses[l];
                t.bindFramebuffer(t.FRAMEBUFFER, h.frameBuffer), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, a.texture), this.applyFilterPass(u, r, r.width, r.height);
                var c = a;
                a = h, h = c
            }
            t.enable(t.BLEND), s = a, this.texturePool.push(h)
        }
        var d = i.filterPasses[i.filterPasses.length - 1];
        this.offsetX -= r.x, this.offsetY -= r.y;
        var p = this.width,
            f = this.height,
            g = 0,
            m = 0,
            v = this.buffer;
        if(0 === this.filterStack.length) t.colorMask(!0, !0, !0, !0);
        else {
            var x = this.filterStack[this.filterStack.length - 1];
            r = x._filterArea, p = r.width, f = r.height, g = r.x, m = r.y, v = x._glFilterTexture.frameBuffer
        }
        n.x = p / 2, n.y = -f / 2, o.x = g, o.y = m, r = i._filterArea;
        var y = r.x - g,
            b = r.y - m;
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = y, this.vertexArray[1] = b + r.height, this.vertexArray[2] = y + r.width, this.vertexArray[3] = b + r.height, this.vertexArray[4] = y, this.vertexArray[5] = b, this.vertexArray[6] = y + r.width, this.vertexArray[7] = b, t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = r.width / this.width, this.uvArray[5] = r.height / this.height, this.uvArray[6] = r.width / this.width, this.uvArray[7] = r.height / this.height, t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray), t.viewport(0, 0, p, f), t.bindFramebuffer(t.FRAMEBUFFER, v), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, s.texture), this.applyFilterPass(d, r, p, f), this.renderSession.shaderManager.setShader(this.defaultShader), t.uniform2f(this.defaultShader.projectionVector, p / 2, -f / 2), t.uniform2f(this.defaultShader.offsetVector, -g, -m), this.texturePool.push(s), i._glFilterTexture = null
    }, e.WebGLFilterManager.prototype.applyFilterPass = function(t, i, r, s) {
        var n = this.gl,
            o = t.shaders[n.id];
        o || (o = new e.PixiShader(n), o.fragmentSrc = t.fragmentSrc, o.uniforms = t.uniforms, o.init(), t.shaders[n.id] = o), this.renderSession.shaderManager.setShader(o), n.uniform2f(o.projectionVector, r / 2, -s / 2), n.uniform2f(o.offsetVector, 0, 0), t.uniforms.dimensions && (t.uniforms.dimensions.value[0] = this.width, t.uniforms.dimensions.value[1] = this.height, t.uniforms.dimensions.value[2] = this.vertexArray[0], t.uniforms.dimensions.value[3] = this.vertexArray[5]), o.syncUniforms(), n.bindBuffer(n.ARRAY_BUFFER, this.vertexBuffer), n.vertexAttribPointer(o.aVertexPosition, 2, n.FLOAT, !1, 0, 0), n.bindBuffer(n.ARRAY_BUFFER, this.uvBuffer), n.vertexAttribPointer(o.aTextureCoord, 2, n.FLOAT, !1, 0, 0), n.bindBuffer(n.ARRAY_BUFFER, this.colorBuffer), n.vertexAttribPointer(o.colorAttribute, 2, n.FLOAT, !1, 0, 0), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.indexBuffer), n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0), this.renderSession.drawCount++
    }, e.WebGLFilterManager.prototype.initShaderBuffers = function() {
        var t = this.gl;
        this.vertexBuffer = t.createBuffer(), this.uvBuffer = t.createBuffer(), this.colorBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertexArray, t.STATIC_DRAW), this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer), t.bufferData(t.ARRAY_BUFFER, this.uvArray, t.STATIC_DRAW), this.colorArray = new Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]), t.bindBuffer(t.ARRAY_BUFFER, this.colorBuffer), t.bufferData(t.ARRAY_BUFFER, this.colorArray, t.STATIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), t.STATIC_DRAW)
    }, e.WebGLFilterManager.prototype.destroy = function() {
        var t = this.gl;
        this.filterStack = null, this.offsetX = 0, this.offsetY = 0;
        for(var e = 0; e < this.texturePool.length; e++) this.texturePool[e].destroy();
        this.texturePool = null, t.deleteBuffer(this.vertexBuffer), t.deleteBuffer(this.uvBuffer), t.deleteBuffer(this.colorBuffer), t.deleteBuffer(this.indexBuffer)
    }, e.FilterTexture = function(t, i, r, s) {
        this.gl = t, this.frameBuffer = t.createFramebuffer(), this.texture = t.createTexture(), s = s || e.scaleModes.DEFAULT, t.bindTexture(t.TEXTURE_2D, this.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, s === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0), this.renderBuffer = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.renderBuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.renderBuffer), this.resize(i, r)
    }, e.FilterTexture.prototype.clear = function() {
        var t = this.gl;
        t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT)
    }, e.FilterTexture.prototype.resize = function(t, e) {
        if(this.width !== t || this.height !== e) {
            this.width = t, this.height = e;
            var i = this.gl;
            i.bindTexture(i.TEXTURE_2D, this.texture), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, t, e, 0, i.RGBA, i.UNSIGNED_BYTE, null), i.bindRenderbuffer(i.RENDERBUFFER, this.renderBuffer), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, t, e)
        }
    }, e.FilterTexture.prototype.destroy = function() {
        var t = this.gl;
        t.deleteFramebuffer(this.frameBuffer), t.deleteTexture(this.texture), this.frameBuffer = null, this.texture = null
    }, e.CanvasMaskManager = function() {}, e.CanvasMaskManager.prototype.pushMask = function(t, i) {
        i.save();
        var r = t.alpha,
            s = t.worldTransform;
        i.setTransform(s.a, s.c, s.b, s.d, s.tx, s.ty), e.CanvasGraphics.renderGraphicsMask(t, i), i.clip(), t.worldAlpha = r
    }, e.CanvasMaskManager.prototype.popMask = function(t) {
        t.restore()
    }, e.CanvasTinter = function() {}, e.CanvasTinter.getTintedTexture = function(t, i) {
        var r = t.texture;
        i = e.CanvasTinter.roundColor(i);
        var s = "#" + ("00000" + (0 | i).toString(16)).substr(-6);
        if(r.tintCache = r.tintCache || {}, r.tintCache[s]) return r.tintCache[s];
        var n = e.CanvasTinter.canvas || document.createElement("canvas");
        if(e.CanvasTinter.tintMethod(r, i, n), e.CanvasTinter.convertTintToImage) {
            var o = new Image;
            o.src = n.toDataURL(), r.tintCache[s] = o
        } else r.tintCache[s] = n, e.CanvasTinter.canvas = null;
        return n
    }, e.CanvasTinter.tintWithMultiply = function(t, e, i) {
        var r = i.getContext("2d"),
            s = t.frame;
        i.width = s.width, i.height = s.height, r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), r.fillRect(0, 0, s.width, s.height), r.globalCompositeOperation = "multiply", r.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height), r.globalCompositeOperation = "destination-atop", r.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height)
    }, e.CanvasTinter.tintWithOverlay = function(t, e, i) {
        var r = i.getContext("2d"),
            s = t.frame;
        i.width = s.width, i.height = s.height, r.globalCompositeOperation = "copy", r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), r.fillRect(0, 0, s.width, s.height), r.globalCompositeOperation = "destination-atop", r.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height)
    }, e.CanvasTinter.tintWithPerPixel = function(t, i, r) {
        var s = r.getContext("2d"),
            n = t.frame;
        r.width = n.width, r.height = n.height, s.globalCompositeOperation = "copy", s.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
        for(var o = e.hex2rgb(i), a = o[0], h = o[1], l = o[2], u = s.getImageData(0, 0, n.width, n.height), c = u.data, d = 0; d < c.length; d += 4) c[d + 0] *= a, c[d + 1] *= h, c[d + 2] *= l;
        s.putImageData(u, 0, 0)
    }, e.CanvasTinter.roundColor = function(t) {
        var i = e.CanvasTinter.cacheStepsPerColorChannel,
            r = e.hex2rgb(t);
        return r[0] = Math.min(255, r[0] / i * i), r[1] = Math.min(255, r[1] / i * i), r[2] = Math.min(255, r[2] / i * i), e.rgb2hex(r)
    }, e.CanvasTinter.cacheStepsPerColorChannel = 8, e.CanvasTinter.convertTintToImage = !1, e.CanvasTinter.canUseMultiply = e.canUseNewCanvasBlendModes(), e.CanvasTinter.tintMethod = e.CanvasTinter.canUseMultiply ? e.CanvasTinter.tintWithMultiply : e.CanvasTinter.tintWithPerPixel, e.CanvasRenderer = function(t, i, r, s) {
        e.defaultRenderer || (e.sayHello("Canvas"), e.defaultRenderer = this), this.type = e.CANVAS_RENDERER, this.clearBeforeRender = !0, this.transparent = !!s, e.blendModesCanvas || (e.blendModesCanvas = [], e.canUseNewCanvasBlendModes() ? (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "multiply", e.blendModesCanvas[e.blendModes.SCREEN] = "screen", e.blendModesCanvas[e.blendModes.OVERLAY] = "overlay", e.blendModesCanvas[e.blendModes.DARKEN] = "darken", e.blendModesCanvas[e.blendModes.LIGHTEN] = "lighten", e.blendModesCanvas[e.blendModes.COLOR_DODGE] = "color-dodge", e.blendModesCanvas[e.blendModes.COLOR_BURN] = "color-burn", e.blendModesCanvas[e.blendModes.HARD_LIGHT] = "hard-light", e.blendModesCanvas[e.blendModes.SOFT_LIGHT] = "soft-light", e.blendModesCanvas[e.blendModes.DIFFERENCE] = "difference", e.blendModesCanvas[e.blendModes.EXCLUSION] = "exclusion", e.blendModesCanvas[e.blendModes.HUE] = "hue", e.blendModesCanvas[e.blendModes.SATURATION] = "saturation", e.blendModesCanvas[e.blendModes.COLOR] = "color", e.blendModesCanvas[e.blendModes.LUMINOSITY] = "luminosity") : (e.blendModesCanvas[e.blendModes.NORMAL] = "source-over", e.blendModesCanvas[e.blendModes.ADD] = "lighter", e.blendModesCanvas[e.blendModes.MULTIPLY] = "source-over", e.blendModesCanvas[e.blendModes.SCREEN] = "source-over", e.blendModesCanvas[e.blendModes.OVERLAY] = "source-over", e.blendModesCanvas[e.blendModes.DARKEN] = "source-over", e.blendModesCanvas[e.blendModes.LIGHTEN] = "source-over", e.blendModesCanvas[e.blendModes.COLOR_DODGE] = "source-over", e.blendModesCanvas[e.blendModes.COLOR_BURN] = "source-over", e.blendModesCanvas[e.blendModes.HARD_LIGHT] = "source-over", e.blendModesCanvas[e.blendModes.SOFT_LIGHT] = "source-over", e.blendModesCanvas[e.blendModes.DIFFERENCE] = "source-over", e.blendModesCanvas[e.blendModes.EXCLUSION] = "source-over", e.blendModesCanvas[e.blendModes.HUE] = "source-over", e.blendModesCanvas[e.blendModes.SATURATION] = "source-over", e.blendModesCanvas[e.blendModes.COLOR] = "source-over", e.blendModesCanvas[e.blendModes.LUMINOSITY] = "source-over")), this.width = t || 800, this.height = i || 600, this.view = r || document.createElement("canvas"), this.context = this.view.getContext("2d", {
            alpha: this.transparent
        }), this.refresh = !0, this.view.width = this.width, this.view.height = this.height, this.count = 0, this.maskManager = new e.CanvasMaskManager, this.renderSession = {
            context: this.context,
            maskManager: this.maskManager,
            scaleMode: null,
            smoothProperty: null,
            roundPixels: !1
        }, "imageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled" in this.context && (this.renderSession.smoothProperty = "oImageSmoothingEnabled")
    }, e.CanvasRenderer.prototype.constructor = e.CanvasRenderer, e.CanvasRenderer.prototype.render = function(t) {
        e.texturesToUpdate.length = 0,
            e.texturesToDestroy.length = 0, t.updateTransform(), this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1, navigator.isCocoonJS && this.view.screencanvas && (this.context.fillStyle = "black", this.context.clear()), !this.transparent && this.clearBeforeRender ? (this.context.fillStyle = t.backgroundColorString, this.context.fillRect(0, 0, this.width, this.height)) : this.transparent && this.clearBeforeRender && this.context.clearRect(0, 0, this.width, this.height), this.renderDisplayObject(t), t.interactive && (t._interactiveEventsAdded || (t._interactiveEventsAdded = !0, t.interactionManager.setTarget(this))), e.Texture.frameUpdates.length > 0 && (e.Texture.frameUpdates.length = 0)
    }, e.CanvasRenderer.prototype.resize = function(t, e) {
        this.width = t, this.height = e, this.view.width = t, this.view.height = e
    }, e.CanvasRenderer.prototype.renderDisplayObject = function(t, e) {
        this.renderSession.context = e || this.context, t._renderCanvas(this.renderSession)
    }, e.CanvasRenderer.prototype.renderStripFlat = function(t) {
        var e = this.context,
            i = t.verticies,
            r = i.length / 2;
        this.count++, e.beginPath();
        for(var s = 1; r - 2 > s; s++) {
            var n = 2 * s,
                o = i[n],
                a = i[n + 2],
                h = i[n + 4],
                l = i[n + 1],
                u = i[n + 3],
                c = i[n + 5];
            e.moveTo(o, l), e.lineTo(a, u), e.lineTo(h, c)
        }
        e.fillStyle = "#FF0000", e.fill(), e.closePath()
    }, e.CanvasRenderer.prototype.renderStrip = function(t) {
        var e = this.context,
            i = t.verticies,
            r = t.uvs,
            s = i.length / 2;
        this.count++;
        for(var n = 1; s - 2 > n; n++) {
            var o = 2 * n,
                a = i[o],
                h = i[o + 2],
                l = i[o + 4],
                u = i[o + 1],
                c = i[o + 3],
                d = i[o + 5],
                p = r[o] * t.texture.width,
                f = r[o + 2] * t.texture.width,
                g = r[o + 4] * t.texture.width,
                m = r[o + 1] * t.texture.height,
                v = r[o + 3] * t.texture.height,
                x = r[o + 5] * t.texture.height;
            e.save(), e.beginPath(), e.moveTo(a, u), e.lineTo(h, c), e.lineTo(l, d), e.closePath(), e.clip();
            var y = p * v + m * g + f * x - v * g - m * f - p * x,
                b = a * v + m * l + h * x - v * l - m * h - a * x,
                T = p * h + a * g + f * l - h * g - a * f - p * l,
                w = p * v * l + m * h * g + a * f * x - a * v * g - m * f * l - p * h * x,
                S = u * v + m * d + c * x - v * d - m * c - u * x,
                E = p * c + u * g + f * d - c * g - u * f - p * d,
                C = p * v * d + m * c * g + u * f * x - u * v * g - m * f * d - p * c * x;
            e.transform(b / y, S / y, T / y, E / y, w / y, C / y), e.drawImage(t.texture.baseTexture.source, 0, 0), e.restore()
        }
    }, e.CanvasBuffer = function(t, e) {
        this.width = t, this.height = e, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = t, this.canvas.height = e
    }, e.CanvasBuffer.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    }, e.CanvasBuffer.prototype.resize = function(t, e) {
        this.width = this.canvas.width = t, this.height = this.canvas.height = e
    }, e.CanvasGraphics = function() {}, e.CanvasGraphics.renderGraphics = function(t, i) {
        for(var r = t.worldAlpha, s = "", n = 0; n < t.graphicsData.length; n++) {
            var o = t.graphicsData[n],
                a = o.points;
            if(i.strokeStyle = s = "#" + ("00000" + (0 | o.lineColor).toString(16)).substr(-6), i.lineWidth = o.lineWidth, o.type === e.Graphics.POLY) {
                i.beginPath(), i.moveTo(a[0], a[1]);
                for(var h = 1; h < a.length / 2; h++) i.lineTo(a[2 * h], a[2 * h + 1]);
                a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * r, i.fillStyle = s = "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * r, i.stroke())
            } else if(o.type === e.Graphics.RECT)(o.fillColor || 0 === o.fillColor) && (i.globalAlpha = o.fillAlpha * r, i.fillStyle = s = "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6), i.fillRect(a[0], a[1], a[2], a[3])), o.lineWidth && (i.globalAlpha = o.lineAlpha * r, i.strokeRect(a[0], a[1], a[2], a[3]));
            else if(o.type === e.Graphics.CIRC) i.beginPath(), i.arc(a[0], a[1], a[2], 0, 2 * Math.PI), i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * r, i.fillStyle = s = "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * r, i.stroke());
            else if(o.type === e.Graphics.ELIP) {
                var l = o.points,
                    u = 2 * l[2],
                    c = 2 * l[3],
                    d = l[0] - u / 2,
                    p = l[1] - c / 2;
                i.beginPath();
                var f = .5522848,
                    g = u / 2 * f,
                    m = c / 2 * f,
                    v = d + u,
                    x = p + c,
                    y = d + u / 2,
                    b = p + c / 2;
                i.moveTo(d, b), i.bezierCurveTo(d, b - m, y - g, p, y, p), i.bezierCurveTo(y + g, p, v, b - m, v, b), i.bezierCurveTo(v, b + m, y + g, x, y, x), i.bezierCurveTo(y - g, x, d, b + m, d, b), i.closePath(), o.fill && (i.globalAlpha = o.fillAlpha * r, i.fillStyle = s = "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * r, i.stroke())
            } else if(o.type === e.Graphics.RREC) {
                var T = a[0],
                    w = a[1],
                    S = a[2],
                    E = a[3],
                    C = a[4],
                    A = Math.min(S, E) / 2 | 0;
                C = C > A ? A : C, i.beginPath(), i.moveTo(T, w + C), i.lineTo(T, w + E - C), i.quadraticCurveTo(T, w + E, T + C, w + E), i.lineTo(T + S - C, w + E), i.quadraticCurveTo(T + S, w + E, T + S, w + E - C), i.lineTo(T + S, w + C), i.quadraticCurveTo(T + S, w, T + S - C, w), i.lineTo(T + C, w), i.quadraticCurveTo(T, w, T, w + C), i.closePath(), (o.fillColor || 0 === o.fillColor) && (i.globalAlpha = o.fillAlpha * r, i.fillStyle = s = "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6), i.fill()), o.lineWidth && (i.globalAlpha = o.lineAlpha * r, i.stroke())
            }
        }
    }, e.CanvasGraphics.renderGraphicsMask = function(t, i) {
        var r = t.graphicsData.length;
        if(0 !== r) {
            r > 1 && (r = 1, window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
            for(var s = 0; 1 > s; s++) {
                var n = t.graphicsData[s],
                    o = n.points;
                if(n.type === e.Graphics.POLY) {
                    i.beginPath(), i.moveTo(o[0], o[1]);
                    for(var a = 1; a < o.length / 2; a++) i.lineTo(o[2 * a], o[2 * a + 1]);
                    o[0] === o[o.length - 2] && o[1] === o[o.length - 1] && i.closePath()
                } else if(n.type === e.Graphics.RECT) i.beginPath(), i.rect(o[0], o[1], o[2], o[3]), i.closePath();
                else if(n.type === e.Graphics.CIRC) i.beginPath(), i.arc(o[0], o[1], o[2], 0, 2 * Math.PI), i.closePath();
                else if(n.type === e.Graphics.ELIP) {
                    var h = n.points,
                        l = 2 * h[2],
                        u = 2 * h[3],
                        c = h[0] - l / 2,
                        d = h[1] - u / 2;
                    i.beginPath();
                    var p = .5522848,
                        f = l / 2 * p,
                        g = u / 2 * p,
                        m = c + l,
                        v = d + u,
                        x = c + l / 2,
                        y = d + u / 2;
                    i.moveTo(c, y), i.bezierCurveTo(c, y - g, x - f, d, x, d), i.bezierCurveTo(x + f, d, m, y - g, m, y), i.bezierCurveTo(m, y + g, x + f, v, x, v), i.bezierCurveTo(x - f, v, c, y + g, c, y), i.closePath()
                } else if(n.type === e.Graphics.RREC) {
                    var b = o[0],
                        T = o[1],
                        w = o[2],
                        S = o[3],
                        E = o[4],
                        C = Math.min(w, S) / 2 | 0;
                    E = E > C ? C : E, i.beginPath(), i.moveTo(b, T + E), i.lineTo(b, T + S - E), i.quadraticCurveTo(b, T + S, b + E, T + S), i.lineTo(b + w - E, T + S), i.quadraticCurveTo(b + w, T + S, b + w, T + S - E), i.lineTo(b + w, T + E), i.quadraticCurveTo(b + w, T, b + w - E, T), i.lineTo(b + E, T), i.quadraticCurveTo(b, T, b, T + E), i.closePath()
                }
            }
        }
    }, e.Graphics = function() {
        e.DisplayObjectContainer.call(this), this.renderable = !0, this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = "black", this.graphicsData = [], this.tint = 16777215, this.blendMode = e.blendModes.NORMAL, this.currentPath = {
            points: []
        }, this._webGL = [], this.isMask = !1, this.bounds = null, this.boundsPadding = 10, this.dirty = !0
    }, e.Graphics.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Graphics.prototype.constructor = e.Graphics, Object.defineProperty(e.Graphics.prototype, "cacheAsBitmap", {
        get: function() {
            return this._cacheAsBitmap
        },
        set: function(t) {
            this._cacheAsBitmap = t, this._cacheAsBitmap ? this._generateCachedSprite() : (this.destroyCachedSprite(), this.dirty = !0)
        }
    }), e.Graphics.prototype.lineStyle = function(t, i, r) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.lineWidth = t || 0, this.lineColor = i || 0, this.lineAlpha = arguments.length < 3 ? 1 : r, this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY
        }, this.graphicsData.push(this.currentPath), this
    }, e.Graphics.prototype.moveTo = function(t, i) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY
        }, this.currentPath.points.push(t, i), this.graphicsData.push(this.currentPath), this
    }, e.Graphics.prototype.lineTo = function(t, e) {
        return this.currentPath.points.push(t, e), this.dirty = !0, this
    }, e.Graphics.prototype.quadraticCurveTo = function(t, e, i, r) {
        0 === this.currentPath.points.length && this.moveTo(0, 0);
        var s, n, o = 20,
            a = this.currentPath.points;
        0 === a.length && this.moveTo(0, 0);
        for(var h = a[a.length - 2], l = a[a.length - 1], u = 0, c = 1; o >= c; c++) u = c / o, s = h + (t - h) * u, n = l + (e - l) * u, a.push(s + (t + (i - t) * u - s) * u, n + (e + (r - e) * u - n) * u);
        return this.dirty = !0, this
    }, e.Graphics.prototype.bezierCurveTo = function(t, e, i, r, s, n) {
        0 === this.currentPath.points.length && this.moveTo(0, 0);
        for(var o, a, h, l, u, c = 20, d = this.currentPath.points, p = d[d.length - 2], f = d[d.length - 1], g = 0, m = 1; c > m; m++) g = m / c, o = 1 - g, a = o * o, h = a * o, l = g * g, u = l * g, d.push(h * p + 3 * a * g * t + 3 * o * l * i + u * s, h * f + 3 * a * g * e + 3 * o * l * r + u * n);
        return this.dirty = !0, this
    }, e.Graphics.prototype.arcTo = function(t, e, i, r, s) {
        0 === this.currentPath.points.length && this.moveTo(t, e);
        var n = this.currentPath.points,
            o = n[n.length - 2],
            a = n[n.length - 1],
            h = a - e,
            l = o - t,
            u = r - e,
            c = i - t,
            d = Math.abs(h * c - l * u);
        if(1e-8 > d || 0 === s) n.push(t, e);
        else {
            var p = h * h + l * l,
                f = u * u + c * c,
                g = h * u + l * c,
                m = s * Math.sqrt(p) / d,
                v = s * Math.sqrt(f) / d,
                x = m * g / p,
                y = v * g / f,
                b = m * c + v * l,
                T = m * u + v * h,
                w = l * (v + x),
                S = h * (v + x),
                E = c * (m + y),
                C = u * (m + y),
                A = Math.atan2(S - T, w - b),
                _ = Math.atan2(C - T, E - b);
            this.arc(b + t, T + e, s, A, _, l * u > c * h)
        }
        return this.dirty = !0, this
    }, e.Graphics.prototype.arc = function(t, e, i, r, s, n) {
        var o = t + Math.cos(r) * i,
            a = e + Math.sin(r) * i,
            h = this.currentPath.points;
        if((0 !== h.length && h[h.length - 2] !== o || h[h.length - 1] !== a) && (this.moveTo(o, a), h = this.currentPath.points), r === s) return this;
        !n && r >= s ? s += 2 * Math.PI : n && s >= r && (r += 2 * Math.PI);
        var l = n ? -1 * (r - s) : s - r,
            u = Math.abs(l) / (2 * Math.PI) * 40;
        if(0 === l) return this;
        for(var c = l / (2 * u), d = 2 * c, p = Math.cos(c), f = Math.sin(c), g = u - 1, m = g % 1 / g, v = 0; g >= v; v++) {
            var x = v + m * v,
                y = c + r + d * x,
                b = Math.cos(y),
                T = -Math.sin(y);
            h.push((p * b + f * T) * i + t, (p * -T + f * b) * i + e)
        }
        return this.dirty = !0, this
    }, e.Graphics.prototype.drawPath = function(t) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY
        }, this.graphicsData.push(this.currentPath), this.currentPath.points = this.currentPath.points.concat(t), this.dirty = !0, this
    }, e.Graphics.prototype.beginFill = function(t, e) {
        return this.filling = !0, this.fillColor = t || 0, this.fillAlpha = arguments.length < 2 ? 1 : e, this
    }, e.Graphics.prototype.endFill = function() {
        return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
    }, e.Graphics.prototype.drawRect = function(t, i, r, s) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [t, i, r, s],
            type: e.Graphics.RECT
        }, this.graphicsData.push(this.currentPath), this.dirty = !0, this
    }, e.Graphics.prototype.drawRoundedRect = function(t, i, r, s, n) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [t, i, r, s, n],
            type: e.Graphics.RREC
        }, this.graphicsData.push(this.currentPath), this.dirty = !0, this
    }, e.Graphics.prototype.drawCircle = function(t, i, r) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [t, i, r, r],
            type: e.Graphics.CIRC
        }, this.graphicsData.push(this.currentPath), this.dirty = !0, this
    }, e.Graphics.prototype.drawEllipse = function(t, i, r, s) {
        return this.currentPath.points.length || this.graphicsData.pop(), this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [t, i, r, s],
            type: e.Graphics.ELIP
        }, this.graphicsData.push(this.currentPath), this.dirty = !0, this
    }, e.Graphics.prototype.clear = function() {
        return this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this.bounds = null, this
    }, e.Graphics.prototype.generateTexture = function() {
        var t = this.getBounds(),
            i = new e.CanvasBuffer(t.width, t.height),
            r = e.Texture.fromCanvas(i.canvas);
        return i.context.translate(-t.x, -t.y), e.CanvasGraphics.renderGraphics(this, i.context), r
    }, e.Graphics.prototype._renderWebGL = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
            if(this._cacheAsBitmap) return this.dirty && (this._generateCachedSprite(), e.updateWebGLTexture(this._cachedSprite.texture.baseTexture, t.gl), this.dirty = !1), this._cachedSprite.alpha = this.alpha, void e.Sprite.prototype._renderWebGL.call(this._cachedSprite, t);
            if(t.spriteBatch.stop(), t.blendModeManager.setBlendMode(this.blendMode), this._mask && t.maskManager.pushMask(this._mask, t), this._filters && t.filterManager.pushFilter(this._filterBlock), this.blendMode !== t.spriteBatch.currentBlendMode) {
                t.spriteBatch.currentBlendMode = this.blendMode;
                var i = e.blendModesWebGL[t.spriteBatch.currentBlendMode];
                t.spriteBatch.gl.blendFunc(i[0], i[1])
            }
            if(e.WebGLGraphics.renderGraphics(this, t), this.children.length) {
                t.spriteBatch.start();
                for(var r = 0, s = this.children.length; s > r; r++) this.children[r]._renderWebGL(t);
                t.spriteBatch.stop()
            }
            this._filters && t.filterManager.popFilter(), this._mask && t.maskManager.popMask(this.mask, t), t.drawCount++, t.spriteBatch.start()
        }
    }, e.Graphics.prototype._renderCanvas = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
            var i = t.context,
                r = this.worldTransform;
            this.blendMode !== t.currentBlendMode && (t.currentBlendMode = this.blendMode, i.globalCompositeOperation = e.blendModesCanvas[t.currentBlendMode]), this._mask && t.maskManager.pushMask(this._mask, t.context), i.setTransform(r.a, r.c, r.b, r.d, r.tx, r.ty), e.CanvasGraphics.renderGraphics(this, i);
            for(var s = 0, n = this.children.length; n > s; s++) this.children[s]._renderCanvas(t);
            this._mask && t.maskManager.popMask(t.context)
        }
    }, e.Graphics.prototype.getBounds = function(t) {
        this.bounds || this.updateBounds();
        var e = this.bounds.x,
            i = this.bounds.width + this.bounds.x,
            r = this.bounds.y,
            s = this.bounds.height + this.bounds.y,
            n = t || this.worldTransform,
            o = n.a,
            a = n.c,
            h = n.b,
            l = n.d,
            u = n.tx,
            c = n.ty,
            d = o * i + h * s + u,
            p = l * s + a * i + c,
            f = o * e + h * s + u,
            g = l * s + a * e + c,
            m = o * e + h * r + u,
            v = l * r + a * e + c,
            x = o * i + h * r + u,
            y = l * r + a * i + c,
            b = d,
            T = p,
            w = d,
            S = p;
        w = w > f ? f : w, w = w > m ? m : w, w = w > x ? x : w, S = S > g ? g : S, S = S > v ? v : S, S = S > y ? y : S, b = f > b ? f : b, b = m > b ? m : b, b = x > b ? x : b, T = g > T ? g : T, T = v > T ? v : T, T = y > T ? y : T;
        var E = this._bounds;
        return E.x = w, E.width = b - w, E.y = S, E.height = T - S, E
    }, e.Graphics.prototype.updateBounds = function() {
        for(var t, i, r, s, n, o = 1 / 0, a = -1 / 0, h = 1 / 0, l = -1 / 0, u = 0; u < this.graphicsData.length; u++) {
            var c = this.graphicsData[u],
                d = c.type,
                p = c.lineWidth;
            if(t = c.points, d === e.Graphics.RECT) i = t[0] - p / 2, r = t[1] - p / 2, s = t[2] + p, n = t[3] + p, o = o > i ? i : o, a = i + s > a ? i + s : a, h = h > r ? i : h, l = r + n > l ? r + n : l;
            else if(d === e.Graphics.CIRC || d === e.Graphics.ELIP) i = t[0], r = t[1], s = t[2] + p / 2, n = t[3] + p / 2, o = o > i - s ? i - s : o, a = i + s > a ? i + s : a, h = h > r - n ? r - n : h, l = r + n > l ? r + n : l;
            else
                for(var f = 0; f < t.length; f += 2) i = t[f], r = t[f + 1], o = o > i - p ? i - p : o, a = i + p > a ? i + p : a, h = h > r - p ? r - p : h, l = r + p > l ? r + p : l
        }
        var g = this.boundsPadding;
        this.bounds = new e.Rectangle(o - g, h - g, a - o + 2 * g, l - h + 2 * g)
    }, e.Graphics.prototype._generateCachedSprite = function() {
        var t = this.getLocalBounds();
        if(this._cachedSprite) this._cachedSprite.buffer.resize(t.width, t.height);
        else {
            var i = new e.CanvasBuffer(t.width, t.height),
                r = e.Texture.fromCanvas(i.canvas);
            this._cachedSprite = new e.Sprite(r), this._cachedSprite.buffer = i, this._cachedSprite.worldTransform = this.worldTransform
        }
        this._cachedSprite.anchor.x = -(t.x / t.width), this._cachedSprite.anchor.y = -(t.y / t.height), this._cachedSprite.buffer.context.translate(-t.x, -t.y), e.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context), this._cachedSprite.alpha = this.alpha
    }, e.Graphics.prototype.destroyCachedSprite = function() {
        this._cachedSprite.texture.destroy(!0), this._cachedSprite = null
    }, e.Graphics.POLY = 0, e.Graphics.RECT = 1, e.Graphics.CIRC = 2, e.Graphics.ELIP = 3, e.Graphics.RREC = 4, e.Strip = function(t) {
        e.DisplayObjectContainer.call(this), this.texture = t, this.uvs = new e.Float32Array([0, 1, 1, 1, 1, 0, 0, 1]), this.verticies = new e.Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), this.colors = new e.Float32Array([1, 1, 1, 1]), this.indices = new e.Uint16Array([0, 1, 2, 3]), this.dirty = !0
    }, e.Strip.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Strip.prototype.constructor = e.Strip, e.Strip.prototype._renderWebGL = function(t) {
        !this.visible || this.alpha <= 0 || (t.spriteBatch.stop(), this._vertexBuffer || this._initWebGL(t), t.shaderManager.setShader(t.shaderManager.stripShader), this._renderStrip(t), t.spriteBatch.start())
    }, e.Strip.prototype._initWebGL = function(t) {
        var e = t.gl;
        this._vertexBuffer = e.createBuffer(), this._indexBuffer = e.createBuffer(), this._uvBuffer = e.createBuffer(), this._colorBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer), e.bufferData(e.ARRAY_BUFFER, this.verticies, e.DYNAMIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer), e.bufferData(e.ARRAY_BUFFER, this.uvs, e.STATIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this._colorBuffer), e.bufferData(e.ARRAY_BUFFER, this.colors, e.STATIC_DRAW), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW)
    }, e.Strip.prototype._renderStrip = function(t) {
        var i = t.gl,
            r = t.projection,
            s = t.offset,
            n = t.shaderManager.stripShader;
        i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA), i.uniformMatrix3fv(n.translationMatrix, !1, this.worldTransform.toArray(!0)), i.uniform2f(n.projectionVector, r.x, -r.y), i.uniform2f(n.offsetVector, -s.x, -s.y), i.uniform1f(n.alpha, 1), this.dirty ? (this.dirty = !1, i.bindBuffer(i.ARRAY_BUFFER, this._vertexBuffer), i.bufferData(i.ARRAY_BUFFER, this.verticies, i.STATIC_DRAW), i.vertexAttribPointer(n.aVertexPosition, 2, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, this._uvBuffer), i.bufferData(i.ARRAY_BUFFER, this.uvs, i.STATIC_DRAW), i.vertexAttribPointer(n.aTextureCoord, 2, i.FLOAT, !1, 0, 0), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.texture.baseTexture._glTextures[i.id] || e.createWebGLTexture(this.texture.baseTexture, i)), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this._indexBuffer), i.bufferData(i.ELEMENT_ARRAY_BUFFER, this.indices, i.STATIC_DRAW)) : (i.bindBuffer(i.ARRAY_BUFFER, this._vertexBuffer), i.bufferSubData(i.ARRAY_BUFFER, 0, this.verticies), i.vertexAttribPointer(n.aVertexPosition, 2, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ARRAY_BUFFER, this._uvBuffer), i.vertexAttribPointer(n.aTextureCoord, 2, i.FLOAT, !1, 0, 0), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.texture.baseTexture._glTextures[i.id] || e.createWebGLTexture(this.texture.baseTexture, i)), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this._indexBuffer)), i.drawElements(i.TRIANGLE_STRIP, this.indices.length, i.UNSIGNED_SHORT, 0)
    }, e.Strip.prototype._renderCanvas = function(t) {
        var e = t.context,
            i = this.worldTransform;
        t.roundPixels ? e.setTransform(i.a, i.c, i.b, i.d, 0 | i.tx, 0 | i.ty) : e.setTransform(i.a, i.c, i.b, i.d, i.tx, i.ty);
        var r = this,
            s = r.verticies,
            n = r.uvs,
            o = s.length / 2;
        this.count++;
        for(var a = 0; o - 2 > a; a++) {
            var h = 2 * a,
                l = s[h],
                u = s[h + 2],
                c = s[h + 4],
                d = s[h + 1],
                p = s[h + 3],
                f = s[h + 5],
                g = (l + u + c) / 3,
                m = (d + p + f) / 3,
                v = l - g,
                x = d - m,
                y = Math.sqrt(v * v + x * x);
            l = g + v / y * (y + 3), d = m + x / y * (y + 3), v = u - g, x = p - m, y = Math.sqrt(v * v + x * x), u = g + v / y * (y + 3), p = m + x / y * (y + 3), v = c - g, x = f - m, y = Math.sqrt(v * v + x * x), c = g + v / y * (y + 3), f = m + x / y * (y + 3);
            var b = n[h] * r.texture.width,
                T = n[h + 2] * r.texture.width,
                w = n[h + 4] * r.texture.width,
                S = n[h + 1] * r.texture.height,
                E = n[h + 3] * r.texture.height,
                C = n[h + 5] * r.texture.height;
            e.save(), e.beginPath(), e.moveTo(l, d), e.lineTo(u, p), e.lineTo(c, f), e.closePath(), e.clip();
            var A = b * E + S * w + T * C - E * w - S * T - b * C,
                _ = l * E + S * c + u * C - E * c - S * u - l * C,
                R = b * u + l * w + T * c - u * w - l * T - b * c,
                M = b * E * c + S * u * w + l * T * C - l * E * w - S * T * c - b * u * C,
                L = d * E + S * f + p * C - E * f - S * p - d * C,
                F = b * p + d * w + T * f - p * w - d * T - b * f,
                B = b * E * f + S * p * w + d * T * C - d * E * w - S * T * f - b * p * C;
            e.transform(_ / A, L / A, R / A, F / A, M / A, B / A), e.drawImage(r.texture.baseTexture.source, 0, 0), e.restore()
        }
    }, e.Strip.prototype.onTextureUpdate = function() {
        this.updateFrame = !0
    }, e.Rope = function(t, i) {
        e.Strip.call(this, t), this.points = i, this.verticies = new e.Float32Array(4 * i.length), this.uvs = new e.Float32Array(4 * i.length), this.colors = new e.Float32Array(2 * i.length), this.indices = new e.Uint16Array(2 * i.length), this.refresh()
    }, e.Rope.prototype = Object.create(e.Strip.prototype), e.Rope.prototype.constructor = e.Rope, e.Rope.prototype.refresh = function() {
        var t = this.points;
        if(!(t.length < 1)) {
            var e = this.uvs,
                i = t[0],
                r = this.indices,
                s = this.colors;
            this.count -= .2, e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, s[0] = 1, s[1] = 1, r[0] = 0, r[1] = 1;
            for(var n, o, a, h = t.length, l = 1; h > l; l++) n = t[l], o = 4 * l, a = l / (h - 1), l % 2 ? (e[o] = a, e[o + 1] = 0, e[o + 2] = a, e[o + 3] = 1) : (e[o] = a, e[o + 1] = 0, e[o + 2] = a, e[o + 3] = 1), o = 2 * l, s[o] = 1, s[o + 1] = 1, o = 2 * l, r[o] = o, r[o + 1] = o + 1, i = n
        }
    }, e.Rope.prototype.updateTransform = function() {
        var t = this.points;
        if(!(t.length < 1)) {
            var i, r = t[0],
                s = {
                    x: 0,
                    y: 0
                };
            this.count -= .2;
            for(var n, o, a, h, l, u = this.verticies, c = t.length, d = 0; c > d; d++) n = t[d], o = 4 * d, i = d < t.length - 1 ? t[d + 1] : n, s.y = -(i.x - r.x), s.x = i.y - r.y, a = 10 * (1 - d / (c - 1)), a > 1 && (a = 1), h = Math.sqrt(s.x * s.x + s.y * s.y), l = this.texture.height / 2, s.x /= h, s.y /= h, s.x *= l, s.y *= l, u[o] = n.x + s.x, u[o + 1] = n.y + s.y, u[o + 2] = n.x - s.x, u[o + 3] = n.y - s.y, r = n;
            e.DisplayObjectContainer.prototype.updateTransform.call(this)
        }
    }, e.Rope.prototype.setTexture = function(t) {
        this.texture = t
    }, e.TilingSprite = function(t, i, r) {
        e.Sprite.call(this, t), this._width = i || 100, this._height = r || 100, this.tileScale = new e.Point(1, 1), this.tileScaleOffset = new e.Point(1, 1), this.tilePosition = new e.Point(0, 0), this.renderable = !0, this.tint = 16777215, this.blendMode = e.blendModes.NORMAL
    }, e.TilingSprite.prototype = Object.create(e.Sprite.prototype), e.TilingSprite.prototype.constructor = e.TilingSprite, Object.defineProperty(e.TilingSprite.prototype, "width", {
        get: function() {
            return this._width
        },
        set: function(t) {
            this._width = t
        }
    }), Object.defineProperty(e.TilingSprite.prototype, "height", {
        get: function() {
            return this._height
        },
        set: function(t) {
            this._height = t
        }
    }), e.TilingSprite.prototype.setTexture = function(t) {
        this.texture !== t && (this.texture = t, this.refreshTexture = !0, this.cachedTint = 16777215)
    }, e.TilingSprite.prototype._renderWebGL = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha) {
            var i, r;
            for(this._mask && (t.spriteBatch.stop(), t.maskManager.pushMask(this.mask, t), t.spriteBatch.start()), this._filters && (t.spriteBatch.flush(), t.filterManager.pushFilter(this._filterBlock)), !this.tilingTexture || this.refreshTexture ? (this.generateTilingTexture(!0), this.tilingTexture && this.tilingTexture.needsUpdate && (e.updateWebGLTexture(this.tilingTexture.baseTexture, t.gl), this.tilingTexture.needsUpdate = !1)) : t.spriteBatch.renderTilingSprite(this), i = 0, r = this.children.length; r > i; i++) this.children[i]._renderWebGL(t);
            t.spriteBatch.stop(), this._filters && t.filterManager.popFilter(), this._mask && t.maskManager.popMask(t), t.spriteBatch.start()
        }
    }, e.TilingSprite.prototype._renderCanvas = function(t) {
        if(this.visible !== !1 && 0 !== this.alpha) {
            var i = t.context;
            this._mask && t.maskManager.pushMask(this._mask, i), i.globalAlpha = this.worldAlpha;
            var r, s, n = this.worldTransform;
            if(i.setTransform(n.a, n.c, n.b, n.d, n.tx, n.ty), !this.__tilePattern || this.refreshTexture) {
                if(this.generateTilingTexture(!1), !this.tilingTexture) return;
                this.__tilePattern = i.createPattern(this.tilingTexture.baseTexture.source, "repeat")
            }
            this.blendMode !== t.currentBlendMode && (t.currentBlendMode = this.blendMode, i.globalCompositeOperation = e.blendModesCanvas[t.currentBlendMode]);
            var o = this.tilePosition,
                a = this.tileScale;
            for(o.x %= this.tilingTexture.baseTexture.width, o.y %= this.tilingTexture.baseTexture.height, i.scale(a.x, a.y), i.translate(o.x, o.y), i.fillStyle = this.__tilePattern, i.fillRect(-o.x + this.anchor.x * -this._width, -o.y + this.anchor.y * -this._height, this._width / a.x, this._height / a.y), i.scale(1 / a.x, 1 / a.y), i.translate(-o.x, -o.y), this._mask && t.maskManager.popMask(t.context), r = 0, s = this.children.length; s > r; r++) this.children[r]._renderCanvas(t)
        }
    }, e.TilingSprite.prototype.getBounds = function() {
        var t = this._width,
            e = this._height,
            i = t * (1 - this.anchor.x),
            r = t * -this.anchor.x,
            s = e * (1 - this.anchor.y),
            n = e * -this.anchor.y,
            o = this.worldTransform,
            a = o.a,
            h = o.c,
            l = o.b,
            u = o.d,
            c = o.tx,
            d = o.ty,
            p = a * r + l * n + c,
            f = u * n + h * r + d,
            g = a * i + l * n + c,
            m = u * n + h * i + d,
            v = a * i + l * s + c,
            x = u * s + h * i + d,
            y = a * r + l * s + c,
            b = u * s + h * r + d,
            T = -1 / 0,
            w = -1 / 0,
            S = 1 / 0,
            E = 1 / 0;
        S = S > p ? p : S, S = S > g ? g : S, S = S > v ? v : S, S = S > y ? y : S, E = E > f ? f : E, E = E > m ? m : E, E = E > x ? x : E, E = E > b ? b : E, T = p > T ? p : T, T = g > T ? g : T, T = v > T ? v : T, T = y > T ? y : T, w = f > w ? f : w, w = m > w ? m : w, w = x > w ? x : w, w = b > w ? b : w;
        var C = this._bounds;
        return C.x = S, C.width = T - S, C.y = E, C.height = w - E, this._currentBounds = C, C
    }, e.TilingSprite.prototype.onTextureUpdate = function() {}, e.TilingSprite.prototype.generateTilingTexture = function(t) {
        if(this.texture.baseTexture.hasLoaded) {
            var i, r, s = this.texture,
                n = s.frame,
                o = n.width !== s.baseTexture.width || n.height !== s.baseTexture.height,
                a = !1;
            if(t ? (i = e.getNextPowerOfTwo(n.width), r = e.getNextPowerOfTwo(n.height), (n.width !== i || n.height !== r) && (a = !0)) : o && (i = n.width, r = n.height, a = !0), a) {
                var h;
                this.tilingTexture && this.tilingTexture.isTiling ? (h = this.tilingTexture.canvasBuffer, h.resize(i, r), this.tilingTexture.baseTexture.width = i, this.tilingTexture.baseTexture.height = r, this.tilingTexture.needsUpdate = !0) : (h = new e.CanvasBuffer(i, r), this.tilingTexture = e.Texture.fromCanvas(h.canvas), this.tilingTexture.canvasBuffer = h, this.tilingTexture.isTiling = !0), h.context.drawImage(s.baseTexture.source, s.crop.x, s.crop.y, s.crop.width, s.crop.height, 0, 0, i, r), this.tileScaleOffset.x = n.width / i, this.tileScaleOffset.y = n.height / r
            } else this.tilingTexture && this.tilingTexture.isTiling && this.tilingTexture.destroy(!0), this.tileScaleOffset.x = 1, this.tileScaleOffset.y = 1, this.tilingTexture = s;
            this.refreshTexture = !1, this.tilingTexture.baseTexture._powerOf2 = !0
        }
    };
    var n = {};
    n.BoneData = function(t, e) {
        this.name = t, this.parent = e
    }, n.BoneData.prototype = {
        length: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    }, n.SlotData = function(t, e) {
        this.name = t, this.boneData = e
    }, n.SlotData.prototype = {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        attachmentName: null
    }, n.Bone = function(t, e) {
        this.data = t, this.parent = e, this.setToSetupPose()
    }, n.Bone.yDown = !1, n.Bone.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        m00: 0,
        m01: 0,
        worldX: 0,
        m10: 0,
        m11: 0,
        worldY: 0,
        worldRotation: 0,
        worldScaleX: 1,
        worldScaleY: 1,
        updateWorldTransform: function(t, e) {
            var i = this.parent;
            null != i ? (this.worldX = this.x * i.m00 + this.y * i.m01 + i.worldX, this.worldY = this.x * i.m10 + this.y * i.m11 + i.worldY, this.worldScaleX = i.worldScaleX * this.scaleX, this.worldScaleY = i.worldScaleY * this.scaleY, this.worldRotation = i.worldRotation + this.rotation) : (this.worldX = this.x, this.worldY = this.y, this.worldScaleX = this.scaleX, this.worldScaleY = this.scaleY, this.worldRotation = this.rotation);
            var r = this.worldRotation * Math.PI / 180,
                s = Math.cos(r),
                o = Math.sin(r);
            this.m00 = s * this.worldScaleX, this.m10 = o * this.worldScaleX, this.m01 = -o * this.worldScaleY, this.m11 = s * this.worldScaleY, t && (this.m00 = -this.m00, this.m01 = -this.m01), e && (this.m10 = -this.m10, this.m11 = -this.m11), n.Bone.yDown && (this.m10 = -this.m10, this.m11 = -this.m11)
        },
        setToSetupPose: function() {
            var t = this.data;
            this.x = t.x, this.y = t.y, this.rotation = t.rotation, this.scaleX = t.scaleX, this.scaleY = t.scaleY
        }
    }, n.Slot = function(t, e, i) {
        this.data = t, this.skeleton = e, this.bone = i, this.setToSetupPose()
    }, n.Slot.prototype = {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        _attachmentTime: 0,
        attachment: null,
        setAttachment: function(t) {
            this.attachment = t, this._attachmentTime = this.skeleton.time
        },
        setAttachmentTime: function(t) {
            this._attachmentTime = this.skeleton.time - t
        },
        getAttachmentTime: function() {
            return this.skeleton.time - this._attachmentTime
        },
        setToSetupPose: function() {
            var t = this.data;
            this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a;
            for(var e = this.skeleton.data.slots, i = 0, r = e.length; r > i; i++)
                if(e[i] == t) {
                    this.setAttachment(t.attachmentName ? this.skeleton.getAttachmentBySlotIndex(i, t.attachmentName) : null);
                    break
                }
        }
    }, n.Skin = function(t) {
        this.name = t, this.attachments = {}
    }, n.Skin.prototype = {
        addAttachment: function(t, e, i) {
            this.attachments[t + ":" + e] = i
        },
        getAttachment: function(t, e) {
            return this.attachments[t + ":" + e]
        },
        _attachAll: function(t, e) {
            for(var i in e.attachments) {
                var r = i.indexOf(":"),
                    s = parseInt(i.substring(0, r), 10),
                    n = i.substring(r + 1),
                    o = t.slots[s];
                if(o.attachment && o.attachment.name == n) {
                    var a = this.getAttachment(s, n);
                    a && o.setAttachment(a)
                }
            }
        }
    }, n.Animation = function(t, e, i) {
        this.name = t, this.timelines = e, this.duration = i
    }, n.Animation.prototype = {
        apply: function(t, e, i) {
            i && this.duration && (e %= this.duration);
            for(var r = this.timelines, s = 0, n = r.length; n > s; s++) r[s].apply(t, e, 1)
        },
        mix: function(t, e, i, r) {
            i && this.duration && (e %= this.duration);
            for(var s = this.timelines, n = 0, o = s.length; o > n; n++) s[n].apply(t, e, r)
        }
    }, n.binarySearch = function(t, e, i) {
        var r = 0,
            s = Math.floor(t.length / i) - 2;
        if(!s) return i;
        for(var n = s >>> 1;;) {
            if(t[(n + 1) * i] <= e ? r = n + 1 : s = n, r == s) return(r + 1) * i;
            n = r + s >>> 1
        }
    }, n.linearSearch = function(t, e, i) {
        for(var r = 0, s = t.length - i; s >= r; r += i)
            if(t[r] > e) return r;
        return -1
    }, n.Curves = function(t) {
        this.curves = [], this.curves.length = 6 * (t - 1)
    }, n.Curves.prototype = {
        setLinear: function(t) {
            this.curves[6 * t] = 0
        },
        setStepped: function(t) {
            this.curves[6 * t] = -1
        },
        setCurve: function(t, e, i, r, s) {
            var n = .1,
                o = n * n,
                a = o * n,
                h = 3 * n,
                l = 3 * o,
                u = 6 * o,
                c = 6 * a,
                d = 2 * -e + r,
                p = 2 * -i + s,
                f = 3 * (e - r) + 1,
                g = 3 * (i - s) + 1,
                m = 6 * t,
                v = this.curves;
            v[m] = e * h + d * l + f * a, v[m + 1] = i * h + p * l + g * a, v[m + 2] = d * u + f * c, v[m + 3] = p * u + g * c, v[m + 4] = f * c, v[m + 5] = g * c
        },
        getCurvePercent: function(t, e) {
            e = 0 > e ? 0 : e > 1 ? 1 : e;
            var i = 6 * t,
                r = this.curves,
                s = r[i];
            if(!s) return e;
            if(-1 == s) return 0;
            for(var n = r[i + 1], o = r[i + 2], a = r[i + 3], h = r[i + 4], l = r[i + 5], u = s, c = n, d = 8;;) {
                if(u >= e) {
                    var p = u - s,
                        f = c - n;
                    return f + (c - f) * (e - p) / (u - p)
                }
                if(!d) break;
                d--, s += o, n += a, o += h, a += l, u += s, c += n
            }
            return c + (1 - c) * (e - u) / (1 - u)
        }
    }, n.RotateTimeline = function(t) {
        this.curves = new n.Curves(t), this.frames = [], this.frames.length = 2 * t
    }, n.RotateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 2
        },
        setFrame: function(t, e, i) {
            t *= 2, this.frames[t] = e, this.frames[t + 1] = i
        },
        apply: function(t, e, i) {
            var r, s = this.frames;
            if(!(e < s[0])) {
                var o = t.bones[this.boneIndex];
                if(e >= s[s.length - 2]) {
                    for(r = o.data.rotation + s[s.length - 1] - o.rotation; r > 180;) r -= 360;
                    for(; - 180 > r;) r += 360;
                    return void(o.rotation += r * i)
                }
                var a = n.binarySearch(s, e, 2),
                    h = s[a - 1],
                    l = s[a],
                    u = 1 - (e - l) / (s[a - 2] - l);
                for(u = this.curves.getCurvePercent(a / 2 - 1, u), r = s[a + 1] - h; r > 180;) r -= 360;
                for(; - 180 > r;) r += 360;
                for(r = o.data.rotation + (h + r * u) - o.rotation; r > 180;) r -= 360;
                for(; - 180 > r;) r += 360;
                o.rotation += r * i
            }
        }
    }, n.TranslateTimeline = function(t) {
        this.curves = new n.Curves(t), this.frames = [], this.frames.length = 3 * t
    }, n.TranslateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 3
        },
        setFrame: function(t, e, i, r) {
            t *= 3, this.frames[t] = e, this.frames[t + 1] = i, this.frames[t + 2] = r
        },
        apply: function(t, e, i) {
            var r = this.frames;
            if(!(e < r[0])) {
                var s = t.bones[this.boneIndex];
                if(e >= r[r.length - 3]) return s.x += (s.data.x + r[r.length - 2] - s.x) * i, void(s.y += (s.data.y + r[r.length - 1] - s.y) * i);
                var o = n.binarySearch(r, e, 3),
                    a = r[o - 2],
                    h = r[o - 1],
                    l = r[o],
                    u = 1 - (e - l) / (r[o + -3] - l);
                u = this.curves.getCurvePercent(o / 3 - 1, u), s.x += (s.data.x + a + (r[o + 1] - a) * u - s.x) * i, s.y += (s.data.y + h + (r[o + 2] - h) * u - s.y) * i
            }
        }
    }, n.ScaleTimeline = function(t) {
        this.curves = new n.Curves(t), this.frames = [], this.frames.length = 3 * t
    }, n.ScaleTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 3
        },
        setFrame: function(t, e, i, r) {
            t *= 3, this.frames[t] = e, this.frames[t + 1] = i, this.frames[t + 2] = r
        },
        apply: function(t, e, i) {
            var r = this.frames;
            if(!(e < r[0])) {
                var s = t.bones[this.boneIndex];
                if(e >= r[r.length - 3]) return s.scaleX += (s.data.scaleX - 1 + r[r.length - 2] - s.scaleX) * i, void(s.scaleY += (s.data.scaleY - 1 + r[r.length - 1] - s.scaleY) * i);
                var o = n.binarySearch(r, e, 3),
                    a = r[o - 2],
                    h = r[o - 1],
                    l = r[o],
                    u = 1 - (e - l) / (r[o + -3] - l);
                u = this.curves.getCurvePercent(o / 3 - 1, u), s.scaleX += (s.data.scaleX - 1 + a + (r[o + 1] - a) * u - s.scaleX) * i, s.scaleY += (s.data.scaleY - 1 + h + (r[o + 2] - h) * u - s.scaleY) * i
            }
        }
    }, n.ColorTimeline = function(t) {
        this.curves = new n.Curves(t), this.frames = [], this.frames.length = 5 * t
    }, n.ColorTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 5
        },
        setFrame: function(t, e, i, r, s, n) {
            t *= 5, this.frames[t] = e, this.frames[t + 1] = i, this.frames[t + 2] = r, this.frames[t + 3] = s, this.frames[t + 4] = n
        },
        apply: function(t, e, i) {
            var r = this.frames;
            if(!(e < r[0])) {
                var s = t.slots[this.slotIndex];
                if(e >= r[r.length - 5]) {
                    var o = r.length - 1;
                    return s.r = r[o - 3], s.g = r[o - 2], s.b = r[o - 1], void(s.a = r[o])
                }
                var a = n.binarySearch(r, e, 5),
                    h = r[a - 4],
                    l = r[a - 3],
                    u = r[a - 2],
                    c = r[a - 1],
                    d = r[a],
                    p = 1 - (e - d) / (r[a - 5] - d);
                p = this.curves.getCurvePercent(a / 5 - 1, p);
                var f = h + (r[a + 1] - h) * p,
                    g = l + (r[a + 2] - l) * p,
                    m = u + (r[a + 3] - u) * p,
                    v = c + (r[a + 4] - c) * p;
                1 > i ? (s.r += (f - s.r) * i, s.g += (g - s.g) * i, s.b += (m - s.b) * i, s.a += (v - s.a) * i) : (s.r = f, s.g = g, s.b = m, s.a = v)
            }
        }
    }, n.AttachmentTimeline = function(t) {
        this.curves = new n.Curves(t), this.frames = [], this.frames.length = t, this.attachmentNames = [], this.attachmentNames.length = t
    }, n.AttachmentTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function() {
            return this.frames.length
        },
        setFrame: function(t, e, i) {
            this.frames[t] = e, this.attachmentNames[t] = i
        },
        apply: function(t, e) {
            var i = this.frames;
            if(!(e < i[0])) {
                var r;
                r = e >= i[i.length - 1] ? i.length - 1 : n.binarySearch(i, e, 1) - 1;
                var s = this.attachmentNames[r];
                t.slots[this.slotIndex].setAttachment(s ? t.getAttachmentBySlotIndex(this.slotIndex, s) : null)
            }
        }
    }, n.SkeletonData = function() {
        this.bones = [], this.slots = [], this.skins = [], this.animations = []
    }, n.SkeletonData.prototype = {
        defaultSkin: null,
        findBone: function(t) {
            for(var e = this.bones, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return e[i];
            return null
        },
        findBoneIndex: function(t) {
            for(var e = this.bones, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return i;
            return -1
        },
        findSlot: function(t) {
            for(var e = this.slots, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return slot[i];
            return null
        },
        findSlotIndex: function(t) {
            for(var e = this.slots, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return i;
            return -1
        },
        findSkin: function(t) {
            for(var e = this.skins, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return e[i];
            return null
        },
        findAnimation: function(t) {
            for(var e = this.animations, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return e[i];
            return null
        }
    }, n.Skeleton = function(t) {
        this.data = t, this.bones = [];
        for(var e = 0, i = t.bones.length; i > e; e++) {
            var r = t.bones[e],
                s = r.parent ? this.bones[t.bones.indexOf(r.parent)] : null;
            this.bones.push(new n.Bone(r, s))
        }
        for(this.slots = [], this.drawOrder = [], e = 0, i = t.slots.length; i > e; e++) {
            var o = t.slots[e],
                a = this.bones[t.bones.indexOf(o.boneData)],
                h = new n.Slot(o, this, a);
            this.slots.push(h), this.drawOrder.push(h)
        }
    }, n.Skeleton.prototype = {
        x: 0,
        y: 0,
        skin: null,
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        time: 0,
        flipX: !1,
        flipY: !1,
        updateWorldTransform: function() {
            for(var t = this.flipX, e = this.flipY, i = this.bones, r = 0, s = i.length; s > r; r++) i[r].updateWorldTransform(t, e)
        },
        setToSetupPose: function() {
            this.setBonesToSetupPose(), this.setSlotsToSetupPose()
        },
        setBonesToSetupPose: function() {
            for(var t = this.bones, e = 0, i = t.length; i > e; e++) t[e].setToSetupPose()
        },
        setSlotsToSetupPose: function() {
            for(var t = this.slots, e = 0, i = t.length; i > e; e++) t[e].setToSetupPose(e)
        },
        getRootBone: function() {
            return this.bones.length ? this.bones[0] : null
        },
        findBone: function(t) {
            for(var e = this.bones, i = 0, r = e.length; r > i; i++)
                if(e[i].data.name == t) return e[i];
            return null
        },
        findBoneIndex: function(t) {
            for(var e = this.bones, i = 0, r = e.length; r > i; i++)
                if(e[i].data.name == t) return i;
            return -1
        },
        findSlot: function(t) {
            for(var e = this.slots, i = 0, r = e.length; r > i; i++)
                if(e[i].data.name == t) return e[i];
            return null
        },
        findSlotIndex: function(t) {
            for(var e = this.slots, i = 0, r = e.length; r > i; i++)
                if(e[i].data.name == t) return i;
            return -1
        },
        setSkinByName: function(t) {
            var e = this.data.findSkin(t);
            if(!e) throw "Skin not found: " + t;
            this.setSkin(e)
        },
        setSkin: function(t) {
            this.skin && t && t._attachAll(this, this.skin), this.skin = t
        },
        getAttachmentBySlotName: function(t, e) {
            return this.getAttachmentBySlotIndex(this.data.findSlotIndex(t), e)
        },
        getAttachmentBySlotIndex: function(t, e) {
            if(this.skin) {
                var i = this.skin.getAttachment(t, e);
                if(i) return i
            }
            return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(t, e) : null
        },
        setAttachment: function(t, e) {
            for(var i = this.slots, r = 0, s = i.size; s > r; r++) {
                var n = i[r];
                if(n.data.name == t) {
                    var o = null;
                    if(e && (o = this.getAttachment(r, e), null == o)) throw "Attachment not found: " + e + ", for slot: " + t;
                    return void n.setAttachment(o)
                }
            }
            throw "Slot not found: " + t
        },
        update: function(t) {
            time += t
        }
    }, n.AttachmentType = {
        region: 0
    }, n.RegionAttachment = function() {
        this.offset = [], this.offset.length = 8, this.uvs = [], this.uvs.length = 8
    }, n.RegionAttachment.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        width: 0,
        height: 0,
        rendererObject: null,
        regionOffsetX: 0,
        regionOffsetY: 0,
        regionWidth: 0,
        regionHeight: 0,
        regionOriginalWidth: 0,
        regionOriginalHeight: 0,
        setUVs: function(t, e, i, r, s) {
            var n = this.uvs;
            s ? (n[2] = t, n[3] = r, n[4] = t, n[5] = e, n[6] = i, n[7] = e, n[0] = i, n[1] = r) : (n[0] = t, n[1] = r, n[2] = t, n[3] = e, n[4] = i, n[5] = e, n[6] = i, n[7] = r)
        },
        updateOffset: function() {
            var t = this.width / this.regionOriginalWidth * this.scaleX,
                e = this.height / this.regionOriginalHeight * this.scaleY,
                i = -this.width / 2 * this.scaleX + this.regionOffsetX * t,
                r = -this.height / 2 * this.scaleY + this.regionOffsetY * e,
                s = i + this.regionWidth * t,
                n = r + this.regionHeight * e,
                o = this.rotation * Math.PI / 180,
                a = Math.cos(o),
                h = Math.sin(o),
                l = i * a + this.x,
                u = i * h,
                c = r * a + this.y,
                d = r * h,
                p = s * a + this.x,
                f = s * h,
                g = n * a + this.y,
                m = n * h,
                v = this.offset;
            v[0] = l - d, v[1] = c + u, v[2] = l - m, v[3] = g + u, v[4] = p - m, v[5] = g + f, v[6] = p - d, v[7] = c + f
        },
        computeVertices: function(t, e, i, r) {
            t += i.worldX, e += i.worldY;
            var s = i.m00,
                n = i.m01,
                o = i.m10,
                a = i.m11,
                h = this.offset;
            r[0] = h[0] * s + h[1] * n + t, r[1] = h[0] * o + h[1] * a + e, r[2] = h[2] * s + h[3] * n + t, r[3] = h[2] * o + h[3] * a + e, r[4] = h[4] * s + h[5] * n + t, r[5] = h[4] * o + h[5] * a + e, r[6] = h[6] * s + h[7] * n + t, r[7] = h[6] * o + h[7] * a + e
        }
    }, n.AnimationStateData = function(t) {
        this.skeletonData = t, this.animationToMixTime = {}
    }, n.AnimationStateData.prototype = {
        defaultMix: 0,
        setMixByName: function(t, e, i) {
            var r = this.skeletonData.findAnimation(t);
            if(!r) throw "Animation not found: " + t;
            var s = this.skeletonData.findAnimation(e);
            if(!s) throw "Animation not found: " + e;
            this.setMix(r, s, i)
        },
        setMix: function(t, e, i) {
            this.animationToMixTime[t.name + ":" + e.name] = i
        },
        getMix: function(t, e) {
            var i = this.animationToMixTime[t.name + ":" + e.name];
            return i ? i : this.defaultMix
        }
    }, n.AnimationState = function(t) {
        this.data = t, this.queue = []
    }, n.AnimationState.prototype = {
        animationSpeed: 1,
        current: null,
        previous: null,
        currentTime: 0,
        previousTime: 0,
        currentLoop: !1,
        previousLoop: !1,
        mixTime: 0,
        mixDuration: 0,
        update: function(t) {
            if(this.currentTime += t * this.animationSpeed, this.previousTime += t, this.mixTime += t, this.queue.length > 0) {
                var e = this.queue[0];
                this.currentTime >= e.delay && (this._setAnimation(e.animation, e.loop), this.queue.shift())
            }
        },
        apply: function(t) {
            if(this.current)
                if(this.previous) {
                    this.previous.apply(t, this.previousTime, this.previousLoop);
                    var e = this.mixTime / this.mixDuration;
                    e >= 1 && (e = 1, this.previous = null), this.current.mix(t, this.currentTime, this.currentLoop, e)
                } else this.current.apply(t, this.currentTime, this.currentLoop)
        },
        clearAnimation: function() {
            this.previous = null, this.current = null, this.queue.length = 0
        },
        _setAnimation: function(t, e) {
            this.previous = null, t && this.current && (this.mixDuration = this.data.getMix(this.current, t), this.mixDuration > 0 && (this.mixTime = 0, this.previous = this.current, this.previousTime = this.currentTime, this.previousLoop = this.currentLoop)), this.current = t, this.currentLoop = e, this.currentTime = 0
        },
        setAnimationByName: function(t, e) {
            var i = this.data.skeletonData.findAnimation(t);
            if(!i) throw "Animation not found: " + t;
            this.setAnimation(i, e)
        },
        setAnimation: function(t, e) {
            this.queue.length = 0, this._setAnimation(t, e)
        },
        addAnimationByName: function(t, e, i) {
            var r = this.data.skeletonData.findAnimation(t);
            if(!r) throw "Animation not found: " + t;
            this.addAnimation(r, e, i)
        },
        addAnimation: function(t, e, i) {
            var r = {};
            if(r.animation = t, r.loop = e, !i || 0 >= i) {
                var s = this.queue.length ? this.queue[this.queue.length - 1].animation : this.current;
                i = null != s ? s.duration - this.data.getMix(s, t) + (i || 0) : 0
            }
            r.delay = i, this.queue.push(r)
        },
        isComplete: function() {
            return !this.current || this.currentTime >= this.current.duration
        }
    }, n.SkeletonJson = function(t) {
        this.attachmentLoader = t
    }, n.SkeletonJson.prototype = {
        scale: 1,
        readSkeletonData: function(t) {
            for(var e, i = new n.SkeletonData, r = t.bones, s = 0, o = r.length; o > s; s++) {
                var a = r[s],
                    h = null;
                if(a.parent && (h = i.findBone(a.parent), !h)) throw "Parent bone not found: " + a.parent;
                e = new n.BoneData(a.name, h), e.length = (a.length || 0) * this.scale, e.x = (a.x || 0) * this.scale, e.y = (a.y || 0) * this.scale, e.rotation = a.rotation || 0, e.scaleX = a.scaleX || 1, e.scaleY = a.scaleY || 1, i.bones.push(e)
            }
            var l = t.slots;
            for(s = 0, o = l.length; o > s; s++) {
                var u = l[s];
                if(e = i.findBone(u.bone), !e) throw "Slot bone not found: " + u.bone;
                var c = new n.SlotData(u.name, e),
                    d = u.color;
                d && (c.r = n.SkeletonJson.toColor(d, 0), c.g = n.SkeletonJson.toColor(d, 1), c.b = n.SkeletonJson.toColor(d, 2), c.a = n.SkeletonJson.toColor(d, 3)), c.attachmentName = u.attachment, i.slots.push(c)
            }
            var p = t.skins;
            for(var f in p)
                if(p.hasOwnProperty(f)) {
                    var g = p[f],
                        m = new n.Skin(f);
                    for(var v in g)
                        if(g.hasOwnProperty(v)) {
                            var x = i.findSlotIndex(v),
                                y = g[v];
                            for(var b in y)
                                if(y.hasOwnProperty(b)) {
                                    var T = this.readAttachment(m, b, y[b]);
                                    null != T && m.addAttachment(x, b, T)
                                }
                        }
                    i.skins.push(m), "default" == m.name && (i.defaultSkin = m)
                }
            var w = t.animations;
            for(var S in w) w.hasOwnProperty(S) && this.readAnimation(S, w[S], i);
            return i
        },
        readAttachment: function(t, e, i) {
            e = i.name || e;
            var r = n.AttachmentType[i.type || "region"];
            if(r == n.AttachmentType.region) {
                var s = new n.RegionAttachment;
                return s.x = (i.x || 0) * this.scale, s.y = (i.y || 0) * this.scale, s.scaleX = i.scaleX || 1, s.scaleY = i.scaleY || 1, s.rotation = i.rotation || 0, s.width = (i.width || 32) * this.scale, s.height = (i.height || 32) * this.scale, s.updateOffset(), s.rendererObject = {}, s.rendererObject.name = e, s.rendererObject.scale = {}, s.rendererObject.scale.x = s.scaleX, s.rendererObject.scale.y = s.scaleY, s.rendererObject.rotation = -s.rotation * Math.PI / 180, s
            }
            throw "Unknown attachment type: " + r
        },
        readAnimation: function(t, e, i) {
            var r, s, o, a, h, l, u, c = [],
                d = 0,
                p = e.bones;
            for(var f in p)
                if(p.hasOwnProperty(f)) {
                    var g = i.findBoneIndex(f);
                    if(-1 == g) throw "Bone not found: " + f;
                    var m = p[f];
                    for(o in m)
                        if(m.hasOwnProperty(o))
                            if(h = m[o], "rotate" == o) {
                                for(s = new n.RotateTimeline(h.length), s.boneIndex = g, r = 0, l = 0, u = h.length; u > l; l++) a = h[l], s.setFrame(r, a.time, a.angle), n.SkeletonJson.readCurve(s, r, a), r++;
                                c.push(s), d = Math.max(d, s.frames[2 * s.getFrameCount() - 2])
                            } else {
                                if("translate" != o && "scale" != o) throw "Invalid timeline type for a bone: " + o + " (" + f + ")";
                                var v = 1;
                                for("scale" == o ? s = new n.ScaleTimeline(h.length) : (s = new n.TranslateTimeline(h.length), v = this.scale), s.boneIndex = g, r = 0, l = 0, u = h.length; u > l; l++) {
                                    a = h[l];
                                    var x = (a.x || 0) * v,
                                        y = (a.y || 0) * v;
                                    s.setFrame(r, a.time, x, y), n.SkeletonJson.readCurve(s, r, a), r++
                                }
                                c.push(s), d = Math.max(d, s.frames[3 * s.getFrameCount() - 3])
                            }
                }
            var b = e.slots;
            for(var T in b)
                if(b.hasOwnProperty(T)) {
                    var w = b[T],
                        S = i.findSlotIndex(T);
                    for(o in w)
                        if(w.hasOwnProperty(o))
                            if(h = w[o], "color" == o) {
                                for(s = new n.ColorTimeline(h.length), s.slotIndex = S, r = 0, l = 0, u = h.length; u > l; l++) {
                                    a = h[l];
                                    var E = a.color,
                                        C = n.SkeletonJson.toColor(E, 0),
                                        A = n.SkeletonJson.toColor(E, 1),
                                        _ = n.SkeletonJson.toColor(E, 2),
                                        R = n.SkeletonJson.toColor(E, 3);
                                    s.setFrame(r, a.time, C, A, _, R), n.SkeletonJson.readCurve(s, r, a), r++
                                }
                                c.push(s), d = Math.max(d, s.frames[5 * s.getFrameCount() - 5])
                            } else {
                                if("attachment" != o) throw "Invalid timeline type for a slot: " + o + " (" + T + ")";
                                for(s = new n.AttachmentTimeline(h.length), s.slotIndex = S, r = 0, l = 0, u = h.length; u > l; l++) a = h[l], s.setFrame(r++, a.time, a.name);
                                c.push(s), d = Math.max(d, s.frames[s.getFrameCount() - 1])
                            }
                }
            i.animations.push(new n.Animation(t, c, d))
        }
    }, n.SkeletonJson.readCurve = function(t, e, i) {
        var r = i.curve;
        r && ("stepped" == r ? t.curves.setStepped(e) : r instanceof Array && t.curves.setCurve(e, r[0], r[1], r[2], r[3]))
    }, n.SkeletonJson.toColor = function(t, e) {
        if(8 != t.length) throw "Color hexidecimal length must be 8, recieved: " + t;
        return parseInt(t.substr(2 * e, 2), 16) / 255
    }, n.Atlas = function(t, e) {
        this.textureLoader = e, this.pages = [], this.regions = [];
        var i = new n.AtlasReader(t),
            r = [];
        r.length = 4;
        for(var s = null;;) {
            var o = i.readLine();
            if(null == o) break;
            if(o = i.trim(o), o.length)
                if(s) {
                    var a = new n.AtlasRegion;
                    a.name = o, a.page = s, a.rotate = "true" == i.readValue(), i.readTuple(r);
                    var h = parseInt(r[0], 10),
                        l = parseInt(r[1], 10);
                    i.readTuple(r);
                    var u = parseInt(r[0], 10),
                        c = parseInt(r[1], 10);
                    a.u = h / s.width, a.v = l / s.height, a.rotate ? (a.u2 = (h + c) / s.width, a.v2 = (l + u) / s.height) : (a.u2 = (h + u) / s.width, a.v2 = (l + c) / s.height), a.x = h, a.y = l, a.width = Math.abs(u), a.height = Math.abs(c), 4 == i.readTuple(r) && (a.splits = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10)], 4 == i.readTuple(r) && (a.pads = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10)], i.readTuple(r))), a.originalWidth = parseInt(r[0], 10), a.originalHeight = parseInt(r[1], 10), i.readTuple(r), a.offsetX = parseInt(r[0], 10), a.offsetY = parseInt(r[1], 10), a.index = parseInt(i.readValue(), 10), this.regions.push(a)
                } else {
                    s = new n.AtlasPage, s.name = o, s.format = n.Atlas.Format[i.readValue()], i.readTuple(r), s.minFilter = n.Atlas.TextureFilter[r[0]], s.magFilter = n.Atlas.TextureFilter[r[1]];
                    var d = i.readValue();
                    s.uWrap = n.Atlas.TextureWrap.clampToEdge, s.vWrap = n.Atlas.TextureWrap.clampToEdge, "x" == d ? s.uWrap = n.Atlas.TextureWrap.repeat : "y" == d ? s.vWrap = n.Atlas.TextureWrap.repeat : "xy" == d && (s.uWrap = s.vWrap = n.Atlas.TextureWrap.repeat), e.load(s, o), this.pages.push(s)
                }
            else s = null
        }
    }, n.Atlas.prototype = {
        findRegion: function(t) {
            for(var e = this.regions, i = 0, r = e.length; r > i; i++)
                if(e[i].name == t) return e[i];
            return null
        },
        dispose: function() {
            for(var t = this.pages, e = 0, i = t.length; i > e; e++) this.textureLoader.unload(t[e].rendererObject)
        },
        updateUVs: function(t) {
            for(var e = this.regions, i = 0, r = e.length; r > i; i++) {
                var s = e[i];
                s.page == t && (s.u = s.x / t.width, s.v = s.y / t.height, s.rotate ? (s.u2 = (s.x + s.height) / t.width, s.v2 = (s.y + s.width) / t.height) : (s.u2 = (s.x + s.width) / t.width, s.v2 = (s.y + s.height) / t.height))
            }
        }
    }, n.Atlas.Format = {
        alpha: 0,
        intensity: 1,
        luminanceAlpha: 2,
        rgb565: 3,
        rgba4444: 4,
        rgb888: 5,
        rgba8888: 6
    }, n.Atlas.TextureFilter = {
        nearest: 0,
        linear: 1,
        mipMap: 2,
        mipMapNearestNearest: 3,
        mipMapLinearNearest: 4,
        mipMapNearestLinear: 5,
        mipMapLinearLinear: 6
    }, n.Atlas.TextureWrap = {
        mirroredRepeat: 0,
        clampToEdge: 1,
        repeat: 2
    }, n.AtlasPage = function() {}, n.AtlasPage.prototype = {
        name: null,
        format: null,
        minFilter: null,
        magFilter: null,
        uWrap: null,
        vWrap: null,
        rendererObject: null,
        width: 0,
        height: 0
    }, n.AtlasRegion = function() {}, n.AtlasRegion.prototype = {
        page: null,
        name: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        u: 0,
        v: 0,
        u2: 0,
        v2: 0,
        offsetX: 0,
        offsetY: 0,
        originalWidth: 0,
        originalHeight: 0,
        index: 0,
        rotate: !1,
        splits: null,
        pads: null
    }, n.AtlasReader = function(t) {
        this.lines = t.split(/\r\n|\r|\n/)
    }, n.AtlasReader.prototype = {
        index: 0,
        trim: function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        readLine: function() {
            return this.index >= this.lines.length ? null : this.lines[this.index++]
        },
        readValue: function() {
            var t = this.readLine(),
                e = t.indexOf(":");
            if(-1 == e) throw "Invalid line: " + t;
            return this.trim(t.substring(e + 1))
        },
        readTuple: function(t) {
            var e = this.readLine(),
                i = e.indexOf(":");
            if(-1 == i) throw "Invalid line: " + e;
            for(var r = 0, s = i + 1; 3 > r; r++) {
                var n = e.indexOf(",", s);
                if(-1 == n) {
                    if(!r) throw "Invalid line: " + e;
                    break
                }
                t[r] = this.trim(e.substr(s, n - s)), s = n + 1
            }
            return t[r] = this.trim(e.substring(s)), r + 1
        }
    }, n.AtlasAttachmentLoader = function(t) {
        this.atlas = t
    }, n.AtlasAttachmentLoader.prototype = {
        newAttachment: function(t, e, i) {
            switch(e) {
                case n.AttachmentType.region:
                    var r = this.atlas.findRegion(i);
                    if(!r) throw "Region not found in atlas: " + i + " (" + e + ")";
                    var s = new n.RegionAttachment(i);
                    return s.rendererObject = r, s.setUVs(r.u, r.v, r.u2, r.v2, r.rotate), s.regionOffsetX = r.offsetX, s.regionOffsetY = r.offsetY, s.regionWidth = r.width, s.regionHeight = r.height, s.regionOriginalWidth = r.originalWidth, s.regionOriginalHeight = r.originalHeight, s
            }
            throw "Unknown attachment type: " + e
        }
    }, n.Bone.yDown = !0, e.AnimCache = {}, e.Spine = function(t) {
        if(e.DisplayObjectContainer.call(this), this.spineData = e.AnimCache[t], !this.spineData) throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + t);
        this.skeleton = new n.Skeleton(this.spineData), this.skeleton.updateWorldTransform(), this.stateData = new n.AnimationStateData(this.spineData), this.state = new n.AnimationState(this.stateData), this.slotContainers = [];
        for(var i = 0, r = this.skeleton.drawOrder.length; r > i; i++) {
            var s = this.skeleton.drawOrder[i],
                o = s.attachment,
                a = new e.DisplayObjectContainer;
            if(this.slotContainers.push(a), this.addChild(a), o instanceof n.RegionAttachment) {
                var h = o.rendererObject.name,
                    l = this.createSprite(s, o.rendererObject);
                s.currentSprite = l, s.currentSpriteName = h, a.addChild(l)
            }
        }
    }, e.Spine.prototype = Object.create(e.DisplayObjectContainer.prototype), e.Spine.prototype.constructor = e.Spine, e.Spine.prototype.updateTransform = function() {
        this.lastTime = this.lastTime || Date.now();
        var t = .001 * (Date.now() - this.lastTime);
        this.lastTime = Date.now(), this.state.update(t), this.state.apply(this.skeleton), this.skeleton.updateWorldTransform();
        for(var i = this.skeleton.drawOrder, r = 0, s = i.length; s > r; r++) {
            var o = i[r],
                a = o.attachment,
                h = this.slotContainers[r];
            if(a instanceof n.RegionAttachment) {
                if(a.rendererObject && (!o.currentSpriteName || o.currentSpriteName != a.name)) {
                    var l = a.rendererObject.name;
                    if(void 0 !== o.currentSprite && (o.currentSprite.visible = !1), o.sprites = o.sprites || {}, void 0 !== o.sprites[l]) o.sprites[l].visible = !0;
                    else {
                        var u = this.createSprite(o, a.rendererObject);
                        h.addChild(u)
                    }
                    o.currentSprite = o.sprites[l], o.currentSpriteName = l
                }
                h.visible = !0;
                var c = o.bone;
                h.position.x = c.worldX + a.x * c.m00 + a.y * c.m01, h.position.y = c.worldY + a.x * c.m10 + a.y * c.m11, h.scale.x = c.worldScaleX, h.scale.y = c.worldScaleY, h.rotation = -(o.bone.worldRotation * Math.PI / 180), h.alpha = o.a, o.currentSprite.tint = e.rgb2hex([o.r, o.g, o.b])
            } else h.visible = !1
        }
        e.DisplayObjectContainer.prototype.updateTransform.call(this)
    }, e.Spine.prototype.createSprite = function(t, i) {
        var r = e.TextureCache[i.name] ? i.name : i.name + ".png",
            s = new e.Sprite(e.Texture.fromFrame(r));
        return s.scale = i.scale, s.rotation = i.rotation, s.anchor.x = s.anchor.y = .5, t.sprites = t.sprites || {}, t.sprites[i.name] = s, s
    }, e.BaseTextureCache = {}, e.texturesToUpdate = [], e.texturesToDestroy = [], e.BaseTextureCacheIdGenerator = 0, e.BaseTexture = function(t, i) {
        if(e.EventTarget.call(this), this.width = 100, this.height = 100, this.scaleMode = i || e.scaleModes.DEFAULT, this.hasLoaded = !1, this.source = t, this.id = e.BaseTextureCacheIdGenerator++, this.premultipliedAlpha = !0, this._glTextures = [], this._dirty = [], t) {
            if((this.source.complete || this.source.getContext) && this.source.width && this.source.height) this.hasLoaded = !0, this.width = this.source.width, this.height = this.source.height, e.texturesToUpdate.push(this);
            else {
                var r = this;
                this.source.onload = function() {
                    r.hasLoaded = !0, r.width = r.source.width, r.height = r.source.height;
                    for(var t = 0; t < r._glTextures.length; t++) r._dirty[t] = !0;
                    r.dispatchEvent({
                        type: "loaded",
                        content: r
                    })
                }, this.source.onerror = function() {
                    r.dispatchEvent({
                        type: "error",
                        content: r
                    })
                }
            }
            this.imageUrl = null, this._powerOf2 = !1
        }
    }, e.BaseTexture.prototype.constructor = e.BaseTexture, e.BaseTexture.prototype.destroy = function() {
        this.imageUrl ? (delete e.BaseTextureCache[this.imageUrl], delete e.TextureCache[this.imageUrl], this.imageUrl = null, this.source.src = null) : this.source && this.source._pixiId && delete e.BaseTextureCache[this.source._pixiId], this.source = null, e.texturesToDestroy.push(this)
    }, e.BaseTexture.prototype.updateSourceImage = function(t) {
        this.hasLoaded = !1, this.source.src = null, this.source.src = t
    }, e.BaseTexture.fromImage = function(t, i, r) {
        var s = e.BaseTextureCache[t];
        if(void 0 === i && -1 === t.indexOf("data:") && (i = !0), !s) {
            var n = new Image;
            i && (n.crossOrigin = ""), n.src = t, s = new e.BaseTexture(n, r), s.imageUrl = t, e.BaseTextureCache[t] = s
        }
        return s
    }, e.BaseTexture.fromCanvas = function(t, i) {
        t._pixiId || (t._pixiId = "canvas_" + e.TextureCacheIdGenerator++);
        var r = e.BaseTextureCache[t._pixiId];
        return r || (r = new e.BaseTexture(t, i), e.BaseTextureCache[t._pixiId] = r), r
    }, e.TextureCache = {}, e.FrameCache = {}, e.TextureCacheIdGenerator = 0, e.Texture = function(t, i) {
        if(e.EventTarget.call(this), this.noFrame = !1, i || (this.noFrame = !0, i = new e.Rectangle(0, 0, 1, 1)), t instanceof e.Texture && (t = t.baseTexture), this.baseTexture = t, this.frame = i, this.trim = null, this.valid = !1, this.scope = this, this._uvs = null, this.width = 0, this.height = 0, this.crop = new e.Rectangle(0, 0, 1, 1), t.hasLoaded) this.noFrame && (i = new e.Rectangle(0, 0, t.width, t.height)), this.setFrame(i);
        else {
            var r = this;
            t.addEventListener("loaded", function() {
                r.onBaseTextureLoaded()
            })
        }
    }, e.Texture.prototype.constructor = e.Texture, e.Texture.prototype.onBaseTextureLoaded = function() {
        var t = this.baseTexture;
        t.removeEventListener("loaded", this.onLoaded), this.noFrame && (this.frame = new e.Rectangle(0, 0, t.width, t.height)), this.setFrame(this.frame), this.scope.dispatchEvent({
            type: "update",
            content: this
        })
    }, e.Texture.prototype.destroy = function(t) {
        t && this.baseTexture.destroy(), this.valid = !1
    }, e.Texture.prototype.setFrame = function(t) {
        if(this.noFrame = !1, this.frame = t, this.width = t.width, this.height = t.height, this.crop.x = t.x, this.crop.y = t.y, this.crop.width = t.width, this.crop.height = t.height, !this.trim && (t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height)) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
        this.valid = t && t.width && t.height && this.baseTexture.source && this.baseTexture.hasLoaded, this.trim && (this.width = this.trim.width, this.height = this.trim.height, this.frame.width = this.trim.width, this.frame.height = this.trim.height), this.valid && e.Texture.frameUpdates.push(this)
    }, e.Texture.prototype._updateWebGLuvs = function() {
        this._uvs || (this._uvs = new e.TextureUvs);
        var t = this.crop,
            i = this.baseTexture.width,
            r = this.baseTexture.height;
        this._uvs.x0 = t.x / i, this._uvs.y0 = t.y / r, this._uvs.x1 = (t.x + t.width) / i, this._uvs.y1 = t.y / r, this._uvs.x2 = (t.x + t.width) / i, this._uvs.y2 = (t.y + t.height) / r, this._uvs.x3 = t.x / i, this._uvs.y3 = (t.y + t.height) / r
    }, e.Texture.fromImage = function(t, i, r) {
        var s = e.TextureCache[t];
        return s || (s = new e.Texture(e.BaseTexture.fromImage(t, i, r)), e.TextureCache[t] = s), s
    }, e.Texture.fromFrame = function(t) {
        var i = e.TextureCache[t];
        if(!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache ');
        return i
    }, e.Texture.fromCanvas = function(t, i) {
        var r = e.BaseTexture.fromCanvas(t, i);
        return new e.Texture(r)
    }, e.Texture.addTextureToCache = function(t, i) {
        e.TextureCache[i] = t
    }, e.Texture.removeTextureFromCache = function(t) {
        var i = e.TextureCache[t];
        return delete e.TextureCache[t], delete e.BaseTextureCache[t], i
    }, e.Texture.frameUpdates = [], e.TextureUvs = function() {
        this.x0 = 0, this.y0 = 0, this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.x3 = 0, this.y3 = 0
    }, e.RenderTexture = function(t, i, r, s) {
        if(e.EventTarget.call(this), this.width = t || 100, this.height = i || 100, this.frame = new e.Rectangle(0, 0, this.width, this.height), this.crop = new e.Rectangle(0, 0, this.width, this.height), this.baseTexture = new e.BaseTexture, this.baseTexture.width = this.width, this.baseTexture.height = this.height, this.baseTexture._glTextures = [], this.baseTexture.scaleMode = s || e.scaleModes.DEFAULT, this.baseTexture.hasLoaded = !0, this.renderer = r || e.defaultRenderer, this.renderer.type === e.WEBGL_RENDERER) {
            var n = this.renderer.gl;
            this.textureBuffer = new e.FilterTexture(n, this.width, this.height, this.baseTexture.scaleMode), this.baseTexture._glTextures[n.id] = this.textureBuffer.texture, this.render = this.renderWebGL, this.projection = new e.Point(this.width / 2, -this.height / 2)
        } else this.render = this.renderCanvas, this.textureBuffer = new e.CanvasBuffer(this.width, this.height), this.baseTexture.source = this.textureBuffer.canvas;
        this.valid = !0, e.Texture.frameUpdates.push(this)
    }, e.RenderTexture.prototype = Object.create(e.Texture.prototype), e.RenderTexture.prototype.constructor = e.RenderTexture, e.RenderTexture.prototype.resize = function(t, i, r) {
        (t !== this.width || i !== this.height) && (this.width = this.frame.width = this.crop.width = t, this.height = this.frame.height = this.crop.height = i, r && (this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.renderer.type === e.WEBGL_RENDERER && (this.projection.x = this.width / 2, this.projection.y = -this.height / 2), this.textureBuffer.resize(this.width, this.height))
    }, e.RenderTexture.prototype.clear = function() {
        this.renderer.type === e.WEBGL_RENDERER && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear()
    }, e.RenderTexture.prototype.renderWebGL = function(t, i, r) {
        var s = this.renderer.gl;
        s.colorMask(!0, !0, !0, !0), s.viewport(0, 0, this.width, this.height), s.bindFramebuffer(s.FRAMEBUFFER, this.textureBuffer.frameBuffer), r && this.textureBuffer.clear();
        var n = t.children,
            o = t.worldTransform;
        t.worldTransform = e.RenderTexture.tempMatrix, t.worldTransform.d = -1, t.worldTransform.ty = -2 * this.projection.y, i && (t.worldTransform.tx = i.x, t.worldTransform.ty -= i.y);
        for(var a = 0, h = n.length; h > a; a++) n[a].updateTransform();
        e.WebGLRenderer.updateTextures(), this.renderer.spriteBatch.dirty = !0, this.renderer.renderDisplayObject(t, this.projection, this.textureBuffer.frameBuffer), t.worldTransform = o, this.renderer.spriteBatch.dirty = !0
    }, e.RenderTexture.prototype.renderCanvas = function(t, i, r) {
        var s = t.children,
            n = t.worldTransform;
        t.worldTransform = e.RenderTexture.tempMatrix, i ? (t.worldTransform.tx = i.x, t.worldTransform.ty = i.y) : (t.worldTransform.tx = 0, t.worldTransform.ty = 0);
        for(var o = 0, a = s.length; a > o; o++) s[o].updateTransform();
        r && this.textureBuffer.clear();
        var h = this.textureBuffer.context;
        this.renderer.renderDisplayObject(t, h), h.setTransform(1, 0, 0, 1, 0, 0), t.worldTransform = n
    }, e.RenderTexture.tempMatrix = new e.Matrix, e.AssetLoader = function(t, i) {
        e.EventTarget.call(this), this.assetURLs = t, this.crossorigin = i, this.loadersByType = {
            jpg: e.ImageLoader,
            jpeg: e.ImageLoader,
            png: e.ImageLoader,
            gif: e.ImageLoader,
            webp: e.ImageLoader,
            json: e.JsonLoader,
            atlas: e.AtlasLoader,
            anim: e.SpineLoader,
            xml: e.BitmapFontLoader,
            fnt: e.BitmapFontLoader
        }
    }, e.AssetLoader.prototype.constructor = e.AssetLoader, e.AssetLoader.prototype._getDataType = function(t) {
        var e = "data:",
            i = t.slice(0, e.length).toLowerCase();
        if(i === e) {
            var r = t.slice(e.length),
                s = r.indexOf(",");
            if(-1 === s) return null;
            var n = r.slice(0, s).split(";")[0];
            return n && "text/plain" !== n.toLowerCase() ? n.split("/").pop().toLowerCase() : "txt"
        }
        return null
    }, e.AssetLoader.prototype.load = function() {
        function t(t) {
            e.onAssetLoaded(t.content)
        }
        var e = this;
        this.loadCount = this.assetURLs.length;
        for(var i = 0; i < this.assetURLs.length; i++) {
            var r = this.assetURLs[i],
                s = this._getDataType(r);
            s || (s = r.split("?").shift().split(".").pop().toLowerCase());
            var n = this.loadersByType[s];
            if(!n) throw new Error(s + " is an unsupported file type");
            var o = new n(r, this.crossorigin);
            o.addEventListener("loaded", t), o.load()
        }
    }, e.AssetLoader.prototype.onAssetLoaded = function(t) {
        this.loadCount--, this.dispatchEvent({
            type: "onProgress",
            content: this,
            loader: t
        }), this.onProgress && this.onProgress(t), this.loadCount || (this.dispatchEvent({
            type: "onComplete",
            content: this
        }), this.onComplete && this.onComplete())
    }, e.JsonLoader = function(t, i) {
        e.EventTarget.call(this), this.url = t, this.crossorigin = i, this.baseUrl = t.replace(/[^\/]*$/, ""), this.loaded = !1
    }, e.JsonLoader.prototype.constructor = e.JsonLoader, e.JsonLoader.prototype.load = function() {
        var t = this;
        window.XDomainRequest && t.crossorigin ? (this.ajaxRequest = new window.XDomainRequest, this.ajaxRequest.timeout = 3e3, this.ajaxRequest.onerror = function() {
            t.onError()
        }, this.ajaxRequest.ontimeout = function() {
            t.onError()
        }, this.ajaxRequest.onprogress = function() {}) : this.ajaxRequest = window.XMLHttpRequest ? new window.XMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP"), this.ajaxRequest.onload = function() {
            t.onJSONLoaded()
        }, this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.send()
    }, e.JsonLoader.prototype.onJSONLoaded = function() {
        if(!this.ajaxRequest.responseText) return void this.onError();
        if(this.json = JSON.parse(this.ajaxRequest.responseText), this.json.frames) {
            var t = this,
                i = this.baseUrl + this.json.meta.image,
                r = new e.ImageLoader(i, this.crossorigin),
                s = this.json.frames;
            this.texture = r.texture.baseTexture, r.addEventListener("loaded", function() {
                t.onLoaded()
            });
            for(var o in s) {
                var a = s[o].frame;
                if(a && (e.TextureCache[o] = new e.Texture(this.texture, {
                        x: a.x,
                        y: a.y,
                        width: a.w,
                        height: a.h
                    }), e.TextureCache[o].crop = new e.Rectangle(a.x, a.y, a.w, a.h), s[o].trimmed)) {
                    var h = s[o].sourceSize,
                        l = s[o].spriteSourceSize;
                    e.TextureCache[o].trim = new e.Rectangle(l.x, l.y, h.w, h.h)
                }
            }
            r.load()
        } else if(this.json.bones) {
            var u = new n.SkeletonJson,
                c = u.readSkeletonData(this.json);
            e.AnimCache[this.url] = c, this.onLoaded()
        } else this.onLoaded()
    }, e.JsonLoader.prototype.onLoaded = function() {
        this.loaded = !0, this.dispatchEvent({
            type: "loaded",
            content: this
        })
    }, e.JsonLoader.prototype.onError = function() {
        this.dispatchEvent({
            type: "error",
            content: this
        })
    }, e.AtlasLoader = function(t, i) {
        e.EventTarget.call(this), this.url = t, this.baseUrl = t.replace(/[^\/]*$/, ""), this.crossorigin = i, this.loaded = !1
    }, e.AtlasLoader.constructor = e.AtlasLoader, e.AtlasLoader.prototype.load = function() {
        this.ajaxRequest = new e.AjaxRequest, this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this), this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/json"), this.ajaxRequest.send(null)
    }, e.AtlasLoader.prototype.onAtlasLoaded = function() {
        if(4 === this.ajaxRequest.readyState)
            if(200 === this.ajaxRequest.status || -1 === window.location.href.indexOf("http")) {
                this.atlas = {
                    meta: {
                        image: []
                    },
                    frames: []
                };
                var t = this.ajaxRequest.responseText.split(/\r?\n/),
                    i = -3,
                    r = 0,
                    s = null,
                    n = !1,
                    o = 0,
                    a = 0,
                    h = this.onLoaded.bind(this);
                for(o = 0; o < t.length; o++)
                    if(t[o] = t[o].replace(/^\s+|\s+$/g, ""), "" === t[o] && (n = o + 1), t[o].length > 0) {
                        if(n === o) this.atlas.meta.image.push(t[o]), r = this.atlas.meta.image.length - 1, this.atlas.frames.push({}), i = -3;
                        else if(i > 0)
                            if(i % 7 === 1) null != s && (this.atlas.frames[r][s.name] = s), s = {
                                name: t[o],
                                frame: {}
                            };
                            else {
                                var l = t[o].split(" ");
                                if(i % 7 === 3) s.frame.x = Number(l[1].replace(",", "")), s.frame.y = Number(l[2]);
                                else if(i % 7 === 4) s.frame.w = Number(l[1].replace(",", "")), s.frame.h = Number(l[2]);
                                else if(i % 7 === 5) {
                                    var u = {
                                        x: 0,
                                        y: 0,
                                        w: Number(l[1].replace(",", "")),
                                        h: Number(l[2])
                                    };
                                    u.w > s.frame.w || u.h > s.frame.h ? (s.trimmed = !0, s.realSize = u) : s.trimmed = !1
                                }
                            }
                        i++
                    }
                if(null != s && (this.atlas.frames[r][s.name] = s), this.atlas.meta.image.length > 0) {
                    for(this.images = [], a = 0; a < this.atlas.meta.image.length; a++) {
                        var c = this.baseUrl + this.atlas.meta.image[a],
                            d = this.atlas.frames[a];
                        this.images.push(new e.ImageLoader(c, this.crossorigin));
                        for(o in d) {
                            var p = d[o].frame;
                            p && (e.TextureCache[o] = new e.Texture(this.images[a].texture.baseTexture, {
                                x: p.x,
                                y: p.y,
                                width: p.w,
                                height: p.h
                            }), d[o].trimmed && (e.TextureCache[o].realSize = d[o].realSize, e.TextureCache[o].trim.x = 0, e.TextureCache[o].trim.y = 0))
                        }
                    }
                    for(this.currentImageId = 0, a = 0; a < this.images.length; a++) this.images[a].addEventListener("loaded", h);
                    this.images[this.currentImageId].load()
                } else this.onLoaded()
            } else this.onError()
    }, e.AtlasLoader.prototype.onLoaded = function() {
        this.images.length - 1 > this.currentImageId ? (this.currentImageId++, this.images[this.currentImageId].load()) : (this.loaded = !0, this.dispatchEvent({
            type: "loaded",
            content: this
        }))
    }, e.AtlasLoader.prototype.onError = function() {
        this.dispatchEvent({
            type: "error",
            content: this
        })
    }, e.SpriteSheetLoader = function(t, i) {
        e.EventTarget.call(this), this.url = t, this.crossorigin = i, this.baseUrl = t.replace(/[^\/]*$/, ""), this.texture = null, this.frames = {}
    }, e.SpriteSheetLoader.prototype.constructor = e.SpriteSheetLoader, e.SpriteSheetLoader.prototype.load = function() {
        var t = this,
            i = new e.JsonLoader(this.url, this.crossorigin);
        i.addEventListener("loaded", function(e) {
            t.json = e.content.json, t.onLoaded()
        }), i.load()
    }, e.SpriteSheetLoader.prototype.onLoaded = function() {
        this.dispatchEvent({
            type: "loaded",
            content: this
        })
    }, e.ImageLoader = function(t, i) {
        e.EventTarget.call(this), this.texture = e.Texture.fromImage(t, i), this.frames = []
    }, e.ImageLoader.prototype.constructor = e.ImageLoader, e.ImageLoader.prototype.load = function() {
        if(this.texture.baseTexture.hasLoaded) this.onLoaded();
        else {
            var t = this;
            this.texture.baseTexture.addEventListener("loaded", function() {
                t.onLoaded()
            })
        }
    }, e.ImageLoader.prototype.onLoaded = function() {
        this.dispatchEvent({
            type: "loaded",
            content: this
        })
    }, e.ImageLoader.prototype.loadFramedSpriteSheet = function(t, i, r) {
        this.frames = [];
        for(var s = Math.floor(this.texture.width / t), n = Math.floor(this.texture.height / i), o = 0, a = 0; n > a; a++)
            for(var h = 0; s > h; h++, o++) {
                var l = new e.Texture(this.texture, {
                    x: h * t,
                    y: a * i,
                    width: t,
                    height: i
                });
                this.frames.push(l), r && (e.TextureCache[r + "-" + o] = l)
            }
        if(this.texture.baseTexture.hasLoaded) this.onLoaded();
        else {
            var u = this;
            this.texture.baseTexture.addEventListener("loaded", function() {
                u.onLoaded()
            })
        }
    }, e.BitmapFontLoader = function(t, i) {
        e.EventTarget.call(this), this.url = t, this.crossorigin = i, this.baseUrl = t.replace(/[^\/]*$/, ""), this.texture = null
    }, e.BitmapFontLoader.prototype.constructor = e.BitmapFontLoader, e.BitmapFontLoader.prototype.load = function() {
        this.ajaxRequest = new e.AjaxRequest;
        var t = this;
        this.ajaxRequest.onreadystatechange = function() {
            t.onXMLLoaded()
        }, this.ajaxRequest.open("GET", this.url, !0), this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/xml"), this.ajaxRequest.send(null)
    }, e.BitmapFontLoader.prototype.onXMLLoaded = function() {
        if(4 === this.ajaxRequest.readyState && (200 === this.ajaxRequest.status || -1 === window.location.protocol.indexOf("http"))) {
            var t = this.ajaxRequest.responseXML;
            if(!t || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS)
                if("function" == typeof window.DOMParser) {
                    var i = new DOMParser;
                    t = i.parseFromString(this.ajaxRequest.responseText, "text/xml")
                } else {
                    var r = document.createElement("div");
                    r.innerHTML = this.ajaxRequest.responseText, t = r
                }
            var s = this.baseUrl + t.getElementsByTagName("page")[0].getAttribute("file"),
                n = new e.ImageLoader(s, this.crossorigin);
            this.texture = n.texture.baseTexture;
            var o = {},
                a = t.getElementsByTagName("info")[0],
                h = t.getElementsByTagName("common")[0];
            o.font = a.getAttribute("face"), o.size = parseInt(a.getAttribute("size"), 10), o.lineHeight = parseInt(h.getAttribute("lineHeight"), 10), o.chars = {};
            for(var l = t.getElementsByTagName("char"), u = 0; u < l.length; u++) {
                var c = parseInt(l[u].getAttribute("id"), 10),
                    d = new e.Rectangle(parseInt(l[u].getAttribute("x"), 10), parseInt(l[u].getAttribute("y"), 10), parseInt(l[u].getAttribute("width"), 10), parseInt(l[u].getAttribute("height"), 10));
                o.chars[c] = {
                    xOffset: parseInt(l[u].getAttribute("xoffset"), 10),
                    yOffset: parseInt(l[u].getAttribute("yoffset"), 10),
                    xAdvance: parseInt(l[u].getAttribute("xadvance"), 10),
                    kerning: {},
                    texture: e.TextureCache[c] = new e.Texture(this.texture, d)
                }
            }
            var p = t.getElementsByTagName("kerning");
            for(u = 0; u < p.length; u++) {
                var f = parseInt(p[u].getAttribute("first"), 10),
                    g = parseInt(p[u].getAttribute("second"), 10),
                    m = parseInt(p[u].getAttribute("amount"), 10);
                o.chars[g].kerning[f] = m
            }
            e.BitmapText.fonts[o.font] = o;
            var v = this;
            n.addEventListener("loaded", function() {
                v.onLoaded()
            }), n.load()
        }
    }, e.BitmapFontLoader.prototype.onLoaded = function() {
        this.dispatchEvent({
            type: "loaded",
            content: this
        })
    }, e.SpineLoader = function(t, i) {
        e.EventTarget.call(this), this.url = t, this.crossorigin = i, this.loaded = !1
    }, e.SpineLoader.prototype.constructor = e.SpineLoader, e.SpineLoader.prototype.load = function() {
        var t = this,
            i = new e.JsonLoader(this.url, this.crossorigin);
        i.addEventListener("loaded", function(e) {
            t.json = e.content.json, t.onLoaded()
        }), i.load()
    }, e.SpineLoader.prototype.onLoaded = function() {
        this.loaded = !0, this.dispatchEvent({
            type: "loaded",
            content: this
        })
    }, e.AbstractFilter = function(t, e) {
        this.passes = [this], this.shaders = [], this.dirty = !0, this.padding = 0, this.uniforms = e || {}, this.fragmentSrc = t || []
    }, e.AlphaMaskFilter = function(t) {
        e.AbstractFilter.call(this), this.passes = [this], t.baseTexture._powerOf2 = !0, this.uniforms = {
            mask: {
                type: "sampler2D",
                value: t
            },
            mapDimensions: {
                type: "2f",
                value: {
                    x: 1,
                    y: 5112
                }
            },
            dimensions: {
                type: "4fv",
                value: [0, 0, 0, 0]
            }
        }, t.baseTexture.hasLoaded ? (this.uniforms.mask.value.x = t.width, this.uniforms.mask.value.y = t.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this), t.baseTexture.on("loaded", this.boundLoadedFunction)), this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D mask;", "uniform sampler2D uSampler;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   mapCords *= dimensions.xy / mapDimensions;", "   vec4 original =  texture2D(uSampler, vTextureCoord);", "   float maskAlpha =  texture2D(mask, mapCords).r;", "   original *= maskAlpha;", "   gl_FragColor =  original;", "}"]
    }, e.AlphaMaskFilter.prototype = Object.create(e.AbstractFilter.prototype), e.AlphaMaskFilter.prototype.constructor = e.AlphaMaskFilter, e.AlphaMaskFilter.prototype.onTextureLoaded = function() {
        this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width, this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height, this.uniforms.mask.value.baseTexture.off("loaded", this.boundLoadedFunction)
    }, Object.defineProperty(e.AlphaMaskFilter.prototype, "map", {
        get: function() {
            return this.uniforms.mask.value
        },
        set: function(t) {
            this.uniforms.mask.value = t
        }
    }), e.ColorMatrixFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            matrix: {
                type: "mat4",
                value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform mat4 matrix;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;", "}"]
    }, e.ColorMatrixFilter.prototype = Object.create(e.AbstractFilter.prototype), e.ColorMatrixFilter.prototype.constructor = e.ColorMatrixFilter, Object.defineProperty(e.ColorMatrixFilter.prototype, "matrix", {
        get: function() {
            return this.uniforms.matrix.value
        },
        set: function(t) {
            this.uniforms.matrix.value = t
        }
    }), e.GrayFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            gray: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float gray;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);", "}"]
    }, e.GrayFilter.prototype = Object.create(e.AbstractFilter.prototype), e.GrayFilter.prototype.constructor = e.GrayFilter, Object.defineProperty(e.GrayFilter.prototype, "gray", {
        get: function() {
            return this.uniforms.gray.value
        },
        set: function(t) {
            this.uniforms.gray.value = t
        }
    }), e.DisplacementFilter = function(t) {
        e.AbstractFilter.call(this), this.passes = [this], t.baseTexture._powerOf2 = !0, this.uniforms = {
            displacementMap: {
                type: "sampler2D",
                value: t
            },
            scale: {
                type: "2f",
                value: {
                    x: 30,
                    y: 30
                }
            },
            offset: {
                type: "2f",
                value: {
                    x: 0,
                    y: 0
                }
            },
            mapDimensions: {
                type: "2f",
                value: {
                    x: 1,
                    y: 5112
                }
            },
            dimensions: {
                type: "4fv",
                value: [0, 0, 0, 0]
            }
        }, t.baseTexture.hasLoaded ? (this.uniforms.mapDimensions.value.x = t.width, this.uniforms.mapDimensions.value.y = t.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this), t.baseTexture.on("loaded", this.boundLoadedFunction)), this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D displacementMap;", "uniform sampler2D uSampler;", "uniform vec2 scale;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   vec2 matSample = texture2D(displacementMap, mapCords).xy;", "   matSample -= 0.5;", "   matSample *= scale;", "   matSample /= mapDimensions;", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);", "   vec2 cord = vTextureCoord;", "}"]
    }, e.DisplacementFilter.prototype = Object.create(e.AbstractFilter.prototype), e.DisplacementFilter.prototype.constructor = e.DisplacementFilter, e.DisplacementFilter.prototype.onTextureLoaded = function() {
        this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width, this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height, this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction)
    }, Object.defineProperty(e.DisplacementFilter.prototype, "map", {
        get: function() {
            return this.uniforms.displacementMap.value
        },
        set: function(t) {
            this.uniforms.displacementMap.value = t
        }
    }), Object.defineProperty(e.DisplacementFilter.prototype, "scale", {
        get: function() {
            return this.uniforms.scale.value
        },
        set: function(t) {
            this.uniforms.scale.value = t
        }
    }), Object.defineProperty(e.DisplacementFilter.prototype, "offset", {
        get: function() {
            return this.uniforms.offset.value
        },
        set: function(t) {
            this.uniforms.offset.value = t
        }
    }), e.PixelateFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            invert: {
                type: "1f",
                value: 0
            },
            dimensions: {
                type: "4fv",
                value: new Float32Array([1e4, 100, 10, 10])
            },
            pixelSize: {
                type: "2f",
                value: {
                    x: 10,
                    y: 10
                }
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 testDim;", "uniform vec4 dimensions;", "uniform vec2 pixelSize;", "uniform sampler2D uSampler;", "void main(void) {", "   vec2 coord = vTextureCoord;", "   vec2 size = dimensions.xy/pixelSize;", "   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;", "   gl_FragColor = texture2D(uSampler, color);", "}"]
    }, e.PixelateFilter.prototype = Object.create(e.AbstractFilter.prototype), e.PixelateFilter.prototype.constructor = e.PixelateFilter, Object.defineProperty(e.PixelateFilter.prototype, "size", {
        get: function() {
            return this.uniforms.pixelSize.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.pixelSize.value = t
        }
    }), e.BlurXFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;", "   gl_FragColor = sum;", "}"]
    }, e.BlurXFilter.prototype = Object.create(e.AbstractFilter.prototype), e.BlurXFilter.prototype.constructor = e.BlurXFilter, Object.defineProperty(e.BlurXFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3)
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.blur.value = 1 / 7e3 * t
        }
    }), e.BlurYFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;", "   gl_FragColor = sum;", "}"]
    }, e.BlurYFilter.prototype = Object.create(e.AbstractFilter.prototype), e.BlurYFilter.prototype.constructor = e.BlurYFilter, Object.defineProperty(e.BlurYFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3)
        },
        set: function(t) {
            this.uniforms.blur.value = 1 / 7e3 * t
        }
    }), e.BlurFilter = function() {
        this.blurXFilter = new e.BlurXFilter, this.blurYFilter = new e.BlurYFilter, this.passes = [this.blurXFilter, this.blurYFilter]
    }, Object.defineProperty(e.BlurFilter.prototype, "blur", {
        get: function() {
            return this.blurXFilter.blur
        },
        set: function(t) {
            this.blurXFilter.blur = this.blurYFilter.blur = t
        }
    }), Object.defineProperty(e.BlurFilter.prototype, "blurX", {
        get: function() {
            return this.blurXFilter.blur
        },
        set: function(t) {
            this.blurXFilter.blur = t
        }
    }), Object.defineProperty(e.BlurFilter.prototype, "blurY", {
        get: function() {
            return this.blurYFilter.blur
        },
        set: function(t) {
            this.blurYFilter.blur = t
        }
    }), e.InvertFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            invert: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);", "}"]
    }, e.InvertFilter.prototype = Object.create(e.AbstractFilter.prototype), e.InvertFilter.prototype.constructor = e.InvertFilter, Object.defineProperty(e.InvertFilter.prototype, "invert", {
        get: function() {
            return this.uniforms.invert.value
        },
        set: function(t) {
            this.uniforms.invert.value = t
        }
    }), e.SepiaFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            sepia: {
                type: "1f",
                value: 1
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float sepia;", "uniform sampler2D uSampler;", "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);", "}"]
    }, e.SepiaFilter.prototype = Object.create(e.AbstractFilter.prototype), e.SepiaFilter.prototype.constructor = e.SepiaFilter, Object.defineProperty(e.SepiaFilter.prototype, "sepia", {
        get: function() {
            return this.uniforms.sepia.value
        },
        set: function(t) {
            this.uniforms.sepia.value = t
        }
    }), e.TwistFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            radius: {
                type: "1f",
                value: .5
            },
            angle: {
                type: "1f",
                value: 5
            },
            offset: {
                type: "2f",
                value: {
                    x: .5,
                    y: .5
                }
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float radius;", "uniform float angle;", "uniform vec2 offset;", "void main(void) {", "   vec2 coord = vTextureCoord - offset;", "   float distance = length(coord);", "   if (distance < radius) {", "       float ratio = (radius - distance) / radius;", "       float angleMod = ratio * ratio * angle;", "       float s = sin(angleMod);", "       float c = cos(angleMod);", "       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);", "   }", "   gl_FragColor = texture2D(uSampler, coord+offset);", "}"]
    }, e.TwistFilter.prototype = Object.create(e.AbstractFilter.prototype), e.TwistFilter.prototype.constructor = e.TwistFilter, Object.defineProperty(e.TwistFilter.prototype, "offset", {
        get: function() {
            return this.uniforms.offset.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.offset.value = t
        }
    }), Object.defineProperty(e.TwistFilter.prototype, "radius", {
        get: function() {
            return this.uniforms.radius.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.radius.value = t
        }
    }), Object.defineProperty(e.TwistFilter.prototype, "angle", {
        get: function() {
            return this.uniforms.angle.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.angle.value = t
        }
    }), e.ColorStepFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            step: {
                type: "1f",
                value: 5
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float step;", "void main(void) {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   color = floor(color * step) / step;", "   gl_FragColor = color;", "}"]
    }, e.ColorStepFilter.prototype = Object.create(e.AbstractFilter.prototype), e.ColorStepFilter.prototype.constructor = e.ColorStepFilter, Object.defineProperty(e.ColorStepFilter.prototype, "step", {
        get: function() {
            return this.uniforms.step.value
        },
        set: function(t) {
            this.uniforms.step.value = t
        }
    }), e.DotScreenFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            scale: {
                type: "1f",
                value: 1
            },
            angle: {
                type: "1f",
                value: 5
            },
            dimensions: {
                type: "4fv",
                value: [0, 0, 0, 0]
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float angle;", "uniform float scale;", "float pattern() {", "   float s = sin(angle), c = cos(angle);", "   vec2 tex = vTextureCoord * dimensions.xy;", "   vec2 point = vec2(", "       c * tex.x - s * tex.y,", "       s * tex.x + c * tex.y", "   ) * scale;", "   return (sin(point.x) * sin(point.y)) * 4.0;", "}", "void main() {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   float average = (color.r + color.g + color.b) / 3.0;", "   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);", "}"]
    }, e.DotScreenFilter.prototype = Object.create(e.AbstractFilter.prototype), e.DotScreenFilter.prototype.constructor = e.DotScreenFilter, Object.defineProperty(e.DotScreenFilter.prototype, "scale", {
        get: function() {
            return this.uniforms.scale.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.scale.value = t
        }
    }), Object.defineProperty(e.DotScreenFilter.prototype, "angle", {
        get: function() {
            return this.uniforms.angle.value
        },
        set: function(t) {
            this.dirty = !0, this.uniforms.angle.value = t
        }
    }), e.CrossHatchFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);", "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);", "    if (lum < 1.00) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.75) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.50) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.3) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "}"]
    }, e.CrossHatchFilter.prototype = Object.create(e.AbstractFilter.prototype), e.CrossHatchFilter.prototype.constructor = e.BlurYFilter, Object.defineProperty(e.CrossHatchFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3)
        },
        set: function(t) {
            this.uniforms.blur.value = 1 / 7e3 * t
        }
    }), e.RGBSplitFilter = function() {
        e.AbstractFilter.call(this), this.passes = [this], this.uniforms = {
            red: {
                type: "2f",
                value: {
                    x: 20,
                    y: 20
                }
            },
            green: {
                type: "2f",
                value: {
                    x: -20,
                    y: 20
                }
            },
            blue: {
                type: "2f",
                value: {
                    x: 20,
                    y: -20
                }
            },
            dimensions: {
                type: "4fv",
                value: [0, 0, 0, 0]
            }
        }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 red;", "uniform vec2 green;", "uniform vec2 blue;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;", "   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;", "   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;", "   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;", "}"]
    }, e.RGBSplitFilter.prototype = Object.create(e.AbstractFilter.prototype), e.RGBSplitFilter.prototype.constructor = e.RGBSplitFilter, Object.defineProperty(e.RGBSplitFilter.prototype, "angle", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3)
        },
        set: function(t) {
            this.uniforms.blur.value = 1 / 7e3 * t
        }
    }), "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = e), exports.PIXI = e) : "undefined" != typeof define && define.amd ? define(e) : t.PIXI = e
}).call(this);
var Stats = function() {
    var t = Date.now(),
        e = t,
        i = 0,
        r = 1 / 0,
        s = 0,
        n = 0,
        o = 1 / 0,
        a = 0,
        h = 0,
        l = 0,
        u = document.createElement("div");
    u.id = "stats", u.addEventListener("mousedown", function(t) {
        t.preventDefault(), x(++l % 2)
    }, !1), u.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
    var c = document.createElement("div");
    c.id = "fps", c.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002", u.appendChild(c);
    var d = document.createElement("div");
    d.id = "fpsText", d.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", d.innerHTML = "FPS", c.appendChild(d);
    var p = document.createElement("div");
    for(p.id = "fpsGraph", p.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", c.appendChild(p); p.children.length < 74;) {
        var f = document.createElement("span");
        f.style.cssText = "width:1px;height:30px;float:left;background-color:#113", p.appendChild(f)
    }
    var g = document.createElement("div");
    g.id = "ms", g.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", u.appendChild(g);
    var m = document.createElement("div");
    m.id = "msText", m.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", m.innerHTML = "MS", g.appendChild(m);
    var v = document.createElement("div");
    for(v.id = "msGraph", v.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", g.appendChild(v); v.children.length < 74;) {
        var f = document.createElement("span");
        f.style.cssText = "width:1px;height:30px;float:left;background-color:#131", v.appendChild(f)
    }
    var x = function(t) {
            switch(l = t) {
                case 0:
                    c.style.display = "block", g.style.display = "none";
                    break;
                case 1:
                    c.style.display = "none", g.style.display = "block"
            }
        },
        y = function(t, e) {
            var i = t.appendChild(t.firstChild);
            i.style.height = e + "px"
        };
    return {
        REVISION: 11,
        domElement: u,
        setMode: x,
        begin: function() {
            t = Date.now()
        },
        end: function() {
            var l = Date.now();
            return i = l - t, r = Math.min(r, i), s = Math.max(s, i), m.textContent = i + " MS (" + r + "-" + s + ")", y(v, Math.min(30, 30 - i / 200 * 30)), h++, l > e + 1e3 && (n = Math.round(1e3 * h / (l - e)), o = Math.min(o, n), a = Math.max(a, n), d.textContent = n + " FPS (" + o + "-" + a + ")", y(p, Math.min(30, 30 - n / 100 * 30)), e = l, h = 0), l
        },
        update: function() {
            t = this.end()
        }
    }
}; + function(t) {
    function e(t) {
        return "%" == t[t.length - 1]
    }

    function i() {
        var t = document.createElement("canvas"),
            e = t.getContext("webgl") || t.getContext("experimental-webgl"),
            i = e && e.getExtension("OES_texture_float");
        return i
    }

    function r(t, e, i) {
        function r(t, e) {
            var i = a.createShader(t);
            if(a.shaderSource(i, e), a.compileShader(i), !a.getShaderParameter(i, a.COMPILE_STATUS)) throw new Error("compile error: " + a.getShaderInfoLog(i));
            return i
        }
        var s = {};
        if(s.id = a.createProgram(), a.attachShader(s.id, r(a.VERTEX_SHADER, t)), a.attachShader(s.id, r(a.FRAGMENT_SHADER, e)), a.linkProgram(s.id), !a.getProgramParameter(s.id, a.LINK_STATUS)) throw new Error("link error: " + a.getProgramInfoLog(s.id));
        s.uniforms = {}, s.locations = {}, a.useProgram(s.id), a.enableVertexAttribArray(0);
        for(var n, o = /uniform (\w+) (\w+)/g, h = t + e; null != (match = o.exec(h));) n = match[2], s.locations[n] = a.getUniformLocation(s.id, n);
        return s
    }

    function s(t, e) {
        a.activeTexture(a.TEXTURE0 + (e || 0)), a.bindTexture(a.TEXTURE_2D, t)
    }

    function n(t) {
        var e = /url\(["']?([^"']*)["']?\)/.exec(t.css("background-image"));
        return null == e ? null : e[1]
    }

    function o(t) {
        return t.match(/^data:/)
    }
    var a, h = t(window),
        l = i();
    t("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>");
    var u = function(e, i) {
        function r() {
            s.step(), requestAnimationFrame(r)
        }
        var s = this;
        this.$el = t(e), this.$el.addClass("jquery-ripples");
        var h = n(this.$el);
        if(h) {
            this.interactive = i.interactive, this.resolution = i.resolution || 256, this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]), this.perturbance = i.perturbance, this.dropRadius = i.dropRadius;
            var l = document.createElement("canvas");
            l.width = this.$el.innerWidth(), l.height = this.$el.innerHeight(), this.canvas = l, this.$canvas = t(l), this.$canvas.css({
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }), this.$el.append(l), this.context = a = l.getContext("webgl") || l.getContext("experimental-webgl"), a.getExtension("OES_texture_float");
            var u = a.getExtension("OES_texture_float_linear");
            t(window).on("resize", function() {
                var t = s.$el.innerWidth(),
                    e = s.$el.innerHeight();
                t == s.canvas.width && e == s.canvas.height || (l.width = t, l.height = e)
            }), this.$el.on("mousemove.ripples", function(t) {
                s.visible && s.running && s.interactive && s.dropAtMouse(t, s.dropRadius, .01)
            }).on("mousedown.ripples", function(t) {
                s.visible && s.running && s.interactive && s.dropAtMouse(t, 1.5 * s.dropRadius, .14)
            }), this.textures = [], this.framebuffers = [];
            for(var c = 0; 2 > c; c++) {
                var d = a.createTexture(),
                    p = a.createFramebuffer();
                if(a.bindFramebuffer(a.FRAMEBUFFER, p), p.width = this.resolution, p.height = this.resolution, a.bindTexture(a.TEXTURE_2D, d), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, u ? a.LINEAR : a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, u ? a.LINEAR : a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this.resolution, this.resolution, 0, a.RGBA, a.FLOAT, null), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, d, 0), a.checkFramebufferStatus(a.FRAMEBUFFER) != a.FRAMEBUFFER_COMPLETE) throw new Error("Rendering to this texture is not supported (incomplete framebuffer)");
                a.bindTexture(a.TEXTURE_2D, null), a.bindFramebuffer(a.FRAMEBUFFER, null), this.textures.push(d), this.framebuffers.push(p)
            }
            this.running = !0, this.quad = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, this.quad), a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), a.STATIC_DRAW), this.initShaders();
            var f = new Image;
            f.crossOrigin = o(h) ? null : i.crossOrigin || "", f.onload = function() {
                function t(t) {
                    return 0 == (t & t - 1)
                }
                a = s.context;
                var e = t(f.width) && t(f.height) ? a.REPEAT : a.CLAMP_TO_EDGE;
                s.backgroundWidth = f.width, s.backgroundHeight = f.height;
                var i = a.createTexture();
                a.bindTexture(a.TEXTURE_2D, i), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, 1), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, e), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, e), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, f), s.backgroundTexture = i, s.$el.css("backgroundImage", "none")
            }, f.src = h, this.visible = !0, a.clearColor(0, 0, 0, 0), a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA), requestAnimationFrame(r)
        }
    };
    u.DEFAULTS = {
        resolution: 256,
        dropRadius: 20,
        perturbance: .03,
        interactive: !0,
        crossOrigin: ""
    }, u.prototype = {
        step: function() {
            a = this.context, this.visible && this.backgroundTexture && (this.computeTextureBoundaries(), this.running && this.update(), this.render())
        },
        drawQuad: function() {
            a.bindBuffer(a.ARRAY_BUFFER, this.quad), a.vertexAttribPointer(0, 2, a.FLOAT, !1, 0, 0), a.drawArrays(a.TRIANGLE_FAN, 0, 4)
        },
        render: function() {
            a.viewport(0, 0, this.canvas.width, this.canvas.height), a.enable(a.BLEND), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), a.useProgram(this.renderProgram.id), s(this.backgroundTexture, 0), s(this.textures[0], 1), a.uniform1f(this.renderProgram.locations.perturbance, this.perturbance), a.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.uniforms.topLeft), a.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.uniforms.bottomRight), a.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.uniforms.containerRatio), a.uniform1i(this.renderProgram.locations.samplerBackground, 0), a.uniform1i(this.renderProgram.locations.samplerRipples, 1), this.drawQuad(), a.disable(a.BLEND)
        },
        update: function() {
            a.viewport(0, 0, this.resolution, this.resolution);
            for(var t = 0; 2 > t; t++) a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffers[t]), s(this.textures[1 - t]), a.useProgram(this.updateProgram[t].id), this.drawQuad();
            a.bindFramebuffer(a.FRAMEBUFFER, null)
        },
        computeTextureBoundaries: function() {
            var t = this.$el.css("background-size"),
                i = this.$el.css("background-attachment"),
                r = this.$el.css("background-position").split(" "),
                s = "fixed" == i ? h : this.$el,
                n = s.offset() || {
                        left: pageXOffset,
                        top: pageYOffset
                    },
                o = s.innerWidth(),
                a = s.innerHeight();
            if("cover" == t) var l = Math.max(o / this.backgroundWidth, a / this.backgroundHeight),
                u = this.backgroundWidth * l,
                c = this.backgroundHeight * l;
            else if("contain" == t) var l = Math.min(o / this.backgroundWidth, a / this.backgroundHeight),
                u = this.backgroundWidth * l,
                c = this.backgroundHeight * l;
            else {
                t = t.split(" ");
                var u = t[0] || "",
                    c = t[1] || u;
                e(u) ? u = o * parseFloat(u) / 100 : "auto" != u && (u = parseFloat(u)), e(c) ? c = a * parseFloat(c) / 100 : "auto" != c && (c = parseFloat(c)), "auto" == u && "auto" == c ? (u = this.backgroundWidth, c = this.backgroundHeight) : ("auto" == u && (u = this.backgroundWidth * (c / this.backgroundHeight)), "auto" == c && (c = this.backgroundHeight * (u / this.backgroundWidth)))
            }
            var d = r[0] || "",
                p = r[1] || d;
            d = "left" == d ? n.left : "center" == d ? n.left + o / 2 - u / 2 : "right" == d ? n.left + o - u : e(d) ? n.left + (o - u) * parseFloat(d) / 100 : parseFloat(d), p = "top" == p ? n.top : "center" == p ? n.top + a / 2 - c / 2 : "bottom" == p ? n.top + a - c : e(p) ? n.top + (a - c) * parseFloat(p) / 100 : parseFloat(p);
            var f = this.$el.offset();
            this.renderProgram.uniforms.topLeft = new Float32Array([(f.left - d) / u, (f.top - p) / c]), this.renderProgram.uniforms.bottomRight = new Float32Array([this.renderProgram.uniforms.topLeft[0] + this.$el.innerWidth() / u, this.renderProgram.uniforms.topLeft[1] + this.$el.innerHeight() / c]);
            var g = Math.max(this.canvas.width, this.canvas.height);
            this.renderProgram.uniforms.containerRatio = new Float32Array([this.canvas.width / g, this.canvas.height / g])
        },
        initShaders: function() {
            var t = ["attribute vec2 vertex;", "varying vec2 coord;", "void main() {", "coord = vertex * 0.5 + 0.5;", "gl_Position = vec4(vertex, 0.0, 1.0);", "}"].join("\n");
            this.dropProgram = r(t, ["precision highp float;", "const float PI = 3.141592653589793;", "uniform sampler2D texture;", "uniform vec2 center;", "uniform float radius;", "uniform float strength;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);", "drop = 0.5 - cos(drop * PI) * 0.5;", "info.r += drop * strength;", "gl_FragColor = info;", "}"].join("\n")), this.updateProgram = [0, 0], this.updateProgram[0] = r(t, ["precision highp float;", "uniform sampler2D texture;", "uniform vec2 delta;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "vec2 dx = vec2(delta.x, 0.0);", "vec2 dy = vec2(0.0, delta.y);", "float average = (", "texture2D(texture, coord - dx).r +", "texture2D(texture, coord - dy).r +", "texture2D(texture, coord + dx).r +", "texture2D(texture, coord + dy).r", ") * 0.25;", "info.g += (average - info.r) * 2.0;", "info.g *= 0.995;", "info.r += info.g;", "gl_FragColor = info;", "}"].join("\n")), a.uniform2fv(this.updateProgram[0].locations.delta, this.textureDelta), this.updateProgram[1] = r(t, ["precision highp float;", "uniform sampler2D texture;", "uniform vec2 delta;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);", "vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);", "info.ba = normalize(cross(dy, dx)).xz;", "gl_FragColor = info;", "}"].join("\n")), a.uniform2fv(this.updateProgram[1].locations.delta, this.textureDelta), this.renderProgram = r(["precision highp float;", "attribute vec2 vertex;", "uniform vec2 topLeft;", "uniform vec2 bottomRight;", "uniform vec2 containerRatio;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);", "backgroundCoord.y = 1.0 - backgroundCoord.y;", "ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;", "gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);", "}"].join("\n"), ["precision highp float;", "uniform sampler2D samplerBackground;", "uniform sampler2D samplerRipples;", "uniform float perturbance;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "vec2 offset = -texture2D(samplerRipples, ripplesCoord).ba;", "float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);", "gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;", "}"].join("\n"))
        },
        dropAtMouse: function(t, e, i) {
            var r = parseInt(this.$el.css("border-left-width")) || 0,
                s = parseInt(this.$el.css("border-top-width")) || 0;
            this.drop(t.pageX - this.$el.offset().left - r, t.pageY - this.$el.offset().top - s, e, i)
        },
        drop: function(t, e, i, r) {
            a = this.context;
            var n = this.$el.innerWidth(),
                o = this.$el.innerHeight(),
                h = Math.max(n, o);
            i /= h;
            var l = new Float32Array([(2 * t - n) / h, (o - 2 * e) / h]);
            a.viewport(0, 0, this.resolution, this.resolution), a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffers[0]), s(this.textures[1]), a.useProgram(this.dropProgram.id), a.uniform2fv(this.dropProgram.locations.center, l), a.uniform1f(this.dropProgram.locations.radius, i), a.uniform1f(this.dropProgram.locations.strength, r), this.drawQuad();
            var u = this.framebuffers[0];
            this.framebuffers[0] = this.framebuffers[1], this.framebuffers[1] = u, u = this.textures[0], this.textures[0] = this.textures[1], this.textures[1] = u, a.bindFramebuffer(a.FRAMEBUFFER, null)
        },
        destroy: function() {
            this.canvas.remove(), this.$el.off(".ripples"), this.$el.css("backgroundImage", ""), this.$el.removeClass("jquery-ripples").removeData("ripples")
        },
        show: function() {
            this.$canvas.show(), this.$el.css("backgroundImage", "none"), this.visible = !0
        },
        hide: function() {
            this.$canvas.hide(), this.$el.css("backgroundImage", ""), this.visible = !1
        },
        pause: function() {
            this.running = !1
        },
        play: function() {
            this.running = !0
        },
        set: function(t, e) {
            switch(t) {
                case "dropRadius":
                case "perturbance":
                case "interactive":
                    this[t] = e
            }
        }
    };
    var c = t.fn.ripples;
    t.fn.ripples = function(e) {
        if(!l) throw new Error("Your browser does not support WebGL or the OES_texture_float extension.");
        var i = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : void 0;
        return this.each(function() {
            var r = t(this),
                s = r.data("ripples"),
                n = t.extend({}, u.DEFAULTS, r.data(), "object" == typeof e && e);
            (s || "string" != typeof e) && (s ? "string" == typeof e && u.prototype[e].apply(s, i) : r.data("ripples", s = new u(this, n)))
        })
    }, t.fn.ripples.Constructor = u, t.fn.ripples.noConflict = function() {
        return t.fn.ripples = c, this
    }
}(window.jQuery), $(function() {
    function t() {
        setTimeout(function() {
            g.removeClass("hide"), $("#document").css("opacity", 1), $("#kv-copy-en-inner").css({
                height: 0
            }), $("#kv-inner,#kv-content").css({
                height: 38
            }), $("#kv-copy-en").css({
                position: "relative",
                top: -$("#kv-copy-en").height(),
                "margin-bottom": -$("#kv-copy-en").height()
            }), g.find(".overlay-text").addClass("first-show"), setTimeout(function() {
                g.find(".overlay-text").removeClass("first-show"), $("#kv-copy-en-inner").addClass("ph1").addClass("ph2"), $("#kv-copy-en-svg-wrap").addClass("show"), f.firstView = !0, d(), setTimeout(function() {
                    $("#kv-copy-en-inner").css({
                        height: ""
                    }), g.find(".first-text").removeClass("first-show"), m.removeClass("first"), $("#kv-inner").css({
                        height: A
                    }), m.css({
                        height: A
                    }), setTimeout(function() {
                        setTimeout(function() {
                            TweenLite.set("#kv-copy-en-svg-wrap .js-write", {
                                visibility: "visible"
                            }), TweenMax.staggerFromTo("#kv-copy-en-svg-wrap .js-write", .25, {
                                drawSVG: "0%"
                            }, {
                                drawSVG: "100%",
                                ease: Power2.easeOut
                            }, .1);
                            var t = m.find(".vertical-motion");
                            new TweenMax.staggerTo(t, .4, {
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)",
                                "-webkit-filter": "blur(0px)",
                                ease: Sine.easeOut,
                                onStart: function() {}
                            }, .04);
                            $("#header,#footer,#pager-wrap,#scroll-down").addClass("show")
                        }, 1e3)
                    }, 1e3)
                }, 100)
            }, 800)
        }, 300)
    }

    function e() {
        if(o("start"), "next" == f.dir) f.first = !0, "smp" == f.device && v.css({
            overflow: "hidden"
        }), $("#header,#footer,#pager-wrap").removeClass("white"), g.addClass("sc-hide"), v.css({
            opacity: 1,
            transition: "all " + f.speed + "ms cubic-bezier(.52,.01,.16,1)",
            width: "100%"
        }), v.find(".page-bg").css({
            transition: "all " + f.speed + "ms cubic-bezier(.52,.01,.16,1)",
            "transition-delay": .7 * f.speed + "ms",
            height: y.height() + "px"
        });
        else {
            f.first = !1, $("#header,#footer,#pager-wrap").addClass("white"), g.removeClass("sc-hide"), v.find(".page-bg").removeClass("show"), v.find(".page-bg").css({
                transition: "all " + .7 * f.speed + "ms cubic-bezier(.52,.01,.16,1)",
                height: y.height() + "px"
            }), v.css({
                opacity: 0,
                transition: "all " + f.speed + "ms cubic-bezier(.52,.01,.16,1)",
                "transition-delay": .7 * f.speed + "ms",
                width: 0
            });
            new TweenMax.staggerTo(m.find(".vertical-motion"), .4, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                "-webkit-filter": "blur(0px)",
                ease: Sine.easeOut,
                onStart: function() {}
            }, .04)
        }
        "reload" != f.loadType && $.cookie("topFirst", f.first, {
            expires: 1
        }), n(), setTimeout(function() {
            "next" == f.dir ? (T.eq(f.current).find(".first-show-motion,.show-motion").addClass("show"), setTimeout(function() {
                T.find(".second-show-motion").addClass("show")
            }, 160), a(T.eq(f.current))) : T.find(".first-show-motion,.show-motion,.second-show-motion").removeClass("show"), "smp" == f.device && v.css({
                overflow: ""
            }).animate({
                scrollTop: 1
            }, 0)
        }, f.speed), setTimeout(function() {
            f.motion = !1, f.pager = !1, o("end")
        }, 2e3)
    }

    function i() {
        function t() {}

        function e() {
            T.find(".first-show-motion,.show-motion,.second-show-motion,.section-bg").removeClass("show"), T.eq(f.current).find(".first-show-motion,.show-motion,.section-bg").addClass("show"), setTimeout(function() {
                T.find(".second-show-motion").addClass("show")
            }, 160), a(T.eq(f.current)), setTimeout(function() {
                f.motion = !1, f.pager = !1, o("end")
            }, 2e3)
        }
        o("start"), "next" == f.dir ? f.current++ : f.current--, "reload" != f.loadType && $.cookie("topCurrent", f.current, {
            expires: 1
        });
        new TweenMax.to("#page-contents-motion-wrap", f.speed / 300, {
            y: "-" + f.span * f.current,
            ease: Power4.easeOut,
            onStart: t,
            onComplete: e
        });
        "our-team" == T.eq(f.current).attr("id") ? TweenMax.staggerTo("#team-wrap .list-wrap li", .48, {
            y: 0,
            transformStyle: "preserve-3d",
            opacity: 1,
            filter: "blur(0px)",
            "-webkit-filter": "blur(0px)",
            delay: 1,
            ease: Sine.easeOut,
            onStart: function() {
                $("#team-wrap .list-wrap li").addClass("show")
            }
        }, .01) : TweenMax.to("#team-wrap .list-wrap li", .18, {
            y: 300,
            transformStyle: "preserve-3d",
            opacity: 0,
            filter: "blur(3px)",
            ease: Sine.easeOut,
            onStart: function() {
                $("#team-wrap .list-wrap li").removeClass("show")
            }
        }), "investment-policy" == T.eq(f.current).attr("id") ? T.eq(f.current).find(".bg-wrap").addClass("show") : $("#investment-policy .bg-wrap").removeClass("show"), n()
    }

    function r() {
        for(var t = 0; t < T.length; t++) _[t] = T.eq(t).position().top;
        0 != f.current && v.animate({
            scrollTop: _[f.current]
        }, 1)
    }

    function s(t) {
        for(var e = 0; e < _.length; e++) _[e] - winH / 2 < t && (T.eq(e).find(".first-show-motion,.show-motion,.section-bg").not(".show").addClass("show"), setTimeout(function() {
            T.eq(e).find(".second-show-motion").addClass("show")
        }, 160), a(T.eq(e)), f.current = e, "our-team" == T.eq(f.current).attr("id") && $("#team-wrap .list-wrap li").addClass("show"), "investment-policy" == T.eq(f.current).attr("id") && T.eq(f.current).find(".bg-wrap").addClass("show"), 4 == f.current && T.eq(e + 1).find(".first-show-motion,.show-motion,.section-bg,.vertical-motion").addClass("show"))
    }

    function n() {
        var t = f.first ? f.current + 2 : 1;
        f.first ? f.current + 1 : 0;
        E.find(".now").text(t), E.find(".prev,.next").removeClass("none"), f.current == T.length - 1 && E.find(".cntroller .next").addClass("none"), 1 == t && E.find(".cntroller .prev").addClass("none"), $(".vertical-motion").removeClass("show").css({
            "transition-delay": ""
        });
        var e = T.eq(f.current).find(".smp-height-check").outerHeight() + 90;
        e > winH ? (f.motionType = "scroll", f.scrollEndPoint = "next" == f.dir ? e - winH : 0) : (f.motionType = "normal", f.scrollEndPoint = 0, R = 0, S.css({
            transform: "",
            "transition-duration": ""
        }))
    }

    function o(t) {
        "start" == t ? (f.speed = "reload" == f.loadType ? 10 : 540, E.find(".prev,.next").addClass("stay").css({
            overflow: "hidden"
        }), TweenMax.set(".vertical-motion", {
            y: 90,
            opacity: 0,
            filter: "blur(3px)",
            "-webkit-filter": "blur(3px)"
        })) : (E.find(".prev,.next").removeClass("stay"), setTimeout(function() {
            E.find(".prev,.next").css({
                overflow: ""
            })
        }, 400))
    }

    function a(t) {
        var e = t.find(".vertical-motion");
        new TweenMax.staggerTo(e, .4, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            "-webkit-filter": "blur(0px)",
            ease: Sine.easeOut,
            onStart: function() {}
        }, .04)
    }

    function h() {
        return f.motion || f.current == T.length - 1 ? !1 : (f.dir = "next", f.loadType = "new", f.motion = !0, f.current == T.length - 2 && (f.last = !0), void(f.first ? i() : e()))
    }

    function l() {
        return f.motion ? !1 : (f.dir = "prev", f.loadType = "new", f.motion = !0, f.last = !1, void(f.first && 0 == f.current ? e() : i()))
    }

    function u(t) {
        var e = t.originalEvent.touches[0].pageX,
            i = t.originalEvent.touches[0].pageY;
        e = Math.floor(e), i = Math.floor(i);
        var r = {
            x: e,
            y: i
        };
        return r
    }

    function c() {
        $("#kv-wrap").ripples({
            resolution: 112,
            dropRadius: 120,
            perturbance: .001
        })
    }

    function d() {
        var t = minH < winH ? winH : minH;
        f.span = 2 * t;
        for(var e = 0; e < O.length; e++) O.eq(e).css({
            height: O.eq(e).find(".base-h").height()
        });
        for(var e = 0; e < k.length; e++) {
            var i = "w" == teamAspect.b ? "" : k.eq(e).height() / teamAspect.a,
                s = "h" == teamAspect.b ? "" : k.eq(e).width() / teamAspect.a;
            winW > breakpoint ? k.eq(e).css({
                width: i,
                height: s
            }).find(".photo").css({
                width: i,
                height: s
            }) : k.eq(e).css({
                width: i,
                height: ""
            }).find(".photo").css({
                width: i,
                height: s
            })
        }
        var n = winW > 1280 ? 360 : 180;
        teamW = winW - n <= 1340 ? winW - n : 1340, teamH = teamW / [1280 / 768], teamH > winH - 220 && (teamH = winH - 220, teamW = teamH * [1280 / 768], teamW > 1340 && (teamW = 1340, teamH = teamW / [1280 / 768])), winW > breakpoint ? j.css({
            width: teamW,
            height: teamH
        }) : j.css({
            width: "",
            height: ""
        }), clearTimeout(U), U = setTimeout(function() {
            v.css({
                height: winH
            });
            var e = $("#kv-copy-en").width();
            if($("#kv-copy-en-svg-wrap").css({
                    width: e,
                    left: -e / 2
                }), $("#kv-wrap >canvas").css({
                    width: winW,
                    height: winH
                }), A = f.firstView ? $("#kv-copy-en").outerHeight() + $("#kv-lead-wrap").outerHeight() : $("#kv-copy-en").outerHeight(), $("#kv-inner,#kv-content").css({
                    height: A
                }), $("#kv-copy-en").css({
                    position: "relative",
                    top: "",
                    "margin-bottom": ""
                }), $("#body-bg").css({
                    height: $("#page-contents-motion-inner").height()
                }), winW > breakpoint) {
                if(f.device = "pc", x.css({
                        height: ""
                    }), T.css({
                        "margin-bottom": t
                    }), $("#main-wrap").css({
                        height: winH
                    }), $("#investment-policy-wrap .content-box").css({
                        height: $("#investment-policy-wrap .content-box").children().height()
                    }), x.css({
                        transform: "translateY(-" + f.span * f.current + "px)"
                    }), clearTimeout(G), G = setTimeout(function() {
                        for(var t = 0; t < w.length; t++) w.eq(t).css({
                            width: w.eq(t).find(".section-title-inner").outerWidth()
                        });
                        for(var t = 0; t < b.length; t++) b.eq(t).css({
                            width: b.eq(t).find(".motion-inner").outerWidth()
                        })
                    }, 100), isIE)
                    for(var i = 0; i < C.length; i++) C.eq(i).css({
                        width: C.eq(i).children().outerWidth()
                    })
            } else {
                if(g.css({
                        height: t
                    }), T.css({
                        height: "",
                        "margin-bottom": ""
                    }), $("#main-wrap").css({
                        height: $doc.height() - 20
                    }), x.css({
                        transform: "translateY(0)"
                    }), w.css({
                        width: ""
                    }), b.css({
                        width: ""
                    }), isIE && C.css({
                        width: ""
                    }), r(), "smp" != f.device) {
                    for(var i = 0; i <= f.current; i++) T.eq(i).find(".first-show-motion,.show-motion,.section-bg,.vertical-motion").addClass("show");
                    v.animate({
                        scrollTop: _[f.current]
                    }, 1)
                }
                f.device = "smp"
            }
        }, 100)
    }

    function p() {
        0 == smpUa.iPhone && 0 == smpUa.iPad && 0 == smpUa.android && 0 == smpUa.windows && c(), setTimeout(function() {
            d(), t()
        }, 1e3)
    }
    var f = {
            current: -1,
            dir: "next",
            span: 2 * $win.height(),
            speed: 540,
            motion: !1,
            firstView: !1,
            first: !1,
            last: !1,
            pager: !1,
            loadType: "new",
            motionType: "normal",
            scrollPosi: 0,
            scrollEndPoint: 0,
            scrollTop: !0,
            scrollEnd: !1,
            device: "pc"
        },
        g = $("#kv-wrap"),
        m = $("#kv-content"),
        v = ($("#kv-inner"), $("#page-contents-wrap")),
        x = $("#page-contents-motion-wrap"),
        y = $("#page-contents-motion-inner"),
        b = $(".motion-wrap"),
        T = $(".section-wrap"),
        w = $(".section-title-wrap"),
        S = $(".section-content"),
        E = $("#pager-wrap"),
        C = ($("#scroll-down"), $(".pc-width-set")),
        A = ($(".smp-height-check"), pjaxSt.load ? "pjax:render" : "load", "top" == $("#document .page-id").attr("id"), 454),
        _ = new Array;
    E.find(".cntroller >*").on(triggerEvent, function() {
        var t = $(this).attr("class");
        "next" == t ? h() : l()
    }), $("#page-top").on("click", function() {
        return "smp" != f.device ? !1 : (f.current = 0, void v.animate({
            scrollTop: 0
        }, 100, function() {
            l()
        }))
    });
    var R = 0;
    if($("#document.top-page").on(mousewheelevent, function(t) {
            if(f.loadType = "new", "top" == $("#document .page-id").attr("id")) {
                var e = t.originalEvent.deltaY ? -t.originalEvent.deltaY : t.originalEvent.wheelDelta ? t.originalEvent.wheelDelta : -t.originalEvent.detail;
                if("pc" == f.device || "smp" == f.device && !f.first || "smp" == f.device && f.first && 0 == f.current && e >= 0 && 0 == v.scrollTop()) {
                    if(t.preventDefault(), 0 > e) {
                        if(t.originalEvent.wheelDelta > -35) return !1;
                        R += t.originalEvent.wheelDelta / 50, h()
                    } else if(e > 0) {
                        if(t.originalEvent.wheelDelta < 35) return !1;
                        R += t.originalEvent.wheelDelta / 50, l(t.originalEvent.wheelDelta)
                    }
                } else s(v.scrollTop())
            }
        }), $win.keyup(function(t) {
            if("top" == $("#document .page-id").attr("id")) {
                if("smp" == f.device) return !1;
                t.preventDefault(), 40 == t.keyCode || 34 == t.keyCode ? h() : 38 != t.keyCode && 33 != t.keyCode || l()
            }
        }), ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Edge/)) var M = ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Edge/),
        L = "MSPointerDown",
        F = "MSPointerMove";
    else var M = "ontouchstart" in window,
        L = M ? "touchstart" : "mousedown",
        F = M ? "touchmove" : "mousemove";
    if(M) {
        var B, P, L = M ? "touchstart" : "mousedown",
            F = M ? "touchmove" : "mousemove",
            D = 0,
            I = 0;
        v.on("scroll", function() {
            "top" == $("#document .page-id").attr("id") && "smp" == f.device && (D = $(this).scrollTop(), s(D), I = D, clearTimeout(P), P = setTimeout(function() {
                0 == I && l()
            }, 100))
        }), $doc.on(L, function(t) {
            if(f.loadType = "new", "top" == $("#document .page-id").attr("id")) {
                var e = u(t);
                B = e.y
            }
        }), $doc.on(F, function(t) {
            if("top" == $("#document .page-id").attr("id") && ("pc" == f.device || "smp" == f.device && !f.first || "smp" == f.device && f.first && 0 == f.current && e.y >= B && 0 == D)) {
                t.preventDefault();
                var e = u(t);
                e.y < B ? h() : l()
            }
        })
    }
    for(var O = T.find(".resize-h"), G = (T.find(".base-h"), []), U = [], k = $(".resize-ele"), W = new Array, N = 0; k.length > N; N++) W[N] = {
        w: k.eq(N).data("basew"),
        h: k.eq(N).data("baseh"),
        m: k.eq(N).data("margin"),
        l: k.eq(N).data("limit"),
        a: 1,
        b: "w"
    }, W[N].a = W[N].w > W[N].h ? W[N].w / W[N].h : W[N].h / W[N].w, W[N].b = W[N].w > W[N].h ? W[N].b = "w" : W[N].b = "h";
    var j = $("#our-team .resize-box,#investment-policy .resize-box");
    $win.on("load", function() {
        f.current = 0, p()

    });
    var X;
    $win.on("resize orientationchange", function() {
        "top" == $("#document .page-id").attr("id") && (clearTimeout(X), X = setTimeout(function() {
            d()
        }, 100))
    })
});