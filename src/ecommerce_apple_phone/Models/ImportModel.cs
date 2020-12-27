using System;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;
using ecommerce_apple_phone.DAO;

namespace ecommerce_apple_phone.Models
{
    public class ImportModel : BaseModel<ImportProductDTO, ImportProduct>, IImportProductModel
    {
        public ImportModel(PhoneContext context, IMapper mapper) : base(context, mapper) { }

        public ImportProductDTO AddDTO(ImportProductDTO importProductDTO, List<ImportDetailDTO> importDetailDTOs)
        {

            ImportProduct impProd = ObjectMapperTo<ImportProductDTO, ImportProduct>(importProductDTO);
            if (impProd == null) return null;
            List<ImportDetail> impDetail = LsObjectMapperTo<ImportDetailDTO, ImportDetail>(importDetailDTOs);
            if (impDetail == null) return null;
            impProd.ImportDetails = impDetail;
            impProd.DateCreated = DateTime.Now;
            using  ( ImportDAO db = new ImportDAO(_context))
            {
                return ObjectMapperTo<ImportProduct, ImportProductDTO>(db.Add(impProd));
            }
        }

        public List<ImportDetailDTO> GetListDetailDTOs(int id)
        {
            using (ImportDAO db = new ImportDAO(_context))
            {
                var re = db.Get(id);
                return LsObjectMapperTo<ImportDetail, ImportDetailDTO>(re.ImportDetails);
            }
        }

        public List<ImportProductDTO> GetListDTOs(DateTime start, DateTime end)
        {
            using (ImportDAO db = new ImportDAO(_context))
                return LsObjectMapperTo<ImportProduct, ImportProductDTO>(db.GetList(start, end));
        }
    }
}