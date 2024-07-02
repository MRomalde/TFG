using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.CommissionService
{
    interface ICommissionService
    {
        Task<IEnumerable<CommissionsViewModel>> GetAllCommissions();
        Task<IEnumerable<CommissionsViewModel>> GetCommissionByIdAndReturnList(int id);
        Task<CommissionsViewModel> GetCommissionById(int id);
        Task<ActionResult> DeleteCommission(CommissionsViewModel commission);
        Task<ActionResult> CreateCommission(CommissionsViewModel model);
        Task<ActionResult> UpdateCommissionAsync(CommissionsViewModel model);
    }
}
