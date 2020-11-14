using System.Collections.Generic;
using ecommerce_apple_phone.DTO;

namespace ecommerce_apple_phone.Interfaces {

    #region CURD FUCNTION
    // ============== CURD Inteface ==============
    public interface IGetListDTOs<T> { List<T> GetListDTOs (); }

    public interface IGetDTO<T> { T GetDTO (int id); }

    public interface IAddDTO<T> { T AddDTO (T newObj); }

    public interface IUpdateDTO<T> { bool UpdateDTO (int idSrc, T objVM); }

    public interface IRemoveDTO { bool RemoveDTO (int id); }

    // ============== Other Interface ==============

    public interface IAddRangeModel<T> { bool AddRangeDTOs (List<T> newObj); }
    public interface IEntityModel<T> : IRemoveDTO, IAddDTO<T>, IGetDTO<T>, IGetListDTOs<T>, IUpdateDTO<T> { }

    #endregion
    // ============== Models Interface ==============
    #region MODEL FUCNTION
    // Fee
    public interface IFeeModel : IEntityModel<FeeDTO> { }

    #endregion

}