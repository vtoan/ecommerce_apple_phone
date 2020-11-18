using System;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class ImportModel : BaseModel<ImportProductDTO, ImportProduct>, IImportProductModel {
        public ImportModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }

        public ImportProductDTO AddDTO (ImportProductDTO importProductDTO, List<ImportDetailDTO> importDetailDTOs) {
            throw new NotImplementedException ();
        }

        public List<ImportDetailDTO> GetListDetailDTOs (int id) {
            throw new NotImplementedException ();
        }

        public List<ImportProductDTO> GetListDTOs (DateTime start, DateTime end) {
            throw new NotImplementedException ();
        }
    }
}