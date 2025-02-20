import { GitHubIssuePayload, GitHubStarPayload } from "../../domain";


export class GitHubService {

   onStar(payload: GitHubStarPayload): string {
      const { action, sender, repository } = payload;

      if (action === 'created') {
         return `El usuario ${sender.login} dio una estrella ${repository.full_name}`;
      }
      if (action === 'deleted') {
         return `El usuario ${sender.login} quito una estrella ${repository.full_name}`;
      }

      return `Unhandled action ${action}`;
   }

   onIssue(payload: GitHubIssuePayload): string {
      const { action, issue } = payload;

      if (action === 'opened') {
         return `Se un issue emitio con este título: ${issue.title}`;
      }

      if (action === 'closed') {
         return `El issue fue cerrado por: ${issue.user.login}`;
      }

      if (action === 'reopened') {
         return `El issue fue reabierto por: ${issue.user.login}`;
      }

      return `Unhandled action ${action}`;
   }
} 