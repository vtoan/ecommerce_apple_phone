using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class ProductModel : IProductModel {

        private PhoneContext _context;
        private IMapper _mapper;

        public ProductModel (PhoneContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public ProductDTO AddAttrDTOs(int attrId, ProductDTO productDTO)
        {
            throw new System.NotImplementedException();
        }

        public ProductDTO AddDTOs(int cateId, ProductDetailDTO productDetailDTO)
        {
            throw new System.NotImplementedException();
        }

        public void AttachDiscount(ref List<ProductDTO> productDTOs, List<PromProductDTO> promProductDTOs)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> FindBestSeller(List<ProductDTO> productDTOs)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> FindByCate(List<ProductDTO> productDTOs, int cateId)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> FindByIds(List<ProductDTO> productDTOs, int[] arIds)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> FindByString(List<ProductDTO> productDTOs, string query)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> FindPromotion(List<ProductDTO> productDTOs)
        {
            throw new System.NotImplementedException();
        }

        public ProductDTO GetAttrDTO(int attrId)
        {
            throw new System.NotImplementedException();
        }

        public ProductDetailDTO GetDetailDTO(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> GetListAttrDTOs(int productId)
        {
            throw new System.NotImplementedException();
        }

        public List<ProductDTO> GetListDTOs()
        {
            throw new System.NotImplementedException();
        }

        public bool RemoveAttrDTO(int attrId)
        {
            throw new System.NotImplementedException();
        }

        public bool RemoveDTO(int id)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateAttrDTO(int attrId, ProductDTO productDTO)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateDTO(int productId, ProductDetailDTO productDetailDTO)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateForImport(List<ImportDetailDTO> importDetailDTOs)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateForOrder(List<OrderDetailDTO> orderDetailDTOs)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateStatusAttrDTO(int attrId, int status)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateStatusDTO(int productId, int status)
        {
            throw new System.NotImplementedException();
        }
    }
}