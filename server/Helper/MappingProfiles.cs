using AutoMapper;
using server.DTO;
using server.Models;

namespace BlogAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BlogPost, BlogPostDto>();
            CreateMap<BlogPostDto, BlogPost>();
        }

    }
}
