import { getSSLHubRpcClient } from "@farcaster/hub-nodejs";
const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
export const farcasterClient = getSSLHubRpcClient(HUB_URL);
