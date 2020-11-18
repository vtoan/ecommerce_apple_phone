using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class FeedbackModel : BaseModel<FeedbackDTO, Feedback>, IFeedbackModel {
        public FeedbackModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }

        public List<FeedbackDTO> GetListDTOs (int productId) {
            throw new System.NotImplementedException ();
        }
    }
}