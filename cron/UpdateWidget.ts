import Data from "../Data.js";
import LoadEnv from "../LoadEnv.js";

const UpdateWidget = async (): Promise<void> => {
    const Response: Response = await fetch(
        `https://discord.com/api/v9/applications/${LoadEnv.APPLICATION_ID}/users/${LoadEnv.USER_ID}/identities/0/profile`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${LoadEnv.DISCORD_TOKEN}`,
                "User-Agent": "DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)"
            },
            body: Data.GetJSON()
        }
    );
    console.log("Status:", Response.status);
    console.log("Status Text:", Response.statusText);
    console.log("Body:", await Response.text());
};

export default UpdateWidget;