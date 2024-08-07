﻿// <auto-generated />
using System;
using Banco_VVBA.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BancoVVBA.Migrations
{
    [DbContext(typeof(BancoVVBAContext))]
    partial class BancoVVBAContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Banco_VVBA.Models.Account_Has_Commissions", b =>
                {
                    b.Property<int>("AccountsHasCommissionsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccountsHasCommissionsId"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<int>("CommissionId")
                        .HasColumnType("int");

                    b.HasKey("AccountsHasCommissionsId");

                    b.HasIndex("AccountId");

                    b.HasIndex("CommissionId");

                    b.ToTable("Account_Has_Commissions");
                });

            modelBuilder.Entity("Banco_VVBA.Models.CommissionsViewModel", b =>
                {
                    b.Property<int>("CommissionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CommissionId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("CommissionId");

                    b.ToTable("Commissions");
                });

            modelBuilder.Entity("Banco_VVBA.Models.OperationsViewModel", b =>
                {
                    b.Property<int>("OperationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OperationId"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<string>("Concept")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OperationId");

                    b.HasIndex("AccountId");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("Banco_VVBA.Models.UserAccountsViewModel", b =>
                {
                    b.Property<int>("AccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccountId"));

                    b.Property<double>("Balance")
                        .HasColumnType("float");

                    b.Property<string>("IBAN")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("AccountId");

                    b.HasIndex("IBAN")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Banco_VVBA.Models.UserTypeAccessViewModel", b =>
                {
                    b.Property<int>("TypeAccessId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TypeAccessId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("TypeAccessId");

                    b.HasIndex("Description")
                        .IsUnique();

                    b.ToTable("UsersTypeAccess");
                });

            modelBuilder.Entity("Banco_VVBA.Models.UsersViewModel", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("Dni")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Mail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("SurnameName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Telephone")
                        .HasColumnType("int");

                    b.Property<int>("TypeAccessId")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.HasIndex("Alias")
                        .IsUnique();

                    b.HasIndex("Dni")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("Mail")
                        .IsUnique();

                    b.HasIndex("TypeAccessId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Banco_VVBA.Models.Account_Has_Commissions", b =>
                {
                    b.HasOne("Banco_VVBA.Models.UserAccountsViewModel", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Banco_VVBA.Models.CommissionsViewModel", "Commission")
                        .WithMany()
                        .HasForeignKey("CommissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Commission");
                });

            modelBuilder.Entity("Banco_VVBA.Models.OperationsViewModel", b =>
                {
                    b.HasOne("Banco_VVBA.Models.UserAccountsViewModel", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Banco_VVBA.Models.UserAccountsViewModel", b =>
                {
                    b.HasOne("Banco_VVBA.Models.UsersViewModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Banco_VVBA.Models.UsersViewModel", b =>
                {
                    b.HasOne("Banco_VVBA.Models.UserTypeAccessViewModel", "TypeAccess")
                        .WithMany()
                        .HasForeignKey("TypeAccessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TypeAccess");
                });
#pragma warning restore 612, 618
        }
    }
}
