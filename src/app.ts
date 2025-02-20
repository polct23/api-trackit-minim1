import express, { RequestHandler } from 'express';
import { startConnection } from './database';
import { setupSwagger } from './swagger'; 
import userRoutes from './routes/user.routes'; 
import subjectRoutes from './routes/subject.routes';

const app: express.Application = express();

app.set('port', process.env.PORT || 4000);

app.use(express.json() as RequestHandler);

startConnection();

setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});

export default app;