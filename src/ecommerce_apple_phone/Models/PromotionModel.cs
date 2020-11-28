using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class PromotionModel : BaseModel<PromotionDTO, Promotion>, IPromotionModel {
        public PromotionModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }

        public PromotionDTO AddDTO (PromotionDTO promotionDTO, object promDetail) {
            throw new System.NotImplementedException ();
        }

        public List<PromBillDTO> GetListDTOsPromBill () {
            return null;
        }

        public List<PromPointDTO> GetListDTOsPromPoint () {
            return null;
        }

        public List<PromProductDTO> GetListDTOsPromProduct () {
            return null;
        }

        public bool UpdateDTO (int id, PromotionDTO promotionDTO, object promDetail) {
            throw new System.NotImplementedException ();
        }
    }
}