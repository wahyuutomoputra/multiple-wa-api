import Model from "../../models";
import Router from "../../routes";
import Socket from "./socket";
import { WhatsappService } from "../../services/whatsapp.service";
import { whatsapp } from "../whatsapp";

class Autoload {
  public async main() {
    Socket;
    Model.DATABASE.sync();
    Router;
    return;
  }
}

export default Autoload;
