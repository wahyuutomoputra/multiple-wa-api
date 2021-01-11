import Model from "../../models";
import Router from "../../routes";
import Socket from "./socket";

class Autoload {
    public main() {
        Socket;
        Model.DATABASE.sync();
        Router;
        return;
    }
}

export default Autoload;