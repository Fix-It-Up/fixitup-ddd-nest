import { CreateFromParams } from "../params/create-from.params";

export abstract class UserAbstractFactory{
    public abstract createFrom(params: CreateFromParams): any;
}