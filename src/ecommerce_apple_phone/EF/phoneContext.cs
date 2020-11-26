using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_apple_phone.EF {
    public class PhoneContext : DbContext {

        public PhoneContext (DbContextOptions<PhoneContext> options) : base (options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<ImportProduct> ImportProducts { get; set; }
        public DbSet<ImportDetail> ImportDetails { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<MethodPay> MethodPays { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Fee> Fees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Info> Infos { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<PromProduct> PromProducts { get; set; }
        public DbSet<PromBill> PromBills { get; set; }
        public DbSet<PromPoint> PromPoints { get; set; }
        public DbSet<PromMethodPay> PromMethodPays { get; set; }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            base.OnModelCreating (modelBuilder);
            //Product
            modelBuilder.Entity<Product> ().Property (p => p.isShow).HasDefaultValue (true);
            modelBuilder.Entity<Product> ().Property (p => p.isDel).HasDefaultValue (false);
            //
            modelBuilder.Entity<ProductDetail> ().Property (p => p.SaleCount).HasDefaultValue (0);
            modelBuilder.Entity<ProductDetail> ().Property (p => p.isShow).HasDefaultValue (true);
            modelBuilder.Entity<ProductDetail> ().Property (p => p.isDel).HasDefaultValue (false);
            //Import
            modelBuilder.Entity<ImportProduct> ().Property (p => p.DateCreated).HasColumnType ("smalldatetime");
            modelBuilder.Entity<ImportDetail> ().HasKey (od => new { od.ProductId, od.ImportId });
            //Config Promotion
            modelBuilder.Entity<Promotion> ().Property (p => p.Status).HasDefaultValue (true);
            modelBuilder.Entity<Promotion> ().Property (p => p.ToDate).HasColumnType ("smalldatetime");
            modelBuilder.Entity<Promotion> ().Property (p => p.FromDate).HasColumnType ("smalldatetime");
            //Config OrderDetail
            modelBuilder.Entity<OrderDetail> ().HasKey (od => new { od.OrderId, od.ProductId });
            //Config Order
            modelBuilder.Entity<Order> ().Property (o => o.Status).HasDefaultValue (1);
            modelBuilder.Entity<Order> ().Property (o => o.DateCreated).HasColumnType ("smalldatetime");
        }
    }

    public class User {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }

        //Nav
        public List<Order> Orders { get; set; }
    }

    public class Product {
        [Key]
        public int Id { get; set; }

        [MaxLength (250)]
        public string Name { get; set; }

        [MaxLength (250)]
        public string Screen { get; set; }

        [MaxLength (250)]
        public string FontCamera { get; set; }

        [MaxLength (250)]
        public string RearCamera { get; set; }

        [MaxLength (250)]
        public string OperationSystem { get; set; }

        [MaxLength (250)]
        public string Chipset { get; set; }

        [MaxLength (250)]
        public string ROM { get; set; }

        [MaxLength (250)]
        public string RAM { get; set; }

        [MaxLength (250)]
        public string Connector { get; set; }

        [MaxLength (250)]
        public string Parameter { get; set; }

        [MaxLength (250)]
        public string Weight { get; set; }

        [MaxLength (250)]
        public string Battery { get; set; }

        [MaxLength (250)]
        public string FunctionOther { get; set; }
        public bool? isShow { get; set; }
        public bool? isDel { get; set; }

        [ForeignKey ("Category")]
        public int? CategoryId { get; set; }
        //Nav
        public Category Category { get; set; }

        public Post Post { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public List<Feedback> Feedbacks { get; set; }
    }

    public class ProductDetail {
        [Key]
        public int Id { get; set; }
        public double Price { get; set; }

        [StringLength (25)]
        public string Color { get; set; }
        public int SaleCount { get; set; }

        [StringLength (50)]
        public string Images { get; set; }
        public int Quantity { get; set; }
        public bool? isShow { get; set; }
        public bool? isDel { get; set; }

        [ForeignKey ("Product")]
        public int ProductId { get; set; }
        //
        public Product Product { get; set; }
    }

    public class ImportProduct {
        [Key]
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; }
        //Nav
        public List<ImportDetail> ImportDetails { get; set; }
    }

    public class ImportDetail {
        public int ImportId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        //Nav
        public ImportProduct ImportProduct { get; set; }
        public Product Product { get; set; }
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

    public class Post {
        [Key]
        [ForeignKey ("Product")]
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string PostContent { get; set; }
        //SEO
        [MaxLength (50)]
        public string SeoImage { get; set; }

        [MaxLength (150)]
        public string SeoTitle { get; set; }

        [MaxLength (350)]
        public string SeoDescription { get; set; }
        //Nav
        public Product Product { get; set; }
    }

    public class Feedback {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public string FeedbackContent { get; set; }
    }

    public class MethodPay {
        [Key]
        public int Id { get; set; }

        [StringLength (150)]
        public string Name { get; set; }
    }

    public class Order {
        [Key]
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; }

        [StringLength (40)]
        public string QuestName { get; set; }

        [StringLength (50)]
        public string QuestPhone { get; set; }

        [StringLength (50)]
        public string QuestProvince { get; set; }
        [StringLength (50)]
        public string QuestDistrict { get; set; }

        [StringLength (35)]
        public string QuestEmail { get; set; }

        [StringLength (250)]
        public string QuestAddress { get; set; }

        [StringLength (250)]
        public string Note { get; set; }

        [StringLength (50)]
        public string Promotion { get; set; }

        [StringLength (150)]
        public string Fees { get; set; }
        public byte Status { get; set; }
        public int? UserId { get; set; }
        public int MethodPayId { get; set; }
        public int? PointUse { get; set; }
        public int? Point { get; set; }
        //Nav property
        public List<OrderDetail> OrderDetails { get; set; }
    }

    public class OrderDetail {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public byte? Quantity { get; set; }
        public int? Price { get; set; }
        public double? Discount { get; set; }
        //Nav property
        public Order Order { get; set; }
        public Product Product { get; set; }
    }

    public class Promotion {
        [Key]
        public int Id { get; set; }

        [StringLength (50)]
        public string Name { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool? Status { get; set; }
        public byte? Type { get; set; }
        //Nav property
        public PromProduct PromProduct { get; set; }
        public PromBill PromBill { get; set; }
    }

    public class PromBill {
        [Key]
        [ForeignKey ("Promotion")]
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public double? Discount { get; set; }
        public byte? ConditionItem { get; set; }
        public int? ConditionAmount { get; set; }
        //Nav property
        public Promotion Promotion { get; set; }
    }

    public class PromProduct {
        [Key]
        [ForeignKey ("Promotion")]
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public double? Discount { get; set; }

        [StringLength (250)]
        public string ProductInProms { get; set; }
        public int? CategoryId { get; set; }
        public int? BandId { get; set; }
        //Nav property
        public Promotion Promotion { get; set; }
    }

    public class PromPoint {
        [Key]
        [ForeignKey ("Promotion")]
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public double? DiscountIn { get; set; }
        public double? DiscountOut { get; set; }
        //Nav property
        public Promotion Promotion { get; set; }
    }

    public class PromMethodPay {
        [Key]
        [ForeignKey ("Promotion")]
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public double? Discount { get; set; }
        public int? MethodPayId { get; set; }
        //Nav property
        public Promotion Promotion { get; set; }
    }

}