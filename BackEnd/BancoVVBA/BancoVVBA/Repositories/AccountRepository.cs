using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
namespace Banco_VVBA.Repositories
{
    public class AccountRepository:Controller
    {
        #region Fields
        private readonly IConfiguration _configuration;
        private readonly BancoVVBAContext _context;
        #endregion
        #region Constructor
        public AccountRepository(BancoVVBAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        #endregion
        internal async Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model)
        {
            _context.Accounts.Add(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal IEnumerable<UserAccountsViewModel> FindLastIban()
        {
            var result = _context.Accounts.OrderByDescending(Account => Account.AccountId).ToList();
            return result;
        }

        internal async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccounts()
        {
            var result = await _context.Accounts.Include(acc => acc.User).ToListAsync();
            return result;
        }
        internal async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccountsExceptYourAcc(int id)
        {
            var result = await _context.Accounts.Include(acc=>acc.User).Where(acc=>acc.AccountId!=id).ToListAsync();
            return result;
        }

        internal async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountById(int id)
        {
            var result = await _context.Accounts.Where(acc => acc.AccountId == id).Include(acc=>acc.User).ToListAsync();
            return result;
        }

        internal async Task<ActionResult> updateAccount(UserAccountsViewModel account)
        {
            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<UserAccountsViewModel> findAccountToUpdateById(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            return account;
        }

        internal async Task<IEnumerable<UserAccountsViewModel>> SearchByName(string name)
        {
            var result = await _context.Accounts.Include(acc=>acc.User).Where(acc=>acc.User.SurnameName.Contains(name)).ToListAsync();
            return result;
        }

        internal async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountByUserId(int id)
        {
            var result = await _context.Accounts.Where(acc => acc.UserId == id).Include(acc => acc.User).ToListAsync();
            return result;
        }
    }
}
