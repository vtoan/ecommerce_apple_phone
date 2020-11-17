using System.Collections.Generic;
using System.Threading.Tasks;
using ecommerce_apple_phone.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace ecommerce_apple_phone.Helper {
    public enum CacheKey {
        PRODUCT,
        DISCOUNT_PRODUCT,
        SELLER_PRODUCT,
        INFO,
        FEE
    }
    public class CacheHelper : ICacheHelper {
        private Dictionary<string, bool> DataChanged = new Dictionary<string, bool> () { { "PRODUCT", false }, { "DISCOUNT_PRODUCT", false }, { "SELLER_PRODUCT", false }, { "INFO", false }, { "FEE", false },
        };

        private IMemoryCache _cache;

        public CacheHelper (IMemoryCache cache) {
            _cache = cache;
        }
        public void Set (object data, CacheKey keyChanged) {
            if (data == null) return;
            string key = keyChanged.ToString ();
            Task task = new Task (() => _cache.Set (key, data));
            task.Start ();
        }

        public T Get<T> (CacheKey keyChanged) {
            string key = keyChanged.ToString ();
            var result = _cache.Get (key);
            return result == null ? default (T) : (T) result;
        }

        public bool isChanged (CacheKey keyChanged) {
            string key = keyChanged.ToString ();
            bool status;
            if (!DataChanged.TryGetValue (key, out status))
                return false;
            return status;
        }

        public void DataUpdated (CacheKey keyChanged) {
            string key = keyChanged.ToString ();
            bool status;
            if (DataChanged.TryGetValue (key, out status))
                DataChanged.TryAdd (key, true);
        }
    }
}