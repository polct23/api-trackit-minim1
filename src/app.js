"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const swagger_1 = require("./swagger");
const cors_1 = __importDefault(require("./middlewares/cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const packet_routes_1 = __importDefault(require("./routes/packet.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes")); // Importar las rutas de categorías
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 4000);
app.use(cors_1.default);
app.use(express_1.default.json());
(0, database_1.startConnection)();
(0, swagger_1.setupSwagger)(app);
app.use('/api/users', user_routes_1.default);
app.use('/api/packets', packet_routes_1.default);
app.use('/api/categories', category_routes_1.default); // Registrar las rutas de categorías
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    console.log(`Swagger disponible a http://localhost:${app.get('port')}/api-docs`);
});
exports.default = app;
