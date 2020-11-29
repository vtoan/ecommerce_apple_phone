using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Schema;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;

namespace ecommerce_apple_phone.Interfaces {

    #region CURD FUCNTION
    // ============== CURD Inteface ==============
    public interface IGetListDTOs<T> { List<T> GetListDTOs (); }

    public interface IGetDTO<T> { T GetDTO (int id); }

    public interface IAddDTO<T> { T AddDTO (T newObj); }

    public interface IUpdateDTO<T> { bool UpdateDTO (int idSrc, T objVM, string[] ignore = null); }

    public interface IRemoveDTO { bool RemoveDTO (int id); }

    // ============== Other Interface ==============

    public interface IAddRangeModel<T> { bool AddRangeDTOs (List<T> newObj); }
    public interface IEntityModel<T> : IRemoveDTO, IAddDTO<T>, IGetDTO<T>, IGetListDTOs<T>, IUpdateDTO<T> { }

    #endregion
    // ============== Models Interface ==============
    #region MODEL FUCNTION
    // Fee
    public interface IFeeModel : IEntityModel<FeeDTO> { }

    public interface ICategoryModel:
        IGetDTO<CategoryDTO>,
        IGetListDTOs<CategoryDTO>,
        IUpdateDTO<CategoryDTO> { }

    public interface IInfoModel:
        IGetDTO<InfoDTO>,
        IUpdateDTO<InfoDTO> { }

    public interface IProductModel {
        bool UpdateForOrder (List<OrderDetailDTO> orderDetailDTOs);
        bool UpdateForImport (List<ImportDetailDTO> importDetailDTOs);
        void AttachDiscount (ref List<ProductDTO> productDTOs, List<PromProductDTO> promProductDTOs);
        List<ProductDTO> FindByString (List<ProductDTO> productDTOs, string query);
        List<ProductDTO> FindByIds (List<ProductDTO> productDTOs, string[] arIds);
        List<ProductDTO> FindBestSeller (List<ProductDTO> productDTOs);
        List<ProductDTO> FindByCate (List<ProductDTO> productDTOs, int cateId);
        List<ProductDTO> FindPromotion (List<ProductDTO> productDTOs);
        //Product
        ProductDetailDTO GetDetailDTO (int id);
        ProductDetailDTO AddDTOs (int cateId, ProductDetailDTO productDetailDTO);
        bool UpdateDTO (int productId, ProductDetailDTO productDetailDTO);
        bool RemoveDTO (int id);
        bool UpdateStatusDTO (int productId, bool status);
        //Attribute Product
        List<ProductDTO> GetListDTOs (bool isAdmin =false);
        List<ProductDTO> GetListAttrDTOs (int productId , bool isAdmin =false);
        ProductDTO GetAttrDTO (int attrId ,bool isAdmin =false);
        ProductDTO AddAttrDTOs (int attrId, ProductDTO productDTO);
        bool UpdateAttrDTO (int attrId, ProductDTO productDTO);
        bool RemoveAttrDTO (int attrId);
        bool UpdateStatusAttrDTO (int attrId, bool status);
    }

    public interface IPostModel : IGetDTO<PostDTO>, IAddDTO<PostDTO>, IUpdateDTO<PostDTO>, IRemoveDTO { }

    public interface IFeedbackModel : IAddDTO<FeedbackDTO>, IRemoveDTO {
        List<FeedbackDTO> GetListDTOs (int productId);
    }

    public interface IOrderModel : IGetDTO<OrderDTO> {
        bool Payment (OrderDTO orderDTO);
        OrderDTO AddDTO (OrderDTO orderDTO, List<OrderDetailDTO> orderDetailDTOs);
        bool UpdateStatus (int id, int status);
        List<OrderDTO> GetListDTOs (DateTime start, DateTime end);
        List<OrderDTO> GetListDTOsByCustomer (int idCustomer);
        List<OrderDTO> Find (string query);
        List<OrderDetailDTO> GetOrderDetailDTOs (int id);
        //
        Tuple<int, double> GetPramOrder (List<OrderDetailDTO> orderDetailDTOs);
        int GetdPoint (double totalAmout, List<PromPointDTO> promPointDTOs);
        // 
        double FindPromBill (double totalAmout, int totalItem, List<PromBillDTO> promBillDTOs);
        double FindPromPoint (int pointUse, List<PromPointDTO> promPointDTOs);
    }

    public interface IImportProductModel : IGetDTO<ImportProductDTO> {
        ImportProductDTO AddDTO (ImportProductDTO importProductDTO, List<ImportDetailDTO> importDetailDTOs);
        List<ImportProductDTO> GetListDTOs (DateTime start, DateTime end);
        List<ImportDetailDTO> GetListDetailDTOs (int id);

    }

    public interface IMethodPayModel : IEntityModel<MethodPayDTO> { }

    public interface IPromotionModel : IGetDTO<PromotionDTO>, IGetListDTOs<PromotionDTO>, IRemoveDTO {

        PromotionDTO AddDTO (PromotionDTO promotionDTO, object promDetail);
        bool UpdateDTO (int id, PromotionDTO promotionDTO, object promDetail);
        List<PromProductDTO> GetListDTOsPromProduct ();
        List<PromBillDTO> GetListDTOsPromBill ();
        List<PromPointDTO> GetListDTOsPromPoint ();
    }

    public interface IUserModel : IGetDTO<User> {
        bool UpdatePoint (int id, int point);
    }

    #endregion

}