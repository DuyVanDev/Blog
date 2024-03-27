using System.Net.WebSockets;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using server.DTO;
using server.Models;

namespace server.Services
{
  public class BlogPostService : IBlogPostService
  {
    private readonly IMongoCollection<BlogPost> _blogPostCollection;
    private readonly IMongoCollection<User> _userCollection;
    private readonly IMongoCollection<Category> _categoryCollection;
    private readonly IOptions<MongoDBSettings> _dbSetting;

    public BlogPostService(IOptions<MongoDBSettings> dbSetting)
    {
      _dbSetting = dbSetting;
      var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
      var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
      _blogPostCollection = mongoDatabase.GetCollection<BlogPost>(dbSetting.Value.PostCollectionName);
      _userCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);
      _categoryCollection = mongoDatabase.GetCollection<Category>(dbSetting.Value.CategoryCollectionName);
    }

    public async Task CreateAsync(BlogPost blogPost)
    {
      await _blogPostCollection.InsertOneAsync(blogPost);
      return;
    }


    public async Task<IEnumerable<BlogPost>> GetAllAsync()
    {
      var pipeline = new List<BsonDocument>
        {
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
            BsonDocument.Parse("{ $project: { Title: 1, Content: 1,Likes : 1, Username :'$blogpost_users.Username', UserID: 1 , CreatedAt : 1, CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color',isApprove : 1,LikedBy: 1, Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")
            // BsonDocument.Parse("{ $limit: " + limit + " }")
        };

      var aggregationResult = _blogPostCollection.Aggregate<BsonDocument>(pipeline);

      var blogPosts = new List<BlogPost>();

      foreach (var result in aggregationResult.ToEnumerable())
      {
        var blogPost = BsonSerializer.Deserialize<BlogPost>(result);
        blogPosts.Add(blogPost);
      }
      return blogPosts;

    }

    public async Task<IEnumerable<BlogPost>> GetBlogPostsByUser(ObjectId userId)
    {

      var matchStage = new BsonDocument("$match", new BsonDocument("UserID", userId));
      // BsonDocument.Parse("{ $match: { UserID: ObjectId('" + userId.ToString() + "') } }"),
      var pipeline = new List<BsonDocument>
        {
          matchStage,
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
            BsonDocument.Parse("{ $project: { Title: 1, Content: 1 ,Likes : 1, Username :'$blogpost_users.Username', UserID: 1 , LikedBy: 1,CreatedAt : 1 , CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color', isApprove : 1,  Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")
        };

      var aggregationResult = _blogPostCollection.Aggregate<BsonDocument>(pipeline);

      var blogPosts = new List<BlogPost>();

      foreach (var result in aggregationResult.ToEnumerable())
      {
        var blogPost = BsonSerializer.Deserialize<BlogPost>(result);
        blogPosts.Add(blogPost);
      }
      return blogPosts;

    }

    public async Task<PaginatedDataModel> GetPaginatedData(int page, int pageSize)
    {
      // Logic to fetch paginated data (e.g., from a database)
      // Return the data along with total count for client-side pagination
      var pipeline = new List<BsonDocument>
        {
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
            BsonDocument.Parse("{ $project: { Title: 1, Content: 1 ,Likes : 1, Username :'$blogpost_users.Username', UserID: 1 , LikedBy: 1,CreatedAt : 1 , CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color',isApprove : 1,  Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")
            // BsonDocument.Parse("{ $limit: " + limit + " }")
        };

      var aggregationResult = _blogPostCollection.Aggregate<BsonDocument>(pipeline);

      var blogPosts = new List<BlogPost>();

      foreach (var result in aggregationResult.ToEnumerable())
      {
        var blogPost = BsonSerializer.Deserialize<BlogPost>(result);
        blogPosts.Add(blogPost);
      }
      blogPosts = blogPosts
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();
      var total = GetTotalPost();

      return new PaginatedDataModel
      {
        Data = blogPosts,
        TotalCount = total
      };
    }


    public async Task<BlogPost> GetById(string id)
    {
      ObjectId oId = new ObjectId(id);

      var matchStage = new BsonDocument("$match", new BsonDocument("_id", oId));
      var pipeline = new List<BsonDocument>
        {
            //  BsonDocument.Parse("{ $match: { PostID: ObjectId('" + oId.ToString() + "') } }"),
            matchStage,
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
            BsonDocument.Parse("{ $project: { Title: 1, Content: 1 ,Likes : 1, isApprove : 1,Username :'$blogpost_users.Username',LikedBy: 1, UserID: 1 , CreatedAt : 1 , CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color',  Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")

        };

      var aggregationResult = _blogPostCollection.Aggregate<BlogPost>(pipeline);

      var blogPost = aggregationResult.FirstOrDefault(); // Get the first matching document



      return blogPost;
    }

    public async Task<IEnumerable<BlogPost>> SearchBlogPost(string searchValue)
    {

      var regexPattern = new BsonRegularExpression($".*{Regex.Escape(searchValue)}.*", "i");

      // Sử dụng $regex để thực hiện tìm kiếm gần đúng với giá trị
      var matchStage = new BsonDocument("$match", new BsonDocument("Title", new BsonDocument("$regex", regexPattern)));
      var pipeline = new List<BsonDocument>
        {
            matchStage,
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
             BsonDocument.Parse("{ $project: { Title: 1, Content: 1 ,Likes : 1, Username :'$blogpost_users.Username', isApprove : 1,UserID: 1 , LikedBy: 1,CreatedAt : 1 , CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color',  Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")
        };

      var aggregationResult = _blogPostCollection.Aggregate<BsonDocument>(pipeline);

      var blogPosts = new List<BlogPost>();

      foreach (var result in aggregationResult.ToEnumerable())
      {
        var blogPost = BsonSerializer.Deserialize<BlogPost>(result);
        blogPosts.Add(blogPost);
      }
      return blogPosts;

    }

    public int GetTotalPost()
    {
      var filter = Builders<BlogPost>.Filter.Eq("isApprove", true);
      long count = _blogPostCollection.CountDocuments(filter);
      int totalCount = Convert.ToInt32(count);
      return totalCount;
    }

    public async Task UpdateBlogPost(string postId, string userId, BlogPost blogPost) =>
        await _blogPostCollection.ReplaceOneAsync(blogPost => blogPost.PostID == postId && blogPost.UserID == userId, blogPost);

    public async Task DeleteAysnc(string id) =>
       await _blogPostCollection.DeleteOneAsync(a => a.PostID == id);

    public async Task LikePost(string postId, string userId)
    {
      var post = _blogPostCollection.Find<BlogPost>(p => p.PostID == postId).FirstOrDefault();




      if (post.LikedBy.Contains(userId))
      {
        // Hủy like nếu đã like trước đó
        post.Likes--;
        post.LikedBy.Remove(userId);
      }
      else
      {
        // Thêm like nếu chưa like
        post.Likes++;
        post.LikedBy.Add(userId);
      }

      _blogPostCollection.ReplaceOne(p => p.PostID == postId, post);


    }

    public async Task Approve(string postId)
    {
      // var post = _blogPostCollection.Find<BlogPost>(p => p.PostID == postId).FirstOrDefault();
      var filter = Builders<BlogPost>.Filter.Eq(post => post.PostID, postId);
      var update = Builders<BlogPost>.Update.Set(post => post.isApprove, true);
      var result = _blogPostCollection.UpdateOne(filter, update);
    }


    public async Task<IEnumerable<BlogPost>> GetPopularPost()
    {

      var pipeline = new List<BsonDocument>
        {
            BsonDocument.Parse("{ $lookup: { from: 'users', localField: 'UserID', foreignField: '_id', as: 'blogpost_users' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_users' }"),
            BsonDocument.Parse("{ $lookup: { from: 'categories', localField: 'CategoryID', foreignField: '_id', as: 'blogpost_category' } }"),
            BsonDocument.Parse("{ $unwind: '$blogpost_category' }"),
            BsonDocument.Parse("{ $project: { Title: 1, Content: 1 ,Likes : 1, Username :'$blogpost_users.Username', UserID: 1 , CreatedAt : 1 , CategoryName : '$blogpost_category.CategoryName' , Color : '$blogpost_category.Color',isApprove : 1,LikedBy: 1, Image: 1, Comments: 1,CategoryID: 1, Avatar :'$blogpost_users.Avatar'} }")
        };

      var aggregationResult = _blogPostCollection.Aggregate<BsonDocument>(pipeline);

      var blogPosts = new List<BlogPost>();

      foreach (var data in aggregationResult.ToEnumerable())
      {
        var blogPost = BsonSerializer.Deserialize<BlogPost>(data);
        blogPosts.Add(blogPost);

      }
      var result = blogPosts.AsQueryable()
          .Where(post => post.LikedBy != null && post.LikedBy.Any())
          .OrderByDescending(post => post.LikedBy.Count)
          .Take(5)
          .ToList();

      return result;
      // return blogPosts;


    }
  }
}