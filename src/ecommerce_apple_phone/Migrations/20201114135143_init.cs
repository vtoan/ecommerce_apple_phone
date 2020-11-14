using Microsoft.EntityFrameworkCore.Migrations;

namespace ecommerce_apple_phone.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 30, nullable: true),
                    SeoImage = table.Column<string>(maxLength: 50, nullable: true),
                    SeoTitle = table.Column<string>(maxLength: 150, nullable: true),
                    SeoDescription = table.Column<string>(maxLength: 350, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 30, nullable: true),
                    Cost = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Infos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameStore = table.Column<string>(maxLength: 50, nullable: true),
                    Logo = table.Column<string>(maxLength: 50, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Facebook = table.Column<string>(maxLength: 100, nullable: true),
                    Messenger = table.Column<string>(maxLength: 100, nullable: true),
                    Instargram = table.Column<string>(maxLength: 100, nullable: true),
                    Phone = table.Column<string>(maxLength: 100, nullable: true),
                    Address = table.Column<string>(maxLength: 150, nullable: true),
                    WorkTime = table.Column<string>(maxLength: 50, nullable: true),
                    SeoImage = table.Column<string>(maxLength: 50, nullable: true),
                    SeoTitle = table.Column<string>(maxLength: 250, nullable: true),
                    SeoDescription = table.Column<string>(maxLength: 350, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Screen = table.Column<string>(maxLength: 50, nullable: true),
                    FontCamera = table.Column<string>(maxLength: 50, nullable: true),
                    RearCamera = table.Column<string>(maxLength: 50, nullable: true),
                    OperationSystem = table.Column<string>(maxLength: 50, nullable: true),
                    Chipset = table.Column<string>(maxLength: 50, nullable: true),
                    ROM = table.Column<string>(maxLength: 50, nullable: true),
                    RAM = table.Column<string>(maxLength: 50, nullable: true),
                    Connector = table.Column<string>(maxLength: 50, nullable: true),
                    Parameter = table.Column<string>(maxLength: 50, nullable: true),
                    Weight = table.Column<string>(maxLength: 50, nullable: true),
                    Battery = table.Column<string>(maxLength: 50, nullable: true),
                    FunctionOther = table.Column<string>(maxLength: 50, nullable: true),
                    isShow = table.Column<bool>(nullable: false, defaultValue: true),
                    isDel = table.Column<bool>(nullable: false, defaultValue: false),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fees");

            migrationBuilder.DropTable(
                name: "Infos");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
