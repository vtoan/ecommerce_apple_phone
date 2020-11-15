using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ecommerce_apple_phone.Migrations
{
    public partial class Init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.AlterColumn<bool>(
                name: "isShow",
                table: "Products",
                nullable: true,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "isDel",
                table: "Products",
                nullable: true,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Products",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    FeedbackContent = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => new { x.ProductId, x.UserId });
                    table.ForeignKey(
                        name: "FK_Feedbacks_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImportProducts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "smalldatetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportProducts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MethodPays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MethodPays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    PostContent = table.Column<string>(nullable: true),
                    SeoImage = table.Column<string>(maxLength: 50, nullable: true),
                    SeoTitle = table.Column<string>(maxLength: 150, nullable: true),
                    SeoDescription = table.Column<string>(maxLength: 350, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(nullable: false),
                    Color = table.Column<string>(maxLength: 25, nullable: true),
                    SaleCount = table.Column<int>(nullable: false, defaultValue: 0),
                    ImageDefault = table.Column<string>(maxLength: 50, nullable: true),
                    ImageGallery = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    isShow = table.Column<bool>(nullable: true, defaultValue: true),
                    isDel = table.Column<bool>(nullable: true, defaultValue: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    FromDate = table.Column<DateTime>(type: "smalldatetime", nullable: true),
                    ToDate = table.Column<DateTime>(type: "smalldatetime", nullable: true),
                    Status = table.Column<bool>(nullable: true, defaultValue: true),
                    Type = table.Column<byte>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImportDetails",
                columns: table => new
                {
                    ImportId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: true),
                    Price = table.Column<double>(nullable: true),
                    ImportProductId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportDetails", x => new { x.ProductId, x.ImportId });
                    table.ForeignKey(
                        name: "FK_ImportDetails_ImportProducts_ImportProductId",
                        column: x => x.ImportProductId,
                        principalTable: "ImportProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ImportDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PromBills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Discount = table.Column<double>(nullable: true),
                    ConditionItem = table.Column<byte>(nullable: true),
                    ConditionAmount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromBills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PromBills_Promotions_Id",
                        column: x => x.Id,
                        principalTable: "Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PromMethodPays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Discount = table.Column<double>(nullable: true),
                    MethodPayId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromMethodPays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PromMethodPays_Promotions_Id",
                        column: x => x.Id,
                        principalTable: "Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PromPoints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    DiscountIn = table.Column<double>(nullable: true),
                    DiscountOut = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromPoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PromPoints_Promotions_Id",
                        column: x => x.Id,
                        principalTable: "Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PromProducts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Discount = table.Column<double>(nullable: true),
                    ProductInProms = table.Column<string>(maxLength: 250, nullable: true),
                    CategoryId = table.Column<int>(nullable: true),
                    BandId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PromProducts_Promotions_Id",
                        column: x => x.Id,
                        principalTable: "Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "smalldatetime", nullable: true),
                    QuestName = table.Column<string>(maxLength: 40, nullable: true),
                    QuestPhone = table.Column<string>(maxLength: 50, nullable: true),
                    QuestProvince = table.Column<string>(maxLength: 25, nullable: true),
                    QuestEmail = table.Column<string>(maxLength: 35, nullable: true),
                    QuestAddress = table.Column<string>(maxLength: 250, nullable: true),
                    Note = table.Column<string>(maxLength: 250, nullable: true),
                    Promotion = table.Column<string>(maxLength: 50, nullable: true),
                    Fees = table.Column<string>(maxLength: 150, nullable: true),
                    Status = table.Column<byte>(nullable: false, defaultValue: (byte)1),
                    UserId = table.Column<int>(nullable: true),
                    MethodPayId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<byte>(nullable: true),
                    Price = table.Column<int>(nullable: true),
                    Discount = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => new { x.OrderId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImportDetails_ImportProductId",
                table: "ImportDetails",
                column: "ImportProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductId",
                table: "OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetails_ProductId",
                table: "ProductDetails",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "ImportDetails");

            migrationBuilder.DropTable(
                name: "MethodPays");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "ProductDetails");

            migrationBuilder.DropTable(
                name: "PromBills");

            migrationBuilder.DropTable(
                name: "PromMethodPays");

            migrationBuilder.DropTable(
                name: "PromPoints");

            migrationBuilder.DropTable(
                name: "PromProducts");

            migrationBuilder.DropTable(
                name: "ImportProducts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.AlterColumn<bool>(
                name: "isShow",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldNullable: true,
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "isDel",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldNullable: true,
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
