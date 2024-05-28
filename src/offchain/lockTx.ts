import { Value, DataB, Address, Tx } from "@harmoniclabs/plu-ts";
import { BrowserWallet } from "@meshsdk/core";
import { scriptTestnetAddr } from "../../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";
import Blockfrost from "./blockfrost";

async function getLockTx(wallet: BrowserWallet): Promise<Tx> {
  throw new Error("'lockTx' logic not implemented");
}

export async function lockTx( wallet: BrowserWallet): Promise<string> {
  const unsingedTx = await getLockTx(wallet);
  const txStr = await wallet.signTx(unsingedTx.toCbor().toString());
  return await Blockfrost.submitTx(txStr);
}
