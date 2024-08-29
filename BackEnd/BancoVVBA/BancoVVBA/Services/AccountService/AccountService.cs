using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Controllers;

namespace Banco_VVBA.Services.AccountService
{
    public class AccountService : IAccountService
    {
        #region Fields
        public IEnumerable<UsersViewModel> user;
        public UserRepository _userRepository;
        #endregion
        #region declaration of repository
        private AccountRepository _accountRespository;
        #endregion
        #region Constructor
        public AccountService(BancoVVBAContext context, IConfiguration configuration)
        {
            _accountRespository = new AccountRepository(context, configuration);
            _userRepository = new UserRepository(context, configuration);
        }
        #endregion
        public async Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model)
        {
            var result = await _accountRespository.CreateAccount(model);
            return result;
        }
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccounts()
        {
            var result = await _accountRespository.GetAllAccounts();
            return result;
        }
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccountsExceptYourAcc(int id)
        {
            var result = await _accountRespository.GetAllAccountsExceptYourAcc(id);
            return result;
        }


        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountById(int id)
        {
            var result = await _accountRespository.findAccountById(id);
            return result;
        }
        public async Task<UserAccountsViewModel> findAccountToUpdateById(int id)
        {
            var result = await _accountRespository.findAccountToUpdateById(id);
            return result;
        }

        public async Task<ActionResult> updateAccount(UserAccountsViewModel account)
        {
            account.Balance = Math.Round(account.Balance, 2);
            return await _accountRespository.updateAccount(account);
        }

        public async Task<IEnumerable<UserAccountsViewModel>> SearchByName(string name)
        {
            var result = await _accountRespository.SearchByName(name);
            return result;
        }

        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountByUserId(int id)
        {
            var result = await _accountRespository.findAccountByUserId(id);
            return result;
        }

        #region Create account
        
        public int FindLastIban()
        {
            var result = _accountRespository.FindLastIban();
            var iban = result.ElementAt(0).IBAN;
            var numAux = Convert.ToInt32(iban.Substring(2));
            return numAux;

        }


        #endregion



    }
    }
