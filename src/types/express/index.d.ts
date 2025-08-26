// src/types/express/index.d.ts
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // optional, কারণ সব route এ নাও থাকতে পারে
    }
  }
}
