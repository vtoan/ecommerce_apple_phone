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
    }
}