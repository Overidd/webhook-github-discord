import { envs } from "./config"
import { RouterExpress } from "./presentation/router"
import { ServerExpress } from "./presentation/serverExpress"


const main = async () => {

   const server = new ServerExpress(
      RouterExpress.router,
      envs.PORT
   )

   await server.start()
}

(async () => {
   await main()
})()
