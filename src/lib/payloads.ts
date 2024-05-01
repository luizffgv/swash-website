import { Payload } from "swash";

/** Should sets the value of the receiver to the given value. */
export class SetPayload extends Payload<number> {}

/** Should multiply the value of the receiver by the given value. */
export class MultiplyPayload extends Payload<number> {}

/** Should add the given value to the value of the receiver. */
export class AddPayload extends Payload<number> {}
