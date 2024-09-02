import { Address, PScriptContext, ScriptType, Credential, Script, compile, pfn, unit, plet, punBData, pmatch, perror, PMaybe, data, pBool, passert } from "@harmoniclabs/plu-ts";

const contract = pfn([
  PScriptContext.type
], unit)
(({ redeemer, tx, purpose }) => {
  return passert.$(false);
});

export const compiledContract = compile(contract);

export const script = new Script(
  ScriptType.PlutusV3,
  compiledContract
);

export const scriptTestnetAddr = new Address(
  "testnet",
  Credential.script(script.hash)
);