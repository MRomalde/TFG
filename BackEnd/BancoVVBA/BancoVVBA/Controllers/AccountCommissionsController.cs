using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountCommissions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountCommissionsController : ControllerBase
    {
        #region  Service declaration
        private IAccountCommissionsService _accComService;
        #endregion
        #region Constructor
        public AccountCommissionsController(IConfiguration config,BancoVVBAContext bancoVVBAContext)
        {
            _accComService = new AccountCommissionsService(config, bancoVVBAContext);
        }
        #endregion
        //Get:api/[controller]/getAllAccountCommissions
        [HttpGet("getAllAccountCommissions")]
        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAllAccountCommissions()
        {
            var result = await _accComService.GetAllAccountCommissions();
            return result;
        }
        //Get:api/[controller]/getAccountCommissionsById/{id}
        [HttpGet("getAccountCommissionsById/{id}")]
        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsById(int id)
        {
            var result = await _accComService.GetAccountCommissionsByIdAndReturnList(id);
            return result;
        }
        //Get:api/[controller]/getAccountCommissionsByAccountId/{id}
        [HttpGet("getAccountCommissionsByAccountId/{id}")]
        public async Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByAccountId(int id)
        {
            var result = await _accComService.GetAccountCommissionsByAccountId(id);
            return result;
        }
        //Get:api/[controller]/getAccountCommissionsByAccountId/{id}
        [HttpGet("accountCommissionAlreadyTaken/{accountId}&{commissionId}")]
        public bool AccountCommissionAlreadyTaken(int accountId, int commissionId)
        {
            return _accComService.AccountCommissionAlreadyTaken(accountId, commissionId);
        }
        //Post:api/[controller]/createAccountCommissions
        [HttpPost("createAccountCommissions")]
        public async Task<ActionResult> CreateAccountCommissions(Account_Has_Commissions model)
        {
            await _accComService.CreateAccountCommissions(model);
            return Ok();
        }
        //Put:api/[controller]/updateAccountCommissions
        [HttpPut("updateAccountCommissions")]
        public async Task<ActionResult> UpdateAccountCommissions(int id,Account_Has_Commissions model)
        {
            if (id != model.AccountsHasCommissionsId)
                return NotFound();

            await _accComService.UpdateAccountCommissions(model);
            return Ok();
        }
        //Delete:api/[controller]/deleteAccountCommissions
        [HttpDelete("deleteAccountCommissions/{id}")]
        public async Task<ActionResult> DeleteAccountCommissions(int id)
        {
            var AccountCommission = await _accComService.GetAccountCommissionsById(id);

            if (id != AccountCommission.AccountsHasCommissionsId)
                return BadRequest();

            await _accComService.DeleteAccountCommissions(AccountCommission);
            return Ok();
        }



    }
}
