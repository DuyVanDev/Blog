using server.Models;

public class PaginatedDataModel
{
    public IEnumerable<BlogPost> Data { get; set; }
    public int TotalCount { get; set; }
}