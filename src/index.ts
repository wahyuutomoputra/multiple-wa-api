import { server } from "./lib/system/server"
import Autoload from "./lib/system/autoload";
import { WhatsappService } from "./services/whatsapp.service";

const autoload = new Autoload();
// const service = new WhatsappService();

autoload.main();
// setTimeout(() => {
//     service.reloadDevice();
// }, 5000);

server.listen(8080, () => console.log('listening port 8080'));

