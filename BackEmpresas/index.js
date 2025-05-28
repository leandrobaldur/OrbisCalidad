import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routers/usuarioRouter.js';
import busquedaRouter from './routers/busquedas.routes.js';
import PremiosRouter from './routers/premiosRouter.js';
import tamaniosRouter from './routers/tamanioRouter.js';
import ingresarEmpresaRouter from './routers/IngresarEmpresaRouter.js'; // 🛠️ ESTE es el correcto
import propietarioRoutes from './routers/propietarioRoutes.js';
import tipoSocietarioRoutes from './routers/tipoSocietarioRoutes.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/empresas', ingresarEmpresaRouter);


app.use('/usuarios', usuarioRoutes); 
app.use(busquedaRouter);
app.use('/', PremiosRouter);
app.use('/', tamaniosRouter);
app.use('/propietarios', propietarioRoutes);
app.use('/tipos', tipoSocietarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
  