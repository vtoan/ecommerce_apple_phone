using ecommerce_apple_phone.Helper;
using Microsoft.Extensions.Caching.Memory;

namespace ecommerce_apple_phone.Interfaces {
    public interface ICacheHelper {
        void Set (object data, CacheKey keyChanged);
        T Get<T> (CacheKey keyChanged);
        bool isChanged (CacheKey keyChanged);
        void DataUpdated (CacheKey keyChanged);
    }
}