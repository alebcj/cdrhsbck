"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var import_fs = require("fs");
var fs = import_fs.promises;
var Contenedor = /** @class */ (function () {
    function Contenedor(nombreArchivo) {
        this.products = [];
        this.maxId = 0;
        this.filename = "./src/".concat(nombreArchivo);
    }
    Contenedor.prototype.save = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        this.maxId++;
                        product.id = this.maxId;
                        this.products.push(product);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.writeFile(this.filename, JSON.stringify(this.products))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.maxId];
                    case 4:
                        err_1 = _a.sent();
                        console.log("Error al agregar ".concat(product, " en Archivo: ").concat(this.filename, ": ").concat(err_1));
                        throw new Error(err_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.update = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var productOld, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getById(product.id)];
                    case 2:
                        productOld = _a.sent();
                        if (!(productOld != null)) return [3 /*break*/, 4];
                        productOld.title = product.title;
                        productOld.price = product.price;
                        productOld.thumbnail = product.thumbnail;
                        return [4 /*yield*/, fs.writeFile(this.filename, JSON.stringify(this.products))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        console.log("Error al actualizar ".concat(product, " en Archivo: ").concat(this.filename, ": ").concat(err_2));
                        throw new Error(err_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var aux, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        aux = _a.sent();
                        return [2 /*return*/, aux.find(function (obj) { return obj.id == id; }) || null];
                    case 2:
                        err_3 = _a.sent();
                        console.log("Error al obtener elemento con \u00EDndice \"".concat(id, "\" no existe en Archivo: \"").concat(this.filename, "\" ERROR: ").concat(err_3));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.getRandom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aux, id_1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        aux = _a.sent();
                        id_1 = Math.floor(Math.random() * (this.maxId - 1)) + 1;
                        console.log(id_1);
                        return [2 /*return*/, aux.find(function (obj) { return obj.id == id_1; }) || null];
                    case 2:
                        err_4 = _a.sent();
                        console.log("Error al obtener elemento Random en Archivo: \"".concat(this.filename, "\" ERROR: ").concat(err_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productos, _a, _b, err_5;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        if (!!import_fs.existsSync(this.filename)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.writeFile(this.filename, JSON.stringify([]))];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.readFile(this.filename, "utf-8")];
                    case 3:
                        productos = _b.apply(_a, [_c.sent()]);
                        this.products = productos;
                        if (this.products.length > 0) {
                            this.products.map(function (producto) {
                                if (producto.id && _this.maxId < producto.id)
                                    _this.maxId = producto.id;
                            });
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/, this.products];
                    case 5:
                        err_5 = _c.sent();
                        console.log("Error al obtener productos de Archivo: \"".concat(this.filename, "\" ERROR: ").concat(err_5));
                        throw new Error(err_5);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var aux, x, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        aux = _a.sent();
                        x = aux.findIndex(function (obj) { return obj.id == id; });
                        if (!(x != -1)) return [3 /*break*/, 3];
                        aux.splice(x, 1);
                        return [4 /*yield*/, fs.writeFile(this.filename, JSON.stringify(aux))];
                    case 2:
                        _a.sent();
                        console.log("Se elimin\u00F3 Objeto de ID: \"".concat(id, "\" de Archivo: \"").concat(this.filename, "\""));
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_6 = _a.sent();
                        console.log("Error al eliminar producto de ID: \"".concat(id, "\" en Archivo: \"").concat(this.filename, "\" Error: ").concat(err_6));
                        throw new Error(err_6);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Contenedor.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.products = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.writeFile(this.filename, JSON.stringify([]))];
                    case 2:
                        _a.sent();
                        console.log("Se elimin\u00F3 el Archivo: \"".concat(this.filename, "\""));
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        console.log("Error al eliminar el Archivo: \"".concat(this.filename, "\" Error: ").concat(err_7));
                        throw new Error(err_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Contenedor;
}());
module.exports = Contenedor;
