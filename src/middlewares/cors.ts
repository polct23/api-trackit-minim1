import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:4200', 
    optionsSuccessStatus: 200 
};

export default cors(corsOptions);