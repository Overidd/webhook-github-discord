import { Router } from 'express';
import { GithubRouter } from './github';


export class RouterExpress {
   static get router(): Router {
      const router = Router()

      router.use('api/github', GithubRouter.routes)

      return router
   }

}

