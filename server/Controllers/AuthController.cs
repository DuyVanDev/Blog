using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IUserService _userService;
        private readonly AppSetting _appSettings;
        public AuthController(IAuthService authService, IRefreshTokenService refreshTokenService, IUserService userService, IOptionsMonitor<AppSetting> optionsMonitor)
        {
            _authService = authService;
            _refreshTokenService = refreshTokenService;
            _userService = userService;
            _appSettings = optionsMonitor.CurrentValue;
        }



        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is null.");

            }

            if (_authService.UserExists(user))
            {
                return BadRequest("User has been alreadly");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _authService.Register(user);
            return Ok("Create successfully");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var result = await _authService.Login(user);
            if (result == null) //không đúng
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid username or password"
                });
            }



            var token = await GenerateToken(result);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //cấp token
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Authenticate success",
                Data = token


            });

        }

        private async Task<Token> GenerateToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Username", user.Username),
                    new Claim("UserId", user.UserID)

                }),
                Expires = DateTime.UtcNow.AddSeconds(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature)

            };
            var token = jwtTokenHandler.CreateToken(tokenDesc);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();
            var refreshTokenEntity = new RefreshToken
            {
                Id = Guid.NewGuid(),
                JwtId = token.Id,
                UserId = user.UserID,
                Token = refreshToken,
                IsUsed = false,
                IsRevoked = false,
                IssuedAt = DateTime.UtcNow,
                ExpiredAt = DateTime.UtcNow.AddDays(10)
            };

            await _refreshTokenService.AddRefreshToken(refreshTokenEntity);

            return new AuthToken
            {
                UserId = user.UserID,
                Username = user.Username,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }

        private DateTime ConvertUnixTimeToDateTime(long utcExpireDate)
        {
            //var dateTimeInterval = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            //dateTimeInterval.AddMicroseconds(utcExpireDate).ToLocalTime();
            var expirationTime = DateTimeOffset.FromUnixTimeSeconds(utcExpireDate).DateTime;
            return expirationTime;
        }
        [HttpPost("RenewToken")]
        public async Task<IActionResult> RenewToken(Token model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);
            var tokenValidateParam = new TokenValidationParameters
            {
                //tự cấp token
                ValidateIssuer = false,
                ValidateAudience = false,

                //ký vào token
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),

                ClockSkew = TimeSpan.Zero,

                ValidateLifetime = false //ko kiểm tra token hết hạn
            };
            try
            {

                //check 1: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(model.AccessToken, tokenValidateParam, out var validatedToken);

                //check 2: Check alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase);
                    if (!result)//false
                    {
                        return Ok(new ApiResponse
                        {
                            Success = false,
                            Message = "Invalid token"
                        });
                    }
                }

                //check 3: Check accessToken expire?
                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expireDate = ConvertUnixTimeToDateTime(utcExpireDate);
                if (expireDate > DateTime.UtcNow)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Access token has not yet expired"
                    });
                }

                //check 4: Check refreshtoken exist in DB
                var storedToken = await _refreshTokenService.GetStoredToken(model);
                if (storedToken == null)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token does not exist"
                    });
                }

                //check 5: check refreshToken is used/revoked?
                if (storedToken.IsUsed)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been used"
                    });
                }
                if (storedToken.IsRevoked)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been revoked"
                    });
                }

                //check 6: AccessToken id == JwtId in RefreshToken
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if (storedToken.JwtId != jti)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Token doesn't match"
                    });
                }
                //check 7: Check RefreshToken expired ?
                if (storedToken.ExpiredAt < DateTime.UtcNow)
                {
                    storedToken.IsRevoked = true;
                    storedToken.IsUsed = true;
                    _refreshTokenService.UpdateStoredToken(storedToken);
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "RefreshToken has expired"
                    });
                }
                //Update token is used
                storedToken.IsRevoked = true;
                storedToken.IsUsed = true;
                _refreshTokenService.UpdateStoredToken(storedToken);

                //create new token
                // var user = await _context.Users.SingleOrDefaultAsync(u => u.UserID == storedToken.UserId);
                var user = await _userService.GetUserRefreshToken(storedToken.UserId);
                var token = await GenerateToken(user);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Renew token success",
                    Data = token
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Something went wrong"
                });
            }
        }


    }
}