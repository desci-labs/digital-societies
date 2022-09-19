import { PinataPinResponse } from "@pinata/sdk";

export type PinDataRes = PinataPinResponse | PinataPinResponse[] | { status: string; message: string, error?: any };