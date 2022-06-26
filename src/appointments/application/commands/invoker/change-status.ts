import {Command} from "../abstract/command";

//Invocador
export class ChangeStatus {
    public invoke(command: Command): void {
        command.execute();
    }
}