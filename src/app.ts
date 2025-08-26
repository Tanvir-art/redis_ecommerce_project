 
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorhandler";

const app = Express();

// Custom Morgan format
morgan.token("statusColored", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return chalk.bgRed.white(status.toString());
  if (status >= 400) return chalk.bgYellow.black(status.toString());
  if (status >= 300) return chalk.bgCyan.black(status.toString());
  if (status >= 200) return chalk.bgGreen.black(status.toString());
  return chalk.bgWhite.black(status.toString());
});

// app.use(
//   morgan((tokens, req, res) => {
//     return [
//       chalk.blue(tokens.method(req, res)! as string),
//       chalk.magenta(tokens.url(req, res)! as string),
//       tokens.statusColored?.(req, res),
//       chalk.gray(tokens["response-time"](req, res)! + " ms"),
//     ].join("  ");
//   })
// );


app.use(
  morgan((tokens, req, res) => {
    return [
      chalk.blue(tokens.method!(req, res) as string),          //  Method
      chalk.magenta(tokens.url!(req, res) as string),          //  URL
      tokens.statusColored?.(req, res),                        //  Status
       chalk.gray((tokens["response-time"]!(req, res) ?? "0") + " ms"), //  Response time
    ].join("  ");
  })
);

 
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(globalErrorHandler)

// static file serve
app.use('/uploads', Express.static('uploads'));

app.use('/api', router);

 

export default app;
