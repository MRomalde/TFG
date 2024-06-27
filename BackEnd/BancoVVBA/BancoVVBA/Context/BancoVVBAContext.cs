using Banco_VVBA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Context
{
    public class BancoVVBAContext : DbContext
    {
        public BancoVVBAContext(DbContextOptions<BancoVVBAContext> options)
            :base (options) { }

        public DbSet<UsersViewModel> Users { get; set; }
        public DbSet<UserTypeAccessViewModel> UsersTypeAccess { get; set; }
        public DbSet<UserAccountsViewModel> Accounts { get; set; }
        public DbSet<CommissionsViewModel> Commissions { get; set; }
        public DbSet<Account_Has_Commissions> Account_Has_Commissions { get; set; }
        public DbSet<OperationsViewModel> Operations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsersViewModel>()
                .HasIndex(user => user.Alias).IsUnique();
            modelBuilder.Entity<UsersViewModel>()
                .HasIndex(user => user.Login).IsUnique();
            modelBuilder.Entity<UsersViewModel>()
                .HasIndex(user => user.Dni).IsUnique();
            modelBuilder.Entity<UsersViewModel>()
                .HasIndex(user => user.Mail).IsUnique();
            modelBuilder.Entity<UserAccountsViewModel>()
                .HasIndex(acc => acc.IBAN).IsUnique();
            modelBuilder.Entity<UserTypeAccessViewModel>()
                .HasIndex(typeAccess => typeAccess.Description).IsUnique();
            modelBuilder.Entity<UserTypeAccessViewModel>()
                .HasIndex(typeAccess => typeAccess.Description).IsUnique();
        }

    }
    

}
