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
            throw new System.NotImplementedException ();
        }

        public List<PromMethodPayDTO> GetListDTOsPromMethodPay () {
            throw new System.NotImplementedException ();
        }

        public List<PromPointDTO> GetListDTOsPromPoint () {
            throw new System.NotImplementedException ();
        }

        public List<PromProductDTO> GetListDTOsPromProduct () {
            throw new System.NotImplementedException ();
        }

        public bool UpdateDTO (int id, PromotionDTO promotionDTO, object promDetail) {
            throw new System.NotImplementedException ();
        }
    }
}