using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.AccountService
{
    interface IAccountService
    {
        Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model);
        int FindLastIban();
        Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccounts();
        Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountById(int id);
        Task<UserAccountsViewModel> findAccountToUpdateById(int id);
        Task<ActionResult> updateAccount(UserAccountsViewModel account);
        Task<IEnumerable<UserAccountsViewModel>> SearchByName(string name);
        Task<ActionResult<IEnumerable<UserAccountsViewModel>>> findAccountByUserId(int id);
        Task<ActionResult<IEnumerable<UserAccountsViewModel>>> GetAllAccountsExceptYourAcc(int id);
    }
}
