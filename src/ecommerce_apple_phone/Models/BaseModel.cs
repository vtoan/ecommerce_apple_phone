using System.Collections.Generic;
using System.Data;
using AutoMapper;
using ecommerce_apple_phone.DAO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public abstract class BaseModel<T, V> where V : class {

        private PhoneContext _context;
        private IMapper _mapper;

        public BaseModel (PhoneContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public T AddDTO (T newObj) {
            if (newObj == null) return default (T);
            using (EntityDAO<V> db = new EntityDAO<V> (_context))
            return ObjectMapperTo<V, T> (
                db.Add (ObjectMapperTo<T, V> (newObj))
            );
        }

        public T GetDTO (int id) {
            if (id < 0) return default (T);
            //
            using (EntityDAO<V> db = new EntityDAO<V> (_context))
            return ObjectMapperTo<V, T> (db.Get (id));
        }

        public List<T> GetListDTOs () {
            using (EntityDAO<V> db = new EntityDAO<V> (_context))
            return LsObjectMapperTo<V, T> (db.GetList ());
        }

        public bool RemoveDTO (int id) {
            if (id < 0) return false;
            //
            using (EntityDAO<V> db = new EntityDAO<V> (_context))
            return db.Remove (id);
        }

        public bool UpdateDTO (int idSrc, T objVM) {
            if (idSrc < 0 || objVM == null) return false;
            V obj = ObjectMapperTo<T, V> (objVM);
            PropModified<V> modifieds = new PropModified<V> (obj);
            if (!modifieds.isChanged) return false;
            //
            using (EntityDAO<V> db = new EntityDAO<V> (_context))
            return db.Update (idSrc, modifieds);
        }

        //HelpFul
        protected List<B> LsObjectMapperTo<A, B> (List<A> obj) {
            if (obj == null || obj.Count == 0) return null;
            List<B> result = new List<B> ();
            foreach (var item in obj)
                result.Add (_mapper.Map<B> (item));
            return result;
        }

        protected B ObjectMapperTo<A, B> (A obj) {
            if (obj == null) return default (B);
            return _mapper.Map<B> (obj);
        }
    }
}