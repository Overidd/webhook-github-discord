import { Request, Router, Response } from 'express';
import { GithubController } from './controller';
import { GithubSha256Middleware } from '../middlewares';
import { DiscordService, GitHubService } from '../../application/service';
import { envs } from '../../config';

//* api/github/*
export class GithubRouter {

   static get routes(): Router {
      const router = Router()

      const controller = new GithubController(
         new GitHubService(),
         new DiscordService(envs.DISCORD_WEBHOOK_URL)
      )

      // Middlewares para todos los endpoints de la api/github/*
      router.use(GithubSha256Middleware.verifyGithubSignature)

      router.post('/listen', controller.webhookHandler)
      router.get('/listen', (req: Request, res: Response) => {
         res.send('ok')
      })

      return router
   }
}