

export class DiscordService {

   constructor(
      private readonly discordWebhookUrl: string
   ) { }

   async notify(message: string): Promise<boolean> {
      const body = {
         content: message,
         // embeds: [
         //   {
         //     image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZycHVhaG5jcXNqcG43ZWtpMW9vNGYwZnU0OGhuem91Zmh6ZWNnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif' }
         //   }
         // ]
      }

      const res = await fetch(this.discordWebhookUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      })

      if (!res.ok) {
         throw new Error('Error sending message to discord');
      }
      return true
   }
}
