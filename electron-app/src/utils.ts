import * as fs from "fs";
import * as base64 from "base-64";
import * as utf8 from "utf8";
import cryptoJs from "crypto-js";
import { platform } from "os";
import * as ps from "ps-node";

export const getPlatform = () => {
  switch (platform()) {
    case "aix":
    case "freebsd":
    case "linux":
    case "openbsd":
    case "android":
      return "linux";
    case "darwin":
    case "sunos":
      return "mac";
    case "win32":
      return "win";
  }
};

export const getBinaryParameter = (obj: any = {}) => {
  const keys = Object.keys(obj);
  return keys.map((key: string) => `-${key}=${obj[key]}`);
};

export const responseMessage = (success: boolean, res: any) => {
  if (success) {
    return { success: true, data: res };
  }
  return { success: false, message: res.message };
};

// Check file exists or not
export const checkFileExists = (filePath: string) => {
  return fs.existsSync(filePath);
};

// Check file exists or not
export const deleteFile = (filePath: string) => {
  return fs.unlinkSync(filePath);
};

// Get file data
export const getFileData = (filePath: string, format: string = "utf-8") => {
  try {
    return fs.readFileSync(filePath, format);
  } catch (err) {
    throw err;
  }
};

// write / append on UI config file
export const writeFile = (filePath: string, data: any, append?: boolean) => {
  try {
    if (append && checkFileExists(filePath)) {
      return fs.appendFileSync(filePath, data);
    } else {
      return fs.writeFileSync(filePath, data, "utf8");
    }
  } catch (err) {
    throw err;
  }
};

export const generatePassword = () => {
  //  Create 32 byte password
  const salt = cryptoJs.lib.WordArray.random(32);
  const encoded = base64.encode(salt.toString());
  const bytes = base64.decode(encoded);
  return utf8.decode(bytes);
};

//  get default RPC auth
export const getRpcAuth = (rpcuser: string) => {
  const rpcpassword = generatePassword();
  const salt = cryptoJs.lib.WordArray.random(16);
  const passwordHmac = cryptoJs.HmacSHA256(rpcpassword, salt);
  return {
    rpcuser,
    rpcpassword,
    rpcauth: `${rpcuser}:${salt}$${passwordHmac}`,
  };
};

export const getProcesses = (args: any) => {
  return new Promise((resolve, reject) => {
    ps.lookup(args, (err: any, result: unknown) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

export const stopProcesses = (processId: number | string) => {
  return new Promise((resolve, reject) => {
    ps.kill(processId, "SIGTERM", (err: any, result: unknown) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};