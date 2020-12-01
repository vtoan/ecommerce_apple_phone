using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DAO;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models
{
    public class PromotionModel : BaseModel<PromotionDTO, Promotion>, IPromotionModel
    {
        public PromotionModel(PhoneContext context, IMapper mapper) : base(context, mapper) { }

        public PromotionDTO AddDTO(PromotionDTO promotionDTO, object promDetail)
        {
            var obj = ObjectMapperTo<PromotionDTO, Promotion>(promotionDTO);
            var detail = CheckPromDetail(promDetail);
            if (obj == null || detail == null) return null;
            //
            if (detail is PromProduct) obj.PromProduct = (detail);
            else if (detail is PromBill) obj.PromBill = (detail);
            else if (detail is PromPoint) obj.PromPoint = (detail);
            //
            using (var db = new EntityDAO<Promotion>(_context))
                return ObjectMapperTo<Promotion, PromotionDTO>(db.Add(obj));
        }

        public List<PromBillDTO> GetListDTOsPromBill()
        {
            using (var db = new EntityDAO<PromBill>(_context))
                return LsObjectMapperTo<PromBill, PromBillDTO>(db.GetList());
        }

        public List<PromPointDTO> GetListDTOsPromPoint()
        {
            using (var db = new EntityDAO<PromPoint>(_context))
                return LsObjectMapperTo<PromPoint, PromPointDTO>(db.GetList());
        }

        public List<PromProductDTO> GetListDTOsPromProduct()
        {
            using (var db = new EntityDAO<PromProduct>(_context))
                return LsObjectMapperTo<PromProduct, PromProductDTO>(db.GetList());
        }

        public bool UpdateDTO(int id, PromotionDTO promotionDTO, object promDetail)
        {
            var prom = ObjectMapperTo<PromotionDTO, Promotion>(promotionDTO);
            PropModified<Promotion> modifiedProm = new PropModified<Promotion>(prom);
            if (modifiedProm.isChanged)
            {
                using (var db = new EntityDAO<Promotion>(_context))
                    if (!db.Update(id, modifiedProm)) return false;
            }
            //
            var detail = CheckPromDetail(promDetail);
            //
            if (detail is PromProduct)
            {
                PropModified<PromProduct> modified = new PropModified<PromProduct>(prom);
                if (modifiedProm.isChanged)
                {
                    using (var db = new EntityDAO<PromProduct>(_context))
                        if (!db.Update(id, modified)) return false;
                }
            }
            else if (detail is PromBill)
            {
                PropModified<PromBill> modified = new PropModified<PromBill>(prom);
                if (modifiedProm.isChanged)
                {
                    using (var db = new EntityDAO<PromBill>(_context))
                        if (!db.Update(id, modified)) return false;
                }
            }
            else if (detail is PromPoint)
            {
                PropModified<PromPoint> modified = new PropModified<PromPoint>(prom);
                if (modifiedProm.isChanged)
                {
                    using (var db = new EntityDAO<PromPoint>(_context))
                        if (!db.Update(id, modified)) return false;
                }
            }
            else return false;
            return true;
        }

        public bool UpdateStatus(int id, bool status)
        {
            PropModified<Promotion> modified = new PropModified<Promotion>(new { Status = status });
            using (var db = new EntityDAO<Promotion>(_context))
                return db.Update(id, modified);
        }

        public dynamic CheckPromDetail(object promDetail)
        {
            if (promDetail == null) return null;
            else if (promDetail is PromProductDTO) return ObjectMapperTo<PromProductDTO, PromProduct>((PromProductDTO)promDetail);
            else if (promDetail is PromBillDTO) return ObjectMapperTo<PromBillDTO, PromBill>((PromBillDTO)promDetail);
            else if (promDetail is PromPointDTO) return ObjectMapperTo<PromPointDTO, PromPoint>((PromPointDTO)promDetail);
            else return null;
        }

        public bool ChangePromotion(int PromOld, int PromNew, int ProdId)
        {
            throw new System.NotImplementedException();
        }
    }
}