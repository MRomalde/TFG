using Banco_VVBA.Context;
using Banco_VVBA.Controllers;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Banco_VVBA.Repositories
{
    public class OperationRepository:Controller
    {
        #region Fields
        readonly BancoVVBAContext _context;
        readonly IConfiguration _configuration;
        public AccountService _accountService;
        UserAccountsViewModel account;
        #endregion
        #region Constructor
        public OperationRepository(IConfiguration config,BancoVVBAContext bancoVVBAContext)
        {
            _configuration = config;
            _context = bancoVVBAContext;
            //create here an instance of the account service
            _accountService = new AccountService(_context, _configuration);
        }

        #endregion
        internal async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations()
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).ToListAsync();
            return result;
        }

        internal async Task<ActionResult> DeleteOper(OperationsViewModel model)
        {
            _context.Operations.Remove(model);
            await _context.SaveChangesAsync();
            account = await _accountService.findAccountToUpdateById(model.AccountId);
            if (model.Concept.Equals("Entrada"))
                account.Balance -= model.Amount;
            else
                account.Balance += model.Amount;
            await _accountService.updateAccount(account);
            return Ok();
        }

        internal async Task<ActionResult> CreateOperation(OperationsViewModel model)
        {
            // Asegúrate de que el objeto model no tenga valores en las propiedades que son gestionadas automáticamente
            // como la clave primaria y las propiedades de identidad
            var operation = new OperationsViewModel
            {
                Date = model.Date,
                Concept = model.Concept,
                Message = model.Message,
                Amount = model.Amount,
                AccountId = model.AccountId,
                Account = await _accountService.findAccountToUpdateById(model.AccountId)
            };

            _context.Operations.Add(operation);
            await _context.SaveChangesAsync();

            // Actualizar el balance de la cuenta
            var account = await _accountService.findAccountToUpdateById(model.AccountId);
            if (model.Concept.Equals("Entrada"))
                account.Balance += model.Amount;
            else
                account.Balance -= model.Amount;

            await _accountService.updateAccount(account);

            return Ok();
        }


        internal async Task<ActionResult> UpdateOper(OperationsViewModel oper)
        {
            var elderElement = await _context.Operations.FindAsync(oper.OperationId);
            var conceptElder = elderElement.Concept;
            var amountElder = elderElement.Amount;
            try
            {
                if (elderElement.AccountId!=oper.AccountId)
                    elderElement.AccountId = oper.AccountId;
                if (elderElement.Amount != oper.Amount)
                    elderElement.Amount = oper.Amount;
                if (elderElement.Concept != oper.Concept)
                    elderElement.Concept = oper.Concept;
                if (elderElement.Date != oper.Date)
                    elderElement.Date = oper.Date;
                if (elderElement.Message != oper.Message)
                    elderElement.Message = oper.Message;

                //this is the same but it gives an error when 2 elements with the same id are being tracked
                //_context.Entry(oper).State = EntityState.Modified;

            }
            catch(Exception e)
            {
                Console.Write(e.Message);
            }
            await _context.SaveChangesAsync();
            account = await _accountService.findAccountToUpdateById(oper.AccountId);

            if (oper.Concept == "Entrada" && conceptElder == "Entrada")
            {
                if (amountElder > oper.Amount)
                {
                    account.Balance -= (amountElder - oper.Amount);
                }
                else
                {
                    account.Balance += (oper.Amount - amountElder);
                }
            }
            else if (oper.Concept == "Salida" && conceptElder == "Salida")
            {
                if (amountElder > oper.Amount)
                {
                    account.Balance += (amountElder - oper.Amount);
                }
                else
                {
                    account.Balance -= (oper.Amount - amountElder);
                }
            }
            else if (oper.Concept == "Salida" && conceptElder == "Entrada")
            {
                account.Balance -= (amountElder + oper.Amount);
            }
            else
            {
                account.Balance += (amountElder + oper.Amount);
            }
            await _accountService.updateAccount(account);
            return Ok();
        }

        internal async Task<IEnumerable<OperationsViewModel>> GetOperationById(int id)
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).Where(Oper => Oper.OperationId == id).ToListAsync();
            return result;
        }

        internal async  Task<OperationsViewModel> GetOperationByIdToDelete(int id)
        {
            var result = await _context.Operations.FindAsync(id);
            return result;
        }

        internal async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId)
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).Where(Oper => Oper.AccountId == accountId).ToListAsync();
            return result;
        }







    }
}
