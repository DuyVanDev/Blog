namespace server.DTO
{
    public class BlogPostDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserID { get; set; }
        public string CategoryID { get; set; }
        public string Image { get; set; }

        public DateTime? CreatedAt { get; set; } 
    }
}
