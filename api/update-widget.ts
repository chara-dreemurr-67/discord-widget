import UpdateWidget from "../helpers/UpdateWidget.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const Handler = async (Req: VercelRequest, Res: VercelResponse): Promise<void>  => {
    await UpdateWidget();
    Res.status(200).send("OK");
};

export default Handler;