


    Array.prototype.DelEmptyElement = function (a) { a = [].concat(a || []); var b = []; if (0 < a.length) for (i = 0; i < this.length; i++) for (j = 0; j < a.length; j++) this[i] !== a[j] && b.push(this[i]); else for (i = 0; i < this.length; i++) null !== this[i] && void 0 !== this[i] && "" !== this[i] && b.push(this[i]); return b }; String.prototype.toNumber = function () { return Number(this) }; String.prototype.toNumberInt = function () { return parseInt(this) }; String.prototype.toNumberFloat = function () { return parseFloat(this) };
    String.prototype.Format = function () { var a = Array.from(arguments), b = this.toString(); return a.forEach(function (a, d) { b = b.replace(RegExp("(\\{" + d + "\\})", "g"), a.toString()) }), (new String(b)).toString() }; String.prototype.TryParseInt = function (a) { var b = this; try { b = parseInt(b), isNaN(b) && (b = void 0 === a ? 0 : a) } catch (c) { b = void 0 === a ? 0 : a } return b }; String.prototype.TryParseFloat = function (a) { var b = this; try { b = parseFloat(b), isNaN(b) && (b = void 0 === a ? 0 : a) } catch (c) { b = void 0 === a ? 0 : a } return b };
    window.GetNewGUID = function () { function a() { return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) } return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a() };

    window.T12to24Sec = function (T) {
        if (T == "") return "";
        var m = moment(T, 'hh:mm:ss A');
        return m.format("HH:mm:ss");
    }
    window.T12to24 = function (T) {
        if (T == "") return "";
        var m = moment(T, 'hh:mm A');
        return m.format("HH:mm");
    }
    window.T24to12Sec = function (T) {
        if (T == "") return "";
        var m = moment(T, "HH:mm:ss");
        return m.format('hh:mm:ss A');
    }
    window.T24to12 = function (T) {
        if (T == "") return "";
        var m = moment(T, "HH:mm");
        return m.format('hh:mm A');
    }
    Date.prototype._SyncID = null;
    Date.prototype.addMS = function (ms) {
        this.setMilliseconds(this.getMilliseconds() + parseInt(ms));
        return this;
    };
    Date.prototype.startSyncWithTime = function () {
        if (this._SyncID == nul) {
            this._SyncID = window.setInterval(function (dateOb) {
                dateOb.addMS(1);
            }, 1, this);
        }
    }
    Date.prototype.stopSync = function () {
        if (this._SyncID) { window.clearInterval(this._SyncID); this._SyncID = null; }
    }
   
