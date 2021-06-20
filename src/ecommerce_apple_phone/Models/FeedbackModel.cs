using System.Security.Cryptography;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DAO;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models
{
    public class FeedbackModel : BaseModel<FeedbackDTO, Feedback>, IFeedbackModel
    {
        public FeedbackModel(PhoneContext context, IMapper mapper) : base(context, mapper) { }

        public List<FeedbackDTO> GetListDTOs(int productId)
        {
            using (FeedbackDAO db = new FeedbackDAO(_context))
            {
                var listFback = LsObjectMapperTo<Feedback, FeedbackDTO>(db.GetList(productId));
                if (listFback == null) return listFback;
                listFback.ForEach(item =>
                {
                    var UserName = _context.Users.Find(item.UserId)?.Name;
                    item.UserName = UserName;
                });
                return listFback;
            }
        }
    }
}