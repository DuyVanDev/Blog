namespace server.Models
{
    public class AuthToken : Token
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        
    }
}
