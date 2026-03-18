"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractComponent = exports.detectType = void 0;
var detectType = function (value) {
    var _a, _b, _c;
    if (value == null) {
        return "".concat(value);
    }
    return ((_c = (_b = (_a = Object.getPrototypeOf(value)) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'object').toLowerCase();
};
exports.detectType = detectType;
var DEFAULT_CONFIG = {
    className: [],
    listeners: [],
    tag: 'div',
};
/**
 * @param type
 */
var toEventName = function (type) {
    if (!type)
        return '';
    else
        return "on".concat(type[0].toUpperCase()).concat(type.slice(1));
};
var AbstractComponent = /** @class */ (function () {
    function AbstractComponent(config) {
        this.config = __assign(__assign({}, DEFAULT_CONFIG), config);
        this.container = null;
        this.events = [];
    }
    /**
     * Initializes the component's root element and binds event listeners.
     * Automatically called by render().
     */
    AbstractComponent.prototype.init = function () {
        var _this = this;
        this.container = document.createElement(this.config.tag);
        if (this.config.className) {
            for (var _i = 0, _a = this.config.className; _i < _a.length; _i++) {
                var className = _a[_i];
                this.container.classList.add(className);
            }
        }
        this.events = (this.config.listeners || []).map(function (type) {
            var event = toEventName(type);
            // @ts-expect-error - we need to handle both native and custom events - event handler is not defined
            var callback = _this[event];
            if (!callback) {
                throw Error("handler ".concat(event, " for ").concat(type, " is not implemented"));
            }
            callback = callback.bind(_this);
            _this.container.addEventListener(type, callback);
            return { type: type, callback: callback };
        });
    };
    /**
     * Lifecycle hook invoked after the component is attached to the DOM.
     */
    AbstractComponent.prototype.afterRender = function () { };
    /**
     * Renders the component into the root element.
     * Use toHTML() to define the template.
     */
    AbstractComponent.prototype.render = function () {
        if (this.container)
            this.destroy();
        this.init();
        this.container.innerHTML = this.toHTML();
        this.config.root.appendChild(this.container);
        this.afterRender();
    };
    /**
     * Returns the component's HTML template string.
     */
    AbstractComponent.prototype.toHTML = function () {
        return "";
    };
    /**
     * Removes the component from the DOM and cleans up event listeners.
     */
    AbstractComponent.prototype.destroy = function () {
        var _this = this;
        this.events.forEach(function (_a) {
            var type = _a.type, callback = _a.callback;
            _this.container.removeEventListener(type, callback);
        });
        this.events = [];
        this.container.remove();
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
