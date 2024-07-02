using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.CommissionService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommissionController : ControllerBase
    {
        #region Service declaration
        private ICommissionService _comService;
        #endregion
        #region Constructor
        public CommissionController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _comService = new CommissionService(configuration, bancoVVBAContext);
        }
        #endregion

        // GET: api/[controller]/getAllCommissions
        [HttpGet("getAllCommissions")]
        public async Task<IEnumerable<CommissionsViewModel>> GetAllCommissions()
        {
            var result = await _comService.GetAllCommissions();
            return result;
        }
        // GET: api/[controller]/getCommissionById
        [HttpGet("getCommissionById/{id}")]
        public async Task<IEnumerable<CommissionsViewModel>> GetCommissionById(int id)
        {
            var result = await _comService.GetCommissionByIdAndReturnList(id);
            return result;
        }
        //Post: api/[controller]/createCommission
        [HttpPost("createCommission")]
        public async Task<ActionResult> CreateCommission(CommissionsViewModel model)
        {
            await _comService.CreateCommission(model);
            return Ok();
        }

        //Put: api/[controller]/updateCommission
        [HttpPut("updateCommission/{id}")]
        public async Task<ActionResult> UpdateCommission(CommissionsViewModel model,int id)
        {
            if (model.CommissionId != id)
                return BadRequest();
            await _comService.UpdateCommissionAsync(model);
            return Ok();
        }

        //Delete: api/[controller]/deleteCommission/{id}
        [HttpDelete("deleteCommission/{id}")]
        public async Task<ActionResult> DeleteCommission(int id)
        {
            var commission = await _comService.GetCommissionById(id);
            if (commission == null)
                return NotFound();

            await _comService.DeleteCommission(commission);
            return Ok();
        }
    }
}
