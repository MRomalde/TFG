using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.OperationService
{
    public class OperationService:IOperationService
    {
        #region Fields
        OperationRepository _operRepository;
        #endregion
        #region Contructor
        public OperationService(IConfiguration configuration,BancoVVBAContext bancoVVBAContext)
        {
            _operRepository = new OperationRepository(configuration, bancoVVBAContext);
        }

        public async Task<ActionResult> CreateOperation(OperationsViewModel model)
        {
            return await _operRepository.CreateOperation(model);
        }

        public async Task<ActionResult> DeleteOper(OperationsViewModel oper)
        {
            return await _operRepository.DeleteOper(oper);
        }


        #endregion
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations()
        {
            var result = await _operRepository.GetAllOperations();
            return result;
        }

        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId)
        {
            var result = await _operRepository.GetOperationByAccountId(accountId);
            return result;
        }

        public async Task<IEnumerable<OperationsViewModel>> GetOperationById(int id)
        {
            var result = await _operRepository.GetOperationById(id);
            return result;
        }

        public async Task<OperationsViewModel> GetOperationByIdToDelete(int id)
        {
            var result = await _operRepository.GetOperationByIdToDelete(id);
            return result;
        }

        public async Task<ActionResult> UpdateOper(OperationsViewModel oper)
        {
            var result= await _operRepository.UpdateOper(oper);
            return result;
        }
    }
}
