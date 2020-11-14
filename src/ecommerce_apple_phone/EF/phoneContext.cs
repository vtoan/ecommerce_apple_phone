using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_apple_phone.EF {
    public class PhoneContext : DbContext {

        public PhoneContext (DbContextOptions<PhoneContext> options) : base (options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Fee> Fees { get; set; }
        public DbSet<Info> Infos { get; set; }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            base.OnModelCreating (modelBuilder);
            modelBuilder.Entity<Product> ().Property (p => p.isShow).HasDefaultValue (true);
            modelBuilder.Entity<Product> ().Property (p => p.isDel).HasDefaultValue (false);
        }
    }

    public class Product {
        [Key]
        public int Id { get; set; }

        [MaxLength (50)]
        public string Name { get; set; }

        [MaxLength (50)]
        public string Screen { get; set; }

        [MaxLength (50)]
        public string FontCamera { get; set; }

        [MaxLength (50)]
        public string RearCamera { get; set; }

        [MaxLength (50)]
        public string OperationSystem { get; set; }

        [MaxLength (50)]
        public string Chipset { get; set; }

        [MaxLength (50)]
        public string ROM { get; set; }

        [MaxLength (50)]
        public string RAM { get; set; }

        [MaxLength (50)]
        public string Connector { get; set; }

        [MaxLength (50)]
        public string Parameter { get; set; }

        [MaxLength (50)]
        public string Weight { get; set; }

        [MaxLength (50)]
        public string Battery { get; set; }

        [MaxLength (50)]
        public string FunctionOther { get; set; }
        public bool isShow { get; set; }
        public bool isDel { get; set; }

        [ForeignKey ("Category")]
        public int CategoryId { get; set; }
        //Nav
        public Category Category { get; set; }
    }

    public class Category {
        [Key]
        public int Id { get; set; }

        [MaxLength (30)]
        public string Name { get; set; }
        //SEO
        [MaxLength (50)]
        public string SeoImage { get; set; }

        [MaxLength (150)]
        public string SeoTitle { get; set; }

        [MaxLength (350)]
        public string SeoDescription { get; set; }
        //Nav property
        public List<Product> Products { get; set; }
    }

    public class Fee {
        [Key]
        public int Id { get; set; }

        [StringLength (30)]
        public string Name { get; set; }
        public double? Cost { get; set; }
    }

    public class Info {
        [Key]
        public int Id { get; set; }

        [StringLength (50)]
        public string NameStore { get; set; }

        [StringLength (50)]
        public string Logo { get; set; }

        [StringLength (100)]

        public string Email { get; set; }

        [StringLength (100)]

        public string Facebook { get; set; }

        [StringLength (100)]
        public string Messenger { get; set; }

        [StringLength (100)]

        public string Instargram { get; set; }

        [StringLength (100)]

        public string Phone { get; set; }

        [StringLength (150)]
        public string Address { get; set; }

        [StringLength (50)]
        public string WorkTime { get; set; }
        //SEO
        [MaxLength (50)]
        public string SeoImage { get; set; }

        [StringLength (250)]
        public string SeoTitle { get; set; }

        [StringLength (350)]
        public string SeoDescription { get; set; }
    }
}