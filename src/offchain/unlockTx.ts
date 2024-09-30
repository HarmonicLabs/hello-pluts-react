import { Address, isData, DataB, Tx } from "@harmoniclabs/plu-ts";
import { fromAscii, uint8ArrayEq } from "@harmoniclabs/uint8array-utils";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { BrowserWallet } from "@meshsdk/core";
import { script, scriptTestnetAddr } from "../../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";

async function getUnlockTx(wallet: BrowserWallet, Blockfrost: BlockfrostPluts): Promise<Tx> {
  throw new Error("'unlockTx' logic not implemented");   
}

export async function unlockTx(wallet: BrowserWallet, projectId: string): Promise<string> {
  const Blockfrost = new BlockfrostPluts({ projectId });
  const unsingedTx = await getUnlockTx(wallet, Blockfrost);

  const txStr = await wallet.signTx(
    unsingedTx.toCbor().toString(),
    true // partial sign because we have smart contracts in the transaction
  );

  const txWit = Tx.fromCbor(txStr).witnesses.vkeyWitnesses ?? [];
  for (const wit of txWit) {
    unsingedTx.addVKeyWitness(wit);
  }

  return await Blockfrost.submitTx(unsingedTx);
}