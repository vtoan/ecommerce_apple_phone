using System;
using System.Linq;
using System.Text.Json;

namespace ecommerce_apple_phone.Helper {
    public static class DataHelper {
        public static T ParserJsonTo<T> (string target) {
            return JsonSerializer.Deserialize<T> (target, new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

        public static string ParserObjToJson (object target) {
            return JsonSerializer.Serialize (target, new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

        public static bool IsEmptyString(string id)
        {
            return String.IsNullOrEmpty(id) || String.IsNullOrWhiteSpace(id);
        }

        public static int[] ParserProdId(string id)
        {
            try
            {
                int[] itemId = id.Split("-").Select(item => Int32.Parse(item)).ToArray();
                return itemId;
            }catch(Exception ex){
                System.Console.WriteLine(ex.Data);
                return default(int[]);
            }
        }

        public static int GetDetailId(string id)
        {
            var itemId = ParserProdId(id);
            if (itemId == null || itemId?.Length <= 0) return 0;
            return itemId[0];
        }

        public  static int GetAttrlId(string id)
        {
            var itemId = ParserProdId(id);
            if (itemId == null  ||itemId?.Length <= 2) return 0;
            return itemId[1];
        }
    }
}