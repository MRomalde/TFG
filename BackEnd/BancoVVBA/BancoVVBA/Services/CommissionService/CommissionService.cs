using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.CommissionService
{
    public class CommissionService:ICommissionService
    {
        #region Repository declaration
        private CommissionRepository _comRepository;
        #endregion
        #region Constructor
        public CommissionService(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _comRepository = new CommissionRepository(configuration, bancoVVBAContext);
        }

        public async Task<ActionResult> CreateCommission(CommissionsViewModel model)
        {
            model.Price = Math.Round(model.Price, 2);
            return await _comRepository.CreateCommission(model);
        }

        public async Task<ActionResult> DeleteCommission(CommissionsViewModel commission)
        {
            return await _comRepository.DeleteCommission(commission);
        }
        #endregion

        public async Task<IEnumerable<CommissionsViewModel>> GetAllCommissions()
        {
            var result = await _comRepository.GetAllCommissions();
            return result;
        }

        public async Task<CommissionsViewModel> GetCommissionById(int id)
        {
            var result = await _comRepository.GetCommissionById(id);
            return result;
        }

        public async Task<IEnumerable<CommissionsViewModel>> GetCommissionByIdAndReturnList(int id)
        {
            var result = await _comRepository.GetCommissionByIdAndReturnList(id);
            return result;
        }

        public async Task<ActionResult> UpdateCommissionAsync(CommissionsViewModel model)
        {
            return await _comRepository.UpdateCommission(model);
        }
    }
}
