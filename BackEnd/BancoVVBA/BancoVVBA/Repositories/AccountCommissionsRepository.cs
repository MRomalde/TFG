using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Repositories
{
    public class AccountCommissionsRepository:Controller
    {
        #region Fields
        IConfiguration _config;
        BancoVVBAContext _context;
        #endregion
        #region Constructor
        public AccountCommissionsRepository(IConfiguration config, BancoVVBAContext bancoVVBAContext)
        {
            _config = config;
            _context = bancoVVBAContext;
        }
        #endregion
        internal async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAllAccountCommissions()
        {
            var result = await _context.Account_Has_Commissions.Include(accCom => accCom.Account.User).Include(accCom => accCom.Commission).ToListAsync();
            return result;
        }

        internal async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByIdAndReturnList(int id)
        {
            var result = await _context.Account_Has_Commissions.Include(accCom => accCom.Account.User)
                .Include(accCom => accCom.Commission).Where(accCom => accCom.AccountsHasCommissionsId == id).ToListAsync();
            return result;
        }

        internal async Task<ActionResult> CreateAccountCommissions(Account_Has_Commissions model)
        {
            _context.Account_Has_Commissions.Add(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<ActionResult> UpdateAccountCommissions(Account_Has_Commissions model)
        {
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<Account_Has_Commissions> GetAccountCommissionsById(int id)
        {
            var result = await _context.Account_Has_Commissions.FindAsync(id);
            return result;
        }

        internal async Task<ActionResult> DeleteAccountCommissions(Account_Has_Commissions accountCommission)
        {
            _context.Account_Has_Commissions.Remove(accountCommission);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByAccountId(int id)
        {
            var result = await _context.Account_Has_Commissions.Include(accCom => accCom.Account.User)
                .Include(accCom => accCom.Commission).Where(accCom => accCom.AccountId == id).ToListAsync();
            return result;
        }

        internal IQueryable<Account_Has_Commissions> AccountCommissionAlreadyTaken(int accountId, int commissionId)
        {
            var result = _context.Account_Has_Commissions.Where(accCom => accCom.AccountId == accountId && accCom.CommissionId==commissionId);
            return result;
        }
    }
}
