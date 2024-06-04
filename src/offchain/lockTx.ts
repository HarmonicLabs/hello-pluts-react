import { Value, DataB, Address, Tx } from "@harmoniclabs/plu-ts";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { BrowserWallet } from "@meshsdk/core";
import { scriptTestnetAddr } from "../../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";

async function getLockTx(wallet: BrowserWallet, Blockfrost: BlockfrostPluts): Promise<Tx> {
  throw new Error("'lockTx' logic not implemented");
}

export async function lockTx(wallet: BrowserWallet, projectId: string): Promise<string> {
  const Blockfrost = new BlockfrostPluts({ projectId });
  const unsingedTx = await getLockTx(wallet, Blockfrost);
  const txStr = await wallet.signTx(unsingedTx.toCbor().toString());
  return await Blockfrost.submitTx(txStr);
}
