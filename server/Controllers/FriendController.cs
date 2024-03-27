using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using server.DTO;
using AutoMapper;
using MongoDB.Bson;
using System.Net;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendController : ControllerBase
    {
        private readonly IFriendService _friendService;
        public FriendController(IFriendService friendService)
        {
            _friendService = friendService;
        }
        

[HttpGet("")]
        public async Task<IActionResult> Post()
        {
            
            return Ok(""); 
        } 

        [HttpPost("send-request")]
        public async Task<IActionResult> SendFriendRequest(string senderId, string receiverId)
        {
            await _friendService.SendFriendRequest(senderId, receiverId);
            return Ok("Friend request sent successfully.");
        }

        [HttpPost("accept-request")]
        public async Task<IActionResult> AcceptFriendRequest(string userId, string friendId)
        {
            await _friendService.AcceptFriendRequest(userId, friendId);
            return Ok("Friend request accepted successfully.");
        }

        [HttpPost("decline-request")]
        public async Task<IActionResult> DeclineFriendRequest(string userId, string friendId)
        {
            await _friendService.DeclineFriendRequest(userId, friendId);
            return Ok("Friend request declined successfully.");
        }
    }
}