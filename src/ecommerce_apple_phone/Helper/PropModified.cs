using System.Collections.Generic;

namespace ecommerce_apple_phone.Helper {
    public class PropModified<T> {
        private Dictionary<string, dynamic> modifiedProps;

        public bool isChanged { get; }

        public PropModified (T target) {
            GetOf (target);
            isChanged = modifiedProps.Count == 0 ? false : true;
        }

        public bool UpdateFor (ref T target) {
            if (modifiedProps.Count == 0 || target == null) return false;
            //Update Prop Modifired to Target;
            var targetProps = target.GetType ();
            foreach (var item in modifiedProps) {
                var prop = targetProps.GetProperty (item.Key);
                if (prop != null) prop.SetValue (target, item.Value);
            }
            return true;
        }

        public Dictionary<string, dynamic> GetOf (T target, string[] ignore = null) {
            modifiedProps = new Dictionary<string, dynamic> ();
            if (target == null) return modifiedProps;
            var srcProps = target.GetType ().GetProperties ();
            foreach (var p in srcProps) {
                //Check ignore prop
                string propName = p.Name;
                if (propName == "Id") propName = "";
                if (ignore != null && ignore.Length > 0)
                    foreach (var i in ignore)
                        if (propName == i) {
                            propName = "";
                            break;
                        }
                if (propName == "") continue;
                if (p.GetValue (target) != null)
                    modifiedProps.Add (p.Name, p.GetValue (target));
            }
            return modifiedProps;
        }
    }
}