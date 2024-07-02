using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.AccountCommissions
{
    public class AccountCommissionsService : IAccountCommissionsService
    {
        #region Repository declaration and fields
        private AccountCommissionsRepository _accComRepository;
        #endregion
        #region Constructor
        public AccountCommissionsService(IConfiguration config, BancoVVBAContext bancoVVBAContext)
        {
            _accComRepository = new AccountCommissionsRepository(config, bancoVVBAContext);
        }
        #endregion
        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAllAccountCommissions()
        {
            var result = await _accComRepository.GetAllAccountCommissions();
            return result;
        }

        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByIdAndReturnList(int id)
        {
            var result = await _accComRepository.GetAccountCommissionsByIdAndReturnList(id);
            return result;
        }

        public async Task<ActionResult> CreateAccountCommissions(Account_Has_Commissions model)
        {
            return await _accComRepository.CreateAccountCommissions(model);
        }

        public async Task<ActionResult> UpdateAccountCommissions(Account_Has_Commissions model)
        {
            return await _accComRepository.UpdateAccountCommissions(model);
        }

        public async Task<Account_Has_Commissions> GetAccountCommissionsById(int id)
        {
            var result = await _accComRepository.GetAccountCommissionsById(id);
            return result;
        }

        public async Task<ActionResult> DeleteAccountCommissions(Account_Has_Commissions accountCommission)
        {
            return await _accComRepository.DeleteAccountCommissions(accountCommission);
        }

        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByAccountId(int id)
        {
            var result = await _accComRepository.GetAccountCommissionsByAccountId(id);
            return result;
        }

        public bool AccountCommissionAlreadyTaken(int accountId, int commissionId)
        {
            var result = _accComRepository.AccountCommissionAlreadyTaken(accountId,commissionId).ToList().Any();
            return result;
        }
    }
}
