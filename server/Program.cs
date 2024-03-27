using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using server.Services;
using CloudinaryDotNet;
using Microsoft.AspNetCore.WebSockets;
using System.Net.WebSockets;
using System.Net;
// using server.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB")
);
builder.Services.AddSingleton<MongoDBSettings>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBlogPostService, BlogPostService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IFriendService, FriendService>();

builder.Services.AddSingleton<IDictionary<string, string>>(opts => new Dictionary<string, string>());
builder.Services.AddSingleton<WebSocketNotificationService>();

builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddSingleton<WebSocketHandler>();

var secretKey = builder.Configuration.GetValue<string>("Appsettings:SecretKey");
var key = Encoding.ASCII.GetBytes(secretKey);
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //tu cap token
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        //ky vao token
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero


    };
});

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.AllowAnyHeader().AllowCredentials().AllowAnyMethod().WithOrigins("http://localhost:5173","http://localhost:3000");
}));


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSingleton(new Cloudinary(new Account(
    "dqpjoki72",
    "787796799295732",
    "UmBWvTfcxPw9QKe6yGHCFzb5JJE")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseMiddleware<WebSocketMiddleware>();

    app.UseSwaggerUI();
}
app.UseRouting();
app.UseWebSockets();
// app.UseMiddleware<WebSocketMiddleware>();
app.Map("/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var ws = await context.WebSockets.AcceptWebSocketAsync();
        while (true)
        {
            var message = "The current time is: " + DateTime.Now.ToString("HH:mm:ss");
            var bytes = Encoding.UTF8.GetBytes(message);
            var arraySegment = new ArraySegment<byte>(bytes, 0, bytes.Length);
            if (ws.State == WebSocketState.Open)
                await ws.SendAsync(arraySegment,
                                    WebSocketMessageType.Text,
                                    true,
                                    CancellationToken.None);
            else if (ws.State == WebSocketState.Closed || ws.State == WebSocketState.Aborted)
            {
                break;
            }
            Thread.Sleep(1000);

        }
    }
    else
    {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
    }
});
app.UseCors("corspolicy");



app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();



app.Run();
