using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.AccountCommissions
{
    interface IAccountCommissionsService
    {
        Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAllAccountCommissions();
        Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByIdAndReturnList(int id);
        Task<ActionResult> CreateAccountCommissions(Account_Has_Commissions model);
        Task<ActionResult> UpdateAccountCommissions(Account_Has_Commissions model);
        Task<Account_Has_Commissions> GetAccountCommissionsById(int id);
        Task<ActionResult> DeleteAccountCommissions(Account_Has_Commissions accountCommission);
        Task<ActionResult<IEnumerable<Account_Has_Commissions>>> GetAccountCommissionsByAccountId(int id);
        bool AccountCommissionAlreadyTaken(int accountId, int commissionId);
    }
}
