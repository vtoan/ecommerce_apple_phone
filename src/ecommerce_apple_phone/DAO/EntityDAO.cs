using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;

namespace ecommerce_apple_phone.DAO {
    public class EntityDAO<T> : IDisposable where T : class {

        private PhoneContext _context;

        public EntityDAO (PhoneContext context) {
            _context = context;
        }

        public void Dispose () { }

        public virtual List<T> GetList () {
            return _context.Set<T> ().ToList ();
        }

        public virtual T Get (int id) {
            return _context.Find<T> (id);
        }

        public virtual T Add (T newObj) {
            _context.Add<T> (newObj);
            _context.SaveChanges ();
            return newObj;
        }

        public virtual bool Update (int id, PropModified<T> modified) {
            T obj = _context.Find<T> (id);
            if (obj == null) return false;
            modified.UpdateFor (ref obj);
            _context.SaveChanges ();
            return true;
        }

        public virtual bool Remove (int id) {
            T obj = _context.Find<T> (id);
            if (obj == null) return false;
            _context.Remove<T> (obj);
            _context.SaveChanges ();
            return true;
        }
    }
}