using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;

namespace ecommerce_apple_phone.DAO
{
    public class FeedbackDAO : EntityDAO<Feedback>
    {
        public FeedbackDAO(PhoneContext context) : base(context){ }

        public List<Feedback> GetList(int id){
            if(!CheckConnection()) return null;
            return _context.Feedbacks.Where(item => item.ProductDetailId == id).ToList();
        }

    }
}