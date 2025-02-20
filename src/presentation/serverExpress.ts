import express, { Router } from 'express'


export class ServerExpress {

   private readonly app = express()
   private listerner: any

   constructor(
      private readonly router: Router,
      private readonly port: number,
   ){}

   start(){
      //* Middlewares
      this.app.use(express.json()) // parse application/json
      this.app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

      //* Router
      this.app.use(this.router)
      
      this.listerner = this.app.listen(this.port, () => {
         console.log(`Server running on ${this.port}`);
      })
   }

   stop(){
      if (!this.listerner) return
      this.listerner.close()
   }
}

