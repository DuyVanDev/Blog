
using server.Models;

namespace server.Services
{
    public interface IRefreshTokenService
    {
        Task AddRefreshToken(RefreshToken refreshToken);

        Task<RefreshToken> GetStoredToken(Token token);

        Task UpdateStoredToken(RefreshToken token);

    }
}
