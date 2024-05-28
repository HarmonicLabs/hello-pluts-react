import { Address, isData, DataB, Tx } from "@harmoniclabs/plu-ts";
import { fromAscii, uint8ArrayEq } from "@harmoniclabs/uint8array-utils";
import { BrowserWallet } from "@meshsdk/core";
import { script, scriptTestnetAddr } from "../../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";
import Blockfrost from "./blockfrost";

async function getUnlockTx(wallet: BrowserWallet): Promise<Tx> {
  throw new Error("'unlockTx' logic not implemented");   
}

export async function unlockTx(wallet: BrowserWallet): Promise<string> {
  const unsingedTx = await getUnlockTx(wallet);

  const txStr = await wallet.signTx(
    unsingedTx.toCbor().toString(),
    true // partial sign because we have smart contracts in the transaction
  );

  return await Blockfrost.submitTx(txStr);
}