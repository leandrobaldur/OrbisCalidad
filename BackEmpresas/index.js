import express from 'express';
import cors from 'cors';
import empresaRoutes from './routers/empresas.js';
import filtradoRoutes from './routers/filtradoRouter.js';
import usuarioRoutes from './routers/usuarioRouter.js';
import sedesRoutes from './routers/sedesRouter.js';
import itemsRoutes from './routers/itemsRouter.js';
import busquedaRouter from './routers/busquedasRouter.js';
import PremiosRouter from './routers/premiosRouter.js';
import tamaniosRouter from './routers/tamanioRouter.js';
import ingresarEmpresaRouter from './routers/IngresarEmpresaRouter.js';
import familiaRouter from './routers/familiaRouter.js';
import tipoSocietarioRoutes from './routers/tipoSocietarioRoutes.js';
import rubroRoutes from './routers/rubroRouter.js';
import logsRouter from './routers/logsRoutes.js';
import actividadesRouter from './routers/actividadesRouter.js';
import internacionalRouter from './routers/internacionalRouter.js';
import { swaggerUi, swaggerSpec } from './swagger.js';
import hitosRouter from './routers/hitosRouter.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', empresaRoutes);
app.use('/usuarios', usuarioRoutes); // Las rutas estarán bajo /usuarios
app.use('/filtrado', filtradoRoutes); // Las rutas estarán bajo /filtrado
app.use('/sedes', sedesRoutes);
app.use('/items', itemsRoutes);
app.use(busquedaRouter);
app.use('/', PremiosRouter);
app.use('/', tamaniosRouter);
app.use('/', ingresarEmpresaRouter);
app.use('/', tipoSocietarioRoutes);
app.use('/familia', familiaRouter);
app.use('/tipos', tipoSocietarioRoutes);
app.use(rubroRoutes);
app.use('/logs', logsRouter); 
app.use('/actividades', actividadesRouter);
app.use('/internacional', internacionalRouter)
app.use('/hitos', hitosRouter);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});