using Microsoft.EntityFrameworkCore.Migrations;

namespace ecommerce_apple_phone.Migrations
{
    public partial class EditOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "10c4b3bc-5f93-4ad8-a6b3-3dbeaa3f8a76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ca6ff6f-c78d-4e4c-a643-517a6bd52fe5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a4c0a3f-9514-4843-b01a-a0455e173cad");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f7d107c-739b-4018-8c2a-fbafbf25741e");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3420ae13-e693-4861-b428-40a56f3cbcf1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89f64-a59f-40e2-a34c-aedc4f757907");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e9a7ceed-cf6f-4ae1-866b-3818d9295a16");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8f7d107c-739b-4018-8c2a-fbafbf25741e", "7ff42fa3-07ea-4ea7-b409-1be605b9f375", "Admin", "admin" },
                    { "1ca6ff6f-c78d-4e4c-a643-517a6bd52fe5", "937c6ce1-fb71-4dca-82f2-5734513c98be", "Sale", "sale" },
                    { "10c4b3bc-5f93-4ad8-a6b3-3dbeaa3f8a76", "136c0b0f-1dd8-411c-bc7c-eef79a78d00e", "Stock", "stock" },
                    { "2a4c0a3f-9514-4843-b01a-a0455e173cad", "b2646b4f-5482-49ac-8e66-009075a75697", "User", "user" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "District", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Province", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "3420ae13-e693-4861-b428-40a56f3cbcf1", 0, null, "85d528b7-c6a4-48c6-adf5-6f6cd50fa3a9", null, "admin@gmail.com", false, false, null, "Admin", null, null, null, null, false, null, "ddad4a5b-ea65-46da-bd92-3b71ed8d5f4e", false, null },
                    { "e9a7ceed-cf6f-4ae1-866b-3818d9295a16", 0, null, "f80c4b42-1de2-49c6-ad3e-3ae836f185e8", null, "admin@gmail.com", false, false, null, "Sale", null, null, null, null, false, null, "cd916e84-2cd5-4fb9-8b67-db51c5d98da7", false, null },
                    { "9ce89f64-a59f-40e2-a34c-aedc4f757907", 0, null, "e129bd59-1992-42fe-98f1-bc58e61ed39c", null, "stock@gmail.com", false, false, null, "Stock", null, null, null, null, false, null, "8b15a089-6c07-4448-9dae-9fa217bd0481", false, null }
                });
        }
    }
}
