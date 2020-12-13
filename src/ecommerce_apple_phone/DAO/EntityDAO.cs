using System.Diagnostics;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;

namespace ecommerce_apple_phone.DAO
{
    public class EntityDAO<T> : IDisposable where T : class
    {

        protected PhoneContext _context;

        public EntityDAO(PhoneContext context)
        {
            _context = context;
        }

        public void Dispose() { }

        public virtual List<T> GetList()
        {
            if (!CheckConnection()) return null;
            return _context.Set<T>().ToList();
        }

        public virtual T Get(int id)
        {
            if (!CheckConnection()) return default(T);
            return _context.Find<T>(id);
        }

        public virtual T Add(T newObj)
        {
            if (!CheckConnection()) return default(T);
            _context.Add<T>(newObj);
            _context.SaveChanges();
            return newObj;
        }

        public virtual bool Update(int id, PropModified<T> modified)
        {
            if (!CheckConnection()) return false;
            T obj = _context.Find<T>(id);
            if (obj == null) return false;
            modified.UpdateFor(ref obj);
            _context.SaveChanges();
            return true;
        }

        public virtual bool Remove(int id)
        {
            if (!CheckConnection()) return false;
            T obj = _context.Find<T>(id);
            if (obj == null) return false;
            _context.Remove<T>(obj);
            _context.SaveChanges();
            return true;
        }

        protected bool CheckConnection()
        {
            try
            {
                Task<bool> re = _context.Database.CanConnectAsync();
                re.Wait();
                return re.Result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}