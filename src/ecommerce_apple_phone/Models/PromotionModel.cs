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

        public object GetDetail(int id, byte type)
        {
            object re = null;
            using (var db = new PromDAO(_context))
                re = db.GetDetail(id, type);
            switch (type)
            {
                case 1:
                    return ObjectMapperTo<PromProduct, PromProductDTO>((PromProduct)re);
                case 2:
                    return ObjectMapperTo<PromBill, PromBillDTO>((PromBill)re);
                default:
                    return null;
            }
        }
        public PromotionDTO AddDTO(PromotionDTO promotionDTO, object promDetail)
        {
            var obj = ObjectMapperTo<PromotionDTO, Promotion>(promotionDTO);
            var detail = CheckPromDetail(promDetail);
            if (obj == null || detail == null) return null;
            //
            if (detail is PromProduct) obj.PromProduct = (detail);
            else if (detail is PromBill) obj.PromBill = (detail);
            // else if (detail is PromPoint) obj.PromPoint = (detail);
            //
            using (var db = new PromDAO(_context))
                return ObjectMapperTo<Promotion, PromotionDTO>(db.Add(obj));
        }

        public List<PromBillDTO> GetListDTOsPromBill()
        {
            using (var db = new PromDAO(_context))
                return LsObjectMapperTo<Promotion, PromBillDTO>(db.GetListBill());
        }

        public List<PromPointDTO> GetListDTOsPromPoint()
        {
            // using (var db = new PromDAO(_context))
            //     return LsObjectMapperTo<Promotion, PromPointDTO>(db.GetListPoint());
            return new List<PromPointDTO>();
        }

        public List<PromProductDTO> GetListDTOsPromProduct()
        {
            using (var db = new PromDAO(_context))
                return LsObjectMapperTo<Promotion, PromProductDTO>(db.GetListProduct());
        }

        public bool UpdateDTO(int id, PromotionDTO promotionDTO, string promDetail)
        {
            var prom = ObjectMapperTo<PromotionDTO, Promotion>(promotionDTO);
            PropModified<Promotion> modifiedProm = new PropModified<Promotion>(prom);
            int typeItem;
            using (var db = new EntityDAO<Promotion>(_context))
            {
                var obj = db.Get(id);
                if (obj == null) return false;
                typeItem = (int)obj.Type;
                if (!db.Update(id, modifiedProm)) return false;
            }

            switch (typeItem)
            {
                case 1:
                    {
                        var promProduct = DataHelper.ParserJsonTo<PromProduct>(promDetail);
                        PropModified<PromProduct> modifiedProduct = new PropModified<PromProduct>(promProduct);
                        if (modifiedProduct.isChanged)
                        {
                            using (var db = new EntityDAO<PromProduct>(_context))
                                if (!db.Update(id, modifiedProduct)) return false;
                        }
                        break;
                    }
                case 2:
                    {
                        var promBill = DataHelper.ParserJsonTo<PromBill>(promDetail);
                        PropModified<PromBill> modifiedBill = new PropModified<PromBill>(promBill);
                        if (modifiedBill.isChanged)
                        {
                            using (var db = new EntityDAO<PromBill>(_context))
                                if (!db.Update(id, modifiedBill)) return false;
                        }
                        break;
                    }
                default: return false;
            }
            return true;
        }

        public bool UpdateStatus(int id, bool status)
        {
            PropModified<Promotion> modified = new PropModified<Promotion>(new { Status = status });
            using (var db = new EntityDAO<Promotion>(_context))
                return db.Update(id, modified);
        }

        public bool ChangePromotion(int PromOld, int PromNew, string ProdId)
        {
            int detailId = DataHelper.GetDetailId(ProdId);
            using (var db = new PromDAO(_context))
                return db.ChangePromProduct(PromOld, PromNew, detailId);
        }

        public dynamic CheckPromDetail(object promDetail)
        {
            if (promDetail == null) return null;
            else if (promDetail is PromProductDTO) return ObjectMapperTo<PromProductDTO, PromProduct>((PromProductDTO)promDetail);
            else if (promDetail is PromBillDTO) return ObjectMapperTo<PromBillDTO, PromBill>((PromBillDTO)promDetail);
            // else if (promDetail is PromPointDTO) return ObjectMapperTo<PromPointDTO, PromPoint>((PromPointDTO)promDetail);
            else return null;
        }
    }
}