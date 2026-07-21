import type { VercelRequest, VercelResponse } from "@vercel/node";

const Handler = async (_Req: VercelRequest, Res: VercelResponse): Promise<void>  => {
    Res.status(200).send("OK");
};

export default Handler;