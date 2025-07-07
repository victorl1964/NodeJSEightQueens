import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import { INQueen, NQueen } from './types/models';

import { isAnInteger } from './utils/utils';
const logger = require('morgan');
// Configuring the threadpool size. LIBUV is configured to create a Threadpool
// size of 4. In this case my desktop also have 4 CPU, so with the lines of
// code below I won't achive a better configuration (1 thread / CPU) =
// 4 Threads. But the outcome could be better in a different environment !!!
//
const OS = require('os');
console.log("Number or CPU's detected on this machine: ", OS.cpus().length);
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;
//
const app = express();
app.use(
  cors({
    // Let's suppose that a client web app running in 3001 is going
    // to send requests to this backend
    origin: ['http://localhost:3001'],
  })
);
/*
const requestAndResponsePropertiesToLog =
        ' :remote-addr - :remote-user [:date[clf]]"' +
        ' ":method :url HTTP/:http-version" :status :res[content-length]' +
        ' ":referrer" ":user-agent" ":req[accept-language]"';
        //
        // 1) Only in case we want to log only errors
        //
        // app.use(logger(requestAndResponsePropertiesToLog, {
        //  skip: function (req, res) { return res.statusCode < 400; }
        // }));
app.use(logger(requestAndResponsePropertiesToLog));
*/
// no need to install bodyParse any more
app.use(express.json());
//
app.get('/eightqueens/_healthcheck', async (req: Request, res: Response) => {
  res.status(200).send({ message: 'N QUEENS API RUNNING OK' });
});
//
app.get(
  '/eightqueens/size/:size/first/:first/all/:all',
  async (req: Request, res: Response) => {
    const all: boolean = req.params.all === 'true' ? true : false;
    const sizeStr = req.params.size;
    const firstQueenPosition = req.params.first;
    if (!isAnInteger(req.params.size) || !isAnInteger(req.params.first)) {
      res
        .status(400)
        .send({ message: 'Size/FirstQueenPosition must be INTEGERS !!!' });
      return;
    }

    const matrix: INQueen = new NQueen(
      Number.parseInt(req.params.size),
      Number.parseInt(req.params.first)
    );
    if (!matrix.validateConfig()) {
      res
        .status(400)
        .send({ message: 'Size/FirstQueenPosition have WRONG/VALUES !!!' });
      return;
    }

    matrix.initSolution();
    //console.log(matrix.currentSolution);
    matrix.findAllSolutions(all);

    res
      .status(200)
      .send({
        message: 'N QUEENS API RUN OK...solutions founds are',
        matrix: matrix,
      });
  }
);

app.listen(3000, () => {
  console.log('Backend Server running in port 3000 !!!');
});
