using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        #region Service declaration
        private IAccountService _accountService;
        #endregion
        #region Constructor
        public AccountController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _accountService = new AccountService(bancoVVBAContext, configuration);
        }
        #endregion
        //POST:api/[controller]/createAccount
        [HttpPost("createAccount")]
        public async Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model)
        {
            var result = await _accountService.CreateAccount(model);
            return result;
        }
        //Get the last IBAN
        [HttpGet("findLastIban")]
        public int FindLastIban()
        {
            var result = _accountService.FindLastIban();
            return Convert.ToInt32(result);
        }
        //Get all acounts
        [HttpGet("getAllAccounts")]
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccounts()
        {
            var result = await _accountService.GetAllAccounts();
            return result;
        }
        //Get all acounts except your acc
        [HttpGet("getAllAccountsExceptYourAcc/{id}")]
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccountsExceptYourAcc(int id)
        {
            var result = await _accountService.GetAllAccountsExceptYourAcc(id);
            return result;
        }

        //Get account by id
        [HttpGet("findAccountById/{id}")]
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> FindAccountById(int id)
        {
            var result = await _accountService.findAccountById(id);
            return result;
        }
        //Get account by userId
        [HttpGet("findAccountByUserId/{id}")]
        public async Task<ActionResult<IEnumerable<UserAccountsViewModel>>> FindAccountByUserId(int id)
        {
            var result = await _accountService.findAccountByUserId(id);
            return result;
        }
        //get accounts by name user
        [HttpGet("name/{name}")]
        public async Task<IEnumerable<UserAccountsViewModel>> SearchByName(string name)
        {
            var result = await _accountService.SearchByName(name);
            return result;
        }
        //update the account
        [HttpPut("updateAccount/{id}")]
        public async Task<ActionResult> updateAccount(int id, UserAccountsViewModel account)
        {
            if (id != account.AccountId)
            {
                return BadRequest();
            }
            await _accountService.updateAccount(account);
            return Ok();
        }


    }
}
