import UpdateWidget from "../helpers/UpdateWidget.js";

const Handler = async (_Req: any, Res: any): Promise<void>  => {
    await UpdateWidget();
    Res.status(200).send("OK");
};

export default Handler;