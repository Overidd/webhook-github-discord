import { Request, Response } from "express";
import { EventGithub } from "../../domain";
import { DiscordService, GitHubService } from "../../application/service";


export class GithubController {
   constructor(
      private readonly gitHubService: GitHubService,
      private readonly discordService: DiscordService,
   ) { }

   private switchEvent(typeEvent: string, payload: any): string {
      switch (typeEvent) {
         case EventGithub.START:
            return this.gitHubService.onStar(payload);
         case EventGithub.ISSUES:
            return this.gitHubService.onIssue(payload);
         default:
            return 'Event not found';
      }
   }

   webhookHandler = (req: Request, res: Response) => {
      const githubEvent = req.header('x-github-event') ?? 'unknown'
      const payload = req.body;
      console.log(req.header('x-github-event'));
      console.log(JSON.stringify(payload));
      const message = this.switchEvent(githubEvent, payload);

      this.discordService.notify(message)
         .then(() => {
            res.status(202).send('Accepted');
         })
         .catch(() => {
            res.status(500).send('Error sending message to discord');
         })
   }
}