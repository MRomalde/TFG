using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.OperationService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        #region Service declaration
        IOperationService _operService;
        #endregion
        #region Contructor
        public OperationController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _operService = new OperationService(configuration, bancoVVBAContext);
        }
        #endregion

        //Get:api/[controller]/GetAllOperations
        [HttpGet("getAllOperations")]
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations()
        {
            var result = await _operService.GetAllOperations();
            return result;
        }

        //Get:api/[controller]/getOperationByAccountId
        [HttpGet("getOperationByAccountId/{accountId}")]
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId)
        {
            var result = await _operService.GetOperationByAccountId(accountId);
            return result;
        }


        //Get:api/[controller]/getOperationById/{id}
        [HttpGet("getOperationById/{id}")]
        public async Task<IEnumerable<OperationsViewModel>> GetOperationById(int id)
        {
            var result = await _operService.GetOperationById(id);
            return result;
        }

        //Post:api/[controller]/createOperation
        [HttpPost("createTransfer")]
        public async Task<ActionResult> CreateTransfer(OperationsViewModel model)
        {
            if (model.Message == "") {
                if (model.Concept == "Salida")
                {
                    model.Message = "Transferencia: retirada de dinero";
                }
                else
                {
                    model.Message = "Transferencia: Entrada de dinero";
                }
            }
            var result = await _operService.CreateOperation(model);
            return result;
        }
        //Post:api/[controller]/createOperation
        [HttpPost("createOperation")]
        public async Task<ActionResult> CreateOperation(OperationsViewModel model)
        {
            if (model.Message == "")
            {
                if (model.Concept == "Salida")
                {
                    model.Message = "Retirada de dinero";
                }
                else
                {
                    model.Message = "Entrada de dinero";
                }
            }
            var result = await _operService.CreateOperation(model);
            return result;
        }
        //Put:api/[controller]/updateOperation/{id}
        [HttpPut("updateOperation/{id}")]
        public async Task<IActionResult> UpdateOperation(int id, OperationsViewModel oper)
        {
            if (id != oper.OperationId)
            {
                return BadRequest();
            }
            await _operService.UpdateOper(oper);
            return Ok();
        }
        //Delete:api/[controller]/deleteById
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            var oper = await _operService.GetOperationByIdToDelete(id);
            if (oper == null)
                return NotFound();

            await _operService.DeleteOper(oper);
            return Ok();
        }

    }
}
